import React, { useState } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar
} from 'react-native';

import DiceOne from './assets/dice1.png';
import DiceTwo from './assets/dice2.png';
import DiceThree from './assets/dice3.png';
import DiceFour from './assets/dice4.png';
import DiceFive from './assets/dice5.png';
import DiceSix from './assets/dice6.png';

const App = ()=>{

    const [ diceUri, setDiceUri ] = useState( DiceOne );

    const spingTheDice = ()=>{
        let randomeNum = Math.floor(Math.random() * 6) + 1;

        switch( randomeNum ){
            case 1:
                setDiceUri( DiceOne );
            break;

            case 2:
                setDiceUri( DiceTwo);
            break;

            case 3:
                setDiceUri( DiceThree );
            break;

            case 4:
                setDiceUri( DiceFour );
            break;

            case 5:
                setDiceUri( DiceFive );
            break;

            case 6:
                setDiceUri( DiceSix );
            break;

            default:
                setDiceUri( DiceOne );
            break;
        }
    };

    return(
        <>
            <StatusBar 
                backgroundColor="#222831"
            />
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={diceUri}
                 />
                <TouchableOpacity onPress={ spingTheDice }>
                    <Text style={ styles.playButton }>Spin It !!</Text>
                </TouchableOpacity>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222831",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: 200,
        height: 200
    },
    playButton: {
        fontSize: 20,
        marginTop: 30,
        color: "#F2A365",
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderColor: "#30475E",
        borderRadius: 5,
        borderWidth: 3,
        fontWeight: "bold"
    }
});

export default App;
