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
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from "@/components/ui/card"
const formSchema = z.object({
    titre: z.string(),
    description: z.string(),
    date_debut: z.string(),
    date_fin: z.string(),
    duree: z.preprocess((a) => parseInt(z.string().parse(a),10),
    z.number().positive()),
    employees : z.array(z.string()).refine((value) => value.some((employee) => employee), {
      message: "Vous devez selectionner au miimum un employe.",
    }),
    chef_projet: z.string(),
    departements: z.array(z.string()).refine((value) => value.some((departement) => departement), {
      message: "Vous devez selectionner au miimum un departement.",
    }),
  })

const ProjetCreate = () => {
    const navigate = useNavigate()
    const [departements, setDepartements] = useState([])
    const [employees, setEmployees] = useState([])
    const [error, setError] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            titre: "",
            description: "",
            date_debut: "",
            date_fin:"",
            duree: 0,
            employees : [],
            chef_projet: "",
            departements: [],
        },
      })
      const createProjet = async (payload: z.infer<typeof formSchema>) => {
        try {
          const response = await axios.post("http://localhost:5000/api/projets/",payload, {withCredentials: true})
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
            
            createProjet(values)
            
        } 

        useEffect(() => {
            try {
                axios.get("http://localhost:5000/api/employees/all", {withCredentials: true}).then((response) => {
                  console.log(response.data)
                  setEmployees(response.data)
                })
              } catch (error) {
                console.log(error)
              }
          },[])
          useEffect(() => {
            try {
                axios.get("http://localhost:5000/api/departements/", {withCredentials: true}).then((response) => {
                  console.log(response.data.departements)
                  setDepartements(response.data.departements)
                })
              } catch (error) {
                console.log(error)
              }
          },[])

  return (
    <div className="w-2/4 my-16 mx-auto  p-4 m-8">
    <h1 className="text-2xl text-fuchsia-300 font-bold text-center mb-4"> Ajouter un projet</h1>
  <Card className="bg-stone-100"> 
  <Form  {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 m-4" encType="multipart/form-data">
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
                        <FormLabel className="flex text-sm font-normal items-center gap-2">
                          <Avatar>
                              <AvatarImage src={`http://localhost:5000/images/${employee.profileImage}`} alt="profile image" />
                                <AvatarFallback>{`${employee.nom[0]} ${employee.prenom[0]}`}</AvatarFallback>
                        </Avatar>
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
           
        
        <ScrollArea className="h-72 w-full rounded-md border">
        <div className="p-4">
        <FormField
          control={form.control}
          name="departements"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Départements</FormLabel>
              </div>
              {departements.map((departement) => (
                <FormField
                  key={departement._id}
                  control={form.control}
                  name="departements"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={departement._id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(departement._id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, departement._id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== departement._id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {departement.nom}
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
  </Card>
  </div>
  )
  }
export default ProjetCreate