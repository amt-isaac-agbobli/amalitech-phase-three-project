import { Router } from "express";
import express  from 'express';
import { body } from "express-validator";
import * as  addminController from '../controllers/admin.controller' ;

const adminRouter : Router = express.Router();


adminRouter.post('/register', body('email').isEmail(), body('password').isStrongPassword(),
            addminController.registerAdmin); 
adminRouter.post('/login', body('email').isEmail(), body('password').isString(),addminController.loginAdmin);

adminRouter.get('/' , addminController.getAdmins) ;

adminRouter.get('/:id' , addminController.getAdmin) ;





export default adminRouter ;