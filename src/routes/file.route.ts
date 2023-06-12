import express from 'express';
import { uploadFileController } from '../controllers/file.controllers';
import upload from  '../config/multer'



const fileRouter = express.Router() ;

fileRouter.post('/upload',upload.single('file'),uploadFileController) ;

export default fileRouter ;