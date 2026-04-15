import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Menu</h3>
      <ul style={{ listStyle: 'none', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li>Dashboard</li>
        <li>Analytics</li>
        <li>Settings</li>
        <li>Help</li>
      </ul>
    </aside>
  );
};

export const MainContent = () => {
  return (
    <div className="main-content">
      <h3>Welcome to the Dashboard</h3>
      <p style={{ marginTop: '1rem', color: 'var(--text-light)' }}>
        This is the main content area where charts, tables, and other data would typically go.
        It spans the remaining horizontal space next to the sidebar.
      </p>
    </div>
  );
};

export const StatusFooter = () => {
  return (
    <div className="status-footer">
      Status: All Systems Operational
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <Sidebar />
        <MainContent />
      </div>
      <StatusFooter />
    </div>
  );
};

export default Dashboard;
