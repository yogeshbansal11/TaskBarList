
import React from "react";

const Navbar2 = () => {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#4b224d",
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
      padding: "5px 10px",
      fontSize: "16px",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    itemActive: {
      backgroundColor: "white",
      color: "#4b224d",
    },
    itemHover: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    icon: {
      fontSize: "18px",
      cursor: "pointer",
    },
    dropdown: {
      cursor: "pointer",
    },
    avatar: {
      width: "30px",
      height: "30px",
      backgroundColor: "#f4c542",
      borderRadius: "50%",
      color: "#4b224d",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
    },
    button: {
      padding: "5px 15px",
      borderRadius: "4px",
      border: "none",
      color: "white",
      cursor: "pointer",
    },
    createButton: {
      backgroundColor: "#0079bf",
    },
    timeButton: {
      backgroundColor: "#a29bfe",
    },
    searchBar: {
      padding: "5px 10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.navbarLeft}>
        <div style={styles.item}>TODO LIST</div>
        <div style={{ ...styles.item, ...styles.itemActive }}>Board</div>
        <div style={styles.item}>Table</div>
      </div>

      <div style={styles.navbarRight}>
        {/* <div style={styles.icon}>🔗</div> */}
        <div style={styles.icon}>⚡</div>
        <div style={styles.item}>Filters</div>
        <div style={styles.avatar}>YB</div>
        <div style={styles.item}>Share</div>
    <span>...</span>
      </div>
    </div>
  );
};

export default Navbar2;
