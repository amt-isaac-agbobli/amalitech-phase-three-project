import { Router } from "express";
import express from "express";
import * as userController from '../controllers/user.controllers';
import * as otpController from '../controllers/otp.controllers'
import { body } from 'express-validator';
import { isLogin } from "../middleware/verification";

const userRouter: Router = express.Router();

userRouter.post('/sign-up', body("firstName").isString(), body("lastName").isString(),
    body("email").isEmail(), body("password").isStrongPassword(),
    userController.userReigister)

userRouter.post('/sign-in', body("email").isEmail(), body("password").isStrongPassword(),
    userController.userLogin)

userRouter.get('/profile', isLogin, userController.userProfile);

//OTP Route
userRouter.post("/request-otp", body("email").isEmail(), otpController.requestOtpController);

userRouter.post('/verify', body("email").isEmail(), body("opt"), otpController.verifyEmailController);

userRouter.post('/forget-password', body("email").isEmail(), otpController.forgetPasswordOtpController);

userRouter.post('/reset-password', body("email").isEmail(), body("opt"),
    body("password").isStrongPassword(), otpController.resetPasswordController);


export default userRouter;