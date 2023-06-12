import { transporter } from "../config/nodemailer.transporter";
import { mailOption } from "../types/mailOption.type";

export const sendEmail = async (mailOption : mailOption | object) => {
    try {
       return await transporter.sendMail(mailOption);
       
    } catch (error) {
        throw error;
    }
    } ;