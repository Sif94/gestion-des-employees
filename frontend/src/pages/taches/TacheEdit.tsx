import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import * as z from "zod"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
    titre: z.string(),
    description: z.string(),
    date_debut: z.string(),
    date_fin: z.string(),
    employees : z.array(z.string()).refine((value) => value.some((employee) => employee), {
      message: "Vous devez selectionner au miimum un employe.",
    }),
   
  })

const TacheEdit = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [error, setError] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            titre: "",
            description: "",
            date_debut: "" ,
            date_fin: "",
            employees: [],
        },
      })
      const getTache = async () => {
        axios.get(`http://localhost:5000/api/taches/${id}`, {withCredentials: true}).then((response) => {
          console.log(response.data)
            const date = new Date(response.data.date_debut); 

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');    
            
          const formattedDate = `${year}-${month}-${day}`;
          form.reset({
            titre: response.data.titre,
            description: response.data.description,
            date_debut: formattedDate,
            date_fin: formattedDate,
            employees: response.data.employees,
            
          })
        })
      }
      const updateTache = async (payload: z.infer<typeof formSchema>) => {
        try {
          const response = await axios.put(`http://localhost:5000/api/taches/update/${id}`,payload, {withCredentials: true})
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
            updateTache(values)
            
        } 
      useEffect(() => {
        try {
            
            axios.get("http://localhost:5000/api/employees/", {withCredentials: true}).then((response) => {
              console.log(response.data)
              setEmployees(response.data)
              getTache()
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
          <FormItem className="flex flex-col">
            <FormLabel>Titre </FormLabel>
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
              <FormLabel>Description</FormLabel>
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
      
      <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
      <FormField
          control={form.control}
          name="employees"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Employees</FormLabel>
              </div>
              {employees.map((employee) => (
                <FormField
                  key={employee._id}
                  control={form.control}
                  name="employees"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={employee._id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(employee._id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, employee._id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== employee._id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                        {`${employee.nom} ${employee.prenom}`}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        </ScrollArea>
    <Button type="submit">Submit</Button>
  </form>
</Form>
  </div>
  )
}

export default TacheEdit