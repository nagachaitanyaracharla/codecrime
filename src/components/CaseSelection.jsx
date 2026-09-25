import React, { useState } from 'react';
import { CASE_FILES } from '../data/cases';
import { CaseCard } from './CaseCard';
import { Shield, Sparkles, Filter } from 'lucide-react';

export function CaseSelection({ onSelectCase, gameState }) {
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');

  const languages = ['ALL', 'Python', 'JavaScript', 'SQL', 'Java', 'C++'];

  const filteredCases = selectedLanguage === 'ALL'
    ? CASE_FILES
    : CASE_FILES.filter(c => c.language.toLowerCase() === selectedLanguage.toLowerCase());

  const solvedCount = CASE_FILES.filter(c => gameState.solvedCaseIds.includes(c.id)).length;

  return (
    <div className="cases-page-container">
      <div className="page-header-block">
        <span className="page-badge-label">
          <Shield size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          INCIDENT REPOSITORY
        </span>
        <h1 className="page-main-title">CASE FILES</h1>
        <p className="page-subheading">
          Choose a case and begin your investigation. Inspect suspect routines, uncover forensic evidence, and patch the anomalies.
        </p>

        {/* Telemetry quick bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '1.5rem',
          fontFamily: 'var(--font-code)',
          fontSize: '0.85rem'
        }}>
          <span style={{ color: 'var(--cyan-primary)' }}>
            <strong>{solvedCount}</strong> / {CASE_FILES.length} Cases Solved
          </span>
        </div>

        {/* Language Filter */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginTop: '1.75rem'
        }}>
          {languages.map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              style={{
                background: selectedLanguage === lang ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: selectedLanguage === lang ? '1px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                color: selectedLanguage === lang ? 'var(--cyan-primary)' : 'var(--text-muted)',
                fontFamily: 'var(--font-code)',
                fontSize: '0.8rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="cases-grid">
        {filteredCases.map(caseItem => (
          <CaseCard 
            key={caseItem.id}
            caseItem={caseItem}
            onSelectCase={onSelectCase}
            isSolved={gameState.solvedCaseIds.includes(caseItem.id)}
          />
        ))}
      </div>
    </div>
  );
}
