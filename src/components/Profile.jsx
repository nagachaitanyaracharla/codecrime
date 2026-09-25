import React from 'react';
import { Shield, Award, Target, Flame, Cpu, Terminal, CheckCircle2, Lock } from 'lucide-react';

export function Profile({ gameState }) {
  const totalXp = gameState.baseXp + gameState.earnedXp;
  const casesSolvedCount = 8 + (gameState.solvedCaseIds ? gameState.solvedCaseIds.length - 1 : 0);
  const accuracy = Math.min(99, Math.round((gameState.successfulSubmissions / Math.max(1, gameState.totalSubmissions)) * 100));

  const skills = [
    { name: "Python", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "SQL", level: 88 },
    { name: "Java", level: 80 },
    { name: "Debugging", level: 95 },
    { name: "Problem Solving", level: 92 }
  ];

  return (
    <div className="profile-page-container">
      <div className="profile-card-master">
        {/* Profile Header */}
        <div className="profile-header-grid">
          <div className="profile-avatar-block">
            <div className="profile-avatar-hex" aria-hidden="true">
              🕵️‍♂️
            </div>
            <div>
              <h1 className="profile-title-name">{gameState.detectiveName}</h1>
              <div className="profile-role-sub">{gameState.role}</div>
            </div>
          </div>

          <div className="profile-rank-badge">
            <Shield size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            <span>{gameState.rank}</span>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="profile-metrics-row">
          <div className="metric-kpi-card">
            <div className="metric-kpi-label">TOTAL XP EARNED</div>
            <div className="metric-kpi-val" style={{ color: 'var(--amber-primary)' }}>
              {totalXp.toLocaleString()}
            </div>
          </div>

          <div className="metric-kpi-card">
            <div className="metric-kpi-label">CASES SOLVED</div>
            <div className="metric-kpi-val" style={{ color: 'var(--cyan-primary)' }}>
              {casesSolvedCount}
            </div>
          </div>

          <div className="metric-kpi-card">
            <div className="metric-kpi-label">FORENSIC ACCURACY</div>
            <div className="metric-kpi-val" style={{ color: 'var(--green-primary)' }}>
              {accuracy}%
            </div>
          </div>

          <div className="metric-kpi-card">
            <div className="metric-kpi-label">ACTIVE STREAK</div>
            <div className="metric-kpi-val" style={{ color: '#ff7700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Flame size={28} />
              <span>{gameState.streak} Days</span>
            </div>
          </div>
        </div>

        {/* Skills Breakdown */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>
            ENGINEERING SKILLS & COMPETENCIES
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {skills.map((skill) => (
              <div key={skill.name} style={{ background: 'rgba(11, 16, 28, 0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-code)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#fff' }}>{skill.name}</span>
                  <span style={{ color: 'var(--cyan-primary)' }}>{skill.level}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${skill.level}%`, height: '100%', background: 'linear-gradient(90deg, var(--cyan-primary), var(--green-primary))', borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Earned */}
        <div style={{ marginTop: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>
            EARNED BADGES & CITATIONS
          </h2>
          <div className="badges-grid">
            {gameState.badges.map((b) => (
              <div key={b.id} className={`badge-card ${b.unlocked ? 'unlocked' : ''}`}>
                <div className="badge-icon">{b.icon}</div>
                <div>
                  <div className="badge-title" style={{ color: b.unlocked ? '#fff' : 'var(--text-dim)' }}>
                    {b.title}
                  </div>
                  <div className="badge-desc">{b.desc}</div>
                  <div style={{ marginTop: '0.5rem', fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: b.unlocked ? 'var(--amber-primary)' : 'var(--text-dim)' }}>
                    {b.unlocked ? `Unlocked: ${b.unlockedAt}` : "LOCKED"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
