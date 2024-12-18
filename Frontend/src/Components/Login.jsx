// // Import React and CSS
// import React, { useState } from "react";
// import "./Loginpage.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// const LoginPage = ({setClick}) => {
//   const navigate=useNavigate()
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
  
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
    
//       const response = await axios.post("http://localhost:5050/auth/login", formData);
//    alert("done login")
//    const token =response.data.token
//    localStorage.setItem("token",token)
//    localStorage.setItem("userId",response.data._id)
  
//    navigate('/display')
//     } catch (error) {
      
//       alert("Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="login-button">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// Import React and CSS
import React, { useState } from "react";
import "./Loginpage.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5050/auth/login",
        formData
      );
      alert("Login successful!");
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", response.data._id);

      navigate("/display");
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Forget Password Link */}
        <div className="forgot-password-link">
          <Link to="/Forgetpassword">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
