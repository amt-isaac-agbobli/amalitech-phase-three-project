import { Router } from 'express';
import express from 'express';
import * as userController from '../controllers/user.controllers';

const userPageRouter: Router = express.Router();

userPageRouter.get('/login' , userController.userLoginPage);

userPageRouter.get('/register' , userController.userRegisterPage);

userPageRouter.get('/forget-password' , userController.forgetPasswordPage);

userPageRouter.get('/dashboard' , userController.dashboardPage);

userPageRouter.get('/verify' , userController.verifyPage);

userPageRouter.get('/file/:id' , userController.filePage);
export default userPageRouter;