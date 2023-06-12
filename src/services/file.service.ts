import {db} from '../config/db.server';
import { File } from '../types/file.type';

export const uploadFile = async (file:File ,adminId : number) => {
    const {title,description,file_path} = file ;
    
    return await db.file.create({
        data:{
            title,
            description,
            file_path ,
            adminId   
        }
    }) ;
};

export const getFiles = async () => {
    return await db.file.findMany({
        select:{
            id:true,
            title:true,
            description:true,
        }
    }) ;
};