import React from 'react';
import { Layout, Download, RefreshCw, Layers } from 'lucide-react';

export const BannerGenerator: React.FC = () => {
  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Settings Panel */}
      <div className="glass-card responsive-sidebar-wide" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <Layout size={20} color="var(--primary)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Banner Generator</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Campaign Goal</label>
          <select style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }}>
            <option>Lead Generation</option>
            <option>Product Launch</option>
            <option>Brand Awareness</option>
            <option>Retargeting</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Ad Platform Formats</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Meta (1:1)', 'Story (9:16)', 'Display (728x90)', 'Display (300x250)'].map(format => (
              <span key={format} style={{ padding: '6px 12px', backgroundColor: format === 'Meta (1:1)' ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.05)', color: format === 'Meta (1:1)' ? 'var(--primary)' : 'var(--text-secondary)', border: format === 'Meta (1:1)' ? '1px solid var(--primary)' : '1px solid var(--border-color)', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>
                {format}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Headline Text</label>
          <input type="text" defaultValue="Supercharge Your Marketing" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Call to Action</label>
          <input type="text" defaultValue="Start Free Trial" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Brand Palette</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#0f172a' }}></div>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#f1f5f9' }}></div>
            <span style={{ fontSize: '12px', color: 'var(--primary)', cursor: 'pointer' }}>Change</span>
          </div>
        </div>

        <button className="btn btn-primary" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px' }}>
          <RefreshCw size={16} /> Generate Layouts
        </button>
      </div>

      {/* Right Canvas */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Banner Preview</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Layers size={14} /> Variations</button>
            <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Download size={14} /> Export All</button>
          </div>
        </div>

        <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', overflowY: 'auto' }}>
          {/* Mock Banner */}
          <div style={{ 
            width: '1080px', height: '1080px', maxWidth: '100%', maxHeight: '100%', 
            aspectRatio: '1/1', backgroundColor: '#0f172a', borderRadius: '4px',
            position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            transform: 'scale(0.8)'
          }}>
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(15,23,42,0) 70%)' }}></div>
            
            <h1 style={{ color: '#fff', fontSize: '6vw', fontWeight: 800, margin: '0 0 4% 0', lineHeight: 1.1, zIndex: 2 }}>
              Supercharge Your<br/>Marketing.
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '2.5vw', maxWidth: '80%', margin: '0 0 8% 0', zIndex: 2 }}>
              AI-driven insights and automation for modern growth teams.
            </p>
            <div style={{ display: 'inline-flex', padding: '3% 6%', backgroundColor: '#3b82f6', color: '#fff', fontSize: '2.5vw', fontWeight: 700, borderRadius: '8px', alignSelf: 'flex-start', zIndex: 2 }}>
              Start Free Trial
            </div>

            {/* Mock Dashboard UI Graphic inside the banner */}
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60%', height: '50%', backgroundColor: '#1e293b', borderRadius: '16px', border: '2px solid #334155', opacity: 0.8, transform: 'rotate(-5deg)' }}>
              <div style={{ height: '40px', borderBottom: '2px solid #334155', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
