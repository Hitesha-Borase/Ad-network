import React from 'react';
import { Briefcase, Upload, Type, Palette, FileText, Image as ImageIcon, Plus } from 'lucide-react';

export const BrandAssets: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
      }}>
        <div>
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={24} color="var(--primary)" /> Brand Asset Library
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Manage the logos, colors, fonts, and tone guidelines used by your AI generators.
          </p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Upload size={16} /> Upload Asset
        </button>
      </div>

      <div className="grid-cols-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Colors */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Palette size={18} color="var(--accent)" /> Brand Colors
          </h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { hex: '#0f172a', name: 'Primary Dark' },
              { hex: '#3b82f6', name: 'Brand Blue' },
              { hex: '#8b5cf6', name: 'Accent Purple' },
              { hex: '#10b981', name: 'Success Green' }
            ].map(c => (
              <div key={c.hex} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '12px', backgroundColor: c.hex, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}></div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.hex}</div>
                </div>
              </div>
            ))}
            <div style={{ width: '80px', height: '80px', borderRadius: '12px', border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <Plus size={24} />
            </div>
          </div>
        </div>

        {/* Logos */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ImageIcon size={18} color="var(--primary)" /> Logos & Imagery
          </h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '12px', backgroundColor: '#fff', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800, fontSize: '24px' }}>
              ACME
            </div>
            <div style={{ width: '120px', height: '120px', borderRadius: '12px', backgroundColor: '#0f172a', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '24px' }}>
              ACME
            </div>
          </div>
        </div>
      </div>

      <div className="grid-cols-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Typography */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Type size={18} color="var(--info)" /> Typography
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Primary Font (Headings)</div>
              <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'Inter, sans-serif' }}>Inter Bold</div>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Secondary Font (Body)</div>
              <div style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'Roboto, sans-serif' }}>Roboto Regular</div>
            </div>
          </div>
        </div>

        {/* Brand Voice */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--success)" /> Brand Voice Guidelines
          </h2>
          <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)', height: '100%' }}>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Our tone is <strong>professional, yet approachable</strong>. We aim to sound like a knowledgeable consultant who is eager to help. We avoid overly complex jargon unless speaking directly to technical engineers.
            </p>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              <strong>Key Phrases to Use:</strong> "Unlock growth", "Seamless integration", "Data-driven insights".
            </p>
            <button className="btn btn-secondary btn-sm">Edit Guidelines</button>
          </div>
        </div>
      </div>
    </div>
  );
};
