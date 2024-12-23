import React, { useState,useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";

const Navbar = ({click , setClick}) => {
  const navigate = useNavigate();
  const [time,setTime] = useState(0)
  const userId = localStorage.getItem("userId")

  const checkExpiry = async()=>{
    const response = await axios.post("http://localhost:5050/auth/expirytime",{
      userId : userId
    })
    setTime(response.data)
    if(response.data===0){
      navigate("/Payment")
    }
    // console.log(">>>>>>>",time)
  }

  useEffect(()=>{
    checkExpiry();
  },[userId]);

  return (
    <header style={styles.navbar}>
      <div style={styles.brand}>
        <h1 style={styles.title}>TODO LIST</h1>
      <Link to={'/board'} style={styles.btn}>Board </Link>
       <Link to = {'/table'} style={styles.btn}>Table</Link>
      </div>
      <nav style={styles.nav}>
        <button style={styles.button}>{time} days left</button>
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
    backgroundColor: "Purple",
    color: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  brand: {
    fontSize: "24px",
    fontWeight: "bold",
    display:"flex",
  },

  title: {
    margin: 0,
    color:"white"
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
  btn:{
    padding:"0px 8px",
    margin: "7px 10px",
    borderRadius:"5px",
    // color:"#007bff"
    backgroundColor:"white"
  }
};

export default Navbar;


