import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, Globe, Link2, AlertOctagon } from 'lucide-react';

interface LinkAnchor {
  id: string;
  anchorText: string;
  referringDomains: number;
  backlinksCount: number;
  targetPage: string;
}

const historyData = [
  { name: 'Jan', links: 42000 },
  { name: 'Feb', links: 45000 },
  { name: 'Mar', links: 48000 },
  { name: 'Apr', links: 52000 },
  { name: 'May', links: 68000 },
  { name: 'Jun', links: 72000 }
];

const initialAnchors: LinkAnchor[] = [
  { id: '1', anchorText: 'best cloud accounting', referringDomains: 120, backlinksCount: 450, targetPage: '/products/cloud-accounting' },
  { id: '2', anchorText: 'accounting software', referringDomains: 85, backlinksCount: 220, targetPage: '/' },
  { id: '3', anchorText: 'free invoicing tool', referringDomains: 45, backlinksCount: 98, targetPage: '/features/invoices' },
  { id: '4', anchorText: 'wayne corp technologies', referringDomains: 30, backlinksCount: 150, targetPage: '/pricing' }
];

export const SeoBacklinks: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Backlink Profile
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Manage your off-page citation authority, referring sites directory, and anchor text splits.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Domain Rating (DR)</span>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginTop: '4px', color: 'var(--warning)' }}>68</h2>
          </div>
          <Award size={28} style={{ color: 'var(--warning)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Referring Domains</span>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginTop: '4px' }}>1,840</h2>
          </div>
          <Globe size={28} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Backlinks</span>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>72,000</h2>
          </div>
          <Link2 size={28} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Toxic Links</span>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginTop: '4px', color: 'var(--danger)' }}>14</h2>
          </div>
          <AlertOctagon size={28} style={{ color: 'var(--danger)' }} />
        </div>
      </div>

      {/* Link growth history chart */}
      <div className="glass-card" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Backlink Volume History</h2>
        <div style={{ flex: 1, width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLink" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--success)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--success)" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="links" stroke="var(--success)" strokeWidth={2} fillOpacity={1} fill="url(#colorLink)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Anchor Text Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Anchor Text Profile Analysis</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Anchor Text</th>
                  <th>Referring Domains</th>
                  <th>Total Backlinks</th>
                  <th>Target URL</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialAnchors.map(anchor => (
                  <tr key={anchor.id}>
                    <td style={{ fontWeight: 600 }}>"{anchor.anchorText}"</td>
                    <td>{anchor.referringDomains} domains</td>
                    <td>{anchor.backlinksCount} links</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{anchor.targetPage}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary btn-sm">Inspect URLs</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
