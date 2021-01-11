const User = require("./classes.js");

let aakash = new User( "AakashIsBest", "aakash@thakkar.in");

console.log(aakash.getUserInfo());

aakash.addFriend( "Rahil" );
aakash.addFriend( "Aakash Dubey" );
// this will populate single friend from the list.
let aakashFriendList = aakash.getFriendList();
aakashFriendList.forEach(( friend ) => {
  console.log(friend);
});

// after priviting the variables, this will not work as members are private...
console.log(aakash);
