import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as userService from '../services/user.service';

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

} ;