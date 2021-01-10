let aakash = {
  firstName : "Aakash",
  lastName : "Thakkar",
  emailId : "201912082@daiict.ac.in",
  occupation : "Software Engineer",
  getUserDetails: function(){
    console.log(`
        :::::::::::User-details::::::::::
        Firstname :::---> ${this.firstName}
        Lastname :::---> ${this.lastName}
        Email id :::---> ${this.emailId}
        occupation :::---> ${this.occupation}
      `);
  }
}

let rahil = {
  firstName : "Rahil",
  lastName : "Shah",
  emailId : "201912080@daiict.ac.in",
  occupation : "Software Engineer"
}

aakash.getUserDetails();
// How you can use method of aakash for rahil as both object's structure is same ?!
// Here is the way !!
// Using bind property of object, you can take other object;s method for your use !!
// But here is the caution, if you want to avoid falsy values while printing them, make sure that structure and info of the both object will ne same !!!
// way 1 ---- using bind method which return the reference !!
let rahilDetails = aakash.getUserDetails.bind(rahil);
// and you can run it like a function...
rahilDetails();
// Second way is using call property of the object which directly call the function...
// way 2
aakash.getUserDetails.call(rahil);
