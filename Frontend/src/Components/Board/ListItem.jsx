import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "./Task.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEllipsisH,
  faTimes,
  faPenToSquare,
  faLocationDot,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import TaskOptions from "./TaskOptions.jsx";
import useGetTasks from "../../CustomHooks/useGetTasks.jsx";
import moment from "moment";
import toast from "react-hot-toast";

const ListItem = ({ list, getList }) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  // const [tasks, setTasks] = useState([]);
  const [openListOptions, setOpenListOptions] = useState(false);
  const [openTaskOptions, setOpenTaskOptions] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedTask, setSelectedTask] = useState(null);

  const { tasks, getTasks } = useGetTasks(list._id);

  // const getTasks = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_KEY}/task/${list._id}`
  //     );
  //     setTasks(response.data);
  //   } catch (err) {
  //     console.error("Error fetching tasks:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    getTasks();
  }, [list]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text");

    try {
      await axios.put(`${import.meta.env.VITE_API_KEY}/task/update/${taskId}`, {
        listId: list._id,
        listName: list.name,
      });
      getTasks();
      getList();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOpenListOptions = (e) => {
    const rect = e.target.getBoundingClientRect();
    setMenuPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setOpenListOptions(true);
  };

  const handleOpenTaskOptions = (e, task) => {
    setSelectedTask(task); // Set the selected task for options
    const rect = e.target.getBoundingClientRect();
    setMenuPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setOpenTaskOptions(true);
  };

  const updateListColor = async (listId, colorValue) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_KEY}/list/updatecolor`,
        {
          listId,
          listColor: colorValue,
        }
      );
      getList();
      console.log("Color updated:", response.data);
    } catch (error) {
      console.error(
        "Error updating color:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeletelist = async (listId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_KEY}/list/deleteList`,
        { data: { listId } }
      );
      toast.success(response.data.message);
      getList();
    } catch (error) {
      console.error(
        "Error deleting list:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div
        className="max-h-[78vh] min-w-64 h-fit text-white rounded-xl p-3 m-4 shadow-lg flex flex-col overflow-auto"
        style={{ backgroundColor: list.listColor }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex items-center justify-between border-b border-gray-700 pb-3">
          <h3 className="text-lg font-semibold">{list.name}</h3>
          <div className="flex space-x-2">
            <button
              onClick={handleOpenListOptions}
              className="text-gray-100 hover:bg-gray-400 rounded-md hover:text-gray-800 px-2 "
            >
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-2 mt-3">
          {tasks.map((task) => (
            <div
              onClick={(e) => handleOpenTaskOptions(e, task)}
              style={{ backgroundColor: `${task.taskColor}` }}
              key={task._id}
              className=" bg-gray-700 text-gray-300 rounded-md px-3 py-2 shadow-sm"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, task._id)}
            >
              <div className="flex justify-between">
                {task.name}
                <FontAwesomeIcon className="opacity-30" icon={faPenToSquare} />
              </div>
              <div className="flex justify-between items-center">
                {(task.startDate || task.dueDate) && (
                  <div
                    className="bg-green-500 text-gray-900 rounded-md px-2 py-1 mt-1 text-sm"
                    style={{
                      backgroundColor: `${
                        new Date(task.dueDate) < new Date() && "red"
                      }`,
                    }}
                  >
                    {task.startDate && (
                      <span>{moment(task.startDate).format("MMM-DD")}</span>
                    )}
                    {task.dueDate && (
                      <span> - {moment(task.dueDate).format("MMM-DD")}</span>
                    )}
                  </div>
                )}
                <div className="text-end space-x-2">
                  {task.location && <FontAwesomeIcon icon={faLocationDot} />}
                  {task.image && <FontAwesomeIcon icon={faPaperclip} />}
                </div>
              </div>

              {openTaskOptions && (
                <TaskOptions
                  task={selectedTask}
                  list={list}
                  setOpenTaskOptions={setOpenTaskOptions}
                  getTasks={getTasks}
                  // handleDeleteTask={handleDeleteTask} // Delete task functionality
                />
              )}
            </div>
          ))}
        </div>

        {/* Add Task */}
        <button
          className="mt-3 text-sm flex items-center space-x-2 text-gray-400 hover:text-gray-200"
          onClick={() => setShowTaskInput(!showTaskInput)}
        >
          {!showTaskInput ? (
            <span>
              <FontAwesomeIcon icon={faPlus} />
              <span> Add a card </span>
            </span>
          ) : (
            ""
          )}
        </button>

        {/* Render Task Input if visible */}
        {showTaskInput && (
          <Task
            list={list}
            getList={getList}
            setShowTaskInput={setShowTaskInput}
            showTaskInput={showTaskInput}
          />
        )}
      </div>

      {/* Options Modal */}
      {openListOptions && (
        <div
          className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-5"
          onClick={() => setOpenListOptions(false)}
        >
          <div
            className="relative text-slate-300 min-w-52 bg-gray-800 rounded-lg shadow-lg p-3"
            style={{
              position: "absolute",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between border-b border-gray-700 pb-2 px-2">
              <span>List Options</span>
              <button onClick={() => setOpenListOptions(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="flex items-center justify-between my-4 hover:bg-gray-500 px-2 py-1 rounded-sm">
              <label htmlFor="color">Change Color -</label>
              <div
                className="w-7 h-7 rounded-full cursor-pointer overflow-hidden"
                style={{
                  backgroundColor: `${list.listColor}`,
                }}
              >
                <input
                  id="color"
                  className="w-full h-full opacity-0 cursor-pointer "
                  type="color"
                  value={list.listColor}
                  onChange={(e) => updateListColor(list._id, e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={() => handleDeletelist(list._id)}
              className=" mb-4 hover:bg-red-500 hover:text-gray-900  px-2 py-1 rounded-sm"
            >
              Delete List
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ListItem;
