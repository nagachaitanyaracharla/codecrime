import React, { useState } from 'react';
import { Search, Eye, AlertCircle, FileSpreadsheet, Compass } from 'lucide-react';
import { sound } from '../utils/sound';

export function EvidenceBoard({ evidenceList, onSelectEvidence, activeEvidenceId }) {
  const [selectedEvidence, setSelectedEvidence] = useState(evidenceList[0] || null);

  const handleCardClick = (ev) => {
    sound.evidence();
    setSelectedEvidence(ev);
    onSelectEvidence(ev);
  };

  const getEvidenceIcon = (type) => {
    switch (type) {
      case 'rule': return <FileSpreadsheet size={15} style={{ color: 'var(--cyan-primary)' }} />;
      case 'log': return <AlertCircle size={15} style={{ color: 'var(--amber-primary)' }} />;
      case 'target': return <Compass size={15} style={{ color: 'var(--green-primary)' }} />;
      case 'suspect': return <Eye size={15} style={{ color: 'var(--red-primary)' }} />;
      default: return <Search size={15} style={{ color: 'var(--cyan-primary)' }} />;
    }
  };

  return (
    <div className="investigation-panel evidence-panel" role="region" aria-label="Evidence Board">
      <div className="panel-header-hud">
        <div className="panel-header-title">
          <Search size={16} style={{ color: 'var(--cyan-primary)' }} />
          <span>EVIDENCE BOARD // FORENSICS</span>
        </div>
        <span style={{ 
          fontFamily: 'var(--font-code)', 
          fontSize: '0.72rem', 
          color: 'var(--text-dim)' 
        }}>
          {evidenceList.length} CLUES DISCOVERED
        </span>
      </div>

      <div className="evidence-panel-body">
        <p className="evidence-board-notice">
          Click any evidence file below to highlight related suspect code and examine forensic telemetry.
        </p>

        {evidenceList.map((ev) => {
          const isActive = (activeEvidenceId === ev.id) || (selectedEvidence && selectedEvidence.id === ev.id);
          return (
            <div
              key={ev.id}
              className={`evidence-card ${isActive ? 'active' : ''}`}
              onClick={() => handleCardClick(ev)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(ev)}
              aria-label={`${ev.label}: ${ev.title}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span className="evidence-card-label">{ev.label}</span>
                {getEvidenceIcon(ev.type)}
              </div>
              <h4 className="evidence-card-title">{ev.title}</h4>
              <p className="evidence-card-detail">{ev.detail}</p>
              {ev.connectedLine && (
                <div style={{ 
                  marginTop: '0.6rem', 
                  fontSize: '0.72rem', 
                  color: 'var(--amber-primary)', 
                  fontFamily: 'var(--font-code)' 
                }}>
                  ↳ Links to Line {ev.connectedLine}
                </div>
              )}
            </div>
          );
        })}

        {selectedEvidence && (
          <div className="evidence-inspector-box">
            <div className="evidence-inspector-title">
              FORENSIC INSPECTOR // {selectedEvidence.label}
            </div>
            <p className="evidence-inspector-text">
              {selectedEvidence.detail}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
