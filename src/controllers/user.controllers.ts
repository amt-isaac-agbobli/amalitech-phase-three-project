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
        const { email, password } = req.body;
        if(!password){
            return res.status(400).json({
                message : "Password is required"
            });
        }  
        if(!email){
            return res.status(400).json({
                message : "Email is required"
            });
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
            Message : "User account was created successful check your email to verify your account"
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
        if(!password){
            return res.status(400).json({
                message: "Password is required"});
        }
        if(!email){
            return res.status(400).json({
                message: "Email is required"});
        }
        
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

/**
 * @desc Controller for User Login Page
 * @access Public
 * @route GET /login
 * */
export const userLoginPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('login');
    } catch (error) {
        next(error)
    }
}

/**
 * 
 * @desc Controller for User Registration Page
 * @access Public
 * @route GET /register
 * */
export const userRegisterPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('register');
    } catch (error) {
        next(error)
    }
}

/**
 * @desc Controller for Forget Password Page
 * @access Public
 * @route GET /forget-password
 * 
 * */
export const forgetPasswordPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('forget-password');
    } catch (error) {
        next(error)
    }
}

/** 
 * @desc Controller for dashboard Page
 * @access Private
 * @route GET /dashboard
 * 
 */
export const dashboardPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('dashboard');
    } catch (error) {
        next(error)
    }
}
