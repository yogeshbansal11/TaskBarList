import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css'; 
import axios from 'axios';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  
  const [events, setEvents] = useState([]);
  const userId = localStorage.getItem('userId')
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.post('http://localhost:3000/task/getdueDateTask', {
          userId
        });
        const tasks = response.data;
        
        const events = tasks.map(task => ({
          title: task.name,
          start: new Date(task.startDate || task.dueDate),
          end: new Date(task.dueDate),
        }));
        
        setEvents(events);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    
    fetchTasks();
  },[]);
  
  return (
    <div className="h-[80vh] overflow-auto">

    <div className="h-[100vh] overflow-y-auto border-2 border-gray-900 p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-green-400 m-6 rounded-xl shadow-lg overflow-auto">
      <Calendar
        localizer={localizer}
        events={events} 
        startAccessor="start"
        endAccessor="end"
        style={{
          height: '100%',
          backgroundColor: 'transparent', 
        }}
        className="rounded-lg text-gray-400" 
        />
    </div>
        </div>
  );
};

export default CalendarComponent;