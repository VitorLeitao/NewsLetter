const express = require('express');
const { graphqlHTTP } = require('express-graphql');
// const { schema } = require('./Schema');
const cors = require('cors');
const { createConnection } = require('typeorm');
// const { Users } = require('./Entities/Users');

const main = async () => {
  
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.listen(3001, () => {
      console.log("SERVER RUNNING ON PORT 3001");
    });
  };
  
  main().catch((err) => {
    console.log(err);
  });