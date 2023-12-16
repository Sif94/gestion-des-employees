import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"


const formSchema = z.object({
    nom : z.string().regex(new RegExp("^[a-zA-Z ]+$")).min(3).max(20),
    description : z.string(),
    emplacement : z.string().regex(new RegExp("^[a-zA-Z0-9_+ ]+$")).min(3).max(20),
    chef_departement : z.string(),
  })
const DepartementEdit = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [employees, setEmployees] = useState([])
    const [error, setError] = useState('')
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: "",
            description: "",
            emplacement: "",
            chef_departement: '',
        },
      })

      const getDepartement = async() => {
        await axios.get(`http://localhost:5000/api/departements/${id}`, {withCredentials: true}).then((response) => {
          console.log(response.data.departement)
          form.reset({
            nom: response.data.departement.nom,
            description: response.data.departement.description,
            emplacement: response.data.departement.emplacement,
            chef_departement: response.data.departement.chef_departement._id,
          })
        })
      }
      const updateDepartement = async (payload: z.infer<typeof formSchema>) => {
        try {
          const response = await axios.put(`http://localhost:5000/api/departements/update/${id}`,payload, {withCredentials: true})
          console.log(response.data)
          form.reset()
          navigate('/dashboard/departements')
        } catch (error:any) {
          console.log(error)
          setError(error.response.data.message)
        }
      }
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        updateDepartement(values)
      } 
      useEffect(() => {
          try {
            getDepartement()
            axios.get("http://localhost:5000/api/employees/", {withCredentials: true}).then((response) => {
              console.log(response.data)
              setEmployees(response.data)
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
        name="nom"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input placeholder="nom" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="emplacement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emplacement</FormLabel>
            <FormControl>
              <Input placeholder="emplacement" {...field} />
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
          name="chef_departement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employés</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectioner un employé..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {employees.map((employee) => (
                        <SelectItem key={employee._id} value={employee._id}>{`${employee.nom} ${employee.prenom}`}</SelectItem>
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

export default DepartementEdit