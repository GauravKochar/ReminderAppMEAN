const express=require('express');
const bodyParser=require('body-parser');
const path= require('path');
var passportSetup= require('./config/passportSetup');
var passport= require('passport');
const mongoose=require('mongoose');
const app=express();
 var cookieSession = require('cookie-session');
 const ReminderController =require('./controllers/remainder');
//  const postsRoutes = require('./routes/posts');
   const userRoutes = require('./routes/user');
   const RemainderRoutes =require('./routes/remainder');
   const EmailController= require('./controllers/EmailController');

var cookieParser = require('cookie-parser');
var session = require('express-session');

mongoose.connect("mongodb://localhost:27017/ReminderApp").then(() =>{
  console.log('connected to database')
})
.catch(() =>{
console.log("Connection failed");
});

app.use(cookieParser());
app.use(session({
  secret: 'It Secret',
  cookie: { maxAge: 6000000000000 }
}))


app.use((req,res,next)=>
{
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



 app.use((req,res,next) => {

  res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET ,POST,PUT,PATCH,DELETE,OPTIONS");
    next();

});

setInterval(ReminderController.checkReminder, 60*1000);
//ReminderController.checkReminder();
app.set('trust proxy', 1);
 app.use("/api/user",userRoutes);
 app.use("/api/reminder",RemainderRoutes );

 app.use("/profile/show",(req,res)=> {
   res.end();
 });
 app.use("/success",(req,res)=> {
  res.end();
} );
app.use("/Login",(req,res)=> {
  res.end();
});
app.get("/verify",EmailController.verifiedUser);


 module.exports=app;



