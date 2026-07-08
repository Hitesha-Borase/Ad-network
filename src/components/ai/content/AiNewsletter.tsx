import React from 'react';
import { Mail, Sparkles, LayoutTemplate, Image as ImageIcon, Type, Hand } from 'lucide-react';

export const AiNewsletter: React.FC = () => {
  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Settings Panel */}
      <div className="glass-card responsive-sidebar-wide" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <Mail size={20} color="var(--primary)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Newsletter Builder</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Campaign Topic</label>
          <input placeholder="e.g. End of year sale, 50% off" defaultValue="Weekly AdTech Insights" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Drag & Drop Blocks</label>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ width: 'calc(50% - 6px)', padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'grab' }}>
              <LayoutTemplate size={24} color="var(--text-muted)" />
              <span style={{ fontSize: '12px' }}>Header</span>
            </div>
            <div style={{ width: 'calc(50% - 6px)', padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'grab' }}>
              <ImageIcon size={24} color="var(--text-muted)" />
              <span style={{ fontSize: '12px' }}>Hero Image</span>
            </div>
            <div style={{ width: 'calc(50% - 6px)', padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'grab' }}>
              <Type size={24} color="var(--text-muted)" />
              <span style={{ fontSize: '12px' }}>Text Block</span>
            </div>
            <div style={{ width: 'calc(50% - 6px)', padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'grab' }}>
              <Hand size={24} color="var(--text-muted)" />
              <span style={{ fontSize: '12px' }}>CTA Button</span>
            </div>
          </div>
        </div>

        <button style={{ width: '100%', marginTop: 'auto', padding: '12px', borderRadius: '8px', background: 'linear-gradient(45deg, var(--primary), var(--info))', color: '#fff', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
          <Sparkles size={16} /> Auto-Fill with AI
        </button>
      </div>

      {/* Right Canvas: Mobile Email Preview */}
      <div className="glass-card responsive-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', overflowY: 'auto', backgroundColor: 'rgba(0,0,0,0.3)' }}>
        
        {/* Phone Frame */}
        <div style={{ width: '375px', minHeight: '667px', backgroundColor: '#fff', borderRadius: '32px', padding: '40px 16px 16px 16px', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', color: '#000' }}>
          
          {/* Dynamic Island / Notch */}
          <div style={{ position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '24px', backgroundColor: '#000', borderRadius: '12px' }}></div>
          
          {/* Email Client Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#666' }}>From: Acme Corp</span>
              <span style={{ fontSize: '12px', color: '#666' }}>Just now</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>Your Weekly AdTech Insights 📈</div>
          </div>

          {/* Email Body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary)', borderRadius: '8px' }}></div>
            </div>

            {/* Hero Image Block */}
            <div style={{ width: '100%', height: '160px', backgroundColor: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--primary)' }}>
              <ImageIcon size={32} color="#ccc" />
            </div>

            {/* Title */}
            <h1 style={{ fontSize: '24px', margin: 0, textAlign: 'center', fontWeight: 800 }}>Welcome to the Future of ROAS</h1>

            {/* Text Block */}
            <div style={{ fontSize: '15px', lineHeight: 1.6, color: '#333' }}>
              Hi Marketing Team, <br/><br/>
              This week we're rolling out a major update to the Predictive Analytics engine. Our beta testers saw an average of <strong>32% increase in ROAS</strong> within the first week of implementation.
            </div>

            {/* Bullet Points */}
            <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: 1.6, color: '#444', margin: 0 }}>
              <li>Real-time intent scoring</li>
              <li>Automated bid adjustments</li>
              <li>Cross-platform syncing</li>
            </ul>

            {/* CTA Button */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
              <button style={{ padding: '14px 32px', backgroundColor: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '24px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
                Read the Case Study
              </button>
            </div>

            {/* Footer */}
            <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', textAlign: 'center', fontSize: '11px', color: '#999', marginTop: '20px' }}>
              Acme Corp, 123 Marketing Way, SF, CA<br/>
              Unsubscribe | View in Browser
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
