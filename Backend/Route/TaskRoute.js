const express = require("express")
const taskcontroller = require("../Controller/taskController");
const router = express.Router();

router.post("/create",taskcontroller.createtask)

router.get("/:listId", taskcontroller.readtask);
router.put("/update/:taskId", taskcontroller.updateTask);


module.exports = router;