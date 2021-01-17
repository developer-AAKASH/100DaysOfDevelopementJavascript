// importing express js in our project
const express = require("express");
const User = require('./User.js');
const bodyParser = require("body-parser");

const app = express();

app.use( bodyParser.urlencoded({ extended: true }));

// home route 
app.get( "/", function( request, response ){
    response.sendFile( __dirname + "/index.html" )
});

app.get( "/login", function( request, response ){
    response.sendFile ( __dirname+ "/login.html" );
});

app.post( "/login", function( request, response ){
    let userName = request.body.username;
    let password = request.body.password;

    if( userName === "admin" && password === "admin"){
        response.sendFile( __dirname + "/index.html");
    }

    response.sendFile( __dirname + "/login.html")
});

app.get( "/register", function( request, response ){
    response.sendFile ( __dirname+ "/register.html" );
});

app.post( "/register", function( request, response ){
    let userName = request.body.username;
    let email = request.body.emailid;
    let password = request.body.password;

    let user = new User( userName, email, password );
    
    console.log(user);

    response.sendFile( __dirname + "/index.html")
});

app.get( "/contact-us", function( request, response ){
    response.sendFile ( __dirname+ "/contact-us.html" );
});

app.get( "/about-us", function( request, response ){
    response.sendFile ( __dirname+ "/about-us.html" );
});

app.listen( 9876, function(){
    console.log("Server is running on port number 9876....");
});

