import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";

const ChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Register all necessary components from Chart.js
    Chart.register(...registerables);

    const ctx = chartRef.current.getContext("2d");

    // Destroy the chart if it already exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Monthly Sales",
            data: [10, 20, 15, 25, 30],
            backgroundColor: "rgba(8, 20, 20, 0.5)",
            borderColor: "rgb(187, 218, 218)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow custom height and width
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      // Cleanup: Destroy the chart instance on component unmount
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div
      style={{
        height: "400px",
        width: "500px",
        backgroundColor: " darkgrey", // Grey background color
        padding: "18px", // Add some padding for spacing
        borderRadius: "8px", // Optional: Rounded corners
        margin:"30px"
      }}
    >
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartComponent;
