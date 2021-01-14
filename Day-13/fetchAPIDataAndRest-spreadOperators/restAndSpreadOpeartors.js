// syntax-1
function sum(...args){
    let sum = 0;

    for( const arg of args ){
        sum += arg;
    }

    return sum;
}
// syntax-2 if you want to consider first some element for some other purpose...
function sum( num1, num2, ...args){
    let multiply = num1 * num2;
    let sum = 0;

    for( const arg of args ){
        sum += arg;
    }

    return [sum, multiply];
}
console.log(sum(2, 3, 5, 7, 9, 12));