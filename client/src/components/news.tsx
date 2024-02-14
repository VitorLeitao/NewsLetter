"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USER } from "@/Graphql/Users/Queries";
import { GET_ALL_NEWS } from "@/Graphql/News/Queries";

function AllNews() {
  const { loading, error, data } = useQuery(GET_ALL_NEWS);
  
  function teste() {
    console.log(data);
  }

  // If data is loading or an error occurred, show appropriate feedback
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h1>Ola mundo</h1>
      <button onClick={teste}>Click Me</button>
    </>
  );
}

export default AllNews;
