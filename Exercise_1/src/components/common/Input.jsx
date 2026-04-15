import React from 'react';

const Input = ({ value, onChange, placeholder, type = 'text', className }) => {
  return (
    <input 
      type={type} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      className={`custom-input ${className || ''}`}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        border: '1px solid var(--border)',
        fontSize: '1rem',
        outline: 'none',
        flex: 1
      }}
    />
  );
};

export default Input;
