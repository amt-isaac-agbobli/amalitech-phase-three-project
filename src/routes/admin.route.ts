import { Router } from "express";
import express  from 'express';
import { body } from "express-validator";
import * as  addminController from '../controllers/admin.controllers' ;
import {isLogin} from '../middleware/authorization' ;

const adminRouter : Router = express.Router();


adminRouter.post('/register', body('email').isEmail(), body('password').isStrongPassword(),
            addminController.registerAdmin); 
adminRouter.post('/sign-in', body('email').isEmail(), body('password').isString(),addminController.loginAdmin);

adminRouter.get('/' , isLogin, addminController.getAdmins) ;

adminRouter.get('/:id' ,isLogin, addminController.getAdmin) ;

adminRouter.delete('/:id' , addminController.deleteAdmin) ;





export default adminRouter ;