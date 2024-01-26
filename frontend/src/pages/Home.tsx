import { useNavigate } from 'react-router-dom'

 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useContext, useRef } from 'react'
import { Button } from '@/components/ui/button'
import AuthContext from '@/components/shared/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
const Home = () => {
  const {user} = useContext(AuthContext)
    const navigate = useNavigate()
  return (
    <>
    <section className="flex justify-between bg-indigo-950 mt-16 w-full mx-auto px-20 py-10">
      <div className='flex justify-between gap-4 p-4'>
    <div className="flex flex-col gap-5 justify-between">
      <div>
        <h1 className="text-5xl font-bold text-white" ><span className="text-fuchsia-500">Gestion</span> des employés!</h1>
      </div>
      <h3 className='font-bold text-3xl text-white'>
        La gestion des employés devient plus facile
      </h3>
      <p className='text-white text-xl'>
      Bienvenue sur WorkWell - l'outil essentiel pour une gestion des employés efficace. Simplifiez les horaires, optimisez les performances, et favorisez une communication transparente au sein de votre équipe. Découvrez une solution intuitive, conçue pour libérer tout le potentiel de votre entreprise.
      </p>
      <Button className='bg-fuchsia-500' onClick={() => user ? navigate('/dashboard') : navigate('/login')}>
        Comenncer
      </Button>
    </div>

    <div className='w-96 h-96'>
    <Avatar className="w-96 h-96">
              <AvatarImage src='/dashboard.jpeg' alt="@shadcn" />
              <AvatarFallback>Home</AvatarFallback>
        </Avatar>
    </div>
    </div>
  </section>
  <div className='flex justify-around mt-16 w-full mx-auto px-20 py-10 items-center'>
  <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Gérér vos projets</CardTitle>
        <CardDescription>La gestion de vos projets devient plus facile.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
        Optimisez vos projets avec WorkWell, la plateforme de gestion de projets qui simplifie la planification, la collaboration et le suivi. Du début à la fin, notre solution intuitive garantit une gestion efficace, vous permettant de livrer des résultats exceptionnels, à chaque projet.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
  </Card>
  <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Gérér vos employés</CardTitle>
        <CardDescription>La gestion de vos employés devient plus facile.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
        Révolutionnez la gestion des employés avec WorkWell. Suivez les horaires, gérez les performances et favorisez une communication transparente pour une équipe productive et épanouie. Simplifiez votre gestion des ressources humaines dès aujourd'hui.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
  </Card>
  <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Une meilleure productivité </CardTitle>
        <CardDescription>Optimiser la productivité de vos employés</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
        Augmentez la productivité de votre équipe avec WorkWell. Suivez les performances individuelles, identifiez les opportunités d'amélioration et favorisez un environnement de travail plus efficace. Libérez le plein potentiel de votre équipe pour des résultats exceptionnels.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
  </Card>
  </div>
  </>
)
}

export default Home