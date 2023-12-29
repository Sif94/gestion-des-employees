import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const EmployeeProjets = () => {
    const {id} = useParams()
    const [projets, setProjet ]= useState([])
    
    useEffect(() => {
       try {
        axios.get(`http://localhost:5000/api/projets/${id}`, {withCredentials: true}).then((response) => {
          console.log(response.data)
          setProjet(response.data)
        })
       } catch (error) {
        console.log(error)
       } 
    },[])
  return (
    <div className='w-4/5 my-16 mx-auto p-2'>
    <h1 className='text-2xl font-bold text-center mb-4'>Les Projets</h1>
    <div className='flex gap-2'>
    {projets.map((projet: any) => (
      <Card className='w-1/3' key={projet._id}>
      <CardHeader>
        <CardDescription>{projet.titre}</CardDescription>
        <CardTitle>{`${new Date(projet.date_debut).toLocaleDateString("fr")}`}</CardTitle>
        <CardTitle>{`${new Date(projet.date_fin).toLocaleDateString("fr")}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-xl'>
          <h1>description: {projet.titre}</h1>
          <h1>date debut du contrat : {new Date(projet.date_debut).toLocaleDateString("fr")}</h1>
          <h1>date fin du contrat : {new Date(projet.date_fin).toLocaleDateString("fr")}</h1>
          <h1>Durée: {projet.duree}</h1>
          <h1>Chef du projet: {projet.chef_projet}</h1>
          <h1>Departement {projet.departements}</h1>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-2'>
        <h1>Date de signalisation : {new Date(projet.createdAt).toLocaleDateString("fr")}</h1>
        <div className='flex gap-2 justify-between'>
        <Link className='text-blue-500' to={`/dashboard/projets/${projet._id}/edit`}><FaEdit size={30}/></Link>
        <Link className='text-red-500' to={`/dashboard/projets/${projet._id}/delete`}><MdDelete size={30}/></Link>
        </div>
      </CardFooter>
    </Card>
    ))}
    </div>  

  </div>
  )
}
export default EmployeeProjets