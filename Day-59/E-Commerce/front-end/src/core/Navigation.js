import React from 'react'
import { Link, withRouter } from "react-router-dom";
import { isAuthinticated, signOut } from '../auth/helper';

const activeTab = ( history, path )=>{
    if( history.location.pathname === path ){
        return { color: "#2ecc72" };
    } else{
        return {
            color: "#FFFFFF"
        };
    }
};

function Navigation({ history }) {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link 
                    style={ activeTab( history, "/")} 
                    className="nav-link" 
                    to="/">
                    Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                    style={ activeTab( history, "/cart")} 
                    className="nav-link" 
                    to="/cart">
                    Cart
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                    style={ activeTab( history, "user/dashboard")} 
                    className="nav-link" 
                    to="/dashboard">
                    Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTab( history, "admin/adashboard")} 
                    className="nav-link" 
                    to="/adashboard">
                    Admin Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTab( history, "/signin")} 
                    className="nav-link" 
                    to="/signin">
                    Signin
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTab( history, "/signup")} 
                    className="nav-link" 
                    to="/signup">
                    Signup
                    </Link>
                </li>
                { isAuthinticated() && 
                <li className="nav-item">
                    <span className="nav-link text-warning"
                    onClick={()=>{
                        signOut(()=>{
                            history.push("/")
                        });
                    }}
                    >
                    Signout
                    </span>
                </li>
                }
            </ul>
        </div>
    )
};

export default withRouter(Navigation);