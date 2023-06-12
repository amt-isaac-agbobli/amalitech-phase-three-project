import { Request, Response, NextFunction } from "express";
import {validationResult} from 'express-validator' ;
import { uploadFile ,getFiles } from "../services/file.service";
import cloudinary from '../config/cloudinary';
import { CustomRequest } from "../interfaces/verification.interface";
import fs from 'fs';




export const uploadFileController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const errors = validationResult(req) ;
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()}) ;  
        }

        const { title, description } = req.body;
        const user: any = (req as CustomRequest).token;
        const id: number = parseInt(user.id);

        if (req.file) {
            console.log(req.file.path);
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'auto',
                folder: 'files',
            });

            const file = await uploadFile({
                title,
                description,
                file_path: result.secure_url
            }, id);

            fs.unlinkSync(req.file.path);

            res.status(201).json({
                message: "File uploaded successfully",
                file
            });
        }
    } catch (error) {
        next(error);
    }

};

export const getFilesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files = await getFiles();
        console.log(files);
        return res.status(200).json(files);
    } catch (error) {
        next(error);
    }
}