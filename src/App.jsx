import React, { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Dashboard from './components/layout/Dashboard'
import UserGateway from './components/common/UserGateway'
import Button from './components/common/Button'
import Input from './components/common/Input'

function App() {
  const currentYear = new Date().getFullYear();
  const [alertText, setAlertText] = useState("");

  const handleAlert = () => {
    if (alertText.trim() === "") {
      alert("Please enter a message in the input field first!");
    } else {
      alert(`Message from input: ${alertText}`);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-workout">
        {/* Reusable UI Section */}
        <section className="gateway-section">
          <h2>Reusable UI Elements</h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Input 
              value={alertText}
              onChange={(e) => setAlertText(e.target.value)}
              placeholder="Enter a message to alert..."
            />
            <Button onClick={handleAlert}>Trigger Alert</Button>
          </div>
        </section>

        {/* Dynamic User Gateway component */}
        <section className="gateway-section">
          <h2>User Portal</h2>
          <UserGateway />
        </section>

        {/* Dashboard Component containing Sidebar, MainContent, and StatusFooter */}
        <section className="dashboard-section">
          <Dashboard />
        </section>
        
        {/* Requirement 4: JSX element displaying the current year */}
        <section className="year-section">
          <p className="copyright-text">
            Copyright &copy; {currentYear}. React Assignment Code.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
