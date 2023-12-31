import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import * as z from "zod"
import { GrValidate } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const formSchema = z.object({
    type_contrat: z.enum(['CDD', 'CDI', 'Stage']),
    date_debut: z.string(),
    date_fin: z.string(),
    salaire_convenu: z.preprocess((a) => parseInt(z.string().parse(a),10),
    z.number().positive()),
    employee : z.string(),
   
  })

const ContratEdit = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [error, setError] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type_contrat: "CDD",
            date_debut: "" ,
            date_fin: "",
            salaire_convenu: 0,
            employee: "",
        },
      })
      const updateContrat = async (payload: z.infer<typeof formSchema>) => {
        try {
          const response = await axios.put(`http://localhost:5000/api/contrats/update/${id}`,payload, {withCredentials: true})
          console.log(response.data)
          form.reset()
          navigate('/dashboard')
        } catch (error:any) {
          console.log(error)
          setError(error.response.data.message)
        }
      }
        const getContrat = async () => {
          axios.get(`http://localhost:5000/api/contrats/${id}`, {withCredentials: true}).then((response) => {
              console.log(response.data)
                const date = new Date(response.data.date_debut); 

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');    
                
              const formattedDate = `${year}-${month}-${day}`;
              form.reset({
                type_contrat: response.data.type_contrat,
                date_debut: formattedDate,
                date_fin: formattedDate,
                salaire_convenu: response.data.salaire_convenu,
                employee: response.data.employee,
              })
            })
        }
        function onSubmit(values: z.infer<typeof formSchema>) {
            console.log(values)
            updateContrat(values)
            
        } 
      useEffect(() => {
        try {
            
            axios.get("http://localhost:5000/api/employees/", {withCredentials: true}).then((response) => {
              console.log(response.data)
              setEmployees(response.data)
              getContrat()
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
        name="type_contrat"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Type contrat</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="CDD" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    CDD
                  </FormLabel>
                  <GrValidate size={20}/>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="CDI" />
                  </FormControl>
                  <FormLabel className="font-normal">
                  CDI
                  </FormLabel>
                  <IoMdCloseCircleOutline size={20}/>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Stage" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Stage
                  </FormLabel>
                  <IoMdCloseCircleOutline size={20}/>
                </FormItem>
              </RadioGroup>
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
              <FormLabel>Date de debut de contrat</FormLabel>
              <FormControl>
              <Input type="date" placeholder="date debut" {...field} />
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
              <FormLabel>Date de debut de fin</FormLabel>
              <FormControl>
              <Input type="date" placeholder="date fin" {...field} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    
        <FormField
        control={form.control}
        name="salaire_convenu"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>salaire </FormLabel>
            <FormControl>
            <Input type="Number" placeholder="salaire..." {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectioner un employé..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {employees.map((employee: any) => (
                        <div className="flex gap-2 items-center justify-center p-2">
                        <Avatar>
                              <AvatarImage src={`http://localhost:5000/images/${employee.profileImage}`} alt="profile image" />
                                <AvatarFallback>{`${employee.nom[0]} ${employee.prenom[0]}`}</AvatarFallback>
                        </Avatar>
                        <SelectItem key={employee._id} value={employee._id}>{`${employee.nom} ${employee.prenom}`}</SelectItem>
                      </div>
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

export default ContratEdit