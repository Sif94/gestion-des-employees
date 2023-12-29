import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EmployeeContrats = () => {
    const {id} = useParams()
    const [contrats, setContrats] = useState([])
    
    useEffect(() => {
       try {
        axios.get(`http://localhost:5000/api/contrats/employee/${id}/contrats`, {withCredentials: true}).then((response) => {
          console.log(response.data)
          setContrats(response.data)
        })
       } catch (error) {
        console.log(error)
       } 
    },[])
  return (
    <div className='w-4/5 my-16 mx-auto p-2'>
    <h1 className='text-2xl font-bold text-center mb-4'>Les Contrats</h1>
    <div className='flex gap-2'>
    {contrats.map((contrat: any) => (
      <Card className='w-1/3' key={contrat._id}>
      <CardHeader>
        <CardDescription>{contrat.type_contrat}</CardDescription>
        <CardTitle>{`${new Date(contrat.date_debut).toLocaleDateString("fr")}`}</CardTitle>
        <CardTitle>{`${new Date(contrat.date_fin).toLocaleDateString("fr")}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-xl'>
        <h1>type contrat: {contrat.type_contrat}</h1>
          <h1>date debut du contrat : {new Date(contrat.date_debut).toLocaleDateString("fr")}</h1>
          <h1>date fin du contrat : {new Date(contrat.date_fin).toLocaleDateString("fr")}</h1>
          <h1>salaire convenu: {contrat.salaire_convenu}</h1>
        
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-2'>
        <h1>Date de signalisation : {new Date(contrat.createdAt).toLocaleDateString("fr")}</h1>
        <div className='flex gap-2 justify-between'>
        <Link className='text-blue-500' to={`/dashboard/contrats/${contrat._id}/edit`}><FaEdit size={30}/></Link>
        <Link className='text-red-500' to={`/dashboard/contrats/${contrat._id}/delete`}><MdDelete size={30}/></Link>
        </div>
      </CardFooter>
    </Card>
    ))}
    </div>  

  </div>
  )
}
export default EmployeeContrats