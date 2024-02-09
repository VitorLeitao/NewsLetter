import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { CREATE_NEW, DELETE_NEWS } from "./Mutations/News";
import { GET_ALL_NEWS } from "./Queries/News";
import { GET_ALL_USER } from "./Queries/Users";
import { CREATE_USER, DELETE_USER, UPDATE_USER_PASSWORD } from "./Mutations/Users";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllNews: GET_ALL_NEWS,
    getAllUser: GET_ALL_USER,
  },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createNew: CREATE_NEW,
      createUser: CREATE_USER,
      deleteNews: DELETE_NEWS,
      updatePassword: UPDATE_USER_PASSWORD,
      deleteUser: DELETE_USER,
    },
  });
  
  export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
  });