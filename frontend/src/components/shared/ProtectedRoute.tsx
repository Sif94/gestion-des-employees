import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext.tsx";
 
const ProtectedRoute = ({ children, accessBy }) => {
  const { user } = useContext(AuthContext);
 
  if (accessBy === "non-authenticated") {
    if (!user) {
      return children;
    }
  } else if (accessBy === "authenticated") {
    if (user) {
      return children;
    }else {
        return <Navigate to={'/login'}></Navigate>
    }
  }
  return <Navigate to="/"></Navigate>;
};
export default ProtectedRoute;