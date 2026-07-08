import React, { useState } from 'react';
import { FileText, Sparkles, Type, List, Search } from 'lucide-react';

export const AiBlogWriter: React.FC = () => {
  const [content, setContent] = useState('# The Future of AdTech\n\nWrite your blog post here...');
  const [keyword, setKeyword] = useState('programmatic advertising');

  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left SEO & Setup Panel */}
      <div className="glass-card responsive-sidebar-wide" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <FileText size={20} color="var(--accent)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>AI Blog & SEO Writer</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Primary Keyword</label>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <input 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px 10px 36px', color: 'var(--text-primary)', fontSize: '13px' }} 
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Secondary Keywords</label>
          <textarea rows={3} placeholder="Comma separated keywords..." defaultValue="dsp, ssp, real-time bidding, digital marketing" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', color: 'var(--text-primary)', fontSize: '13px', resize: 'none' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>SEO Checklist</label>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#000' }}></div></div>
            <span style={{ color: 'var(--text-secondary)' }}>Keyword in H1</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#000' }}></div></div>
            <span style={{ color: 'var(--text-secondary)' }}>Keyword density (1.5%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1px solid var(--text-muted)' }}></div>
            <span style={{ color: 'var(--text-secondary)' }}>Internal linking (0/2)</span>
          </div>
        </div>

        <button style={{ width: '100%', marginTop: 'auto', padding: '12px', borderRadius: '8px', background: 'linear-gradient(45deg, var(--accent), var(--primary))', color: '#fff', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
          <Sparkles size={16} /> Generate Outline
        </button>
      </div>

      {/* Right Canvas Editor */}
      <div className="glass-card responsive-content" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        {/* Editor Toolbar */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '16px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}><Type size={16} /> Format</button>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}><List size={16} /> Bullet</button>
          <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }}></div>
          <button style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}><Sparkles size={16} /> AI Expand</button>
        </div>
        
        {/* Document Area */}
        <div style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ 
              width: '100%', 
              maxWidth: '800px', 
              height: '100%',
              backgroundColor: 'transparent', 
              border: 'none', 
              color: 'var(--text-primary)', 
              fontSize: '16px', 
              lineHeight: '1.8',
              resize: 'none',
              outline: 'none',
              fontFamily: 'Inter, system-ui, sans-serif'
            }} 
          />
        </div>
      </div>
    </div>
  );
};
