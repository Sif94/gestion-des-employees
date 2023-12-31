import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EmployeeCongés = () => {
  const {id} = useParams()
  const [employee, setEmployee] = useState({})
    const [conges, setConges] = useState([])
    
    const getEmployee = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {withCredentials: true})
          console.log(response.data)
          setEmployee(response.data)
      } catch (error) {
          console.log(error)
      }
  }
    useEffect(() => {
       try {
        axios.get(`http://localhost:5000/api/conges/employee/conges/${id}`, {withCredentials: true}).then((response) => {
          console.log(response.data.employeeConges)
          setConges(response.data.employeeConges)
          getEmployee()
        })
       } catch (error) {
        console.log(error)
       } 
    },[])
  return (
    <div className='w-4/5 my-16 mx-auto p-2'>
    <h1 className='text-2xl font-bold text-center mb-4'>Les Congés</h1>
    <div className='flex items-start justify-center flex-wrap'>
    {conges.map((conge: any) => (
      <Card className='w-1/3' key={conge._id}>
      <CardHeader>
        <CardTitle>{`${new Date(conge.date_fin).toLocaleDateString("fr")}`}</CardTitle>
        <CardTitle>{`${new Date(conge.date_debut).toLocaleDateString("fr")}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-xl'>
          <h1>Date de début : {new Date(conge.date_debut).toLocaleDateString("fr")}</h1>
          <h1>Date de fin : {new Date(conge.date_fin).toLocaleDateString("fr")}</h1>
          <h1>type de congé : {conge.type_conge === 'true' ? 'Congé payé' : 'Congé non payé'}</h1>
          <h1>Motif: {conge.motif}</h1>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-2'>
        <h1>Date de signalisation : {new Date(conge.createdAt).toLocaleDateString("fr")}</h1>
        {employee.type === "Admin" || employee.type === "RH" ? (
        <div className='flex gap-2 justify-between'>
        <Link className='text-blue-500' to={`/dashboard/conges/${conge._id}/edit`}><FaEdit size={30}/></Link>
        <Link className='text-red-500' to={`/dashboard/conges/${conge._id}/delete`}><MdDelete size={30}/></Link>
        </div>
        ): null}
      </CardFooter>
    </Card>
    ))}
    </div>  

  </div>
  )
}
export default EmployeeCongés