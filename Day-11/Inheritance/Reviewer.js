const User = require("./User.js");

class Reviewer extends User {
  #reviewCount="";
  // if you dont define below constructor, object of this class can be created with null value.
  // so to stop this, we have defined this so that, without passing the value, object cant be created.
  constructor( userName, emailId ){
    super( userName, emailId );
  }
  // method over-riding...
  getUserInfo(){
    console.log("from child get"+this.userName);
    console.log( super.getUserInfo() );
    // let someInfo = super.getUserInfo();
    return { reviewCount: this.#reviewCount };
  }

  getReviewCount(){
    return `you have done ${this.#reviewCount} reviews !!!`;
  }

  setReviewCount( reviewCount ){
    this.#reviewCount = reviewCount;
  }
}

module.exports = Reviewer;
