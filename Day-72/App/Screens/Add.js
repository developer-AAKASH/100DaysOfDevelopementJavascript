import React, { useState } from 'react';
import { 
    Text,
    StyleSheet
} from "react-native";
import {
    Container,
    Form,
    Item,
    Input,
    Button,
    H1
} from "native-base";
import shortid from "shortid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from 'react-native-gesture-handler';


export default function Add({ navigation, route }) {
    const [ name, setName ] = useState("");
    const [ totalNoOfTask, setTotalNoOfTask ] = useState("");

    const addTask = async()=>{
        try{
            if( !name || !totalNoOfTask ){
                return alert("Please provide all the details !!!");
            }

            const taskToAdd = {
                id: shortid.generate(),
                name: name,
                totalNoOfTask: totalNoOfTask,
                isCompleted: false
            };

            const storedValue = await AsyncStorage.getItem("@taskList");
            const previousValue = await JSON.parse(storedValue);

            if( !previousValue ){
                const newList = [ taskToAdd ];
                await AsyncStorage.setItem("@taskList", JSON.stringify(newList));
            } else{
                previousValue.push( taskToAdd );
                await AsyncStorage.setItem("@taskList", JSON.stringify(newList));
            }

            navigation.navigate("Home");

        } catch( error ){
            console.log(error);
        }
    }

    return (
        <>
            <Container style={ styles.container }>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <H1 style={styles.heading}>Add new Task</H1>
                    <Form>
                        <Item rounded style={ styles.formItem }>
                            <Input
                                placeholder="Name of Task..."
                                style={{
                                    color: "#eee"
                                }}
                                value={name}
                                onChangeText={ (text)=> setName(text) }
                             />
                             <Input
                                placeholder="Name of Task..."
                                style={{
                                    color: "#eee"
                                }}
                                value={totalNoOfTask}
                                onChangeText={ (text)=> setTotalNoOfTask(text) }
                             />
                        </Item>
                        <Button rounded block
                            onPress={ addTask }
                        >
                            <Text>Add</Text>
                        </Button>
                    </Form>
                </ScrollView>
            </Container>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1b262c",
        flex: 1,
        justifyContent: "flex-start",
    },
    heading: {
        textAlign: "center",
        color: "#00b7c2",
        marginHorizontal: 5,
        marginTop: 50,
        marginBottom: 20
    },
    formItem: {
        marginBottom: 20
    }
});