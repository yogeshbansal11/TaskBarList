import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import useGetLists from "../../CustomHooks/useGetLists";
import axios from "axios";

const Chart1 = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [taskCounts, setTaskCounts] = useState([]);

  const { lists, getLists } = useGetLists();
  const userId = localStorage.getItem("userId");
  // console.log("lists", lists);
  useEffect(() => {
    if (lists.length === 0) return;

    const fetchTasks = async () => {
      const counts = [];

      for (const list of lists) {
        if (list.user === userId) {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_KEY}/task/${list._id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            counts.push({
              listName: list.name,
              taskCount: response.data.length,
            });
          } catch (err) {
            console.error("Error fetching tasks:", err);
          }
        }
      }

      setTaskCounts(counts);
    };

    fetchTasks();
  }, [lists, userId]);

  useEffect(() => {
    if (!taskCounts.length || !chartRef.current) return;

    Chart.register(...registerables);

    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: taskCounts.map((data) => data.listName),
        datasets: [
          {
            label: "Tasks per List",
            data: taskCounts.map((data) => data.taskCount),
            backgroundColor: "#87888a",
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1, 
              callback: function (value) {
                return value % 1 === 0 ? value : ""; 
              },
            },
          },
        },
        
        elements: {
          bar: {
            borderRadius: 10, 
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [taskCounts]); 

  return (
    <div className="h-[500px] w-[47%] bg-gray-900 p-9 ml-6 rounded-lg">
      <canvas ref={chartRef} />
    </div>
  );
};

export default Chart1;
