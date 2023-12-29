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
    date_h_supp: z.string(),
    duree: z.string(),
    description: z.string(),
    supp_perm: z.enum(['Heure_Supplimentaire', 'Permanence']),
    tarif: z.string(),
    employee : z.string(),
  })
const HeuresuppCreate = () => {
    const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  const [error, setError] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        date_h_supp: "",
        duree: "",
        description:"",
        supp_perm: "Heure_Supplimentaire",
        tarif:"",
        employee : "",
      },
    })
    const createHeuresupp = async (payload: z.infer<typeof formSchema>) => {
      try {
        const response = await axios.post("http://localhost:5000/api/heuressupp/",payload, {withCredentials: true})
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
          createHeuresupp(values)
          
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
        name="date_h_supp"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date </FormLabel>
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
        name="supp_perm"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Type </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Heure_Supplimentaire" />
                  </FormControl>
                  <FormLabel className="font-normal">
                  Heure Supplimentaire
                  </FormLabel>
                  <GrValidate size={20}/>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Permanence" />
                  </FormControl>
                  <FormLabel className="font-normal">
                  Permanence
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
        name="tarif"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Tarif </FormLabel>
            <FormControl>
            <Input type="Number" placeholder="tarif..." {...field} />
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
export default HeuresuppCreate