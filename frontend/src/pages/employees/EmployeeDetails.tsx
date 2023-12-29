import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';


const EmployeeDetails = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const [employee, setEmployee] = useState({})

    const getEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {withCredentials: true})
            console.log(response.data)
            setEmployee(response.data)
            // setEmployee(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        getEmployee()
    },[])
  return (
    <div className='w-4/5 my-16 mx-auto p-2'>
        <Card >
        <CardHeader>
          <CardTitle>{`${employee.nom} ${employee.prenom}`}</CardTitle>
          <CardDescription>{employee.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-xl'>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Informations</AccordionTrigger>
              <AccordionContent>
                
                <h1>Email : {employee.email}</h1>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Information Complète: { `${employee.nom} ${employee.prenom}`}</AccordionTrigger>
              <AccordionContent>
              <div className='text-xl'>
                <h1>Téléphone : {employee.telephone}</h1>
                <h1>Adresse : {employee.adresse}</h1>
                <h1>Date de naissance : {new Date(employee.date_naiss).toLocaleDateString("fr")}</h1>
                <h1>Post : {employee.post}</h1>
                <h1>Type Employé(e): {employee.type}</h1>
                <h1>Situation Marital: {employee.situation_marital}</h1>
              </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col items-start gap-2'>
          <h1>Date d'embauche : {new Date(employee.createdAt).toLocaleDateString("fr")}</h1>
          <div className='flex gap-2 justify-between'>
          <Button><Link to={`/dashboard/employees/${id}/absences`}>Absences</Link></Button>
          </div>
          <div className='flex gap-2 justify-between'>
          <Button><Link to={`/dashboard/employees/${id}/retards`}>Retards</Link></Button>
          </div>
          <div className='flex gap-2 justify-between'>
          <Button><Link to={`/dashboard/employees/${id}/conges`}>Congés</Link></Button>
          </div>
          <div className='flex gap-2 justify-between'>
          <Button><Link to={`/dashboard/employees/${id}/contrats`}>Contrats</Link></Button>
          </div>
          <div className='flex gap-2 justify-between'>
          <Button><Link to={`/dashboard/employees/${id}/projets`}>Projets</Link></Button>
          </div>
          <div className='flex gap-2 justify-between'>
          <Button><Link to={`/dashboard/employees/${id}/taches`}>Taches</Link></Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EmployeeDetails