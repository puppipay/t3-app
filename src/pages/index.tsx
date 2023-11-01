import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { NextPage } from "next";
import NewTweetform from "~/components/NewTweetform";
import ProfileImage from "~/components/ProfileImage";
import InfiniteTweetslist from "~/components/InfiniteTweetslist";
import { api } from "~/utils/api";

const TABS = ["Recent", "Following"];

export default function Home() {

  const  session = useSession();

  const [selectedTab, setSelectedTab] = useState< (typeof TABS)[number]>("Recent");

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-4">
        <h1 className="mb-2 px-4 text-lg font-bold"> Home </h1>

        {session.status == "authenticated" && (
          <div className="flex">
            {TABS.map((tab) => {
              return (
                <button
                  className={`flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200  ${
                    tab == selectedTab ? "border-b-4 border-b-blue-300" : ""
                  } `}
                onClick={()=>setSelectedTab(tab)}
                >
                
                  {tab}
                </button>
              );
            })}
          </div>
        )}
      </header>

      <NewTweetform />
      {selectedTab === 'Recent' ? <Recenttweets /> : <Followingtweets />}
      
    </>
  );
}


function Recenttweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  return (
    <InfiniteTweetslist
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}


function Followingtweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  return (
    <InfiniteTweetslist
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}