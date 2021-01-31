// JSX Practise..........................
import React from "react";
import ReactDOM from "react-dom";

const name = "Aakash";
const currentDate = new Date();

const year = currentDate.getFullYear();

ReactDOM.render(
  <div>
    <p> Created by {name} </p>
    <p> Copyright {year} </p>
  </div>,
  document.getElementById("root")
);

// ----------------------------------------------------
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <div>
    // <h1 class="heading">My Favourite Food</h1> this will work but...
    <h1 className="heading" contentEditable="true" spellCheck="false">My Favourite Food</h1> // this is right way to do
    // and change type = "text/JSX" in index.js file as this code is JSX code.
    <ul>
      <li>Tea</li>
      <li>Tea</li>
      <li>Tea</li>
    </ul>
  </div>,
  document.getElementById("root")
);
// ----remove ul and replace it with images with height of 100px....
// javascript attributes using lorem picsum ...
// if you dont close the self-closing tag then in html its dont bother attributes
// JSX it gives you error...
