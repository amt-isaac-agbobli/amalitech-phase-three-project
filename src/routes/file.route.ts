import express from 'express';
import { uploadFileController } from '../controllers/file.controllers';
import { isLogin ,isAdmin } from '../middleware/verification';
import upload from  '../config/multer'



const fileRouter = express.Router() ;

fileRouter.post('/upload', isLogin , isAdmin, upload.single('file'),uploadFileController) ;

export default fileRouter ;