// UserProfile.jsx
// Boilerplate: Functional component with props & default value via destructuring

function UserProfile({ username, age, isAdmin = false }) {
  return (
    <div className="card user-profile-card">
      <div className="avatar">
        {username ? username.charAt(0).toUpperCase() : "?"}
      </div>
      <h3 className="username">{username}</h3>
      <p className="age">Age: <strong>{age}</strong></p>
      <span className={`badge ${isAdmin ? "badge-admin" : "badge-user"}`}>
        {isAdmin ? "🛡️ Admin" : "👤 User"}
      </span>
    </div>
  );
}

export default UserProfile;
