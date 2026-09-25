import React from 'react';
import { Search, FileSearch, Wrench, Trophy, Sparkles } from 'lucide-react';

export function HowItWorks({ onStartInvestigation }) {
  const steps = [
    {
      number: "01",
      title: "INVESTIGATE",
      desc: "Read the suspect code repository and understand the contextual incident report.",
      icon: <Search size={28} style={{ color: 'var(--cyan-primary)' }} />
    },
    {
      number: "02",
      title: "COLLECT CLUES",
      desc: "Analyze outputs, forensic logs, runtime discrepancies, and suspicious code lines.",
      icon: <FileSearch size={28} style={{ color: 'var(--amber-primary)' }} />
    },
    {
      number: "03",
      title: "FIX THE BUG",
      desc: "Modify the suspect subroutine and run the automated test suite to verify your patch.",
      icon: <Wrench size={28} style={{ color: 'var(--green-primary)' }} />
    },
    {
      number: "04",
      title: "SOLVE THE CASE",
      desc: "Submit your forensic solution, verify full regression pass, and earn case badges.",
      icon: <Trophy size={28} style={{ color: 'var(--purple-primary)' }} />
    }
  ];

  return (
    <div className="cases-page-container">
      <div className="page-header-block">
        <span className="page-badge-label">
          <Sparkles size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          METHODOLOGY
        </span>
        <h1 className="page-main-title">HOW IT WORKS</h1>
        <p className="page-subheading">
          CodeCrime turns debugging into an interactive cyber forensic investigation. Follow the four-stage investigative methodology.
        </p>
      </div>

      <div className="steps-grid">
        {steps.map((step) => (
          <div key={step.number} className="step-card">
            <div className="step-number-tag">{step.number}</div>
            <div style={{ marginBottom: '1rem' }}>{step.icon}</div>
            <h3 className="step-card-title">{step.title}</h3>
            <p className="step-card-desc">{step.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
        <button 
          className="btn-cyber-primary"
          onClick={onStartInvestigation}
          style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}
        >
          <span>ENTER THE INCIDENT LAB</span>
          <Search size={18} />
        </button>
      </div>
    </div>
  );
}
