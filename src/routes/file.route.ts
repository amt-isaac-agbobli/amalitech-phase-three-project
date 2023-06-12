import express from 'express';
import * as fileController from '../controllers/file.controllers';
import { isLogin, isAdmin } from '../middleware/verification';
import upload from '../config/multer';
import { body } from 'express-validator';



const fileRouter = express.Router();

fileRouter.post('/upload', isLogin, isAdmin, upload.single('file'),
    body("title").isString(), body("description").isString(), fileController.uploadFileController);

fileRouter.get('/', isLogin , fileController.getFilesController);
export default fileRouter;

fileRouter.get('/:id', isLogin, fileController.getFileByIdController);