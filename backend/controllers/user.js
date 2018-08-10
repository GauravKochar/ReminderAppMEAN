const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const nodemailer_transport =require('../Auth/nodemailer-transporter');
const User = require('../models/user');

exports.findUser =(element) => {

  User.findOne({"_id": element.userId }).then(result => {
    if(result) {

      mailOptions={
        from: 'Gaurav Kochar<gauravkochar.gk@gmail.com>',
           to : result.email,
           subject :element.title,
           html : "Hello, <br> It is a reminder to you that there is an event of name " +element.description+" from "+element.startDate+" to "+element.endDate
       }
       nodemailer_transport.transportCreating(mailOptions);
    }


  });

}


exports.createUser = (req,res,next) => {
  console.log("ayayayayaya",req.body);

  bcrypt.hash(req.body.password,10).then( hash =>
  {
      const user=new User({
      username:req.body.email,
      email: req.body.email,
      password : hash
      });
      user.save().then(result => {
        var obj={
          message: 'User Created',
          result: result
      };
        return obj;
      }).catch(err => {
           res.status(500).json({
           message:" Invalid Authentication Credentials"
          })

      });

  });
  }
  exports.userLogin = (req,res,next) => {
    let fetchUser;
    console.log("----------------------------");
    User.findOne({ email: req.body.email}).then( user =>
    {
        if(!user)
        {
            console.log("LoginAeerorr");
          return res.status(401).json({
            message: "Auth failed"
         });
        }
        fetchUser=user;
        console.log("user"+user);
       return  bcrypt.compare(req.body.password,user.password);

    }).then(result =>
    {
      //  console.log(result);
        if(!result)
        {
        return res.status(401).json({
            message: "Auth failed"
         })
        }
        console.log("id"+fetchUser);
        const token=jwt.sign({emailId: fetchUser.email,user: fetchUser._id},"secret_this_should_be_longer",{expiresIn:"1h"});
        res.status(200).json({
                token:token,
                expiresIn:3600,
                userId: fetchUser._id
        });

    }).catch(err => {
      console.log(err);
         return res.status(401).json({
          message:" Invalid Authentication Credentials"
         })

    });





}
