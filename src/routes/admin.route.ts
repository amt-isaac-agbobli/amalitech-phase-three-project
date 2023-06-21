import { Router } from "express";
import express  from 'express';
import { body } from "express-validator";
import * as  adminController from '../controllers/admin.controllers' ;
import {isLogin} from '../middleware/authorization' ;

const adminRouter : Router = express.Router();


adminRouter.post('/register', body('email').isEmail(), body('password').isStrongPassword(),
            adminController.registerAdmin); 
adminRouter.post('/sign-in', body('email').isEmail(), body('password').isString(),adminController.loginAdmin);

adminRouter.get('/:id' ,isLogin, adminController.getAdmin) ;







export default adminRouter ;