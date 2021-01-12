const Reviewer = require("./Reviewer.js");

let aakash = new Reviewer( "AakashIsBest", "aakash@thakkar.com");

console.log(aakash.getUserInfo());
aakash.setReviewCount( 5 );
console.log(aakash.getReviewCount());
console.log(aakash.getUserInfo());
