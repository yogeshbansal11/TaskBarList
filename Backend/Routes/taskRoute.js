import express from "express";
import VerifyToken from "../middleware/VerifyToken.js";
import multer from "multer";
import {
  addDueDate,
  addStartDate,
  createTask,
  deleteTask,
  getAllTasks,
  getLocation,
  getTasksFromList,
  getTasksWithDueDate,
  setAttachment,
  setLocation,
  updateTask,
  updateTaskColor,
} from "../Controller/TaskController.js";

const route = express.Router();
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

route.post("/create", createTask);
route.post("/dueDate", addDueDate);
route.post("/startDate", addStartDate);
route.post("/setLocation", setLocation);
route.post("/getLocation", getLocation);
route.put("/updateTaskColor", updateTaskColor);
route.post("/getdueDateTask", getTasksWithDueDate);
route.post("/allTask", getAllTasks);
route.get("/:listId",VerifyToken, getTasksFromList);
route.put("/update/:taskId", updateTask);
route.delete("/deleteTask", deleteTask);
route.put("/setAttachment", upload.single("image"), setAttachment);

export default route;
