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
router.get("/getUserList",UserController.getUsers);
router.get('/google',passport.authenticate('google', { scope : ['profile', 'email'] }));
router.post("/following",checkAuth,UserController.addFollowing);
router.use('/googleRedirect',passport.authenticate('google'),(req,res)=>
{
    console.log(req.user.username);
    res.json({username: req.user.username});
});
module.exports =router;

