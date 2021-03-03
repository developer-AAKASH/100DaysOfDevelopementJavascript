import React from 'react'
import { API } from '../../backend';

export default function ImageHelper({ product }) {
    return (
        <img 
            src={`${API}/product/photo/${product._id}`}
            alt=""
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="mb-3 rounded"
        />
    );
};