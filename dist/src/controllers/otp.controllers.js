"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.forgetPasswordOtpController = exports.verifyEmailController = exports.requestOtpController = void 0;
const express_validator_1 = require("express-validator");
const otp_service_1 = require("../services/otp.service");
const helper_1 = require("../utils/helper");
const user_service_1 = require("../services/user.service");
/**
 * @desc Controller for requsting of OTP
 * @access Public
 * @route POST /api/v1/users/request-otp
 * */
const requestOtpController = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
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
        const createdEmailVerification = await (0, otp_service_1.sendVerificationEmail)(email, otpDetails);
        res.status(200).json(createdEmailVerification);
    }
    catch (error) {
        next(error);
    }
};
exports.requestOtpController = requestOtpController;
/**
 * @desc Controller for Email Verification
 * @access Public
 * @route POST /api/v1/users/verify
 * */
const verifyEmailController = async (req, res, next) => {
    try {
        console.log(req.body);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, otp } = req.body;
        const validOtp = await (0, otp_service_1.verifyOtp)({ email, otp });
        if (validOtp) {
            await (0, otp_service_1.verifyUser)(email);
            await (0, otp_service_1.deleteOtp)(email);
        }
        const mailOption = {
            from: "File Server App",
            to: email,
            subject: "Email Comfirmation",
            html: `<h1> Your email has been verified </h1> <br> <p> You can now login to your account </p>`
        };
        await (0, otp_service_1.sendComfirmationEmail)(email, mailOption);
        const user = await (0, user_service_1.getUserByEmail)(email);
        if (!user) {
            return res.status(404).json({ Error: "User not found" });
        }
        const token = await (0, helper_1.generateToken)(user.id, user.email, user.role);
        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        res.status(200).json({
            valid: validOtp,
            Tokee: token
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyEmailController = verifyEmailController;
/**
 * @desc Controller for forget password
 * @access Public
 * @route POST /api/v1/users/forget-password
 * */
const forgetPasswordOtpController = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
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
        const forgetPasswordEmail = await (0, otp_service_1.sendVerificationEmail)(email, otpDetails);
        res.status(200).json(forgetPasswordEmail);
    }
    catch (error) {
        next(error);
    }
};
exports.forgetPasswordOtpController = forgetPasswordOtpController;
/**
 * @desc Controller for password reset
 * @access Public
 * @route POST /api/v1/users/reset-password
 * */
const resetPasswordController = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ Error: errors.array() });
        }
        const { email, otp, password } = req.body;
        const validOtp = await (0, otp_service_1.verifyOtp)({ email, otp });
        if (!validOtp) {
            throw Error("Invalid OTP or emaill");
        }
        const updatedPassword = await (0, otp_service_1.resetPassword)({ email, password });
        await (0, otp_service_1.deleteOtp)(email);
        const mailOption = {
            from: "File Server App",
            to: email,
            subject: "Reset Password",
            html: `<h1> Your password has been reset </h1> <br> <p> You can now login to your account </p>`
        };
        await (0, otp_service_1.sendComfirmationEmail)(email, mailOption);
        res.status(200).json(updatedPassword);
    }
    catch (error) {
        next(error);
    }
};
exports.resetPasswordController = resetPasswordController;
