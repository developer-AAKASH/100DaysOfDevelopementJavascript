const { request, response } = require("express");

exports.signup = ( request, response )=>{
    console.log("Request body: ", request.body);
    response.json({
        message: "From Sign-up...."
    });
};

exports.signout = ( request, response )=>{
    response.json({
        message: "From Sign-out...."
    });
};

// in postman, dont forgot to set Content-Type = application/json to getting all the data...