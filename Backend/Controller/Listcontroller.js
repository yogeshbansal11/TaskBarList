import listSchema from "../Model/listSchema.js";
import taskSchema from "../Model/taskSchema.js";
import dotenv from "dotenv";
dotenv.config();

export const create = async (req, res) => {
    try {
        const { name, userId,listColor } = req.body;
        const response = await listSchema.create({ name, user: userId, listColor});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getListsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const lists = await listSchema.find({ user: userId });
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const updateListColor = async (req, res) => {
  try {
    const { listId, listColor } = req.body; 

    const updatedList = await listSchema.findByIdAndUpdate(
      listId, 
      { listColor }, 
    );
    if (!updatedList) {
      return res.status(404).json({ error: "List not found" });
    }
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteList = async (req, res) => {
  const {listId} = req.body;

  try{
    await taskSchema.deleteMany({ listId });
    const deletedlist = await listSchema.findByIdAndDelete(listId)
    if(!deletedlist){
      return res.status(404).json({ error: "List not found" });
    }
    res.status(200).json({ success: true, message: "List deleted successfully", deletedlist });
  }catch (error) {
    res.status(500).json({ error: error.message });
}
}