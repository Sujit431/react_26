import React, { Suspense } from 'react';
import UserList from './components/UserList';
import './App.css';

// Fetching outside the component or in a way that provides a stable promise
const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

const usersPromise = fetchUsers();

function App() {
  return (
    <div className="container">
      <header className="page-header">
        <h1>User Card</h1>
      </header>
      
      <main>
        <Suspense fallback={
          <div className="loading-state">
            <p>Loading profiles...</p>
          </div>
        }>
          <UserList usersPromise={usersPromise} />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
