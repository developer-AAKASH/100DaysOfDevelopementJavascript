let stringNullValue = "null";
let undefinedValue;
let nullValue = null;

console.log( stringNullValue );
console.log( undefinedValue );
console.log( nullValue );
// This will return true because "==" check whether value is same or not
if( stringNullValue == nullValue ){
	console.log( "true" );
} else{
	console.log( "false" );
}
// Where "===" will check value and datatype both is same or not... so below if-else return false because datatype will not match...
if( stringNullValue === nullValue ){
	console.log( "true" );
} else {
	console.log( "false" );
}


