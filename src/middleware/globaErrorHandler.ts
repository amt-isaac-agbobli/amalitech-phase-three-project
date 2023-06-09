import {Request , Response , NextFunction } from 'express' ;

//Handling Error
export const errorHandler = ( err : any ,req : Request , res : Response, next: NextFunction) =>{
   const status = err.status ? err.status : "Failed";
   const message = err.message ;
   const stack = err.stack ;

   const statusCode = err.statusCode ? err.statusCode : 500 ;

   res.status(statusCode).json({
      status,
      message,
      stack 
   }) ;

} ;

//Not Found Error
export const notFound = (req :Request , res: Response , next: NextFunction) => {
    const err = new Error(`You can't find ${req.originalUrl} on the server`) ;
    next(err) ;
}
