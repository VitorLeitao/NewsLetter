import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { NewsType } from "../TypeDefs/News";
import { db } from "../../../lib/db";

export const CREATE_NEW ={ 
    type: NewsType,
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
  type: NewsType,
  args: {
      id: { type: GraphQLID }, // ID da notícia que será excluída
      password: {type: GraphQLString}, // senha do autor da noticia
  },
  async resolve(parent: any, args: any) {
        try{
            // primeiramente vamos confirmar se a senha do autor está correta
            const { id, password } = args; 

            // Vamos pegar o id do autor da noticia que esta sendo selecionada
            const newsSelecionada = await db.news.findUnique({
                where: {
                    id: id
                }
            })
            // Vamos pegar o autor que tenha o id na coluna de autor da noticia selecionada
            const autorSelecionado = await db.user.findUnique({
                where: {
                    id: newsSelecionada?.authorId
                }
            })

            const deletedNews = await db.news.delete({
                where: { id: Number(id) }, // Especifica a notícia a ser excluída com base no ID fornecido
            });
            return deletedNews;
            
        }catch(error){
            console.log(error)
        }
        
    },
};