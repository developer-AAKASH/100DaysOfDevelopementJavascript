const { request, response } = require("express");
const Category = require("../models/category");

exports.getCategoryById = ( request, response, next, categoryId )=>{
    Category.findById( categoryId ).exec(( error, category )=>{
        if( error ){
            return response.status(400).json({
                error: "Category Not found !!!"
            });
        }

        request.category = category;
        next();
    });
};

exports.createCategory = ( request, response )=>{
    const category = new Category(request.body);

    category.save(( error, category )=>{
        if( error ){
            return response.status(400).json({
                error: "Opps, Problem in saving category !!!"
            });
        }

        response.json({category});
    });
};

exports.getAllCategory = ( request, response )=>{
    Category.find().exec(( error, categories )=>{
        if( error ){
            return response.status(400).json({
                error: "No category exist !!!"
            });
        }

        response.json(categories);
    });
};

exports.getCategory = (request, response)=>{
    return response.json( request.category );
};

exports.updateCategory = ( request, response)=>{
    // understand here...
    const category = request.category;
    category.name = request.body.name;

    category.save(( error, updatedCategory)=>{
        if(error){
            return response.status(400).json({
                error: "Unable to update the category..."
            });
        }

        response.json(updatedCategory);
    });
};

exports.deleteCategory = ( request, response )=>{
    const category = request.category;

    category.remove((error, category)=>{
        if( error ){
            return response.status(400).json({
                error: "Unable to delete category !!!"
            });
        }

        return response.json({
            message: `${category.name} is succesfuly deleted !!!`
        });
    });
};