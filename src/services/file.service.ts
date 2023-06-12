import {db} from '../config/db.server';
import { File } from '../types/file.type';
import { sendEmail } from '../utils/send.email';

import { transporter } from "../config/nodemailer.transporter";

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

export const getFile = async (id:number)  => {
    return await db.file.findUnique({
        where:{id},
        select:{
            id:true,
            title:true,
            description:true,
        }
    }) ;
} ;

export const downloadFile = async (id:number) => {
    return await db.file.findUnique({
        where:{id},
        select:{
            id:true,
            title:true,
            description:true,
            file_path:true
        }
    }) ;
} ;


export const saveDownload = async (fileId:number , userId:number) => {
    return await db.download.create({
        data:{
            fileId,
            userId
        }
    }) ;
};

// I want to send file as attachment  as well as send email to user
// I will use nodemailer for sending email
export const sendEmailToUser = async (fileId:number , userId:number) => {
   try {
    const file = await db.file.findUnique({where:{id:fileId}}) ;
    const user = await db.user.findUnique({where:{id:userId}}) ;
     
    if(!file || !user) throw new Error('File or User Not Found') ;
    const {email} = user ;
     const {title,description,file_path} = file ;

     const filename = file_path.split("\\")[1];
 
     const mailOptions = {
         from: 'File Sharing App',
         to: email,
         subject: 'File Shared',
         text: `File Title : ${title} \n File Description : ${description} \n File Path : ${file_path}`,
         attachments : [
            {
              filename,
              path: file_path,
            },
          ],
         };
           
     sendEmail(mailOptions) ;
    
     
 
   } catch (error) {
     throw error;
   }

} ;

