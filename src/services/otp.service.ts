import { db } from '../config/db.server';
import { generateOtp } from '../utils/generateOtp';
import { sendEmail } from '../utils/send.email';
import { compareData, hashData } from '../utils/helper';
import { Otp, OtpOption, OtpVarifiedOption, ResetPasswordOption } from '../types/otp.type'
import * as dotenv from 'dotenv';
import { mailOption } from '../types/mailOption.type';
dotenv.config();

export const deleteOtp = async (email: string) => {
    try {
        const emailExit = await db.otp.findUnique({ where: { email } });
        if (emailExit) {
            await db.otp.delete({
                where: { email }
            });
        }
    } catch (error) {
        throw error;
    }
};

const registerOtp = async (otpBody: Otp) => {
    try {
        const { email, otpHash } = otpBody;
        await db.otp.create({
            data: {
                email,
                otp: otpHash,
                expiredAt: new Date(Date.now() + 60 * 60000 )
            }
        });
    } catch (error) {
        throw error
    }
}
export const verifyUser = async (email: string) => {
    return await db.user.update({
        where: {
            email
        },
        data: {
            isVarified: true
        }
    });
};

export const sendOtp = async (body: OtpOption) => {
    try {
        const { email, subject, message, duration = 1 } = body;
        if (!email && !subject && !message) {
            throw new Error("Please provide all the details")
        }

        const otp = await generateOtp();
        const otpHash = await hashData(otp.toString());

        const mailOption = {
            from: "File Server",
            to: email,
            subject,
            html: `<p> ${message} </p> <p style="color:tomato; font-size:25px"><b>${otp}</b></p> <p> This otp is valid for ${duration} hour </p>`
        };

        await sendEmail(mailOption);
        await deleteOtp(email);
        await registerOtp({ email, otpHash })
        return { message: "Otp sent successfully" };

    } catch (error) {
        throw error;
    }
};


export const sendVerificationEmail = async (email: string, otpDetails: OtpOption) => {
    try {
        const userExit = await db.user.findUnique({ where: { email } });
        if (!userExit) {
            throw Error("There's no account for provide email. ");
        }
        const createdOtp = await sendOtp(otpDetails);
        return createdOtp;
    } catch (error) {
        throw error
    }
};

export const sendComfirmationEmail = async (email: string, mailOption: mailOption) => {
    try {
        const userExit = await db.user.findUnique({ where: { email } });
        if (!userExit) {
            throw Error("There's no account for provide email. ");
        }
        const message = sendEmail(mailOption);
        return message; 
    } catch (error) {
        throw error
    }
};


export const verifyOtp = async (otpVerifiedOption: OtpVarifiedOption) => {
    try {
        const { email, otp } = otpVerifiedOption;
        if (!(email && otp)) {
            throw Error("Provide values for email and Otp");
        }
        const matchedOTPRecord = await db.otp.findUnique({ where: { email } });
        if (!matchedOTPRecord) {
            throw Error("No OTP Records Found");
        }
        const { expiredAt } = matchedOTPRecord;
        const expiredDate: number = Number(expiredAt);

        if (expiredDate < Date.now()) {
            // await deleteOtp(email) ;
            throw Error("Code has expired. Request for new One")
        }
        const hashedOtp = matchedOTPRecord.otp;
        const validOtp = await compareData(otp, hashedOtp);
        return validOtp;
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (resetPasswordOption: ResetPasswordOption) => {
    try {
        const { email, password } = resetPasswordOption;
        return await db.user.update({
            where: { email },
            data: {
                password: await hashData(password)
            }
        })
    } catch (error) {
        throw error;
    }
};

