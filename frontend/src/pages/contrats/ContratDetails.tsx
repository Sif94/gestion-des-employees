import AuthContext from '@/components/shared/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ContratDetails = () => {
    const { id } = useParams();
    const {user} = useContext(AuthContext)
    const [contrat, setContrat] = useState({})
    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/contrats/${id}`, { withCredentials: true })
          .then((response) => {
            console.log(response.data);
            setContrat(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    },[])
  return (
    <div className=' flex flex-col w-full mx-auto p-2 b' >
    <h1 className='text-2xl font-bold text-center mb-4'>Contrat de Travail</h1>
    
    <div className='flex justify-center items-center'>
      
      <Card className='w-full p-3 text-center text-3xl font-bold' id="card">
      <CardHeader>
        <CardDescription>{contrat.type_contrat}</CardDescription>
        <CardTitle>{`${new Date(contrat.date_debut).toLocaleDateString("fr")}`}</CardTitle>
        <CardTitle>{`${new Date(contrat.date_fin).toLocaleDateString("fr")}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-xl'>
        <h1>Type contrat: {contrat.type_contrat}</h1>
        <h1>Concerné: {user.nom} {user.prenom}</h1>
          <h1>Date du début du contrat : {new Date(contrat.date_debut).toLocaleDateString("fr")}</h1>
          <h1>Date de la fin du contrat : {new Date(contrat.date_fin).toLocaleDateString("fr")}</h1>
          <h1>Salaire convenu: {contrat.salaire_convenu}</h1>
        
        </div>
      </CardContent>
      <CardFooter className='flex flex-col gap-2 text-center'>
      <img src="/cachet.jpg" alt="cacher"  />
        <h1 className='text-center'>Date de signalisation : {new Date(contrat.createdAt).toLocaleDateString("fr")}</h1>
      </CardFooter>
    </Card>
    
    </div>  

  </div>
  )
}

export default ContratDetails