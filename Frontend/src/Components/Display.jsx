import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./Display.css";

const Display = () => {
  const [lists, setLists] = useState([]); // State to hold all lists
  const [listName, setListName] = useState(""); // New list name
  const [taskName, setTaskName] = useState(""); // New task name
  const [activeListId, setActiveListId] = useState(null); // Active list ID for task input
  const [isAddingList, setIsAddingList] = useState(false); // Toggle for list creation

  const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

  const fetchLists = async () => {
    if (!userId) {
      console.error("User ID not found.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5050/lists/${userId}`);
      // Add default color if not set
      const listsWithColors = response.data.map((list) => ({
        ...list,
        color: list.color || "#f9f9f9", // Default color if not available
      }));
      setLists(listsWithColors);
    } catch (error) {
      console.error("Error fetching lists:", error.response?.data || error.message);
    }
  };

  const fetchTasks = async (listId) => {
    try {
      const response = await axios.get(`http://localhost:5050/tasks/${listId}`);
      setLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listId ? { ...list, tasks: response.data } : list
        )
      );
    } catch (error) {
      console.error(`Error fetching tasks for list ${listId}:`, error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    if (lists.length > 0) {
      lists.forEach((list) => {
        fetchTasks(list._id);
      });
    }
  }, [lists]);

  const addList = async () => {
    if (!listName.trim()) {
      alert("List name cannot be empty.");
      return;
    }
    if (!userId) {
      console.error("User ID is missing.");
      return;
    }
    try {
      await axios.post("http://localhost:5050/lists/create", {
        name: listName,
        user: userId,
      });
      setListName("");
      setIsAddingList(false);
      fetchLists();
    } catch (error) {
      console.error("Error creating list:", error.response?.data || error.message);
    }
  };

  const addTask = async (listId) => {
    if (!taskName.trim()) {
      alert("Task name cannot be empty.");
      return;
    }
    try {
      await axios.post("http://localhost:5050/tasks/create", {
        name: taskName,
        listId,
      });
      setTaskName("");
      setActiveListId(null);
      fetchTasks(listId);
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
    }
  };

  // Function to update list color and change task container color
  const updateListColor = async (listId, newColor) => {
    try {
      const response = await axios.put("http://localhost:5050/lists/updatecolor", {
        listId,
        color: newColor,
      });
      // Update the list color in the frontend state with the updated response
      setLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listId ? { ...list, color: newColor } : list
        )
      );
      console.log("Color updated:", response.data);
    } catch (error) {
      console.error("Error updating color:", error.response?.data || error.message);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    const sourceList = lists.find((list) => list._id === source.droppableId);
    const destinationList = lists.find((list) => list._id === destination.droppableId);

    if (!sourceList || !destinationList) return;

    const [movedTask] = sourceList.tasks.splice(source.index, 1);
    destinationList.tasks.splice(destination.index, 0, movedTask);

    setLists([...lists]);

    try {
      await axios.put(`http://localhost:5050/tasks/update/${draggableId}`, {
        listId: destination.droppableId,
      });
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
    }
  };

  return (
    <div className="display-container">
      <button className="add-list-button" onClick={() => setIsAddingList(true)}>
        Add List
      </button>

      {isAddingList && (
        <div className="add-list-container">
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list name"
          />
          <button onClick={addList}>Save</button>
          <button onClick={() => setIsAddingList(false)}>Cancel</button>
        </div>
      )}

      <h3>Your Lists:</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="lists-wrapper">
          {lists.map((list) => (
            <div
              key={list._id}
              className="list-item"
              style={{ backgroundColor: list.color }} // Apply list color to the list item
            >
              <h4>{list.name}</h4>
              <div className="color-picker">
                <label>Change Color:</label>
                <input
                  type="color"
                  value={list.color}
                  onChange={(e) => updateListColor(list._id, e.target.value)} // Use updateListColor
                />
              </div>

              <button
                onClick={() =>
                  setActiveListId(activeListId === list._id ? null : list._id)
                }
              >
                {activeListId === list._id ? "Cancel" : "Add Task"}
              </button>

              {activeListId === list._id && (
                <div className="task-input-container">
                  <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter task name"
                  />
                  <button onClick={() => addTask(list._id)}>Save Task</button>
                </div>
              )}

              <Droppable droppableId={list._id}>
                {(provided) => (
                  <div
                    className="tasks-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ backgroundColor: list.color }} // Apply list color to the tasks container
                  >
                    {list.tasks && list.tasks.length > 0 ? (
                      list.tasks.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              className="task-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {task.name}
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <p>No tasks for this list.</p>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Display;
