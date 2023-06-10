import { db } from '../config/db.server';
import { generateOtp } from '../utils/generateOtp';
import { sendEmail } from '../utils/send.email';
import { hashPassword } from '../utils/helper';
import { Otp, OtpOption } from '../types/otp.type'
import * as dotenv from 'dotenv';
dotenv.config();



export const deleteUser = async (email: string) => {
    try {
        const emailExit = await db.otp.findUnique({ where: { email } });
        if (emailExit) {
            await db.otp.delete({
                where: { email }
            }) ;
        }
    } catch (error) {
        throw error ;
    }
};

const registerOtp = async (otpBody: Otp, duration: number) => {
    try {
        const { email, otpHash } = otpBody;
        await db.otp.create({
            data: {
                email,
                otp: otpHash,
                expiredAt: new Date(Date.now() + 360000 * + duration)
            }
        });
    } catch (error) {
        throw error
    }
}


export const sendOtp = async (body: OtpOption) => {
    try {
        const { email, subject, message, duration = 1 } = body;
        if (!email && !subject && !message) {
            throw new Error("Please provide all the details")
        }

        const otp = await generateOtp();
        const otpHash = await hashPassword(otp.toString());

        const mailOption = {
            from: process.env.EMAIL,
            to: email,
            subject,
            html: `<p> ${message} </p> <p style="color:tomato; font-size:25px"><b>${otp}</b></p> <p> This otp is valid for ${duration} minutes </p>`
        };

        await sendEmail(mailOption);
        await deleteUser(email);
        await registerOtp({ email, otpHash }, duration)
        return { message: "Otp sent successfully" };
    } catch (error) {
        throw error;
    }
};