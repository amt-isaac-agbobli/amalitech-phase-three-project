import bcrypt from 'bcryptjs' ;
import jwt from 'jsonwebtoken' ;
import * as dotenv from 'dotenv' ;
dotenv.config() ;


export const hashData = async (password: string) :Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const compareData = async (password: string, hashPassword: string) :Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
};

export const generateToken = async (id: number , email :string) :Promise<string> => {
    return await jwt.sign({ id , email }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

export const verifyToken = async (token: string) :Promise<string | object> => {
    return await jwt.verify(token, process.env.JWT_SECRET!);
} ;