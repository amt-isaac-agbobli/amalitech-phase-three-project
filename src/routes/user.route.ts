import { Router } from "express";
import express  from "express";
import * as userController from '../controllers/user.controllers' ;
import {body} from 'express-validator' ;
import { isLogin } from "../middleware/verification";

const userRouter : Router = express.Router() ;

userRouter.post('/sign-up' ,body("firstName").isString(), body("lastName").isString(),
                            body("email").isEmail(),body("password").isStrongPassword(),
                            userController. userReigister)

userRouter.post('/sign-in' ,body("email").isEmail(),body("password").isStrongPassword(),
                            userController.userLogin)

userRouter.get('/profile' ,isLogin ,userController.userProfile );




export default userRouter ;