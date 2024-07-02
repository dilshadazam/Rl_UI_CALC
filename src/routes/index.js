
import Bankjournel from "../pages/BankJournel/Bankjournel";
import MyCalculator from "../pages/Mycalc/Mycalcu";
import DeleteRoom from "../pages/Delete/DeleteRoom";
// iocns
import {
  CashIcon,
} from "@heroicons/react/solid";
import { CalculatorIcon, TrashIcon } from "@heroicons/react/outline";

//admin routs
export const BankRoutes = [
  {
    name: "Customer Entry",
    to: "/bjentry",
    element: <Bankjournel />,
    icons: <CashIcon className="h-6 text-gray-500 font-sans" />,
  },
  {
    name: "Calculation",
    to: "/myCalculation",
    element: <MyCalculator />,
    icons: <CalculatorIcon className="h-6 text-gray-500 font-sans" />,
  },
  {
    name: "Delete",
    to: "/delete",
    element: <DeleteRoom />,
    icons: <TrashIcon className="h-6 text-red-600 font-sans" />,
  },
];
export const BranchRoutes = [
  
  {
    name: "Customer Entry",
    to: "/bjentry",
    element: <Bankjournel />,
    icons: <CashIcon className="h-6 text-gray-500 font-sans" />,
  },
  
];


export const YasystemRoutes = [ 

  {
    name: "Customer Entry",
    to: "/bjentry",
    element: <Bankjournel />,
    icons: <CashIcon className="h-6 text-gray-500 font-sans" />,
  },
];
