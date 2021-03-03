import React from 'react'
import Navigation from './Navigation';

const Base = ({
    title="My title",
    description="My description",
    className="",
    children
})=>{
    return (
        <div>
            <Navigation />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you have any questions, feel free to contact us !!!</h4>
                    <button className="btn btn-warning btn-lg">Contact us</button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An <span className="text-white">amazing</span> place to shop...
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default Base;