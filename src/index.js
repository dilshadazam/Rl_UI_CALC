import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
//store
import { UserContextProvider } from "./store/userContext";
import { AuthContextProvider } from "./store/authContext";
// const root = document.getElementById("root");
// ReactDOM.render(
//   <React.StrictMode>
//     <AuthContextProvider>
//       <UserContextProvider>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </UserContextProvider>
//     </AuthContextProvider>
//   </React.StrictMode>
// );

// reportWebVitals();
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(
    <React.StrictMode>
      <AuthContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContextProvider>
      </AuthContextProvider>
    </React.StrictMode>,
    root
  );
  reportWebVitals();
});
