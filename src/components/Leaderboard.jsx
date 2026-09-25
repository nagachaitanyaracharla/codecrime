import React, { useState } from 'react';
import { Trophy, Shield, Users, Globe, Calendar, MapPin } from 'lucide-react';

export function Leaderboard({ gameState }) {
  const [activeTab, setActiveTab] = useState('GLOBAL');

  const playerTotalXp = gameState.baseXp + gameState.earnedXp;

  const demoData = {
    GLOBAL: [
      { rank: "01", name: "Alex Morgan", xp: 2450, solved: 14, badge: "Grandmaster" },
      { rank: "02", name: "Maya Chen", xp: 2210, solved: 12, badge: "Lead Auditor" },
      { rank: "03", name: gameState.detectiveName, xp: Math.max(1980, playerTotalXp), solved: 8 + (gameState.solvedCaseIds?.length || 0), isCurrentUser: true, badge: "Code Detective" },
      { rank: "04", name: "Rahul Dev", xp: 1740, solved: 10, badge: "Cyber Analyst" },
      { rank: "05", name: "Sarah Lee", xp: 1650, solved: 9, badge: "Forensic Cadet" },
      { rank: "06", name: "Liam Vance", xp: 1520, solved: 8, badge: "Investigator" },
      { rank: "07", name: "Elena Rostova", xp: 1430, solved: 7, badge: "Investigator" }
    ],
    WEEKLY: [
      { rank: "01", name: gameState.detectiveName, xp: 850, solved: 4, isCurrentUser: true, badge: "Code Detective" },
      { rank: "02", name: "Alex Morgan", xp: 720, solved: 3, badge: "Grandmaster" },
      { rank: "03", name: "Sarah Lee", xp: 680, solved: 3, badge: "Forensic Cadet" },
      { rank: "04", name: "Maya Chen", xp: 620, solved: 2, badge: "Lead Auditor" },
      { rank: "05", name: "Devon Reed", xp: 450, solved: 2, badge: "Cadet" }
    ],
    LOCAL: [
      { rank: "01", name: gameState.detectiveName, xp: Math.max(1980, playerTotalXp), solved: 8 + (gameState.solvedCaseIds?.length || 0), isCurrentUser: true, badge: "Code Detective" },
      { rank: "02", name: "Kaelen Rao", xp: 1610, solved: 8, badge: "Cadet" },
      { rank: "03", name: "Ananya Iyer", xp: 1490, solved: 7, badge: "Cadet" },
      { rank: "04", name: "Vikram Sen", xp: 1320, solved: 6, badge: "Cadet" }
    ]
  };

  const currentList = demoData[activeTab];

  return (
    <div className="leaderboard-container">
      <div className="page-header-block">
        <span className="page-badge-label">
          <Trophy size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          ACADEMY RANKINGS
        </span>
        <h1 className="page-main-title">DETECTIVE LEADERBOARD</h1>
        <p className="page-subheading">
          Global rankings of elite code detectives solving vulnerabilities and diagnosing complex bug traces across systems.
        </p>

        <div style={{
          marginTop: '1rem',
          display: 'inline-block',
          background: 'rgba(255, 183, 0, 0.08)',
          border: '1px dashed var(--border-amber)',
          color: 'var(--amber-primary)',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-code)',
          padding: '0.35rem 0.85rem',
          borderRadius: '4px'
        }}>
          * Interactive demo telemetry. User rank reflects real-time investigation metrics.
        </div>
      </div>

      {/* Tabs */}
      <div className="leaderboard-tabs-bar">
        <button 
          className={`tab-btn ${activeTab === 'GLOBAL' ? 'active' : ''}`}
          onClick={() => setActiveTab('GLOBAL')}
        >
          <Globe size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          GLOBAL
        </button>
        <button 
          className={`tab-btn ${activeTab === 'WEEKLY' ? 'active' : ''}`}
          onClick={() => setActiveTab('WEEKLY')}
        >
          <Calendar size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          WEEKLY
        </button>
        <button 
          className={`tab-btn ${activeTab === 'LOCAL' ? 'active' : ''}`}
          onClick={() => setActiveTab('LOCAL')}
        >
          <MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          LOCAL
        </button>
      </div>

      {/* Leaderboard Table */}
      <div className="leaderboard-table-card">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 140px 120px',
          padding: '0.85rem 1.75rem',
          background: '#0e1424',
          borderBottom: '1px solid var(--border-subtle)',
          fontFamily: 'var(--font-code)',
          fontSize: '0.75rem',
          color: 'var(--text-dim)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em'
        }}>
          <div>RANK</div>
          <div>DETECTIVE</div>
          <div>CASES</div>
          <div style={{ textAlign: 'right' }}>SCORE</div>
        </div>

        {currentList.map((player) => {
          let rankClass = 'rank-col';
          if (player.rank === '01') rankClass += ' top-1';
          if (player.rank === '02') rankClass += ' top-2';
          if (player.rank === '03') rankClass += ' top-3';

          return (
            <div 
              key={player.name} 
              className={`leaderboard-row ${player.isCurrentUser ? 'highlighted' : ''}`}
            >
              <div className={rankClass}>
                #{player.rank}
              </div>

              <div className={`player-col ${player.isCurrentUser ? 'creator' : ''}`}>
                <span>{player.name}</span>
                {player.isCurrentUser && (
                  <span style={{
                    fontSize: '0.65rem',
                    background: 'rgba(0, 240, 255, 0.2)',
                    color: 'var(--cyan-primary)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border-cyan)'
                  }}>
                    YOU
                  </span>
                )}
              </div>

              <div style={{ color: 'var(--text-muted)' }}>
                {player.solved} cases
              </div>

              <div style={{ textAlign: 'right', color: 'var(--amber-primary)', fontWeight: 700 }}>
                {player.xp.toLocaleString()} pts
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
