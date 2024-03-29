import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import "reflect-metadata";
import { PrismaClient } from '@prisma/client';
import { schema } from './Schema/index'

const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(3001, () => {
      console.log('SERVER RUNNING ON PORT 3001');
  });
};

main().catch((err) => {
  console.error(err);
});
