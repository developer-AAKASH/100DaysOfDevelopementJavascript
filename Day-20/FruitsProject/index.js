// Docs link  :::>> http://mongodb.github.io/node-mongodb-native/3.4/quick-start/quick-start/

const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

// Connection url
const url = "mongodb://localhost:27017";

// database name
const dbName = "FruitsDB";

// create a new MongoClient
// const client = new MongoClient( url );
// const client = new MongoClient( url, { useNewUrlParser: true } );
const client = new MongoClient( url, { useUnifiedTopology: true });

// Use connect method to connect to the server...
client.connect( function( err ) {
  assert.equal(null, err );
  console.log("Connected succesfuly...");

  const db = client.db( dbName );

  // insertDocuments(db, function() {
  //   client.close();
  // });

  findDocuments(db, function() {
      client.close();
    });
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {_id : 1, fruitName: "Mango"},
    {_id : 2, fruitName: "Watermelon"},
    {_id : 3, fruitName: "Apple"},
    {_id : 4, fruitName: "Banana"},
    {_id : 5, fruitName: "Graps"},
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(5, result.result.n);
    assert.equal(5, result.ops.length);
    console.log("Inserted 5 documents into the collection");
    callback(result);
  });
};

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
};
