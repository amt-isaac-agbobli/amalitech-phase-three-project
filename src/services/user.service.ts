import {db} from '../config/db.server' ;
import { User,UserRead } from '../types/user.types';
import { hashPassword ,comparePassword } from '../utils/helper';

export const userReigister = async (user:User) : Promise<UserRead> =>   {
    const {firstName , lastName ,email,password } = user ;
    const userExist = await db.user.findUnique({
        where:{email}
    },) ;
    if(userExist){
        throw new Error('User already exist') ;}
    return await db.user.create({
        data:{
            firstName , 
            lastName,
            email, 
            password : await hashPassword(password)
         
        },
        select:{
            id : true ,
            firstName : true ,
            lastName : true ,
            email : true ,
            createdAt : true ,
            updatedAt : true ,
            role : true
        }
    }) ;
    
};

export const userLogin = async (email:string , password:string) :Promise<UserRead> => {
    const user = await db.user.findUnique({
        where:{email}
    }) ;
    if(!user){
        throw new Error('User not found') ;
    }
    const isMatch = await comparePassword(password,user.password) ;
    if(!isMatch){
        throw new Error('Invalid credentials') ;
    }
    return user ;
}