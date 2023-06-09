import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler, notFound } from '../middleware/globaErrorHandler';


const app: Application = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


//Error handling middleware
app.use(notFound);
app.use(errorHandler);


export default app;
