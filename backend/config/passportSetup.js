

  const passport = require('passport');

  const GoogleStrategy = require('passport-google-oauth20');
  const LocalStrategy = require('passport-local').Strategy;

   const keys = require('./keys');

  const User =require('../models/user');

  passport.serializeUser((user,done)=>
  {
    console.log("writing user is",user);
      done(null,user);
  });

  passport.deserializeUser((id,done)=>
  {
      User.findById(id).then((user)=>
      {
          done(null,user);
      })
  });



  passport.use('local-login', new LocalStrategy({ // toLowerCase() is used bcz username/email is not case sendsitive
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    LoginModel.findOne({'email': username.toLowerCase(), 'password': password}, function (err, user) {
        if (err)
            return done(err, req.flash('loginMessage', err));
        if (!user)
            return done(null, false, req.flash('loginMessage', 'Username/Password Incorrect.'));
        return done(null, user);
    })
}));



  passport.use(

      new GoogleStrategy({
              callbackURL : 'http://127.0.0.1:3000/api/user/googleRedirect',
              clientID : keys.google.clientID,
              clientSecret : keys.google.clientSecret

          },

          (accessToken,refreshToken,profile,done)=>
          {
              // console.log(profile._json.image.url);
              console.log(profile);
              User.findOne({'googleId':profile.id}).then((currentUser)=>
              {
                  if(currentUser)
                  {
                     console.log("user is"+currentUser);
                      done(null,currentUser);
                  }
                  else
                  {

                      new User(
                          {
                              username : profile.displayName,
                              email: profile.emails[0].value,
                              googleId:profile.id


                          }
                      ).save().then((newUser)=>
                          {
                            //  console.log("new user is"+newUser);
                              done(null,newUser);
                          }

                      );

                  }
              })


          })
  );
