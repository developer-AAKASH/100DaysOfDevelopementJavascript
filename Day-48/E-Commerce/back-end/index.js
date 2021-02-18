const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();

// "type": "module", for allowing "import" importing rather than require.... 

// Importing routes...
const authenticationRoutes = require("./routes/authentication");
const app = express();

mongoose.connect( process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then( ()=>{
    console.log(" Database is connected...");
});


// -------------middlewares.....
app.use( bodyParser.json() );
app.use( cookieParser() );
app.use( cors() );

// for routes....
app.use( "/api", authenticationRoutes );

const port = process.env.PORT || 8000;

app.listen( port, ()=>{
    console.log( `Our App is running on ${port}...`);
});


