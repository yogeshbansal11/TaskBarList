const express = require("express")
const taskcontroller = require("../Controller/taskController");
const router = express.Router();

router.post("/create",taskcontroller.createtask)
router.post("/allTask", taskcontroller.getAllTasks);
router.get("/:listId", taskcontroller.readtask);
router.put("/update/:taskId", taskcontroller.updateTask);
router.post("/dueDate",  taskcontroller.addDueDate);
router.post("/startDate",  taskcontroller.addStartDate);
router.post("/getdueDateTask", taskcontroller.getTasksWithDueDate);


module.exports = router;