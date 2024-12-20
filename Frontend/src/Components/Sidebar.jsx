
import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleSidebarClick = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div 
            className={`sidebar-container ${collapsed ? 'collapsed' : ''}`} 
            onClick={handleSidebarClick}
        >
            <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                {!collapsed && (
                    <>
                        <div className="sidebar-header">
                            <h2 className="workspace-title">Trello Workspace</h2>
                        </div>
                        <ul className="sidebar-links">
                            <li><button className="sidebar-link">Boards</button></li>
                            <li><button className="sidebar-link">Members</button></li>
                            <li><button className="sidebar-link">Workspace Settings</button></li>
                        </ul>
                        <div className="boards-section">
                            <h3 className="section-title">Your Boards</h3>
                            <ul className="boards-list">
                                <li>
                                    <button className="board-item">
                                        <span className="board-color"></span>
                                        <span className="board-name">regex</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
