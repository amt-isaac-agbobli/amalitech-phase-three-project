import bcrypt from 'bcryptjs' ;
import jwt from 'jsonwebtoken' ;
import * as dotenv from 'dotenv' ;
dotenv.config() ;


export const hashData = async (data: string) :Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
};

export const compareData = async (data: string, hashedData: string) :Promise<boolean> => {
    return await bcrypt.compare(data, hashedData);
};

export const generateToken = async (id: number , email :string ,role:string) :Promise<string> => {
    return await jwt.sign({ id , email,role }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

export const verifyToken = async (token: string) :Promise<string | object> => {
    return await jwt.verify(token, process.env.JWT_SECRET!);
} ;