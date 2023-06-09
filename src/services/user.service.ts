import { promises } from 'dns';
import {db} from '../config/db.server' ;
import { User } from '../types/user.types';
import { hashPassword } from '../utils/helper';

export const userReigister = async (user:User) => {
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
    
}