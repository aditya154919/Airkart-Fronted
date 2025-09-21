import {SignedIn,SignedOut,SignInButton,UserButton, SignOutButton, useUser } from '@clerk/clerk-react'
import { FaUserCircle } from "react-icons/fa";
import React from 'react'
import { Link } from 'react-router-dom';

const ResponsiveMenu = ({openNav,setOpenNav}) => {
  const {user} = useUser();
  return (
   <>
   {
    openNav && (
       <div
    className={`${
        open? "left-0" : "-left-[100%]"
      } absolute bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}
    >
    <div>
        <div className="flex items-center justify-start gap-3">
          {user ? <UserButton /> : <FaUserCircle size={50} />}
          <div>
            <h1>Hello, {user?.firstName || "Guest"}</h1>
            <h1 className="text-sm text-slate-500">
              {user ? "Premium User" : "Please Sign In"}
            </h1>
          </div>
        </div>
         {/* Menu items */}
        <div className='flex mt-12'>
            <ul className='flex flex-col gap-5 text-2xl font-semibold'>
                <Link to='/' onClick={() => setOpen(false)}>Home</Link>
                <Link to='/bookingdetails' onClick={() => setOpen(false)}>Your-Booking</Link>
                <Link to='/contact' onClick={() => setOpen(false)}>Contact</Link>
                <Link to='/about' onClick={() => setOpen(false)}>About</Link>

            </ul>
        </div>

        {/* Sign up */}

        <div className="mt-10">
          

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold w-full">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <SignOutButton>
              <button className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold w-full">
                Log Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>

        <p className=" px-2 mt-30">
          Made by <span className="font-bold"> Aditya & Pradyuman❤️</span>
        </p>
    </div>
      
    </div>
    )
   }
   </>
  )
}

export default ResponsiveMenu
