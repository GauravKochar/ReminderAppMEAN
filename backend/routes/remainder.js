const express=require('express');

const router=express.Router();
const RemainderController = require("../controllers/remainder");
const checkAuth = require("../Auth/check-auth");

 router.post("/add",checkAuth,RemainderController.addReminder);
 router.get("/getList",checkAuth,RemainderController.getReminders);
 router.delete("/delete/:id",checkAuth,RemainderController.deleteReminder);

 router.get("/getReminder/:id",checkAuth,RemainderController.getReminder);
 router.put("/update/:id",checkAuth,RemainderController.updateReminder);




module.exports =router;
