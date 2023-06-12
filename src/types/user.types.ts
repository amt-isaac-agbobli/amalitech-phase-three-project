export type User = {
    email: string;
    password: string;
};

export type UserRead = {
    id: number;
    email: string;
    role : string ;
    createdAt: Date;
    updatedAt: Date;
    isVarified: boolean;
};