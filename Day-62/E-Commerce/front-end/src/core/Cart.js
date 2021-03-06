import React, { useEffect, useState } from 'react';
import "../style.css";
import { API } from "../backend";
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import StripeCheckout from './helper/StripeCheckout';


export default function Cart() {

    const [ products, setProducts] = useState([]);
    const [ reload, setReload ] = useState(false);

    useEffect(() => {
        setProducts( loadCart );
    }, [ reload ])

    const loadAllProduct = ()=>{
        return (
            <div>
                <h2>This is section is to load products !!!</h2>
                { products.map(( product, index )=>{
                    return(
                        <Card 
                            key={ index }
                            product={ product }
                            addtoCart={ false }
                            removeFromCart={ true }
                            setReload={ setReload }
                            reload={ reload }
                        />
                    );
                })}
            </div>
        );
    };

    const loadCheckout = ()=>{
        return (
            <div>
                <h2>Checkout !!!</h2>
            </div>
        );
    };

    return (
        <Base title="Cart Page" description="Ready to Buy...">
            <div className="row text-center">
                <div className="col-6">{ loadAllProduct() }</div>
                <div className="col-6">
                    <StripeCheckout
                        products={ products }
                        setReload={ setReload }
                     />
                </div>
            </div>
        </Base>
    )
}
