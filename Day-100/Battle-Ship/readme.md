While doing the optimization with testing, there are some phases !!

1). Set-up phase:
    -> Set-up phase is the phase where you got required resources to start the test or test your code.
    -> It is kind of constructor, means before starting the testing, what resource or data you want in order to start the test.

    --> Set-up phase also further divided into 2 type:
    i). Set-up required "before entire serise of tests" :
        -> Such kind of required resources will be imported or settle before starting the group of tests.

    ii). Set-up required "before each and every tests" :
        -> Such a setup is fullfilled before starting each and every tests.

2). Teardown:
    -> On more phase is "Teardown" in which we deallocate the resources or free the resources which we accuire while doing the test.
    -> It is kind of constructor, where we free or deallocate the resource and free up the memory.

3). Covering edge cases: 
    -> Well we usually do test of that cases where we can get failed, but we supposed cover that cases where we ca unexpected cases too.
    -> Thats where such a phase comes in a picture, mocha framework have some wonderful pre-defiened methods which can help us to cover such a edge cases.


---------------------------------------------------------------------------------
/*
--PACKAGE.JSON

"scripts": {
    "test": "mocha",
    // below command for allowing the watch for all the modules
    "test:watch": "mocha --watch ./test ./",
    // below command is for allowing some particular module for testing with watching...
    "test:watch:playerMethods": "mocha --watch ./test/player_test.js ./game_logic/player_methods.js"
  },

*/

