import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import "reflect-metadata";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/news', async (req, res) => {
      const news = await prisma.news.findMany();
      res.json(news);
  });

  app.post('/news', async (req, res) => {
      const { title, description, date, author } = req.body;
      const newNews = await prisma.news.create({
          data: {
              title,
              description,
              date,
              author,
          },
      });
      res.json(newNews);
  });

  app.listen(3001, () => {
      console.log('SERVER RUNNING ON PORT 3001');
  });
};

main().catch((err) => {
  console.error(err);
});
