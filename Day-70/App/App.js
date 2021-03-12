import React, { useState } from 'react'
import {
	StyleSheet,
	View,
	TouchableOpacity,
	StatusBar
} from "react-native";
import {
	Text,
	Container,
	Content,
	Header,
	Body,
	Card,
	H1, H3,
	Button
} from "native-base";
import Icons from "./Components/Icons";
import Snackbar from 'react-native-snackbar';
import Title from 'native-base/Components/Widgets/Title';

const gridArray = new Array(9).fill("empty");

export default function App() {

	const [ isCross, setIsCross ] = useState(false);
	const [ winMessage, setWinMessage ] = useState("");

	const changeItem = ( itemNumber )=>{
		if( winMessage ){
			return Snackbar.show({
				text: winMessage,
				backgroundColor: "#000",
				textColor: "#FFF"
			});
		}

		if( gridArray[ itemNumber ] == "empty" ){
			gridArray[ itemNumber ] = isCross ? 'Cross' : 'Circle';
			setIsCross( !isCross );
		} else{
			return Snackbar.show({
				text: "Wrong Choice !!!",
				backgroundColor: "red",
				textColor: "#FFF"
			});
		}

		checkIsWinner();
	};

	const reloadGrid = ()=>{
		setIsCross(false);
		setWinMessage("");
		gridArray.fill("empty", 0, 9 );
	}

	const checkIsWinner = ()=>{
		if(
			gridArray[0] === gridArray[1] &&
			gridArray[1] === gridArray[2] &&
			gridArray[0] !== "empty"
		){
			setWinMessage(`${gridArray[0]} won !!`)
		}
		else if(
			gridArray[3] === gridArray[4] &&
			gridArray[4] === gridArray[5] &&
			gridArray[3] !== "empty"
		){
			setWinMessage(`${gridArray[3]} won !!`)
		}
		else if(
			gridArray[6] === gridArray[7] &&
			gridArray[7] === gridArray[8] &&
			gridArray[6] !== "empty"
		){
			setWinMessage(`${gridArray[6]} won !!`)
		}
		else if(
			gridArray[0] === gridArray[3] &&
			gridArray[3] === gridArray[6] &&
			gridArray[0] !== "empty"
		){
			setWinMessage(`${gridArray[0]} won !!`)
		}
		else if(
			gridArray[1] === gridArray[4] &&
			gridArray[4] === gridArray[7] &&
			gridArray[1] !== "empty"
		){
			setWinMessage(`${gridArray[1]} won !!`)
		}
		else if(
			gridArray[2] === gridArray[5] &&
			gridArray[5] === gridArray[8] &&
			gridArray[2] !== "empty"
		){
			setWinMessage(`${gridArray[2]} won !!`)
		}
		else if(
			gridArray[0] === gridArray[4] &&
			gridArray[4] === gridArray[8] &&
			gridArray[0] !== "empty"
		){
			setWinMessage(`${gridArray[0]} won !!`)
		}
		else if(
			gridArray[2] === gridArray[4] &&
			gridArray[4] === gridArray[6] &&
			gridArray[2] !== "empty"
		){
			setWinMessage(`${gridArray[2]} won !!`)
		}
	}

	return(
		<>
			<StatusBar backgroundColor="" />
			<Container style={{ backgroundColor: "#333945", padding: 5 }}>
				<Header>
					<Body>
						<Title>
							TicTacToe Game
						</Title>
					</Body>
				</Header>
				<Content>
					<View style={styles.grid}>
						{ gridArray.map(( item, index )=>{
							return (
								<TouchableOpacity
									style={styles.box}
									key={index}
									onPress={
										()=> changeItem( index )
									}
								>
									<Card style={styles.card}>
										<Icons iconName={item} />
									</Card>
								</TouchableOpacity>
							)
						})}
					</View>
					{ winMessage ? 
						(
							<View>
								<H1 styles={styles.message}>
									{ winMessage }
								</H1>
								<Button
									onPress={ reloadGrid }
									primary
									block
									rounded
								>
									<Text>Reload Game</Text>
								</Button>
							</View>
						) :
						(
							<H3
								styles={styles.message}
							>
								{ isCross ? 'Cross' : 'Circle' } Turns
							</H3>
						)	
					 }
				</Content>
			</Container>
		</>
	)
}

const styles = StyleSheet.create({
	grid: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 20
	},
	box: {
		width: "33%",
		marginBottom: 6,
	},
	card: {
		height: 120,
		justifyContent: "center",
		alignItems: "center"
	},
	message: {
		textAlign: "center",
		textTransform: "uppercase",
		color: "#FFF",
		marginTop: 20,
		backgroundColor: "#4653B3",
		paddingVertical: 10,
		marginVertical: 15
	}
});
