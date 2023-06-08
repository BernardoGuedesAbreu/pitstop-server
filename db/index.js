// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

<<<<<<< HEAD
const MONGO_URI = `mongodb+srv://tomaslbpmaria:Awaki0QjJPYZ3XtD@pitstop.6ibfrzh.mongodb.net/?retryWrites=true&w=majority`
=======
const MONGO_URI =
  process.env.MONGODB_URI
>>>>>>> a4f708bec1a6060b44d6951d039ec2bf72e42fa2

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
