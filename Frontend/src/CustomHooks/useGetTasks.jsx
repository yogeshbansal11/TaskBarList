import { useState, useEffect } from "react";
import axios from "axios";

const useGetTasks = (listId) => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  const getTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/task/${listId}`,{headers: {Authorization: `Bearer ${token}`}}
      );
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } 
  };

  useEffect(() => {
    if (listId) {
      getTasks();
    }
  }, [listId]);

  return { tasks, getTasks };
};

export default useGetTasks;
