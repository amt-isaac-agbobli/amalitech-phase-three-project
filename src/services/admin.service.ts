import { db } from "../config/db.server";
import * as helper from "../utils/helper";
import { Admin, AdminRead } from "../types/admin.type";


export const registerAdmin = async (admin: Admin): Promise<Admin> => {
   const { email, password } = admin;
   const adminExist = await db.admin.findUnique({
      where: { email },
   });
   if (adminExist) throw new Error("Admin Already Exist");
   return await db.admin.create({
      data: {
         email,
         password: await helper.hashPassword(password)
      },
   })
}
