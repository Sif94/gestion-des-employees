/* eslint-disable prefer-const */
import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);
 
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    let userProfle = localStorage.getItem("userProfile");
    if (userProfle) {
      return JSON.parse(userProfle);
    }
    return null;
  });
  const navigate = useNavigate();
  const login = async (payload) => {
    await axios.post("http://localhost:5000/api/employees/auth", payload, {
      withCredentials: true,
    });
    await axios.get("http://localhost:5000/api/employees/auth/profile", {
      withCredentials: true,
    }).then((res) => {
      localStorage.setItem("userProfile", JSON.stringify(res.data));
      setUser(res.data);
      navigate("/dashboard");
    }).catch((err) => {
      console.log(err.message);
      setUser(null);
      localStorage.removeItem("userProfile");
      navigate("/login");
    });
    
    
  };
  const logout = async () => {
    await axios.post("http://localhost:5000/api/employees/logout", {} ,{ withCredentials: true });
    localStorage.removeItem("userProfile");
    setUser(null);
    navigate("/login");
  };
  return (
    <>
      <AuthContext.Provider value={{  user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
 
export default AuthContext;