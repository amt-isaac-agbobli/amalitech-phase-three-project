import express from 'express';
import { Router } from 'express';
import { body } from 'express-validator';
import {sendOtpController ,requestOtpController , verifyEmailController} from '../controllers/otp.controllers'

const OtpRouter : Router = express.Router();


OtpRouter.post('/sendOtp',body("email").isEmail(),body("subject").isString(),
               body("message").isString(), sendOtpController);

OtpRouter.post("/requestOTP",body("email").isEmail() , requestOtpController)

OtpRouter.post('user/verify' , body("email").isEmail(), body("opt").isString(), verifyEmailController) ;



export default OtpRouter;