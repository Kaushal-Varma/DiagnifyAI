import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ImageAnalyzer from './components/ImageAnalyzer';
import DiseaseChecker from './components/DiseaseChecker';
import FactsCarousel from './components/FactsCarousel';
import EmergencyLocator from './components/EmergencyLocator';
import MaintenancePage from './components/MaintenancePage';

// TOGGLE THIS TO TRUE TO ENABLE MAINTENANCE MODE
const MAINTENANCE_MODE = true;

function App() {
  const [activeTab, setActiveTab] = useState('analyze');

  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'analyze':
        return <ImageAnalyzer />;
      case 'symptoms':
        return <DiseaseChecker />;
      case 'facts':
        return <FactsCarousel />;
      case 'emergency':
        return <EmergencyLocator />;
      default:
        return <ImageAnalyzer />;
    }
  };

  return (
    <div className="app-container" style={{ paddingBottom: '100px' }}>
      <header style={{ padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <img src="/logo.jpg" alt="DiagnifyAI Logo" style={{ width: '80px', height: '80px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }} />
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(to right, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            DiagnifyAI
          </h1>
          <p style={{ color: 'var(--text-dim)', marginTop: '5px' }}>Your Personal AI Medical Assistant</p>
        </div>
      </header>

      <main>
        {renderContent()}
      </main>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
