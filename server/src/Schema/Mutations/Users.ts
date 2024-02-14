import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { UsersType } from "../TypeDefs/Users";
import { db } from "../../../lib/db";
import { MessageType } from "../TypeDefs/Messages";

//CRIAR USUARIO
export const CREATE_USER ={ 
    type: UsersType,
    args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { name, email, password } = args; 
        const existingUser = await db.user.findFirst({
            where: {
            name: name,
            },
        });
        if (existingUser) {
            throw new Error("Já existe um usuario com esse nome");
        }
        const newUser = await db.user.create({
            data: {
              name: name, 
              email: email, 
              password: password, 
            }
          });
        return newUser;
    },
};

//MUDAR SENHA
export const UPDATE_USER_PASSWORD = {
    type: UsersType,
    args: { 
        id: {type: GraphQLID}, //pega o id do usuario que deseja att a senha
        newPassword: { type: GraphQLString },
    },
    async resolve(paent: any, args: any){
        const {id, newPassword} = args;
        const existUser = await db.user.findUnique({ 
            where: {id: Number(id)}, //o usuario com esse id existe
        });

        if (!existUser){ //se o usuario n existe, ja acaba aqui
            throw new Error("User not found");
        }

        //att senha
        const updatePassword = await db.user.update({
            where: {id: Number(id)},
            data: {password: newPassword},
        });
        return updatePassword;
    },
};

//DELETAR USUARIO
export const DELETE_USER = {
    type: MessageType,
    args: {
        id: { type: GraphQLInt },
        password: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        try {
            const { id, password } = args;
            const userSelecionado = await db.user.findUnique({
                where: {
                    id: id
                }
            });
            //verificar se o usuario existe, senha corresponde
            if (userSelecionado && userSelecionado.password === password) {
                // Exclui todas as notícias associadas ao usuário
                await db.news.deleteMany({
                    where: { authorId: Number(id) },
                });

                // Exclui o usuário após excluir todas as notícias associadas
                await db.user.delete({
                    where: { id: Number(id) },
            });

                return { successful: true, message: "successfully deleted" };
            } else { // se o usario n existir ou senha incorreta
                return { successful: false, message: "wrong password or user doesn't exist" };
            }
        } catch (error) {
            console.log(error);
        }
    }
};
