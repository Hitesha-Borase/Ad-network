import React, { useState } from 'react';
import { Sparkles, Settings, Image as ImageIcon, Download, RefreshCw } from 'lucide-react';

export const ImageGenerator: React.FC<{ mode?: string }> = ({ mode = 'aicreative-image' }) => {
  const getDefaultPrompt = () => {
    switch (mode) {
      case 'aicreative-thumbnail':
        return 'A hyper-realistic youtube thumbnail design with neon glow showing an AI brain interface, high contrast text template layout';
      case 'aicreative-logo':
        return 'A minimalist modern clean vector logo of a flying bird, flat design, white background, high resolution vector';
      case 'aicreative-image':
      default:
        return 'A cinematic shot of a futuristic data center with neon blue and purple lighting, hyper-realistic, 8k resolution';
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'aicreative-thumbnail': return 'YouTube Thumbnail Creator';
      case 'aicreative-logo': return 'AI Logo Designer';
      case 'aicreative-image':
      default:
        return 'AI Image Studio';
    }
  };

  const [prompt, setPrompt] = useState(getDefaultPrompt());
  const [isGenerating, setIsGenerating] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(mode === 'aicreative-thumbnail' ? '16:9' : '1:1');

  React.useEffect(() => {
    setPrompt(getDefaultPrompt());
    setAspectRatio(mode === 'aicreative-thumbnail' ? '16:9' : '1:1');
  }, [mode]);

  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Settings Panel */}
      <div className="glass-card responsive-sidebar-wide" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <ImageIcon size={20} color="var(--primary)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>{getTitle()}</h2>
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
            <button className="btn btn-secondary" style={{ flex: 1, padding: '8px', background: aspectRatio === '1:1' ? 'rgba(99,102,241,0.1)' : 'transparent', color: aspectRatio === '1:1' ? 'var(--primary)' : 'inherit', border: aspectRatio === '1:1' ? '1px solid var(--primary)' : '1px solid var(--border-color)' }} onClick={() => setAspectRatio('1:1')}>1:1</button>
            <button className="btn btn-secondary" style={{ flex: 1, padding: '8px', background: aspectRatio === '16:9' ? 'rgba(99,102,241,0.1)' : 'transparent', color: aspectRatio === '16:9' ? 'var(--primary)' : 'inherit', border: aspectRatio === '16:9' ? '1px solid var(--primary)' : '1px solid var(--border-color)' }} onClick={() => setAspectRatio('16:9')}>16:9</button>
            <button className="btn btn-secondary" style={{ flex: 1, padding: '8px', background: aspectRatio === '9:16' ? 'rgba(99,102,241,0.1)' : 'transparent', color: aspectRatio === '9:16' ? 'var(--primary)' : 'inherit', border: aspectRatio === '9:16' ? '1px solid var(--primary)' : '1px solid var(--border-color)' }} onClick={() => setAspectRatio('9:16')}>9:16</button>
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
                   <div style={{ fontSize: '12px', marginTop: '4px' }}>{aspectRatio === '16:9' ? '1920 x 1080 (16:9)' : aspectRatio === '9:16' ? '1080 x 1920 (9:16)' : '1024 x 1024 (1:1)'}</div>
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
