let player1 = Math.floor(( Math.random() * 6 )) + 1;

let player1Image = document.getElementsByClassName("img1")[0];

// console.log(player1 + " " + player2);

var randomImagePlayer1 = "images/dice" + player1 + ".png";

player1Image.setAttribute( "src", randomImagePlayer1 );
