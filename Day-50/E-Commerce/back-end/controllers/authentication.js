const { check, validationResult } = require('express-validator');
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

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
        if( error ){
            response.status(400).json({
                error: "User email does not exist..."
            });
        }

        if( !user.authenticate( password ) ){
            response.status(401).json({
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
    response.json({
        message: "From Sign-out...."
    });
};

// in postman, dont forgot to set Content-Type = application/json to getting all the data...