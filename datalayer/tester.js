/*var emailSender = require('./pojo/emailSender');
var name = "Manan Balwani";
var html = `<h2>We welcome you ${name}.</h2><br>`;
html = html+`<p>You can access courses and enroll in our courses for better learning and increase your performance</p><br>`;
html = html+`<p>Waiting for you to enroll in a course and kick start your career.</p><br>`;
html = html+`<b>Thank You <br> Team Elearners</b>`;
emailSender.sendEmail("mananbalwani1512@gmail.com","Welcome to our platform",html);*/
var encrypter = require('./pojo/encrypter')
var cloud = require('./pojo/cloud');
async function checkEncrypter()
{
var pass =  await encrypter.encryptPassword("ISROInSpace@2003");
var comp = await encrypter.comparePassword("$2a$10$qBdVW9A7zMYPg6Lis8f8/umbq2Djskp2wJC4t5cpbAKbDXYePVtDm","ISROInSpace@2003");
console.log(pass);
console.log(comp);
var result = await cloud.hasImage("cld-sample-5");
}
checkEncrypter();