import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import * as z from "zod"
import { GrValidate } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";

const formSchema = z.object({
  titre: z.string(),
  description: z.string(),
  date_debut: z.string(),
  date_fin: z.string(),
  duree: z.string(),
  employee : z.string(),
  chef_projet: z.string(),
  departements: z.string(),
   
  })

const ProjetEdit = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  const [departements, setDepartements] = useState([])
  const [error, setError] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        titre: "",
        description: "",
        date_debut: "",
        date_fin:"",
        duree: "",
        employee : "",
        chef_projet: "",
        departements: "",
      },
    })
    const updateProjet = async (payload: z.infer<typeof formSchema>) => {
      try {
        const response = await axios.put(`http://localhost:5000/api/projets/update/${id}`,payload, {withCredentials: true})
        console.log(response.data)
        form.reset()
        navigate('/dashboard')
      } catch (error:any) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
      
      function onSubmit(values: z.infer<typeof formSchema>) {
          console.log(values)
          updateProjet(values)
          
      } 
    useEffect(() => {
      try {
          
          axios.get("http://localhost:5000/api/employees/", {withCredentials: true}).then((response) => {
            console.log(response.data)
            setEmployees(response.data)
          })
         /**  axios.get("http://localhost:5000/api/departements/", {withCredentials: true}).then((response) => {
            console.log(response.data.departements)
            setDepartements(response.data.departements)
          })
            
          } catch (error) {
            console.log(error)
          } 
          
        },[])**/
           axios.get(`http://localhost:5000/api/projets/${id}`, {withCredentials: true}).then((response) => {
            console.log(response.data)
              const date = new Date(response.data.projet.date_debut); 

              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');    
              
        const formattedDate = `${year}-${month}-${day}`;
            form.reset({
              titre: response.data.projet.titre,
              description: response.data.projet.description,
              date_debut: formattedDate,
              date_fin: formattedDate,
              duree: response.data.projet.duree,
              employee: response.data.projet.employee,
              chef_projet: response.data.projet.chef_projet,
              departements: response.data.projet.departements,
              
            })
          })
          axios.get(`http://localhost:5000/api/projets/${id}`, {withCredentials: true}).then((response) => {
            console.log(response.data)

          const date1 = new Date(response.data.projet.date_fin); 
          const year1 = date1.getFullYear();
          const month1 = String(date1.getMonth() + 1).padStart(2, '0');
          const day1 = String(date1.getDate()).padStart(2, '0');
          const formattedDate = `${year1}-${month1}-${day1}`;
            form.reset({
              titre: response.data.projet.titre,
              description: response.data.projet.description,
              date_debut: formattedDate,
              date_fin: formattedDate,
              duree: response.data.projet.duree,
              employee: response.data.projet.employee,
              chef_projet: response.data.projet.chef_projet,
              departements: response.data.projet.departements,
              
            })
          })

        } catch (error) {
          console.log(error)
        }
    },[])
return (
  <div className="w-2/4 my-16 mx-auto">
  <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
  {error && <p className="text-red-500">{error}</p>}
  <FormField
      control={form.control}
      name="titre"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Titre du projet </FormLabel>
          <FormControl>
            <Input placeholder="titre..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
           <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description </FormLabel>
          <FormControl>
            <Input placeholder="description..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  <FormField
        control={form.control}
        name="date_debut"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date de debut</FormLabel>
            <FormControl>
            <Input type="date" placeholder="date..." {...field} />
          </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="date_fin"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date de fin </FormLabel>
            <FormControl>
            <Input type="date" placeholder="date..." {...field} />
          </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
            <FormField
        control={form.control}
        name="duree"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Durée </FormLabel>
            <FormControl>
            <Input type="Number" placeholder="duree..." {...field} />
          </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    
      
       <FormField
        control={form.control}
        name="employee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employé</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selectioner un employé..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                  {employees.map((employee: any) => (
                      <SelectItem key={employee._id} value={employee._id}>{`${employee.nom} ${employee.prenom}`}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
               <FormField
        control={form.control}
        name="chef_projet"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chef du projet</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selectioner un employé..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                  {employees.map((employee: any) => (
                      <SelectItem key={employee._id} value={employee._id}>{`${employee.nom} ${employee.prenom}`}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="departements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Département</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selectioner un département..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                  {departements.map((departement:any) => (
                      <SelectItem key={departement._id} value={departement._id}>{departement.nom}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    <Button type="submit">Submit</Button>
  </form>
</Form>
</div>
)
}
export default ProjetEdit