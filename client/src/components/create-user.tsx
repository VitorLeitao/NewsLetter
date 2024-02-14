
"use client";
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"
import {Form,FormControl,FormField,FormItem,FormLabel,FormDescription,FormMessage,} from '@/components/ui/form';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USER, GET_USER_BY_NAME } from '@/Graphql/Users/Queries';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useLazyQuery } from '@apollo/client';
import { CREATE_USER } from '@/Graphql/Users/Mutation';

const schemaSighIn = z.object({
    username: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  })

export default function AppSignIn() {

    const formSighIn = useForm<z.infer<typeof schemaSighIn>>({
      resolver: zodResolver(schemaSighIn),
      defaultValues: {
        username: "",
        email: "",
        password:""
      },
    })
  
    const [ createUser, { data } ] = useMutation(CREATE_USER);
  
  
    const signInUser = async (e: React.FormEvent) =>{
        e.preventDefault();
        try{
          const { username, email ,password } = await formSighIn.getValues();
          createUser({
            variables: {
              name: username,
              email: email,
              password: password,
            }
          }).then(({ data }) => {
            enviaToast("Usuario criado com sucesso!", "name", "#4CAF50", "white");
          }).catch((error) => {
            enviaToast("Erro ao criar usuario", "name", "#FF0000", "white");
          });
        }catch(error){
            enviaToast("Erro ao criar usuario", "name", "#FF0000", "white");
        }
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
     
        <Form {...formSighIn}>
            <form className="space-y-8">
            <FormField
            control={formSighIn.control}
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
            control={formSighIn.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

        <FormField
            control={formSighIn.control}
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
            
            <div className="flex justify-center"><Button  onClick={signInUser} type="submit">Cadastrar</Button></div>
            </form>
            </Form>

    );
  }
  