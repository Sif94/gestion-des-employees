import { Link } from "react-router-dom";
import { FaUsers, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Button } from "../ui/button";
import {useNavigate, useLocation} from 'react-router-dom'
import { useContext } from "react";
import AuthContext from "./AuthContext.tsx";
const Layout = ({ children }) => {
    const location = useLocation();
  const currentPath = location.pathname;
    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();
    return (
      <>
        <header className="flex justify-between p-2 items-center">
            <div>
                <h1 className="font-bold text-2xl">
                    <Link to="/" className="flex gap-2 items-center text-gray-800">
                        <FaUsers size={35} /> Gestion Des Employés
                    </Link>
                </h1>
            </div>
            {(!user && currentPath === '/') && <div>
                <ul className="flex items-start p-2 gap-4 font-bold text-xl text-gray-800">
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/help'}>Aide</Link>
                    </li>
                    <li>
                        <Link to={'/Contact'}>Contact</Link>
                    </li>
                </ul>
            </div>}
            {(!user && currentPath !== '/login' && currentPath !== '/') && <div>
             <ul className="flex items-start p-2 gap-4 font-bold text-xl text-gray-800">
                 <li>
                     <Link to={'/employees'}>Employees</Link>
                 </li>
                 <li>
                     <Link to={'/departements'}>Departements</Link>
                 </li>
                 <li>
                     <Link to={'/projets'}>Projets</Link>
                 </li>
             </ul>
         </div>}
              
          {(user && currentPath === '/dashboard') && <div className="items-center p-2">
                <Button className="flex gap-2" onClick={() => {logout()}}>Se Deconnecter <FaSignOutAlt size={20}/></Button>
            </div>}
            {(user && currentPath === '/') && <div className="items-center p-2">
                <Button className="flex gap-2" onClick={() => navigate('/dashboard')}>Dashboard <MdDashboard size={20}/></Button>
            </div>}
            {(!user && currentPath === '/') && <div className="items-center p-2">
                <Button className="flex gap-2" onClick={() => navigate('/login')}>Se Connecter <FaSignInAlt size={20}/></Button>
            </div>}
        </header>
        <main className="mx-auto w-full ">{children}</main>
      </>
    );
  };
  export default Layout;