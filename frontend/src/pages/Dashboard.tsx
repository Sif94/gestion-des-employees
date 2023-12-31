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

import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import axios from "axios";
const Dashboard = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
  return (
    <section className="flex justify-between mt-16 border-4 border-black w-full mx-auto px-20 py-10">
      {user.type === "Admin" && (
          <div className="p-2 flex flex-wrap">
            <div>
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
              <div className="p-2 ">
      <ul className="flex flex-col gap-3">
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/absences`}><FaUserAltSlash size={30}/>Mes Absences</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/retards`}><FaBusinessTime  size={30}/>Mes Retards</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/conges`}><MdWorkOff size={30}/>Mes Congés</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/contrats`}><FaFileContract size={30}/>Mes Contrats</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/projets`}><FaProjectDiagram  size={30}/> Mes Projets</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/taches`}><FaTasks size={30}/> Mes Taches</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/heuressupps`}><FaClock size={30}/>Mes Heures Supplimentaires</Link>
        </li>
      </ul>
      </div>
          </div>
      )}


    {user.type === "Chef_De_Projet" && (
      <div className="p-2 flex flex-wrap">
        
        <div>
        <div className="p-2 ">
      <ul className="flex flex-col gap-3">
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/absences`}><FaUserAltSlash size={30}/>Mes Absences</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/retards`}><FaBusinessTime  size={30}/>Mes Retards</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/conges`}><MdWorkOff size={30}/>Mes Congés</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/contrats`}><FaFileContract size={30}/>Mes Contrats</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/projets`}><FaProjectDiagram  size={30}/> Mes Projets</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/taches`}><FaTasks size={30}/> Mes Taches</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/heuressupps`}><FaClock size={30}/>Mes Heures Supplimentaires</Link>
        </li>
      </ul>
      </div>
        </div>
        <div>    
      <ul className="flex flex-col gap-3">
        
        <li>
          <Link className="flex gap-2 font-bold" to={'/dashboard/projets/create'}><FaProjectDiagram size={30}/>Projets</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={'/dashboard/taches/create'}><FaTasks size={30}/>Taches</Link>
        </li>
      </ul>
        </div>
        
    </div>
    )}
    
    {user.type === "Chef_De_Departement" && (
      <div className="p-2 flex flex-wrap">
        <div>
        <div className="p-2 ">
      <ul className="flex flex-col gap-3">
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/absences`}><FaUserAltSlash size={30}/>Mes Absences</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/retards`}><FaBusinessTime  size={30}/>Mes Retards</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/conges`}><MdWorkOff size={30}/>Mes Congés</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/contrats`}><FaFileContract size={30}/>Mes Contrats</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/projets`}><FaProjectDiagram  size={30}/> Mes Projets</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/taches`}><FaTasks size={30}/> Mes Taches</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/heuressupps`}><FaClock size={30}/>Mes Heures Supplimentaires</Link>
        </li>
      </ul>
      </div>
        </div>
        <div>
      <ul className="flex flex-col gap-3">
        <li>
          <Link className="flex gap-2 font-bold" to={'/dashboard/departements'}><FaBuilding size={30}/>Départements</Link>
        </li>
        
        <li>
          <Link className="flex gap-2 font-bold" to={'/dashboard/projets/create'}><FaProjectDiagram   size={30}/>Projets</Link>
        </li>
       
      </ul>
        </div>
    </div>
    )}
    {user.type === "RH" && (
      <div className="p-2 flex flex-wrap">
        <div>
        <div className="p-2 ">
      <ul className="flex flex-col gap-3">
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/absences`}><FaUserAltSlash size={30}/>Mes Absences</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/retards`}><FaBusinessTime  size={30}/>Mes Retards</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/conges`}><MdWorkOff size={30}/>Mes Congés</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/contrats`}><FaFileContract size={30}/>Mes Contrats</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/projets`}><FaProjectDiagram  size={30}/> Mes Projets</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/taches`}><FaTasks size={30}/> Mes Taches</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/heuressupps`}><FaClock size={30}/>Mes Heures Supplimentaires</Link>
        </li>
      </ul>
      </div>
        </div>
        <div>
      <ul className="flex flex-col gap-3">
        <li>
          <Link className="flex gap-2 font-bold" to={'/dashboard/employees'}><FaUsers size={30}/> Employees</Link>
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
          <Link className="flex gap-2 font-bold" to={'/dashboard/heuressupp/create'}><FaClock   size={30}/>Heures Supplimentaires</Link>
        </li>
      </ul>
        </div>
  </div>
    )}

    {user.type === "Employee" && (
      <div className="p-2 ">
      <ul className="flex flex-col gap-3">
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/absences`}><FaUserAltSlash size={30}/>Mes Absences</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/retards`}><FaBusinessTime  size={30}/>Mes Retards</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/conges`}><MdWorkOff size={30}/>Mes Congés</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/contrats`}><FaFileContract size={30}/>Mes Contrats</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/projets`}><FaProjectDiagram  size={30}/> Mes Projets</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/taches`}><FaTasks size={30}/> Mes Taches</Link>
        </li>
        <li>
          <Link className="flex gap-2 font-bold" to={`/dashboard/employees/${user._id}/heuressupps`}><FaClock size={30}/>Mes Heures Supplimentaires</Link>
        </li>
      </ul>
      </div>
    )}






      <div className="flex flex-col p-3">
      <h1 className="text-4xl font-extrabold text-gray-700 text-center mb-10 justify-center" >Mes Informations</h1>
      <div className="flex gap-4">
      <div>
        <Avatar className="w-40 h-40">
            <Link to={`/dashboard/employees/details/${user._id}`}>
              <AvatarImage src={`http://localhost:5000/images/${user.profileImage}`} alt="@shadcn" />
              <AvatarFallback>{`${user.prenom[0]} ${user.nom[0]}`}</AvatarFallback>
            </Link>
        </Avatar>
      </div>
      <div>
     
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
      <div className="flex-col gap-2">
      <Label className="text-2xl">Département: </Label>
      <Label className="text-2xl font-bold">{`${user.departement.nom}`}</Label>
      </div>
      </div>
      </div>


      <div className="flex py-2">
      {/* <Button onClick={() => navigate('/profile/update')}>Modifier mes informations</Button> */}
      </div>
      </div>
    </section>
  )
}

export default Dashboard