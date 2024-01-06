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
import { toast } from 'react-toastify';

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



const formSchema = z.object({
    Age: z.coerce.number().int().min(18),
    Salary: z.coerce.number().min(0),
    EngagementSurvey: z.coerce.number().min(0),
    EmpSatisfaction: z.coerce.number().int().min(0).max(5),
    SpecialProjectsCount: z.coerce.number().int().min(0),
    DaysLateLast30: z.coerce.number().int().min(0),
    Absences: z.coerce.number().int().min(0),
    YearsOfWork: z.coerce.number().int().min(0),
    MaritalDesc: z.coerce.number().int().min(0).max(4),
  })
const AideDecision = () => {
    const [error, setError] = useState('')
    const [classe, setClasse] = useState("")
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Age: 0,
            Salary: 0,
            EngagementSurvey: 0,
            EmpSatisfaction: 0,
            SpecialProjectsCount: 0,
            DaysLateLast30: 0,
            Absences: 0,
            YearsOfWork: 0,
            MaritalDesc: 0,
        },
      })

      const getPerformance =  async (data) => {
          try {
            const response = await axios.post('http://localhost:5000/api/aide/decision/classify', data, {withCredentials: true})
            console.log(response.data)
            setClasse(response.data)
            if(response.data[0] == "PIP"){
              toast.error("PIP")
            } else if (response.data[0] == "Needs Improvement"){
              toast.error("Needs Improvement")
            }else if(response.data[0] == "Fully Meets"){
              toast.success("Fully Meets")
            }else {
                toast.success("Exceeds")
            }
          } catch (error) {
            console.log(error)
          }
      }

      function onSubmit(values: z.infer<typeof formSchema>) {
        const data = [[values.Salary, values.MaritalDesc, values.EngagementSurvey, values.EmpSatisfaction, values.SpecialProjectsCount, values.DaysLateLast30, values.Absences, values.Age ,values.YearsOfWork ]]
        getPerformance(data)
        console.log(values.Age)
        
      } 

  return (
        <div className="w-2/4 my-16 mx-auto">
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
    <h1 className="text-2xl font-bold text-center mb-4">Formulaire d'aide au décision</h1>
    {classe && <p className="text-4XL font-bold text-green-500">{classe}</p>}
    {error && <p className="text-red-500">{error}</p>}
        <FormField
          control={form.control}
          name="MaritalDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Situation Marital</FormLabel>
              <Select onValueChange={field.onChange} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectioner une Situation..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Marié</SelectItem>
                  <SelectItem value="1">Célibataire</SelectItem>
                  <SelectItem value="2">Séparé</SelectItem>
                  <SelectItem value="3">Divorcé</SelectItem>
                  <SelectItem value="4">Veuve</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="EmpSatisfaction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee Satisfaction</FormLabel>
              <Select onValueChange={field.onChange} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectioner un niveau..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={form.control}
        name="Age"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Age..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="Salary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Salaire</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Salaire..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="EngagementSurvey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Engagement Survey</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Engagement Survey..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="SpecialProjectsCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Projects Count</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Special Projects Count..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="DaysLateLast30"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Days Late Last 30</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Days Late Last 30..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="Absences"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Absences</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Absences..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="YearsOfWork"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years Of Work</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Years Of Work..." {...field} />
            </FormControl>
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

export default AideDecision