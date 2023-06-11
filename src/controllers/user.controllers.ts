import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as userService from '../services/user.service';
import { generateToken } from "../utils/helper";
import { CustomRequest } from '../interfaces/verification.interface';

export const userReigister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newUser = await userService.userReigister(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        next(error)
    }

};

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const user = await userService.userLogin(email, password);
        const token = await generateToken(user.id, user.email);
        return res.status(200).json({
            Token: token
        });
    } catch (error) {
        next(error);
    }

};

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
