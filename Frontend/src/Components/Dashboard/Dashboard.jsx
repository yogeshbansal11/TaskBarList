import React from 'react'
import Chart1 from './Chart1.jsx'
import PieChartComponent from './PieChart.jsx'
console.log("uybhj")

const Dashboard = () => {
  return (
    <div className='flex justify-between m-6 pt-6 bg-gray-950 h-[80vh] rounded-md'>
      <Chart1 />
      <PieChartComponent />
    </div>
  )
}

export default Dashboard
