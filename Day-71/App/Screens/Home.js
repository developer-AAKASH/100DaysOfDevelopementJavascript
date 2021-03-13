import React from 'react'
import { Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Fab, Icon } from "native-base";

export default function Home({ navigation, route }) {
    return (
        <>
            <StatusBar style={{ backgroundColor: "#1b262c" }} />
            <ScrollView contentContainerStyle={styles.container}>
                <Text>List of Remaining Tasks</Text>
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
    }
});