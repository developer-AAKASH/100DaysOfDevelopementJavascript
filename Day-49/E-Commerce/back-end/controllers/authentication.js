const { check, validationResult } = require('express-validator');
const User = require("../models/user");

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

exports.signout = ( request, response )=>{
    response.json({
        message: "From Sign-out...."
    });
};

// in postman, dont forgot to set Content-Type = application/json to getting all the data...