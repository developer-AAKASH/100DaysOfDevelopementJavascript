import React from "react";
import { FileWatcherEventKind } from "typescript";

// -------------Imparative Programming....
let isDone = false;
const strikeThrough = { textDecoration: "line-through" };

function strike(){
  // document.getElementById("root").style.textDecoration = "line-through";
  isDone = true;
}

function unStrike(){
  // document.getElementById("root").style.textDecoration = "";
  isDone = false;
}

function App() {
  let isDone = true;
  const strikeThrough = { textDecoration: "line-through" };

  /*
    So here, we use function to change the state of text but it not works because 
    the element is already loaded and it cant change state so using imperative programming, 
    if we want to acheive the same output as declarative programming, we have to use
    hooks which is next topic...
  */

  return (
    <div>
      <p style={ isDone ? { strikeThrough } : null }>Buy milk</p>
      <button onClick={strike}>Change to strike through</button>
      <button onClick={unStrike}>Change to un-strike</button>
    </div>
  );
}

// -------------Declarative Programming....
/*
  function App() {
  let isDone = true;
  const strikeThrough = { textDecoration: "line-through" };

  return (
    <div>
    // so here, the below element or part of interface is dependent upon the value of isDone variable 
    // And this kind of programming is known as a declarative programming... 
    <p style={ !isDone ? strikeThrough : null }>Buy milk</p>
    <button>Change to strike through</button>
    <button>Change back</button>
  </div>
);
}
*/

export default App;
