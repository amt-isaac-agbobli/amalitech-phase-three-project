import express from 'express';
import * as fileController from '../controllers/file.controllers';
import { isLogin, isAdmin } from '../middleware/authorization';
import upload from '../config/multer';
import { body } from 'express-validator';

import {getFileStatsController} from '../controllers/file.controllers'



const fileRouter = express.Router();
//Admin Route
fileRouter.get('/stats', isLogin, isAdmin , getFileStatsController);

fileRouter.get('/stats/:id', isLogin, isAdmin , fileController.getFileStatsByIdController);

fileRouter.post('/upload', isLogin, isAdmin, upload.single('file'),
    body("title").isString(), body("description").isString(), fileController.uploadFileController);


//User Route
fileRouter.get('/', isLogin , fileController.getFilesController);

fileRouter.get('/:id', isLogin, fileController.getFileByIdController);

fileRouter.get('/download/:id', isLogin, fileController.downloadFileController);

fileRouter.post('/email/:id', isLogin, fileController.sendEmailController);



export default fileRouter;