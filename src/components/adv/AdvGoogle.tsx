import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, TrendingUp, DollarSign, MousePointer, Percent } from 'lucide-react';

interface AdCampaign {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'paused' | 'ended';
  budget: number;
  spend: number;
  clicks: number;
  ctr: number;
  conversions: number;
}

const analyticsData = [
  { name: 'Week 1', spend: 1200, conv: 14 },
  { name: 'Week 2', spend: 1500, conv: 18 },
  { name: 'Week 3', spend: 1800, conv: 22 },
  { name: 'Week 4', spend: 2200, conv: 29 },
  { name: 'Week 5', spend: 2400, conv: 35 },
  { name: 'Week 6', spend: 2800, conv: 42 }
];

const initialCampaigns: AdCampaign[] = [
  { id: '1', name: 'Google Search - Cloud Accounting', type: 'Search', status: 'active', budget: 150, spend: 2400, clicks: 480, ctr: 4.8, conversions: 52 },
  { id: '2', name: 'PMax - Ecom Shopping', type: 'Performance Max', status: 'active', budget: 300, spend: 5800, clicks: 1200, ctr: 2.1, conversions: 110 },
  { id: '3', name: 'Remarketing Banner - Dynamic Display', type: 'Display', status: 'active', budget: 50, spend: 950, clicks: 310, ctr: 0.85, conversions: 12 },
  { id: '4', name: 'Brand Search - Wayne Enterprises', type: 'Search', status: 'paused', budget: 100, spend: 1200, clicks: 600, ctr: 12.4, conversions: 95 }
];

export const AdvGoogle: React.FC = () => {
  const [campaigns] = useState<AdCampaign[]>(initialCampaigns);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampaigns = campaigns.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          Google Ads Manager
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Monitor your Google Search, Display, Shopping, and Performance Max ad performance metrics.
        </p>
      </div>

      {/* Overview Metrics */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Spend</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>$10,350</h2>
          </div>
          <DollarSign size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Conversions</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>269</h2>
          </div>
          <TrendingUp size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Clicks</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>2,590</h2>
          </div>
          <MousePointer size={24} style={{ color: 'var(--info)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Average CTR</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>5.03%</h2>
          </div>
          <Percent size={24} style={{ color: 'var(--warning)' }} />
        </div>
      </div>

      {/* Spend vs Conversion Chart */}
      <div className="glass-card" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Spend & Conversion Trends</h2>
        <div style={{ flex: 1, width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="spend" name="Spend ($)" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorSpend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaign List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Google Ad Campaigns</h3>
          <div style={{ position: 'relative', width: '250px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Search campaigns..."
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
                  <th>Campaign Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Daily Budget</th>
                  <th>Amount Spent</th>
                  <th>Clicks</th>
                  <th>CTR</th>
                  <th>Conversions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>
                      <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', fontSize: '11px' }}>
                        {c.type}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${c.status === 'active' ? 'success' : 'warning'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>${c.budget}/day</td>
                    <td>${c.spend.toLocaleString()}</td>
                    <td>{c.clicks.toLocaleString()}</td>
                    <td>{c.ctr}%</td>
                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>{c.conversions}</td>
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
