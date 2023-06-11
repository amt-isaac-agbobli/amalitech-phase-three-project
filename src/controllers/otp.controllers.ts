import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendOtp, sendVerificationEmail, verifyOtp } from '../services/otp.service';

export const sendOtpController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email ,subject ,message , duration } = req.body;
        const otp = await sendOtp({ email ,subject ,message , duration });
        return res.status(200).json(otp);
     
    } catch (error) {
        next(error);
    }
};

export const requestOtpController = async (req:Request ,res:Response , next:NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email} = req.body ;
        const createdEmailVerification = await sendVerificationEmail(email);
        res.status(200).json(createdEmailVerification) ;
    } catch (error) {
        next(error)
    }
};

export const verifyEmailController = async (req:Request , res:Response , next:NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
       const {email , otp } = req.body ;
       const validOtp = await verifyOtp({email , otp}) ;
       res.status(200).json({
           valid : validOtp
       })
       
    } catch (error) {
       next(error) ;
    }
}