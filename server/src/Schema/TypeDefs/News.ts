import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLScalarType, GraphQLInt } from "graphql";

export const NewsType = new GraphQLObjectType({
  name: "News",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    author: { type: GraphQLInt }
  }),
});