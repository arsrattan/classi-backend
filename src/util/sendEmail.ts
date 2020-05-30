import nodemailer from "nodemailer";
import sesTransport from "nodemailer-ses-transport"

export async function sendEmail(email: string, url: string) {

    const key = process.env.AWS_ACCESS_KEY_ID;
    const secret = process.env.AWS_SECRET_ACCESS_KEY;

    const awsCreds = {
        accessKeyId : key,
        secretAccessKey : secret
    };

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport(sesTransport({
        accessKeyId: awsCreds.accessKeyId,
        secretAccessKey: awsCreds.secretAccessKey,
        rateLimit: 5,
        serverUrl : 'email-smtp.us-west-2.amazonaws.com'
    }));

    const mailOptions = {
        from: 'FromName <no-reply@domain.com>',
        to: email, // list of receivers
        subject: 'Please Confirm Email', // Subject line
        html: `<a href="${url}">${url}</a>` // html body
    };

    // send mail with defined transport object


    transporter.sendMail(mailOptions, function(error, info){
        if( error ) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info);
        }
    });
}