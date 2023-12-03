import Layout from "./components/shared/Layout"
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import { AuthContextProvider } from "./components/shared/AuthContext.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.tsx";
import axios from "axios";


axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
       await axios
        .get("http://localhost:5000/api/employees/employees/refresh/token", {
          withCredentials: true,
        }).then((res) => {
          if (res.status === 200) {
            console.log("Access token refreshed");
            return axios(error.config);
          }
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject(err);
        });
    } else {
      return Promise.reject(error);
    }
  }
);
 
function App() {

  return (
    <>
    <AuthContextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<ProtectedRoute accessBy="non-authenticated">
                  <LoginPage />
                </ProtectedRoute>} />
          <Route path="/dashboard" element={
          <ProtectedRoute accessBy="authenticated">
            <Dashboard />
          </ProtectedRoute>
          } />
        </Routes>
      </Layout>
      </AuthContextProvider>
    </>
  )
}

export default App
