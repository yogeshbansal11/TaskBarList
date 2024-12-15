const express = require("express");
const listcontroller = require("../Controller/Listcontroller")
const router1 = express.Router();

router1.post("/create",listcontroller.createlist)
router1.get("/:user",listcontroller.readUser)
// router.post("/move",listcontroller.moveTask)

module.exports = router1;