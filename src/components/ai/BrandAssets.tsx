import React from 'react';
import { Briefcase, Upload, Type, Palette, FileText, Image as ImageIcon, Plus, Folder, Download, Eye } from 'lucide-react';

export const BrandAssets: React.FC<{ mode?: string }> = ({ mode = 'aicreative-brand' }) => {
  const isBrand = mode === 'aicreative-brand';

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{
        background: isBrand 
          ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)' 
          : 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
        border: isBrand ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid rgba(16, 185, 129, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
      }}>
        <div>
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={24} color={isBrand ? 'var(--primary)' : 'var(--success)'} /> {isBrand ? 'Brand Asset Library' : 'Generated Creative Assets'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            {isBrand 
              ? 'Manage the logos, colors, fonts, and tone guidelines used by your AI generators.'
              : 'Access and review the history of all AI generated images, banners, layouts, and copy templates.'}
          </p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: isBrand ? 'var(--primary)' : 'var(--success)', border: 'none' }} onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: isBrand ? '📤 Opening asset uploader...' : '📤 Uploading custom creative...' }))}>
          <Upload size={16} /> {isBrand ? 'Upload Asset' : 'Upload Creative'}
        </button>
      </div>

      {isBrand ? (
        <>
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
                <div style={{ width: '80px', height: '80px', borderRadius: '12px', border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Color picker opened.' }))}>
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
                <button className="btn btn-secondary btn-sm" onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Editing tone guidelines...' }))}>Edit Guidelines</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-responsive-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Creative Asset Name</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Type</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Size</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Date Created</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Summer Product Banner Set', type: 'Banner Ad (PSD/PNG)', size: '14.2 MB', date: 'Jul 6, 2026', status: 'Approved' },
                  { name: 'Instagram Onboarding Story Video', type: 'Ad Video (MP4)', size: '28.4 MB', date: 'Jul 4, 2026', status: 'Approved' },
                  { name: 'Black Friday Campaign Email Header', type: 'Email Header (HTML/PNG)', size: '1.2 MB', date: 'Jul 2, 2026', status: 'Draft' },
                  { name: 'SaaS Value Prop Copy Doc', type: 'Text Document (DOCX)', size: '42 KB', date: 'Jun 28, 2026', status: 'Approved' }
                ].map((asset, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="table-row-hover">
                    <td style={{ padding: '16px 24px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Folder size={16} color="var(--primary)"/> {asset.name}
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{asset.type}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{asset.size}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{asset.date}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ 
                        padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700,
                        backgroundColor: asset.status === 'Approved' ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)',
                        color: asset.status === 'Approved' ? 'var(--success)' : 'var(--text-secondary)'
                      }}>{asset.status}</span>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: `Previewing ${asset.name}` }))}><Eye size={12}/> View</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: `Downloading ${asset.name}...` }))}><Download size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <style>{`.table-row-hover:hover{background:rgba(255,255,255,0.02)}`}</style>
        </div>
      )}
    </div>
  );
};
