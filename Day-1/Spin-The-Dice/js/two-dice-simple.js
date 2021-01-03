let player1 = Math.floor(( Math.random() * 6 )) + 1;
let player2 = Math.floor(( Math.random() * 6 )) + 1;

let player1Image = document.getElementsByClassName("img1")[0];
let player2Image = document.getElementsByClassName("img2")[0];

// console.log(player1 + " " + player2);

var randomImagePlayer1 = "images/dice" + player1 + ".png";
var randomImagePlayer2 = "images/dice" + player2 + ".png";

player1Image.setAttribute( "src", randomImagePlayer1 );
player2Image.setAttribute( "src", randomImagePlayer2 );

