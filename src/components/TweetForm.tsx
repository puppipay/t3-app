import React from 'react'

function TweetForm() {
  return (

    <form       className="flex flex-col gap-4 border-b px-4 py-2"> 
  
   
   <div className="col-span-full">
  <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">About</label>
  <div className="mt-2">
    <textarea id="about" name="about" rows={3} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={""} />
  </div>
  <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
  <button className="self-center rounded-full text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 bg-cyan-300">Tweet</button>
</div>



</form>

  )
}

export default TweetForm