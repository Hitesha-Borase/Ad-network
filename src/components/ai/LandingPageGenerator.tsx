import React from 'react';
import { Monitor, Smartphone, Layout, Code, Eye, Layers, MousePointer, Image as ImageIcon, Type } from 'lucide-react';

export const LandingPageGenerator: React.FC = () => {
  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Toolbar */}
      <div className="glass-card responsive-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <Layout size={20} color="var(--success)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Page Builder</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, margin: 0 }}>Drag & Drop Elements</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { icon: Type, label: 'Text Block' },
              { icon: ImageIcon, label: 'Image' },
              { icon: MousePointer, label: 'Button' },
              { icon: Layers, label: 'Section' },
              { icon: Layout, label: 'Hero Grid' },
              { icon: Code, label: 'Custom HTML' },
            ].map((el, i) => (
              <div key={i} style={{ 
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', 
                backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', 
                borderRadius: '8px', padding: '16px 8px', cursor: 'grab', fontSize: '11px', color: 'var(--text-secondary)'
              }}>
                <el.icon size={20} color="var(--primary)" />
                {el.label}
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: 'auto' }}>
          <button className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Publish Page</button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        {/* Canvas Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px' }}>
            <button style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Monitor size={14}/> Desktop</button>
            <button style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Smartphone size={14}/> Mobile</button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Code size={14} /> View Code</button>
            <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Eye size={14} /> Preview</button>
          </div>
        </div>

        {/* Builder Area */}
        <div style={{ flex: 1, backgroundColor: '#0f111a', display: 'flex', justifyContent: 'center', padding: '24px', overflowY: 'auto' }}>
          {/* Mock Landing Page */}
          <div style={{ 
            width: '100%', maxWidth: '960px', minHeight: '800px', 
            backgroundColor: '#ffffff', borderRadius: '4px', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            display: 'flex', flexDirection: 'column',
            color: '#1e293b'
          }}>
            {/* Nav */}
            <div style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 800, fontSize: '20px', color: '#0f172a' }}>ACME Corp</div>
              <div className="responsive-layout" style={{ fontSize: '14px', fontWeight: 500, color: '#64748b' }}>
                <span>Features</span>
                <span>Pricing</span>
                <span>Contact</span>
              </div>
            </div>
            
            {/* Hero */}
            <div style={{ padding: '80px 48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px dashed #3b82f6' }}>
              <div style={{ position: 'absolute', transform: 'translateY(-92px)', backgroundColor: '#3b82f6', color: '#fff', padding: '4px 12px', fontSize: '12px', borderRadius: '4px' }}>Hero Section</div>
              <h1 style={{ fontSize: '48px', fontWeight: 800, margin: '0 0 24px 0', letterSpacing: '-1px' }}>Supercharge Your Workflow</h1>
              <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 0 32px 0', lineHeight: 1.6 }}>The only platform you need to build, scale, and automate your entire marketing ecosystem in record time.</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{ padding: '14px 28px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 600 }}>Get Started Free</button>
                <button style={{ padding: '14px 28px', backgroundColor: '#fff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '16px', fontWeight: 600 }}>Book Demo</button>
              </div>
            </div>

            {/* Empty block area */}
            <div style={{ flex: 1, padding: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ padding: '24px', border: '2px dashed #cbd5e1', borderRadius: '8px', color: '#94a3b8', textAlign: 'center', width: '100%' }}>
                <Layers size={32} style={{ margin: '0 auto 12px auto' }} />
                <div style={{ fontWeight: 600 }}>Drag and drop new sections here</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
