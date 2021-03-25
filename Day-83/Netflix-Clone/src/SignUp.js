import React, { useState } from 'react';
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    View,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    ToastAndroid
} from "react-native";
import { AuthContext } from "./context";
import database from "@react-native-firebase/database";
import auth from '@react-native-firebase/auth';

const SignUp = ({ navigation })=>{
    const [ userName, setUserName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ phoneNo, setPhoneNo ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    const { signUp } = React.useContext( AuthContext );

    const registerUser = ()=>{
        if( password !== confirmPassword ){
            alert("Password doesn't match !!!");
            return;
        }

        auth()
        .createUserWithEmailAndPassword( email, password )
        .then(( response )=>{
            const uid = response.user.uid;
            const data = {
                id: uid,
                userName,
                email,
                phoneNo
            };

            database()
            .ref(`Users/${ uid }`)
            .set(data)
            .then(()=>{
                ToastAndroid.show("Registered Succesfuly !!", ToastAndroid.LONG );
                signUp()
            })
            .catch( error => reject( error ) );
        })
        .catch((error)=>
            alert( error )
        );
    };

    return(
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#252525"
        }}>
            <StatusBar translucent backgroundColor="transparent" />
            <View 
                style={{
                    flex: 3,
                    padding: 30,
                    justifyContent: "center",
                    marginHorizontal: 30
                }}
            >
                <View style={{ paddingVertical: 10 }}>
                    <View style={{
                        flexDirection: "row",
                        padding: 5,
                        alignItems: "center",
                        borderRadius: 5
                    }}>
                        <TextInput 
                            placeholderTextColor="white"
                            placeholder="Username or Nickname..."
                            onChangeText={( text ) => setUserName( text ) }
                            value={ userName }
                            color={"white"}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{ paddingVertical: 10 }}>
                    <View style={{
                        flexDirection: "row",
                        padding: 5,
                        alignItems: "center",
                        borderRadius: 5
                    }}>
                        <TextInput 
                            placeholderTextColor="white"
                            placeholder="Email id..."
                            onChangeText={( text ) => setEmail( text ) }
                            value={ email }
                            color={"white"}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{ paddingVertical: 10 }}>
                    <View style={{
                        flexDirection: "row",
                        padding: 5,
                        alignItems: "center",
                        borderRadius: 5
                    }}>
                        <TextInput 
                            placeholderTextColor="white"
                            placeholder="Password..."
                            onChangeText={( text ) => setPassword( text ) }
                            value={ password }
                            color={"white"}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{ paddingVertical: 10 }}>
                    <View style={{
                        flexDirection: "row",
                        padding: 5,
                        alignItems: "center",
                        borderRadius: 5
                    }}>
                        <TextInput 
                            placeholderTextColor="white"
                            placeholder="Confirm password..."
                            onChangeText={( text ) => setConfirmPassword( text ) }
                            value={ confirmPassword }
                            color={"white"}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{ paddingVertical: 10 }}>
                    <View style={{
                        flexDirection: "row",
                        padding: 5,
                        alignItems: "center",
                        borderRadius: 5
                    }}>
                        <TextInput 
                            placeholderTextColor="white"
                            placeholder="Phone number..."
                            onChangeText={( text ) => setPhoneNo( text ) }
                            value={ phoneNo }
                            color={"white"}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{ paddingTop: 20 }}>
                    <TouchableOpacity 
                        style={styles.but}
                        onPress={()=>{
                            registerUser();
                        }}
                    >
                        <Text
                            style={ styles.buttonText }
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        paddingTop: 30,
                        justifyContent: "center"
                    }}
                >
                    <Text style={{ color: "white" }}>
                        Already have an account ?!
                    </Text>
                    <TouchableOpacity
                        onPress={ ()=>{
                            navigation.navigate("SignIn")
                        }}
                    >
                        <Text style={{ color: "#E50914", paddingHorizontal: 5 }}>
                            Login Here
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#252525"
    },
    image: {
        flex: 1
    },
    but: {
        alignItems: "center",
        backgroundColor: "#E50914",
        borderRadius: 5,
        padding: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 17,
        color: "white",
        paddingHorizontal: 10
    },
});

export default SignUp;