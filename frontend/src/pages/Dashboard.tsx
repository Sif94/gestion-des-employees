import AuthContext from "@/components/shared/AuthContext.tsx"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaUsers,FaBuilding } from "react-icons/fa";

import { FaBusinessTime ,FaUserAltSlash,   } from "react-icons/fa";
import { MdWorkOff } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";

import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import axios from "axios";
const Dashboard = () => {
    const {user} = useContext(AuthContext)
    const [profileImage, setProfileImage] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
      axios.get(`http://localhost:5000/api/employees/${user._id}`, {withCredentials: true}).then((res) => {
        setProfileImage(res.data.profileImage)
      })
    },[])
  return (
    <section className="flex justify-between bg-indigo-950 mt-16  w-full mx-auto px-20 py-10">
      
      <div className="flex flex-col">
        <div>
          <h1 className="text-4xl text-white" ><span className="text-fuchsia-400">Heureux de vous revoir</span>, {user.prenom} !</h1>
        </div>
        <Avatar className="w-60 mr-14 mt-16 h-60">
            <Link to={`/dashboard/employees/details/${user._id}`}>
              <AvatarImage src={`http://localhost:5000/images/${profileImage}`} alt="@shadcn" />
              <AvatarFallback>{`${user.prenom[0]} ${user.nom[0]}`}</AvatarFallback>
            </Link>
        </Avatar>
      </div>

      <div>
      <Avatar className="w-96 h-96">
              <AvatarImage src='/dashboard.jpeg' alt="@shadcn" />
              <AvatarFallback>{`${user.prenom[0]} ${user.nom[0]}`}</AvatarFallback>
        </Avatar>
      </div>
      
    </section>
  )
}

export default Dashboard