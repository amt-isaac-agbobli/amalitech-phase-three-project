import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { deleteOtp, resetPassword, sendOtp, sendVerificationEmail, verifyOtp, verifyUser } from '../services/otp.service';

export const sendOtpController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, subject, message, duration } = req.body;
        const otp = await sendOtp({ email, subject, message, duration });
        return res.status(200).json(otp);

    } catch (error) {
        next(error);
    }
};

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

export const verifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        res.status(200).json({ valid: validOtp })
    } catch (error) {
        next(error);
    }
};

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
        res.status(200).json(updatedPassword);
    } catch (error) {
        next(error)
    }

}