import React, { useState } from 'react'
import { RNCamera } from "react-native-camera";
import {
	SafeAreaView,
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Button,
	Text,
	StatusBar,
	Touchable
} from 'react-native';

const LoadingView = ()=>{
	return(
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Text style={{ fontSize: 30, color: "red" }}>Loading...</Text>
		</View>
	)
};

export default function App() {

	const [ image, setImage ] = useState(null);

	const takePicture = async( camera )=>{
		try{
			const data = await camera.takePictureAsync({
				quality: 0.9,
				base64: false
			});

			setImage( data.uri );
		} catch( error ){
			console.warn(error);
		}
	}

	return(
		<>
			<StatusBar backgroundColor="#0A79DF" />
			<View 
				style={ styles.container }
			>
			{ image ? 
				( 
					<View style={styles.preview}>
						<Text style={styles.cameraText}>Here is your Profile Picture....</Text>
						<Image
							style={styles.clicked}
							source={{uri: image, width: "100%", height: "100%" }}
						 />
						 <Button
						 	title="Click another image"
							onPress={()=>{
								setImage(null)
							}}
						 >

						 </Button>
					</View>					
				) :
				(
					<RNCamera
						style={ styles.preview }
						type={ RNCamera.Constants.Type.back }
						captureAudio={ false }
						flashMode={ RNCamera.Constants.FlashMode.on }
						androidCameraPermissionOptions={{
							title: "Permission to use camera...",
							message: "longer text to use camera...",
							buttonPositive: "Allow",
							buttonNegative: "Decline"
						}}
						androidRecordAudioPermissionOptions={{
							title: "Permission to use audio...",
							message: "longer text to use audio...",
							buttonPositive: "Allow",
							buttonNegative: "Decline"
						}}
					>
						{
							({ camera, status })=>{
								if( status !== "READY" )
									return <LoadingView />
								
								return(
									<View
										style={{
											flexDirection: "row",
											flex: 0,
											justifyContent: "center"
										}}
									>
										<TouchableOpacity
											style={ styles.capture }
											onPress={
												()=> takePicture( camera )
											}
										>
											<Text>Take a Picture</Text>
										</TouchableOpacity>
									</View>
								)
							}
						}
					</RNCamera>
				) 
			}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#0A79DF"
	},
	preview: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: 'center'
	},
	capture: {
		flex: 0,
		backgroundColor: "orange",
		padding: 20,
		alignSelf: "center"
	},
	cameraText: {
		backgroundColor: "#3498DB",
		color: "#FFFFFF",
		marginBottom: 10,
		width: "100%",
		textAlign: "center",
		paddingVertical: 20,
		fontSize: 25
	},
	clicked: {
		width: 300,
		height: 300,
		borderRadius: 150
	}
});
