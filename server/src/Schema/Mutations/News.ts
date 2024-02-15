import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { NewsType } from "../TypeDefs/News";
import { db } from "../../../lib/db";
import { MessageType } from "../TypeDefs/Messages";
import { News } from "@prisma/client";

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
                    id: newsSelecionada?.authorId || undefined
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

// Update nas noticias
export const UPDATE_TITLE = { 
    type: MessageType,
    args: {
        id: { type: GraphQLInt }, 
        title: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id, title } = args;
        const newSelecionada: News | null = await db.news.findUnique({
            where: { id: id }
        });

        if (title === newSelecionada?.title) {
            return { sucessful: false, message: "Nothing to update"};
        }else{
            await db.news.update({
                where: { id: id },
                data: { title: title }
            });
            return { sucessful: true, message: "successfully updated"};
        }
    },
};

// Update na descrição das noticias
export const UPDATE_DESCRIPTION= { 
    type: MessageType,
    args: {
        id: { type: GraphQLInt }, 
        description: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id, description } = args;
        const newSelecionada: News | null = await db.news.findUnique({
            where: { id: id }
        });

        if (description === newSelecionada?.description) {
            return { sucessful: false, message: "Nothing to update"};
        }else{
            await db.news.update({
                where: { id: id },
                data: { description: description }
            });
            return { sucessful: true, message: "successfully updated"};
        }
    },
};