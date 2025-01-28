import React, { useState } from "react";
import axios from "axios";

const OpenTask = ({ setIsTaskOpen, taskId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");
  const [label, setLabel] = useState(false);
  const [color, setColor] = useState("");

  const handlelabel = () => {
    setLabel(!label);
  };
  // console.log("taskid",taskId);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDatePickerOpen(false);
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleDueDates = async (e) => {
    try {
      setDueDate(e.target.value);
      const response = await axios.post("http://localhost:5050/tasks/dueDate", {
        taskId,
        dueDate: e.target.value,
      });
      setMessage(response.data.message || "Dates updated successfully!");
    } catch (error) {
      setMessage("Failed to update dates. Please try again.");
      console.error(error);
    }
  };
  const handleStartDates = async (e) => {
    try {
      setStartDate(e.target.value);
      const response = await axios.post(
        "http://localhost:5050/tasks/startDate",
        {
          taskId,
          startDate: e.target.value,
        }
      );
      setMessage(response.data.message || "Dates updated successfully!");
      console.log("yugggggggggggggggggggt");
    } catch (error) {
      setMessage("Failed to update dates. Please try again.");
      console.error(error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5050/tasks/deletetask",
        {
          taskId,
        }
      );

      if (response.status === 200) {
        setMessage("Task deleted successfully!");
        setIsTaskOpen(false);
      } else {
        setMessage("Failed to delete task. Please try again.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Error deleting task. Please try again."
      );
      console.error("Error details:", error);
    }
  };

  const handleSetColor = async (label) => {
    try {
      const response = await axios.patch(
        "http://localhost:5050/tasks/setcolor",
        {
          taskId,
          label,
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error details:", error);
    }
  };

  return (
    <>
      <div onClick={() => setIsTaskOpen(false)} style={styles.modal}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={styles.modalContent}
        >
          <h3>Task Options</h3>
          <button
            style={styles.button}
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          >
            Date
          </button>
          {isDatePickerOpen && (
            <div>
              <label>
                Start Date
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleStartDates(e)}
                />
              </label>
              <label>
                Due Date
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => handleDueDates(e)}
                />
              </label>
              {/* <button style={styles.button} onClick={handleDueDates}>
                Save Dates
              </button> */}
            </div>
          )}
          <button style={styles.button}>Attachment</button>
          <button style={styles.button}>Location</button>
          <button style={styles.button} onClick={handlelabel}>
            Label
          </button>
          {label && (
            <div>
              <label>
                Color
                <input
                  type="color"
                  onChange={(e) => handleSetColor(e.target.value)}
                />
              </label>
            </div>
          )}
          <button style={styles.button} onClick={handleDeleteTask}>
            Delete Task
          </button>

          <button
            onClick={() => setIsTaskOpen(false)}
            style={styles.closeButton}
          >
            Close
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

const styles = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    borderRadius: "10px solid",
    backgroundColor: "gray",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
  },
  button: {
    margin: "10px 5px",
    padding: "10px 15px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "block",
  },
  closeButton: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default OpenTask;
