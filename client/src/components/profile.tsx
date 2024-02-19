"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Center, HStack, VStack, Image, Text, Spinner } from '@chakra-ui/react';
import { GET_USER_BY_ID } from "@/Graphql/Users/Queries";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";


function AppProfile() {
  // Corrigido: Especifica que userId pode ser `number` ou `null`.
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const userLoggedId = localStorage.getItem('idLogado');
    if (userLoggedId) {
      setUserId(parseInt(userLoggedId, 10));
      console.log(localStorage.getItem('idLogado'));
    }
  }, []);

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId, // A consulta será pulada até que userId seja definido
  });
  
  if (loading) return <Center h="100vh"><Spinner /></Center>;
  if (error) return <Center h="100vh"><Text>Ocorreu um erro: {error.message}</Text></Center>;

  const userProfile = data?.getUserById;
  const imagePath = '/perfil.png'; // Caminho para uma imagem padrão, se necessário

  // Renderização condicional baseada na existência do userProfile
  if (!userProfile) return <Center h="100vh"><Text>Perfil não encontrado.</Text></Center>;

  return (
    <Center h="100vh" w="full">
      <VStack spacing={4} align="center"> {/* Envolve HStack e o Texto em um VStack */}
        <HStack spacing={10} align="flex-start" p={5}>
          <VStack>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={userProfile.image || imagePath} // Adicione um caminho para uma imagem padrão
              alt={`Foto de ${userProfile.name}`}
            />
            <Text mt={2} fontSize="xl" fontWeight="bold">
              <Alert>
                <AlertTitle>Autor: {userProfile.name}</AlertTitle>
              </Alert>
            </Text>
          </VStack>
          <VStack align="flex-start" spacing={3}>
            <Text fontSize="md" color="gray.500" padding={50}>
              Email: {userProfile.email}
            </Text>
            
          </VStack>
        </HStack>
        
        <Text fontSize="md" color="gray.500" padding={20}>
          Notícias publicadas por {userProfile.name}: 
          {/* Você pode adicionar a contagem de notícias aqui, se disponível */}
        </Text>
      </VStack>
    </Center>

  );
}

export default AppProfile;
