import React, { useState } from "react";
import { Link } from "react-router-dom";
import Main from "../layout/Main";
import ReactLoading from "react-loading";
const NotFound = () => {
  const [isLoading, setisLoading] = useState(true);
  return (
    <Main>
      <div className=" flex justify-center items-center h-screen">
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
          <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <div className="relative">
              {/* <div className="absolute"> */}
                {/* <div>
                  <h1 className="my-2 text-gray-800 font-bold text-2xl">
                    Looks like you've found the doorway to the great nothing
                  </h1>
                  <p className="my-2 text-gray-800">
                    Sorry about that! Please visit our hompage to get where you
                    need to go.
                  </p>
                  <button className="sm:w-full lg:w-auto text-xl my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                    <Link to="/"> Take me to home!</Link>
                  </button>
                </div> */}
                 <>
        <div className="px-6 flex justify-center mt-10 items-center flex-no-wrap">
          <div className="flex w-12 h-12 bg-cover bg-center rounded-md">
            <img
              src="https://media.licdn.com/dms/image/D5603AQER3pJQQBAgsg/profile-displayphoto-shrink_200_200/0/1690972868068?e=1707955200&v=beta&t=sUT8Y1nCdmMXAKHLYBJbXKPLIpwcJ46Byr4Bb_aJopo"
              alt=""
              className="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white dark:border-gray-700 shadow"
            />
          </div>
          <div className="w-12 h-12 bg-cover rounded-md -ml-2">
            <img
              src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_1.png"
              alt=""
              className="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white dark:border-gray-700 shadow"
            />
          </div>
          <div className="w-12 h-12 bg-cover rounded-md bg-center -ml-2">
            <img
              src="https://media.licdn.com/dms/image/C4E0BAQGfax45-7aGpw/company-logo_100_100/0/1653911654762?e=1710374400&v=beta&t=pozX0iHjA0MjlyOQGcdn5lRuiphn36mFTpvHCk5Eh8g"
              alt=""
              className="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white dark:border-gray-700 shadow"
            />
          </div>
          <div className="w-12 h-12 bg-cover rounded-md -ml-2">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.pk5u3Qwd98nLNH4XE-N-ugHaHa&pid=Api&P=0&h=220"
              alt=""
              className="h-full w-full overflow-hidden object-cover object-center rounded-full border-2 border-white dark:border-gray-700 shadow"
            />
          </div>
          <div className="w-12 h-12 bg-cover rounded-md -ml-2">
            <img
              src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_4.png"
              alt=""
              className="h-full w-full overflow-hidden object-cover object-center rounded-full border-2 border-white dark:border-gray-700 shadow"
            />
          </div>
        </div>
      </>
      <div className="flex justify-center text-lg text-rose-500">
        {" "}
        We are working on this screen
      </div>
      {isLoading && (
        <div className="flex items-center justify-center my-2">
          <ReactLoading
            type="bubbles"
            color="#0143E2"
            height={"6%"}
            width={"8%"}
          />
        </div>
      )}
              {/* </div> */}
              <div>
                <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt="" />
              </div>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="" />
          </div>
        </div>
      </div>
    </Main>
  );
};

export default NotFound;
