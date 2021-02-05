import React from "react";

function Input( props ) {
    return(
        <input className="formText" type={props.type} placeholder={props.placeholder} />
    );
}

export default Input;