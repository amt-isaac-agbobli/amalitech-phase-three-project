import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { deleteOtp, resetPassword, sendVerificationEmail,sendComfirmationEmail, 
         verifyOtp, verifyUser } from '../services/otp.service';
import { generateToken } from "../utils/helper";
import { getUserByEmail } from '../services/user.service';

/**
 * @desc Controller for requsting of OTP
 * @access Public
 * @route POST /api/v1/users/request-otp  
 * */        
export const requestOtpController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email } = req.body;

        const otpDetails = {
            email,
            subject: "Email Verification",
            message: "Verify your email with the following code below.",
            duration: 1
        };
        const createdEmailVerification = await sendVerificationEmail(email, otpDetails);
        res.status(200).json(createdEmailVerification);
    } catch (error) {
        next(error)
    }
};

/**
 * @desc Controller for Email Verification
 * @access Public
 * @route POST /api/v1/users/verify  
 * */  
export const verifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, otp } = req.body;

        const validOtp = await verifyOtp({ email, otp });
        if (validOtp) {
            await verifyUser(email);
            await deleteOtp(email);
        }
        const mailOption = {
            from : "File Server App",
            to : email,
            subject : "Email Comfirmation",
            html: `<h1> Your email has been verified </h1> <br> <p> You can now login to your account </p>`
        } ;
        await sendComfirmationEmail(email, mailOption);
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ Error: "User not found" });
        }
        const token = await generateToken(user.id, user.email , user.role);
        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
        res.redirect('dashboard');
        res.status(200).json({ valid: validOtp })
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Controller for forget password
 * @access Public
 * @route POST /api/v1/users/forget-password 
 * */  
export const forgetPasswordOtpController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            res.status(400).json({ Error: errors.array() });
        }
        const { email } = req.body;
        const otpDetails = {
            email,
            subject: "Forget Password OTP code",
            message: "Use the following code below to reset your password.",
            duration: 1
        };
        const forgetPasswordEmail = await sendVerificationEmail(email, otpDetails);
        res.status(200).json(forgetPasswordEmail);

    } catch (error) {
        next(error)
    }
};

/**
 * @desc Controller for password reset
 * @access Public
 * @route POST /api/v1/users/reset-password  
 * */  
export const resetPasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ Error: errors.array() });
        }
        const { email, otp, password } = req.body;
        const validOtp = await verifyOtp({ email, otp })
        if (!validOtp) {
            throw Error("Invalid OTP or emaill");
        }
        const updatedPassword = await resetPassword({ email, password })
        await deleteOtp(email) ;

        const mailOption = {
            from : "File Server App",
            to : email,
            subject : "Reset Password",
            html: `<h1> Your password has been reset </h1> <br> <p> You can now login to your account </p>`
        } ;
        await sendComfirmationEmail(email, mailOption);

        res.status(200).json(updatedPassword);
    } catch (error) {
        next(error)
    }
};