import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { AiOutlineAlignRight } from "react-icons/ai";
import ResponsiveMenu from "./ResponsiveMenu";


const Navbar = ({openNav,setOpenNav}) => {
  const navigate = useNavigate();
  const [loggedin, isLoggedIn] = useState(false);
  
  function openhandler() {
    setOpenNav(!openNav);
  }

  function signhandler(){
    navigate("/login")
  }
  function logghandler(){
    navigate("/login")
  }
  return (
    <div className="flex flex-row backdrop-blur-4xl  md:justify-around justify-between   md:p-0  ">
      <div
        className="p-2 flex flex-row items-center justify-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/assets/bg.png"
          className="max-w-[120px] h-[10px] md:max-w-full hidden md:block "
        ></img>
        <p className="text-white md:text-2xl font-bold text-3xl">
          Air<span className="text-orange-400">/</span>kart
        </p>
      </div>

      <div className="md:flex items-center justify-center hidden">
        <ul className="flex flex-row gap-4 text-white text-2xl font-bold ">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-sky-500 transition-all duration-100"
                  : "text-white"
              } cursor-pointer`
            }
            
          >
            Home
          </NavLink>

          <NavLink
            to={"/bookedticket"}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-sky-500 transition-all duration-100"
                  : "text-white"
              } cursor-pointer`
            }
          >
            Your-Booking
          </NavLink>

          <NavLink
            to={"/about"}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-sky-500 transition-all duration-100"
                  : "text-white"
              } cursor-pointer`
            }
          >
            About
          </NavLink>

          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-sky-500 transition-all duration-100"
                  : "text-white"
              } cursor-pointer`
            }
          >
            Contact
          </NavLink>
        </ul>
      </div>
     
      {/* button */}
      <div className="flex items-center justify-center">
        {
        !isLoggedIn &&(
          <button className="bg-white/70 backdrop-blur-3xl px-3 py-2  text-xl cursor-pointer rounded-md text-sky-600 font-semibold">Logout</button>
        )
      }
      {
        isLoggedIn &&(
          <div className="flex justify-center items-center gap-2">
          <button className="bg-white/70 backdrop-blur-3xl px-3 py-2  text-xl cursor-pointer rounded-md text-sky-600 font-semibold" onClick={signhandler}>Sign up</button>
          <button className="bg-white/70 backdrop-blur-3xl px-3 py-2  text-xl cursor-pointer rounded-md text-sky-600 font-semibold " onClick={logghandler}>Login</button>
          </div>
        )
      }
      </div>
      

       <div
        className="flex items-center  md:hidden text-3xl text-gray-500 px-5  "
        onClick={openhandler}
      >
        {openNav ? (
          <div>
            <AiOutlineAlignRight></AiOutlineAlignRight>
          </div>
        ) : (
          <div>
            <AiOutlineAlignLeft></AiOutlineAlignLeft>
          </div>
        )}
      </div>


      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav}/>
    </div>
  );
};

export default Navbar;






