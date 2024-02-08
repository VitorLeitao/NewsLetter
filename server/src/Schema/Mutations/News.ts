import { GraphQLID, GraphQLString } from "graphql";
import { NewsType } from "../TypeDefs/News";
import { db } from "../../../lib/db";

export const CREATE_NEW ={ 
    type: NewsType,
    args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        date: { type: GraphQLString },
        author: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { title, description, date, author } = args; 
        const newRegister = await db.news.create({
            data: {
              title: title, 
              description: description, 
              date: date, 
              author: author, 
            }
          });
        return newRegister;
    },
};