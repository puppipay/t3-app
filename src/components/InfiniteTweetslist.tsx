import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingSpinner } from "./LoadingSpinner";
import ProfileImage from "./ProfileImage";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { api } from "~/utils/api";

type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null };
};

type InfiniteTweetListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean | undefined;
  fetchNewTweets: () => Promise<unknown>;
  tweets?: Tweet[];
};


function InfiniteTweetslist({
  tweets,
  isError,
  isLoading,
  fetchNewTweets,
  hasMore = false,
}: InfiniteTweetListProps) {
  
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <h1>Error...</h1>;

  if (tweets == null || tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Tweets</h2>
    );
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
      >
        {tweets.map((tweet) => {
          return <TweetCard key={tweet.id} {...tweet} />;
        })}
      </InfiniteScroll>
    </ul>
  );
}

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {dateStyle: 'short'});




function TweetCard({ ...props }) {

  const trpcutils = api.useContext();

  const togglelike = api.tweet.togglelike.useMutation({
    onSuccess: async  ({addedlike}) => {
      await trpcutils.tweet.infinitefeed.invalidate();
      
    }
  });

  function handleToggleLike(id) {
    togglelike.mutate( {id });
  }
    

  return (
    <li className="px-y flex gap-4 border-b px-4">
      <Link href={`/profile/${props.user.id}}`}>
        {" "}
        <ProfileImage src={props.user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex flex-1">
          <Link href={`/profile/${props.user.id}}`} className="font-bold hover:underline focus-visible:outline-dashed"> {props.user.name}</Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {dateTimeFormatter.format(props.createdAt)}
          </span>

          

        </div>
        <p className="whitespace-pre-wrap">{props.content}</p>
        <HeartButton
          onClick={()=>handleToggleLike(props.id)}
          isLoading={togglelike.isLoading}
          likedByMe={props.likedByMe}
          likeCount={props.likeCount}
        />
      </div>
    </li>
  );
}

function HeartButton({
  isLoading,
  onClick,
  likedByMe,
  likeCount,
}: HeartButtonProps) {
  const session = useSession();
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;

  if (session.status !== "authenticated") {
    return (
      <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
        <HeartIcon />
        <span>{likeCount}</span>
      </div>
    );
  }

  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`group -ml-2 flex items-center gap-1 self-start transition-colors duration-200 ${
        likedByMe
          ? "text-red-500"
          : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"
      }`}
    >
     
        <HeartIcon
          className={`transition-colors duration-200 ${
            likedByMe
              ? "fill-red-500"
              : "fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"
          }`}
        />
     
      <span>{likeCount}</span>
    </button>
  );
}
export default InfiniteTweetslist;
