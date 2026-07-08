import React from 'react';
import { MousePointerClick, Smartphone, Monitor, Eye } from 'lucide-react';

export const Heatmaps: React.FC = () => {
  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Sidebar Controls */}
      <div className="glass-card responsive-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 4px 0' }}>Heatmaps</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Visualize user interaction intensity.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Target URL</label>
          <select style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }}>
            <option>acmecorp.com/pricing</option>
            <option>acmecorp.com/features</option>
            <option>acmecorp.com/signup</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Heatmap Type</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="btn btn-primary" style={{ justifyContent: 'flex-start', padding: '10px 16px', background: 'rgba(99,102,241,0.1)', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
              <MousePointerClick size={16} style={{ marginRight: '8px' }} /> Click Map
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '10px 16px' }}>
              <Eye size={16} style={{ marginRight: '8px' }} /> Scroll Map
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Device Type</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary" style={{ flex: 1, padding: '8px', background: 'rgba(99,102,241,0.1)', color: 'var(--primary)', border: '1px solid var(--primary)' }}><Monitor size={16} /></button>
            <button className="btn btn-secondary" style={{ flex: 1, padding: '8px' }}><Smartphone size={16} /></button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: 'auto' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 12px 0' }}>Intensity Legend</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
            Low
            <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: 'linear-gradient(to right, rgba(59,130,246,0.2), rgba(234,179,8,0.6), rgba(239,68,68,0.9))' }}></div>
            High
          </div>
        </div>
      </div>

      {/* Heatmap Viewer */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>Previewing: acmecorp.com/pricing (Desktop)</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Based on 14,230 pageviews</div>
        </div>
        
        <div style={{ flex: 1, backgroundColor: '#ffffff', overflowY: 'auto', position: 'relative', display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
          {/* Mock Website Container */}
          <div style={{ width: '100%', maxWidth: '1000px', backgroundColor: '#f8fafc', minHeight: '1200px', border: '1px solid #e2e8f0', position: 'relative' }}>
            
            {/* Nav */}
            <div style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 800, fontSize: '20px', color: '#0f172a' }}>ACME Corp</div>
              <div className="responsive-layout" style={{ fontSize: '14px', fontWeight: 500, color: '#64748b' }}>
                <span style={{ position: 'relative' }}>
                  Features
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(234,179,8,0.6) 0%, rgba(234,179,8,0) 70%)', zIndex: 10 }}></div>
                </span>
                <span style={{ position: 'relative', color: '#3b82f6' }}>Pricing</span>
                <span style={{ position: 'relative' }}>
                  Contact
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(239,68,68,0.6) 0%, rgba(239,68,68,0) 70%)', zIndex: 10 }}></div>
                </span>
              </div>
            </div>
            
            {/* Pricing Header */}
            <div style={{ padding: '60px 48px', textAlign: 'center' }}>
              <h1 style={{ fontSize: '40px', fontWeight: 800, margin: '0 0 16px 0', color: '#0f172a' }}>Simple, Transparent Pricing</h1>
            </div>

            {/* Pricing Cards */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', padding: '0 48px' }}>
              
              {/* Basic */}
              <div style={{ width: '300px', padding: '32px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a', margin: '0 0 16px 0' }}>Basic</h3>
                <div style={{ fontSize: '40px', fontWeight: 800, color: '#0f172a', marginBottom: '32px' }}>$29<span style={{ fontSize: '16px', color: '#64748b' }}>/mo</span></div>
                <div style={{ position: 'relative' }}>
                  <button style={{ width: '100%', padding: '12px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: 600 }}>Select Basic</button>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0) 70%)', zIndex: 10 }}></div>
                </div>
              </div>

              {/* Pro (Hot) */}
              <div style={{ width: '300px', padding: '32px', backgroundColor: '#fff', border: '2px solid #3b82f6', borderRadius: '12px', textAlign: 'center', position: 'relative' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a', margin: '0 0 16px 0' }}>Pro</h3>
                <div style={{ fontSize: '40px', fontWeight: 800, color: '#0f172a', marginBottom: '32px' }}>$99<span style={{ fontSize: '16px', color: '#64748b' }}>/mo</span></div>
                <div style={{ position: 'relative' }}>
                  <button style={{ width: '100%', padding: '12px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600 }}>Select Pro</button>
                  {/* High Intensity Heatmap Spot */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '80px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(239,68,68,0.8) 0%, rgba(234,179,8,0.6) 40%, rgba(234,179,8,0) 70%)', zIndex: 10 }}></div>
                </div>
              </div>

              {/* Enterprise */}
              <div style={{ width: '300px', padding: '32px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a', margin: '0 0 16px 0' }}>Enterprise</h3>
                <div style={{ fontSize: '40px', fontWeight: 800, color: '#0f172a', marginBottom: '32px' }}>Custom</div>
                <div style={{ position: 'relative' }}>
                  <button style={{ width: '100%', padding: '12px', backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600 }}>Contact Sales</button>
                  {/* High Intensity Heatmap Spot */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90px', height: '60px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(239,68,68,0.7) 0%, rgba(234,179,8,0.5) 50%, rgba(234,179,8,0) 70%)', zIndex: 10 }}></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
