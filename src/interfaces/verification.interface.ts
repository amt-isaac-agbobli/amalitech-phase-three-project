import  { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface TokenPayload {
    userId: number;
    email: string;
    iat: number;
    exp: number;
} ;

export interface CustomRequest extends Request {
    token: string | JwtPayload;
} ;