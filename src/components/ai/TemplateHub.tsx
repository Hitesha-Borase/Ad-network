import React, { useState } from 'react';
import { Layout, Search, Grid, Compass, Heart, Download } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  dims: string;
  useCount: string;
  rating: string;
}

const templates: Template[] = [
  { id: '1', name: 'Premium Tech Product Banner', category: 'Banner Ad', dims: '300 x 250 px', useCount: '12.4K', rating: '4.9/5' },
  { id: '2', name: 'Minimalist SaaS Email Template', category: 'Email Drip', dims: 'Responsive HTML', useCount: '8.2K', rating: '4.8/5' },
  { id: '3', name: 'Instagram Story Video Onboarding', category: 'Video Template', dims: '1080 x 1920 px', useCount: '4.8K', rating: '4.7/5' },
  { id: '4', name: 'Black Friday Leaderboard Banner', category: 'Banner Ad', dims: '728 x 90 px', useCount: '15.1K', rating: '4.9/5' }
];

export const TemplateHub: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = templates.filter(t => 
    (filter === 'All' || t.category === filter) &&
    (query === '' || t.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
      }}>
        <div>
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layout size={24} color="var(--accent)" /> AI Creative Templates
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Browse and load pre-configured banner layouts, email templates, and video assets.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'Banner Ad', 'Email Drip', 'Video Template'].map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: 'none', background: filter === c ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: filter === c ? '#fff' : 'var(--text-secondary)', cursor: 'pointer' }}>{c}</button>
          ))}
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search templates..." value={query} onChange={e => setQuery(e.target.value)} style={{ padding: '8px 12px 8px 36px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '13px', width: '220px' }} />
        </div>
      </div>

      <div className="grid-cols-4">
        {filtered.map(t => (
          <div key={t.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{t.category}</span>
              <span style={{ fontSize: '11px', color: 'var(--warning)', fontWeight: 600 }}>⭐ {t.rating}</span>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px 0' }}>{t.name}</h3>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Format: {t.dims}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{t.useCount} times used</span>
              <button onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: `Template "${t.name}" loaded!` }))} className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Download size={12}/> Load Layout</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
