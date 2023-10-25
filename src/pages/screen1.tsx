import React from 'react'
const tweets = [
    { id: '1', name: 'Ramesh', message: "first message" },
    { id: '2', name: 'Raju', message: "second message" }
];

// To make tailwindcss auto suggest work 
// Use  https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss&ssr=false#overview
// CHANGE flex-col, flex-grow and see effect
// Reference used https://github.com/WebDevSimplified/twitter-clone/blob/main/src/pages/_app.tsx


function screen1() {
    return (
        <>
            <div className="container mx-auto  flex items-start sm:pr-4">
                <nav className="sticky top-0 px-2  py-4">
                    <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
                        <li>
                            Test1
                        </li>
                        <li>
                            Test2
                        </li>
                    </ul>
                </nav>
                <div className="min-h-screen flex-grow border-x">
                    <header className="sticky top-0 z-10 border-b bg-white pt-2">
                        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
                        <button className="flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200"> One </button>
                        <button className="flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200"> two </button>
                    </header>
                    <div>
                        {tweets.map((data) => (
                            <div>
                                {data.message}
                            </div>)
                        )}
                    </div>

                </div>
            </div>
        </>

    )
}

export default screen1;