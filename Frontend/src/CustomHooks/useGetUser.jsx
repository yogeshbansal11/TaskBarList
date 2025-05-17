import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetUser = () => {
  const [userDetail, setUserDetail] = useState({});
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
  
  const getUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/auth/getUser`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adding the Authorization header
          },
        }
      );
      setUserDetail(response.data);
      console.log("user", response.data);
    } catch (error) {
      console.error("Error getUser:", error);
    }
  };

  useEffect(() => {
    if (userId && token) {
      getUser();
    }
  }, [userId, token]);

  return { userDetail, getUser };
};

export default useGetUser;
