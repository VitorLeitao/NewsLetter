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


export default function AppProfile() {
  return (
    <div className="flex justify-center items-center h-screen">

    </div>
  );
}

