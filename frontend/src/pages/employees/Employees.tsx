import React from 'react'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
  
const Employees = () => {
  const navigate = useNavigate()
  const [employees, setEmployees] = React.useState([])
const getEmployees = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/employees/", {withCredentials: true})
    if (response.status === 200) {
      console.log(response.data)
      setEmployees(response.data)
    } else {
      console.log('erreur')
    }
  } catch (error) {
    console.log(error)
  }
}
  React.useEffect(() => {
    getEmployees()
  },[])





  return (
    <div className='w-4/5 my-16 mx-auto'>
      <Button className='mb-4' onClick={() => navigate('/dashboard/employees/create')} >Ajouter un employé</Button>
    <Table>
  <TableCaption>A list of Employees</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">N°</TableHead>
      <TableHead>Nom Complet</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Post</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {employees.map((employee, index) => (
      <TableRow key={employee._id}>
      <TableCell className="font-medium">{index+1}</TableCell>
      <TableCell>{`${employee.nom} ${employee.prenom}`}</TableCell>
      <TableCell>{employee.email}</TableCell>
      <TableCell>{employee.post}</TableCell>
      <TableCell className=" flex gap-3 text-right justify-end">
        <Link className='text-blue-500' to={`/dashboard/employees/details/${employee._id}`}>
          <FaInfoCircle  size={24} />
        </Link>
        <Link className='text-green-500' to={`/dashboard/employees/edit/${employee._id}`}>
          <FaUserEdit size={24} />
          </Link>
        <Link className='text-red-500' to={`/dashboard/employees/delete/${employee._id}`}>
          <MdDelete size={24} />
        </Link>
        
      </TableCell>
    </TableRow>
    ))}
    
  </TableBody>
</Table>
</div>
  )
}

export default Employees