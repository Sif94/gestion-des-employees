import React from 'react'
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
import { useNavigate } from "react-router-dom"
import * as z from "zod"
import { GrValidate } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";

const formSchema = z.object({
    titre: z.string(),
    description: z.string(),
    date_debut: z.string(),
    date_fin: z.string(),
    employee : z.string(),
  })


   
const TacheCreate = () => {
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
          employee: "",
      },
    })
    const createTache = async (payload: z.infer<typeof formSchema>) => {
      try {
        const response = await axios.post("http://localhost:5000/api/taches/",payload, {withCredentials: true})
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
          createTache(values)
          
      } 
    useEffect(() => {
      try {
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
    <Button type="submit">Submit</Button>
  </form>
</Form>
</div>
)
}


export default TacheCreate