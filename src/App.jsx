import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CaseSelection } from './components/CaseSelection';
import { CaseInvestigation } from './components/CaseInvestigation';
import { HowItWorks } from './components/HowItWorks';
import { Leaderboard } from './components/Leaderboard';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { CASE_FILES } from './data/cases';
import { loadGameState, saveGameState } from './utils/gameState';
import { sound } from './utils/sound';

export function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedCase, setSelectedCase] = useState(CASE_FILES[0]);
  const [gameState, setGameState] = useState(loadGameState());

  useEffect(() => {
    // Sync sound setting on load
    sound.setEnabled(gameState.soundEnabled);
  }, []);

  const handleToggleSound = () => {
    const nextVal = !gameState.soundEnabled;
    sound.setEnabled(nextVal);
    const updated = { ...gameState, soundEnabled: nextVal };
    setGameState(updated);
    saveGameState(updated);
    if (nextVal) {
      sound.click();
    }
  };

  const handleSelectCase = (caseItem) => {
    setSelectedCase(caseItem);
    setCurrentView('investigation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextCase = () => {
    const currentIndex = CASE_FILES.findIndex(c => c.id === selectedCase.id);
    if (currentIndex >= 0 && currentIndex + 1 < CASE_FILES.length) {
      setSelectedCase(CASE_FILES[currentIndex + 1]);
    } else {
      setCurrentView('cases');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCaseSolvedUpdate = (nextState) => {
    setGameState(nextState);
  };

  const currentCaseIndex = CASE_FILES.findIndex(c => c.id === selectedCase.id);

  return (
    <div className="app-container">
      {/* Top Cyber Navigation Bar */}
      <Navbar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        gameState={gameState}
        toggleSound={handleToggleSound}
      />

      {/* Main Dynamic View Content */}
      <main className="main-content">
        {currentView === 'landing' && (
          <Hero 
            onStartInvestigation={() => setCurrentView('cases')}
          />
        )}

        {currentView === 'cases' && (
          <CaseSelection 
            onSelectCase={handleSelectCase}
            gameState={gameState}
          />
        )}

        {currentView === 'investigation' && (
          <CaseInvestigation 
            caseData={selectedCase}
            caseIndex={currentCaseIndex >= 0 ? currentCaseIndex : 0}
            totalCases={CASE_FILES.length}
            onBackToCases={() => setCurrentView('cases')}
            onNextCase={handleNextCase}
            onCaseSolvedUpdate={handleCaseSolvedUpdate}
          />
        )}

        {currentView === 'how-it-works' && (
          <HowItWorks 
            onStartInvestigation={() => setCurrentView('cases')}
          />
        )}

        {currentView === 'leaderboard' && (
          <Leaderboard 
            gameState={gameState}
          />
        )}


        {currentView === 'about' && (
          <About />
        )}
      </main>

      {/* Persistent Cyberpunk Footer */}
      <Footer onNavigate={setCurrentView} />
    </div>
  );
}

export default App;
