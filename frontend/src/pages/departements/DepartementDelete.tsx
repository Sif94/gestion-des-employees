import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"

const DepartementDelete = () => {
    
    const {id} = useParams()
    const navigate = useNavigate();
    const handleDelete = async (e) => {
      try {
        e.preventDefault();
        const response = await axios.delete(`http://localhost:5000/api/departements/delete/${id}`, {withCredentials: true});
        if(response.status === 200){
            navigate('/dashboard/departements')
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='p-4'>
      <h1 className='text-3xl text-white my-4'>Supprimer Le département</h1>

      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl text-white'>Etes vous sur de vouloir supprimer ce dépatement?</h3>

        <Button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDelete}
        >
          Oui, Supprimer
        </Button>
        <Button>
          <Link to='/dashboard/departements'>Annuler</Link>
        </Button>
      </div>
    </div>
  )
}

export default DepartementDelete