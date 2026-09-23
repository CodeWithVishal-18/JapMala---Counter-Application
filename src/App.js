import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from './Navbar';
import Home from './Home';
import Counter from './Counter';
import ActiveCounter from './ActiveCounter';
import Footer from './Footer';
import SadhanaDashboard from './components/SadhanaDashboard';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Ganeshji from './mantracategory/Ganeshji';
import Shivji from './mantracategory/Shivji';
import Vishnuji from './mantracategory/Vishnuji';
import GayatriMantra from './mantracategory/GayatriMantra';
import Mahamritunjay from './mantracategory/Mahamritunjay';
import Hanumanji from './mantracategory/Hanumanji';
import { getSavedActiveCounter, clearSavedActiveCounter } from './utils/storage';

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [currentCounter, setCurrentCounter] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for saved in-progress counter on mount
  useEffect(() => {
    const saved = getSavedActiveCounter();
    if (saved && saved.current > 0) {
      setCurrentCounter(saved);
      setScreen('counter');
    }
  }, []);

  // Listen for navigation state from mantra details page ("Start 108 Jaap")
  useEffect(() => {
    if (location.state?.autoStartCounter) {
      const { title, target } = location.state.autoStartCounter;
      setCurrentCounter({
        title: title || 'Mantra Jaap',
        target: target || 108,
        current: 0,
        malasCompleted: 0,
        startedAt: Date.now(),
      });
      setScreen('counter');
      // Clear location state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleCreateClick = () => {
    setScreen('create');
  };

  const handleCreateCounter = (counter) => {
    setCurrentCounter(counter);
    setScreen('counter');
  };

  const handleSessionEnd = (result) => {
    clearSavedActiveCounter();
    setCurrentCounter(null);
    setScreen('history');
  };

  const handleGoHome = () => {
    setScreen('welcome');
  };

  const handleOpenHistory = () => {
    setScreen('history');
  };

  const isCounterActive = screen === 'counter' && !!currentCounter;

  return (
    <div className="d-flex flex-column min-vh-100 japmala-app" style={{ backgroundColor: '#FDF6EE' }}>
      {!isCounterActive && <Navbar onOpenHistory={handleOpenHistory} onGoHome={handleGoHome} />}

      <main
        className="flex-grow-1 d-flex flex-column"
        style={{
          paddingTop: isCounterActive ? '0' : '5.5rem',
          paddingBottom: isCounterActive ? '0' : '2.5rem',
          height: isCounterActive ? '100dvh' : 'auto',
        }}
      >
        <div className={`d-flex flex-column justify-content-center flex-grow-1 ${isCounterActive ? 'p-0 h-100 w-100' : 'container'}`}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {screen === 'welcome' && (
                    <Home
                      onCreateClick={handleCreateClick}
                      onViewHistory={handleOpenHistory}
                    />
                  )}
                  {screen === 'create' && (
                    <Counter
                      onCreateCounter={handleCreateCounter}
                      onCancel={handleGoHome}
                    />
                  )}
                  {screen === 'counter' && currentCounter && (
                    <ActiveCounter
                      counter={currentCounter}
                      onSessionEnd={handleSessionEnd}
                      onBackToHome={handleGoHome}
                    />
                  )}
                  {screen === 'history' && (
                    <SadhanaDashboard
                      onBackToHome={handleGoHome}
                      onStartChanting={handleCreateClick}
                    />
                  )}
                </>
              }
            />
            <Route path="/ganeshji" element={<Ganeshji />} />
            <Route path="/shivji" element={<Shivji />} />
            <Route path="/vishnuji" element={<Vishnuji />} />
            <Route path="/gayatrimantra" element={<GayatriMantra />} />
            <Route path="/mahamritunjayjap" element={<Mahamritunjay />} />
            <Route path="/hanumanji" element={<Hanumanji />} />
          </Routes>
        </div>
      </main>

      {!isCounterActive && <Footer />}
    </div>
  );
}
