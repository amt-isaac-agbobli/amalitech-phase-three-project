
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

interface TokenPayload {
    userId: number;
    email: string;
    iat: number;
    exp: number;
}

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
