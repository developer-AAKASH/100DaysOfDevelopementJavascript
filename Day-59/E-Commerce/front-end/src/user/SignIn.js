import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { authenticate, isAuthinticated, signIn } from "../auth/helper";
import Base from '../core/Base';

const SignIn = ()=>{
    const [ user, setUser ] = useState({
        email: "aakash@thakkar.com",
        password: "123456",
        error: "",
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = user;

    const { responseUser } = isAuthinticated();

    const handleChange = userName=>event=>{
        setUser({ ...user, error: false, [ userName ]: event.target.value });
    };

    const onSubmit = event =>{
        event.preventDefault();
        setUser({ ...user, error: false, loading:true });
        signIn({ email, password })
        .then( data=>{
            if( data.error ){
                setUser({ ...user, error: data.error, loading: false});
            } else{
                authenticate( data, ()=>{
                    setUser({
                        ...user,
                        email: "",
                        password: "",
                        error:"",
                        didRedirect: true
                    });
                });
            }
        })
        .catch( console.log("Signin request failed !!") );
    };

    const performRedirect = ()=>{
        // TODO
        if( didRedirect ){
            if( responseUser && responseUser.role === 1 ){
                return <p>redirect to admin!!</p>
            }

            return <p>redirect to user!!</p>
        }

        if( isAuthinticated() ){
            return <Redirect to="/" />
        }
    };

    const successMessage = ()=>{
        return(
            loading && ( <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>)
        );
    };

    const errorMessage = ()=>{
        return(
            <div className="alert alert-danger"
            style={{ display: error ? "" : "none"}}
            >
            {error}
            </div>
        );
    };

    const signInForm = ()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" type="text"
                            onChange={handleChange("email")}
                            value={email} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" type="text"
                            onChange={handleChange("password")}
                            value={password} />
                        </div>
                        <button onClick={onSubmit} className="btn btn-block btn-success">Submit</button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <Base title="Sign-in Page" description="A signin page...">
            {successMessage()}
            {errorMessage()}
            { signInForm() }
            { performRedirect() }
            <p className="text-white text-center">
                {JSON.stringify(user)}
            </p>
        </Base>
    );
};

export default SignIn;