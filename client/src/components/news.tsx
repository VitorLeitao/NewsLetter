import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS } from "@/Graphql/News/Queries";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";

function AllNews() {
  const { loading, error, data } = useQuery(GET_ALL_NEWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h1>Notícias</h1>
      {data.getAllNews.map((newsItem: any) => (
        <Card key={newsItem.id} style={{ margin: '10px', width: '80%', overflow: 'hidden', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <CardHeader style={{ display: 'flex', marginBottom: '10px' }}>
            <CardTitle>{newsItem.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ margin: '0 0 10px 0' }}>{newsItem.description}</p>
          </CardContent>
          <CardFooter style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8em', color: '#666' }}>
            <span>{newsItem.date}</span>
            {/* se o autor n existir, vai aparecer - */}
            <span>Por {newsItem.author ? newsItem.author.name : "-"}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default AllNews;
