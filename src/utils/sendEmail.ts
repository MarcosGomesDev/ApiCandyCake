import nodemailer from 'nodemailer';

import endpointsConfig from '../../endpoints.config';

const sendEmail = async (email: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: `${endpointsConfig.USER_EMAIL}`,
            pass: `${endpointsConfig.PASS}`
        }
    });

    const send = await transporter.sendMail({
        from: `${endpointsConfig.USER_EMAIL}`,
        to: email,
        subject: subject,
        text: text,
    })

    return send

};

export default sendEmail;
