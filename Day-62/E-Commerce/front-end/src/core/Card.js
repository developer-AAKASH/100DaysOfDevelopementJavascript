import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { addProductToCart, removeItemFromCart } from './helper/CartHelper';
import ImageHelper from './helper/ImageHelper';

export default function Card({ product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f, // function(f){ return f };
    reload = undefined
}) {

    const [ redirect, setRedirect ] = useState(false);
    const [productCount, setProductCount] = useState( product.count );

    const cardTitle = product ? product.productName : "Product from ABC";
    const cardDescription = product ? product.description : "Product from ABC";
    const cardPrice = product ? product.price : 555;

    const addingToCart = ()=>{
        addProductToCart( product, ()=>{
            setRedirect(true);
        });
    };

    const getARedirect = ( redirect )=>{
        if( redirect ){
            return <Redirect to="/cart" />
        }
    };

    const showAddToCart = ( addtoCart )=>{
        return (
            addtoCart && (
                <button
                    onClick={ ()=>{ addingToCart() }}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        );
    };

    const showRemoveToCart = ( removeFromCart )=>{
        return (
            removeFromCart && (
                <button
                    onClick={ ()=>{ 
                        removeItemFromCart( product._id );
                        setReload( !reload );
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from Cart
                </button>
            )
        );
    };

    return (
        <div className="card text-white bg-dark border border-info">
            <div className="card-header lead">{ cardTitle }</div>
            <div className="card-body">
                <div className="rounded border border-success p-2">
                    { getARedirect( redirect ) }
                    <ImageHelper product={ product } />
                </div>
                <p  className="lead bg-success font-weight-normal text-wrap">
                    { cardDescription }
                </p>
                <p className="btn btn-success rounded btn-sm px-4">
                    { cardPrice }
                </p>
                <div className="row">
                    <div className="col-12">
                        { showAddToCart( addtoCart ) }
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        { showRemoveToCart( removeFromCart ) }
                    </div>
                </div>
            </div>
        </div>
    );
};