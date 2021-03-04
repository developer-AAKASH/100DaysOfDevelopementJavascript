import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { isAuthinticated } from '../auth/helper';
import Base from "../core/Base";
import { getCategories, getAProduct, updateProduct } from './helper/adminapicall';


const UpdateProduct = ({ match })=>{
    
    const { user, token } = isAuthinticated();

    const [ product, setProduct ] = useState({
        productName: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getRedirect: false,
        formData: ""
    });


    const { productName, 
        description, 
        price, 
        stock,
        photo,
        categories,
        category,
        loading,
        error,
        createdProduct,
        getRedirect,
        formData
      } = product;
    
    const preLoad = ( productId )=>{
        getAProduct( productId ).then( data =>{
            if( data.error ){
                setProduct({ ...product, error: data.error });
            } else{
                setProduct({
                    ...product,
                    productName: data.productName,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    stock: data.stock,
                    formData: new FormData()
                });
                preLoadCategories();
            }
        });
    };

    const preLoadCategories = ()=>{
        getCategories()
        .then( data => {
            if( data.error ){
                setProduct({ ...product, error: data.error });
            } else{
                setProduct({
                    categories: data, 
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        preLoad( match.params.productId );
    }, []);
// DecOps for MERN
    const onSubmit = ( event )=>{
        event.preventDefault();

        setProduct({ ...product, error: "", loading: true });
        updateProduct( match.params.productId, user._id, token, formData )
        .then( data =>{
            if( data.error ){
                setProduct({ ...product, error: data.error });
            } else {
                setProduct({
                    ...product,
                    productName: "",
                    description: "",
                    price: "",
                    photo: "",
                    stock: "",
                    loading: false,
                    createdProduct: data.productName
                });
            }
        });
    };

    const handleChange = (name)=>(event)=>{
        const value = name === "photo" ? event.target.files[0] :
        event.target.value;

        formData.set( name, value );
        setProduct({ ...product, [name]: value });
    };

    const successMessage = ()=>{
        return (
            <div className="alert alert-success mt-3"
            style={{ display: createdProduct ? "" : "none" }}>
                <h4>{ createdProduct } Updated successfuly</h4>
            </div>
        );
    };

    const errorMessage = ()=>{};

    const ProductForm = ()=>{
        return(
            <form>
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={ handleChange("photo") }
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="Choose an image"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={ handleChange("productName") }
                    name="productName"
                    className="form-control"                    
                    placeholder="Product name"
                    value={productName}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={ handleChange("description") }
                    name="description"
                    className="form-control"
                    placeholder="Product Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={ handleChange("price") }
                    name="price"
                    className="form-control"                    
                    placeholder="Product price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={ handleChange("category") }
                    className="form-control"
                    placeholder="Category"
                >
                    <option>---Select category---</option>
                    { categories && 
                    categories.map(( cat, index )=>{
                        console.log(cat.name);
                        return <option key={index} value={cat._id}>
                            {cat.categoryName}
                        </option>
                    })
                    }
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={ handleChange("stock") }
                    type="number"
                    name="quantity"
                    className="form-control"                    
                    placeholder="Product quantity"
                    value={stock}
                />
            </div>
            <button
                type="submit"
                onClick={ onSubmit }
                className="btn btn-outline-success mb-3"
            >Update product</button>
        </form>
        );
    };    

    return (
        <Base
        title="Add Product"
        description=""
        className="container bg-success p-4">
        <Link to="/admin/dashboard"
        className="btn btn-md btn-dark mb-3"
        >
            Dashboard
        </Link>
        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                { successMessage() }
                { errorMessage() }
                { ProductForm() }
            </div>
        </div>
        </Base>
    );
};

export default UpdateProduct;