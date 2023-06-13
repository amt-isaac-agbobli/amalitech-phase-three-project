import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler, notFound } from '../middleware/globaErrorHandler';
import adminRouter from '../routes/admin.route';
import userRouter from '../routes/user.route';
import fileRouter from '../routes/file.route';


const app: Application = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes
app.use('/api/v1/admins/' , adminRouter) ;
app.use('/api/v1/users/' , userRouter) ;
app.use('/api/v1/files/' , fileRouter) ;

//Error handling middleware
app.use(notFound);
app.use(errorHandler);


export default app;
