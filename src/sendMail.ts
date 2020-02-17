import * as express from 'express';
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
class Mail {
   readHTMLFile(path, callback) {
        fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    }

    async send(type, email, fileName, Password) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ionos.com',
            port: 25,
            secure: false,
            // service: 'gmail',
            auth: {
                user: 'info@levan.ca',
                pass: 'j8hd3u43#2Ds' 
            }
        });
        
        if (type === 0) {
            this.readHTMLFile(__dirname + '\\template\\forgotPass.html', (err, html) => {
                html = html.replace('PASS', Password);
                var template = handlebars.compile(html);
                var replacements = {
                    'PASS': Password
                };
                var htmlToSend = template(replacements);
                // send mail with defined transport object
                // setup email data with unicode symbols
                let mailOptions = {
                    from: 'info@levan.ca',
                    to: email,
                    // to: `${email}`,
                    subject: 'Password reset on Levan',
                    html: htmlToSend
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
            
                // this.readHTMLFile(__dirname + '\\template\\mail.html', (err, html) => {
            });
        }
        //Recovery Password
        else if (type === 1) {
            this.readHTMLFile(__dirname + '\\template\\timesheet.html', (err, html) => {
                var template = handlebars.compile(html);

                var htmlToSend = template();
                // send mail with defined transport object
                // setup email data with unicode symbols
                let mailOptions = {
                    from: 'info@levan.ca',
                    to: email,
                    // to: `${email}`,
                    subject: 'Staff Approvement',
                    html: htmlToSend,
                    attachments: [
                        {
                            filename: 'levan-' + fileName ,
                            path: __dirname + `\\reports\\levan-` + fileName,
                            contentType: 'application/pdf'
                        }
                    ]
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                });
            });
        }
    }


}
export default new Mail();
