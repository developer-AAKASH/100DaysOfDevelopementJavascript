import React from "react";
import Input from "./Input";

function Form( props ) {
  return (
    <form className="form">
      <Input 
        type="text"
        placeholder="Username"
      />

      <Input 
        type="password"
        placeholder="Password"
      />
      { !props.isRegister && <Input 
        type="password"
        placeholder="Confirm password"
      /> }
      
      <button type="submit">{ ( !props.isRegister ) ? "Register" : "Login" }</button>
    </form>
  );
}

export default Form;
/* <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" /> */