import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';
import { uploadFile, getFiles, getFile, downloadFile, saveDownload, sendEmailToUser, saveEmail , getFileStats } from "../services/file.service";
import cloudinary from '../config/cloudinary';
import { CustomRequest } from "../interfaces/auth.interfaces";

/**
 * @desc Controller for File Uploading
 * @access Private
 * @route POST /api/v1/files/upload
 * */ 
export const uploadFileController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description } = req.body;
        const user: any = (req as CustomRequest).token;
        const id: number = parseInt(user.id);

        if (req.file) {

            /*const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'auto',
                folder: 'files',
            }); */

            const file = await uploadFile({
                title,
                description,
                file_path: req.file.path,
            }, id);

            res.status(201).json({
                message: "File uploaded successfully",
                file
            });
        }
    } catch (error) {
        next(error);
    }

};

/**
 * @desc Controller for for Displaying Files
 * @access Private
 * @route GET /api/v1/files 
 * */ 
export const getFilesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const url = `${req.protocol}://${req.get('host')}/api/v1/files/download/`;;
        const files = (await getFiles()).map(file => {
            return {
                id: file.id,
                title: file.title,
                description: file.description,
                "Download Url": url + file.id
            }
        });

        return res.status(200).json(files);
    } catch (error) {
        next(error);
    }
};
/**
 * @desc Controller for for Displaying File by ID
 * @access Private
 * @route GET /api/v1/files 
 * */ 
export const getFileByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const url = `${req.protocol}://${req.get('host')}/api/v1/files/download/`;
        const id = parseInt(req.params.id);
        const file = await getFile(id);
        return res.status(200).json({
            file,
            "Download URL": url + id
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Controller for for Downloading File
 * @access Private
 * @route GET /api/v1/files/download/:id 
 * */ 
export const downloadFileController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const file = await downloadFile(id);
        if (!file) {
            return res.status(404).json({
                message: "File not found"
            })
        }
        const fileUrl = file.file_path;
        res.download(fileUrl);
        const user: any = (req as CustomRequest).token;
        const userId: number = parseInt(user.id);
        await saveDownload(id, userId);
    } catch (error) {
        next(error);
    }
};
/**
 * @desc Controller for Sending File through Email
 * @access Private
 * @route POST /api/v1/files/email/:id 
 * */ 
export const sendEmailController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: any = (req as CustomRequest).token;

        const userId: number = parseInt(user.id);
        const fileId = parseInt(req.params.id);

        await sendEmailToUser(fileId, userId);
        await saveEmail(fileId, userId);

        return res.status(200).json({
            message: "Email sent successfully"
        });

    } catch (error) {
        next(error)
    }
};
/**
 * @desc Controller for Geting Statistics on download and email sent of files
 * @access Private
 * @route GET /api/v1/files/stats 
 * */ 
export const getFileStatsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fileStats = await getFileStats();
        return res.status(200).json(fileStats);
    }catch(error){
        next(error);
    }
};