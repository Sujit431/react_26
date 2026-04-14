import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} React Day 1 Assignment</p>
      <div className="footer-links">
        <span>Privacy Policy</span> | <span>Terms of Service</span>
      </div>
    </footer>
  );
};

export default Footer;
