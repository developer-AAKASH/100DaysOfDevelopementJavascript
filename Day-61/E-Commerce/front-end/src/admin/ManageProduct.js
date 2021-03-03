import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthinticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getProduct } from './helper/adminapicall';

export default function ManageProduct() {

    const [ products, setProducts] = useState([]);

    const { user, token } = isAuthinticated();

    const preLoad = ()=>{
        getProduct()
        .then( data => {
            if( data.error ){
                console.log(data.error);
            } else{
                setProducts( data );
            }
        })
        .catch();
    };

    useEffect(() => {
        preLoad();
    }, []);

    const deletePro = ( productId )=>{
        deleteProduct( user._id, productId, token )
        .then( data => {
            if( data.error ){
                console.log(data.error);
            } else{
                preLoad();
            }
        });
    };

    return (
        <Base
        title="Manage the Products"
        description="Manage products here"> 
            <h2 className="mb-4">All Products </h2>
            <Link className="btn btn-info"
            to={"/admin/dashboard"}>
                <span className="">Dashboard</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3"> Total {products.length} Products</h2>
                    { 
                    products.map( ( p, index )=>{
                        return(
                            <div className="row text-center mb-2">
                                <div className="col-4">
                                    <h3 className="text-white text-left">
                                       { p.productName }
                                    </h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/product/update/${p._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button 
                                    onClick={ ()=>{
                                        deletePro( p._id );
                                    }}
                                    className="btn btn-danger"
                                    >
                                    Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </Base>
    );
};
