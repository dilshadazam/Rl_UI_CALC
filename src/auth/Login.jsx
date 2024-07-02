import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import mfaApi from "../api/mfaApi";
import swal from "sweetalert";
import AuthContext from "../store/authContext";
import { useContext } from "react";
import userContext from "../store/userContext";
import ReactLoading from "react-loading";

const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLoadig, setisLoadig] = useState(false);
  const userCtx = useContext(userContext);
  const [showPassword, setShowPassword] = useState(false);

  const [userid, setuserid] = useState("");
  const [collectRes, setCollectRes] = useState({});
  console.log("login", collectRes);
  const [password, setpassword] = useState("");
  const SigninHandler = async (e) => {
    e.preventDefault();
    try {
      setisLoadig(true);
      const response = await mfaApi.post(
        "/rlbiharmalamal/rlsignin",
        {
          phoneno: userid,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        if (response.data.role === "Admin") {
          setCollectRes(response.data);
          let expirationTime = new Date();
          expirationTime.setDate(expirationTime.getDate() + 1);
          authCtx.Signin(
            response.data.token,
            // response.data.refreshtoken,
            expirationTime.toISOString()
          );
          userCtx.setUserRole(response.data.role);
          userCtx.setUserName(response.data.name);
          // userCtx.setUserLastLoginTime(response.data.lastlogintime);
          // userCtx.setorgid(response.data.organisationid);
          navigate("/bjentry", { replace: true });
          swal("Login Successfull");
        } else if (response.data.role === "Employee") {
          setCollectRes(response.data);
          let expirationTime = new Date();
          expirationTime.setDate(expirationTime.getDate() + 1);
          authCtx.Signin(
            response.data.token,
            // response.data.refreshtoken,
            expirationTime.toISOString()
          );
          userCtx.setUserRole(response.data.role);
          userCtx.setUserName(response.data.name);
          // userCtx.setUserLastLoginTime(response.data.lastlogintime);
          // userCtx.setorgid(response.data.organisationid);
          navigate("/employee", { replace: true });
          swal("Login Successfull");
        }
        else if (response.data.role === "Yasystem") {
          setCollectRes(response.data);
          let expirationTime = new Date();
          expirationTime.setDate(expirationTime.getDate() + 1);
          authCtx.Signin(
            response.data.token,
            // response.data.refreshtoken,
            expirationTime.toISOString()
          );
          userCtx.setUserRole(response.data.role);
          userCtx.setUserName(response.data.name);
          // userCtx.setUserLastLoginTime(response.data.lastlogintime);
          // userCtx.setorgid(response.data.organisationid);
          navigate("/support", { replace: true });
          swal("Login Successfull");
        } else {
          swal({
            title: "Error!",
            text: `You are not authorized to access`,
          });
          setisLoadig(false);
        }
      }
    } catch (error) {
      if (error.response) {
        swal(error?.response.data.message);
        setisLoadig(false);
      } else {
        setisLoadig(false);
        // Handle network-related error (no response received)
        swal({
          title: "Connection lost!",
          text: "You have lost connection with the server. Check your internet connection and try again.",
        });
      }
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 bg-gradient-to-tr from-orange-200 to-cyan-800 text-white">
        <div className="bg-indigo-100 p-6 rounded-lg shadow-md space-y-4 sm:w-full sm:max-w-md">
          {" "}
          <img
            className="h-28 sm:h-28 lg:h-44 mx-auto block"
            alt="Logo"
             src="https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/512/Calculator_512.png"
          />
          <h2 className=" flex justify-center text-lg sm:text-xl lg:text-2xl font-medium text-gray-900">
            Login to your account
          </h2>
          {isLoadig && (
            <div className="flex items-center justify-center my-6">
              <ReactLoading
                type="spin"
                color="#0143E2"
                height={40}
                width={40}
              />
            </div>
          )}
          <form className="space-y-4" onSubmit={SigninHandler}>
            <div className="rounded-md space-y-2">
              <div>
                <label htmlFor="userId" className="text-gray-700">
                  User Id
                </label>
                <input
                  id="userId"
                  name="userId"
                  type="number"
                  autoComplete="off"
                  value={userid}
                  onChange={(e) => setuserid(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="xxxxxx3432"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                    autoComplete="off"
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="gray"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="gray"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
              >
                <LockClosedIcon
                  className="h-6 w-6 text-orange-100 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
                <span className="ml-2">Login</span>
              </button>
            </div>
          </form>
        </div>
        <a href="https://yasys.co.in/" target="_blank" className="flex justify-center font-normal text-gray-600 cursor-pointer">Powered By: Yasystem</a>
      </div>

{/* <div className="bg-gray-800 h-screen">
            <div className="flex items-center justify-center py-12">
                <div className="bg-white border rounded-md flex items-center justify-center mx-4 md:w-2/3 ">
                    <div className="flex flex-col items-center py-16 ">
                        <img className="px-4 hidden md:block" src="https://i.ibb.co/9Vs73RF/undraw-page-not-found-su7k-1-3.png" alt="" />
                        <img className="md:hidden" src="https://i.ibb.co/RgYQvV7/undraw-page-not-found-su7k-1.png" alt="" />
                        <h1 className="px-4 pt-8 pb-4 text-center text-5xl font-bold leading-10 text-gray-800">OOPS! </h1>
                        <p className=" flex px-4 pb-10 text-base leading-none text-center text-red-800 font-sans">Website is currently down due to an outstanding subscription payment. If you wish to renew your subscription, please email us at your earliest convenience. </p>
                        <button className="mx-4 h-10 w-44 border rounded-md text-white text-base bg-red-600 animate-pulse hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-800">Thank You</button>
                    </div>
                </div>
            </div>
        </div> */}
    </>
  );
};
export default Login;
