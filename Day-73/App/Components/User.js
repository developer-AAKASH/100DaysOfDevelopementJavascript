import { 
    Card,
    CardItem,
    Container, 
    H1,
    Image
} from 'native-base';
import React from 'react'
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";

const User = ({ details })=>{
    return (
        <Card style={styles.card}>
            <CardItem cardBody style={styles.cardItem}>
                <Image
                    source={{
                        uri: details.picture?.large,
                        width: 150,
                        height: 250
                    }}
                    style={styles.image}
                />
            </CardItem>
            <CardItem style={styles.cardItem}>
                <H1 style={styles.text}>
                    { details.name?.title }
                    { details.name?.first }
                    { details.name?.last }
                </H1>
            </CardItem>
            <CardItem style={styles.cardItem}>
                <H1 style={styles.text}>
                    { details.email }
                </H1>
            </CardItem>
            <CardItem style={styles.cardItem}>
                <H1 style={styles.text}>
                    { details.location.city }
                    { details.location.state }
                    { details.location.country }
                </H1>
            </CardItem>
            <CardItem bordered style={styles.cardItem}>
                <Text style={styles.text}>
                    { details.cell }
                </Text>
            </CardItem>
            <CardItem footer style={styles.cardItem}>
                <Text style={{ color: "#FFF" }}>
                    Registered at { moment(details.registered.text).format("DD-MM-YYYY")}
                </Text>
            </CardItem>
        </Card>
    )
}

export default User;

const styles = StyleSheet.create({
    card: {
        width: "90%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#4f8a8B",
        borderColor: "#4f8a8B",
        borderWidth: 2
    },
    cardItem: {
        backgroundColor: "#4f8a8B"
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#4bd46d",
        marginTop: -50
    },
    text: {
        color: "#eeeeee"
    }
});