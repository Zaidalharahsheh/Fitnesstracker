const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
//set port
const PORT = process.env.PORT || 3000;

const app = express();

//use logger
app.use(logger("dev"));

//parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use static files
app.use(express.static("public"));
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fittrack", 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
{ useNewUrlParser: true });

//require('./seeders/seed')

//use routes
require('./routes/api')(app)
require("./routes/html")(app)


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}..`);
})