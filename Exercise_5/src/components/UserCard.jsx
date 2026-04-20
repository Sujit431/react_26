import React from 'react';
import './UserCard.css';
import manAvatar from '../assets/man-professional.png';
import womanAvatar from '../assets/woman-professional.png';

const UserCard = ({ user }) => {
  // Mapping API data to the requested fields
  const jobTitle = user.company.name;
  const department = user.company.catchPhrase.split(' ').slice(0, 1).join(''); 
  const officePhone = user.phone.split(' x')[0]; 
  const mobile = user.phone;
  
  // Mapping gender based on names to select the appropriate local professional avatar
  const isFemale = ['Leanne', 'Clementine', 'Patricia', 'Chelsey', 'Glenna', 'Clementina'].some(name => user.name.includes(name));
  
  // Use local professional assets generated to match screenshot exactly
  const avatarUrl = isFemale ? womanAvatar : manAvatar;

  return (
    <div className="user-card">
      <div className="avatar-container">
        <div className="avatar-background">
          <img src={avatarUrl} alt={user.name} />
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="user-name">Name: {user.name}</h3>
        
        <div className="info-row">
          <span className="label">Job Title:</span>
          <span className="value">{jobTitle}</span>
        </div>
        
        <div className="info-row">
          <span className="label">Department:</span>
          <span className="value">{department}</span>
        </div>
        
        <div className="info-row">
          <span className="label">Office Phone:</span>
          <span className="value">{officePhone}</span>
        </div>
        
        <div className="info-row">
          <span className="label">Mobile:</span>
          <span className="value">{mobile}</span>
        </div>
        
        <div className="info-row">
          <span className="label">Email:</span>
          <span className="value">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
