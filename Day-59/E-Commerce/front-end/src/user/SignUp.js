import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../auth/helper";
import Base from '../core/Base';

const SignUp = ()=>{

    const [ user, setUser ] = useState({
        userName: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { userName, email, password, error, success } = user;

    const handleChange = userName=>event=>{
        setUser({ ...user, error: false, [ userName ]: event.target.value });
    };

    const onSubmit = event =>{
        event.preventDefault();
        setUser({ ...user, error: false });
        signUp({ userName, email, password })
        .then( (data)=>{
            if( data.error ){
                setUser({ ...user, error: data.error, success: false });
            } else{
                setUser({ 
                    ...user,
                    userName: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true 
                });
            }
        })
        .catch( console.log("Error in signup") );
    };

    const successMessage = ()=>{
        return(
            <div className="alert alert-success"
            style={{ display: success ? "" : "none"}}
            >
            New Account added !!!. Please <Link to="/signin">Login here !!</Link>
            </div>
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

    const signUpForm = ()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Userame</label>
                            <input 
                            className="form-control" 
                            onChange={handleChange("userName")} 
                            value={userName}
                            type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input 
                            className="form-control" 
                            onChange={handleChange("email")}
                            value={email}
                            type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input 
                            className="form-control" 
                            onChange={handleChange("password")}
                            value={password}
                            type="text" />
                        </div>
                        <button 
                            className="btn btn-success btn-block"
                            onClick={onSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <Base title="Sign-up Page" description="A signup page...">
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    { successMessage() }
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    { errorMessage() }
                </div>
            </div>
            {signUpForm()}
            {/* <p className="text-white text-center">
                {JSON.stringify(user)}
            </p> */}
        </Base>
    );
};

export default SignUp;