import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

const Table = () => {
  const [taskItem, setTaskItem] = useState([]);
  const userId = localStorage.getItem("userId");

  const getAllTask = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/task/allTask`,
        {
          userId,
        }
      );
      setTaskItem(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllTask();
  }, [setTaskItem]);

  console.log(!"hloo");

  return (
    <div className="h-[78vh] bg-gray-900 text-white m-4 mt-6 rounded-md overflow-y-auto">
      <div className=" flex justify-center p-4">
        <table className="table-auto w-full ">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">List</th>
              <th className="px-4 py-2 text-left">Labels</th>
              <th className="px-4 py-2 text-left">Due date</th>
            </tr>
          </thead>
          <tbody>
            {taskItem.map((item, index) => (
              <tr key={index} className="border-b border-gray-600">
                <td className=" px-4 py-2">{item.name}</td>
                <td className=" px-4 py-2">{item.listName}</td>
                <td className=" px-4 py-2">
                  <div
                    className="h-6 w-12 rounded"
                    style={{ backgroundColor: item.taskColor || "#374151" }}
                  ></div>
                </td>
                <td className=" px-4 py-2">{item.dueDate ? (moment(item.dueDate).format("DD-MM-YYYY")): "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
