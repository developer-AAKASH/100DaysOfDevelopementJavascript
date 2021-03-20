import auth from "@react-native-firebase/auth";
import Snackbar from "react-native-snackbar";
import database from '@react-native-firebase/database';

export const signUp = ( data )=>async( dispatch )=>{
    console.log(data);
    const { name, instaUserName, gitHubUserName, bio, email, password, country, image } = data;

    auth()
    .createUserWithEmailAndPassword( email, password )
    .then(( data )=>{
        console.log(data);
        console.log("User created succesfuly !!");

        database()
        .ref('/users/' + data.user.uid )
        .set({
            uid: data.user.uid,
            name, 
            instaUserName,
            gitHubUserName,
            country,
            image,
            bio
        })
        .then(()=> console.log("Data set done !!"));

        Snackbar.show({
            text: "Account created",
            textColor: "green",
            backgroundColor: "#1b262c"
        });
    })
    .catch( (error) => {
        console.error( error );
        Snackbar.show({
            text: "Sign-up failed !!",
            textColor: "red",
            backgroundColor: "#1b262c"
        });
    })
};

export const signIn = ( data )=>async( dispatch )=>{
    console.log(object);
    const { email, password } = data;

    auth()
    .signInWithEmailAndPassword( email, password )
    .then(()=>{
        console.log("Sign-in succesfuly !!!");
        Snackbar.show({
            text: "Sign-in succecesfuly !!",
            textColor: "green",
            backgroundColor: "#1b262c"
        });
    })
    .catch(( error )=>{
        console.error(error);
        Snackbar.show({
            text: "Sign-in failed !!!",
            textColor: "red",
            backgroundColor: "#1b262c"
        });
    });
};

export const signOut = ()=> async( dispatch )=>{
    auth()
    .signOut()
    .then(()=>{
        console.log("Sign-out succesfuly !!!");
        Snackbar.show({
            text: "Sign-out succecesfuly !!",
            textColor: "green",
            backgroundColor: "#1b262c"
        });
    })
    .catch((error)=>{
        console.error(error);
        
        Snackbar.show({
            text: "Sign-out failed !!!",
            textColor: "red",
            backgroundColor: "#1b262c"
        });
    });
};