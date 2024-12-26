import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css'; // Custom CSS file for further customizations if needed
import axios from 'axios';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const userId = localStorage.getItem('userId');
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.post('http://localhost:5050/tasks/getdueDateTask', {
          userId
        });
        const tasks = response.data;
        
        const events = tasks.map(task => ({
          title: task.name,
          start: new Date(task.startDate || task.dueDate ),
          end: new Date(task.dueDate),
        }));
        
        setEvents(events);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    
    fetchTasks();
  }, []); // Empty dependency array ensures it runs once on mount
  
  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events} // Use the events state from the API
        startAccessor="start"
        endAccessor="end"
        style={{
          height: '100%',
          backgroundColor: 'transparent', // Removes the white background
        }}
        className="calendar"
      />
    </div>
  );
};

export default CalendarComponent;
