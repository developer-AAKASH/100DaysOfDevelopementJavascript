const { request, response } = require("express");
const User = require("../models/user");
const Order = require("../models/order");

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
        return response.json(users);
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

exports.userOrdersList = ( request, response )=>{
    Order.find({
        user: request.profile._id
    })
    .populate("user", "_id userName")
    .exec(( error, order )=>{
        if( error ){
            return response.status(400).json({
                error: "This user have not done any purchase !!"
            });
        }
        return response.json( order );
    });
};

exports.pushOrderInPurchaseList = ( request, response, next )=>{
    let purchases = [];
    request.body.order.products.forEach( product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: request.body.order.amount,
            transactionId: request.body.order.transactionId
        });
    });

    // store this into database...
    User.findOneAndUpdate(
        { _id: request.profile._id },
        { $push: { purchases: purchases }},
        { new: true },
        ( error, purchases )=>{
            if( error ){
                return response.status(400).json({
                    error: "Unable to save purchase list !!"
                });
            }

            next();
        }
    );
};