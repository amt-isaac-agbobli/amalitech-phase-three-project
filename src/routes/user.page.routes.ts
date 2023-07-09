import { Router } from 'express';
import express from 'express';
import * as userController from '../controllers/user.controllers';

const userPageRouter: Router = express.Router();

userPageRouter.get('/login' , userController.userLoginPage);

userPageRouter.get('/register' , userController.userRegisterPage);

userPageRouter.get('/forget-password' , userController.forgetPasswordPage);

export default userPageRouter;