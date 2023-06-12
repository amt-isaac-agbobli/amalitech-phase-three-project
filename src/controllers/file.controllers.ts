import { Request , Response ,NextFunction } from "express";
import { uploadFile } from "../services/file.service";
import cloudinary from '../config/cloudinary' ;


export const uploadFileController = async (req:Request ,res:Response ,next:NextFunction) => {
    try {
        const {title,description} = req.body ;
        const {path} : any = req.file ;
        const result = await cloudinary.uploader.upload(path) ;
        const file = await uploadFile({
            title,
            description,
            file_path:result.secure_url
        },1) ;
        res.status(201).json({
            message:"File uploaded successfully",
            file
        }) ;
    } catch (error) {
        next(error) ;
    }
    
};