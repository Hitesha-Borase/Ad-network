import React from 'react';
import { Megaphone, Building2, Quote, Sparkles } from 'lucide-react';

export const AiPressRelease: React.FC = () => {
  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Settings Panel */}
      <div className="glass-card responsive-sidebar-wide" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <Megaphone size={20} color="var(--primary)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>PR Generator</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}><Building2 size={14} style={{ display: 'inline', marginRight: '6px' }}/> Company Details</label>
          <input placeholder="Company Name" defaultValue="Acme Corp" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px', marginBottom: '8px' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <input placeholder="Location" defaultValue="San Francisco, CA" style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }} />
            <input type="date" style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Announcement Details</label>
          <textarea rows={3} placeholder="What is the announcement?" defaultValue="Acme Corp raises $50M Series B to expand its AI marketing platform globally." style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', color: 'var(--text-primary)', fontSize: '13px', resize: 'none' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}><Quote size={14} style={{ display: 'inline', marginRight: '6px' }}/> Executive Quote</label>
          <textarea rows={2} placeholder="Quote text..." defaultValue="This funding marks a pivotal moment for our team." style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', color: 'var(--text-primary)', fontSize: '13px', resize: 'none' }} />
          <input placeholder="Speaker Name & Title" defaultValue="Jane Doe, CEO" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }} />
        </div>

        <button style={{ width: '100%', marginTop: 'auto', padding: '12px', borderRadius: '8px', background: 'linear-gradient(45deg, var(--primary), var(--accent))', color: '#fff', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
          <Sparkles size={16} /> Generate Press Release
        </button>
      </div>

      {/* Right Preview Canvas */}
      <div className="glass-card responsive-content" style={{ display: 'flex', flexDirection: 'column', padding: '40px', overflowY: 'auto', backgroundColor: '#fff', color: '#000' }}>
        
        <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '1px', borderBottom: '2px solid #000', paddingBottom: '8px' }}>
            For Immediate Release
          </div>
          
          <h1 style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1.3, marginBottom: '20px' }}>
            Acme Corp Raises $50M Series B to Accelerate Global AI Marketing Expansion
          </h1>
          
          <div style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '24px' }}>
            <strong>SAN FRANCISCO, CA — October 15, 2026</strong> — Acme Corp, the leading provider of AI-driven marketing infrastructure, today announced the closing of a $50 million Series B funding round. The round was led by Global Tech Partners, with participation from existing investors.
          </div>
          
          <div style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '24px' }}>
            The new capital will be used to expand the company's global footprint, specifically in the European and APAC markets, and to accelerate the development of its proprietary deep learning models for predictive audience targeting.
          </div>
          
          <div style={{ fontSize: '16px', fontStyle: 'italic', borderLeft: '4px solid var(--primary)', paddingLeft: '20px', margin: '32px 0', color: '#333' }}>
            "This funding marks a pivotal moment for our team. We are seeing unprecedented demand for intelligent automation in the enterprise marketing stack. With this capital, we can aggressively expand our R&D and bring our next-generation AI tools to marketers worldwide," said Jane Doe, CEO of Acme Corp.
          </div>

          <div style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '40px' }}>
            Acme Corp has experienced 300% year-over-year growth since its launch in 2024, now serving over 500 enterprise clients globally.
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>About Acme Corp</h3>
          <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#444' }}>
            Acme Corp is a technology company building the future of digital marketing. By combining advanced AI models with seamless data integrations, Acme empowers growth teams to run hyper-personalized campaigns at scale. For more information, visit www.acmecorp.com.
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '20px', letterSpacing: '4px' }}>
            ###
          </div>
        </div>
      </div>
    </div>
  );
};
