const mongoose = require('mongoose');
const config = require("config");
const db = config.get('mongoURI');
//module config used to create global values that we can use throught the entire directory
// default json file has all our global values
// mongouri is needed for creating default mongodb val

// to connect to mongo db.
const connectDB = async () => {
  try{
    await mongoose.connect(db,{
      useNewUrlParser: true,
      //useCreateIndex: true
        
    });
    console.log("Db connected")
  }
    catch(err){
        console.log(err.message);
        //exit process if try block fails
        process.exit(1);
    }
} 
// mongoose.connect() returns a promise

module.exports = connectDB;