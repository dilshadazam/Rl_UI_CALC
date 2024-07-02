import React, { Fragment, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Main from "../../layout/Main";
import { ExclamationIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import AuthContext from "../../store/authContext";
import mfaApi from "../../api/mfaApi";
import swal from "sweetalert";
import ReactLoading from "react-loading";

const DeleteRoom = () => {
  const [id, setid] = useState();
  const authCtx = useContext(AuthContext);
  
  return (
    <Main>
      <div>
        <section className="mx-auto  w-full">
          <div className="bg-gray-600 rounded-md shadow-2xl shadow-green-600 py-2 mb-1">
            <h1 className="mx-auto flex justify-between uppercase text-white lg:text-xl md:text-xl sm:text-md font-normal ml-2 text-center">
      Delete Room
              
            </h1>
            
          </div>
        </section>
      </div>
{/* 
      {isloadingupdate && (
        <div className="flex items-center justify-end my-10">
          <ReactLoading
            type="cubes"
            color="#0143E2"
            height={"4%"}
            width={"4%"}
          />
          <p className="flex px-1 font-medium">Updating please wait...</p>
        </div>
      )} */}
      <div className="">
        <section className="mx-auto  w-full overflow-hidden">
          <div className="mx-auto  w-full overflow-hidden">
            <div className="shadow  bg-gray-50 overflow-hidden sm:rounded-md">
              <div className="px-4  bg-blue-100 sm:p-6">
                <div className="grid grid-cols-8 gap-1">
                  {/* <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium  text-gray-700"
                    >
                      Select Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    ></input>
                  </div> */}
                  {/* <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium  text-gray-700"
                    >
                      Received Amount
                    </label>
                    <input
                      type="text"
                      name="amount"
                      id="amount"
                      value={received}
                      onChange={(e) => setReceived(e.target.value)}
                      className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    ></input>
                  </div> */}
                  
                  {/* <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="balance"
                      className="block text-sm font-medium  text-gray-700"
                    >
                      Remarks
                    </label>{" "}
                    <select
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      id="status"
                      className=" p-2  mt-1 text-gray-900   w-full  flex items-center   border-gray-300 rounded border"
                    >
                      <optgroup>
                        <option value=""> Select Remarks</option>
                        <option value="Operation Expense">
                          Operation Expense
                        </option>
                        <option value="Other Expense">Other Expense</option>
                        <option value="Other Income">Other Income</option>
                        <option value="Loan">Loan</option>
                        <option value="Loan Habib">Loan Habib</option>
                        <option value="Loan Alheena">Loan Alheena</option>
                        <option value="Amshiya">Amshiya</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Vehicle Maintenance">
                          Vehicle Maintenance
                        </option>
                        <option value="Cod">Cod</option>
                        <option value="N/A">N/A</option>
                      </optgroup>
                    </select>
                  </div> */}
                  {/* <div className="col-span-2 sm:col-span-2 lg:col-span-2 py-1">
                    <label
                      htmlFor="bdes"
                      className="block text-sm font-medium  text-gray-700"
                    >
                      Bank Description
                    </label>
                    <textarea
                      type="text"
                      name="bdes"
                      id="bdes"
                      rows={1}
                      value={bankdes}
                      onChange={(e) => setBankdes(e.target.value)}
                      className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    ></textarea>
                  </div>
                  <div className="col-span-2 sm:col-span-2 lg:col-span-2 py-1">
                    <label
                      htmlFor="jdes"
                      className="block text-sm font-medium  text-gray-700"
                    >
                      JIT Description
                    </label>
                    <textarea
                      type="text"
                      name="jdes"
                      id="jdes"
                      rows={1}
                      value={jitdes}
                      onChange={(e) => setJitdes(e.target.value)}
                      className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    ></textarea>
                  </div>
                  <div className="col-span-2 sm:col-span-2 lg:col-span-2 py-1 mt-6">
                
                <button
                  onClick={addMjdoor}
                  className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-gray-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
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
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                  <p className="mx-1">Add Journel</p>
                </button>
              </div> */}
                </div>
                
              </div>
             
            </div>
          </div>
        </section>
      </div>
      {/* {isLoading && (
        <div className="flex items-center justify-center my-5">
          <ReactLoading
            type="spinningBubbles"
            color="#0143E2"
            height={"6%"}
            width={"6%"}
          />
          <p className="flex px-1 font-medium">please wait...</p>
        </div>
      )} */}
     
       
    </Main>
  );
};

export default DeleteRoom;
