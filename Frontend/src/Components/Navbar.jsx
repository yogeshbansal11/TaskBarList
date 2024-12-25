

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ click, setClick }) => {
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility
  const userId = localStorage.getItem("userId");

  const checkExpiry = async () => {
    const response = await axios.post("http://localhost:5050/auth/expirytime", {
      userId: userId,
    });
    setTime(response.data);
    // if (response.data === 0) {
    //   navigate("/Payment");
    // }
  };

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev); // Toggle the menu visibility
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
    alert("Logged out successfully!");
  };

  useEffect(() => {
    checkExpiry();
  }, [userId]);

  return (
    <header style={styles.navbar}>
      <div style={styles.brand}>
        <h1 style={styles.title}>TODO LIST</h1>
        <Link to={"/"} style={styles.btn}>
          Board
        </Link>
        <Link to={"/table"} style={styles.btn}>
          Table
        </Link>
      </div>
      <nav style={styles.nav}>
        <button style={styles.button}>{time} days left</button>
        <Link to={"/Login"}>
          <button style={styles.button}>Login</button>
        </Link>
        <Link to={"/Signup"}>
          <button style={{ ...styles.button, ...styles.signupButton }}>
            Sign Up
          </button>
        </Link>
        <div
          style={{
            ...styles.threeDotMenu,
            ...(menuOpen ? styles.threeDotMenuHover : {}),
          }}
          onClick={handleMenuToggle}
        >
          ⋮
        </div>
        {menuOpen && (
          <div style={styles.dropdownMenu}>
            <button
              style={styles.dropdownItem}
              onClick={() => navigate("/updateusername")}
            >
              <span style={styles.dropdownItemIcon}>👤</span> Update Username
            </button>
            <button
              style={styles.dropdownItem}
              onClick={() => navigate("/resetpassword")}
            >
              <span style={styles.dropdownItemIcon}>🔒</span> Reset Password
            </button>
            <button style={styles.dropdownItem} onClick={handleLogout}>
              <span style={styles.dropdownItemIcon}>🚪</span> Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "Purple",
    color: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  brand: {
    fontSize: "24px",
    fontWeight: "bold",
    display: "flex",
  },
  title: {
    margin: 0,
    color: "white",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  button: {
    backgroundColor: "#fff",
    color: "#2575fc",
    border: "none",
    padding: "8px 16px",
    marginLeft: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  signupButton: {
    backgroundColor: "#ff5722",
    color: "#fff",
  },
  btn: {
    padding: "8px 12px",
    margin: "7px 10px",
    borderRadius: "5px",
    backgroundColor: "white",
    color: "#2575fc",
    textDecoration: "none",
    fontWeight: "500",
    transition: "background 0.3s ease",
  },
  threeDotMenu: {
    fontSize: "24px",
    marginLeft: "10px",
    cursor: "pointer",
    color: "#fff",
    padding: "8px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transition: "background 0.3s ease, transform 0.3s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  threeDotMenuHover: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    transform: "scale(1.1)",
  },
  dropdownMenu: {
    position: "absolute",
    top: "50px",
    right: "20px",
    backgroundColor: "white",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    zIndex: 1000,
    overflow: "hidden",
    animation: "fadeIn 0.3s ease",
    minWidth: "180px",
    border: "1px solid #ddd",
  },
  dropdownItem: {
    padding: "15px 20px",
    backgroundColor: "white",
    color: "#333",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "16px",
    transition: "background 0.3s ease, color 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  dropdownItemIcon: {
    fontSize: "18px",
    color: "#2575fc",
  },
};

export default Navbar;
