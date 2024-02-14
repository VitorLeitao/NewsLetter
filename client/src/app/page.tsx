"use client";
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppLogIn from '@/components/log-in';
import { createRoot } from "react-dom/client"; 
import client from './apolloClient';

function Home() {
  return (
    <ApolloProvider client={client}>
      <AppLogIn />
    </ApolloProvider>
  );
}

export default Home; 
