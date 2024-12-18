// Sidebar.js
import React from 'react';
import './Sidebar.css'; // You can create a separate CSS file for styling

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li onClick={() => setActiveSection('lists')}>My Lists</li>
        <li onClick={() => setActiveSection('create')}>Create List</li>
      </ul>
    </div>
  );
};

export default Sidebar;
