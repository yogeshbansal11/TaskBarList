import mongoose from "mongoose";
import taskSchema from "../Model/taskSchema.js";
import listSchema from "../Model/listSchema.js";
import {uploadFile} from "../Cloudinary/uploadFile.js"
export const createTask = async (req, res) => {
  const { name, listId, userId, listName } = req.body;
  try {
    const list = await listSchema.findById(listId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    const task = await taskSchema.create({ name, listId, userId, listName });

    res.status(200).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: error.message });
  }
};

export const addDueDate = async (req, res) => {
  try {
    const { taskId, dueDate } = req.body;
    const task = await taskSchema.findByIdAndUpdate(
      taskId,
      { dueDate: dueDate }
      // { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
};

export const addStartDate = async (req, res) => {
  try {
    const { taskId, startDate } = req.body;
    const task = await taskSchema.findByIdAndUpdate(
      taskId,
      { startDate}
      // { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
};

export const setLocation = async (req, res) => {
  try {
    const { taskId, location } = req.body;
    const task = await taskSchema.findByIdAndUpdate(
      taskId,
      { location}
      // { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getLocation = async (req, res) => {
  try {
    const { taskId } = req.body;
    const task = await taskSchema.findById(
      taskId,
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getTasksWithDueDate = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const tasks = await taskSchema.find({
      userId,
      dueDate: { $exists: true, $ne: null },
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getTasksFromList = async (req, res) => {
  const { listId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(listId)) {
      return res.status(400).json({ error: "Invalid listId" });
    }

    const tasks = await taskSchema.find({ listId });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const { userId } = req.body;

    const tasks = await taskSchema.find({ userId });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { listId,listName } = req.body;

  try {
    const task = await taskSchema.findById(taskId);
    task.listId = listId;
    task.listName = listName;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskColor = async (req, res) => {
  try {
    const { taskId, taskColor } = req.body; 

    // console.log(">>>>>>>",taskId, taskColor)

    const updatedTask = await taskSchema.findByIdAndUpdate(
      taskId, 
      { taskColor }, 
      { new: true, upsert: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "task not found" });
    }
    // console.log("updatedTask", updatedTask);
    
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const setAttachment = async (req, res) => {
  try {
    const { taskId } = req.body; // Get taskId from body
    const image = req.file; // Access the uploaded file via req.file
    
    if (!image) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    // Upload the file to Cloudinary
    console.log("Received file object:", image);
    const uploadedFile = await uploadFile(image); // uploadFile should return the uploaded file URL
    console.log("Uploaded file URL:", uploadedFile);

    // Update the task with the uploaded image URL
    const updatedTask = await taskSchema.findByIdAndUpdate(
      taskId,
      { image: uploadedFile }, // Directly using uploadedFile URL
      { new: true, upsert: true }
    );

    return res.status(200).json({ success: true, data: uploadedFile });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ error: error.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body; 


    const Task = await taskSchema.findByIdAndDelete(
      taskId
    );
    if (!Task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(Task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

