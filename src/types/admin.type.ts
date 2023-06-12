type Admin = {
    email : string ;
    password : string
} ;

type AdminRead = {
    id : number ;
    email : string ;
    createdAt : Date ;
    updatedAt : Date
    role : String ;
}


export {Admin , AdminRead}
