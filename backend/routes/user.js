const express=require('express');
var passport= require('passport');
const router=express.Router();
const UserController = require("../controllers/user");
const EmailController =require("../controllers/EmailController");
const checkAuth= require("../Auth/check-auth");

router.post("/signup",EmailController.sendLink);

// router.post('/local',passport.authenticate('local',{
//    successRedirect:'http://localhost:4200/addReminder',
//    failureRedirect: 'http://localhost:4200/login'

// })
// );
router.post("/login",UserController.userLogin);


router.get('/google',passport.authenticate('google', { scope : ['profile', 'email'] })
);

router.use('/googleRedirect',passport.authenticate('google'),(req,res)=>
{
    console.log(req.user.username);

  //  res.redirect('http://localhost:4200/addReminder');
    res.json({username: req.user.username});

});
module.exports =router;
