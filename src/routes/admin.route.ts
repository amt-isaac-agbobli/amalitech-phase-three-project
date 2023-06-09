import { Router } from "express";
import express  from 'express';

const adminRouter : Router = express.Router();


adminRouter.get('/', async(req ,res)=>{
    res.status(200).json({
        Status : "Success",
        Message : "Admin Router is working Perfect"
    }) ;
})





export default adminRouter ;