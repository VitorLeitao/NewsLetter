import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { CREATE_NEW } from "./Mutations/News";
import { GET_ALL_NEWS } from "./Queries/News";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_ALL_NEWS,
  },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createNew: CREATE_NEW,
      //deleteUser: DELETE_USER,
      //updatePassword: UPDATE_PASSWORD,
    },
  });
  
  export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
  });