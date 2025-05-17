import axios from "axios";
import React, { useState } from "react";

const Task = ({ list, getList ,showTaskInput,setShowTaskInput }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(true);
  const [newTask, setNewTask] = useState("");
  const userId = localStorage.getItem("userId");

  const addNewTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      console.log("Task name is required");
      return;
    }

    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_KEY}/task/create`,
        {
          name: newTask,
          listId: list._id,
          userId,
          listName: list.name,
        }
      );

      console.log("Task created:", data.data);
      setNewTask("");
      getList();
      setShowTaskInput(false);
    } catch (err) {
      console.log("Error creating task:", err);
    }
  };

  return (
    <>
      {showTaskInput && (
        /* <span
            className="text-gray-700 hover:text-gray-800 cursor-pointer text-4xl font-bold absolute top-0 right-3"
            onClick={() => setIsAddModalOpen(false)}
          >
            &times;
          </span>
          <h3 className="text-xl font-bold pb-4">Add New List</h3> */

        <form onSubmit={addNewTask} className="flex flex-col p">
          <input
            className="w-full border rounded p-1 mt-2 outline-none bg-transparent"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task name"
          />

          <div>
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-800 w-24 text-white uppercase px-4 py-1 rounded "
            >
              Save
            </button>

            <span
              className="text-gray-700 hover:text-gray-800 cursor-pointer text-4xl font-bold px-2 h-4 "
              onClick={() => setShowTaskInput(false)}
            >
              &times;
            </span>
          </div>
        </form>
      )}
    </>
  );
};

export default Task;
