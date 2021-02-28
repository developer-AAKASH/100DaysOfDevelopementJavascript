import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import Home from './core/Home';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
            </Switch>
        </Router>
    )
}
