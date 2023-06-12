
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import {TokenPayload} from '../interfaces/verification.interface'
import { getAdmin } from '../services/admin.service';
import * as dotenv from 'dotenv';
import { error } from 'console';
dotenv.config();

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const isLogin = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export const isAdmin =async (req: Request, res: Response, next: NextFunction) => {
   try {
    const admin: any = (req as CustomRequest).token;
    
    if(admin.role !== 'ADMIN'){
        return res.status(401).json({ message: 'You are not admin to upload file' });
    }
    next();
    
    
   } catch (error) {
     throw error
   }
}
