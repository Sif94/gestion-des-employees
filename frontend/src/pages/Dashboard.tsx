import AuthContext from "@/components/shared/AuthContext.tsx"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { FaUsers,FaBuilding } from "react-icons/fa";

import { FaBusinessTime ,FaUserAltSlash,   } from "react-icons/fa";
import { MdWorkOff } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
const Dashboard = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
  return (
    <section className="flex justify-between mt-16 border-4 border-black w-full mx-auto px-20 py-10">
      <div className="p-2">
        <ul className="flex flex-col gap-3">
          <li>
            <Link className="flex gap-2 font-bold" to={'/dashboard/employees'}><FaUsers size={30}/> Employees</Link>
          </li>
          <li>
            <Link className="flex gap-2 font-bold" to={'/dashboard/departements'}><FaBuilding size={30}/>Départements</Link>
          </li>
          <li>
            <Link className="flex gap-2 font-bold" to={'/dashboard/absences/create'}><FaUserAltSlash size={30}/>Absences</Link>
          </li>
          <li>
            <Link className="flex gap-2 font-bold" to={'/dashboard/retards/create'}><FaBusinessTime  size={30}/>Retards</Link>
          </li>
          <li>
            <Link className="flex gap-2 font-bold" to={'/dashboard/conges/create'}><MdWorkOff   size={30}/>Congés</Link>
          </li>
          <li>
            <Link className="flex gap-2 font-bold" to={'/dashboard/contrats/create'}><FaFileContract   size={30}/>Contrats</Link>
          </li>
          <li>
            <Link className="flex gap-2 font-bold" to={'/dashboard/projets/create'}><FaProjectDiagram   size={30}/>Projets</Link>
          </li>
          <li>
            <Link className="flex gap-2 font-bold" to={'/dashboard/taches/create'}><FaTasks   size={30}/>Taches</Link>
          </li>
          <li>
            <Link className="flex gap-2 font-bold" to={'/dashboard/heuressupp/create'}><FaClock   size={30}/>Heures Supplimentaires</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col p-3">
        <h1 className="text-4xl font-extrabold text-gray-700 text-center mb-10">Mes Informations</h1>
      <div className="flex-col gap-2">
      <Label className="text-2xl">Nom Complet: </Label>
      <Label className="text-2xl font-bold">{`${user.nom} ${user.prenom}`}</Label>
      </div>
      <div className="flex-col gap-2">
      <Label className="text-2xl">Date de naissance: </Label>
      <Label className="text-2xl font-bold">{`${new Date(user.date_naiss).toLocaleDateString("fr")}`}</Label>
      </div>
      <div className="flex-col gap-2">
      <Label className="text-2xl">Email: </Label>
      <Label className="text-2xl font-bold">{`${user.email}`}</Label>
      </div>
      <div className="flex-col gap-2">
      <Label className="text-2xl">Téléphone: </Label>
      <Label className="text-2xl font-bold">{`${user.telephone}`}</Label>
      </div>
      <div className="flex-col gap-2">
      <Label className="text-2xl">Post: </Label>
      <Label className="text-2xl font-bold">{`${user.post}`}</Label>
      </div>
      <div className="flex-col gap-2">
      <Label className="text-2xl">Type: </Label>
      <Label className="text-2xl font-bold">{`${user.type}`}</Label>
      </div>
      <div className="flex py-2">
      {/* <Button onClick={() => navigate('/profile/update')}>Modifier mes informations</Button> */}
      </div>
      </div>
    </section>
  )
}

export default Dashboard