const express = require( "express" );
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const lodash = require('lodash');
// importing our own module
const date = require( __dirname + "/date.js");

const app = express();
app.set( "view engine", "ejs" );

app.use( bodyParser.urlencoded({ extended: true }));
app.use( express.static("public") );

mongoose.connect('mongodb://localhost:27017/TodoListDB', {useNewUrlParser: true, useUnifiedTopology: true});
// --------------------importing and setting up modules..........

// ---------------------------schemas------------
const TaskSchema = new mongoose.Schema({
  task: {
    required: true,
    type: String
  }
});

const Task = mongoose.model( "Task", TaskSchema );

const TaskListSchema = new mongoose.Schema({
  listName: {
    required: true,
    type: String
  },
  taskList: [ TaskSchema ]
});

const TaskList = mongoose.model( "TaskList", TaskListSchema );

// --------------------schema ends...
// home route.......
app.get( "/", function( request, response ){
  let tasks = Task.find( {}, ( error, tasks )=>{
    if( error )
      console.log(error);
    else {
      console.log(tasks);
      response.render( "index", { listName: "Today", tasks: tasks });
    }
  });
});
// add new tasks...........
app.post( "/", function( request, response ) {
  const newTask = request.body.newTask;
  const listName = request.body.listName;

  console.log(newTask);

  let task = new Task({
    task: newTask
  });

  if( listName === "Today" ){
    task.save();
    response.redirect("/");
  } else {
    TaskList.findOne( { listName: listName }, ( error, resultList )=>{
      resultList.taskList.push( task );
      resultList.save();
      response.redirect( "/"+ listName );
    });
  }
});
// delete a task....
app.post( "/delete", ( request, response )=>{
  console.log(request.body.checkbox);
  let itemId = request.body.checkbox;
  let listName = request.body.listName;
  console.log(listName);

  if ( listName === "Today" ) {
    Task.findByIdAndRemove( itemId, ( error )=>{
      if (error) {
        console.log(error);
      }
      response.redirect("/");
    });
  } else {
    TaskList.findOneAndUpdate( { listName: listName }, { $pull: { taskList: { _id: itemId } } }, ( error, list )=>{
      if( error ){
        console.log(error);
      } else {
        response.redirect("/"+listName);
      }
    });
  }
});
// Create a custom list....
app.get( "/:customListName", ( request, response )=>{
  console.log( request.params.customListName );
  let newListName = lodash.capitalize( request.params.customListName );

  TaskList.findOne( { listName: newListName }, ( error, result )=>{
    if (!error) {
      if (!result) {
        console.log("not");
        let newList = new TaskList({
          listName: newListName,
          taskList: []
        });
        newList.save();

        response.redirect("/"+newListName);

      } else {
        console.log("ye..");
        response.render( "index", { listName: result.listName, tasks: result.taskList });
      }
    }
  });
});

// Listening on a port.......
app.listen( process.env.PORT || 9876, function() {
  console.log("Server is running on port no 9876....");
});
