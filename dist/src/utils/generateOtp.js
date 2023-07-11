"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
const generateOtp = async () => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000);
        return otp;
    }
    catch (error) {
        throw error;
    }
};
exports.generateOtp = generateOtp;
