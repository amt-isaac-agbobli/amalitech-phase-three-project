export type User = {
    firstName : string ;
    lastName : string ;
    email: string;
    password: string;
};

export type UserRead = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role : string ;
    createdAt: Date;
    updatedAt: Date;
};