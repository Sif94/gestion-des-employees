import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DepartementDetails = () => {
    const { id } = useParams();
    const [departement, setDepartement] = useState({})
    const [chef_departement, setChefDepartement] = useState({})
    const [employees, setEmployees] = useState([])
    const getDepartement = async () => {
      await axios.get(`http://localhost:5000/api/departements/${id}`, {withCredentials: true}).then((response) => {
        setDepartement(response.data.departement)
        setChefDepartement(response.data.departement.chef_departement)
        setEmployees(response.data.departement.employees)
        console.log(response.data.departement.employees)
      })
    }
    
    
    
    useEffect(() => {
      try { 
        getDepartement()
        
      } catch (error) {
        console.log(error)
      }
    },[])
  return (
    <div className='w-4/5 my-16 mx-auto p-2'>
      <Card >
        <CardHeader>
          <CardTitle>{`${departement.nom}`}</CardTitle>
          <CardDescription>{departement.emplacement}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-xl'>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {departement.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Chef de département: { `${chef_departement.nom} ${chef_departement.prenom}`}</AccordionTrigger>
              <AccordionContent className='flex text-xl justify-between'>
              <div className='text-xl'>
                <h1>Téléphone : {chef_departement.telephone}</h1>
                <h1>Adresse : {chef_departement.adresse}</h1>
                <h1>Date de naissance : {new Date(chef_departement.date_naiss).toLocaleDateString("fr")}</h1>
                <h1>Post : {chef_departement.post}</h1>
                <h1>Type Employé(e): {chef_departement.type}</h1>
              </div>
              <Avatar className="w-40 h-40">
                  <AvatarImage src={`http://localhost:5000/images/${chef_departement.profileImage}`} alt="@shadcn" />
                  <AvatarFallback>{`${chef_departement.prenom} ${chef_departement.nom}`}</AvatarFallback>
            </Avatar>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          </div>
        </CardContent>
        <CardFooter>
          <h1>Date de création : {new Date(departement.createdAt).toLocaleDateString("fr")}</h1>
        </CardFooter>
      </Card>
      <h1 className='text-2xl font-bold text-center mb-4'>La liste des employés</h1>
      <div className='flex flex-wrap'>
      {employees.map((employee: any) => (
        <Card  key={employee._id}>
        <CardHeader>
          <CardTitle className='flex justify-between items-center'>
            {`${employee.nom} ${employee.prenom}`}
            <Avatar>
            
              <AvatarImage src={`http://localhost:5000/images/${employee.profileImage}`} alt="@shadcn" />
              <AvatarFallback>{`${employee.prenom[0]} ${employee.nom[0]}`}</AvatarFallback>
            
            </Avatar>
          </CardTitle>
          <CardDescription>{employee.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-xl'>
            <h1>Téléphone : {employee.telephone}</h1>
            <h1>Adresse : {employee.adresse}</h1>
            <h1>Date de naissance : {new Date(employee.date_naiss).toLocaleDateString("fr")}</h1>
            <h1>Post : {employee.post}</h1>
            <h1>Type Employé(e): {employee.type}</h1>
          </div>
        </CardContent>
        <CardFooter>
          <h1>Date d'embauche : {new Date(employee.createdAt).toLocaleDateString("fr")}</h1>
        </CardFooter>
      </Card>
      ))}
      </div>  
      {/* <h1 className='text-2xl font-bold text-center mb-4'>La liste des projets</h1>
      <div className='flex gap-2'>
      {projets.map((projet: any) => (
        <Card className='w-1/3'>
        <CardHeader>
          <CardTitle>{`${projet.nom} ${projet.prenom}`}</CardTitle>
          <CardDescription>{projet.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-xl'>
            <h1>Téléphone : {projet.telephone}</h1>
            <h1>Adresse : {projet.adresse}</h1>
            <h1>Date de naissance : {new Date(projet.date_naiss).toLocaleDateString("fr")}</h1>
            <h1>Post : {projet.post}</h1>
            <h1>Type Employé(e): {projet.type}</h1>
          </div>
        </CardContent>
        <CardFooter>
          <h1>Date d'embauche : {new Date(projet.createdAt).toLocaleDateString("fr")}</h1>
        </CardFooter>
      </Card>
      ))}
      </div>   */}
    </div>
  )
}

export default DepartementDetails