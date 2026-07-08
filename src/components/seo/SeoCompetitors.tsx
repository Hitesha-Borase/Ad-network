import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldAlert, Award, ExternalLink } from 'lucide-react';

interface Competitor {
  id: string;
  domain: string;
  domainAuthority: number;
  backlinksCount: number;
  organicTraffic: number;
  sharedKeywords: number;
}

const competitorData = [
  { name: 'Your Site', shared: 100, color: 'var(--primary)' },
  { name: 'comp1.com', shared: 42, color: 'var(--accent)' },
  { name: 'comp2.com', shared: 35, color: 'var(--info)' },
  { name: 'comp3.com', shared: 18, color: 'var(--success)' }
];

const initialCompetitors: Competitor[] = [
  { id: '1', domain: 'accountingplus.com', domainAuthority: 64, backlinksCount: 84000, organicTraffic: 95000, sharedKeywords: 820 },
  { id: '2', domain: 'ledgify.io', domainAuthority: 48, backlinksCount: 32000, organicTraffic: 42000, sharedKeywords: 540 },
  { id: '3', domain: 'bookkeepercloud.com', domainAuthority: 72, backlinksCount: 155000, organicTraffic: 180000, sharedKeywords: 1200 }
];

export const SeoCompetitors: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Competitor Analysis
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Monitor competitor SEO profiles, organic traffic comparisons, and identify keyword gaps.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="responsive-layout">
        {/* Keyword overlap chart */}
        <div className="glass-card" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Shared Keywords Distribution (%)</h2>
          <div style={{ flex: 1, width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={competitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="shared" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Gap Analysis box */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
          <div style={{ color: 'var(--accent)', display: 'flex', justifyContent: 'center' }}>
            <ShieldAlert size={36} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>Keyword Gap Found</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              There are <strong>240 valuable terms</strong> ranking in the top 10 for competitors but missing from your website campaigns.
            </p>
          </div>
          <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>Analyze Gaps</button>
        </div>
      </div>

      {/* Competitors List Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Competitor Profiles</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Competitor Domain</th>
                  <th>Domain Rating (DR)</th>
                  <th>Total Backlinks</th>
                  <th>Organic traffic</th>
                  <th>Shared Keywords</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialCompetitors.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                        {c.domain}
                        <ExternalLink size={12} style={{ color: 'var(--text-muted)' }} />
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Award size={14} style={{ color: 'var(--warning)' }} />
                        <span style={{ fontWeight: 600 }}>{c.domainAuthority}</span>
                      </div>
                    </td>
                    <td>{c.backlinksCount.toLocaleString()}</td>
                    <td>{c.organicTraffic.toLocaleString()} /mo</td>
                    <td>
                      <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 600 }}>
                        {c.sharedKeywords} terms
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary btn-sm">Full Compare</button>
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
