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
import {Form,FormControl,FormField,FormItem,FormLabel,FormDescription,FormMessage,} from '@/components/ui/form';
import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger,} from "@/components/ui/sheet"
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USER, GET_USER_BY_NAME } from '@/Graphql/Users/Queries';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useLazyQuery } from '@apollo/client';
import { CREATE_USER } from '@/Graphql/Users/Mutation';
import AppSignIn from './create-user';

const schemaLogin = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  })

export default function AppLogIn() {

  const router = useRouter(); // Inicialize o hook useRouter
  const formLogIn = useForm<z.infer<typeof schemaLogin>>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      username: "",
      password:""
    },
  })

  const [getUserByName, { called, loading, data }] = useLazyQuery(GET_USER_BY_NAME);

  const checkUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const { username, password } = await formLogIn.getValues();
      getUserByName({
          variables: {
            username: username
          }
        }).then(({ data }) => {
          if(data.getUserByName.password === password){
              enviaToast("Senha correta, logando", "name", "#4CAF50", "white");
              localStorage.setItem('idLogado', data.getUserByName.id);
              console.log(localStorage.getItem('idLogado'));
              router.push('/mainpage');
          }else{
              enviaToast("Senha Incorreta", "name", "#FF0000", "white");
          }
        }).catch((error) => {
          enviaToast("Username Incorreto", "name", "#FF0000", "white");
          console.log(error);
        });
    }catch(error){
      console.log(error);
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
    <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col items-center">
      <Label className="mb-4 text-2xl">
          Login
      </Label>
    <div className="border p-10 shadow-xl rounded-lg bg-white">
    <Form {...formLogIn}>
        <form className="space-y-8">
        <FormField
          control={formLogIn.control}
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
          control={formLogIn.control}
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
        
        <div className="flex justify-center"><Button onClick={checkUser} type="submit">Entrar</Button></div>
        <div>


        {/* Campos para registro e alteração de senha */}
        <Sheet>
          <SheetTrigger asChild>
            <span className="text-blue-500 cursor-pointer underline">
              Ainda não tenho uma conta
            </span>
          </SheetTrigger>
          <SheetContent side="right">
              <AppSignIn />
          </SheetContent>
        </Sheet>
        </div>
      </form>
    </Form>
      </div></div>
    
    </div>
  );
}
