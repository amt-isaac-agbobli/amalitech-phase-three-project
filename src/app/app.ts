import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler, notFound } from '../middleware/globaErrorHandler';
import adminRouter from '../routes/admin.route';
import userRouter from '../routes/user.route';
import fileRouter from '../routes/file.route';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import * as swaggerDoc from '../swagger/swaggerDoc.json'


const app: Application = express();

//View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

//Routes
app.use('/api/v1/admins/', adminRouter);
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/files/', fileRouter);


app.use( "/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Error handling middleware
app.use(notFound);
app.use(errorHandler);


export default app;
