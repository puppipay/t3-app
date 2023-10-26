import React from 'react'



function Layout({children}) {
  
  return (
    <div className="container mx-auto  flex items-start sm:pr-4"> 
    
   

    {children }

    </div>
  )
}

export default Layout