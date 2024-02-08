import { GraphQLID, GraphQLString } from "graphql";
import { UsersType } from "../TypeDefs/Users";
import { db } from "../../../lib/db";

export const CREATE_USER ={ 
    type: UsersType,
    args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { name, email, password } = args; 
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