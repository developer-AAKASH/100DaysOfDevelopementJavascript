import React, { useState } from "react";

function App() {
  const [ headingText, setHeadingText ] = useState("");

  const [ isMouseOver, setMouseOver ] = useState( false );

  const [ name, setName ] = useState( "" );

  function handleChange(event) {
    console.log(event.target.value);
    setName( event.target.value);
  }

  function handleClick( event ){
    setHeadingText( name );
    // this is for preventing next default behavior of the element...
    event.preventDefault();
    // THe below line set name as js object....
    // setHeadingText( {name} );
  }

  function handleMouseOver() {
    setMouseOver( true );
  }

  function handleMouseOut() {
    setMouseOver( false );
  }

  return (
    <div className="container">
      {/* <h1>{headingText}</h1> */}
      {/* In html, element themselves are responsible for handleing their own state... */}
      <h1>Hello, {headingText}</h1>
      <form onSubmit={handleClick}>
        <input type="text" 
        onChange={handleChange} 
        placeholder="What's your name?"
        // But in react, thats no true, we have to keep update them and that why we have written belowd line...
        // this way, we have one single source of truth...which is state of name...
        // and in react, this thing called controlled component( in react lingo..)
        value={name}
        />
        <button 
        style={{ backgroundColor: isMouseOver ? "black" : "white" }}
        // onClick={handleClick} 
        onMouseOut={ handleMouseOut } 
        onMouseOver={ handleMouseOver }
        type="submit"
        >Submit</button>
      </form>
    </div>
  );
}
/*
App.jsx file for understanding ClassComponent and Functional Component...
----------------------------------App.jsx--------------------------------------
import React, { useState } from "react";
import ClassComponent from "./ClassComponents";
import FunctionalComponent from "./FunctionalComponent";

function App() {
    return (
    <div>
      <ClassComponent />
      <FunctionalComponent />
    </div>
  );
}
*/

export default App;
