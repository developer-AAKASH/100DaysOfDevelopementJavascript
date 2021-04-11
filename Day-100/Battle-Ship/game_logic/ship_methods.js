const checkForShip = ( player, coordinates )=>{
    let shipPresent, ship;

    for( let i = 0; i < player.ships.length; i++ ){
        ship = player.ships[i];

        shipPresent = ship.locations.filter(( actualCordinates )=>{
            return ( actualCordinates[0] === coordinates[0] ) && ( actualCordinates[1] === coordinates[1] );
        })[0];

        if( !shipPresent ){ // for report no ship at a given players coordinate
            // return false;
        }
        else{ // for report a ship located at the given coordinate.
            return ship;
        }
    }

    return false;
};

const damageShip = ( ship, coordinates )=>{
    ship.damage.push( coordinates );
};

const fire = ( player, coordinates )=>{
    const ship = checkForShip( player, coordinates );

    if( ship ){
        damageShip( ship, coordinates );
    }
    
};

module.exports.checkForShip = checkForShip;
module.exports.damageShip = damageShip;
module.exports.fire = fire;