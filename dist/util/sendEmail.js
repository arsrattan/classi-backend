"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_ses_transport_1 = __importDefault(require("nodemailer-ses-transport"));
async function sendEmail(email, url) {
    const key = process.env.AWS_ACCESS_KEY_ID;
    const secret = process.env.AWS_SECRET_ACCESS_KEY;
    const awsCreds = {
        accessKeyId: key,
        secretAccessKey: secret
    };
    const transporter = nodemailer_1.default.createTransport(nodemailer_ses_transport_1.default({
        accessKeyId: awsCreds.accessKeyId,
        secretAccessKey: awsCreds.secretAccessKey,
        rateLimit: 5,
        serverUrl: 'email-smtp.us-west-2.amazonaws.com'
    }));
    const mailOptions = {
        from: 'FromName <no-reply@domain.com>',
        to: email,
        subject: 'Please Confirm Email',
        html: `<a href="${url}">${url}</a>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Message sent: ' + info);
        }
    });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map