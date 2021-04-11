const checkForShip = require("./ship_methods").checkForShip;

const validateLocation = ( player, coordinates )=>{
    let x = coordinates[0];
    let y = coordinates[0];

    let spaceAvailable = !checkForShip( player, coordinates );

    if( ( x <= 9 && x >= 0 ) && ( y <= 9 && y >= 0 ) ){
        return spaceAvailable; // decide whether this valid space is occupied...
    } else{
        return false;
    }
};

const validateLocations = ( player, locations )=>{
    let validated = locations.map(( location )=>{
        return validateLocation( player, location );
    });

    return validated.indexOf( false ) === -1;
};

const placeShip = ( player, ship, startingCoordinate, direction )=>{

    if( !direction )
        throw Error("You left out the direction ! I need that for math !!");

    let propesedLocations = [];
    let previousLocation, rowNumber, columnNumber;

    for( let i = 0; i < ship.size; i++ ){
        previousLocation = previousLocations[i-1] || [];
        rowNumber = previousLocation[0];
        columnNumber = previousLocation[1];

        propesedLocations[i] = ( i === 0 )
        ? startingCoordinate :
        ( direction === "horizontal" ) ? 
        [ rowNumber, ++columnNumber ] :
        [ ++rowNumber, columnNumber ];
    }

    if( validateLocations( player, propesedLocations )){
        ship.locations = propesedLocations;
    } else{
        return false;
    }
};

const getRandomCoordinates = ()=>{
    let x = Math.floor( Math.random() * 9 );
    let y = Math.floor( Math.random() * 9 );

    return coordinates = [ x, y ];
};

const getRandomDirections = ()=>{
    return Math.random() > 0.5
    ? "horizontal"
    : "vertival";
};

fire( player, getRandomCoordinates() );
placeShip( player, ship, getRandomCoordinates(), getRandomDirections() );

const computeFire = ( player )=>{
    fire( player, coordinates );
};

const computePlaceShip = ( player, ship )=>{
    placeShip( player, ship, coordinates, direction );
};

module.exports = {
    placeShip: placeShip,
    validateLocation: validateLocation,
    validateLocations: validateLocations,
};