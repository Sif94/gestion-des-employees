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
import AbsenceCreate from "./pages/absences/AbsenceCreate.tsx";
import EmployeeAbsences from "./pages/employees/EmployeeAbsences.tsx";
import AbsenceEdit from "./pages/absences/AbsenceEdit.tsx";
import RetardCreate from "./pages/Retards/RetardCreate.tsx";
import RetardEdit from "./pages/Retards/RetardEdit.tsx";
import EmployeeRetards from "./pages/employees/EmployeeRetards.tsx";
import CongéEdit from "./pages/Congés/CongéEdit.tsx";
import CongéCreate from "./pages/Congés/CongéCreate.tsx";
import EmployeeCongés from "./pages/employees/EmployeeCongés.tsx";
import EmployeeContrats from "./pages/employees/EmployeeContrats.tsx";
import ContratCreate from "./pages/contrats/ContratCreate.tsx";
import ContratEdit from "./pages/contrats/ContratEdit.tsx";
import EmployeeProjets from "./pages/employees/EmployeeProjets.tsx";
import ProjetCreate from "./pages/projets/ProjetCreate.tsx";
import ProjetEdit from "./pages/projets/ProjetEdit.tsx";
import TacheCreate from "./pages/taches/TacheCreate.tsx";
import TacheEdit from "./pages/taches/TacheEdit.tsx";
import EmployeeTaches from "./pages/employees/EmployeeTaches.tsx";
import EmployeeHeuressupp from "./pages/employees/EmployeeHeuressupp.tsx";
import HeuresuppCreate from "./pages/heuressupp/HeuresuppCreate.tsx";
import HeuresuppEdit from "./pages/heuressupp/HeuresuppEdit.tsx";
import TacheDelete from "./pages/taches/TacheDelete.tsx";
import ProjetDelete from "./pages/projets/ProjetDelete.tsx";
import ContratDelete from "./pages/contrats/ContratDelete.tsx";
import CongeDelete from "./pages/Congés/CongeDelete.tsx";
import RetardDelete from "./pages/Retards/RetardDelete.tsx";
import AbsenceDelete from "./pages/absences/AbsenceDelete.tsx";
import HeuresuppDelete from "./pages/heuressupp/HeuresuppDelete.tsx";
import ContratDetails from "./pages/contrats/ContratDetails.tsx";
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
          <Route path="/dashboard/employees/:id/absences" element={
            <ProtectedRoute accessBy="authenticated">
              <EmployeeAbsences/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/employees/:id/retards" element={
            <ProtectedRoute accessBy="authenticated">
              <EmployeeRetards/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/employees/:id/conges" element={
            <ProtectedRoute accessBy="authenticated">
              <EmployeeCongés/>
            </ProtectedRoute>
          } />
           <Route path="/dashboard/employees/:id/contrats" element={
            <ProtectedRoute accessBy="authenticated">
              <EmployeeContrats/>
            </ProtectedRoute>
          } />
           <Route path="/dashboard/employees/:id/projets" element={
            <ProtectedRoute accessBy="authenticated">
              <EmployeeProjets/>
            </ProtectedRoute>
          } />
            <Route path="/dashboard/employees/:id/taches" element={
            <ProtectedRoute accessBy="authenticated">
              <EmployeeTaches/>
            </ProtectedRoute>
          } />
            <Route path="/dashboard/employees/:id/heuressupps" element={
            <ProtectedRoute accessBy="authenticated">
              <EmployeeHeuressupp/>
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
          <Route path="/dashboard/absences/create" element={
            <ProtectedRoute accessBy="authenticated">
              <AbsenceCreate/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/absences/:id/edit" element={
            <ProtectedRoute accessBy="authenticated">
              <AbsenceEdit/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/absences/:id/delete" element={
            <ProtectedRoute accessBy="authenticated">
              <AbsenceDelete/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/retards/create" element={
            <ProtectedRoute accessBy="authenticated">
              <RetardCreate/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/retards/:id/edit" element={
            <ProtectedRoute accessBy="authenticated">
              <RetardEdit/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/retards/:id/delete" element={
            <ProtectedRoute accessBy="authenticated">
              <RetardDelete/>
            </ProtectedRoute>
          } />
            <Route path="/dashboard/conges/create" element={
            <ProtectedRoute accessBy="authenticated">
              <CongéCreate/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/conges/:id/edit" element={
            <ProtectedRoute accessBy="authenticated">
              <CongéEdit/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/conges/:id/delete" element={
            <ProtectedRoute accessBy="authenticated">
              <CongeDelete/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/contrats/create" element={
            <ProtectedRoute accessBy="authenticated">
              <ContratCreate/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/contrats/:id/edit" element={
            <ProtectedRoute accessBy="authenticated">
              <ContratEdit/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/contrats/:id/delete" element={
            <ProtectedRoute accessBy="authenticated">
              <ContratDelete/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/contrats/:id/details" element={
            <ProtectedRoute accessBy="authenticated">
              <ContratDetails/>
            </ProtectedRoute>
          } />
           <Route path="/dashboard/projets/create" element={
            <ProtectedRoute accessBy="authenticated">
              <ProjetCreate/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/projets/:id/edit" element={
            <ProtectedRoute accessBy="authenticated">
              <ProjetEdit/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/projets/:id/delete" element={
            <ProtectedRoute accessBy="authenticated">
              <ProjetDelete/>
            </ProtectedRoute>
          } />
            <Route path="/dashboard/taches/create" element={
            <ProtectedRoute accessBy="authenticated">
              <TacheCreate/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/taches/:id/edit" element={
            <ProtectedRoute accessBy="authenticated">
              <TacheEdit/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/taches/:id/delete" element={
            <ProtectedRoute accessBy="authenticated">
              <TacheDelete/>
            </ProtectedRoute>
          } />
            <Route path="/dashboard/heuressupp/create" element={
            <ProtectedRoute accessBy="authenticated">
              <HeuresuppCreate/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/heuressupp/:id/edit" element={
            <ProtectedRoute accessBy="authenticated">
              <HeuresuppEdit/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/heuressupp/:id/delete" element={
            <ProtectedRoute accessBy="authenticated">
              <HeuresuppDelete/>
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
      </AuthContextProvider>
    </>
  )
}

export default App
