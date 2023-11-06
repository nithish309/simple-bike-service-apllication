const express= require("express");
const router=express.Router();

//load the pages
router.get("/",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("login");
});

router.get("/home",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("home");
});

router.get("/about",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("about");
});
router.get("/contact",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("contact");
});

router.get("/services",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("services");
});
router.get("/register",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("register");
});

router.get("/booking",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("booking");
});

router.get("/update",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("update");
});
router.get("/date",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("date");
});

router.get("/select",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("select");
});
router.get("/reg",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("reg");
});
router.get("/select1",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("select1");
});

router.get("/delete",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("delete");
});

router.get("/viewbook",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("viewbook");
});

router.get("/tc",(req,res)=>{
    //res.send("<h1>Welcome</h1>");
    res.render("tc");
});

//export the router
module.exports = router;
