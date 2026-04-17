import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Dashboard App</h1>
      <div className="nav-links">
        <button style={{ marginRight: '1rem', background: 'transparent', color: 'var(--text-dark)' }}>Home</button>
        <button>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
