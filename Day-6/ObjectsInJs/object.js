// This how you define the object there are other ways you can use objects like with class but this is the simple ways to deal with objects.
var user = {
  firstName: "Aakash",
  lastName: "Thakkar",
  emailId: "201912082@daiict.ac.in",
  password: "password",
  userRole: "Admin",
  // Method of the object.
  fullName: function(){
    // this keyword to refer current objrct's value
    return this.firstName + " " + this.lastName;
  }
};
// Some ways to get the object values.

// print whole object
console.log(user);
// print the value in tabular form...
console.table(user);
// any particylar property of object.
console.log(user.emailId);
// function of the object.
console.log(user.fullName());
// converting the object to json format.
let userJson = JSON.stringify( user );
// printing json format data...
console.log(userJson);
