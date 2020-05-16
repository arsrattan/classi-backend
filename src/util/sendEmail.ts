import nodemailer from "nodemailer";
import * as jwt from "jsonwebtoken";

export async function sendEmail(email: string, userId: string) {

    const token = jwt.sign({userId: userId}, "wefgeijgne",{expiresIn: '1h'});
    const url = `http://localhost:3000/user/confirm/${token}`

    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `<a href="${url}">${url}</a>`,
    });

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}