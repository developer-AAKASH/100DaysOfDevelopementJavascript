import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthinticated } from '../auth/helper';
import Base from '../core/Base';

const AdminDashboard = ()=>{

    const { user: { userName, email, role }} = isAuthinticated();

    const adminLeft = ()=>{
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link 
                            to="/admin/create/category"
                            className="nav-link text-success">
                        Create Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link 
                            to="/admin/category"
                            className="nav-link text-success">
                        Manage Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link 
                            to="/admin/create/product"
                            className="nav-link text-success">
                        Create Products
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link 
                            to="/admin/product"
                            className="nav-link text-success">
                        Manage Products
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link 
                            to="/admin/orders"
                            className="nav-link text-success">
                        Manage Orders
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminRight = ()=>{
        return (
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Username:</span>
                        { userName }
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email:</span>
                        { email }
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger mr-2">ADMIN</span>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Base 
            title="AdminDashboard page"
            description="Manage the things here..."
            className="container-fluid bg-success p-4"
            >
            <div className="row">
                <div className="col-3">{ adminLeft() }</div>
                <div className="col-9">{ adminRight() }</div>
            </div>
        </Base>
    )
};

export default AdminDashboard;
