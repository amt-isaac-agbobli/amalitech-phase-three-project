import { Router } from "express";
import express  from 'express';
import { body } from "express-validator";
import * as  addminController from '../controllers/admin.controller' ;

const adminRouter : Router = express.Router();


adminRouter.post('/register', body('email').isEmail(), body('password').isStrongPassword(),
            addminController.registerAdmin); 

adminRouter.get('/', async(req ,res)=>{
    res.status(200).json({
        Status : "Success",
        Message : "Admin Router is working Perfect"
    }) ;
})





export default adminRouter ;