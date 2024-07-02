import React, { useEffect, useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import "react-swalify/dist/ReactSwalify.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import { BankRoutes, BranchRoutes,YasystemRoutes } from "./routes";
import Sidebar from "./components/Sidebar";
import Navbar from "./layout/Navbar";
import { v4 as uuid } from "uuid";
//context
import AuthContext from "./store/authContext";
import UserContext from "./store/userContext";
import Login from "./auth/Login";
//pages
const App = () => {
  const { pathname } = useLocation();
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const isAuth = authCtx.isAuthenticated;
  const role = userCtx.userRole;
  // const routes = role === "Admin" ? BankRoutes : BranchRoutes;
  const routes = role === "Admin" ? BankRoutes : role === "Yasystem" ? YasystemRoutes : BranchRoutes;
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <React.StrictMode>
      {isAuth && <Navbar />}
      {isAuth && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <Navigate to="/bjentry" replace={true} />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        {routes?.map((route) => (
          <Route
            key={uuid()}
            path={route.to}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}
      </Routes>
      {/* tost */}
    </React.StrictMode>
  );
};
export default App;
