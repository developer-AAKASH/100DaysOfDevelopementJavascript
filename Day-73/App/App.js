import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import Axios from "axios";
import { Button } from 'native-base';
import User from "./Components/User";

const App = ()=>{

	const [ userData, setUserData ] = useState(null);

	const fetchDetails = async()=>{
		try{
			const { data } = await Axios.get( "https://randomuser.me/api/" );
			const userData = data.results[0];

			setUserData( userData );
			console.log(userData);
		} catch( error ){
			console.log(error);
		}
	};

	useEffect( ()=>{
		fetchDetails();
	}, [] );

	if( !userData ){
		return(
			<View style={styles.container}>
			{/* Add Spinnner rather than simple text... */}
				<Text>Loading...</Text>
			</View>
		)
	} else{
		return(
			<>
				<StatusBar backgroundColor="red" />
				<View style={styles.container}>
					<View>
						<User
							details={userData}
						/>
						<Button rounded style={styles.button} onPress={ ()=> fetchDetails() }>
							<Text>New User</Text>
						</Button>
					</View>
				</View>
			</>	
		)
	}
}

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#222831"
	},
	button: {
		marginTop: 30,
		paddingHorizontal: 30
	}
});