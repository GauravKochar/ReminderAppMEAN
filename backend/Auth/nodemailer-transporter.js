const keys =require("../config/keys");
const nodemailer= require('nodemailer');
exports.transportCreating = function(mailOptions) {

let transporter = nodemailer.createTransport({

  host: 'mail.gmail.com',
  service:'gmail',
  secure:false,

  auth: {

      user: keys.admin.LoginId,
      pass: keys.admin.password

  },

  tls: {
    rejectUnauthorized:false
  }
});

console.log(mailOptions);
transporter.sendMail(mailOptions, function(error, response){
 if(error){
        console.log(error);
    res.end("error");
 }else{
        console.log("Message sent: " );
    res.end("sent");
     }
});
}
