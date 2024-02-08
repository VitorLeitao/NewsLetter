import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLScalarType } from "graphql";

export const UsersType = new GraphQLObjectType({
  name: "Users",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});