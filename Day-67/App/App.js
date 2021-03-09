import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Sound from 'react-native-sound';

const soundList = [
  require('./assets/one.wav'),
  require('./assets/two.wav'),
  require('./assets/three.wav'),
  require('./assets/four.wav'),
  require('./assets/five.wav'),
  require('./assets/six.wav'),
  require('./assets/seven.wav'),
  require('./assets/eight.wav'),
  require('./assets/nine.wav'),
  require('./assets/ten.wav')
];

const App = ()=>{

	const playSound = (sound)=>{
		const soundObj = new Sound( sound, Sound.MAIN_BUNDLE, ( error )=>{
			if( error ){
				console.log("Error while playing the sound !!!");
			}
		});

		setTimeout( ()=>{
			soundObj.play();
		}, 500);

		soundObj.release();
	};

	return(
		<>
			<StatusBar backgroundColor="#1b262c" />
			<ScrollView style={styles.container}>
				<Image
					style={styles.logo}
					source={require('./assets/logo.png')}
				/>
				<View style={styles.gridContainer}>
					{soundList.map(( sound )=>(
						<TouchableOpacity 
							key={sound}
							onPress={()=>{
								playSound(sound);
							}}
							style={styles.box}
						>
							<Text style={styles.text}>{sound}</Text>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</>
	)
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1b262c"
	},
	logo: {
		alignSelf: "center",
		marginTop: 15
	},
	gridContainer: {
		flex: 1,
		margin: 5,
		// Default direction of flex for a mobile phone is top to bottam and 
		// We are just changig it to left to right as per our requirenment...
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "space-around",

	},
	box: {
		height: 110,
		alignItems: "center",
		justifyContent: "center",
		width: "46%",
		marginVertical: 6,
		backgroundColor: "#0f4c75",
		borderRadius: 5,
		shadowColor: "#393e46",
		elevation: 5,
		shadowRadius: 4
	},
	text: {
		fontSize: 50,
		color: "#ff4301"
	}
});
