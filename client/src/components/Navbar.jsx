import React, { useState, useEffect, useRef } from "react";
import { message } from "antd";
import { NavLink } from "react-router-dom";
import {BsFillSunFill,BsMoonStarsFill,BsFillPersonFill,} from "react-icons/bs";
import { GrMenu, GrClose } from "react-icons/gr";

import "../assets/styles/navbar.css";

export default function Navbar({darkMode, setDarkMode }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target)
      ) {
        setToggleMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" sticky top-0 ">
      <header
        className={`w-full ${
          darkMode ? "bg-gray-900 text-white" : "bg-blue-800 text-white"
        }`}
      >
        <nav className="flex justify-between items-center w-full p-3 md:px-5 mx-auto">
          <div className="">
            <NavLink
              className="font-bold text-2xl hover:text-yellow-400 font-croissant"
              to="/"
            >
              <h1>Nerage</h1>
            </NavLink>
          </div>

          <div
            ref={navigationRef}
            className={`md:static absolute ${darkMode ? "bg-gray-900" : "bg-blue-800"} md:min-h-fit min-h-[25vh] left-0 ${ !toggleMenu ? "top-[-500%] " : " top-[90%]" } md:w-auto w-full flex items-center px-5 z-10`}
          >
            <ul className="flex md:flex-row  flex-col md:items-center md:gap-7 gap-4 text-xl">
              <li>
                <NavLink className="hover:text-yellow-400" to="/odds">
                  Oddscrappy
                </NavLink>
              </li>
              <li>
                <NavLink className="hover:text-yellow-400" to="/contactus">
                  Contact-us
                </NavLink>
              </li>
              {/* <li>
                <NavLink className="hover:text-black" to="/login">
                  <button className="bg-yellow-600 hover:bg-yellow-500">
                    <BsFillPersonFill className="" />
                  </button>
                </NavLink>
              </li> */}
            </ul>
          </div>

          <div className="flex items-center gap-5">
            <div className="btns flex">
              {darkMode ? (
                <button
                  onClick={() => {
                    setDarkMode(!darkMode);
                  }}
                  className=" bg-rose-100 cursorpointer"
                >
                  <BsFillSunFill className="text-black" />
                </button>
              ) : (
                <button
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
                  className="bg-black cursor-pointer"
                >
                  <BsMoonStarsFill className="" />
                </button>
              )}
            </div>
            <div className="toggle text-3xl ">
              {!toggleMenu ? (
                <GrMenu
                  onClick={() => setToggleMenu(!toggleMenu)}
                  className="cursor-pointer md:hidden white-icon"
                />
              ) : (
                <GrClose
                  onClick={() => setToggleMenu(!toggleMenu)}
                  className="cursor-pointer md:hidden text-white"
                />
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
