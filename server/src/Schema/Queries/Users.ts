import { GraphQLList } from "graphql";
import { UsersType } from "../TypeDefs/Users";
import { db } from "../../../lib/db";


export const GET_ALL_USER = {
    type: new GraphQLList(UsersType),
    resolve() {
      return db.user.findMany();
    },
  };