import { emitWarning } from "process";

export type OtpOption = {
    email: string;
    subject: string;
    message: string
    duration: number;
};

export type Otp = {
    email: string;
    otpHash: string;
};

export type OtpVarifiedOption = {
    email: string;
    otp: string;
};