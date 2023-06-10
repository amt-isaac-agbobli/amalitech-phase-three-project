import { transporter } from "../config/nodemailer.transporter";

export const sendEmail = async (mailOption : object) => {
    try {
       await transporter.sendMail(mailOption);
    } catch (error) {
        throw error;
    }
    } ;