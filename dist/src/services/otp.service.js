"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyOtp = exports.sendComfirmationEmail = exports.sendVerificationEmail = exports.sendOtp = exports.verifyUser = exports.deleteOtp = void 0;
const db_server_1 = require("../config/db.server");
const generateOtp_1 = require("../utils/generateOtp");
const send_email_1 = require("../utils/send.email");
const helper_1 = require("../utils/helper");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const deleteOtp = async (email) => {
    try {
        const emailExit = await db_server_1.db.otp.findUnique({ where: { email } });
        if (emailExit) {
            await db_server_1.db.otp.delete({
                where: { email }
            });
        }
    }
    catch (error) {
        throw error;
    }
};
exports.deleteOtp = deleteOtp;
const registerOtp = async (otpBody) => {
    try {
        const { email, otpHash } = otpBody;
        await db_server_1.db.otp.create({
            data: {
                email,
                otp: otpHash,
                expiredAt: new Date(Date.now() + 60 * 60000)
            }
        });
    }
    catch (error) {
        throw error;
    }
};
const verifyUser = async (email) => {
    return await db_server_1.db.user.update({
        where: {
            email
        },
        data: {
            isVarified: true
        }
    });
};
exports.verifyUser = verifyUser;
const sendOtp = async (body) => {
    try {
        const { email, subject, message, duration = 1 } = body;
        if (!email && !subject && !message) {
            throw new Error("Please provide all the details");
        }
        const otp = await (0, generateOtp_1.generateOtp)();
        const otpHash = await (0, helper_1.hashData)(otp.toString());
        const mailOption = {
            from: "File Server",
            to: email,
            subject,
            html: `<p> ${message} </p> <p style="color:tomato; font-size:25px"><b>${otp}</b></p> <p> This otp is valid for ${duration} hour </p>`
        };
        await (0, send_email_1.sendEmail)(mailOption);
        await (0, exports.deleteOtp)(email);
        await registerOtp({ email, otpHash });
        return { message: "Otp sent successfully" };
    }
    catch (error) {
        throw error;
    }
};
exports.sendOtp = sendOtp;
const sendVerificationEmail = async (email, otpDetails) => {
    try {
        const userExit = await db_server_1.db.user.findUnique({ where: { email } });
        if (!userExit) {
            throw Error("There's no account for provide email. ");
        }
        const createdOtp = await (0, exports.sendOtp)(otpDetails);
        return createdOtp;
    }
    catch (error) {
        throw error;
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
const sendComfirmationEmail = async (email, mailOption) => {
    try {
        const userExit = await db_server_1.db.user.findUnique({ where: { email } });
        if (!userExit) {
            throw Error("There's no account for provide email. ");
        }
        const message = (0, send_email_1.sendEmail)(mailOption);
        return message;
    }
    catch (error) {
        throw error;
    }
};
exports.sendComfirmationEmail = sendComfirmationEmail;
const verifyOtp = async (otpVerifiedOption) => {
    try {
        const { email, otp } = otpVerifiedOption;
        if (!(email && otp)) {
            throw Error("Provide values for email and Otp");
        }
        const matchedOTPRecord = await db_server_1.db.otp.findUnique({ where: { email } });
        if (!matchedOTPRecord) {
            throw Error("No OTP Records Found");
        }
        const { expiredAt } = matchedOTPRecord;
        const expiredDate = Number(expiredAt);
        if (expiredDate < Date.now()) {
            // await deleteOtp(email) ;
            throw Error("Code has expired. Request for new One");
        }
        const hashedOtp = matchedOTPRecord.otp;
        const validOtp = await (0, helper_1.compareData)(otp, hashedOtp);
        return validOtp;
    }
    catch (error) {
        throw error;
    }
};
exports.verifyOtp = verifyOtp;
const resetPassword = async (resetPasswordOption) => {
    try {
        const { email, password } = resetPasswordOption;
        return await db_server_1.db.user.update({
            where: { email },
            data: {
                password: await (0, helper_1.hashData)(password)
            }
        });
    }
    catch (error) {
        throw error;
    }
};
exports.resetPassword = resetPassword;
