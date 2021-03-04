import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthinticated } from '../auth/helper';
import Base from '../core/Base';
import { addCategory } from './helper/adminapicall';

const AddCategory = ()=>{

    const [ categoryName, setCategoryName ] = useState("");
    const [ error, setError ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    
    const { user, token } = isAuthinticated();

    const handleChange = ( event )=>{
        setError("");
        setCategoryName( event.target.value );
    };

    const onSubmit = ( event )=>{
        event.preventDefault();
        setError("");
        setSuccess(false);

        // Calling API...
        addCategory( user._id, token, {categoryName} )
        .then( (data)=>{
            console.log(data);
            if( data.error ){
                setError( true );
            } else{
                setError("");
                setSuccess(true);
                setCategoryName("");
            }
        });
    };

    const successMessage = ()=>{
        if( success ){
            return (
                <h4 className="text-success">
                    Category added successfuly !!
                </h4>
            );
        }
    };

    const errorMessage = ()=>{
        if( error ){
            return ( 
                <h4 className="text-danger">
                    Error while adding category !!!
                </h4>
            );
        }
    };

    const categoryForm = ()=>{
        return (
            <form>
                <div className="form-group">
                    <p className="lead">Enter the category</p>
                    <input type="text"
                    className="form-control my-3"
                    autoFocus
                    required
                    placeholder="For Ex. Men/ Women/ Kids..."
                    onChange={ handleChange }
                    value={categoryName}
                    />
                    <button className="btn btn-outline-success"
                    onClick={onSubmit}>
                        Add category
                    </button>
                </div>
            </form>
        );        
    };

    const goBack = ()=>{
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-success mb-3"
                to="/admin/dashboard">
                    Admin Dashboard
                </Link>
            </div>
        );
    };

    return (
        <Base 
            title="Add category..."
            description="Add new category for adding new types of products"
            className="container bg-success p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {/* <h1>Categories</h1> */}
                    { successMessage() }
                    { errorMessage() }
                    { categoryForm() }
                    { goBack() }
                </div>
            </div>
        </Base> 
    );
};

export default AddCategory;
