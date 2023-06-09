import { db } from "../config/db.server";
import { Admin ,AdminRead } from "../types/admin.type";


export const registerAdmin = async (admin:Admin) : Promise<Admin> => {
    const {email ,password} = admin 
    return await db.admin.create({
        data:{
           email,
           password
        },
     })
}
