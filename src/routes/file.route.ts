import express from 'express';
import * as fileController from '../controllers/file.controllers';
import { isLogin, isAdmin } from '../middleware/authorization';
import upload from '../config/multer';
import { body } from 'express-validator';

import {getFileStatsController} from '../controllers/file.controllers'



const fileRouter = express.Router();
//Admin Route
fileRouter.get('/stats', isLogin, isAdmin , getFileStatsController);

fileRouter.post('/upload', isLogin, isAdmin, upload.single('file'),
    body("title").isString(), body("description").isString(), fileController.uploadFileController);

//User Route
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /files:
 *   get:
 *     summary: Get all files
 *     description: Retrieve a list of all files
 *     responses:
 *       '200':
 *         description: A list of files has been retrieved successfully
 *       '401':
 *         description: Unauthorized, authentication token is invalid or expired
 *     security:
 *       - bearerAuth: []
 */


fileRouter.get('/', isLogin , fileController.getFilesController);

fileRouter.get('/:id', isLogin, fileController.getFileByIdController);

fileRouter.get('/download/:id', isLogin, fileController.downloadFileController);

fileRouter.post('/email/:id', isLogin, fileController.sendEmailController);



export default fileRouter;