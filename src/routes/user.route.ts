import { Router } from "express";
import express from "express";
import * as userController from '../controllers/user.controllers';
import * as otpController from '../controllers/otp.controllers'
import { body } from 'express-validator';
import { isLogin } from "../middleware/authorization";

const userRouter: Router = express.Router();

/**
 * 
 *
 * /users/sign-up:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email and password
 *     requestBody:
 *       description: User object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '201':
 *         description: Successfully registered a new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 */
userRouter.post('/sign-up', body("email").isEmail(), body("password").isStrongPassword(),
    userController.userReigister);

/**
 * 
 *
 * /users/sign-in:
 *   post:
 *     summary: Login as a user
 *     description: Login as a user with email and password
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 */   
userRouter.post('/sign-in', body("email").isEmail(), body("password").isStrongPassword(),
    userController.userLogin)

userRouter.get('/profile', isLogin, userController.userProfile);


userRouter.post("/request-otp", body("email").isEmail(), otpController.requestOtpController);

userRouter.post('/verify', body("email").isEmail(), body("opt"), otpController.verifyEmailController);

userRouter.post('/forget-password', body("email").isEmail(), otpController.forgetPasswordOtpController);

userRouter.post('/reset-password', body("email").isEmail(), body("opt"),
    body("password").isStrongPassword(), otpController.resetPasswordController);
   


export default userRouter;