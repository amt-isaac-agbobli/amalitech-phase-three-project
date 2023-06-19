import express, { Application,Request ,Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler, notFound } from '../middleware/globaErrorHandler';
import adminRouter from '../routes/admin.route';
import userRouter from '../routes/user.route';
import fileRouter from '../routes/file.route';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger/swagger';
import swaggerJSDoc from "swagger-jsdoc";
import * as swaggerDoc from '../swagger/swaggerDoc.json'


const app: Application = express();

const corsOption = {
   allowedHeaders:['Content-Type' , 'Authorization']
}
/*
app.use((req:Request,res:Response,next:NextFunction) =>{
    res.header("Access-Control-Allow-origin", "*");
    res.header("Access-control-allow-headers", "*") ;
    console.log(req.headers);
    if(req.method === "OPTION"){
        res.header("Access-control-allow-methods", "*");
        return res.status(200).json({}) ;
    }
    next();
}) */

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api/v1/admins/', adminRouter);
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/files/', fileRouter);


app.use( "/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Error handling middleware
app.use(notFound);
app.use(errorHandler);


export default app;
