import React from 'react';
import { Lightbulb, AlertTriangle, X, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/sound';

export function HintSystem({ hints, revealedCount, onUnlockHint, onClose }) {
  const currentLevel = revealedCount;
  const hasMoreHints = currentLevel < hints.length;
  const nextHint = hasMoreHints ? hints[currentLevel] : null;

  const handleUnlock = () => {
    sound.hint();
    onUnlockHint();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Investigation Hints">
      <div className="modal-hud-box">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Lightbulb size={18} style={{ color: 'var(--amber-primary)' }} />
            <span className="modal-title">FORENSIC HINT PROTOCOL</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close Hint Modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-content-body">
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Requesting hints will narrow down the suspect bug, but each clue incurs an XP penalty on your final case score.
          </p>

          <div className="hint-levels-list">
            {hints.map((hint, idx) => {
              const isRevealed = idx < revealedCount;
              return (
                <div 
                  key={hint.level} 
                  className={`hint-step-card ${isRevealed ? 'revealed' : ''}`}
                >
                  <div className="hint-step-header">
                    <span className="hint-step-title">
                      LEVEL {hint.level} HINT
                    </span>
                    <span className="hint-step-cost">
                      {isRevealed ? "REVEALED" : `-${hint.cost} XP`}
                    </span>
                  </div>
                  {isRevealed ? (
                    <p className="hint-step-text">{hint.text}</p>
                  ) : (
                    <p style={{ fontStyle: 'italic', color: 'var(--text-dim)', fontSize: '0.84rem' }}>
                      [ ENCRYPTED FORENSIC CLUE - CLICK REQUEST BELOW TO DECRYPT ]
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: 'var(--amber-primary)' }}>
              Total penalty accrued: -{hints.slice(0, revealedCount).reduce((acc, h) => acc + h.cost, 0)} XP
            </div>

            {hasMoreHints ? (
              <button 
                className="btn-cyber-primary"
                onClick={handleUnlock}
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}
              >
                <Lightbulb size={16} />
                <span>UNLOCK LEVEL {currentLevel + 1} (-{nextHint.cost} XP)</span>
              </button>
            ) : (
              <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                All available hints unlocked
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
