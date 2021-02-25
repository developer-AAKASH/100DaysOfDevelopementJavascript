const { request, response } = require("express");

const { Order, ProductCart } = require("../models/order");

exports.getOrderById = ( request, response, next, orderId )=>{
    Order.findById( orderId )
    .populate("products.product", "name price")
    .exec((error, order)=>{
        if(error){
            return response.status(400).json({
                error: "No order found !!!"
            });
        }

        request.order = order;
        next();
    });
};

exports.addOrder = ( request, response )=>{
    request.body.order.user = request.profile;

    const order = new Order(request.body.order);

    order.save((error, order)=>{
        if( error ){
            return response.status(400).json({
                error: "Failed to save your order in DB !!"
            });
        }

        response.json(order);
    });
};

exports.getAllOrders = ( request, response )=>{
    Order.find()
    .populate("user", "_id name")
    .exec((error, order)=>{
        if(error){
            return response.status(400).json({
                error: "No orders found !!!"
            });
        }

        return response.json(order);
    });
};

exports.updateStatus = ( request, response )=>{
    response.json(Order.schema.path("status").enumValues);
};

exports.getOrderStatus = ( request, response )=>{
    Order.update(
        { _id: request.body.orderId },
        { $set: { status: request.body.status }},
        (error, order)=>{
            if( error ){
                return response.status(400).json({
                    error: "Not able to update the order status !!!"
                });
            }

            response.json(order);
        }
    );
};