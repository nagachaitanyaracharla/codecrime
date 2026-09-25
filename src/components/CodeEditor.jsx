import React, { useRef, useEffect } from 'react';
import { RotateCcw, Copy, Check, AlertTriangle, Code2 } from 'lucide-react';
import { sound } from '../utils/sound';

export function CodeEditor({ 
  code, 
  onChange, 
  onReset, 
  language, 
  highlightedLine,
  hasError 
}) {
  const textareaRef = useRef(null);
  const [copied, setCopied] = React.useState(false);

  const lines = code.split('\n');

  // Handle Tab key inside textarea
  const handleKeyDown = (e) => {
    sound.click();
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const spaces = language.toLowerCase() === 'python' ? '    ' : '  ';
      const newCode = code.substring(0, start) + spaces + code.substring(end);
      onChange(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + spaces.length;
        }
      }, 0);
    }
  };

  const handleCopy = () => {
    sound.click();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="investigation-panel editor-panel" role="region" aria-label="Suspect Code Editor">
      <div className="panel-header-hud">
        <div className="panel-header-title">
          <Code2 size={16} style={{ color: 'var(--cyan-primary)' }} />
          <span>SUSPECT CODE // {language.toUpperCase()}</span>
        </div>
        <div className="panel-header-actions">
          <button 
            className="panel-sub-btn" 
            onClick={handleCopy}
            title="Copy code to clipboard"
            aria-label="Copy code"
          >
            {copied ? <Check size={12} style={{ color: '#00ff88' }} /> : <Copy size={12} />}
            <span>{copied ? "COPIED" : "COPY"}</span>
          </button>
          <button 
            className="panel-sub-btn" 
            onClick={onReset}
            title="Reset code to suspect initial state"
            aria-label="Reset code"
          >
            <RotateCcw size={12} />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {highlightedLine && (
        <div className="editor-highlight-banner">
          <AlertTriangle size={14} />
          <span>EVIDENCE FORENSIC POINTER: Line {highlightedLine} identified as suspect region</span>
        </div>
      )}

      <div className="editor-panel-body">
        {/* Line Numbers */}
        <div className="editor-line-numbers font-mono" aria-hidden="true">
          {lines.map((_, idx) => {
            const lineNum = idx + 1;
            const isHighlighted = highlightedLine === lineNum;
            return (
              <div 
                key={idx} 
                style={{ 
                  color: isHighlighted ? 'var(--amber-primary)' : 'var(--text-dim)',
                  fontWeight: isHighlighted ? 700 : 400,
                  background: isHighlighted ? 'rgba(255, 183, 0, 0.15)' : 'transparent',
                  padding: '0 4px',
                  borderRadius: '2px'
                }}
              >
                {lineNum}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <div className="editor-textarea-wrapper">
          <textarea
            ref={textareaRef}
            className="editor-textarea"
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Code editor input"
          />
        </div>
      </div>
    </div>
  );
}
