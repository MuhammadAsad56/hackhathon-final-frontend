import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AppRoutes } from "../constant/constant"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import ButtonSpinner from "./ButtonSpinner"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

export function LoginForm() {
  const navigate = useNavigate()
    const { setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values) {
    setIsLoading(true)
    try {
        axios
        .post(AppRoutes.login, values)
        .then((res) => {
          console.log("response from login API=>", res.data);  
          Cookies.set("token", res?.data?.data?.token);
          setUser(res?.data?.data?.user);
          setIsLoading(false);
          toast.success("Successfully Login", {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
          form.reset();
          navigate("/");
        })
        .catch((error) => {           
          setIsLoading(false);
          if (error.response.data.error) {
            toast.error(error.response.data.message, {
              position: "bottom-right",
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark", // Change the theme if needed
            });
          }
          form.reset();
        });
      
    } catch (error) {
        toast.error(error.message, {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark", // Change the theme if needed
          });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {form.formState.isSubmitting ? <ButtonSpinner/> : "Log in"}
        </Button>
      </form>
    </Form>
  )
}

