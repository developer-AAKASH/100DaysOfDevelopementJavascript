import React, { useState } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, Text } from "react-native";
import {
    Container,
    Form,
    Item,
    Input,
    Text,
    Button,
    Thumbnail,
    Content
} from "native-base";
import storage from "@react-native-firebase/storage";
import ProgressBar from "react-native-progress/Bar";
import ImagePicker from "react-native-image-picker";
import { options } from "../utils/Options";

// redux
import propTypes from "prop-types";
import { signUp } from "../action/auth";
import { connect } from "react-redux";

const SignUp = ({ signUp })=>{

    const [ name, setName ] = useState('');
    const [ instaUserName, setInstaUserName ] = useState('');
    const [ gitHubUserName, setGitHubUserName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ image, setImage ] = useState('https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png');
    const [ bio, setBio ] = useState('');

    const [ imageUploading, setImageUploading ] = useState(false);
    const [ uploadStatus, setUploadStatus ] = useState(null);

    const chooseImage = async()=>{
        ImagePicker.showImagePicker( options, ( response )=>{
            console.log("Response", response);

            if( response.didCancel ){
                console.log("User cancelled Image picker");
            } else if( response.error ){
                console.log("Image Picker Error: ", response.error );
            } else if( response.customButton ){
                console.log("User taps custome button", response.customButton);
            } else{
                // const source = { uri: response.uri };
                console.log(response);
                uploadImage( response );
            }
        });
    };

    const uploadImage = async( response )=>{
        setImageUploading( true );
        const reference = storage().ref( response.fileName );
        const task = reference.putFile( response.path );
        task.on("state_changed", ( taskSnapShot)=>{
            const percentage = ( taskSnapShot.bytesTransferred / taskSnapShot.totalBytes ) * 1000;
            setUploadStatus( percentage );
        });

        task.then( async()=>{
            const url = await reference.getDownloadURL();

            setImage( url );
            setImageUploading(false);
        })
    };

    const doSignUp = async()=>{
        signUp({ name, instaUserName, gitHubUserName, bio, country, email, password, image });

    };

    return (
        <>
            <Text>SignUp.js</Text>
        </>
    )
};

const mapDispatchToProps = {
    signUp: ( data )=>signUp(data)
};

SignUp.propTypes = {
    signUp: propTypes.func.isRequired
};

export default connect( null, mapDispatchToProps )(SignUp);