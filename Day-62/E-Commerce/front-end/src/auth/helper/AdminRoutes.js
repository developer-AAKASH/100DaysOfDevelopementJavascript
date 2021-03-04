import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthinticated } from './index';

const AdminRoutes = ({ component: Component, ...rest })=>{
    return (
        <Route 
            {...rest}
            render={ props=>
                isAuthinticated() && isAuthinticated().user.role === 1 ? (
                    <Component {...props} />
                ) : (
                    <Redirect 
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

export default AdminRoutes;