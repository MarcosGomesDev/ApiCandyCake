import nodemailer from 'nodemailer';

const sendEmail = async (email: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: `${process.env.USER_EMAIL}`,
            pass: `${process.env.PASS}`
        }
    });

    const send = await transporter.sendMail({
        from: `${process.env.USER_EMAIL}`,
        to: email,
        subject: subject,
        text: text,
    })

    return send

};

export default sendEmail;
