const express=require("express");
const router=express.Router();

// create object for controllers
const userController=require("../controllers/users"); 

router.post("/booking",userController.booking);
router.post("/register",userController.register);
router.post("/reg",userController.reg);
router.post("/update",userController.update);
router.post("/select",userController.select);
router.post("/select1",userController.select1);
router.post("/delete",userController.delete);
router.post("/viewbook",userController.viewbook);
router.post("/login",userController.login);
router.post("/date",userController.date);

module.exports=router;