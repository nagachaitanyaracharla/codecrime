import React from 'react';
import { Terminal as TerminalIcon, CheckCircle, XCircle, AlertOctagon } from 'lucide-react';

export function Terminal({ logs, testResults, isEvaluating, lastStatus }) {
  return (
    <div className="investigation-panel terminal-panel" role="region" aria-label="Terminal & Test Telemetry">
      <div className="panel-header-hud">
        <div className="panel-header-title">
          <TerminalIcon size={16} style={{ color: 'var(--cyan-primary)' }} />
          <span>TERMINAL // SYSTEM LOGS</span>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#27c93f' }} />
        </div>
      </div>

      <div className="terminal-panel-body font-mono">
        {/* Live Logs Stream */}
        {logs.map((log, index) => {
          let lineClass = 'terminal-line';
          if (log.includes('[PASS]') || log.includes('PASSED') || log.includes('SOLVED')) {
            lineClass += ' pass';
          } else if (log.includes('[FAIL]') || log.includes('[CRASH]') || log.includes('ERROR') || log.includes('HALT')) {
            lineClass += ' fail';
          } else if (log.includes('WARN') || log.includes('ALERT')) {
            lineClass += ' warn';
          } else {
            lineClass += ' info';
          }

          return (
            <div key={index} className={lineClass}>
              {log}
            </div>
          );
        })}

        {isEvaluating && (
          <div className="terminal-line info" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
            <span>&gt; Running automated regression sandbox...</span>
            <span className="terminal-cursor" />
          </div>
        )}

        {/* Structured Test Results Breakdown */}
        {testResults && testResults.length > 0 && (
          <div className="test-cases-summary">
            <div style={{ 
              fontSize: '0.78rem', 
              color: 'var(--cyan-primary)', 
              fontWeight: 700, 
              marginBottom: '0.75rem',
              letterSpacing: '0.05em'
            }}>
              VERIFICATION MATRIX ({testResults.filter(t => t.passed).length}/{testResults.length} PASSED)
            </div>

            {testResults.map((tc) => (
              <div 
                key={tc.id} 
                className={`test-case-item ${tc.passed ? 'passed' : 'failed'}`}
              >
                <div className="test-case-header">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {tc.passed ? (
                      <CheckCircle size={14} style={{ color: 'var(--green-primary)' }} />
                    ) : (
                      <XCircle size={14} style={{ color: 'var(--red-primary)' }} />
                    )}
                    <span>{tc.name}</span>
                  </span>
                  <span style={{ 
                    color: tc.passed ? 'var(--green-primary)' : 'var(--red-primary)',
                    fontFamily: 'var(--font-code)',
                    fontSize: '0.72rem'
                  }}>
                    {tc.passed ? "PASSED" : "FAILED"}
                  </span>
                </div>

                <div className="test-case-details">
                  <div>Input: <span style={{ color: '#fff' }}>{tc.input}</span></div>
                  <div>Expected: <span style={{ color: 'var(--green-primary)' }}>{tc.expected}</span></div>
                  <div>Received: <span style={{ color: tc.passed ? 'var(--green-primary)' : 'var(--red-primary)' }}>{tc.actual}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {lastStatus && (
          <div style={{
            marginTop: '1.25rem',
            padding: '0.75rem',
            borderRadius: '4px',
            background: lastStatus === 'SOLVED' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 51, 102, 0.1)',
            border: `1px solid ${lastStatus === 'SOLVED' ? 'var(--border-green)' : 'var(--border-red)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 700
          }}>
            {lastStatus === 'SOLVED' ? (
              <CheckCircle size={16} style={{ color: 'var(--green-primary)' }} />
            ) : (
              <AlertOctagon size={16} style={{ color: 'var(--red-primary)' }} />
            )}
            <span style={{ color: lastStatus === 'SOLVED' ? 'var(--green-primary)' : 'var(--red-primary)' }}>
              INVESTIGATION STATUS: {lastStatus}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
