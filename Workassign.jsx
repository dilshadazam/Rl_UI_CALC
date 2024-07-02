/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import mfaApi from "./src/api/mfaApi";
import { v4 as uuidv4 } from "uuid";
import AuthContext from "./src/store/authContext";
import swal from "sweetalert";
import ReactLoading from "react-loading";
import Main from "./src/layout/Main";
import { useNavigate, useParams } from "react-router-dom";
const WorkAssign = () => {
  //navigate to list page
  const navigate = useNavigate();
  function NavigateListEmployee() {
    navigate("/employee", { replace: true });
  }

  const { employeeid } = useParams();
  function NavigateList() {
    navigate(`/wrkassgnlistytftfgf/${employeeid}`, { replace: true });
  }
  const authCtx = useContext(AuthContext);
  const [loadingforclientemployee, setLoadingforclientemployee] =
    useState(false);
  // const [clientempid, setClientempid] = useState();
  // const addVehicle = async (e) => {
  //   e.preventDefault();
  //   if (vehicleJoinDate === "") {
  //     swal("Please select vehicle join date first (non-empty values).");
  //   } else {
  //     setIsLoading(true);
  //     try {
  //       const response = await mfaApi.post(
  //         // `/public/vehiclemaintainanceadd`,
  //         {
  //           vehiclebrand: vehicleBrandName,
  //           vehiclecolour: vehicleColor,
  //           vehiclemodel: vehicleModel,
  //           vehicleplateno: vehicleNo,
  //           vehicleowner: vehicleOwner,
  //           dateofvehiclejoin: vehicleJoinDate,
  //           vehicletype: vehicleType,
  //           installmentrentstartdate: installmentRentDate,
  //           initialkm: initialKm,
  //           remarks: remarks,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${authCtx.token}`,
  //           },
  //         }
  //       );
  //       if (response.status === 201) {
  //         console.log(response.status);
  //         setAdded(true);
  //         setIsLoading(false);
  //         swal(response.data.message);
  //         reloadPageWithDelay();
  //       } else {
  //         swal(response.data.message);
  //       }
  //     } catch (error) {
  //       // swal({
  //       //   type: "error",
  //       // });
  //       swal({
  //         title: "🤦‍♂️",
  //         text: error.response.data.message,
  //         type: "error",
  //         confirmButtonText: "Cool",
  //       });
  //       setIsLoading(false);
  //     }
  //     setIsLoading(false);
  //   }
  // };
  const [clientinfo, setClientInfo] = useState([]);
  console.log(clientinfo);
  //get list of client data
  const getClientinfo = async () => {
    try {
      const response = await mfaApi.get(`public/fetchallpartner`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      if (response.status === 201) {
        setClientInfo(response.data.data);
      }
    } catch (error) {
      console.log(error);
      swal(error.response.data.message);
    }
  };
  const [clientemployee, setClientEmployee] = useState([]);
  //client search
  const [searchKeywordClient, setSearchKeywordClient] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const handleSearchClient = (event) => {
    setSearchKeywordClient(event.target.value);
  };
  const handleCheckboxChangeClient = (data) => {
    setSelectedClient(data);
  };
  const filteredClient = clientinfo.filter((data) => {
    const { partnerid } = data;
    const lowerCasedSearchKeyword = searchKeywordClient.toLowerCase();
    return (
      partnerid && partnerid.toLowerCase().includes(lowerCasedSearchKeyword)
    );
  });
  const highlightKeywordClient = (text, keyword) => {
    if (!keyword || typeof text !== "string") {
      return text; // No keyword to highlight or invalid text
    }
    const regex = new RegExp(`(${escapeRegExpClient(keyword)})`, "gi");
    return (
      <span
        className="bg-yellow-200"
        dangerouslySetInnerHTML={{
          __html: text.replace(
            regex,
            (match) => `<span className="bg-yellow-200">${match}</span>`
          ),
        }}
      />
    );
  };
  const escapeRegExpClient = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
  };

  //serach
  useEffect(() => {
    // Check if selectedClient is not an empty string
    if (selectedClient !== "") {
      // Place your side effect code here
      // This code will run after the component renders
      getClientEmployeeinfo();
    }

    // You can perform cleanup by returning a function
    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClient]);
  useEffect(() => {
    // Check if selectedClient is not an empty string
    // Place your side effect code here
    // This code will run after the component renders
    getClientinfo();
    getClientvehicleinfo();
    // You can perform cleanup by returning a function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //client employee list
  const getClientEmployeeinfo = async () => {
    setLoadingforclientemployee(true);
    try {
      const response = await mfaApi.get(
        `public/clientemployeeidentries/${selectedClient}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );
      if (response.data.data.length > 0) {
        setClientEmployee(response.data.data);
        setLoadingforclientemployee(false);
      } else if (response.status === 404) {
        swal("Employee not found");
        setClientEmployee([]);
        setLoadingforclientemployee(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingforclientemployee(false);
      setClientEmployee([]);
      swal(error.response.data.message);
    }
  };
  //get vehicle
  const [clientvechicleinfo, setClientvehicleInfo] = useState([]);
  console.log(clientvechicleinfo);
  //get list of client data
  const getClientvehicleinfo = async () => {
    try {
      const response = await mfaApi.get(`public/fetchvehicledetails`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      if (response.status === 200) {
        setClientvehicleInfo(response.data.data);
      }
    } catch (error) {
      console.log(error);
      swal(error.response.data.message);
    }
  };
  //client employee search
  const [searchKeywordEmployee, setSearchKeywordEmployee] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const handleSearchEmployee = (event) => {
    setSearchKeywordEmployee(event.target.value);
  };
  const handleCheckboxChangeEmployee = (data) => {
    setSelectedEmployee(data);
  };
  const filteredEmployee = clientemployee.filter((data) => {
    const { employeename, employeeno } = data;
    const lowerCasedSearchKeyword = searchKeywordEmployee.toLowerCase();
    return (
      (employeename &&
        employeename.toLowerCase().includes(lowerCasedSearchKeyword)) ||
      (employeeno && employeeno.toLowerCase().includes(lowerCasedSearchKeyword))
    );
  });
  const highlightKeywordEmployee = (text, keyword) => {
    if (!keyword || typeof text !== "string") {
      return text; // No keyword to highlight or invalid text
    }
    const regex = new RegExp(`(${escapeRegExpEm(keyword)})`, "gi");
    return (
      <span
        className="bg-yellow-200"
        dangerouslySetInnerHTML={{
          __html: text.replace(
            regex,
            (match) => `<span className="bg-yellow-200">${match}</span>`
          ),
        }}
      />
    );
  };
  const escapeRegExpEm = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
  };
  //vehicle search
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [SearchKeywordVehicle, setSearchKeywordVehicle] = useState("");
  const handleSearchVehicle = (event) => {
    setSearchKeywordVehicle(event.target.value);
  };
  const handleCheckboxChangeVehicle = (data) => {
    setSelectedVehicle(data);
  };
  const filteredVehicle = clientvechicleinfo.filter((data) => {
    const { vehiclebrand, vehicleplateno, vehicletype } = data;
    const lowerCasedSearchKeyword = SearchKeywordVehicle.toLowerCase();
    return (
      (vehiclebrand &&
        vehiclebrand.toLowerCase().includes(lowerCasedSearchKeyword)) ||
      (vehicleplateno &&
        vehicleplateno.toLowerCase().includes(lowerCasedSearchKeyword)) ||
      (vehicletype &&
        vehicletype.toLowerCase().includes(lowerCasedSearchKeyword))
    );
  });
  const highlightKeywordVehicle = (text, keyword) => {
    if (!keyword || typeof text !== "string") {
      return text; // No keyword to highlight or invalid text
    }
    const regex = new RegExp(`(${escapeRegExpVehicle(keyword)})`, "gi");
    return (
      <span
        className="bg-yellow-200"
        dangerouslySetInnerHTML={{
          __html: text.replace(
            regex,
            (match) => `<span className="bg-yellow-200">${match}</span>`
          ),
        }}
      />
    );
  };
  const escapeRegExpVehicle = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
  };
  return (
    <Main>
      <div>
        <section className="mx-auto  w-full">
          <div className="flex justify-between  bg-gray-700 rounded-md shadow-2xl shadow-green-600 py-1 mb-1">
            <h1 className="mx-auto font-sans flex justify-center px-2 uppercase text-white text-2xl font-semibold">
              <span className="flex  text-sm font-sans">
                <button
                  onClick={NavigateListEmployee}
                  className="flex  px-4 mr-4 rounded-md bg-orange-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mt-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                    />
                  </svg>
                  <p className="flex mt-1.5"> Back</p>
                </button>
              </span>{" "}
              Work Assign{" "}
              <button
                onClick={NavigateList}
                className="flex  px-4 mr-4 rounded-md bg-orange-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mt-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                  />
                </svg>
                <p className="flex mt-1.5"> Back</p>
              </button>
            </h1>
          </div>
        </section>
      </div>
      <section className="mx-auto  w-full overflow-hidden">
        <div className="mx-auto  w-full overflow-hidden">
          <div className="shadow  bg-gray-50 overflow-hidden sm:rounded-md">
            <div className="px-4  bg-blue-100 sm:p-6">
              <div className="grid grid-cols-8 gap-1">
                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label
                    htmlFor="vehiclecolor"
                    className="block text-sm font-medium  text-gray-700"
                  >
                    Rider Work Start Date
                  </label>
                  <input
                    type="date"
                    name="vehiclecolor"
                    id="vehiclecolor"
                    // value={vehicleColor}
                    // onChange={(e) => setVehicleColor(e.target.value)}
                    className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  ></input>
                </div>{" "}
                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label
                    htmlFor="vehiclecolor"
                    className="block text-sm font-medium  text-gray-700"
                  >
                    Rider Work End Date
                  </label>
                  <input
                    type="date"
                    name="vehiclecolor"
                    id="vehiclecolor"
                    // value={vehicleColor}
                    // onChange={(e) => setVehicleColor(e.target.value)}
                    className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  ></input>
                </div>
                <div className="col-span-8 sm:col-span-8 lg:col-span-4">
                  <label
                    htmlFor="vehiclecolor"
                    className="block text-sm font-medium  text-gray-700"
                  >
                    Description
                  </label>
                  <input
                    type="textarea"
                    name="vehiclecolor"
                    id="vehiclecolor"
                    // value={vehicleColor}
                    // onChange={(e) => setVehicleColor(e.target.value)}
                    className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  ></input>
                </div>
                <div className="  col-span-2 mt-2 sm:col-span-2 lg:col-span-2 shadow overflow-hidden border-b border-blue-200 sm:rounded-lg">
                  <span className="flex justify-end py-1">
                    <input
                      type="text"
                      value={searchKeywordClient}
                      onChange={handleSearchClient}
                      placeholder="Search Client...!"
                      className="flex w-full text-center rounded-md "
                    />
                  </span>
                  <div className="lg:max-h-[6rem] overflow-y-auto col-span-3 sm:col-span-43 lg:col-span-3">
                    <table className="min-w-full divide-y divide-blue-300">
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredClient?.map((data) => (
                          <tr key={uuidv4()}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-left text-gray-900">
                                <input
                                  type="radio"
                                  checked={selectedClient === data.id}
                                  onChange={() =>
                                    handleCheckboxChangeClient(data.id)
                                  }
                                />
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-left text-gray-900">
                                {highlightKeywordClient(
                                  data.partnerid || "N/A",
                                  searchKeywordClient
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className=" col-span-3 mt-2 sm:col-span-3 lg:col-span-3 shadow overflow-hidden border-b border-blue-200 sm:rounded-lg">
                  <span className="flex justify-end py-1">
                    <input
                      type="text"
                      value={searchKeywordEmployee}
                      onChange={handleSearchEmployee}
                      placeholder="Search Employee...!"
                      className="flex w-full text-center rounded-md "
                    />
                  </span>
                  {loadingforclientemployee && (
                    <div className="flex items-center justify-center">
                      <ReactLoading
                        type="bars"
                        color="#0143E2"
                        height={"4%"}
                        width={"4%"}
                      />
                      <p className="flex px-1 font-medium">
                        {" "}
                        please select client and wait...
                      </p>
                    </div>
                  )}
                  <div className="lg:max-h-[6rem] overflow-y-auto col-span-3 sm:col-span-43 lg:col-span-3">
                    <table className="min-w-full divide-y divide-blue-300">
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEmployee?.map((data) => (
                          <tr key={uuidv4()}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-left text-gray-900">
                                <input
                                  type="radio"
                                  checked={selectedEmployee === data.id}
                                  onChange={() =>
                                    handleCheckboxChangeEmployee(data.id)
                                  }
                                />
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-left text-gray-900">
                                {highlightKeywordEmployee(
                                  data.employeename +
                                    " " +
                                    " -- " +
                                    data.employeeno +
                                    " " || "N/A",
                                  searchKeywordEmployee
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className=" col-span-3 mt-2 sm:col-span-3 lg:col-span-3 shadow overflow-hidden border-b border-blue-200 sm:rounded-lg">
                  <span className="flex justify-end py-1">
                    <input
                      type="text"
                      value={SearchKeywordVehicle}
                      onChange={handleSearchVehicle}
                      placeholder="Search Vehicle...!"
                      className="flex w-full text-center rounded-md "
                    />
                  </span>
                  <div className="lg:max-h-[6rem] overflow-y-auto col-span-3 sm:col-span-43 lg:col-span-3">
                    <table className="min-w-full divide-y divide-blue-300">
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredVehicle?.map((data) => (
                          <tr key={uuidv4()}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-left text-gray-900">
                                <input
                                  type="radio"
                                  checked={selectedVehicle === data.id}
                                  onChange={() =>
                                    handleCheckboxChangeVehicle(data.id)
                                  }
                                />
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-left text-gray-900">
                                {highlightKeywordVehicle(
                                  data.vehiclebrand +
                                    " " +
                                    " -- " +
                                    data.vehicleplateno +
                                    " " +
                                    " -- " +
                                    data.vehicletype || "N/A",
                                  SearchKeywordVehicle
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <span className="flex mt-1 justify-end text-sm font-sans ">
        <button
          onClick={NavigateListEmployee}
          className="px-4 mr-2 py-2 rounded-md bg-blue-700"
        >
          Add Employee
        </button>
      </span>
    </Main>
  );
};
export default WorkAssign;
