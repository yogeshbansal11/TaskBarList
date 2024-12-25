const listmodel = require("../Model/ListModel")
const Taskmodel = require("../Model/taskModel")

exports.createlist = async (req, res) => {
  const { name, user, color = "#f9f9f9" } = req.body; // Default color if none is provided

  try {
    const list = await listmodel.create({ name, user, color }); // Include color when creating the list
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.readUser = async (req, res) => {
  const { user } = req.params;
  try {
    const lists = await listmodel.find({ user: user }); // This includes the color field
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.moveTask = async (req, res) => {
//   const { taskId, listId } = req.body;
//   try {
//     const task = await TaskModel.findById(taskId);

//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }
//     task.list = listId;
//     await task.save();
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


exports.updateListColor = async (req, res) => {
  const { listId, color } = req.body; // Expect the list ID and the new color in the request body

  try {
    // Find and update the color of the list
    const updatedList = await listmodel.findByIdAndUpdate(
      listId, 
      { color }, 
      { new: true } // Return the updated list after the operation
    );
    if (!updatedList) {
      return res.status(404).json({ error: "List not found" });
    }
    res.status(200).json(updatedList); // Return the updated list
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletelist = async(req,res)=>{
  const {listId} = req.body;

  try{
    await Taskmodel.deleteMany({ listId });
    const deletedlist = await listmodel.findByIdAndDelete(listId)
    if(!deletedlist){
      return res.status(404).json({ error: "List not found" });
    }
    res.status(200).json({ success: true, message: "List deleted successfully", deletedlist });
  }catch (error) {
    res.status(500).json({ error: error.message });
}
}