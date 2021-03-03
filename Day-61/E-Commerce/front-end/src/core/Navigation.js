import React, { Fragment } from 'react'
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
                { isAuthinticated() && isAuthinticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link 
                        style={ activeTab( history, "user/dashboard")} 
                        className="nav-link" 
                        to="/user/dashboard">
                        Dashboard
                        </Link>
                    </li>
                )}
                { isAuthinticated() && isAuthinticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link style={ activeTab( history, "admin/adashboard")} 
                        className="nav-link" 
                        to="/admin/dashboard">
                        Admin Dashboard
                        </Link>
                    </li>
                )}
                { !isAuthinticated() &&
                <Fragment>
                    <li className="nav-item">
                        <Link style={ activeTab( history, "/signup")} 
                        className="nav-link" 
                        to="/signup">
                        Signup
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link style={ activeTab( history, "/signin")} 
                        className="nav-link" 
                        to="/signin">
                        Signin
                        </Link>
                    </li>
                </Fragment>
                }
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