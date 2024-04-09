const {Resend} = require('resend');
const resend = new Resend('{your api key for resend.com}');
function sendEmail(email,subject,html)
{
    resend.emails.send({
        from: 'elearner@resend.dev',
        to: email,
        subject: subject,
        html: html
    });      
}
module.exports = { sendEmail };
