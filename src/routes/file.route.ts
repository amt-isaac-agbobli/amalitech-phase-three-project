import express from 'express';
import { uploadFileController, getFilesController } from '../controllers/file.controllers';
import { isLogin, isAdmin } from '../middleware/verification';
import upload from '../config/multer';
import { body } from 'express-validator';



const fileRouter = express.Router();

fileRouter.post('/upload', isLogin, isAdmin, upload.single('file'),
    body("title").isString(), body("description").isString(), uploadFileController);

fileRouter.get('/files', isLogin , getFilesController);
export default fileRouter;