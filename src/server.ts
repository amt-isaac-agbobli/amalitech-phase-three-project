import app from '../src/app/app'
import http from 'http';
import * as  dotenv from 'dotenv';
dotenv.config() ;

if(!process.env.PORT){
    process.exit(1);
}

const PORT : number = parseInt(process.env.PORT , 10)

const server = http.createServer(app);

server.listen(PORT , ()=> console.log(`Server is Running on ${PORT}`)) ;



