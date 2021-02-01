// JSX Practise..........................
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const date = new Date();
const currentTime = date.getHours();

let greetings;

const customeStyle = {
  color: ""
};

if( currentTime < 12 ){
  greetings = "Good Morning !!";
  customeStyle.color = "orange";
} else if( currentTime <= 16 ){
  greetings = "Good Afternoon !! ";
  customeStyle.color = "red";
} else if( currentTime <= 18 ){
  greetings = "Good Evening !!! ";
  customeStyle.color = "green";
} else{
  greetings = "Good Night !!!";
  customeStyle.color = "blue";
}
//---------------------Using inline styling....
ReactDOM.render(
  <h1 className="heading" style={customeStyle} >
                {greetings}
            </h1>,
  document.getElementById("root")
);

//---------------------Using Components...

// ReactDOM.render(
//   <App />,
//   document.getElementById("root")
// );
