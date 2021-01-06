let isEven = ( element ) => {
  return element % 2 === 0;
};

// another ways to use arrays.
console.log( [ 2, 4, 6, 8].every( isEven ) );// Every element has to be true with mentioned function so this will return true.

console.log( [ 2, 5, 6, 8].every( isEven ) );// This will return false as 5 is not even !!!

// another way to code above example is with arrow function...
// here, we have to write return keyword for generating result
console.log( [ 2, 4, 6, 8].every( ( number ) => { return number % 2 === 0; } ) );
// but is we dont wont to write return statement, there is another way...
console.log( [ 2, 4, 6, 8].every( ( number ) => ( number % 2 === 0 ) ) );
// we cal also avoid () this one like this...
console.log( [ 2, 4, 6, 8].every( ( number ) => number % 2 === 0 ) );
