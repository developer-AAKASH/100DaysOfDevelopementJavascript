const { fire } = require("./ship_methods");

const checkGameStatus = ( players )=>{
    // for continuous running until and unless all the test cases not get passed or when we make changes in file and the other testcases not get failed, we can continuous watch the things and using this "watch" flag we can do the same.
    // mocha --watch ./test/game_test.js ./game_logic/game_instance.js
    return false;
};

const takeTurn = ( opposingPlayer, guessFunction )=>{
    let coordinates = guessFunction();
    fire( opposingPlayer, coordinates );
    let gameOver = checkGameStatus();

    return gameOver;
};

module.exports.checkGameStatus = checkGameStatus;
module.exports.takeTurn = takeTurn;