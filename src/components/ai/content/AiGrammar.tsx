import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, BookOpen, Info } from 'lucide-react';

interface Suggestion {
  id: number;
  type: 'spelling' | 'clarity' | 'grammar' | 'style';
  original: string;
  fix: string;
  explanation: string;
}

const suggestions: Suggestion[] = [
  { id: 1, type: 'grammar', original: 'Our campaigns is performing', fix: 'Our campaigns are performing', explanation: 'Subject-verb agreement: "campaigns" is plural, requiring "are".' },
  { id: 2, type: 'clarity', original: 'very unique solution', fix: 'unique solution', explanation: '"Unique" is an absolute — it cannot be "very unique". Simply say "unique".' },
  { id: 3, type: 'style', original: 'utilize', fix: 'use', explanation: '"Use" is clearer and more direct than "utilize" in most contexts.' },
  { id: 4, type: 'spelling', original: 'campain', fix: 'campaign', explanation: 'Spelling error detected.' },
];

const typeColors: Record<string, string> = {
  spelling: 'var(--danger)',
  grammar: 'var(--warning)',
  clarity: 'var(--info)',
  style: 'var(--accent)',
};

export const AiGrammar: React.FC = () => {
  const [activeSuggestion, setActiveSuggestion] = useState<number | null>(1);
  const [text, setText] = useState(
    'Our campaigns is performing above average this quarter. We have developed a very unique solution that allows advertisers to utilize first-party data effectively. Our Q4 campain results exceeded expectations by 40%.'
  );
  const [score] = useState(72);

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Suggestions Panel */}
      <div className="glass-card responsive-sidebar-wide" style={{ display: 'flex', flexDirection: 'column', gap: '0px', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--success)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>AI Grammar Engine</h2>
        </div>

        {/* Score */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--warning)" strokeWidth="8"
              strokeDasharray={circumference} strokeDashoffset={offset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 0.6s ease' }}
            />
            <text x="50" y="55" textAnchor="middle" fill="var(--text-primary)" fontSize="22" fontWeight="700">{score}</text>
          </svg>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>Writing Score</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>4 issues found</div>
            <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'linear-gradient(45deg, var(--success), var(--info))', color: '#fff', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
              <Sparkles size={14} /> Fix All
            </button>
          </div>
        </div>

        {/* Suggestion Cards */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {suggestions.map((s) => (
            <div
              key={s.id}
              onClick={() => setActiveSuggestion(activeSuggestion === s.id ? null : s.id)}
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                backgroundColor: activeSuggestion === s.id ? 'rgba(255,255,255,0.04)' : 'transparent',
                transition: 'background 0.15s',
                borderLeft: activeSuggestion === s.id ? `3px solid ${typeColors[s.type]}` : '3px solid transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <AlertCircle size={15} color={typeColors[s.type]} />
                <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: typeColors[s.type] }}>{s.type}</span>
              </div>
              <div style={{ fontSize: '14px', marginBottom: '6px' }}>
                <span style={{ textDecoration: 'line-through', color: 'var(--danger)' }}>{s.original}</span>
                {' → '}
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>{s.fix}</span>
              </div>
              {activeSuggestion === s.id && (
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, padding: '10px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '6px', marginTop: '8px', display: 'flex', gap: '8px' }}>
                  <Info size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                  {s.explanation}
                </div>
              )}
              {activeSuggestion === s.id && (
                <button onClick={(e) => { e.stopPropagation(); }} style={{ marginTop: '10px', padding: '6px 16px', borderRadius: '6px', backgroundColor: 'var(--success)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} /> Accept Fix
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Document with Highlights */}
      <div className="glass-card responsive-content" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)', fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '20px' }}>
          <span><span style={{ color: 'var(--danger)' }}>●</span> Spelling</span>
          <span><span style={{ color: 'var(--warning)' }}>●</span> Grammar</span>
          <span><span style={{ color: 'var(--info)' }}>●</span> Clarity</span>
          <span><span style={{ color: 'var(--accent)' }}>●</span> Style</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, padding: '32px', backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '16px', lineHeight: 1.9, resize: 'none', fontFamily: 'Inter, system-ui, sans-serif' }}
        />
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '13px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <span>{text.split(' ').filter(Boolean).length} words · {text.length} characters</span>
          <span>Readability: Grade 11</span>
        </div>
      </div>
    </div>
  );
};
