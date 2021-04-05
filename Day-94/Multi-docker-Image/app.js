const mongoose = require("mongoose");

const DATABASE = "mongodb://mymongo:27017/TestMultiDocker";

mongoose.connect( DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("DB COnnected....");
})
.catch(( error )=>{
    console.log("Error in DB-Connected....", error);
});