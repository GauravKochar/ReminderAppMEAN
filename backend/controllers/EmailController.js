
var nodemailer = require("nodemailer");
var keys= require('../config/keys.js');
const UserController =require('./user');
const nodemailer_transport= require('../Auth/nodemailer-transporter');

var rand,mailOptions,host,link,Body;

exports.sendLink = function(req,res){
  host=req.get('host');
  rand=Math.floor((Math.random() * 100) + 54);
  link="http://"+req.get('host')+"/verify?id="+rand;
  console.log(req.body.email);
    Body=req.body;


    mailOptions={
     from: 'Gaurav Kochar<gauravkochar.gk@gmail.com>',
        to : req.body.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    nodemailer_transport.transportCreating(mailOptions);
/*
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
});*/
}

exports.verifiedUser = function(req,res,next){

console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
req.body=Body;
     var  result= UserController.createUser(req,res,next);
       res.json(result);


    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
}

