const express = require( "express" );
const bodyParser = require('body-parser');
// importing our own module
const date = require( __dirname + "/date.js");

const app = express();

// Here we are adding new items to list still const will work because const works differently for arrays and objects.
// Here const fix the type of object geting stored in variable name but dont fix the value
// where in normal variable where we store the single value, there the value also get fixed...
const newTasks = [ "Binary Search", "Backtracking", "Javascript"];
const workTasks = [];

app.set( "view engine", "ejs" );

app.use( bodyParser.urlencoded({ extended: true }));
app.use( express.static("public") );

app.get( "/", function( request, response ){
  const day = date.getDate();

  response.render( "index", { nameOfDay: day, newTasks: newTasks });
});

app.get( "/work", function( request, response ) {
    response.render( "index", { nameOfDay: "Work List", newTasks: workTasks });
})

app.post( "/", function( request, response ) {
  const newTask = request.body.newTask;
  if( request.body.button === "Work List" ){
    workTasks.push( newTask );
    response.redirect( "/work" );
  } else{
    newTasks.push( newTask );
    response.redirect( "/" );
  }
});

app.listen( process.env.PORT || 9876, function() {
  console.log("Server is running on port no 9876....");
});
