import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { FaFemale, FaMale } from "react-icons/fa"

import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"


const formSchema = z.object({
  username: z.string().regex(new RegExp("^[a-zA-Z0-9_]*$")).min(3).max(50),
  password: z.string().min(6, { message: "Password too short" }).max(50),
  confirmPassword: z.string().min(6).max(50),
  nom: z.string().regex(new RegExp("^[a-zA-Z ]+$")).min(3).max(50),
  prenom: z.string().regex(new RegExp("^[a-zA-Z ]+$")).min(3).max(50),
  email: z.string().email(),
  adresse: z.string().min(3).max(50),
  post: z.string().regex(new RegExp("^[a-zA-Z ]+$")).min(3).max(50),
  telephone: z.string().regex(new RegExp("^[0-9]+$")).min(10).max(10),
  date_naiss: z.string(),
  sexe: z.enum(["Male", "Female"]),
  type: z.enum(["Admin", "Employee", "RH", "Chef_De_Departement", "Chef_De_Projet"]),
  situation_marital: z.enum(["Married", "Single", "Divorced", "Widowed", 'Separated']),
  departement: z.string(), 
  profileImage: z.any()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})
const EmployeeCreate = () => {
    const [departements, setDepartements] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
          confirmPassword: "",
          nom: "",
          prenom: "",
          email: "",
          adresse: "",
          post: "",
          sexe: "Male",
          type: "Employee",
          situation_marital: "Single",
          telephone: "",
          date_naiss: "",
          departement: "",
          profileImage: "",
        },
      })

      const getDepartements = async () => {
          try {
            const response = await axios.get("http://localhost:5000/api/departements/", {withCredentials: true})
            console.log(response.data)
            setDepartements(response.data.departements)
          } catch (error) {
            console.log(error)
          }
      }
     useEffect(() => {
        getDepartements() 
     },[])
     const createEmployee = async (payload: z.infer<typeof formSchema>) => {
        await axios.post("http://localhost:5000/api/employees/register", payload , { 
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        withCredentials: true
        }).then((res) => {
            console.log(res.data)
            form.reset()
            navigate('/dashboard/employees')
        }).catch((err) => {
            console.log(err)
            setError(err.response.data.message)
        })
     }
      function onSubmit(values: z.infer<typeof formSchema>) {
        
        console.log(values)
        
        createEmployee(values)
      } 
  return (
    <div className="w-2/4 my-16 mx-auto  p-4 m-8">
      <h1 className="text-2xl text-fuchsia-300 font-bold text-center mb-4"> Ajouter un employé</h1>
    <Card className="bg-stone-100"> 
    <Form  {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 m-4" encType="multipart/form-data">
    {error && <p className="text-red-500">{error}</p>}
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Confirm password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
        name="prenom"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prenom</FormLabel>
            <FormControl>
              <Input placeholder="prenom" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="email..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="adresse"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse </FormLabel>
            <FormControl>
              <Input placeholder="adresse..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="telephone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Téléphone </FormLabel>
            <FormControl>
              <Input placeholder="téléphone..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="post"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Post</FormLabel>
            <FormControl>
              <Input placeholder="post..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectioner un type..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Employee">Employé</SelectItem>
                  <SelectItem value="RH">RH</SelectItem>
                  <SelectItem value="Chef_De_Departement">Chef de departement</SelectItem>
                  <SelectItem value="Chef_De_Projet">Chef de projet</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="situation_marital"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Situation Marital</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectioner une Situation..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Married">Marié</SelectItem>
                  <SelectItem value="Single">Célibataire</SelectItem>
                  <SelectItem value="Separated">Séparé</SelectItem>
                  <SelectItem value="Divorced">Divorcé</SelectItem>
                  <SelectItem value="Widowed">Veuve</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
     <FormField
          control={form.control}
          name="sexe"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Sexe</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Male" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Male
                    </FormLabel>
                    <FaMale size={20}/>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Female" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Female
                    </FormLabel>
                    <FaFemale size={20}/>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="date_naiss"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de naissance</FormLabel>
              <FormControl>
              <Input type="date" placeholder="post..." {...field} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departement"
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
        <FormField
        control={form.control}
        name="profileImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profile Image</FormLabel>
            <FormControl>
              <Input type="file" multiple={false} onChange={(e) => field.onChange(e.target.files![0])} />
            </FormControl>
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

export default EmployeeCreate