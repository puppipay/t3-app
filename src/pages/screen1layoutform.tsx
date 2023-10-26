import React from 'react'
import InfiniteTweetlist from '~/components/InfiniteTweetlist';
import Layout from '~/components/Layout';
import SideNav from '~/components/SideNav';
import TweetForm from '~/components/TweetForm';
const tweets = [
    { id: '1', name: 'Ramesh', message: "first message" },
    { id: '2', name: 'Raju', message: "second message" }
];

// To make tailwindcss auto suggest work 
// Use  https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss&ssr=false#overview
// CHANGE flex-col, flex-grow and see effect
// Reference used https://github.com/WebDevSimplified/twitter-clone/blob/main/src/pages/_app.tsx
// HTML to JSX to be used
// copied from  https://tailwindui.com/components/application-ui/forms/form-layouts

function screen1() {
    return (
        <>
            <Layout >
               <SideNav />

                <div className="min-h-screen flex-grow border-x">
                    <header className="sticky top-0 z-10 border-b bg-white pt-2">
                        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
                        <button className="flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200"> One </button>
                        <button className="flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200"> two </button>
                    </header>
                    <TweetForm />
                   <InfiniteTweetlist />
                   

                    
                </div>

   

            </Layout>
        </>

    )
}

export default screen1;