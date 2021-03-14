import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from "react-native";
import { 
    Text,
    Fab,
    Icon,
    List,
    ListItem,
    Button,
    Body,
    Right,
    CheckBox,
    Title,
    H1,
    Subtitle,
    Container,
    Left,
    Spinner,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Edit({ navigation, route }) {

    const [ name, setName ] = useState("");
    const [ totalNoOfTask, setTotalNoOfTask ] = useState("");
    const [ id, setId ] = useState(null);

    const update = async()=>{
        try{
            if( !name || !totalNoOfTask ){
                return alert("Please enter all the value !!!");
            }

            const taskToUpdate = {
                id, 
                name, 
                taskToUpdate,
                isCompleted: false
            };

            const storedList = await AsyncStorage.getItem("@taskList");
            const list = await JSON.parse(storedList);

            list.map(( task )=>{
                if( task.id == id ){
                    task.name = name;
                    task.totalNoOfTask = totalNoOfTask;
                }

                return task;
            });

            await AsyncStorage.setItem("@taskList", JSON.stringify(list));

            navigation.navigate("Home");
        } catch( error ){

        }
    };

    useEffect(()=>{
        const { task } = route.params;
        const { id, name, totalNoOfTask } = task;

        setId(id);
        setName(name);
        totalNoOfTask(totalNoOfTask);
    }, []);


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
                            onPress={ update }
                        >
                            <Text>Update</Text>
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