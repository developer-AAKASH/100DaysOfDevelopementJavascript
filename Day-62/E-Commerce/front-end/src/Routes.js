import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import AdminRoutes from './auth/helper/AdminRoutes';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import Home from './core/Home';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import UserDashBoard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategory from './admin/ManageCategory';
import AddProduct from './admin/AddProduct';
import ManageProduct from './admin/ManageProduct';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/cart" exact component={ Cart } />
                <PrivateRoutes path="/user/dashboard" exact component={ UserDashBoard } />
                <AdminRoutes path="/admin/dashboard" exact component={ AdminDashboard } />
                <AdminRoutes path="/admin/create/category" exact component={ AddCategory } />
                <AdminRoutes path="/admin/category" exact component={ ManageCategory } />
                <AdminRoutes path="/admin/create/product" exact component={ AddProduct } />
                <AdminRoutes path="/admin/product" exact component={ ManageProduct } />
                <AdminRoutes path="/admin/product/update/:productId" exact component={ UpdateProduct } />
            </Switch>
        </Router>
    )
};

