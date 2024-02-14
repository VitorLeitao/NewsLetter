"use client";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import {Form,FormControl,FormField,FormItem,FormLabel,FormDescription,FormMessage,} from '@/components/ui/form';
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CREATE_NEW } from "@/Graphql/News/Mutations";
import { useToast, toast } from "@/components/ui/use-toast"

const schemaNew = z.object({
  title: z.string().min(2).max(50),
  text: z.string().min(2).max(50),
})


export default function AppPostNew() {

  const formCreateNew = useForm<z.infer<typeof schemaNew>>({
    resolver: zodResolver(schemaNew),
    defaultValues: {
      title: "",
      text:""
    },
  })

  const [ createNew, { data } ] = useMutation(CREATE_NEW);
  
  const postNew = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
      const { title, text } = await formCreateNew.getValues();
      createNew({
        variables: {
          title: title,
          description: text,
          date: new Date().toString(),
          authorId: parseInt(await localStorage.getItem('idLogado') || '0', 10)
        }
      }).then(({ data }) => {
          enviaToast("Noticia cadastrada com sucesso", "name", "#4CAF50", "white");
      }).catch((error) => {
        enviaToast("Erro ao cadastrar noticia", "name", "#FF0000", "white");
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
    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Create New</CardTitle>
      <CardDescription>Preencha os campos para postar a noticia</CardDescription>
    </CardHeader>
    <CardContent>
      <Form {...formCreateNew}>
          <form className="space-y-8">
          <FormField
            control={formCreateNew.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={formCreateNew.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Text" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/*<div className="flex justify-center"><Button onClick={createNew} type="submit">Entrar</Button></div>*/}
        </form>
      </Form>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline">Cancel</Button>
      <Button  onClick={postNew}>Deploy</Button>
    </CardFooter>
  </Card></div>
    
  );
}

