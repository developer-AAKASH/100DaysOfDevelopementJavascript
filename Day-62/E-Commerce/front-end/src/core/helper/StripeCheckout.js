import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { isAuthinticated } from '../../auth/helper';
import { emptyCart, loadCart } from './CartHelper';
import StripeCheckoutR from "react-stripe-checkout";
import { API } from '../../backend';
import { createOrder } from './OrderHelper';

export default function StripeCheckout({
    products,
    setReload = f=>f,
    reload = undefined
}) {

    const [ data, setData ] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const token = isAuthinticated() && isAuthinticated().token;
    const userId = isAuthinticated() && isAuthinticated().user._id;

    const finalPrize = ()=>{
        let amount = 0;
        
        products.map( p => {
            amount = amount + p.price;
        });

        return amount;
    };

    const makePayment = ( token )=>{
        const body = {
            token,
            products
        };

        const headers = {
            "Content-Type": "application/json"
        };

        return fetch( `${API}/stripe`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        } )
        .then( response => {
            console.log(response);
            // call further
            
        })
        .catch( error => console.log(error));
    };

    const showStripeButton = ()=>{
        return isAuthinticated() ? (
            <StripeCheckoutR
                stripeKey={ process.env.STRIPE_PUBLIC_KEY }
                token={ makePayment }
                amount={ finalPrize() * 100 }
                name="Buy Product"
                shippingAddress
                billingAddress
            >
                <button className="btn btn-success">
                    Pay with stripe !!
                </button>
            </StripeCheckoutR>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">signin</button>
            </Link>
        ) ;
    };

    return (
        <div>
            <h3>Stripe checkout...{ finalPrize() }</h3>
            { showStripeButton() }
        </div>
    );
};
