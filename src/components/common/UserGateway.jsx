import React, { useState } from 'react';

const AdminPanel = ({ name }) => {
  return (
    <div className="admin-panel">
      ⚙️ Administrator Tools (Access granted to {name})
      <p style={{ marginTop: '0.5rem', fontWeight: 'normal', color: 'var(--text-dark)' }}>
        You can manage users, view system logs, and configure settings.
      </p>
    </div>
  );
};

const UserGateway = () => {
  // Use React state to make the UI dynamic!
  const [user, setUser] = useState({ name: "Alex", role: "admin", status: "active" });

  const renderContent = () => {
    // If status is "suspended", render a "Contact Support" warning instead of the regular UI.
    if (user.status === "suspended") {
      return (
        <div className="contact-support">
          ⚠️ Account Suspended: Please contact support to resolve this issue.
        </div>
      );
    }

    return (
      <>
        <h3>Welcome back, {user.name}!</h3>
        
        {/* If role is "admin", render a special AdminPanel component. */}
        {user.role === "admin" && <AdminPanel name={user.name} />}
        
        {user.role !== "admin" && (
          <p style={{ marginTop: '1rem', color: 'var(--text-light)' }}>
            You have successfully logged in. View your metrics below.
          </p>
        )}
      </>
    );
  };

  return (
    <div className="user-gateway">
      {/* Controls to demonstrate functionality dynamically in the UI */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <button onClick={() => setUser({ ...user, role: user.role === 'admin' ? 'user' : 'admin' })}>
          Toggle Role (Current: {user.role})
        </button>
        <button onClick={() => setUser({ ...user, status: user.status === 'active' ? 'suspended' : 'active' })} style={{ background: user.status === 'active' ? 'var(--primary)' : 'var(--danger)' }}>
          Toggle Status (Current: {user.status})
        </button>
      </div>

      {/* Render the gateway contents underneath the controls */}
      {renderContent()}
    </div>
  );
};

export default UserGateway;
