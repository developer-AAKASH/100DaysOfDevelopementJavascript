class User{
  // # for declaring the variables as private....
    userName="";
    emailId="";
    constructor( userName, emailId ){
      this.userName = userName;
      this.emailId = emailId;
    }

    #friendsList = [];

    getUserInfo(){
      console.log("from parent get");
      return { userName: this.userName, emailId: this.emailId };
    }

    addFriend( friendName ){
      this.#friendsList.push( friendName );
    }

    getFriendList(){
      return this.#friendsList;
    }
}

module.exports = User;
