import { Router } from 'express';
import express from 'express';
import * as userController from '../controllers/user.controllers';
import * as adminController from '../controllers/admin.controllers';
import * as fileController from '../controllers/file.controllers';

const userPageRouter: Router = express.Router();

userPageRouter.get('/' , userController.indexPage);

userPageRouter.get('/login' , userController.userLoginPage);

userPageRouter.get('/register' , userController.userRegisterPage);

userPageRouter.get('/forget-password' , userController.forgetPasswordPage);

userPageRouter.get('/reset-password' , userController.resetPasswordPage);

userPageRouter.get('/dashboard' , userController.dashboardPage);

userPageRouter.get('/profile',userController.profilePage) ;

userPageRouter.get('/verify' , userController.verifyPage);

userPageRouter.get('/file/:id' , userController.filePage);


userPageRouter.get('/admin' , adminController.adminLoginPage );

userPageRouter.get('/admin/dashboard' , adminController.adminDashboard );

userPageRouter.get('/admin/upload' , fileController.uploadFilePage );
export default userPageRouter;

