import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLScalarType, GraphQLInt } from "graphql";
import { UsersType } from "./Users";
import { db } from "../../../lib/db";

export const NewsType = new GraphQLObjectType({
  name: 'News',
  fields: () => ({
      id: { type: GraphQLInt },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      date: { type: GraphQLString },
      author: { 
          type: UsersType, // Assumindo que você tenha um UserType definido
          resolve(news) {
              return db.user.findUnique({ where: { id: news.authorId } });
          }
      },
  })
});
