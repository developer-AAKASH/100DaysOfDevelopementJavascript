import React, { useState } from 'react';
import { 
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	StatusBar
} from 'react-native';

const App = ()=>{

	const [ colorName, setColorName ] = useState("rgb( 32, 0, 126)");

	const changeBackground = ()=>{
		let color = "rgb("+
		Math.floor(Math.random() * 256) +
			","+ 
		Math.floor(Math.random() * 256) +
			","+ 
		Math.floor(Math.random() * 256) +
			")"; 

		setColorName(color);
	};

	return(
		<>
		{/* <View style={{ backgroundColor: "rgb(32, 0, 126 )" }}> */}
			<StatusBar
				backgroundColor={colorName}
			 />
			<View style={[styles.container, {backgroundColor: colorName} ]}>
				<TouchableOpacity onPress={changeBackground}>
					<Text style={styles.text}>Click ME !!</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 30,
		backgroundColor: "#BB2CD9",
		paddingVertical: 10,
		paddingHorizontal: 40,
		color: "#FFFFFF",
		borderRadius: 15,
		textTransform: "uppercase"
	}
});