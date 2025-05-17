import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

const PieChartComponent = () => {
  const userId = localStorage.getItem("userId");
  const [taskItem, setTaskItem] = useState([]);
  const [dueDateList, setDueDateList] = useState([]);
  const getAllTask = async () => {
    const now = new Date();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/task/allTask`,
        {
          userId,
        }
      );
      setTaskItem(response.data);
      const withDueDate = response.data.filter((item) => item.dueDate);
      setDueDateList(
        withDueDate.filter((item) => {
          const dueDate = new Date(item.dueDate);
          return dueDate < now;
        })
      );
      // console.log("pie", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("piii", dueDateList);
  useEffect(() => {
    getAllTask();
  }, [setTaskItem]);

  return (
    <div className="h-[500px] w-[47%] bg-gray-900 p-9 mr-6 rounded-lg flex justify-between">
      <div className="w-[60%] ml-10">
        <PieChart
          data={[
            { title: "Due Date", value: dueDateList.length, color: "#e2483d" },
            {
              title: "No due Date",
              value: taskItem.length - dueDateList.length,
              color: "#454f59",
            },
            // { title: "Three", value: 20, color: "#6A2135" },
          ]}
        />
      </div>
      <div className="text-gray-500 h-36 justify-center flex flex-col m-5 gap-y-3">
        <div className="flex">
          <div className="h-4 w-4 rounded-md bg-[#e2483d] mr-2 m-1"></div>
          <p>Due Date</p>
        </div>
        <div className="flex">
          <div className="h-4 w-4 rounded-md bg-[rgb(44,99,43)] mr-2 m-1"></div>
          <p>Complete</p>
        </div>
        <div className="flex">
          <div className="h-4 w-4 rounded-md bg-[#454f59] mr-2 m-1"></div>
          <p>No Due Date</p>
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
