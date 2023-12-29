import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const TacheDelete = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const handleDelete = async (e) => {
        try {
          e.preventDefault();
          const response = await axios.delete(`http://localhost:5000/api/taches/delete/${id}`, {withCredentials: true});
          if(response.status === 200){
              navigate('/dashboard/employees')
          }
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <div className='p-4'>
    <h1 className='text-3xl my-4'>Supprimer La Tache</h1>

    <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
      <h3 className='text-2xl'>Etes vous sur de vouloir supprimer cette tache?</h3>

      <button
        className='p-4 bg-red-600 text-white m-8 w-full'
        onClick={handleDelete}
      >
        Oui, Supprimer
      </button>
    </div>
  </div>
  )
}

export default TacheDelete