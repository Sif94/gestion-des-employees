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
    date_retard: z.string(),
    motif : z.string().regex(new RegExp("^[a-zA-Z ]+$")).min(3).max(20),
    justifiee : z.enum(["true", "false"]),
    employee : z.string(),
  })
const RetardEdit = () => {
  const {id} = useParams()
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [error, setError] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date_retard: "",
            motif: "",
            justifiee: "false",
            employee: "",
        },
      })
      const updateRetard = async (payload: z.infer<typeof formSchema>) => {
        try {
          const response = await axios.put(`http://localhost:5000/api/retards/${id}`,payload, {withCredentials: true})
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
            updateRetard(values)
            
        } 
      useEffect(() => {
        try {
            
            axios.get("http://localhost:5000/api/employees/", {withCredentials: true}).then((response) => {
              console.log(response.data)
              setEmployees(response.data)
            })
             axios.get(`http://localhost:5000/api/retards/${id}`, {withCredentials: true}).then((response) => {
              console.log(response.data)
                const date = new Date(response.data.retard.date_retard); 

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');

          const formattedDate = `${year}-${month}-${day}`;
              form.reset({
                date_retard: formattedDate,
                motif: response.data.retard.motif,
                justifiee: response.data.retard.justifiee.toString(),
                employee: response.data.retard.employee,
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
          name="date_retard"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de retard</FormLabel>
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

export default RetardEdit