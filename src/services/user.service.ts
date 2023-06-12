import {db} from '../config/db.server' ;
import { User,UserRead } from '../types/user.types';
import { hashData ,compareData } from '../utils/helper';

export const userReigister = async (user:User) : Promise<UserRead> =>   {
    const {email,password } = user ;
    const userExist = await db.user.findUnique({
        where:{email}
    },) ;
    if(userExist){
        throw new Error('User already exist') ;}
    return await db.user.create({
        data:{
            email, 
            password : await hashData(password)
         
        },
        select:{
            id : true ,
            email : true ,
            createdAt : true ,
            updatedAt : true ,
            role : true,
            isVarified : true
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
    const isMatch = await compareData(password,user.password) ;
    if(!isMatch){
        throw new Error('Invalid credentials') ;
    }
    if(!user.isVarified){
        throw new Error('Please your account is not veriefied') ;
    }
    return user ;
} ;

export const userProfile = async (email:string) :Promise<UserRead | null> => {
    const profile = await db.user.findUnique({
        where:{
            email
        },
        select:{
            email:true,
            id : true,
            createdAt: true ,
            updatedAt: true,
            role: true,
            isVarified: true
        }
    }) ;
    if(!profile){
        throw new Error("Profile Not Found")
    }
    return profile ;

} ;