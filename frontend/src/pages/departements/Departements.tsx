import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import axios from "axios"
import { useEffect, useState } from "react"
import { FaInfoCircle, FaUserEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"

const Departements = () => {
    const navigate = useNavigate()
    const [departements, setDepartements] = useState([])
    useEffect(() => {
        try {
            axios.get("http://localhost:5000/api/departements/", {withCredentials: true}).then((response) => {
                setDepartements(response.data.departements)
            })
        } catch (error) {
            console.log(error)
        }
    },[])
  return (
    <div className='w-4/5 my-16 mx-auto'>
      <Button className='mb-4' onClick={() => navigate('/dashboard/departements/create')} >Ajouter un départements</Button>
    <Table>
  <TableCaption>A list of Employees</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">N°</TableHead>
      <TableHead>Nom </TableHead>
      <TableHead>Emplacement</TableHead>
      <TableHead>Description</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {departements.map((departement, index) => (
      <TableRow key={departement._id}>
      <TableCell className="font-medium">{index+1}</TableCell>
      <TableCell>{`${departement.nom}`}</TableCell>
      <TableCell>{departement.emplacement}</TableCell>
      <TableCell>{}</TableCell>
      <TableCell className=" flex gap-3 text-right justify-end">
        <Link className='text-blue-500' to={`/dashboard/departements/details/${departement._id}`}>
          <FaInfoCircle  size={24} />
        </Link>
        <Link className='text-green-500' to={`/dashboard/departements/edit/${departement._id}`}>
          <FaUserEdit size={24} />
          </Link>
        <Link className='text-red-500' to={`/dashboard/departements/delete/${departement._id}`}>
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

export default Departements