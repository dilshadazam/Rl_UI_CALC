import AuthContext from "../store/authContext";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const authCtx = useContext(AuthContext);
  const isAuth = authCtx.isAuthenticated;

  return (
    <>
      {!isAuth ? (
        <Navigate to="/login" state={{ from: location }} replace />
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedRoute;
