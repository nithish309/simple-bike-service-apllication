// object create for node packages
const express=require('express');
const path=require("path");
const hbs=require("hbs");
const app=express();
//const mongoose=require("mongoose");
const { MongoClient } = require("mongodb");

//create connection

const url = 'mongodb://localhost:27017';
MongoClient
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.urlencoded({extended:false}));

const location=path.join(__dirname,"./public");
app.use(express.static(location));
app.set("view engine","hbs");

//call the routes

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));



//server port 

app.listen(5000,()=>{
   console.log("server started @port 5000") 
});
