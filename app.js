// object create for node packages
const express=require('express');
const mysql=require("mysql2");
const path=require("path");
const hbs=require("hbs");
const app=express();

//create connection

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"store",
});


//connection success or not

db.connect((err)=>{
if(err){
    console.log(err);
}else{
     console.log("sucess");
}
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