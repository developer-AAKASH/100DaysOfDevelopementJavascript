import React from 'react';
import {
  Text,
} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/tabs";
import { Home, OrderDelivery, Restaurent } from "./screens";

const Stack = createStackNavigator();

const App = ()=>{
	return(
		<NavigationContainer>
			<Stack.Navigator 
				screenOptions={{
					headerShown: false
				}}
				initialRouteName={"Home"}
			>
				<Stack.Screen name="Home" component={Tabs} />
				<Stack.Screen name="Restaurent" component={Restaurent} />
				<Stack.Screen name="OrderDelivery" component={OrderDelivery} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
