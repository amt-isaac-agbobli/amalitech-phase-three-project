import { Request , Response ,NextFunction } from "express";
import { uploadFile } from "../services/file.service";
import cloudinary from '../config/cloudinary' ; 
import fs from 'fs' ;


export const uploadFileController = async (req:Request ,res:Response ,next:NextFunction) => {
    try {
        const {title,description} = req.body ;
        //if(!req.file) throw new Error('File not found') ;
       // const path = req.file.path;
       if(req.file){
        /*const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'auto',
            folder: 'files',
          });*/
          console.log(req.file.path) ; 

         console.log(req.file.path) ; 
        const file = await uploadFile({
            title,
            description,
            file_path:req.file.path
        },1) ;
        res.status(201).json({
            message:"File uploaded successfully",
            file
        }) ;}
    } catch (error) {
        next(error) ;
    }
    
};