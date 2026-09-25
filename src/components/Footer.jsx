import React from 'react';
import { Mail, Search, Code, Shield } from 'lucide-react';
import { sound } from '../utils/sound';

export function Footer({ onNavigate }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <div className="footer-top-row">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ 
                fontFamily: 'var(--font-code)', 
                color: '#00ff88', 
                background: 'rgba(0, 240, 255, 0.08)',
                padding: '0.2rem 0.5rem',
                border: '1px solid var(--border-cyan)',
                borderRadius: '4px',
                fontSize: '0.85rem'
              }}>
                &lt;/&gt;
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#fff', letterSpacing: '0.08em' }}>
                CODECRIME
              </span>
            </div>
            <p className="footer-tagline">
              Debug. Investigate. Solve.
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginTop: '0.5rem', lineHeight: 1.5 }}>
              An interactive forensic debugging game engineered for developers to sharpen diagnostic analysis.
            </p>
          </div>

          <div>
            <div className="footer-creator-meta">
              CREATED BY
              <div style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 700, margin: '0.2rem 0' }}>
                NAGA CHAITANYA RACHARLA
              </div>
              <div style={{ color: 'var(--cyan-primary)', fontSize: '0.82rem' }}>
                Computer Science Engineering Student
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.75rem', letterSpacing: '0.08em' }}>
              CONNECT // SOCIALS
            </div>
            <div className="footer-links-group">
              <a 
                href="https://github.com/nagachaitanyaracharla" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-link-item"
                title="GitHub - Naga Chaitanya Racharla"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>GitHub</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/naga-chaitanya-racharla-67269742a" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-link-item"
                title="LinkedIn - Naga Chaitanya Racharla"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a 
                href="mailto:nagachaitanyaracharla051@gmail.com" 
                className="footer-link-item"
                title="Email - nagachaitanyaracharla051@gmail.com"
              >
                <Mail size={16} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div>
            © 2026 NAGA CHAITANYA RACHARLA. Built with free technologies.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span style={{ color: 'var(--text-dim)' }}>React 19</span>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <span style={{ color: 'var(--text-dim)' }}>Vite</span>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <span style={{ color: 'var(--text-dim)' }}>Web Audio API</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
