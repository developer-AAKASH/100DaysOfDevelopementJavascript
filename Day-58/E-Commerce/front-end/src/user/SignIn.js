import React from "react";

import Base from '../core/Base';

const SignIn = ()=>{
    const signInForm = ()=>{
        return(
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input className="form-group" type="text" />
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input className="form-group" type="text" />
                    </div>
                    <button className="btn btn-success btn-block">Submit</button>
                </form>
            </div>
        </div>
        );
    };

    return (
        <Base title="Sign-in Page" description="A signin page...">
            { signInForm() }
        </Base>
    );
};

export default SignIn;