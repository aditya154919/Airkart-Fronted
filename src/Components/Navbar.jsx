import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";
import ResponsiveMenu from "./ResponsiveMenu";
import { Appcontext } from "../Context/Appcontext";
import axios from "axios";

const Navbar = ({ openNav, setOpenNav }) => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, user, setUser } = useContext(Appcontext);

  function openhandler() {
    setOpenNav(!openNav);
  }

  function logghandler() {
    navigate("/login");
  }

  async function logoutHandler() {
    try {
      await axios.post(`https://airkart-backend.onrender.com/api/v1/logout`, {
        withCredentials: true,
      });

      setUser(null);
      setLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  }

  function logoutHandler(){
    setUser(null);
    setLoggedIn(false);

  }

   

  return (
    <div className="flex flex-row backdrop-blur-4xl md:justify-around justify-between md:p-0">
      <div
        className="p-2 flex flex-row items-center justify-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/assets/bg.png"
          className="max-w-[120px] h-[10px] md:max-w-full hidden md:block"
          alt="logo"
        />
        <p className="text-white md:text-2xl font-bold text-3xl">
          Air<span className="text-orange-400">/</span>kart
        </p>
      </div>

      <div className="md:flex items-center justify-center hidden">
        <ul className="flex flex-row gap-4 text-white text-2xl font-bold">
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

      <div className="flex items-center justify-center  rounded-full gap-4">
        <div>
          {loggedIn && user ? (
          <div
            title={user.name}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-400 text-white font-semibold text-2xl uppercase"
          >
            {user.name ? user.name[0] : "U"}
          </div>
        ) : (
          <div className="w-10 h-10" />
        )}
        </div>

        <div className="flex items-center justify-center gap-3">
          {loggedIn && user ? (
            <button
              className="bg-white/70 backdrop-blur-3xl px-3 py-2 text-xl cursor-pointer rounded-md text-sky-600 font-semibold"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-white/70 backdrop-blur-3xl px-3 py-2 text-xl cursor-pointer rounded-md text-sky-600 font-semibold"
              onClick={logghandler}
            >
              Login
            </button>
          )}
        </div>
      </div>

      <div
        className="flex items-center md:hidden text-3xl text-gray-500 px-5"
        onClick={openhandler}
      >
        {openNav ? <AiOutlineAlignRight /> : <AiOutlineAlignLeft />}
      </div>

      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </div>
  );
};

export default Navbar;

