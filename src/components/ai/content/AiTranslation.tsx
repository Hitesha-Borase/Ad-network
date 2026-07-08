import React, { useState } from 'react';
import { Languages, Sparkles, ArrowRight, RefreshCw, CheckCircle2, Globe } from 'lucide-react';

export const AiTranslation: React.FC = () => {
  const [sourceText, setSourceText] = useState('Unlock the full potential of your marketing with Ad Network OS. Designed for modern growth teams, our platform unifies CRM, AI Content Generation, and deep analytics into a single, seamless workspace.');
  const [targetText] = useState('Desbloqueie todo o potencial do seu marketing com o Ad Network OS. Projetado para equipes de crescimento modernas, nossa plataforma unifica CRM, geração de conteúdo com IA e análises profundas em um único espaço de trabalho perfeito.');

  const langs = ['Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Portuguese', 'Arabic', 'Hindi'];
  const [targetLang, setTargetLang] = useState('Portuguese');

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 100px)' }}>
      {/* Header Bar */}
      <div className="glass-card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Languages size={22} color="var(--info)" />
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>AI Translation Studio</h2>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 14px' }}>
            <Globe size={16} color="var(--text-muted)" />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>English</span>
          </div>
          <ArrowRight size={18} color="var(--text-muted)" />
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            style={{ backgroundColor: 'rgba(99,102,241,0.15)', border: '1px solid var(--primary)', borderRadius: '8px', padding: '8px 14px', color: 'var(--primary)', fontSize: '14px', fontWeight: 600 }}
          >
            {langs.map(l => <option key={l}>{l}</option>)}
          </select>
          <button style={{ padding: '8px 20px', borderRadius: '8px', background: 'linear-gradient(45deg, var(--info), var(--primary))', color: '#fff', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
            <Sparkles size={15} /> Translate
          </button>
        </div>
      </div>

      {/* Translation Area */}
      <div className="responsive-layout" style={{ flex: 1, minHeight: 0 }}>
        {/* Source */}
        <div className="glass-card responsive-content" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>English — Source</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sourceText.length} characters</span>
          </div>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter text to translate..."
            style={{ flex: 1, padding: '20px', backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '15px', lineHeight: 1.7, resize: 'none' }}
          />
        </div>

        {/* Target */}
        <div className="glass-card responsive-content" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(99,102,241,0.05)' }}>
            <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--primary)' }}>{targetLang} — Translated</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
              <RefreshCw size={14} /> Regenerate
            </button>
          </div>
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            {targetText}
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--success)' }}>
              <CheckCircle2 size={15} /> Accuracy: 97%
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
              Tone: Professional
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
