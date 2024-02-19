import { GraphQLList } from "graphql";
import { NewsType } from "../TypeDefs/News";
import { db } from "../../../lib/db";


export const GET_ALL_NEWS = {
  type: new GraphQLList(NewsType),
  resolve() {
      return db.news.findMany({
          include: { author: true } // Inclui os dados do autor
      });
  },
};

