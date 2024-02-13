"use client";
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppLogIn from '@/components/log-in';
import { createRoot } from "react-dom/client"; 

function Home() {
  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <AppLogIn />
    </ApolloProvider>
  );
}

export default Home; 
