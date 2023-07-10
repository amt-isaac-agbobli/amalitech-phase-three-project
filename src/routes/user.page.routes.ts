import { Router } from 'express';
import express from 'express';
import * as userController from '../controllers/user.controllers';
import * as adminController from '../controllers/admin.controllers';

const userPageRouter: Router = express.Router();

userPageRouter.get('/login' , userController.userLoginPage);

userPageRouter.get('/register' , userController.userRegisterPage);

userPageRouter.get('/forget-password' , userController.forgetPasswordPage);

userPageRouter.get('/dashboard' , userController.dashboardPage);

userPageRouter.get('/verify' , userController.verifyPage);

userPageRouter.get('/file/:id' , userController.filePage);


userPageRouter.get('/admin' , adminController.adminLoginPage );

userPageRouter.get('/admin/dashboard' , adminController.adminDashboard );
export default userPageRouter;

