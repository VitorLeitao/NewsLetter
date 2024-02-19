"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SettingsIcon } from "lucide-react";
import { useRouter } from 'next/navigation';
import React from "react";
import Link from 'next/link';
import { Inter } from 'next/font/google';


export const Navbar = () => {

  const router = useRouter(); 
  const handleNavigation = (path: string, deslog: boolean) => {
    if(deslog){
      localStorage.setItem('idLogado', '1');
    }
    router.push(path);
  };

    return (
        <><nav style={{ background: 'pink', color: 'white', padding: '1rem', height: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexGrow: 1, justifyContent: 'space-around' }}>
          <Avatar>
          <AvatarImage src="/CIN.jpg" />
            <AvatarFallback>iti</AvatarFallback>
          </Avatar>
  
          </ul>
          <h1 style={{ color: 'black', fontSize: '24px', margin: 0 }}>Newsletter</h1> 
          <ul style={{ listStyle: 'none', display: 'flex', flexGrow: 1, justifyContent: 'space-around' }}>
          <DropdownMenu >
            <DropdownMenuTrigger>
              <SettingsIcon style={{ color: 'black', fontSize: '25px' }}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigation('/perfil', false)}>Perfil</DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleNavigation('/', true)}>Sair</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation('/postar', false)}>Postar</DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
  
          </ul>
        </div>
      </nav></>
      
    );
  };