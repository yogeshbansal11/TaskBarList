const Taskmodel = require("../Model/taskModel");
const Tasklist = require("../Model/ListModel");

exports.createtask = async (req, res) => {
  const { name, listId, userId, listname } = req.body;

  try {
    // Create the task
    const task = await Taskmodel.create({ name, listId, userId, listname});

    // Push the task ID to the corresponding list's tasks array
    await Tasklist.findByIdAndUpdate(listId, {
      $push: { tasks: task._id },
    });

    // Return the created task
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.readtask = async (req, res) => {
  const { listId } = req.params;

  try {
    const tasks = await Taskmodel.find({ listId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { listId } = req.body;

  try {
    const task = await Taskmodel.findById(taskId);
    task.listId = listId;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { userId } = req.body;

    const tasks = await Taskmodel.find({ userId });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

exports.addDueDate = async (req, res) => {
  try {
    const { taskId, dueDate } = req.body;
    const task = await Taskmodel.findByIdAndUpdate(
      {_id:taskId},
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

exports.addStartDate = async (req, res) => {
  try {
    const { taskId, startDate } = req.body;
    const task = await Taskmodel.findByIdAndUpdate(
      {_id:taskId},
      { startDate: startDate }
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

exports.getTasksWithDueDate = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const tasks = await Taskmodel.find({
      userId,
      dueDate: { $exists: true, $ne: null },
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: error.message });
  }
};

// exports.deletetask = async (req, res) => {
//   const { taskId } = req.body;

//   try {
//     await Taskmodel.findByIdAndDelete(taskId);

//     res.status(200).json({ message: "Task deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting task", error });
//   }
// };




exports.deletetask = async (req, res) => {
  const { taskId } = req.body;

  // Validate taskId presence
  if (!taskId) {
    return res.status(400).json({ message: "Task ID is required" });
  }

  // Validate taskId format
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: "Invalid Task ID format" });
  }

  try {
    // Attempt to delete the task
    const deletedTask = await Taskmodel.findByIdAndDelete(taskId);

    // If no task was found and deleted
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};

exports.getlabel = async(req,res)=>{
  const { taskId,label} = req.body;
  try{
    await Taskmodel.findByIdAndUpdate(taskId,{label});

    res.status(200).json({message:"color updated"});
  } catch(error){
    res.status(500).json({message:"color not added",error})
  }
}