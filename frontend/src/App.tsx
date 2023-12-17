import Layout from "./components/shared/Layout"
import {Routes, Route, redirect} from 'react-router-dom'
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import  { AuthContextProvider } from "./components/shared/AuthContext.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.tsx";
import axios from "axios";
import Employees from "./pages/employees/Employees.tsx";
import EmployeeDetails from "./pages/employees/EmployeeDetails.tsx";
import EmployeeDelete from "./pages/employees/EmployeeDelete.tsx";
import EmployeeCreate from "./pages/employees/EmployeeCreate.tsx";
import EmployeeEdit from "./pages/employees/EmployeeEdit.tsx"; 
import Departements from "./pages/departements/Departements.tsx";
import DepartementDetails from "./pages/departements/DepartementDetails.tsx";
import DepartementCreate from "./pages/departements/DepartementCreate.tsx";
import DepartementEdit from "./pages/departements/DepartementEdit.tsx";
import DepartementDelete from "./pages/departements/DepartementDelete.tsx";


// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      await axios
        .get("http://localhost:5000/api/employees/refresh/token", {
          withCredentials: true,
        })
        .catch((err) => {
          localStorage.removeItem("userProfile");
          redirect("/login");
          return Promise.reject(err);
        });
      console.log(error.config);
      return axios(error.config);
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
          <Route path="/dashboard/employees" element={
          <ProtectedRoute accessBy="authenticated">
            <Employees />
          </ProtectedRoute>
          } />
          <Route path="/dashboard/employees/details/:id" element={
            <ProtectedRoute accessBy="authenticated">
              <EmployeeDetails />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/employees/delete/:id" element={
            <ProtectedRoute accessBy="authenticated">
              <EmployeeDelete />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/employees/create" element={
            <ProtectedRoute accessBy="authenticated">
              <EmployeeCreate/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/employees/edit/:id" element={
            <ProtectedRoute accessBy="authenticated">
              <EmployeeEdit/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/departements" element={
            <ProtectedRoute accessBy="authenticated">
              <Departements/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/departements/create" element={
            <ProtectedRoute accessBy="authenticated">
              <DepartementCreate/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/departements/edit/:id" element={
            <ProtectedRoute accessBy="authenticated">
              <DepartementEdit/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/departements/delete/:id" element={
            <ProtectedRoute accessBy="authenticated">
              <DepartementDelete/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/departements/details/:id" element={
            <ProtectedRoute accessBy="authenticated">
              <DepartementDetails/>
            </ProtectedRoute>
          } />
          
        </Routes>
      </Layout>
      </AuthContextProvider>
    </>
  )
}

export default App
