
// import React, { useState } from "react";

// const OpenTask = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // cosnt [date,setDate] = useState(false)

//   const handleModalOpen = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <button onClick={handleModalOpen} style={styles.taskButton}>
//         Task Options
//       </button>

//       {isModalOpen && (
//         <div style={styles.modal}>
//           <div style={styles.modalContent}>
//             <h3>Task Options</h3>
//             <button style={styles.button} >Date</button>
//             <button style={styles.button}>Attachment</button>
//             <button style={styles.button}>Location</button>
//             <button onClick={handleModalClose} style={styles.closeButton}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   taskButton: {
//     padding: "10px 20px",
//     fontSize: "16px",
//     backgroundColor: "#007BFF",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   modal: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1000,
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "8px",
//     textAlign: "center",
//     boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//     width: "300px",
//   },
//   button: {
//     margin: "10px 5px",
//     padding: "10px 15px",
//     backgroundColor: "#007BFF",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   closeButton: {
//     marginTop: "20px",
//     padding: "10px 15px",
//     backgroundColor: "#f44336",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
// };

// export default OpenTask;














import React, { useState } from "react";

const OpenTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

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

  return (
    <div>
      <button onClick={handleModalOpen} style={styles.taskButton}>
        Task Options
      </button>

      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Task Options</h3>
            <button style={styles.button} onClick={() => setIsDatePickerOpen(true)}>
              Date
            </button>
            <button style={styles.button}>Attachment</button>
            <button style={styles.button}>Location</button>
            <button onClick={handleModalClose} style={styles.closeButton}>
              Close
            </button>
          </div>

          {isDatePickerOpen && (
            <DatePicker
              onDateSelect={(date) => setSelectedDate(date)}
              onClose={() => setIsDatePickerOpen(false)}
            />
          )}
        </div>
      )}

      {selectedDate && <p style={styles.selectedDate}>Selected Date: {selectedDate}</p>}
    </div>
  );
};

const DatePicker = ({ onDateSelect, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateSelect = (day) => {
    const selectedDate = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    onDateSelect(selectedDate);
    onClose();
  };

  const renderCalendar = () => {
    const days = [];
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    const totalDays = daysInMonth(
      currentMonth.getMonth(),
      currentMonth.getFullYear()
    );

    // Add empty slots for the previous month's days
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={styles.emptySlot}></div>);
    }

    // Add days of the current month
    for (let day = 1; day <= totalDays; day++) {
      days.push(
        <button
          key={day}
          style={styles.dayButton}
          onClick={() => handleDateSelect(day)}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div style={styles.datePickerModal}>
      <div style={styles.calendarHeader}>
        <button onClick={handlePrevMonth} style={styles.navButton}>
          &lt;
        </button>
        <h4>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h4>
        <button onClick={handleNextMonth} style={styles.navButton}>
          &gt;
        </button>
      </div>
      <div style={styles.daysContainer}>{renderCalendar()}</div>
      <button onClick={onClose} style={styles.closeButton}>
        Close
      </button>
    </div>
  );
};

const styles = {
  taskButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
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
  datePickerModal: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid #ccc",
  },
  calendarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  navButton: {
    padding: "5px 10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  daysContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px",
    marginBottom: "10px",
  },
  dayButton: {
    padding: "10px",
    backgroundColor: "#e0e0e0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
  emptySlot: {
    visibility: "hidden",
  },
  selectedDate: {
    marginTop: "10px",
    fontWeight: "bold",
  },
};

export default OpenTask;









