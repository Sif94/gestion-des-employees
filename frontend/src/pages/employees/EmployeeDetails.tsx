import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { set } from 'date-fns';

const EmployeeDetails = () => {
    const {id} = useParams();
    const [nom, setNom] = React.useState('')
    const [prenom, setPrenom] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [post, setPost] = React.useState('')

    const getEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {withCredentials: true})
            console.log(response.data)
            setNom(response.data.nom)
            setPrenom(response.data.prenom)
            setEmail(response.data.email)
            setPost(response.data.post)
            // setEmployee(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        getEmployee()
    },[])
  return (
    <div>
        <p>Nom: {nom}</p>
        <p>Prenom: {prenom}</p>
        <p>Email: {email}</p>
        <p>Post: {post}</p>
    </div>
  )
}

export default EmployeeDetails