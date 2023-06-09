import {Request,Response,NextFunction} from 'express' ;
import * as AdminService from '../services/admin.service' ;
import {validationResult} from 'express-validator' ;
import exp from 'constants';

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

export const loginAdmin = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const errors = validationResult(req) ;
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()}) ;
        }
        const token = await AdminService.loginAdmin(req.body) ;
        return res.status(200).json({token}) ;
    } catch (error) {
        next(error) ;
    }
};

export const getAdmins = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const admins = await AdminService.getAdmins() ;
        return res.status(200).json({admins}) ;
    } catch (error) {
        next(error) ;
    }
} ;

export const getAdmin = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const admin = await AdminService.getAdmin(Number(req.params.id)) ;
        return res.status(200).json({admin}) ;
    } catch (error) {
        next(error) ;
    }
};