import React, { useState } from "react";
import axios from "axios";

const Navbar3 = () => {
  const [showTemplates, setShowTemplates] = useState(false); 

  const templates = [
    {
      id: 1,
      name: "Colourful",
      image:
        "https://img.freepik.com/free-vector/rainbow-coloured-watercolour-texture-background_1048-16710.jpg",
    },
    {
      id: 2,
      name: "Bubble coded",
      image:
        "https://freerangestock.com/sample/53368/copyspace-background-shows-backgrounds-bubbles-and-template.jpg",
    },
    {
      id: 3,
      name: "Gazzy design",
      image:
        "https://asset.gecdesigns.com/img/background-templates/dark-blue-background-with-the-diamond-pattern-template-sr06012408-1704699724568-cover.webp",
    },
    {
      id: 4,
      name: "Crickex",
      image:
        "https://i.pinimg.com/474x/8b/fa/72/8bfa72fd56471af37bf0d4bb88a2e623.jpg",
    },
  ];

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#20232a",
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
      position: "relative",
    },
    dropdownBox: {
      position: "absolute",
      top: "30px",
      left: "0",
      backgroundColor: "white",
      color: "#20232a",
      border: "1px solid #ddd",
      borderRadius: "4px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "10px",
      zIndex: "100",
      // display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "10px",
    },
    templateItem: {
      display: "flex",
      margin:"10px",
      // flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    templateImage: {
      width: "80px",
      height: "40px",
      borderRadius: "4px",
    },
    createButton: {
      padding: "5px 15px",
      backgroundColor: "#0079bf",
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
      backgroundColor: "#f4c542",
      color: "#20232a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      fontWeight: "bold",
    },
  };


  const handletemplate = async(image) => {

    // console.log(image)
    try{
      const response = await axios.patch("http://localhost:5050/auth/background", {
        userId,
        background: image,
      })
      if (response.status === 200) {
        console.log("Background updated successfully!");
      } else {
        console.log("background not updated")
      }
    } catch (error) {
      console.error("Error updating background:", error.message);
    }
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.navbarLeft}>
        <div style={styles.icon}>▦</div>
        <div style={styles.item}>Trello</div>
        <div style={styles.dropdown}>Workspaces ▼</div>
        <div style={styles.dropdown}>Recent ▼</div>
        <div style={styles.dropdown}>Starred ▼</div>
        <div
          style={styles.dropdown}
          onClick={() => setShowTemplates(!showTemplates)}
        >
          Templates ▼
          {showTemplates && (
            <div style={styles.dropdownBox}>
              {templates.map((template) => (
                <div onClick={handletemplate(template.image)} key={template.id} style={styles.templateItem}>
                  <img
                    src={template.image}
                    alt={template.name}
                    style={styles.templateImage}
                  />
                  <p>{template.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <button style={styles.createButton}>Create</button>
      </div>

      <div style={styles.navbarRight}>
        <input type="text" style={styles.searchBar} placeholder="Search" />
        <div style={styles.icon}>🏷️</div>
        <div style={styles.icon}>❓</div>
        <div style={styles.avatar}>YB</div>
      </div>
    </div>
  );
};

export default Navbar3;
