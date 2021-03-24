import React from 'react'
import { StyleSheet, Text } from "react-native";
import {
    Body,
    Right,
    Button,
    Icon,
    Title,
    Text,
    Header
} from "native-base";

import { connect } from "react-redux";
import propTypes from "prop-types";
import { signOut } from "../action/auth";

const CustomeHeader = ({ signOut, authState, navigation })=>{
    return (
        <Header
            androidStatusBarColor="#0f4c75"
            style={{
                backgroundColor: "#0f4c75"
            }}
        >
            <Body>
                <Title>DevAgram</Title>
            </Body>
            <Right>
                { authState.isAuthenticated && (
                    <>
                        <Button
                            transparent
                            iconLeft
                            onPress={()=> navigation.navigate("AddPost")}
                        >
                            <Text style={{color: "#fdcb9e"}}>Add Post</Text>
                        </Button>
                        <Button
                            transparent
                            onPress={()=> signOut() }
                        >
                            <Icon name="log-out-outline" style={{color: "red"}} />
                        </Button>
                    </>
                ) }
            </Right>
        </Header>
    )
};

const mapStateToProps = ( state )=>({
    authState: state.auth
});

const mapDispatchToProps = {
    signOut
};

CustomeHeader.prototypes = {
    signOut: propTypes.func.isRequired,
    authState: propTypes.object.isRequired
}

export default connect( mapStateToProps, mapDispatchToProps )(CustomeHeader);