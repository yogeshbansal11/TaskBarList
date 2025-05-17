import { useState, useEffect } from "react";
import axios from "axios";

const useGetLists = () => {
  const [lists, setLists] = useState([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const getLists = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/list/${userId}`,{headers:{Authorization:`Baerer ${token}`}}
      );
      console.log("list");
      
      setLists(response.data);
    } catch (err) {
      console.error("Error fetching lists:", err);
      setError(err);
    } 
  };

  useEffect(() => {
    if (userId) {
      getLists();
    }
  }, [userId]);

  return { lists, getLists };
};

export default useGetLists;
