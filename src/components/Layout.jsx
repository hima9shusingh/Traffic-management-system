import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings2, TrafficCone, LogOut } from 'lucide-react';

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('traffic_auth');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <TrafficCone color="var(--text-main)" size={24} />
            TrafficController
          </div>
        </div>
        <nav className="nav-links">
          <NavLink to="/dashboard" className="nav-link">
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/traffic-input" className="nav-link">
            <Settings2 size={20} />
            Traffic Levels
          </NavLink>
          <NavLink to="/signal-control" className="nav-link">
            <TrafficCone size={20} />
            Active Signals
          </NavLink>
        </nav>
        <div style={{ marginTop: 'auto', padding: '1.5rem 1rem' }}>
          <button 
            onClick={handleLogout} 
            className="nav-link" 
            style={{ 
              color: 'var(--signal-red)', 
              width: '100%', 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
