import { API } from '../../backend';

// Category calling
export const addCategory = ( userId, token, categoryName )=>{
    return fetch(`${API}category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify( categoryName )
    })
    .then( response=>{
        return response.json();
    })
    .catch( error=> console.log(error) );
};

export const getCategories = ()=>{
    return fetch( `${API}/categories`, {
        method: "GET"
    }).then( response =>{
        return response.json();
    })
    .catch( error => console.log(error));
};

// products calling
export const addProduct = ( userId, token, product )=>{
    return fetch( `${API}/product/add/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then( response =>{
        return response.json();
    }).catch( error => console.log(error) );
};

export const getProduct = ()=>{
    return fetch( `${API}/products`, {
        method: "GET"
    }).then( response =>{
        return response.json();
    })
    .catch( error => console.log(error));
};

export const getAProduct = productId =>{
    return fetch(
        `${API}/product/${productId}`,
        {
            method: "GET"
        }).then( response =>{
            return response.json();
        })
        .catch( error => console.log(error)
    );
};

export const updateProduct = ( productId, userId, token, product )=>{
    return fetch(
        `${API}/product/${productId}/${userId}`,
        {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product
        })
        .then( response => {
            return response.json();
        })
        .catch( error => console.log(error)
    );
};

export const deleteProduct = ( userId, productId, token )=>{
    return fetch(
        `${API}/product/${productId}/${userId}`,
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then( response => {
            return response.json();
        })
        .catch( error => console.log(error)
    );
};