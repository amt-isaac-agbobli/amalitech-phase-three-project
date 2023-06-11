import { db } from "../config/db.server";
import { hashData, compareData } from "../utils/helper";
import { Admin, AdminRead } from "../types/admin.type";



export const registerAdmin = async (admin: Admin): Promise<AdminRead> => {
   const { email, password } = admin;
   const adminExist = await db.admin.findUnique({
      where: { email },
   });
   if (adminExist) throw new Error("Admin Already Exist");
   return await db.admin.create({
      data: {
         email,
         password: await hashData(password)
      },
      select: {
         id: true,
         email: true,
         createdAt: true,
         updatedAt: true
      }
   })
};

export const loginAdmin = async (password: string, email: string): Promise<AdminRead> => {

   const adminExist = await db.admin.findUnique({
      where: { email },
   });
   if (!adminExist) throw new Error("Admin Does Not Exist");
   const isMatch = await compareData(password, adminExist.password);
   if (!isMatch) throw new Error("Invalid Credentials");
   return adminExist;

}

export const getAdmins = async (): Promise<AdminRead[]> => {
   return await db.admin.findMany({
      select: {
         id: true,
         email: true,
         createdAt: true,
         updatedAt: true
      }
   })
};

export const getAdmin = async (id: number): Promise<AdminRead> => {
   const admin = await db.admin.findUnique({
      where: { id },
      select: {
         id: true,
         email: true,
         createdAt: true,
         updatedAt: true
      }
   });
   if (!admin) throw new Error("Admin Does Not Exist");
   return admin;
};

export const deleteAdmin = async (id: number): Promise<String> => {
   const admin = await db.admin.findUnique({
      where: { id },
      select: {
         id: true,
         email: true,
         createdAt: true,
         updatedAt: true
      }
   });
   if (!admin) throw new Error("Admin Does Not Exist");
   await db.admin.delete({
      where: { id }
   });
   return "Admin delete Succesfull";
}

