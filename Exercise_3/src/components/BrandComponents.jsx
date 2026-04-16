import React from 'react';

// Using the --primary-color defined in index.css

export function Header() {
  return (
    <header style={{ 
      backgroundColor: 'var(--primary-color)', 
      color: 'white', 
      padding: '16px',
      borderRadius: '8px 8px 0 0',
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'bold'
    }}>
      App Header
    </header>
  );
}

export function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--primary-color)', 
      color: 'white', 
      padding: '12px',
      borderRadius: '0 0 8px 8px',
      textAlign: 'center',
      marginTop: '10px'
    }}>
      App Footer
    </footer>
  );
}
