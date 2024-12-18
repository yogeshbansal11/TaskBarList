import React from "react";
import {Link} from "react-router-dom"

const Navbar = ({click , setClick}) => {
  return (
    <header style={styles.navbar}>
      <div style={styles.brand}>
        <h1 style={styles.title}>Task Manager</h1>
      </div>
      <nav style={styles.nav}>
      <Link to={'/Login'}>  <button style={styles.button}>Login</button></Link>
      <Link to={'/Signup'}>  <button style={{ ...styles.button, ...styles.signupButton }}>Sign Up</button> </Link >
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
    backgroundColor: "#007bff",
    color: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  brand: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  title: {
    margin: 0,
  },
  nav: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    color: "#007bff",
    border: "none",
    padding: "8px 16px",
    marginLeft: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  signupButton: {
    backgroundColor: "#ff5722",
    color: "#fff",
  },
};

export default Navbar;
