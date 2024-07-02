/* eslint-disable no-undef */
import UserContext from "../store/userContext";
import React, { useState, useContext ,useEffect} from "react";
import AuthContext from "../store/authContext";
import logo from "../assets/images/justinTimetrans.png";
import Main from "../layout/Main";
export default function Navbar() {
  const [show, setshow] = useState(false);
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const SignoutHandler = () => {
    authCtx.Signout();
  };
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    // Function to update the current date and time
    const updateDateTime = () => {
      setCurrentDateTime(new Date());
    };
    // Set up the timer to update the date and time every second
    const intervalId = setInterval(() => {
      updateDateTime();
    }, 1000);
    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const formattedDateTime = currentDateTime.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  }); 

  return (
    <Main>
    <div className="bg-gradient-to-r from-indigo-800 to-stone-800 inline-block w-full border-b sticky top-0 rounded-s-2xl">
      <nav className="2xl: 2xl:mx-auto sm:py-2 sm:px-7 py-2 px-4">
        {/* For large and Medium-sized Screen */}
        <div className="flex justify-between ">
          <div className=" flex space-x-3 justify-start">
            <span className="h-10 w-10 bg-white rounded-md">
              <img src={logo} alt="loading logo.." />
            </span>
            <h1 className="mt-2 font-extralight lg:text-2xl md:text-xl sm:text-xs text-white ">
              My Instant Calculation
            </h1>
          </div>
          <div>
          <div className="hidden sm:flex flex-row space-x-4">
            <p className="flex font-semibold mt-1 text-white">
              {userCtx.userName}:
            </p>
            <p className="flex font-thin mt-1 text-gray-400">
              {userCtx.userRole}
            </p>
            <button
              onClick={SignoutHandler}
              className="rounded-md flex w-20 h-8 font-normal text-md leading-5 border border-indigo-700 focus:outline-none focus:bg-gray-200 hover:bg-red-500 duration-150 justify-center items-center bg-indigo-700 text-white transition-all ease-in-out"
            >
              Logout
            </button>
          </div>

          {/* Burger Icon */}
          <div
            id="bgIcon"
            onClick={() => setshow(!show)}
            className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  justify-center items-center sm:hidden cursor-pointer`}
          >
            <svg
              className={`${show ? "hidden" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              width={24}
              height={24}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>

            <svg
              className={`${show ? "block" : "hidden"}`}
              width={24}
              height={24}
              stroke="white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-sm font-thin text-gray-300 dark:text-white">
              {" "}
              Date and Time: {formattedDateTime}
            </p>
          </div>
        </div>
        {/* Mobile and small-screen devices (toggle Menu) */}
        <div
          id="MobileNavigation"
          className={`${show ? "block" : "hidden"} sm:hidden mt-4 mx-auto`}
        >
          <div className="flex flex-row items-center justify-center space-x-6"></div>
          <div className="flex flex-col gap-4 mt-4 w-1/2 text-center mx-auto bg-red-600 rounded-lg">
            <button
              onClick={SignoutHandler}
              className="flex justify-center py-2 "
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
     </Main>
  );
}
