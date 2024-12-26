
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./Display.css";
import Navbar3 from "./Navbar3";
import Opentask from "./Opentask";

const Display = () => {
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [activeListId, setActiveListId] = useState(null);
  const [isAddingList, setIsAddingList] = useState(false);
  const [isOpenDot, setIsOpenDot] = useState(false); 
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [activeListColor, setActiveListColor] = useState(null);
  const [isTaskOpen,setIsTaskOpen]= useState(false)

  const userId = localStorage.getItem("userId");

  const fetchLists = async () => {
    if (!userId) {
      console.error("User ID not found.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5050/lists/${userId}`);
      const listsWithColors = response.data.map((list) => ({
        ...list,
        color: list.color || "#f9f9f9",
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

  const addTask = async (list) => {
    if (!taskName.trim()) {
      alert("Task name cannot be empty.");
      return;
    }
    try {
      await axios.post("http://localhost:5050/tasks/create", {
        name: taskName,
        listId: list._id,
        listname: list.name,
        userId,
      });
      setTaskName("");
      setActiveListId(null);
      fetchTasks(list._id);
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
    }
  };

  const updateListColor = async (listId, newColor) => {
    try {
      const response = await axios.put("http://localhost:5050/lists/updatecolor", {
        listId,
        color: newColor,
      });
      setLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listId ? { ...list, color: newColor } : list
        )
      );
    } catch (error) {
      console.error("Error updating color:", error.response?.data || error.message);
    }
  };

  const delist = async(listId)=>{
    try{
    const response = await axios.delete("http://localhost:5050/lists/delete",{
      data:{listId},
    })
    setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
  } catch (error) {
    console.error("Error deleting list:", error.response?.data || error.message);
  }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

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

  const handledots = (e, listId) => {
    const rect = e.target.getBoundingClientRect(); 
    setMenuPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setIsOpenDot(true);
    setActiveListColor(listId); // Set active list for color picker
  };

  return (
    <>
      <Navbar3 />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="display-container">
          <div className="lists-wrapper">
            {lists.map((list) => (
              <div
                key={list._id}
                className="list-item"
                style={{ backgroundColor: list.color }}
              >
                <div className="dots">
                  <h4>{list.name}</h4>
                  <p onClick={(e) => handledots(e, list._id)}>...</p>
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
                    <button onClick={() => addTask(list)}>Save Task</button>
                  </div>
                )}
                {isOpenDot && activeListColor === list._id && (
                  <div className="overlay" onClick={() => setIsOpenDot(false)}>
                    <div
                      className="menu-container"
                      style={{
                        position: "absolute",
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="header">
                        <span>List Options</span>
                        <button
                          onClick={() => setIsOpenDot(false)}
                          className="close-btn"
                        >
                          X
                        </button>
                      </div>

                      <div className="color-picker">
                        <label>Change Color: </label>
                        <input
                          type="color"
                          onChange={(e) =>
                            updateListColor(list._id, e.target.value)
                          }
                          value={list.color}
                        />
                      </div>

                      <div className="deletelist">
                       <button onClick={()=>delist(list._id)}> Delete List </button>
                      </div>
                    </div>
                  </div>
                )}

                <Droppable droppableId={list._id}>
                  {(provided) => (
                    <div
                      className="tasks-container"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{ backgroundColor: list.color }}
                    >
                      {list.tasks && list.tasks.length > 0 ? (
                        list.tasks.map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id} index={index}>
                            {(provided) => (
                              <div
                              onClick={()=>setIsTaskOpen(true)}
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


          {isTaskOpen && <Opentask setIsTaskOpen={setIsTaskOpen}/>}

          <button
            className="add-list-button"
            onClick={() => setIsAddingList(true)}
          >
            + Add Another List
          </button>

          {isAddingList && (
            <div className="add-list-container">
              <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="Enter list name"
              />
              <button onClick={addList}>Save List</button>
              <button onClick={() => setIsAddingList(false)}>Cancel</button>
            </div>
          )}
        </div>
      </DragDropContext>
    </>
  );
};

export default Display;
