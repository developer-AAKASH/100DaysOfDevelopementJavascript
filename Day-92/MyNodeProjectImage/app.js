const express = require("express");

const app = express();

app.get("/", ( req, res )=>{
    res.send("Hello from node-docker-image-project !!!");
});

app.listen( 3000, ()=>{
    console.log("App is running on port 3000.......");
});

// declaration or calling of package

// routes

// listen