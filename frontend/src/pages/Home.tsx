import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate()
  return (
   
  <div className="bg-gray-800 h-screen flex items-center justify-center">
  <div className="text-center text-white">
    <h1 className="text-4xl font-bold mb-4">Gestion des Employés</h1>
    <p className="text-lg mb-8">Optimisez la gestion de votre équipe avec notre application.</p>
    <div className="flex justify-center items-center">
      <Button onClick={() => navigate('/dashboard')} className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg mr-4">
        Commencer
      </Button>
    </div>
  </div>
</div>
)
}

export default Home