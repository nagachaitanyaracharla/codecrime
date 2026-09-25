import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal as TerminalIcon, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export function Hero({ onStartInvestigation, onViewCases }) {
  const [typedLines, setTypedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const terminalSequence = [
    "> Initializing investigation system...",
    "> Loading case database...",
    "> Checking forensic evidence files...",
    "> Security sandbox verified.",
    "> System ready.",
    "> Detective access granted: NAGA CHAITANYA RACHARLA"
  ];

  useEffect(() => {
    if (currentLineIndex < terminalSequence.length) {
      const timer = setTimeout(() => {
        setTypedLines(prev => [...prev, terminalSequence[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, 480);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex]);

  const handleStart = () => {
    sound.click();
    onStartInvestigation();
  };

  const handleViewCases = () => {
    sound.click();
    onViewCases();
  };

  return (
    <section className="hero-section" aria-label="Hero Section">
      <div className="hero-grid-wrapper">
        {/* Left Column: Cinematic Headline & Actions */}
        <div className="hero-content">
          <div className="status-badge-live">
            <span className="live-dot"></span>
            <span>SYSTEM ONLINE</span>
          </div>

          <h1 className="hero-title-main">CODECRIME</h1>

          <div className="hero-tagline-trio">
            DEBUG.<br />
            INVESTIGATE.<br />
            SOLVE.
          </div>

          <p className="hero-description">
            Every bug leaves a clue. Find the evidence, identify the culprit, and solve the case.
          </p>

          <div className="hero-actions-group">
            <button 
              className="btn-cyber-primary" 
              onClick={handleStart}
              id="start-investigation-btn"
            >
              <span>START INVESTIGATION</span>
              <ArrowRight size={18} />
            </button>

            <button 
              className="btn-cyber-secondary" 
              onClick={handleViewCases}
              id="view-case-files-btn"
            >
              <ShieldAlert size={18} style={{ color: '#00f0ff' }} />
              <span>VIEW CASE FILES</span>
            </button>
          </div>

          <div className="creator-attribution-pill">
            <Cpu size={14} style={{ color: 'var(--cyan-primary)' }} />
            <span>Created by NAGA CHAITANYA RACHARLA</span>
            <span>•</span>
            <span>CSE Engineering</span>
          </div>
        </div>

        {/* Right Column: Cyber Terminal & Diagnostic HUD */}
        <div className="hero-terminal-card" aria-hidden="true">
          <div className="terminal-header-bar">
            <div className="terminal-controls">
              <span className="term-btn red"></span>
              <span className="term-btn yellow"></span>
              <span className="term-btn green"></span>
            </div>
            <div className="terminal-label">INVESTIGATION TELEMETRY v2.6</div>
            <TerminalIcon size={14} style={{ color: '#00f0ff' }} />
          </div>

          <div className="terminal-body font-mono">
            {typedLines.map((line, idx) => (
              <div 
                key={idx} 
                style={{ 
                  color: line.includes('granted') ? '#00ff88' : line.includes('ready') ? '#00f0ff' : '#9bb0cf',
                  fontWeight: line.includes('granted') ? 600 : 400
                }}
              >
                {line}
              </div>
            ))}
            {currentLineIndex < terminalSequence.length && (
              <span className="terminal-cursor"></span>
            )}

            {currentLineIndex >= terminalSequence.length && (
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                <div style={{ color: '#ffb700', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={14} />
                  <span>ALERT: 6 High-Priority Incidents Awaiting Debugging</span>
                </div>
                <div style={{ color: '#54627a', fontSize: '0.75rem', marginTop: '0.3rem' }}>
                  Select [CASE #001] to inspect arithmetic anomaly in billing pipeline.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
