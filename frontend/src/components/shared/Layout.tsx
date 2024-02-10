import { Link } from "react-router-dom";
import { FaUsers, FaSignInAlt, FaSignOutAlt, FaBuilding, FaUserAltSlash, FaBusinessTime, FaFileContract, FaProjectDiagram, FaTasks, FaClock } from "react-icons/fa";
import { MdDashboard, MdWorkOff } from "react-icons/md";
import { Button } from "../ui/button";
import {useNavigate, useLocation} from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext.tsx";
import { CiMenuBurger } from "react-icons/ci";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.tsx";
import axios from "axios";
import { GiArtificialIntelligence } from "react-icons/gi";
  
const Layout = ({ children }) => {
    const location = useLocation();
  const currentPath = location.pathname;
    const { user, logout } = useContext(AuthContext);
    const [profileImage, setProfileImage] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
      axios.get(`http://localhost:5000/api/employees/${user?._id}`, {withCredentials: true}).then((res) => {
        setProfileImage(res.data.profileImage)
      })
    },[])
    return (
      <>
        <header className="bg-indigo-950 flex justify-between p-2 items-center">
            <div>
                <h1 className="font-bold text-2xl">
                    <Link to="/" className="flex gap-2 items-center text-fuchsia-500">
                        <FaUsers size={45} /> <span className="text-white" >Gestion des</span>Employes
                    </Link>
                </h1>
            </div>
            <div className="flex justify-between gap-5 items-center">
            
            {(user && user.type === "Admin")  && <div className="items-center p-2 text-black">
              <DropdownMenu>
            <DropdownMenuTrigger>
            <h1 className="flex gap-1 items-center text-white text-xl font-bold">Menu <CiMenuBurger/></h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex p-3 gap-3">
                <div>
                <DropdownMenuItem><Link className="text-black flex gap-2 font-serif font-bold" to={'/dashboard/employees'}><FaUsers size={30}/> Employees</Link>
                </DropdownMenuItem>
                <DropdownMenuItem><Link className="text-black flex gap-2 font-serif font-bold" to={'/dashboard/departements'}><FaBuilding size={30}/>Départements</Link>
                </DropdownMenuItem>
                <DropdownMenuItem><Link className="text-black flex gap-2 font-serif font-bold" to={'/dashboard/absences/create'}><FaUserAltSlash size={30}/>Absences</Link>
                </DropdownMenuItem>
                <DropdownMenuItem><Link className="text-black flex gap-2 font-serif font-bold" to={'/dashboard/retards/create'}><FaBusinessTime  size={30}/>Retards</Link>
                </DropdownMenuItem>
                <DropdownMenuItem><Link className="text-black flex gap-2 font-serif font-bold" to={'/dashboard/conges/create'}><MdWorkOff   size={30}/>Congés</Link>
                </DropdownMenuItem>
                </div>
                <div>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={'/dashboard/contrats/create'}><FaFileContract size={30}/>Contrats</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={'/dashboard/projets/create'}><FaProjectDiagram  size={30}/>Projets</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={'/dashboard/taches/create'}><FaTasks size={30}/>Taches</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={'/dashboard/heuressupp/create'}><FaClock size={30}/>Heures Supplimentaires</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={'/dashboard/aideDecision'}><GiArtificialIntelligence size={35}/>Aide à la décision</Link>
                </DropdownMenuItem>
                </div>
                </div>
            </DropdownMenuContent>
            </DropdownMenu> 
            </div> }



            {(user && user.type === "Chef_De_Projet")  && <div className="items-center p-2 text-black">
              <DropdownMenu>
            <DropdownMenuTrigger>
            <h1 className="flex gap-1 items-center text-white text-xl font-bold">Menu <CiMenuBurger/></h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex p-3 gap-3">
                <div>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={'/dashboard/projets/create'}><FaProjectDiagram  size={30}/>Projets</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={'/dashboard/taches/create'}><FaTasks size={30}/>Taches</Link>
                </DropdownMenuItem>
                </div>
                </div>
            </DropdownMenuContent>
            </DropdownMenu> 
            </div> }

            {(user && user.type === "Chef_De_Departement")  && <div className="items-center p-2 text-black">
              <DropdownMenu>
            <DropdownMenuTrigger>
            <h1 className="flex gap-1 items-center text-white text-xl font-bold">Menu <CiMenuBurger/></h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex p-3 gap-3">
                <div>
                <DropdownMenuItem><Link className="text-black flex gap-2 font-serif font-bold" to={'/dashboard/departements'}><FaBuilding size={30}/>Départements</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={'/dashboard/projets/create'}><FaProjectDiagram  size={30}/>Projets</Link>
                </DropdownMenuItem>
                </div>
                </div>
            </DropdownMenuContent>
            </DropdownMenu> 
            </div> }



            {(user && user.type === "RH")  && <div className="items-center p-2 text-black">
              <DropdownMenu>
            <DropdownMenuTrigger>
            <h1 className="flex gap-1 items-center text-white text-xl font-bold">Menu <CiMenuBurger/></h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex p-3 gap-3">
                <div>
                <DropdownMenuItem><Link className="text-black flex gap-2 font-serif font-bold" to={'/dashboard/employees'}><FaUsers size={30}/> Employees</Link>
                </DropdownMenuItem>
                <DropdownMenuItem><Link className="text-black flex gap-2 font-serif font-bold" to={'/dashboard/absences/create'}><FaUserAltSlash size={30}/>Absences</Link>
                </DropdownMenuItem>
                <DropdownMenuItem><Link className="text-black flex gap-2 font-serif font-bold" to={'/dashboard/retards/create'}><FaBusinessTime  size={30}/>Retards</Link>
                </DropdownMenuItem>
                <DropdownMenuItem><Link className="text-black flex gap-2 font-serif font-bold" to={'/dashboard/conges/create'}><MdWorkOff   size={30}/>Congés</Link>
                </DropdownMenuItem>
                </div>
                <div>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={'/dashboard/contrats/create'}><FaFileContract size={30}/>Contrats</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={'/dashboard/heuressupp/create'}><FaClock size={30}/>Heures Supplimentaires</Link>
                </DropdownMenuItem>
                </div>
                </div>
            </DropdownMenuContent>
            </DropdownMenu> 
            </div> }

            {user && <div className="items-center p-2 text-black">
              <DropdownMenu>
            <DropdownMenuTrigger>
            <h1 className="flex gap-1 items-center text-white text-xl font-bold">Mes Informations <CiMenuBurger/></h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Informations</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex p-3 gap-3">
                <div>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={`/dashboard/employees/${user._id}/absences`}><FaUserAltSlash size={30}/>Mes Absences</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={`/dashboard/employees/${user._id}/retards`}><FaBusinessTime  size={30}/>Mes Retards</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={`/dashboard/employees/${user._id}/conges`}><MdWorkOff   size={30}/>Mes Congés</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={`/dashboard/employees/${user._id}/contrats`}><FaFileContract size={30}/>Mes Contrats</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={`/dashboard/employees/${user._id}/heuressupps`}><FaClock size={30}/>Mes Heures Supplimentaires</Link>
                </DropdownMenuItem>
                </div>
                <div>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={`/dashboard/employees/${user._id}/projets`}><FaProjectDiagram  size={30}/> Mes Projets</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link className="flex gap-2 font-serif text-black font-bold" to={`/dashboard/employees/${user._id}/taches`}><FaTasks size={30}/> Mes Taches</Link>
              </DropdownMenuItem>
                </div>
                </div>
            </DropdownMenuContent>
            </DropdownMenu> 
            </div> }


          {(user && currentPath === '/dashboard') && <div className="items-center p-2">
                <Button className=" bg-fuchsia-500 flex gap-2" onClick={() => {logout()}}>Se Deconnecter <FaSignOutAlt size={20}/>
                </Button>         
            </div>}






            {(user && currentPath === '/') && <div className="items-center p-2">
                <Button className="bg-fuchsia-500 flex gap-2" onClick={() => navigate('/dashboard')}>Dashboard <MdDashboard size={20}/></Button>
            </div>}
            {(!user && currentPath === '/') && <div className="items-center p-2">
                <Button className="bg-fuchsia-500 flex gap-2" onClick={() => navigate('/login')}>Se Connecter <FaSignInAlt size={20}/></Button>
            </div>}
            </div>
        </header>
        <main className=" bg-indigo-950 mx-auto w-full ">{children}</main>
      </>
    );
  };
  export default Layout;