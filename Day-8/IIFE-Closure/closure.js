function init(){
    var firsName = "Aakash";
    console.log("From init...");
    function getFirstName(){
      console.log(firsName);
    }
    return getFirstName;
}

let getName = init();
getName(); // thats the closure...

// some more example of closure....
function addition( num1 ){
  return function( num2 ) {
    return num1 + num2;
  }
}
// here we are holding the reference of function and that function reference it still there in memory...
let add = addition(4); //this will dont perform addition
console.log(add(6)); // this will do addition...
console.log(addition(4)(7)); //Another way to do the same...
