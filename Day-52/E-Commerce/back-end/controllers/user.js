const { request, response } = require("express");
const User = require("../models/user");

exports.getUserById = (request, response, next, userId)=>{
    User.findById( userId ).exec(( error, user )=>{
        if( error || !user ){
            return response.status(400).json({
                error: "No user exist !!!"
            });
        }

        request.profile = user;
        next();
    });
};

exports.getUser = (request, response)=>{
    // this method is for abstracting user password form request object...
    request.profile.salt = undefined;
    request.profile.encryptedPassword = undefined;
    //created and updated at to....
    return response.json( request.profile );
};

exports.getAllUser = ( request, response )=>{
    User.find().exec(( error, users )=>{
        if( error || !users ){
            return response.status(400).json({
                error: "No User exist !!!"
            });
        }
    });
};

exports.updateUser = (request, response)=>{
    User.findByIdAndUpdate(
        { _id: request.profile._id },
        { $set: request.body },
        { new: true, userFindAndModify: false },
        ( error, user )=>{
            if( error || !user ){
                return response.status(400).json({
                    error: "some error"
                });
            }

            user.salt = undefined;
            user.encryptedPassword = undefined;
            response.json(user);
        }
    );
};