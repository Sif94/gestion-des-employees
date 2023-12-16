import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
const EmployeeDelete = () => {
    const { toast } = useToast()
    const {id} = useParams()
    const navigate = useNavigate();
    const handleDelete = async (e) => {
      try {
        e.preventDefault();
        const response = await axios.delete(`http://localhost:5000/api/employees/delete/${id}`, {withCredentials: true});
        if(response.status === 200){
            navigate('/dashboard/employees')
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Supprimer L'employé</h1>

      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Etes vous sur de vouloir supprimer cet employé?</h3>

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

export default EmployeeDelete