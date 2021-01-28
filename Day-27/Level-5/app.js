require( "dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');

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
  password: String
});

// userSchema.plugin( encrypt, { secret: process.env.SECRET , encryptedFields: ['password'] });

userSchema.plugin( passportLocalMongoose );

const User = new mongoose.model( "User", userSchema );

passport.use( User.createStrategy() );

passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

app.get( "/", ( request, response )=>{
  response.render( "home" );
});

app.get( "/login", ( request, response )=>{
  response.render( "login" );
});

app.get( "/register", ( request, response )=>{
  response.render( "register" );
});

app.get( "/secrets", ( request, response )=>{
  if( request.isAuthenticated() ){
    response.render( "secrets" );
  } else {
    response.redirect( "/login" );
  }
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
