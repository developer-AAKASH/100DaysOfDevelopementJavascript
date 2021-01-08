//THis is a functional way to create objects.
let Car = function( carName, modelName, price, companyName ){
  this.carName = carName;
  this.modelName = modelName;
  this.price = price;
  this.companyName = companyName;
  // this is the way to add method in class body
  this.getActualCost = function(){
      console.log(`Car price is ${this.price} and including GST ::--> ${ this.price + (this.price * 18 )/100}`);
  }
}
// This is the way to add method from outside the class body.
Car.prototype.getCarName = function(){
  console.log( `Car name ::--> ${this.carName}` );
}
// new keyword is necessary create new instance of the Car or any object.
let mercidiesCClass = new Car( "Mercidies C-class", "Mercidies C-class", 50000000, "Mercidies");
mercidiesCClass.getActualCost();
mercidiesCClass.getCarName();
// ------------------------Adding our own method to Array class------------------------------------------------------------
let numbers = new Array( 2, 4, 6, 8, 10 );

console.log(numbers);
// Using this way, you can add your own methods to in built class of the language.
Array.prototype.printInTable = function() {
  console.table(numbers);
};

numbers.printInTable();
