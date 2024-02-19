import { GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { UsersType } from "../TypeDefs/Users";
import { db } from "../../../lib/db";


export const GET_ALL_USER = {
    type: new GraphQLList(UsersType),
    resolve() {
      return db.user.findMany();
    },
  };

  export const GET_USER_BY_NAME = {
    type: UsersType,
    args: {
      username: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
      const { username } = args;
      const userSelecionado = await db.user.findFirst({
        where: {
          name: username 
        }
      });
      return userSelecionado;
    },
  };

  export const GET_USER_BY_ID = {
    type: UsersType,
    args: {
      id: { type: GraphQLInt },
    },
    async resolve(parent: any, args: any) {
      const { id } = args;
      const userSelecionado = await db.user.findUnique({
        where: {
          id: id
        }
      });
      return userSelecionado;
    },
  };
  