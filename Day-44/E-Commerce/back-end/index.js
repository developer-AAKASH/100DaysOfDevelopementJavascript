import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.get( "/", ( request, response )=>{
    response.send( "Hello E-Commerce....");
});

mongoose.connect( "mongodb://localhost:27017/E-Commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then( ()=>{
    console.log(" Database is connected...");
});

const port = 9876;

app.listen( port, ()=>{
    console.log( `Our App is running on ${port}...`);
});


