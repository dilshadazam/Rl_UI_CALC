// import React from "react";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

// const AutoPagintation = (props) => {
//   const TotalPageNo = Math.floor(
//     parseInt(props.tcount) / parseInt(props.pagePerData) + 1
//   );
//   const itemPerPageHandler = (e) => {
//     props.addPageperData(parseInt(e.target.value));
//     props.addCurrentPage(1);
//   };
//   function nextpage() {
//     if (TotalPageNo > props.currentPage) {
//       props.addCurrentPage(props.currentPage + 1);
//     }
//   }
//   function prevPage() {
//     if (props.currentPage > 1) {
//       props.addCurrentPage(props.currentPage - 1);
//     }
//   }
//   return (
//     <div className="bg-blue-200 px-4 py-3 flex items-center justify-between  sm:px-6">
//       <div className="flex-1 flex justify-between sm:hidden">
//         <button
//           onClick={prevPage}
//           className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//         >
//           Previous
//         </button>
//         <button
//           onClick={nextpage}
//           className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//         >
//           Next
//         </button>
//       </div>
//       <div className="  sm:flex-1 sm:flex sm:items-center sm:justify-between">
//         <div className="mx-2">
//           <label htmlFor="" className="text-sm text-gray-700">
//             Items Per Page
//           </label>
//           <select
//             onChange={itemPerPageHandler}
//             className="focus:ring-indigo-500 focus:border-indigo-500 mx-2 h-full py-0 px-4 border border-gray-900 bg-transparent text-gray-900 text-base rounded-md"
//           >
//             <option value="25">25</option>
//             <option value="50">50</option>
//             <option value="75">75</option>
//             <option value="100">100</option>
//           </select>
//         </div>

//         <div>
//           <div
//             className="relative z-0 inline-flex rounded-md shadow-sm   items-center -space-x-px"
//             aria-label="Pagination"
//           >
//             <div>
//               <p className="text-base text-gray-900  mx-3">
//                 Showing{" "}
//                 <span className="font-bold  mx-2 text-lg text-blue-700 ">
//                   {props.currentPage}
//                 </span>
//                 <span>of</span>
//                 <span className="font-bold mx-2 text-lg text-blue-700">
//                   {TotalPageNo}
//                 </span>{" "}
//                 Results
//               </p>
//             </div>
//             <div className=" space-x-2">
//               <button
//                 onClick={prevPage}
//                 className="relative inline-flex items-center px-2 py-2 rounded-l-md border shadow-xl border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//               >
//                 <span className="sr-only">Previous</span>
//                 <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//               </button>

//               <button
//                 onClick={nextpage}
//                 className="relative inline-flex items-center px-2 py-2 rounded-r-md border shadow-xl border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//               >
//                 <span className="sr-only">Next</span>
//                 <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AutoPagintation;
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const AutoPagintation = (props) => {
  const TotalPageNo = Math.floor(
    parseInt(props.tcount) / parseInt(props.pagePerData) + 1
  );

  const itemPerPageHandler = (event) => {
    // Call reCallApi here
    props.addPageperData(parseInt(event.target.value));
    props.addCurrentPage(1);
  };
  function nextpage() {
    if (TotalPageNo > props.currentPage) {
      props.addCurrentPage(props.currentPage + 1);
    }
  }
  function prevPage() {
    if (props.currentPage > 1) {
      props.addCurrentPage(props.currentPage - 1);
    }
  }
  return (
    <div className="bg-blue-200 px-4  flex items-center justify-between  sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={prevPage}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={nextpage}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="flex   sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div className="mx-2">
          <label htmlFor="" className="text-sm text-gray-700">
            Items Per Page
          </label>
          <select onChange={itemPerPageHandler} className=" py-1 px-6 ml-4">
            <option value="25" className="px-2 mr-4">
              25
            </option>
            <option value="50" className="px-2">
              50
            </option>
            <option value="75" className="px-2">
              75
            </option>{" "}
            <option value="100" className="px-2">
              100
            </option>
            <option value="125" className="px-2">
              125
            </option>
          </select>
          <span className="flex ">
            <button
              className="flex justify-start bg-gray-50 px-4 py-1 rounded-md shadow-lg text-blue-600 font-bold"
              onClick={() => props?.reCallApi()}
            >
              Reload
            </button>
          </span>
        </div>

        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm   items-center -space-x-px"
            aria-label="Pagination"
          >
            <div>
              <p className="text-base text-gray-900  mx-3">
                Showing{" "}
                <span className="font-bold  mx-2 text-lg text-blue-700 ">
                  {props.currentPage}
                </span>
                <span>of</span>
                <span className="font-bold mx-2 text-lg text-blue-700">
                  {TotalPageNo}
                </span>{" "}
                Total Page
              </p>
            </div>
            <div className=" space-x-2">
              <button
                onClick={prevPage}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                onClick={nextpage}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AutoPagintation;
