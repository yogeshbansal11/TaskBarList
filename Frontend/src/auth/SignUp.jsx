import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function SignUp() {
  const [userDetail, setuserDetail] = useState({});
  const [referral , setReferral]  = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/signup`, {
        ...userDetail,
      });

      if (response.status === 201) {
        toast.success("SignUp Successfully!, Please Login");
        setuserDetail({});
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Please try again...");
    }
  };

  return (
    <div className="  flex justify-center items-center h-[90vh] w-[100vw]">
      <div className=" bg-gray-400 p-5 rounded-lg shadow-md w-[400px] mx-auto">
        <h2 className="text-center mb-5 text-gray-800 text-xl font-semibold">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-3 text-start">
            Name:
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
              onChange={(e) =>
                setuserDetail({
                  ...userDetail,
                  name: e.target.value,
                })
              }
            />
          </label>
          <label className="block mb-3 text-start">
            Email:
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
              onChange={(e) =>
                setuserDetail({
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
              placeholder="Enter password"
              name="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
              onChange={(e) =>
                setuserDetail({
                  ...userDetail,
                  password: e.target.value,
                })
              }
            />
          </label>
          <label className="block mb-3 text-start">
            Confirm Password:
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
              onChange={(e) =>
                setuserDetail({
                  ...userDetail,
                  conformPassword: e.target.value,
                })
              }
            />
          </label>
          <p onClick={()=>setReferral(!referral)} className="block mb-3 text-start cursor-pointer" >Referral Code (Optional) &#8595;</p>
          {referral && <input
              type="text"
              placeholder="enter referral code"
              className="w-full p-2 mt-1 border mb-3 border-gray-300 rounded-md"
              onChange={(e) =>
                setuserDetail({
                  ...userDetail,
                  refCode: e.target.value,
                })
              }
            />}
          <button
            type="submit"
            className="w-full p-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md font-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-2 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
