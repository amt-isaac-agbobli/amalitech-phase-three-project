import express , {Request ,Response , Application} from 'express';
import cors from 'cors' ;


const app : Application = express();
app.use(cors());
app.use(express.json()) ;

app.get('/', (req : Request ,res: Response) =>{
    res.status(200).json({
        Status : "Success",
        message : "Development Server"
    });
    console.log("I'm Working") ;
});


export default  app ;
