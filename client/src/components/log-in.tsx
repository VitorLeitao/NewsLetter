// A pagina inicial vai ser de login
"use client";
import Image from 'next/image';
// Redirecionamento de usuario
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast, toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { gql, useQuery } from '@apollo/client';
import { GET_ALL_USER, GET_USER_BY_NAME } from '@/Graphql/Users/Queries';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useLazyQuery } from '@apollo/client';

const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  })

export default function AppLogIn() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password:""
    },
  })

  const [getUserByName, { called, loading, data, error }] = useLazyQuery(GET_USER_BY_NAME);

  function checkUser(values: z.infer<typeof formSchema>) {
    getUserByName({
        variables: {
          username: values.username
        }
      }).then(({ data }) => {
        if(data.getUserByName.password === values.password){
            console.log('Senha correta, logando');
        }else{
            console.log('dados de login incorretos');
        }
      }).catch((error) => {
        console.log('dados de login incorretos');
      });
  }
  
  const enviaToast = (title: string, description: string, backgroundColor: string, color: string) => {
    console.log('Toast enviado:', title, description, backgroundColor, color);
    toast({
      title: title,
      description: description,
      style: {
        backgroundColor: backgroundColor,
        color: color
      }
    });
  }

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col items-center">
      <Label className="mb-4 text-2xl">
          Login
      </Label>
    <div className="border p-10 shadow-xl rounded-lg bg-white">
    <Form {...form}>
        <form onSubmit={form.handleSubmit(checkUser)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
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
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center"><Button type="submit">Submit</Button></div>
      </form>
    </Form>
      </div></div>
    
    </div>
  );
}
