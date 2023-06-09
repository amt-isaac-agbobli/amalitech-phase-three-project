import express , {Request ,Response , Application} from 'express';
import cors from 'cors' ;


const app : Application = express();
app.use(cors());



export default  app ;
