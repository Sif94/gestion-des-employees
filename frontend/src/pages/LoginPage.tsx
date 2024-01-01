import { Button } from "@/components/ui/button"
import {FaSignInAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useContext } from "react"
import * as z from "zod"
import AuthContext from "../components/shared/AuthContext.tsx";

const formSchema = z.object({
  username: z.string().min(3, {message: 'Le nom d\'utilisateur doit contenir au minimum 3 caractères'}).max(50),
  password: z.string().min(6, {message: 'Votre mot de passe est trés court'}).max(50),
})
const LoginPage = () => {
  const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
     await login(values)
  }
  return (
    <div className="flex flex-col w-1/2 mt-28 mx-auto p-3 border-4 rounded-lg border-gray-500">
        <h1 className="text-2xl font-bold text-center mb-4">Formulaire de connexion</h1>
        
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-3 mb-4">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="Votre username..." {...field} />
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
              <Input  type="password" placeholder="Votre mot de passe..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button className="flex gap-2 items-center" type="submit">Connexion <FaSignInAlt size={20}/></Button>
      
    </form>
    <Button className="flex gap-2" onClick={() => navigate('/')}>Retour <IoMdArrowRoundBack size={20}/></Button>
  </Form>
  </div>
  )
}

export default LoginPage