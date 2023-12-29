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
import { useNavigate, useParams } from "react-router-dom"






const formSchema = z.object({
    username: z.string().regex(new RegExp("^[a-zA-Z0-9_]*$")).min(3).max(50),
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
  })
const EmployeeEdit = () => {
    const [departements, setDepartements] = useState([])
    const {id} = useParams()
    
    const [employee, setEmployee] = useState({
        username: "",
        nom: "",
        prenom: "",
        email: "",
        adresse: "",
        post: "",
        telephone: "",
        date_naiss: "",
        sexe: "Male",
        type: "Employee",
        situation_marital: "Single",
        departement: "",
    })
    
    const navigate = useNavigate()


    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        nom: "",
        prenom: "",
        email: "",
        adresse: "",
        post: "",
        telephone: "",
        date_naiss: "",
        sexe: "Male",
        type: "Employee",
        situation_marital: "Single",
        departement: "",
      }
    })

    const getEmployee = async () => {
       axios.get(`http://localhost:5000/api/employees/${id}`, {withCredentials: true}).then((response) => {
        console.log(response.data._id)
        const date = new Date(response.data.date_naiss); 

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);
        
        console.log(response.data)
        form.reset({
          username: response.data.username,
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
          adresse: response.data.adresse,
          post: response.data.post,
          telephone: response.data.telephone,
          date_naiss: formattedDate,
          sexe: response.data.sexe,
          type: response.data.type,
          situation_marital: response.data.situation_marital,
          departement: response.data.departement,
        })
      })
    }
 
    const updateEmployee = async (payload: z.infer<typeof formSchema>) => {
        await axios.put(`http://localhost:5000/api/employees/update/${id}`, payload, {withCredentials: true}).then((res) => {
            console.log(res.data)
            navigate('/dashboard/employees')
        }).catch((err) => {
            console.log(err)
        })
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateEmployee(values)
        console.log(values)
      }
  
      useEffect(() => {
        try {
        
        axios.get("http://localhost:5000/api/departements/", {withCredentials: true}).then((response) => {
          console.log(response.data.departements)
          setDepartements(response.data.departements)
          getEmployee()
        })
        
        
        } catch (error) {
          console.log(error)
        } 
        
      },[])
  return (
    <div className="w-2/4 my-16 mx-auto">
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="username"  {...field}   />
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
              <Input placeholder="nom" {...field}  />
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
              <Input type="email" placeholder="email..." {...field}  />
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
              <Input placeholder="adresse..." {...field}  />
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
              <Input placeholder="téléphone..." {...field}  />
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
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
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
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
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
                  value={field.value}
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
              <Input type="date" placeholder="post..." {...field}  />
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
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectioner un département..." />
                  </SelectTrigger>
                </FormControl> 
                <SelectContent>
                    {departements.map((departement) => (
                        <SelectItem key={departement._id} value={departement._id}>{departement.nom}</SelectItem>
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

export default EmployeeEdit