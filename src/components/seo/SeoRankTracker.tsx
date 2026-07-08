import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, ArrowDown, ArrowUp, Calendar, Search } from 'lucide-react';

interface RankItem {
  id: string;
  keyword: string;
  currentRank: number;
  previousRank: number;
  volume: number;
  landingPage: string;
}

const rankData = [
  { name: 'Week 1', rank1: 14, rank2: 8, rank3: 25 },
  { name: 'Week 2', rank1: 12, rank2: 5, rank3: 21 },
  { name: 'Week 3', rank1: 9, rank2: 6, rank3: 15 },
  { name: 'Week 4', rank1: 5, rank2: 3, rank3: 11 },
  { name: 'Week 5', rank1: 4, rank2: 3, rank3: 8 },
  { name: 'Week 6', rank1: 2, rank2: 1, rank3: 5 }
];

const initialKeywords: RankItem[] = [
  { id: '1', keyword: 'best cloud accounting software', currentRank: 2, previousRank: 4, volume: 8100, landingPage: '/products/cloud-accounting' },
  { id: '2', keyword: 'accounting software free trial', currentRank: 1, previousRank: 3, volume: 3200, landingPage: '/pricing' },
  { id: '3', keyword: 'how to do business bookkeeping', currentRank: 5, previousRank: 8, volume: 15000, landingPage: '/blog/bookkeeping-guide' },
  { id: '4', keyword: 'small business expense tracker app', currentRank: 12, previousRank: 10, volume: 5400, landingPage: '/products/expense-tracker' },
  { id: '5', keyword: 'automated invoicing benefits', currentRank: 8, previousRank: 15, volume: 1200, landingPage: '/blog/automated-invoices' }
];

export const SeoRankTracker: React.FC = () => {
  const [keywords] = useState<RankItem[]>(initialKeywords);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKeywords = keywords.filter(k =>
    k.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Rank Tracker
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Monitor your keyword search ranking positions in SERPs and target URL attribution changes.
        </p>
      </div>

      {/* Analytics Chart */}
      <div className="glass-card" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Position History (Top Keywords)</h2>
          <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> Last 30 Days</span>
          </div>
        </div>
        <div style={{ flex: 1, width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={rankData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} reversed={true} domain={[1, 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />
              <Line type="monotone" dataKey="rank1" name="Best Cloud Accounting" stroke="var(--primary)" strokeWidth={2} dot={true} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="rank2" name="Accounting Free Trial" stroke="var(--success)" strokeWidth={2} dot={true} />
              <Line type="monotone" dataKey="rank3" name="Bookkeeping Guide" stroke="var(--accent)" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid Summary Stats */}
      <div className="grid-cols-3">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Average Position</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>5.6</h2>
          </div>
          <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', fontSize: '13px', fontWeight: 600 }}>
            <TrendingUp size={16} style={{ marginRight: '4px' }} /> +2.4 Positions
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Keywords in Top 3</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>3 Keywords</h2>
          </div>
          <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', fontSize: '13px', fontWeight: 600 }}>
            <TrendingUp size={16} style={{ marginRight: '4px' }} /> +1 New
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Keywords in Top 10</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>4 Keywords</h2>
          </div>
          <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', fontSize: '13px' }}>
            No Change
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Tracked Keywords List</h3>
          <div style={{ position: 'relative', width: '250px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Search tracked terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '32px', paddingTop: '6px', paddingBottom: '6px' }}
            />
          </div>
        </div>

        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Keyword</th>
                  <th>Current Rank</th>
                  <th>Change</th>
                  <th>Search Volume</th>
                  <th>Landing Page</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredKeywords.map(k => {
                  const diff = k.previousRank - k.currentRank;
                  return (
                    <tr key={k.id}>
                      <td style={{ fontWeight: 600 }}>{k.keyword}</td>
                      <td>
                        <span style={{
                          fontWeight: 700,
                          fontSize: '15px',
                          color: k.currentRank <= 3 ? 'var(--success)' : k.currentRank <= 10 ? 'var(--warning)' : 'var(--text-primary)'
                        }}>
                          #{k.currentRank}
                        </span>
                      </td>
                      <td>
                        {diff > 0 ? (
                          <span style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                            <ArrowUp size={14} /> +{diff}
                          </span>
                        ) : diff < 0 ? (
                          <span style={{ color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                            <ArrowDown size={14} /> {diff}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>-</span>
                        )}
                      </td>
                      <td>{k.volume.toLocaleString()}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{k.landingPage}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="btn btn-secondary btn-sm">SERP History</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
