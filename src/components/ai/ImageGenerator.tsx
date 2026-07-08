import React, { useState } from 'react';
import { Sparkles, Settings, Image as ImageIcon, Download, RefreshCw } from 'lucide-react';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('A cinematic shot of a futuristic data center with neon blue and purple lighting, hyper-realistic, 8k resolution');
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Settings Panel */}
      <div className="glass-card responsive-sidebar-wide" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <ImageIcon size={20} color="var(--primary)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>AI Image Studio</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Prompt</label>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px',
              color: 'var(--text-primary)',
              fontSize: '13px',
              resize: 'none',
              fontFamily: 'inherit',
              lineHeight: 1.5
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Aspect Ratio</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" style={{ flex: 1, padding: '8px' }}>1:1</button>
            <button className="btn btn-primary" style={{ flex: 1, padding: '8px', background: 'rgba(99,102,241,0.1)', color: 'var(--primary)', border: '1px solid var(--primary)' }}>16:9</button>
            <button className="btn btn-secondary" style={{ flex: 1, padding: '8px' }}>9:16</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Style</label>
          <select style={{
            width: '100%',
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '10px 12px',
            color: 'var(--text-primary)',
            fontSize: '13px'
          }}>
            <option>Photorealistic</option>
            <option>Digital Art</option>
            <option>3D Render</option>
            <option>Vector Illustration</option>
            <option>Cyberpunk</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '13px', fontWeight: 500 }}>Quality</label>
            <span style={{ fontSize: '12px', color: 'var(--primary)' }}>High (HD)</span>
          </div>
          <input type="range" min="1" max="100" defaultValue="80" style={{ width: '100%', accentColor: 'var(--primary)' }} />
        </div>

        <button 
          className="btn btn-primary" 
          style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px' }}
          onClick={() => {
            setIsGenerating(true);
            setTimeout(() => setIsGenerating(false), 2000);
          }}
        >
          {isGenerating ? <RefreshCw size={16} className="spin" /> : <Sparkles size={16} />}
          {isGenerating ? 'Generating...' : 'Generate Image'}
        </button>
      </div>

      {/* Right Preview Canvas */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Preview Canvas</h2>
            {isGenerating && <span style={{ fontSize: '12px', color: 'var(--accent)', backgroundColor: 'var(--accent-light)', padding: '2px 8px', borderRadius: '12px' }}>Processing</span>}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm"><Settings size={14} /></button>
            <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Download size={14} /> Export</button>
          </div>
        </div>

        <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          {isGenerating ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'var(--primary)' }}>
              <RefreshCw size={32} className="spin" />
              <div style={{ fontSize: '14px', fontWeight: 500 }}>Rendering image...</div>
            </div>
          ) : (
            <div style={{ 
              width: '100%', height: '100%', 
              background: 'linear-gradient(135deg, #1e1e2f 0%, #0f0f1a 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative'
            }}>
              {/* Mock Image Content */}
              <div style={{ position: 'absolute', inset: '20px', borderRadius: '8px', border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                   <ImageIcon size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                   <div style={{ fontSize: '14px' }}>Generated Image Will Appear Here</div>
                   <div style={{ fontSize: '12px', marginTop: '4px' }}>1920 x 1080 (16:9)</div>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .spin { animation: spin 2s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};
