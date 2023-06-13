import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as userService from '../services/user.service';
import {sendVerificationEmail} from '../services/otp.service'
import { generateToken } from "../utils/helper";
import { CustomRequest } from '../interfaces/auth.interfaces';

/**
 * @desc Controller for User Registration
 * @access Public
 * @route POST /api/v1/users/sign-up 
 * */  
export const userReigister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newUser = await userService.userReigister(req.body);

        const otpDetails = {
            email:newUser.email,
            subject: "Email Verification",
            message: "Verify your email with the following code below.",
            duration: 1
        };
        
        await sendVerificationEmail(newUser.email , otpDetails);
        return res.status(201).json({
            Message : "Check your email to verified your account" ,
            newUser
        });
    } catch (error) {
        next(error)
    }
};
/**
 * @desc Controller for User Sign up 
 * @access Public
 * @route POST /api/v1/users/sign-up  
 * */  
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const user = await userService.userLogin(email, password);
        const token = await generateToken(user.id, user.email , user.role);
        return res.status(200).json({
            Token: token
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Controller for User Profile
 * @access Private
 * @route POST /api/v1/users/profile 
 * */  
export const userProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: any = (req as CustomRequest).token;
        const profile = await userService.userProfile(user.email);
        console.log(user.email);
        return res.status(200).json(profile);

    } catch (error) {
        next(error)
    }
}
