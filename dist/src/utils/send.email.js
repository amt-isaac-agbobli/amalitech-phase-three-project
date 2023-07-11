"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_transporter_1 = require("../config/nodemailer.transporter");
const sendEmail = async (mailOption) => {
    try {
        return await nodemailer_transporter_1.transporter.sendMail(mailOption);
    }
    catch (error) {
        throw error;
    }
};
exports.sendEmail = sendEmail;
