const express = require("express")
const usercontroller = require("../Controller/UserController")
const router = express.Router();

router.post("/register",usercontroller.register);
router.post("/login",usercontroller.login);
router.post("/forgetpassword",usercontroller.forgetpassword);
router.post("/expirytime",usercontroller.calculateDaysLeft)
router.post("/username",usercontroller.usernameupdate)
router.patch("/background",usercontroller.background)

module.exports = router; 