import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EmployeeHeuressupp = () => {
    const {id} = useParams()
    const [heuresSupps, setHeuresSupps] = useState([])
    const [employee, setEmployee] = useState({})
    
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
        axios.get(`http://localhost:5000/api/heuresupps/employee/${id}/heureSupp`, {withCredentials: true}).then((response) => {
          console.log(response.data)
          setHeuresSupps(response.data)
          getEmployee()
        })
       } catch (error) {
        console.log(error)
       } 
    },[])
  return (
    <div className='w-4/5 my-16 mx-auto p-2'>
    <h1 className='text-2xl font-bold text-violet-300 text-center mb-4'>Les Heures Supps</h1>
    <div className='flex items-start justify-center flex-wrap'>
    {heuresSupps.map((heureSupp: any) => (
      <Card className='w-1/3' key={heureSupp._id}>
      <CardHeader>
        <CardTitle>{`${new Date(heureSupp.date_h_supp).toLocaleDateString("fr")}`}</CardTitle>
        <CardDescription>{heureSupp.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='text-xl'>
          <h1>Date heureSupp : {new Date(heureSupp.date_h_supp).toLocaleDateString("fr")}</h1>
          <h1>Tarif: {heureSupp.tarif}</h1>
          <h1>Sup ou Permaance : {heureSupp.supp_perm}</h1>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-2'>
        <h1>Date de signalisation : {new Date(heureSupp.createdAt).toLocaleDateString("fr")}</h1>
        {employee.type === "Admin" || employee.type === "RH" ? (
        <div className='flex gap-2 justify-between'>
        <Link className='text-blue-500' to={`/dashboard/heuressupp/${heureSupp._id}/edit`}><FaEdit size={30}/></Link>
        <Link className='text-red-500' to={`/dashboard/heuressupp/${heureSupp._id}/delete`}><MdDelete size={30}/></Link>o
        
        </div>
        ): null}
      </CardFooter>
    </Card>
    ))}
    </div>  

  </div>
  )
}

export default EmployeeHeuressupp