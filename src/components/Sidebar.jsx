import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
//import AuthContext from "../store/authContext";
import UserContext from "../store/userContext";
import { BankRoutes, BranchRoutes,YasystemRoutes } from "../routes";
import Hdivider from "./Hdivider";
const Sidebar = () => {
  // const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const role = userCtx.userRole;
  // const routes = role === "Admin" ? BankRoutes : BranchRoutes;
  const routes = role === "Admin" ? BankRoutes : role === "Yasystem" ? YasystemRoutes : BranchRoutes;
  ///signout handler
  // const SignoutHandler = () => {
  //   authCtx.Signout();
  // };
  const [collapseShow, setCollapseShow] = useState("hidden");
  return (
    <>
      <div className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-lg   flex flex-wrap items-center justify-between relative md:w-64 z-10 px-4 md:h-screen sm:mt-0 bg-gradient-to-r from-fuchsia-50 to-slate-300 rounded-r-2xl">
        <div className=" md:hidden">
          <button
            type="button"
            onClick={() => setCollapseShow("bg-gray-50 m-2 py-3 px-6")}
            className="rounded-md p-1 inline-flex items-center justify-center text-black "
          >
            <span className="sr-only">Open menu</span>
            {/* <Bars3Icon className="h-7 w-7" aria-hidden="true" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div
          className={
            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-2 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
            collapseShow
          }
        >
          {/* Collapse header mobile */}
          <div className="flex px-2 rounded-lg border-black">
            <div className="md:min-w-full block">
              <div className="flex flex-wrap">
                <div className="flex justify-between mx-4">
                  <div className="sticky top-0">
                    <Link
                      exact="true"
                      to="/"
                      className="flex-shrink-0 flex py-2 whitespace-nowrap md:font-normal text-md text-left text-indigo-600 font-bold rounded-lg bg-slate-300 px-2 "
                    >
                      👋 Hi, Welcome Back
                    </Link>
                  </div>
                </div>
                <div className="w-6/12 flex  right-0 justify-end">
                  <button
                    type="button"
                    className="cursor-pointer absolute md:hidden top-0 right-0 mt-4 mr-6   border p-1 rounded-md shadow-md border-red-500 bg-red-200 transition duration-150 ease-in-out"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Close"
                      className="icon icon-tabler icon-tabler-x"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="#dc2626"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                    {/* <XMarkIcon className="h-6 w-6 " aria-hidden="true" /> */}
                  </button>
                </div>
              </div>
            </div>
            <Hdivider/>
          </div>
          <div className="xl:mt-2 flex flex-col justify-start items-start  px-2 w-full space-y-2 pb-5 mb-10">
            {routes?.map((route) => (
              <Link
                key={route.name}
                to={route.to}
                onClick={() => setCollapseShow("hidden")}
                className="focus:outline-none flex text-gray-700 
                  font-medium text-lg jusitfy-start hover:text-white focus:bg-cyan-700 focus:text-white hover:bg-cyan-700  rounded py-3 pl-4 items-center space-x-6 w-full "
              >
                {route.icons}
                <p className="text-base leading-4">{route.name}</p>
              </Link>
            ))}
          </div>
          {/* <div className="flex flex-col justify-between items-center py-3">
            <div className=" flex  bg-gray-200  rounded-md shadow-md  justify-between space-x-2 items-center h-full py-4 md:px-3 px-4 w-full  ">
              <div className="flex items-center">
                <div className="flex flex-col justify-start items-center space-y-2 text-orange-600 ">
                  Logout
                </div>
              </div>
              <button
                onClick={SignoutHandler}
                aria-label="visit"
                className=" focus:ring-2 focus:outline-none    rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>

               
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
