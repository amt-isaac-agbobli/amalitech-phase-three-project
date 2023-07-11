"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilePage = exports.filePage = exports.resetPasswordPage = exports.verifyPage = exports.indexPage = exports.dashboardPage = exports.forgetPasswordPage = exports.userRegisterPage = exports.userLoginPage = exports.userProfile = exports.userLogin = exports.userReigister = void 0;
const express_validator_1 = require("express-validator");
const userService = __importStar(require("../services/user.service"));
const otp_service_1 = require("../services/otp.service");
const helper_1 = require("../utils/helper");
/**
 * @desc Controller for User Registration
 * @access Public
 * @route POST /api/v1/users/sign-up
 * */
const userReigister = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            });
        }
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }
        const userExit = await userService.userExit(email);
        if (userExit) {
            res.status(400).json({
                message: "Email already exist"
            });
        }
        const newUser = await userService.userReigister(req.body);
        const otpDetails = {
            email: newUser.email,
            subject: "Email Verification",
            message: "Verify your email with the following code below.",
            duration: 1
        };
        await (0, otp_service_1.sendVerificationEmail)(newUser.email, otpDetails);
        return res.status(201).json({
            Message: "User account was created successful check your email to verify your account"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.userReigister = userReigister;
/**
 * @desc Controller for User Sign in
 * @access Public
 * @route POST /api/v1/users/sign-in
 * */
const userLogin = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            });
        }
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }
        const user = await userService.userLogin(email, password);
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        const passwordMatch = await (0, helper_1.compareData)(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }
        if (!user.isVarified) {
            // res.render('verify' , {email: user.email}) ;
        }
        const token = await (0, helper_1.generateToken)(user.id, user.email, user.role);
        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        return res.status(200).json({
            Token: token
        });
    }
    catch (error) {
        next(error);
    }
};
exports.userLogin = userLogin;
/**
 * @desc Controller for User Profile
 * @access Private
 * @route POST /api/v1/users/profile
 * */
const userProfile = async (req, res, next) => {
    try {
        const user = req.token;
        const profile = await userService.userProfile(user.email);
        console.log(user.email);
        return res.status(200).json(profile);
    }
    catch (error) {
        next(error);
    }
};
exports.userProfile = userProfile;
/**
 * @desc Controller for User Login Page
 * @access Public
 * @route GET /login
 * */
const userLoginPage = async (req, res, next) => {
    try {
        res.render('login');
    }
    catch (error) {
        next(error);
    }
};
exports.userLoginPage = userLoginPage;
/**
 *
 * @desc Controller for User Registration Page
 * @access Public
 * @route GET /register
 * */
const userRegisterPage = async (req, res, next) => {
    try {
        res.render('register');
    }
    catch (error) {
        next(error);
    }
};
exports.userRegisterPage = userRegisterPage;
/**
 * @desc Controller for Forget Password Page
 * @access Public
 * @route GET /forget-password
 *
 * */
const forgetPasswordPage = async (req, res, next) => {
    try {
        res.render('forget-password');
    }
    catch (error) {
        next(error);
    }
};
exports.forgetPasswordPage = forgetPasswordPage;
/**
 * @desc Controller for dashboard Page
 * @access Private
 * @route GET /dashboard
 *
 */
const dashboardPage = async (req, res, next) => {
    try {
        res.render('dashboard');
    }
    catch (error) {
        next(error);
    }
};
exports.dashboardPage = dashboardPage;
const indexPage = async (req, res, next) => {
    try {
        res.redirect('/dashboard');
    }
    catch (error) {
        next(error);
    }
};
exports.indexPage = indexPage;
const verifyPage = async (req, res, next) => {
    try {
        res.render('verify');
    }
    catch (error) {
        next(error);
    }
};
exports.verifyPage = verifyPage;
const resetPasswordPage = async (req, res, next) => {
    try {
        res.render('reset-password');
    }
    catch (error) {
        next(error);
    }
};
exports.resetPasswordPage = resetPasswordPage;
const filePage = async (req, res, next) => {
    try {
        res.render('file');
    }
    catch (error) {
        next(error);
    }
};
exports.filePage = filePage;
const profilePage = async (req, res, next) => {
    try {
        res.render('profile');
    }
    catch (error) {
        next(error);
    }
};
exports.profilePage = profilePage;
