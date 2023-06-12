import express from 'express';
import { Router } from 'express';
import { body } from 'express-validator';
import {
    sendOtpController, requestOtpController,
    verifyEmailController, forgetPasswordOtpController,
    resetPasswordController
} from '../controllers/otp.controllers'

const OtpRouter: Router = express.Router();


OtpRouter.post('/send-otp', body("email").isEmail(), body("subject").isString(),
          body("message").isString(), sendOtpController);

OtpRouter.post("/request-otp", body("email").isEmail(), requestOtpController) ;

OtpRouter.post('user/verify', body("email").isEmail(), body("opt"), verifyEmailController);

OtpRouter.post('/user/forget-password', body("email").isEmail(), forgetPasswordOtpController);

OtpRouter.post('/user/reset-password', body("email").isEmail(), body("opt"),
    body("password").isStrongPassword(), resetPasswordController) ;



export default OtpRouter;