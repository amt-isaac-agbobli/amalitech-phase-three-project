import { Router } from "express";
import express  from "express";
import {userLogin, userReigister} from '../controllers/user.controllers' ;
import {body} from 'express-validator' ;

const userRouter : Router = express.Router() ;

userRouter.post('/sign-up' ,body("firstName").isString(), body("lastName").isString(),
                            body("email").isEmail(),body("password").isStrongPassword(),
                            userReigister)
                            
userRouter.post('/sign-in' ,body("email").isEmail(),body("password").isStrongPassword(),
                            userLogin)




export default userRouter ;