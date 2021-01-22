// mongoose docs :::> https://mongoosejs.com/docs/api/query.html

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/FruitsDB", { useNewUrlParser: true }, { useUnifiedTopology: true } );

const FruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

const FruitSchemaWithValidation = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Fruit name is required...." ]
  },
  rating:{
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", FruitSchema );

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Healthy Food..."
});

// fruit.save();

// const PeopleSchema = new mongoose.Schema({
//   userName: String,
//   age: Number
// });
// with fruit
const PeopleSchema = new mongoose.Schema({
  userName: String,
  age: Number,
  favouriteFruit: FruitSchema
});

const People = mongoose.model( "People", PeopleSchema );

// const people = new People({
//   userName: "AakashIsBest",
//   age: 21
// });


// people.save();

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 3,
  review: "But its Healthy Food..."
});

const Mango = new Fruit({
  name: "Mango",
  rating: 10,
  review: "Very testy..."
});

const watermelon = new Fruit({
  name: "Watermelon",
  rating: 10,
  review: "Testy and watery..."
});

// Fruit.insertMany([ kiwi, Mango, watermelon ], function(error) {
//   if( error )
//     console.log(error);
//   else {
//     console.log("success...");
//   }
// });

Fruit.find( function( error, fruits ) {
  if( error){
    console.log(error);
  }
  else{
    console.log(fruits);
    // for( let fruit in fruits ){
    //   console.log( fruit.name );
    // }

    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });

  }
  mongoose.connection.close();
});

// Fruit.updateOne( {_id: "60080400dd4857102c5e99d6"}, {review: "I dont like it but its healthy..."}, (error)=>{
//   if( error ){
//     console.log(error);
//   }
//   else {
//     console.log("success");
//   }
// });
//
// Fruit.deleteOne( {_id: "60080400dd4857102c5e99d4"}, (error)=>{
//   if(error){
//     console.log(error);
//   }
//   else{
//     console.log("success");
//   }
// });

const pinaple = new Fruit({
  name: "Pinaple",
  rating: 9,
  review: "Testy..."
});

// pinaple.save();

const aakashT = new People({
  userName: "Aakash Thakkar",
  age: 20,
  favouriteFruit: pinaple
});

People.find( ( error, peoples )=>{
  if (error) {
    console.log(error);
  } else{
    peoples.forEach((people) => {
      console.log(people);
    });

  }
});

// aakashT.save();
