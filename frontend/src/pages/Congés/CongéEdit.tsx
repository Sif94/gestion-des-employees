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
import { useNavigate, useParams } from "react-router-dom"
import * as z from "zod"
import { GrValidate } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";

const formSchema = z.object({
  date_debut: z.string(),
  date_fin : z.string(),
  type_conge: z.enum(['Congé payé', 'Congé non payé']),
  motif : z.string().regex(new RegExp("^[a-zA-Z ]+$")).min(3).max(20),
  employee : z.string(),
  })
const CongéEdit = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  const [error, setError] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        date_debut:"",
        date_fin :"",
        type_conge: "Congé non payé",
        motif :"",
        employee :"",
      },
    })
    const updateConge= async (payload: z.infer<typeof formSchema>) => {
      try {
        const response = await axios.put(`http://localhost:5000/api/conges/update/${id}`,payload, {withCredentials: true})
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
          updateConge(values)
          
      } 
    useEffect(() => {
      try {
          
          axios.get("http://localhost:5000/api/employees/", {withCredentials: true}).then((response) => {
            console.log(response.data)
            setEmployees(response.data)
          })
           axios.get(`http://localhost:5000/api/conges/${id}`, {withCredentials: true}).then((response) => {
            console.log(response.data)
              const dated = new Date(response.data.conge.date_debut); 

              const year = dated.getFullYear();
              const month = String(dated.getMonth() + 1).padStart(2, '0');
              const day = String(dated.getDate()).padStart(2, '0');

             

        const formattedDate = `${year}-${month}-${day}`;
            form.reset({
              date_debut: formattedDate,
              date_fin: formattedDate,
              motif: response.data.conge.motif,
              type_conge: response.data.conge.type_conge,
              employee: response.data.conge.employee,
            })
          })

          axios.get(`http://localhost:5000/api/conges/${id}`, {withCredentials: true}).then((response) => {
          console.log(response.data)
          const datef = new Date(response.data.conge.date_fin); 

          const yearr = datef.getFullYear();
          const monthh = String(datef.getMonth() + 1).padStart(2, '0');
          const dayy = String(datef.getDate()).padStart(2, '0');

          const formattedDate = `${yearr}-${monthh}-${dayy}`;
            form.reset({
              date_debut: formattedDate,
              date_fin: formattedDate,
              motif: response.data.conge.motif,
              type_conge: response.data.conge.type_conge,
              employee: response.data.conge.employee,
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
          name="date_debut"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de début</FormLabel>
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
              <FormLabel>Date de fin</FormLabel>
              <FormControl>
              <Input type="date" placeholder="date..." {...field} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      

        <FormField
          control={form.control}
          name="type_conge"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type congé</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Congé payé" />
                    </FormControl>
                    <FormLabel className="font-normal">
                        payé
                    </FormLabel>
                    <GrValidate size={20}/>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Congé non payé" />
                    </FormControl>
                    <FormLabel className="font-normal">
                       non payé
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
  
export default CongéEdit