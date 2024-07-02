/* eslint-disable no-unused-vars */
import React, { Fragment, useContext, useState, useEffect } from "react";
import mfaApi from "../../../api/mfaApi";
import { v4 as uuidv4 } from "uuid";
import AuthContext from "../../../store/authContext";
import swal from "sweetalert";
import ReactLoading from "react-loading";
import Main from "../../../layout/Main";
import { useNavigate, useParams } from "react-router-dom";
import WorkAssignUpdate from "./WorkAssignUpdate";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
const WorkAssignList = () => {
  //navigate to list page
  const navigate = useNavigate();
  function NavigateListEmployee() {
    navigate("/employee", { replace: true });
  }
  function NavigateListWOrk(vehicleid) {
    navigate(`/workassignemployee/${vehicleid}`, { replace: true });
  }
  const [id, setid] = useState();
  const { vehicleid } = useParams();
  console.log(vehicleid);
  const [vehicleNoPlate, setVehicleNoPlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const [resdata, setResdata] = useState([]);
  const [loadingforclientemployee, setLoadingforclientemployee] =
    useState(false);
  // const [clientempid, setClientempid] = useState();
  const [isloadingdelete, setisLoadingdelete] = useState(false);
  const [added, setAdded] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [checkpoint, setCheckpoint] = useState(0);
  let [isUpdateHomeOpen, setIsUpdateHomeOpen] = useState(false);
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

  const getClientDetails = async () => {
    try {
      setIsLoading(true);
      const response = await mfaApi.get(`/public/fetchassignedwork`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });

      if (response.status === 201) {
        setResdata(response.data.data);
        // setTotal(response.data);
        setIsLoading(false);
        setCheckpoint(1);
      } else {
        swal(response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      swal(error.response.data.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // Place your side effect code here
    // This code will run after the component renders
    // getClientDetails();
    getClientinfo();
    getClientvehicleinfo();
    // You can perform cleanup by returning a function
    return () => {};
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
  }, [added]);
  // function reloadPageWithDelay() {
  //   setTimeout(function () {
  //     // eslint-disable-next-line no-restricted-globals
  //     location.reload();
  //   }, 2000); // 2000 milliseconds (2 seconds)
  // }
  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };
  const filteredData = resdata.filter((data) => {
    const {
      vehicleplateno,
      partnername,
      dateofvehiclejoin,
      vehiclemodel,
      vehicleowner,
      vehiclebrand,
      vehiclecolour,
      vehicletype,
      installmentrentstartdate,
      installmentrentenddate,
      daftarexpdate,
      remarks,
    } = data;
    const lowerCasedSearchKeyword = searchKeyword.toLowerCase();
    return (
      (vehicleplateno &&
        vehicleplateno.toLowerCase().includes(lowerCasedSearchKeyword)) ||
      (partnername &&
        partnername.toLowerCase().includes(lowerCasedSearchKeyword)) ||
      (dateofvehiclejoin &&
        dateofvehiclejoin.toLowerCase().includes(lowerCasedSearchKeyword)) ||
      (vehiclemodel &&
        vehiclemodel.toLowerCase().includes(lowerCasedSearchKeyword)) ||
      (vehicleowner &&
        vehicleowner.toLowerCase().includes(lowerCasedSearchKeyword)) ||
      (vehiclebrand &&
        vehiclebrand.toLowerCase().includes(lowerCasedSearchKeyword)) ||
      (vehiclecolour &&
        vehiclecolour.toLowerCase().includes(lowerCasedSearchKeyword)) ||
      (vehicletype &&
        vehicletype.toLowerCase().includes(lowerCasedSearchKeyword)) ||
      (installmentrentstartdate &&
        installmentrentstartdate
          .toLowerCase()
          .includes(lowerCasedSearchKeyword)) ||
      (installmentrentenddate &&
        installmentrentenddate
          .toLowerCase()
          .includes(lowerCasedSearchKeyword)) ||
      (daftarexpdate &&
        daftarexpdate.toLowerCase().includes(lowerCasedSearchKeyword)) ||
      (remarks && remarks.toLowerCase().includes(lowerCasedSearchKeyword))
    );
  });
  const highlightKeyword = (text, keyword) => {
    if (!keyword || typeof text !== "string") {
      return text; // No keyword to highlight or invalid text
    }
    const regex = new RegExp(`(${escapeRegExp(keyword)})`, "gi");
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
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
  };

  //delete model
  let [isDeleteOpen, setIsDeleteOpen] = useState(false);
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  function openDeleteModal(id) {
    setIsDeleteOpen(true);
    setid(id);
  }
  const deleteHandler = async () => {
    try {
      setisLoadingdelete(true);
      const response = await mfaApi.delete(`/public/deletevehhhicle/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      if (response.status === 201) {
        setAdded(true);
        swal("Delete Successfully");
        setisLoadingdelete(false);
        getClientDetails();
      } else {
        swal(response.data.message);
        setisLoadingdelete(false);
      }
    } catch (error) {
      swal(error.response.data.message);
      setisLoadingdelete(false);
    }
    setIsDeleteOpen(false);
  };
  function closeUpdateModal() {
    setIsUpdateHomeOpen(false);
  }
  function openUpdateHomeModal(id, vehicleplateno) {
    setid(id);
    setVehicleNoPlate(vehicleplateno);
    setIsUpdateHomeOpen(true);
  }
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
          <div className=" bg-gray-700 rounded-md shadow-2xl shadow-green-600 py-1 mb-1">
            <h1 className="mx-auto font-sans flex justify-start px-2 uppercase text-white text-2xl font-semibold">
              <span className="flex justify-between text-sm font-sans">
                <button
                  onClick={NavigateListEmployee}
                  className="flex justify-between px-4 mr-4 rounded-md bg-orange-600"
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
              <span className="flex justify-between text-sm font-sans">
                <button
                  onClick={NavigateListWOrk}
                  className="px-4 mr-2 rounded-md bg-blue-700"
                >
                  + Work Assign
                </button>
              </span>
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
                    <div className="flex items-center justify-start">
                      <ReactLoading
                        type="spin"
                        color="#0143E2"
                        height={"4%"}
                        width={"4%"}
                      />
                      <p className="flex px-1 font-medium"> please wait...</p>
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
      <div className="flex justify-between py-1 px-1">
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearch}
          placeholder="Search....."
          className="text-center rounded-md text-sm text-black flex justify-end mr-2 w-1/4 "
          style={{
            backgroundColor: checkpoint === 1 ? "white" : "lightgray",
            // You can set other styles here as needed
          }}
          disabled={checkpoint !== 1}
        />

        <button
          // onClick={addVehicle}
          className="flex justify-between py-1 px-2 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-gray-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>

          <p className="mx-1">Assign Work</p>
        </button>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center my-5">
          <ReactLoading
            type="spinningBubbles"
            color="#0143E2"
            height={"6%"}
            width={"6%"}
          />
          <p className="flex px-1 font-medium">please wait...</p>
        </div>
      )}
      {isloadingdelete && (
        <div className="flex items-center justify-end my-10">
          <ReactLoading
            type="spinningBubbles"
            color="#0143E2"
            height={"6%"}
            width={"6%"}
          />
          <p className="flex px-1 font-medium"> Deleting please wait...</p>
        </div>
      )}
      {resdata.length > 0 && (
        <div className="flex flex-col">
          <div className=" overflow-x-auto relative">
            <div className="inline-block w-full">
              <div className="table-wrp block max-h-full lg:max-h-[42rem]">
                <table className="w-full">
                  <thead className="bg-blue-300 border-b sticky top-0">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Delete
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Update
                      </th>
                      <th
                        scope="col"
                        className="px-1 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Ref. No.
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Client Id
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Client Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Emp. Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Emp. Id
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Client Emp. Id
                      </th>{" "}
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Client Emp.name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        vehicle no
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Vehicle Brand
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Vehicle Colour
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Vehicle Type
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Vehicle Model
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Work Start Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Work End Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Work Assigned By
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        dESCRIPTION
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 whitespace-nowrap text-left text-xs  text-gray-900 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData?.reverse().map((data, index) => (
                      <tr key={uuidv4()}>
                        <td className=" flex justify-start text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap">
                          <button
                            onClick={() => openDeleteModal(data.id)}
                            className="text-base flex  justify-start font-semibold shadow-md rounded-md px-3 py-2 text-red-600 bg-blue-200"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="#dc2626"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </td>
                        <td className="px-1 py-2 whitespace-nowrap">
                          <button
                            className="flex justify-center items-baseline text-sm text-white bg-blue-500 px-2 py-2 rounded-md"
                            onClick={() =>
                              openUpdateHomeModal(data.id, data.vehicleplateno)
                            }
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
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                              />
                            </svg>
                          </button>
                        </td>
                        <td className="px-1 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 text-center">
                            {resdata.length - index || "N/A"}
                          </div>
                        </td>

                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {highlightKeyword(
                              data.partnerenrolledid || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {highlightKeyword(
                              data.partnername || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {highlightKeyword(
                              data.drivername || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {highlightKeyword(
                              data.driveridcardno || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {highlightKeyword(
                              data.clientemployeeid || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 break-all">
                            {highlightKeyword(
                              data.partneremployeename || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 break-all">
                            {highlightKeyword(
                              data.vehicleplateno || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 break-all">
                            {highlightKeyword(
                              data.vehiclebrand || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 break-all">
                            {highlightKeyword(
                              data.vehiclecolour || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 break-all">
                            {data.vehicletype || "---"}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 break-all">
                            {highlightKeyword(
                              data.vehiclemodel || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 break-all">
                            {highlightKeyword(
                              data.riderworkstartdate || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 break-all">
                            {highlightKeyword(
                              data.riderworkenddate || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 break-all">
                            {highlightKeyword(
                              data.assignedbyname || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 break-all">
                            {highlightKeyword(
                              data.description || "--",
                              searchKeyword
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div
                            className={`text-sm font-medium ${
                              data.isActive === 1
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {data.isActive === 1 ? "Active" : "Inactive"}
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
      )}
      {/* Update model */}

      <Transition appear show={isUpdateHomeOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto "
          onClose={closeUpdateModal}
        >
          <div className="min-h-screen px-4 text-center items-end">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen  align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full  max-w-3xl  py-2 px-6 my-8 overflow-hidden text-left align-top mt-32 transition-all transform bg-yellow-100   shadow-md rounded-xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold  text-center my-3 leading-6 text-gray-900"
                >
                  Update Vehicle :-{vehicleNoPlate}
                </Dialog.Title>
                <WorkAssignUpdate
                  vehicleid={id}
                  //onSaveUpdateData={UpdateataHandler}
                  onClose={closeUpdateModal}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* Delete model */}
      <Transition appear show={isDeleteOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto "
          onClose={closeDeleteModal}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen  align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-md transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Delete
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-900">
                          Are you sure you want to delete ? All of your data
                          will be permanently removed. This action cannot be
                          undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={deleteHandler}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeDeleteModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Main>
  );
};

export default WorkAssignList;
