import React from 'react';
import { Mic, Sparkles, Clock, User, Radio, FileText, Bookmark } from 'lucide-react';

export const AiPodcast: React.FC = () => {
  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Settings Panel */}
      <div className="glass-card responsive-sidebar-wide" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <Mic size={20} color="var(--warning)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Podcast Content Planner</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Episode Topic</label>
          <textarea rows={3} defaultValue="How AI is Transforming Programmatic Advertising in 2026" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', color: 'var(--text-primary)', fontSize: '13px', resize: 'none' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}><User size={13} style={{ display: 'inline', marginRight: '4px' }} /> Guest Name & Title</label>
          <input defaultValue="Sarah Chen – Head of AI, MediaTech Global" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }} />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}><Clock size={13} style={{ display: 'inline', marginRight: '4px' }} /> Length</label>
            <select style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }}>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>60 minutes</option>
            </select>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Output Type</label>
            <select style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }}>
              <option>Full Script</option>
              <option>Show Notes</option>
              <option>Timestamps + Summary</option>
            </select>
          </div>
        </div>

        <button style={{ width: '100%', marginTop: 'auto', padding: '12px', borderRadius: '8px', background: 'linear-gradient(45deg, var(--warning), var(--danger))', color: '#fff', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
          <Sparkles size={16} /> Generate Episode Content
        </button>
      </div>

      {/* Right: Show Notes Preview */}
      <div className="glass-card responsive-content" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Radio size={18} color="var(--warning)" />
          <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Episode #47 – Show Notes & Timestamps</h3>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          {/* Episode header */}
          <div className="glass-card" style={{ marginBottom: '24px', padding: '24px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--warning), var(--danger))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mic size={36} color="#fff" />
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0' }}>How AI is Transforming Programmatic Advertising in 2026</h2>
                <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Guest: Sarah Chen – Head of AI, MediaTech Global</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>Episode 47 · 45 minutes · Jan 12, 2026</div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}><FileText size={16} color="var(--warning)" /> Episode Summary</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              Sarah Chen joins us to break down how machine learning is fundamentally reshaping how bids are placed in real-time auctions. We discuss the move from rule-based to intent-based buying, how first-party data is becoming the new currency, and what this means for smaller publishers competing against walled gardens.
            </p>
          </div>

          {/* Timestamps */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16} color="var(--warning)" /> Timestamps</h3>
            {[
              { time: '0:00', label: 'Intro & Guest Welcome' },
              { time: '3:45', label: 'State of Programmatic in 2026' },
              { time: '12:10', label: 'First-party data & Privacy-first buying' },
              { time: '22:30', label: 'AI vs. Rule-based bidding' },
              { time: '34:00', label: 'Predictions for 2027' },
              { time: '42:15', label: 'Resources & where to find Sarah' },
            ].map((ts) => (
              <div key={ts.time} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ backgroundColor: 'rgba(245,158,11,0.1)', color: 'var(--warning)', padding: '2px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, flexShrink: 0 }}>{ts.time}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{ts.label}</span>
              </div>
            ))}
          </div>

          {/* Key Takeaways */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Bookmark size={16} color="var(--warning)" /> Key Takeaways</h3>
            {[
              'First-party data will replace third-party cookies by Q3 2026 for 80% of the premium inventory.',
              'AI bidding can reduce cost per acquisition by up to 40% vs. manual campaigns.',
              'Intent scoring from behavioral graphs is the next frontier for audience segmentation.',
            ].map((pt, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--border-color)', alignItems: 'flex-start' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(245,158,11,0.15)', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
