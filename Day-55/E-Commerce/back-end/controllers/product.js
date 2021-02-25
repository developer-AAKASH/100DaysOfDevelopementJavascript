const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fileSystem = require("fs");
const { identity, sortBy } = require("lodash");
const { request, response } = require("express");

exports.getProductById = ( request, response, next, productId )=>{
    Product.findById(productId)
    .exec((error, product)=>{
        if( error ){
            return response.status(400).json({
                error: "Product not found"
            });
        }

        request.product = product;
        next();
    });
};

exports.addProduct = ( request, response )=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(request, (error, fields, file)=>{
        if( error ){
            return response.status(400).json({
                error: "Problem with image field..."
            });
        }
        // Destructure the field...
        const { productName, description, price, category, stock } = fields;
        
        // Restrication on field... but not recommanded way of validation...
        if(
            !productName ||
            !description ||
            !price || 
            !category ||
            !stock 
        ){
            return response.status(400).json({
                error: "Some field is missing..."
            });
        }

        let product = new Product(fields);
        
        // handle image file here...
        if( file.photo.size > process.env.MAX_SIZE ){
            return response.status(400).json({
                error: "File size is too big !!!"
            });
        }

        product.photo.data = fileSystem.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;

        // save to db
        product.save(( error, product)=>{
            if( error ){
                response.status(400).json({
                    error: "There is problem in saving product !!!"
                });
            }

            response.json(product);
        });
    });
};

exports.getAllProduct = ( request, response )=>{
    let limit = request.query.limit ? parseInt(request.query.limit) : 10;
    let sortBy = request.query.sortBy ? request.query.sortBy : "_id"
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]]) //this can be dynamically done like limit....
    // ['updatedAt', 'descending'] // one more example for sorting
    .limit(limit)
    .exec((error, products)=>{
        if(error){
            return response.status(400).json({
                error: "No Product exist !!!"
            });
        }

        return response.json(products);
    });
};

exports.getProduct = ( request, response )=>{
    request.product.photo = undefined;
    return response.json(request.product);
};

// middlewares
exports.getPhoto = ( request, response, next )=>{
    if( request.product.photo.data ){
        response.set("Content-type", request.product.photo.contentType);
        return response.send(request.product.photo.data);
    }
    next();
};

exports.updateProduct = (request, response)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(request, (error, fields, file)=>{
        if( error ){
            return response.status(400).json({
                error: "Problem with image field..."
            });
        }

        let product = request.product;
        // Take existing value, extend it with new values and update it...
        // a lodash method...
        product = _.extend(product, fields);
        
        // handle image file here...
        if( file.photo.size > process.env.MAX_SIZE ){
            return response.status(400).json({
                error: "File size is too big !!!"
            });
        }

        product.photo.data = fileSystem.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;

        // save to db
        product.save(( error, product)=>{
            if( error ){
                response.status(400).json({
                    error: "There is problem in updating product !!!"
                });
            }

            response.json(product);
        });
    });
};

exports.deleteProduct = (request, response)=>{
    let product = request.product;

    product.remove((error, deletedProduct)=>{
        if(error){
            return response.status(400).json({
                error: "Fail to delete proguct !!!"
            });
        }
        return response.json({
            message: "Product deleted Succesfuly !!!"
        });
    });
};

exports.updateStockAndSold = (request, response, next )=>{
    let myOperations = request.body.order.products.map(product=>{
        return {
            updateOne: {
                filter: { _id: product._id },
                update: { $inc: { stock: -product.count, sold: +product.count }}
            }
        }
    });

    Product.bulkWrite( myOperations, {}, ( error, products )=>{
        if( error ){
            return response.status(400).json({
                error: "Bulk Operation Falied !!!"
            });
        }

        next();
    });
};

exports.getAllUniqueCategories = ( request, response )=>{
    Product.distinct("category", {}, (error, category)=>{
        if( error ){
            return response.status(400).json({
                error: "No category found !!!"
            });
        }

        return response.json(category);
    });
};