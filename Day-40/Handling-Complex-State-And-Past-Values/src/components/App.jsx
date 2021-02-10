import React, { useState } from "react";

// Actual solution with Complex state-----------------------------------------------------------

function App() {
  const [ fullName, setFullName ] = useState({
    firstName: "",
    lastName: ""
  });

  function updateFullName(event) {
    const newFullName = event.target.value;
    const inputName = event.target.name;

    // we can use this object syntax for acheiving same result in place on seprate newFullName and inputName
    const { value, name } = event.target;

    console.log(newFullName);
    console.log(inputName);

    setFullName( ( previousValue )=>{
      // Dont use direct "event.target.name" in place of inputName, basically 
      // dont use event variable inside state function....never ever...
      if( inputName === "firstName"){
        return{
          firstName: newFullName,
          lastName: previousValue.lastName
        };
      } else if( inputName === "lastName" ){
        return{
          firstName: previousValue.firstName,
          lastName: newFullName
        };
      }
    });
    // setFullName( fname );
  }

  return(
    <div className="container">
      <h1>Hello {fullName.firstName} {fullName.lastName} </h1>
      <form>
        <input
          onChange={updateFullName}
          name="firstName"
          placeholder="First Name..."
          value={fullName.firstName}
        />
        <input
          onChange={updateFullName}
          name="lastName"
          placeholder="Last Name..."
          value={fullName.lastName}
        />
        <button>
          Submit
        </button>

      </form>
    </div>
  );
}


// Actual solution--------------------------------------------------------------------
/*
function App() {
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");

  function updateFirstName(event) {
    const fname = event.target.value;
    setFirstName( fname );
  }

  function updateLastName(event) {
    const lname = event.target.value;
    setLastName( lname );
  }

  return(
    <div className="container">
      <h1>Hello {firstName} {lastName} </h1>
      <form>
        <input
          onChange={updateFirstName}
          name="firstName"
          placeholder="First Name..."
          value={firstName}
        />
        <input
          onChange={updateLastName}
          name="lastName"
          placeholder="Last Name..."
          value={lastName}
        />
        <button>
          Submit
        </button>

      </form>
    </div>
  );
}
*/

// My solution--------------------------------------------------------------------
/*
function App() {
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ name, setName ] = useState("");

    function getFirstName( event ) {
        console.log("from getFirstName...");
        setFirstName( event.target.value );
    }

    function getLastName( event ) {
        console.log("from getLastName...");
        setLastName( event.target.value );
    }

    function getName( event ) {
      console.log("from getName...");
      setName( firstName + lastName );
      event.preventDefault();
    }

    return (
    <div className="container">
      <h1>Hello, { name } </h1>
      <form onSubmit={getName}>
          <input 
          onChange={getFirstName}
          onFocusCapture={getName} 
          name="firstName" 
          placeholder="First Name...."
          value={firstName}
           />
          <input 
          onChange={getLastName}
          onFocusCapture={getName} 
          name="lastName" 
          placeholder="Last Name...."
          value={lastName}
           />
          <button>Submit</button>
      </form>
    </div>
  );
}

*/

export default App;
