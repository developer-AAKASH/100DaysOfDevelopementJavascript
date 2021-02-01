import React from "react";

function Heading(){
    const date = new Date();
    const currentTime = date.getHours();

    let greetings;

    const customeStyle = {
    color: ""
    };

    if( currentTime < 12 ){
    greetings = "Good Morning !!";
    customeStyle.color = "orange";
    } else if( currentTime <= 16 ){
    greetings = "Good Afternoon !! ";
    customeStyle.color = "red";
    } else if( currentTime <= 18 ){
    greetings = "Good Evening !!! ";
    customeStyle.color = "green";
    } else{
    greetings = "Good Night !!!";
    customeStyle.color = "blue";
    }

    return (<h1 className="heading" style={customeStyle} >
                {greetings}
            </h1>);
}

export default Heading;