let countries = [ "INDIA", "usa", "Russia", "New zealand", "Australia" ];

// console.log(countries.pop()); delete last element of the array.
// console.log(countries);
//
// countries.unshift("Updated value"); //add this new value at begining of the array.
//
// console.log(countries);
//
// countries.shift(); // delete first element of the array.
//
// console.log(countries);
//
// console.log(Array.from("Aakash")); //THis will create character array with string Aakash.
//
// console.log(countries.indexOf( "Russia" )); //Return index of mentioned element starting from 0.
// ---------------------------------------------------
// fill and filter function...
// another ways to declare an array...
var numArray = new Array( 2, 3, 5, 7, 9, 11, 13 );

// numArray.fill( 0 ); //THis will fill the whole array with 0...

console.log( numArray );

//This will fill the whole array with "A"
// numArray.fill( "A" );
// console.log( numArray );

//This will fill the whole array with "A" starting from index 2
// numArray.fill( "A", 2 );
// console.log( numArray );

//This will fill the whole array with "A" starting from 3(including) to 6(excluding)
// numArray.fill( "A", 3, 6 );
// console.log( numArray );

// THis will return the array of element which satisfy mentioned function
let result = numArray.filter( ( num )=> { return num > 10 } );
console.log( result );

//Simply cut or slice the whole array from given index considerd as starting index
// console.log( countries.slice( 1 ) );

//Simply cut or slice the whole array from given starting index and end index.
// console.log( countries.slice( 1, 3 ) );

// This will remove the element from 0 (including) to 3(excluding )and add "Gujarat" at that index
countries.splice( 0, 3, "Gujarat" )
console.log( countries );

// This will also remove the element from 0 (including) to 3(excluding )and add "Gujarat" and "Goa" at that index. we can mention whole string array here in argument...
countries.splice( 0, 3, "Gujarat", "Goa" )
console.log( countries );

let states = [ "Gujarat", "Goa", "Punjab", "Rajasthan"];

countries.splice( 0, 3, states );
console.log( countries );
