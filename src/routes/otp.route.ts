import express from 'express';
import { Request, Response, NextFunction } from "express";
import { sendOtp, sendVerificationEmail, verifyOtp } from '../services/otp.service';

const OtpRouter = express.Router();


OtpRouter.post('/sendOtp', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email ,subject ,message , duration } = req.body;
        const otp = await sendOtp({ email ,subject ,message , duration });
        return res.status(200).json(otp);
     
    } catch (error) {
        next(error);
    }
});

OtpRouter.post("/requestOTP", async (req:Request ,res:Response , next:NextFunction) => {
    try {
        const {email} = req.body ;
        const createdEmailVerification = await sendVerificationEmail(email);
        res.status(200).json(createdEmailVerification) ;
    } catch (error) {
        next(error)
    }
})

OtpRouter.post('/verify' , async (req:Request , res:Response , next:NextFunction) => {
     try {
        const {email , otp } = req.body ;
        const validOtp = await verifyOtp({email , otp}) ;
        res.status(200).json({
            valid : validOtp
        })
        
     } catch (error) {
        next(error) ;
     }
}) ;



export default OtpRouter;