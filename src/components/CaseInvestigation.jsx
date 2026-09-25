import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Lightbulb, CheckCircle2, AlertOctagon, Clock, ShieldCheck, RefreshCw } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { EvidenceBoard } from './EvidenceBoard';
import { Terminal } from './Terminal';
import { HintSystem } from './HintSystem';
import { validateCaseCode } from '../utils/validation';
import { recordCaseSolved, recordFailedSubmission } from '../utils/gameState';
import { sound } from '../utils/sound';

export function CaseInvestigation({ 
  caseData, 
  caseIndex, 
  totalCases, 
  onBackToCases, 
  onNextCase, 
  onCaseSolvedUpdate 
}) {
  const [code, setCode] = useState(caseData.initialCode);
  const [highlightedLine, setHighlightedLine] = useState(null);
  const [activeEvidenceId, setActiveEvidenceId] = useState(null);
  const [logs, setLogs] = useState([
    `> Initialized suspect file: ${caseData.caseNumber}`,
    `> Target objective: Identify root cause of "${caseData.crime}"`,
    `> Ready for investigator review.`
  ]);
  const [testResults, setTestResults] = useState([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [lastStatus, setLastStatus] = useState(null);

  // Time & hints state
  const [secondsRemaining, setSecondsRemaining] = useState(caseData.timeLimit || 300);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [showHintModal, setShowHintModal] = useState(false);

  // Outcome modals
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

  // Reset code & state if case changes
  useEffect(() => {
    setCode(caseData.initialCode);
    setHighlightedLine(null);
    setActiveEvidenceId(null);
    setLogs([
      `> Initialized suspect file: ${caseData.caseNumber}`,
      `> Target objective: Identify root cause of "${caseData.crime}"`,
      `> Ready for investigator review.`
    ]);
    setTestResults([]);
    setLastStatus(null);
    setSecondsRemaining(caseData.timeLimit || 300);
    setTimeElapsed(0);
    setHintsRevealed(0);
    setIsFailedModalOpen(false);
  }, [caseData.id]);

  // Live Timer Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  // Run Code (Non-submitting test run)
  const handleRunCode = () => {
    sound.runCode();
    setIsEvaluating(true);
    setLogs(prev => [...prev, `> Executing local validation pipeline for ${caseData.caseNumber}...`]);

    setTimeout(() => {
      const res = validateCaseCode(caseData, code);
      setIsEvaluating(false);
      setTestResults(res.testResults);
      setLogs(prev => [...prev, ...res.logs]);
      setLastStatus(res.success ? 'PASSED TESTS' : 'TESTS FAILED');
      if (res.success) {
        sound.click();
      } else {
        sound.error();
      }
    }, 400);
  };

  // Submit Solution
  const handleSubmitSolution = () => {
    sound.runCode();
    setIsEvaluating(true);

    setTimeout(() => {
      const res = validateCaseCode(caseData, code);
      setIsEvaluating(false);
      setTestResults(res.testResults);
      setLogs(prev => [...prev, ...res.logs]);

      if (res.success) {
        sound.caseSolved();
        setLastStatus(null);
        const { nextState } = recordCaseSolved(
          caseData.id, 
          caseData.reward, 
          hintsRevealed, 
          timeElapsed
        );
        onCaseSolvedUpdate(nextState);
      } else {
        sound.error();
        setLastStatus('FAILED');
        recordFailedSubmission();
        setIsFailedModalOpen(true);
      }
    }, 450);
  };

  const handleResetCode = () => {
    sound.click();
    setCode(caseData.initialCode);
    setHighlightedLine(null);
    setLogs(prev => [...prev, "> Suspect code reset to original repository state."]);
  };

  const handleSelectEvidence = (ev) => {
    setActiveEvidenceId(ev.id);
    if (ev.connectedLine) {
      setHighlightedLine(ev.connectedLine);
    }
  };

  return (
    <div className="investigation-container">
      {/* Top HUD Bar */}
      <div className="investigation-top-bar">
        <div className="case-hud-identity">
          <button className="back-cases-btn" onClick={onBackToCases} aria-label="Return to Case Files">
            <ArrowLeft size={16} />
            <span>CASE FILES</span>
          </button>
          <div className="case-hud-titles">
            <span className="case-hud-num">{caseData.caseNumber}</span>
            <span className="case-hud-name">{caseData.title}</span>
          </div>
        </div>

        <div className="case-hud-telemetry">
          <div className="hud-metric-pill timer" title="Time remaining">
            <Clock size={15} />
            <span>{formatTime(secondsRemaining)}</span>
          </div>


          <div className="hud-metric-pill progress" title="Case progression">
            <ShieldCheck size={15} />
            <span>PROGRESS: {caseIndex + 1} / {totalCases}</span>
          </div>

          {caseIndex + 1 < totalCases && (
            <button
              className="hud-metric-pill"
              onClick={() => { sound.click(); onNextCase(); }}
              title="Proceed to next case"
              style={{
                background: 'rgba(0, 240, 255, 0.08)',
                color: 'var(--cyan-primary)',
                border: '1px solid var(--border-cyan)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'var(--font-code)',
                fontSize: '0.8rem'
              }}
            >
              <span>NEXT CASE</span>
              <Play size={12} />
            </button>
          )}
        </div>
      </div>

      {/* 3-Panel HUD Grid */}
      <div className="investigation-grid">
        {/* Left: Suspect Code Editor */}
        <CodeEditor
          code={code}
          onChange={setCode}
          onReset={handleResetCode}
          language={caseData.language}
          highlightedLine={highlightedLine}
        />

        {/* Center: Evidence Board */}
        <EvidenceBoard
          evidenceList={caseData.evidence}
          onSelectEvidence={handleSelectEvidence}
          activeEvidenceId={activeEvidenceId}
        />

        {/* Right: Terminal & Verification Output */}
        <Terminal
          logs={logs}
          testResults={testResults}
          isEvaluating={isEvaluating}
          lastStatus={lastStatus}
        />
      </div>

      {/* Bottom Action Bar */}
      <div className="investigation-bottom-bar">
        <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          CRIME: <strong style={{ color: '#fff' }}>{caseData.crime}</strong> • RUNTIME: {caseData.language}
        </div>

        <div className="investigation-btn-group">
          <button 
            className="btn-hud-action btn-hud-run" 
            onClick={handleRunCode}
            disabled={isEvaluating}
            id="run-code-btn"
          >
            <Play size={15} />
            <span>RUN CODE</span>
          </button>

          <button 
            className="btn-hud-action btn-hud-hint" 
            onClick={() => { sound.click(); setShowHintModal(true); }}
            id="request-hint-btn"
          >
            <Lightbulb size={15} />
            <span>REQUEST HINT {hintsRevealed > 0 ? `(${hintsRevealed}/3)` : ''}</span>
          </button>

          <button 
            className="btn-hud-action btn-hud-submit" 
            onClick={handleSubmitSolution}
            disabled={isEvaluating}
            id="submit-solution-btn"
          >
            <CheckCircle2 size={16} />
            <span>SUBMIT SOLUTION</span>
          </button>
        </div>
      </div>

      {/* Hint Modal */}
      {showHintModal && (
        <HintSystem
          hints={caseData.hints}
          revealedCount={hintsRevealed}
          onUnlockHint={() => setHintsRevealed(prev => Math.min(caseData.hints.length, prev + 1))}
          onClose={() => setShowHintModal(false)}
        />
      )}


      {/* Case Failed Modal */}
      {isFailedModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-hud-box" style={{ maxWidth: 540, border: '2px solid var(--red-primary)' }}>
            <div className="modal-header" style={{ borderBottomColor: 'var(--border-red)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <AlertOctagon size={20} style={{ color: 'var(--red-primary)' }} />
                <span className="modal-title" style={{ color: 'var(--red-primary)' }}>INVESTIGATION FAILED</span>
              </div>
            </div>

            <div className="modal-content-body">
              <p style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.75rem', fontWeight: 600 }}>
                "Your evidence doesn't support the current solution."
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Automated regression tests encountered failures or unexpected runtime discrepancies. Review the suspect code and evidence board to refine your diagnosis.
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button 
                  className="btn-cyber-secondary"
                  onClick={() => {
                    setIsFailedModalOpen(false);
                    setShowHintModal(true);
                  }}
                >
                  <Lightbulb size={16} />
                  <span>USE HINT</span>
                </button>
                <button 
                  className="btn-cyber-primary"
                  onClick={() => setIsFailedModalOpen(false)}
                >
                  <RefreshCw size={16} />
                  <span>TRY AGAIN</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
