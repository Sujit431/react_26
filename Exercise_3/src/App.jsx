import React from 'react';
import GlobalCssButton from './components/GlobalCssButton';
import StatusCard from './components/StatusCard';
import { Header, Footer } from './components/BrandComponents';
import NavigationLink from './components/NavigationLink';
import './index.css';

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f4f8', /* Light bluish-white background */
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 50, 150, 0.1)',
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        
        <div style={{ padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          <NavigationLink />
          
          <GlobalCssButton />
          
          {/* Status cards passed with different props */}
          <StatusCard type="success">Operation Successful!</StatusCard>
          <StatusCard type="error">Something went wrong.</StatusCard>
          
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
