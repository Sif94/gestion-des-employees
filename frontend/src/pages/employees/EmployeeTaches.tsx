import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EmployeeTaches = () => {
    const {id} = useParams()
    const [taches, setTaches] = useState([])
    
    useEffect(() => {
       try {
        axios.get(`http://localhost:5000/api/taches/${id}`, {withCredentials: true}).then((response) => {
          console.log(response.data)
          setTaches(response.data)
        })
       } catch (error) {
        console.log(error)
       } 
    },[])
  return (
    <div className='w-4/5 my-16 mx-auto p-2'>
    <h1 className='text-2xl font-bold text-center mb-4'>Les taches</h1>
    <div className='flex gap-2'>
    {taches.map((tache: any) => (
      <Card className='w-1/3' key={tache._id}>
      <CardHeader>
        <CardDescription>{tache.titre}</CardDescription>
        <CardDescription>{tache.description}</CardDescription>
        <CardTitle>{`${new Date(tache.date_debut).toLocaleDateString("fr")}`}</CardTitle>
        <CardTitle>{`${new Date(tache.date_fin).toLocaleDateString("fr")}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-xl'>
        <h1>Titre: {tache.titre}</h1>
        <h1>Description: {tache.description}</h1>
          <h1>date debut de la tache : {new Date(tache.date_debut).toLocaleDateString("fr")}</h1>
          <h1>date fin de tache : {new Date(tache.date_fin).toLocaleDateString("fr")}</h1>
        
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-2'>
        <h1>Date de signalisation : {new Date(tache.createdAt).toLocaleDateString("fr")}</h1>
        <div className='flex gap-2 justify-between'>
        <Link className='text-blue-500' to={`/dashboard/taches/${tache._id}/edit`}><FaEdit size={30}/></Link>
        <Link className='text-red-500' to={`/dashboard/taches/${tache._id}/delete`}><MdDelete size={30}/></Link>
        </div>
      </CardFooter>
    </Card>
    ))}
    </div>  

  </div>
  )
}
export default EmployeeTaches