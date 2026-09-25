import React from 'react';
import { ArrowRight, CheckCircle2, FileCode } from 'lucide-react';
import { sound } from '../utils/sound';

export function CaseCard({ caseItem, onSelectCase, isSolved }) {
  const getDifficultyClass = (diff) => {
    switch (diff.toLowerCase()) {
      case 'beginner': return 'beginner';
      case 'intermediate': return 'intermediate';
      case 'advanced': return 'advanced';
      default: return 'beginner';
    }
  };

  const handleCardClick = () => {
    sound.click();
    onSelectCase(caseItem);
  };

  return (
    <article className="case-card" role="region" aria-label={caseItem.title}>
      <div>
        <div className="case-card-top">
          <span className="case-id-tag">{caseItem.caseNumber}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isSolved && (
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.3rem', 
                fontSize: '0.72rem', 
                color: '#00ff88',
                background: 'rgba(0, 255, 136, 0.12)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontFamily: 'var(--font-code)',
                fontWeight: 700
              }}>
                <CheckCircle2 size={12} />
                SOLVED
              </span>
            )}
            <span className={`difficulty-badge ${getDifficultyClass(caseItem.difficulty)}`}>
              {caseItem.difficulty}
            </span>
          </div>
        </div>

        <h3 className="case-card-title">{caseItem.title}</h3>
        <p className="case-card-crime">
          <strong style={{ color: 'var(--text-main)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
            CRIME:
          </strong>
          {caseItem.crime}
        </p>
      </div>

      <div>
        <div className="case-meta-row">
          <span className="case-language-tag">
            <FileCode size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            {caseItem.language}
          </span>
        </div>

        <button 
          className="btn-cyber-primary case-action-btn"
          onClick={handleCardClick}
          id={`case-card-${caseItem.id}-btn`}
        >
          <span>INVESTIGATE CASE</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}
