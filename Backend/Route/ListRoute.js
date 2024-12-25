const express = require("express");
const listcontroller = require("../Controller/Listcontroller")
const router1 = express.Router();

router1.post("/create",listcontroller.createlist)
router1.get("/:user",listcontroller.readUser)
// router.post("/move",listcontroller.moveTask)
router1.put("/updatecolor", listcontroller.updateListColor);

router1.delete("/delete",listcontroller.deletelist)

module.exports = router1;