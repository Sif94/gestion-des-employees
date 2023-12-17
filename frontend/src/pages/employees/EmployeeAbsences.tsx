import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EmployeeAbsences = () => {
    const {id} = useParams()
    const [absences, setAbsences] = useState([])
    
    useEffect(() => {
       try {
        axios.get(`http://localhost:5000/api/absences/employee/${id}/absences`, {withCredentials: true}).then((response) => {
          console.log(response.data)
          setAbsences(response.data)
        })
       } catch (error) {
        console.log(error)
       } 
    },[])
  return (
    <div className='w-4/5 my-16 mx-auto p-2'>
    <h1 className='text-2xl font-bold text-center mb-4'>Les Absences</h1>
    <div className='flex gap-2'>
    {absences.map((absence: any) => (
      <Card className='w-1/3' key={absence._id}>
      <CardHeader>
        <CardTitle>{`${new Date(absence.date_absence).toLocaleDateString("fr")}`}</CardTitle>
        <CardDescription>{absence.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='text-xl'>
          <h1>Date Absence : {new Date(absence.date_absence).toLocaleDateString("fr")}</h1>
          <h1>Motif: {absence.motif}</h1>
          <h1>Justifié : {absence.justifiee === 'true' ? 'Oui' : 'Non'}</h1>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-2'>
        <h1>Date de signalisation : {new Date(absence.createdAt).toLocaleDateString("fr")}</h1>
        <div className='flex gap-2 justify-between'>
        <Link className='text-blue-500' to={`/dashboard/absences/${absence._id}/edit`}><FaEdit size={30}/></Link>
        <Link className='text-red-500' to={`/dashboard/absences/${absence._id}/delete`}><MdDelete size={30}/></Link>
        </div>
      </CardFooter>
    </Card>
    ))}
    </div>  

  </div>
  )
}

export default EmployeeAbsences