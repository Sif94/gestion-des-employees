import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
const EmployeeContrats = () => {
    const {id} = useParams()
    const [contrats, setContrats] = useState([])
    const [employee, setEmployee] = useState({})
    const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

 

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
        axios.get(`http://localhost:5000/api/contrats/employee/${id}/contrats`, {withCredentials: true}).then((response) => {
          console.log(response.data)
          setContrats(response.data)
          getEmployee()
        })
       } catch (error) {
        console.log(error)
       } 
    },[])
  return (
    <div className='w-4/5 my-16 mx-auto p-2'>
    <h1 className='text-2xl font-bold text-center mb-4'>Les Contrats</h1>
    
    <div className='flex items-start justify-center flex-wrap'>
      
    {contrats.map((contrat: any, index:any) => (
      <Card className='w-1/3 p-3' key={index} ref={componentRef}>
        <Button onClick={handlePrint}>Imprimer</Button>
        
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
        {employee.type === "Admin" || employee.type === "RH" ? (
        <div className='flex gap-2 justify-between'>
        <Link className='text-blue-500' to={`/dashboard/contrats/${contrat._id}/edit`}><FaEdit size={30}/></Link>
        <Link className='text-red-500' to={`/dashboard/contrats/${contrat._id}/delete`}><MdDelete size={30}/></Link>
        </div>
        ):null}
        
      </CardFooter>
    </Card>
    ))}
    
    </div>  

  </div>
  )
}
export default EmployeeContrats