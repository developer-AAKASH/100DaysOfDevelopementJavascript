const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema; 

const productCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: {
        type: String
    },
    count: {
        type: Number
    },
    price: {
        type: Number
    }
});

const ProductCart = mongoose.model( "ProductCart", productCartSchema );

const orderSchema = new mongoose.Schema({
    products: [ productCartSchema ],
    transactionId: {

    },
    amount: {
        type: Number
    },
    address: {
        type: String
    },
    updated: {
        type: Date,
    },
    user: {
        type: ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    }
},
{
    timestamps: true
});

const Order = mongoose.model( "Order", orderSchema );

module.exports = { ProductCart, Order };