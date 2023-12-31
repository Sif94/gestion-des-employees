import { Link } from "react-router-dom";
import { FaUsers, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Button } from "../ui/button";
import {useNavigate, useLocation} from 'react-router-dom'
import { useContext } from "react";
import AuthContext from "./AuthContext.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.tsx";
  
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
                        <FaUsers size={45} /> Gestion Des Employés
                    </Link>
                </h1>
            </div>
              
          {(user && currentPath === '/dashboard') && <div className="items-center p-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
            <Avatar>
            
            <AvatarImage src={`http://localhost:5000/images/${user.profileImage}`} alt="profile image" />
            <AvatarFallback>{`${user.nom[0]} ${user.prenom[0]}`}</AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{`${user.nom}, ${user.prenom}`}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link to={`/dashboard/employees/details/${user._id}`}>Profile</Link></DropdownMenuItem>
                <DropdownMenuItem>
                <Button className="flex gap-2" onClick={() => {logout()}}>Se Deconnecter <FaSignOutAlt size={20}/>
                </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>

                
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