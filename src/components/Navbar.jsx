import React, { useState } from 'react';
import { Terminal, Shield, Award, Volume2, VolumeX, Menu, X, Code, Search } from 'lucide-react';
import { sound } from '../utils/sound';

export function Navbar({ currentView, setCurrentView, gameState, toggleSound }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalXp = gameState.baseXp + gameState.earnedXp;

  const handleNavClick = (view) => {
    sound.click();
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="nav-container">
        {/* Brand Logo */}
        <div 
          className="brand-logo" 
          onClick={() => handleNavClick('landing')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('landing')}
          aria-label="CODECRIME Home"
        >
          <div className="brand-badge">
            <span style={{ color: '#00ff88' }}>&lt;/&gt;</span>
            <Search size={14} style={{ color: '#00f0ff' }} />
          </div>
          <span className="brand-title">CODECRIME</span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <button 
              className={`nav-link-btn ${currentView === 'landing' ? 'active' : ''}`}
              onClick={() => handleNavClick('landing')}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              className={`nav-link-btn ${currentView === 'cases' || currentView === 'investigation' ? 'active' : ''}`}
              onClick={() => handleNavClick('cases')}
            >
              Cases
            </button>
          </li>
          <li>
            <button 
              className={`nav-link-btn ${currentView === 'how-it-works' ? 'active' : ''}`}
              onClick={() => handleNavClick('how-it-works')}
            >
              How It Works
            </button>
          </li>
          <li>
            <button 
              className={`nav-link-btn ${currentView === 'leaderboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('leaderboard')}
            >
              Leaderboard
            </button>
          </li>
          <li>
            <button 
              className={`nav-link-btn ${currentView === 'profile' ? 'active' : ''}`}
              onClick={() => handleNavClick('profile')}
            >
              Profile
            </button>
          </li>
          <li>
            <button 
              className={`nav-link-btn ${currentView === 'about' ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              About
            </button>
          </li>
        </ul>

        {/* Nav Actions */}
        <div className="nav-actions">
          {/* Sound Toggle */}
          <button 
            className={`sound-toggle-btn ${gameState.soundEnabled ? 'active' : ''}`}
            onClick={toggleSound}
            title={gameState.soundEnabled ? "Mute Cyber FX" : "Unmute Cyber FX"}
            aria-label="Toggle Sound Effects"
          >
            {gameState.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{gameState.soundEnabled ? "SFX ON" : "SFX OFF"}</span>
          </button>

          {/* XP Badge */}
          <div className="xp-badge-nav" title="Detective XP">
            <Award size={15} />
            <span>{totalXp.toLocaleString()} XP</span>
          </div>

          {/* Primary CTA */}
          <button 
            className="primary-nav-btn"
            onClick={() => handleNavClick('cases')}
          >
            <Shield size={16} />
            <span>Start Investigation</span>
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: 'var(--header-height)',
          left: 0,
          right: 0,
          background: 'rgba(8, 11, 18, 0.98)',
          borderBottom: '1px solid var(--border-cyan)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 99
        }}>
          {['landing', 'cases', 'how-it-works', 'leaderboard', 'profile', 'about'].map(v => (
            <button
              key={v}
              style={{
                background: 'none',
                border: 'none',
                color: currentView === v ? 'var(--cyan-primary)' : '#fff',
                fontSize: '1.1rem',
                textAlign: 'left',
                padding: '0.5rem 0',
                fontFamily: 'var(--font-code)',
                cursor: 'pointer'
              }}
              onClick={() => handleNavClick(v)}
            >
              {v.replace('-', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
