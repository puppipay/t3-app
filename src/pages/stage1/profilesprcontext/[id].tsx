import React from 'react'
import Head from "next/head";
import Link from 'next/link';

import InfiniteTweetlist from '~/components/stage1/InfiniteTweetlist';

//import { useRouter } from 'next/router';


import type {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
    NextPage,
  } from "next";

  const profile = {id:'123', name: 'good boy', city: 'bangalore'};

const Profilepagessr =  ({
    id,
    data
  }) =>   {

console.log("test1");
    
  
    return (
      <> 
        

      
        <Head>
          <title>{`Twitter Clone - ${profile.name}`}</title>
        </Head>
        <header className="sticky top-0 z-10 flex items-center border-b bg-white px-4 py-2">

        <Link href=".." className="mr-2">
        kkkk
        </Link>
        
        <div className="ml-2 flex-grow">
          <h1 className="text-lg font-bold">{profile.name}</h1>
          <div className="text-gray-500">
            {profile.name}{" "}
            Following
          </div>
        </div>
        

        </header>
    <InfiniteTweetlist />



        </>
  
  
    )
  
}


export const getStaticProps = async ({params}) => {
  

    console.log("getStaticProps", params);

    let data = 'test1';
    let id =  params.id;

    return {
        props: {
        data,
          id
        },
        revalidate: 1,
      };
      
  };

  export const getStaticPaths: GetStaticPaths = () => {
    return {
      paths: [],
      fallback: "blocking",
    };
  };

export default Profilepagessr;
