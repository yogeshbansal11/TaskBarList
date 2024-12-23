import React from "react";

const Navbar3 = () => {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#20232a", // Dark background
      color: "white",
    },
    navbarLeft: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    navbarRight: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    item: {
      fontSize: "16px",
      cursor: "pointer",
    },
    dropdown: {
      cursor: "pointer",
    },
    createButton: {
      padding: "5px 15px",
      backgroundColor: "#0079bf", // Blue button
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    timeButton: {
      padding: "5px 15px",
      backgroundColor: "#a29bfe", // Purple button
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    searchBar: {
      padding: "5px 10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    icon: {
      fontSize: "18px",
      cursor: "pointer",
    },
    avatar: {
      width: "30px",
      height: "30px",
      backgroundColor: "#f4c542", // Yellow circle
      color: "#20232a", // Dark text
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.navbarLeft}>
        <div style={styles.icon}>▦</div>
        <div style={styles.item}>Trello</div>
        <div style={styles.dropdown}>Workspaces ▼</div>
        <div style={styles.dropdown}>Recent ▼</div>
        <div style={styles.dropdown}>Starred ▼</div>
        <div style={styles.dropdown}>Templates ▼</div>
        <button style={styles.createButton}>Create</button>
      </div>

      <div style={styles.navbarRight}>
        {/* <button style={styles.timeButton}>14 days left</button> */}
        <input
          type="text"
          style={styles.searchBar}
          placeholder="Search"
        />
        <div style={styles.icon}>🏷️</div>
        <div style={styles.icon}>❓</div>
        <div style={styles.avatar}>YB</div>
      </div>
    </div>
  );
};

export default Navbar3;
