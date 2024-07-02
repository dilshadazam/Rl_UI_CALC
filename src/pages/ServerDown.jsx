import React, { useState } from "react";
const ServerDown = () => {
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <img
        className="h-36 sm:h-40 lg:h-35 mx-auto block"
        alt="Logo"
         src="https://jit.yasys.co.in/assets/justinTimetrans.png"
      /> <div className="text-center">
        
            <p className="text-4xl font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">We'll be back soon!</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Sorry for the inconvenience but we're performning some maintenance at the moment. <div>If you need to you can always contact us, otherwise we'll be back online shortly!</div></p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
             
              <a href="https://yasys.co.in/" target="_blank" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </>
    )
  }
  
  export default ServerDown;