"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.userProfile = exports.userLogin = exports.checkVerification = exports.userReigister = exports.userExit = void 0;
const db_server_1 = require("../config/db.server");
const helper_1 = require("../utils/helper");
const userExit = async (email) => {
    const user = await db_server_1.db.user.findUnique({
        where: { email }
    });
    if (user) {
        return true;
    }
    return false;
};
exports.userExit = userExit;
const userReigister = async (user) => {
    const { email, password } = user;
    return await db_server_1.db.user.create({
        data: {
            email,
            password: await (0, helper_1.hashData)(password)
        },
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            isVarified: true
        }
    });
};
exports.userReigister = userReigister;
const checkVerification = async (email) => {
    const user = await db_server_1.db.user.findUnique({
        where: { email }
    });
    if (!(user === null || user === void 0 ? void 0 : user.isVarified)) {
        return false;
    }
    return true;
};
exports.checkVerification = checkVerification;
const userLogin = async (email, password) => {
    const user = await db_server_1.db.user.findUnique({
        where: { email }
    });
    return user;
};
exports.userLogin = userLogin;
const userProfile = async (email) => {
    const profile = await db_server_1.db.user.findUnique({
        where: {
            email
        },
        select: {
            email: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            isVarified: true
        }
    });
    if (!profile) {
        throw new Error("Profile Not Found");
    }
    return profile;
};
exports.userProfile = userProfile;
const getUserByEmail = async (email) => {
    const user = await db_server_1.db.user.findUnique({
        where: {
            email
        },
        select: {
            email: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            isVarified: true
        }
    });
    if (!user) {
        throw new Error("User Not Found");
    }
    return user;
};
exports.getUserByEmail = getUserByEmail;
