import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EmployeeRetards = () => {
    const {id} = useParams()
    const [retards, setRetards] = useState([])
    
    useEffect(() => {
       try {
        axios.get(`http://localhost:5000/api/retards/${id}/retards`, {withCredentials: true}).then((response) => {
          console.log(response.data)
          setRetards(response.data)
        })
       } catch (error) {
        console.log(error)
       } 
    },[])
  return (
    <div className='w-4/5 my-16 mx-auto p-2'>
    <h1 className='text-2xl font-bold text-center mb-4'>Les Retards</h1>
    <div className='flex gap-2'>
    {retards.map((retard: any) => (
      <Card className='w-1/3' key={retard._id}>
      <CardHeader>
        <CardTitle>{`${new Date(retard.date_retard).toLocaleDateString("fr")}`}</CardTitle>
        <CardDescription>{retard.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='text-xl'>
          <h1>Date Retard : {new Date(retard.date_retard).toLocaleDateString("fr")}</h1>
          <h1>Motif: {retard.motif}</h1>
          <h1>Justifié : {retard.justifiee === 'true' ? 'Oui' : 'Non'}</h1>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-2'>
        <h1>Date de signalisation : {new Date(retard.createdAt).toLocaleDateString("fr")}</h1>
        <div className='flex gap-2 justify-between'>
        <Link className='text-blue-500' to={`/dashboard/retards/${retard._id}/edit`}><FaEdit size={30}/></Link>
        <Link className='text-red-500' to={`/dashboard/retards/${retard._id}/delete`}><MdDelete size={30}/></Link>
        </div>
      </CardFooter>
    </Card>
    ))}
    </div>  

  </div>
  )
}
export default EmployeeRetards