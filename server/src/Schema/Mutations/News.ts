import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { NewsType } from "../TypeDefs/News";
import { db } from "../../../lib/db";
import { MessageType } from "../TypeDefs/Messages";

export const CREATE_NEW ={ 
    type: NewsType, // tipo da resposta
    args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        date: { type: GraphQLString },
        authorId: { type: GraphQLInt },
    },
    async resolve(parent: any, args: any) {
        const { title, description, date, authorId } = args; 
        const newRegister = await db.news.create({
            data: {
              title: title, 
              description: description, 
              date: date, 
              authorId: authorId, 
            }
          });
        return newRegister;
    },
};

// Deletar a noticia
export const DELETE_NEWS = { 
  type: MessageType,
  args: {
      id: { type: GraphQLInt },
      password: {type: GraphQLString},
  },
  async resolve(parent: any, args: any) {
        try{
            const { id, password } = args; 
            const newsSelecionada = await db.news.findUnique({
                where: {
                    id: id
                }
            })
            const autorSelecionado = await db.user.findUnique({
                where: {
                    id: newsSelecionada?.authorId
                }
            })
            if(autorSelecionado?.password === password){
                const deletedNews = await db.news.delete({
                    where: { id: id },
                });
                return { sucessful: true, message: "successfully deleted"};
            }else{
                return { sucessful: false, message: "wrong password"};
            }
        }catch(error){
            console.log(error)
        }
    },
};