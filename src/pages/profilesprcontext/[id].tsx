import React from 'react'
import Head from "next/head";

//import { useRouter } from 'next/router';
const profile = {id:'123', name: 'good boy', city: 'bangalore'};

import type {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
    NextPage,
  } from "next";


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
            <div> some data </div>
          </header>
  
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
