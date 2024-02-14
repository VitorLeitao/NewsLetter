"use client";
import React, { useEffect } from "react";
import { useQuery, useLazyQuery, ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GET_ALL_NEWS } from "@/Graphql/News/Queries";
import { GET_ALL_USER, GET_USER_BY_NAME } from "@/Graphql/Users/Queries";
import { Button } from '@/components/ui/button';
import client from '../apolloClient';
import AppLogIn from "@/components/log-in";
import AllNews from "@/components/news";


function ListOfNews() {
  return (
    <ApolloProvider client={client}>
     <AllNews />
    </ApolloProvider>
    
  );
}

export default ListOfNews;