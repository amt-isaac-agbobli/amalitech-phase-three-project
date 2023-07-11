"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmin = exports.loginAdmin = exports.registerAdmin = void 0;
const db_server_1 = require("../config/db.server");
const helper_1 = require("../utils/helper");
const registerAdmin = async (admin) => {
    const { email, password } = admin;
    const adminExist = await db_server_1.db.admin.findUnique({
        where: { email },
    });
    if (adminExist)
        throw new Error("Admin Already Exist");
    return await db_server_1.db.admin.create({
        data: {
            email,
            password: await (0, helper_1.hashData)(password)
        },
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            role: true
        }
    });
};
exports.registerAdmin = registerAdmin;
const loginAdmin = async (password, email) => {
    const adminExist = await db_server_1.db.admin.findUnique({
        where: { email },
    });
    console.log(email);
    if (!adminExist)
        throw new Error("Admin Does Not Exist");
    const isMatch = await (0, helper_1.compareData)(password, adminExist.password);
    if (!isMatch)
        throw new Error("Invalid Credentials");
    return adminExist;
};
exports.loginAdmin = loginAdmin;
const getAdmin = async (id) => {
    const admin = await db_server_1.db.admin.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            role: true
        }
    });
    if (!admin)
        throw new Error("Admin Does Not Exist");
    return admin;
};
exports.getAdmin = getAdmin;
