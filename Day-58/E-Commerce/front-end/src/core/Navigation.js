import React from 'react'
import { Link, withRouter } from "react-router-dom";

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
                    <Link style={ activeTab( history, "/")} className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTab( history, "/cart")} className="nav-link" to="/cart">
                        Cart
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTab( history, "/dashboard")} className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTab( history, "/adashboard")} className="nav-link" to="/adashboard">
                        Admin Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTab( history, "/signin")} className="nav-link" to="/signin">
                        SignIn
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTab( history, "/signout")} className="nav-link" to="/signout">
                        SignOut
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTab( history, "/signup")} className="nav-link" to="/signup">
                        SignUp
                    </Link>
                </li>
            </ul>
        </div>
    )
};

export default withRouter(Navigation);