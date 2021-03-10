npm install react-native-snackbar

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,

} from 'react-native';

import Snackbar from 'react-native-snackbar';

const currencyPerRs = {
    DOLLAR: 0.014,
    EURO: 0.012,
    POUND: 0.011,
    RUBEL: 0.93,
    AUSDOLLAR: 0.2,
    CANDOLLAR: 0.019,
    YEN: 1.54,
    DINAR: 0.0043,
    BITCOIN: 0.000004
};

const App = () => {
    const [ inputValue, setInpueValue ] = useState(0);
    const [ resultValue, setResultValue ] = useState(0);

    const buttonPressed = (currency)=>{
        if( !inputValue ){
            return Snackbar.show({
                text: "Input is Empty !!!",
                backgroundColor: "#EA7773",
                textColor: "#FFFFFF",
            });
        }

        let result = parseFloat( inputValue ) * currencyPerRs[currency];

        setResultValue(result.toFixed(2));
    };
    
return (
    <>
        <StatusBar backgroundColor="#1b262c" />
        <ScrollView backgroundColor="#1b262c"
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic"
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.resultContainer}>
                    <Text style={styles.resultValue}>{ resultValue }</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={}
                        keyboardType="numeric"
                        placeholder="Enter amount to be converted"
                        placeholderTextColor="#c1c1c1"
                        value={ inputValue }
                        onChangeText={ ( inputValue )=> setInpueValue( inputValue ) }
                        onTextInput
                    >

                    </TextInput>
                </View>
                <View style={styles.convertButtonContainer}>
                    { Object.keys(currencyPerRs).map(( currency )=>(
                        <TouchableOpacity 
                            key={currency}
                            onPress={()=> buttonPressed(currency)}
                            style={ styles.convertButtonContainer}
                        >
                            <Text style={styles.convertButtonText}>{ currency }</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </SafeAreaView>
        </ScrollView>
    </>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1b262c",

    },
    resultContainer: {
        height: 70,
        marginTop: 80,
        justifyContent: 'center',
        borderColor: "#bbe1af",
        borderWidth: 2,
        alignItems: 'center'
    },
    resultValue: {
        fontSize: 30,
        color: "#FFF",
        fontWeight: "bold",
    },
    inputContainer: {
        height: 70,
        marginTop: 10,
        justifyContent: 'center',
        borderColor: "#bbe1fa",
        borderWidth: 2,
        alignItems: 'center'
    },
    input: {
        fontSize: 30,
        textAlign: "center",
        color: "#FFFFFF",
    },
    convertButtonContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,

    },
    convertorButton: {
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: "33.3%",
        borderWidth: 2,
        borderColor: "#bbe1fa",
        marginTop: 10,
        backgroundColor: "#0f4c75"
    },
    convertButtonText: {
        color: "#FFF",
        fontSize: 15,

    }
});

export default App;

