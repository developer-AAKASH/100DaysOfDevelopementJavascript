const { check, validationResult } = require('express-validator');
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { request, response } = require('express');

exports.signup = ( request, response )=>{

    const errors = validationResult( request );

    if( !errors.isEmpty() ){
        return response.status(422).json({
            error: errors.array()[0].msg
        });
    }

    console.log("Request body: ", request.body);
    const user = new User( request.body );
    user.save(( error, user )=>{
        if( error ){
            return response.status(400).json({
                error: "Not able to save the user...."
            });
        }
        response.json(user);
    });
};

exports.signin = ( request, response )=>{
    const { email, password } = request.body;

    const errors = validationResult( request );

    if( !errors.isEmpty() ){
        return response.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({ email }, ( error, user )=>{
        if( error || !user ){
            return response.status(400).json({
                error: "User email does not exist..."
            });
        }

        if( !user.authenticate( password ) ){
            return response.status(401).json({
                error: "Email and password do not match..."
            });
        }

        // create toke...
        const token = jwt.sign({ _id: user._id }, process.env.SECRET );
        // put token into cookie...
        response.cookie( "token", token, { expire: new Date() + 9 });
        // sending response to front-end...

        const { _id, userName, email, role } = user;

        return response.json({
            token, 
            user: {
                _id, userName, email, role 
            }
        });

    });

};

exports.signout = ( request, response )=>{
    response.clearCookie("token");
    response.json({
        message: "User signout succesfuly..."
    });
};

// in postman, dont forgot to set Content-Type = application/json to getting all the data...

// Protected routes...
exports.isSignedIn = expressJwt({
    // a middleware for checking authorization...
    secret: process.env.SECRET,
    userProperty: "auth"
});

// custome middlewares...

exports.isAuthenticated = ( request, response, next )=>{
    let checker = request.profile && request.auth && request.profile._id === request.auth._id;

    if( !checker ){
        return response.status(403).json({
            error: "Access Denied..."
        });
    }
    next();
};

exports.isAdmin = ( request, response, next )=>{
    if( request.profile.role === 0 ){
        return response.status(403).json({
            error: "You are not a Admin, Access Denied..."
        });
    }
    next();
};