require( "dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');

// google
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')

const app = express();

app.use( express.static("public"));
app.set( "view engine", "ejs" );
app.use( bodyParser.urlencoded({
  extended: true
}));

// check passport docs and express-session docs...

app.use( session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use( passport.initialize() );
app.use( passport.session() );

mongoose.connect( "mongodb://localhost:27017/userDB",
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set( "useCreateIndex", true );

// mongoose Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

// userSchema.plugin( encrypt, { secret: process.env.SECRET , encryptedFields: ['password'] });

userSchema.plugin( passportLocalMongoose );
userSchema.plugin( findOrCreate );

const User = new mongoose.model( "User", userSchema );

passport.use( User.createStrategy() );

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:9876/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:9876/auth/google/secrets",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

app.get( "/", ( request, response )=>{
  response.render( "home" );
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secrets',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });

app.get( "/submit", ( request, response )=>{
  if( request.isAuthenticated() ){
    response.render( "submit" );
  } else {
    response.redirect( "/login" );
  }
});

app.post( "/submit", ( request, response )=>{
  const secret = request.body.secret;

  console.log(request.user);

  User.findById( request.user.id, ( error, user )=>{
    if( error ){
      console.log(error);
    } else {
      if( user ){
        user.secret = secret;
        user.save( ()=>{
            response.redirect( "/secrets" );
        });
      }
    }
  });
});

app.get( "/login", ( request, response )=>{
  response.render( "login" );
});

app.get( "/register", ( request, response )=>{
  response.render( "register" );
});

app.get( "/secrets", ( request, response )=>{
  // if( request.isAuthenticated() ){
  //   response.render( "secrets" );
  // } else {
  //   response.redirect( "/login" );
  // }
  User.find({"secret": {$ne: null }}, ( error, users )=>{
    if( error ){
      console.log(error);
    } else {
      if( users ){
        response.render( "secrets", { usersWithSecrets: users });
      }
    }
  });
});

app.get( "/logout", ( request, response )=>{
  request.logout();
  response.redirect( "/" );
});

app.post( "/register", ( request, response )=>{
  const userName = request.body.username;
  const password = request.body.password;

  User.register({ username: userName }, password, ( error, user )=>{
    if( error ){
      console.error( error );
      response.redirect( "/register" );
    } else {
      passport.authenticate( "local" )( request, response, ()=>{
        response.redirect( "/secrets" );
      });
    }
  });
});

app.post( "/login", ( request, response )=>{
  const userName = request.body.username;
  const password = request.body.password;

  const user = new User({
    username: userName,
    password: password
  });

  request.login( user, ( error )=>{
    if( error ){
      console.error( error );
    } else {
      passport.authenticate( "local" )( request, response, ()=>{
        response.redirect( "/secrets" );
      });
    }
  });
});

app.listen( 9876, ()=>{
  console.log("App is running on port 9876...");
});
