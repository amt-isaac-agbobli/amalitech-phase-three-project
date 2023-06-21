import {Request,Response,NextFunction} from 'express' ;
import * as AdminService from '../services/admin.service' ;
import {validationResult} from 'express-validator' ;
import { CustomRequest } from '../middleware/authorization';
import { generateToken } from '../utils/helper';

/**
 * @desc Controller for Admin Registration
 * @access Public
 * @route POST /api/v1/admins/sign-up 
 * */ 
export const registerAdmin = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const errors = validationResult(req) ;
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()}) ;
        }
        const admin = await AdminService.registerAdmin(req.body) ;
        return res.status(201).json({admin}) ;
    } catch (error) {
        next(error) ;
    }
} ;
/**
 * @desc Controller for Admin Sign in
 * @access Public
 * @route POST /api/v1/admins/sign-in
 * */ 
export const loginAdmin = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const errors = validationResult(req) ;
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()}) ;
        }
        const {email , password} = req.body ;
        const admin = await AdminService.loginAdmin(password,email) ;
        const token = await generateToken(admin.id , admin.email ,admin.role.toString())
        return res.status(200).json({
            Token : token
        }) ;
    } catch (error) {
        next(error) ;
    }
};


export const getAdmin = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const admin = await AdminService.getAdmin(Number(req.params.id)) ;    
        return res.status(200).json({admin}) ;
    } catch (error) {
        next(error) ;
    }
};

