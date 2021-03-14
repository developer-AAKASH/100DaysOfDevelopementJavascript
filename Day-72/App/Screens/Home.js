import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, StatusBar } from "react-native";
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
    Spinner
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function Home({ navigation, route }) {

    const [ listOfTasks, setListOfTasks ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    
    const isFocused = useIsFocused();

    const getList = async()=>{
        setLoading(true);

        const storedValue = await AsyncStorage.getItem("@taskList");
        if( !storedValue ){
            setListOfTasks([]);
        }

        const list = JSON.parse(storedValue);
        setListOfTasks(list);

        setLoading(false);
    };

    const deleteTask = async( taskId )=>{
        const newList = await listOfTasks.filter(( list )=> list.id !== taskId );
        await AsyncStorage.setItem("@taskList", JSON.stringify(newList));

        setListOfTasks(newList);
    }; 

    const markCompleted = async( taskId )=>{
        const newList = listOfTasks.map(( list )=>{
            if( list.id == id ){
                list.isCompleted = !list.isCompleted;
            }

            return list;
        });

        await AsyncStorage.setItem("@taskList", JSON.stringify(newList));
        setListOfTasks(newList);
    };

    useEffect( ()=>{
        // getList();
    }, [isFocused] );

    if( loading ){
        return(
            <Container style={styles.container}>
                <Spinner color="#00b7c2" />
            </Container>
        )
    }

    return (
        <>
            <StatusBar style={{ backgroundColor: "#1b262c" }} />
            <ScrollView contentContainerStyle={styles.container}>
                { listOfTasks.length == 0 ? (
                    <Container styles={styles.container}>
                        <H1 style={ styles.heading }>
                            Hurry !! No task to be completed !!!
                        </H1>
                    </Container>
                ) : (
                    <>
                        <H1 style={styles.heading}>
                            Tasks to be Completed !!
                        </H1>
                        <List>
                            { listOfTasks.map( ( task )=>(
                                <ListItem key={task.id} style={styles.listItem} noBorder>
                                    <Left>
                                        <Button
                                            style={styles.actionButton}
                                            danger
                                            onPress={
                                                ()=> deleteTask(task.id)
                                            }
                                        >
                                            <Icon name="trash" active />
                                        </Button>
                                        <Button
                                            style={styles.actionButton}
                                            warning
                                            onPress={()=>{
                                                navigation.navigate("Edit", { task: task })
                                            }}
                                        >
                                            <Icon name="edit" active type="Feather" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Title style={styles.seasonName}>{task.name}</Title>
                                        <Text note style={}>{ task.totalNoOfTask } season to watch</Text>
                                    </Body>
                                    <Right>
                                        <CheckBox
                                            checked={task.isCompleted}
                                            onPress={
                                                ()=> markCompleted(task.id)
                                            }
                                        />
                                    </Right>
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
                <Fab
                    style={{ backgroundColor: "#5067FF" }}
                    position="bottomRight"
                    onPress={()=> navigation.navigate("Add")}
                >
                    <Icon name="add" />
                </Fab>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        backgroundColor: "#1b262c",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        backgroundColor: "#1b262c",
        flex: 1
    },
    heading: {
        textAlign: "center",
        color: "#00b7c2",
        marginVertical: 15,
        marginHorizontal: 5
    },
    actionButton: {
        marginLeft: 5
    },
    seasonName: {
        color: "#fdcb9e",
        textAlign: "justify"
    },
    listItem: {
        marginLeft: 0,
        marginBottom: 20
    }
});