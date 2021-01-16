// like native modules, you can go on npmjs.org and search for any package and read ther how to install and use that package.
// here for example i am installing "superheros and supervillans packaeg"
// npm install superheroes
// npm install supervillans

// Here I am importing them in this file...
const superheroes = require('superheroes');
const supervillains = require('supervillains');

// From documentation, I can use its methods....
// 1. all the name of super heros and supervillains...
console.log( superheroes.all );
console.log( supervillains.all );

// 2. any randome name form the list of superheros and supervillains...
// console.log( "SuperHero VS SuperVillains :::------->> " );
// console.log( superheroes.random() + " VS. " +supervillains.random() );