import React from 'react'

type Buttonprops = {
small?: boolean
gray?: boolean
className?: string

};

function Button({ small = false, gray= false, className="", ...props}: Buttonprops) {

    const sizeClasses = small? "px-2 py-1" : "px-4 py-2 font-bold";
    const colorClasses = gray? "bg-gray-400 hover:bg-gray-300": "bg-blue-400 hover:bg-blue-300";
  return (
    <button className={`rounded-full ${sizeClasses} ${colorClasses}`} {...props}></button>
  )
}

export default Button