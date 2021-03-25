import React, { useState, useEffect } from 'react';
import SignUp from "./src/SignUp"
import SignIn from "./src/SignIn";
import Home from "./src/Home";
import Login from "./src/Login";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "./src/context";

const AuthDone = createStackNavigator();
const AuthDoneScreen = ()=>{
	return(
    	<AuthDone.Navigator headerMode="none">
        	<AuthDone.Screen name="Home" components={Home} />
    	</AuthDone.Navigator>
	)
};

const AuthNotDone = createStackNavigator();
const AuthNotDoneScreen = ()=>{
	return(
		<AuthNotDone.Navigator headerMode="none">
			<AuthNotDone.Screen name="SignIn" components={SignIn} />
			<AuthNotDone.Screen name="SignUp" components={SignUp} />
			<AuthNotDone.Screen name="LogIn" components={Login} />
    	</AuthNotDone.Navigator>
	)
};

const App = ()=>{
    const [ initializing, setInitializing ] = useState(true);
    const [ user, setUser ] = useState();
    const authContext = React.useMemo(
        ()=>({
            signIn: async ()=>{
                const subscriber = auth().onAuthStateChanged( onAuthStateChanged );
            },
            signOut: async ()=>{
                setInitializing(true);
                const subscriber = auth().onAuthStateChanged( onAuthStateChanged );
            },
            signUp: async ()=>{
                const subscriber = auth().onAuthStateChanged( onAuthStateChanged );
            },
        }),
        []
    );

	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}
    
    useEffect( ()=> {
        const subscriber = auth().onAuthStateChanged( onAuthStateChanged );
        return subscriber;
    }, []);
    
    if( initializing )
        return null;
    
    return(
        <AuthContext.Provider value = { authContext }>
            {
                !user ? (
                    <NavigationContainer>
                        <AuthNotDoneScreen />
                    </NavigationContainer>
                ) : (
                    <NavigationContainer>
                        <AuthDoneScreen />
                    </NavigationContainer>
                )
            }
        </AuthContext.Provider>
    );
    
};

export default App;
