require( "dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const md5 = require('md5');

const app = express();

app.use( express.static("public"));
app.set( "view engine", "ejs" );
app.use( bodyParser.urlencoded({
  extended: true
}));

mongoose.connect( "mongodb://localhost:27017/userDB",
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// userSchema.plugin( encrypt, { secret: process.env.SECRET , encryptedFields: ['password'] });

const User = new mongoose.model( "User", userSchema );

app.get( "/", ( request, response )=>{
  response.render( "home" );
});

app.get( "/login", ( request, response )=>{
  response.render( "login" );
});

app.get( "/register", ( request, response )=>{
  response.render( "register" );
});

app.post( "/register", ( request, response )=>{
  const newUser = new User({
    email: request.body.username,
    password: md5(request.body.password)
  });

  newUser.save( ( error )=>{
    if( error ){
      console.log(error);
    } else {
      response.render( "secrets" );
    }
  });
});

app.post( "/login", ( request, response )=>{
  const userName = request.body.username;
  const password = md5(request.body.password);

  User.findOne({ email: userName }, ( error, user )=>{
    if( error ){
      console.error( error );
    } else {
      if( user ){
        if( user.password === password ){
          response.render( "secrets" );
        }
      }
    }
  });
});

app.listen( 9876, ()=>{
  console.log("App is running on port 9876...");
});
