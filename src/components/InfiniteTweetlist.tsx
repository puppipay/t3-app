import React from 'react'
import Link from "next/link";
import tweets from './tweet.json';

/*
const tweets = [
    { id: '1', name: 'Ramesh', message: "first message" },
    { id: '2', name: 'Raju', message: "second message" }
];
*/

type Tweet = {
    id: number;
    name: string;
    message: string;
  
  };

  
function InfiniteTweetlist() {
  return (
    <div className="flex flex-col gap-4  mx-4 mt-4 py-2">
    {tweets.map((tweet) => (
        <ul>
             <TweetCard  {...tweet} />;

        </ul>)
    )}
</div>
  )
}





function TweetCard({
    id,
    name,
    message
}: Tweet) {
  return (

    <li className="flex gap-4 border rounded-2xl py-4">
        <Link href={`test-id`}>
        test1
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <Link
            href={`/profiles/${message}`}
            className="font-bold outline-none hover:underline focus-visible:underline"
          >
            {message}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            date
          </span>
        </div>
        <p className="whitespace-pre-wrap">content</p>
        
      </div>

    </li>
  )

  }







export default InfiniteTweetlist