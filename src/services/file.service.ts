import {db} from '../config/db.server';
import cloudinary from '../config/cloudinary';
import { File } from '../types/file.type';

export const uploadFile = async (file:File ,adminId : number) => {
    const {title,description,file_path} = file ;
    const upload = await cloudinary.uploader.upload(file_path,{
        resource_type:'auto',
        folder:'files'
    }) ;
    return await db.file.create({
        data:{
            title,
            description,
            file_path : upload.secure_url,
            adminId 
            
        }
    }) ;
}