const Taskmodel = require("../Model/taskModel")
const Tasklist = require("../Model/ListModel")


exports.createtask = async (req, res) => {
  const { name, listId } = req.body;

  try {
    // Create the task
    const task = await Taskmodel.create({ name, listId });

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

exports.readtask = async(req,res)=>{
  const {listId} = req.params;

  try{
    const tasks = await Taskmodel.find({listId});
    res.status(200).json(tasks)
  }catch(err){
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
}


exports.completetask=async(req,res)=>{
  const {taskId} = req.body;
  try{
    const task = await Taskmodel.findById(taskId);
    task.completed = true;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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