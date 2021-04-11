const expect = require("chai").expect;
// here x before both the function( describr and it ) denotes the pending testcase means, we will take kare of this test case after completing some other test case.
// xdescribe("GAME INSTANCE FUNCTIONS", ()=>{
//     describe("checkGameStatus", ()=>{
//         // only it function without any expectation, means without any function or callback, it consider as a pending test-case.
//         xit("should tell me when the game is over "); 
//     });
// });

describe( "GAME INSTANCE FUNCTIONS", ()=>{
    describe("checkGameStatus", ()=>{
        let checkGameStatus = require("../game_logic/game_instance").checkGameStatus;

        it("should tell me when the game is over", ()=>{
            let players = [
                {
                    ships: [
                        {
                            locations: [[ 0, 0 ]],
                            damage: [[ 0, 0 ]]
                        }
                    ]
                }
            ];

            let actual = checkGameStatus( players );
            expect( actual ).to.be.false;
        });
    });

    describe("takeTurn", ()=>{
        let takeTurn = require("../game_logic/game_instance").takeTurn;
        let guess, player;

        beforeEach(()=>{
            // A stub version, not an actual function, thats the concept of stubing in which we create dummy function with dummy input/data in order to complete our test case.
            guess = ()=>{
                return [0, 0];
            };

            player = {
                ships: [
                    {
                        locations: [[ 0, 0 ]],
                        damage: []
                    }
                ]
            };
        });

        it("should return false if the game ends", ()=>{
            let actual = takeTurn( player, guess );

            expect( actual ).to.be.false;
        });
    });

    const saveGame = ( callback )=>{
        setTimeout(()=>{
            callback();
        }, 1000 );
    };

    describe("saveGame", ()=>{
        // done argument is for aschronous...
        it("should update save status", (done)=>{
            let status = "game not saved...";

            saveGame(()=>{
                status = "game saved !!";
                // rather then writing the expect function after this, we write it inside this as it is going to wait for some time, and if we write outside
                // this function, it will never going to fail, as execution not going to wait for it and it will skipp this one and move on !!

                // So to saying the execution explictly for waiting, we write inside this function.
                expect( status ).to.equal("game saved !!");
                // done is kind of "next" of middleware, in which you can call once it is executed to transform the control onver the main execution.
                // check docs for more info.
                done();
            });

            // Aschronous function test-case...
            // expect( status ).to.equal("game saved !!");
        });
    });
});