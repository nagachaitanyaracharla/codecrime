import React from 'react';
import { Shield, Cpu, Code2, BookOpen, User } from 'lucide-react';

export function About() {
  return (
    <div className="about-container">
      <div className="about-card">
        <span className="page-badge-label">
          <BookOpen size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          PROJECT DOSSIER
        </span>
        <h1 className="page-main-title" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          ABOUT CODECRIME
        </h1>

        <p className="about-text">
          CodeCrime is an interactive debugging game designed to make programming practice more engaging. Instead of simply solving coding exercises, players investigate bugs, analyze evidence, test solutions, and solve programming cases.
        </p>

        <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Built entirely with modern web technologies, the platform simulates real-world software defects across multiple stacks—from arithmetic overflow and variable scoping traps to inverted SQL queries and infinite loop stalls. Every scenario presents authentic evidence cards and regression test matrices.
        </p>

        <div className="about-creator-box">
          <span className="about-creator-label">CREATED BY</span>
          <h2 className="about-creator-name">NAGA CHAITANYA RACHARLA</h2>
          <div className="about-creator-role">
            Computer Science Engineering Student
          </div>
          <div style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            fontFamily: 'var(--font-code)',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
            flexWrap: 'wrap'
          }}>
            <span style={{ color: 'var(--cyan-primary)' }}>• 100% Free Open Technologies</span>
            <span style={{ color: 'var(--green-primary)' }}>• Zero Paid APIs</span>
            <span style={{ color: 'var(--amber-primary)' }}>• Client-side Safe Architecture</span>
          </div>
        </div>
      </div>
    </div>
  );
}
