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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
const formSchema = z.object({
    date_absence: z.string(),
    motif : z.string().regex(new RegExp("^[a-zA-Z ]+$")).min(3).max(20),
    justifiee : z.enum(["false", "true"]),
    employee : z.string(),
  })

const AbsenceEdit = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [error, setError] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date_absence: "",
            motif: "",
            justifiee: "false",
            employee: "",
        },
      })

      const getAbsence = async () => {
        axios.get(`http://localhost:5000/api/absences/${id}`, {withCredentials: true}).then((response) => {
              console.log(response.data)
                const date = new Date(response.data.absence.date_absence); 

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');

          const formattedDate = `${year}-${month}-${day}`;
              form.reset({
                date_absence: formattedDate,
                motif: response.data.absence.motif,
                justifiee: response.data.absence.justifiee.toString(),
                employee: response.data.absence.employee,
              })
            })
      }
      const updateAbsence = async (payload: z.infer<typeof formSchema>) => {
        try {
          const response = await axios.put(`http://localhost:5000/api/absences/${id}`,payload, {withCredentials: true})
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
            updateAbsence(values)
            
        } 
      useEffect(() => {
        try {
            
            axios.get("http://localhost:5000/api/employees/all", {withCredentials: true}).then((response) => {
              console.log(response.data)
              setEmployees(response.data)
              getAbsence()
            })
             
          } catch (error) {
            console.log(error)
          }
      },[])
  return (
    <div className="w-2/4 my-16 mx-auto  p-4 m-8">
      <h1 className="text-2xl text-fuchsia-300 font-bold text-center mb-4"> Modifier une absence</h1>
    <Card className="bg-stone-100"> 
    <Form  {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 m-4" encType="multipart/form-data">
    {error && <p className="text-red-500">{error}</p>}
    <FormField
          control={form.control}
          name="date_absence"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de l'absence</FormLabel>
              <FormControl>
              <Input type="date" placeholder="date..." {...field} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
      <FormField
          control={form.control}
          name="motif"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motif</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="description..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="justifiee"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Justifiée ?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="true"  />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Oui
                    </FormLabel>
                    <GrValidate size={20}/>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Non
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
  </Card>
  </div>
  )
}

export default AbsenceEdit