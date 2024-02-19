import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS } from "@/Graphql/News/Queries";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

function AllNews() {
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 3; // Número de notícias por página
  
  const { loading, error, data } = useQuery(GET_ALL_NEWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Calcular o índice inicial e final das notícias a serem exibidas na página atual
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = data.getAllNews.slice(indexOfFirstNews, indexOfLastNews);

  const totalPages = Math.ceil(data.getAllNews.length / newsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h1>Notícias</h1>
      {currentNews.map((newsItem: any) => (
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => setCurrentPage(currentPage - 1)} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index} isActive={currentPage === index + 1}>
              <PaginationLink href="#" onClick={() => setCurrentPage(index + 1)}>{index + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" onClick={() => setCurrentPage(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default AllNews;