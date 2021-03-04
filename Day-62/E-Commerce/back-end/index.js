const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();

// "type": "module", for allowing "import" importing rather than require.... 

// Importing my routes according to different modules...
const authenticationRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const { orderBy } = require("lodash");
const stripeRoutes = require("./routes/stripe");

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

// prefix for my custome routes....
app.use("/api", authenticationRoutes );
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);

const port = process.env.PORT || 8000;

app.listen( port, ()=>{
    console.log( `Our App is running on ${port}...`);
});


