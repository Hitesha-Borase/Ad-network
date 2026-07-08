import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, Eye, Heart, TrendingUp } from 'lucide-react';

interface MetaCampaign {
  id: string;
  name: string;
  reach: number;
  impressions: number;
  frequency: number;
  amountSpent: number;
  leads: number;
  cpl: number;
}

const performData = [
  { name: 'Day 1', reach: 8000, spend: 120 },
  { name: 'Day 2', reach: 9500, spend: 150 },
  { name: 'Day 3', reach: 11000, spend: 180 },
  { name: 'Day 4', reach: 13000, spend: 210 },
  { name: 'Day 5', reach: 15500, spend: 260 }
];

const initialCampaigns: MetaCampaign[] = [
  { id: '1', name: 'Lead Gen - Free Bookkeeping Templates', reach: 45000, impressions: 82000, frequency: 1.82, amountSpent: 1200, leads: 150, cpl: 8.00 },
  { id: '2', name: 'Brand Video - Wayne Corp Vision', reach: 120000, impressions: 340000, frequency: 2.83, amountSpent: 3500, leads: 42, cpl: 83.30 },
  { id: '3', name: 'Retargeting - Sign up Offer', reach: 18000, impressions: 48000, frequency: 2.66, amountSpent: 850, leads: 95, cpl: 8.90 }
];

export const AdvMeta: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Meta Ads Manager
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Manage and monitor campaigns across Facebook, Instagram, Messenger, and Audience Networks.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Reach</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>183,000</h2>
          </div>
          <Eye size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Impressions</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>470,000</h2>
          </div>
          <Heart size={24} style={{ color: 'var(--accent)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Leads</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>287</h2>
          </div>
          <TrendingUp size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Avg Cost per Lead</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--warning)' }}>$19.33</h2>
          </div>
          <Award size={24} style={{ color: 'var(--warning)' }} />
        </div>
      </div>

      {/* Graph */}
      <div className="glass-card" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Daily Reach & Budget Performance</h2>
        <div style={{ flex: 1, width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={performData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="reach" stroke="var(--accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorReach)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Active Facebook/Instagram Ads</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Ad Campaign Name</th>
                  <th>Reach</th>
                  <th>Impressions</th>
                  <th>Frequency</th>
                  <th>Spend</th>
                  <th>Leads Generated</th>
                  <th>CPL (USD)</th>
                </tr>
              </thead>
              <tbody>
                {initialCampaigns.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>{c.reach.toLocaleString()}</td>
                    <td>{c.impressions.toLocaleString()}</td>
                    <td>{c.frequency}x</td>
                    <td>${c.amountSpent.toLocaleString()}</td>
                    <td>{c.leads}</td>
                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>${c.cpl.toFixed(2)}</td>
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
