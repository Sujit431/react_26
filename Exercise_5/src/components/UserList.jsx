import React, { use } from 'react';
import UserCard from './UserCard';

const UserList = ({ usersPromise }) => {
  // Using the React 19 use() hook to handle the promise
  const users = use(usersPromise);

  return (
    <div className="gallery-grid">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
