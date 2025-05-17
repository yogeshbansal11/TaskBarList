import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken } from "../Redux/slice";

function Login({ getBgUrl }) {
  const [userDetail, setUserDetail] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/login`, {
        ...userDetail,
      });
  
      if (response.status === 200) {
        toast.success("Login Successfully!");
        setUserDetail({});
        // localStorage.setItem("token", response.data.token);
        dispatch(setToken(response.data.token));
        localStorage.setItem("userId", response.data._id);
  
        await getBgUrl();
        
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Please try again.");
    }
  };
  


  return (
    <div className="login  flex justify-center items-center h-[90vh] w-[100vw]">
      <div className="auth-container bg-gray-400 p-5 rounded-lg shadow-md w-[400px] mx-auto">
        <h2 className="text-center mb-5 text-gray-800 text-xl font-semibold">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-3 text-start">
            Email:
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
              onChange={(e) =>
                setUserDetail({
                  ...userDetail,
                  email: e.target.value,
                })
              }
            />
          </label>
          <label className="block mb-3 text-start">
            Password:
            <input
              type="password"
              placeholder="Enter Password"
              name="Password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
              onChange={(e) =>
                setUserDetail({
                  ...userDetail,
                  password: e.target.value,
                })
              }
            />
          </label>
          <button
            type="submit"
            className="w-full p-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md font-semibold"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-teal-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
