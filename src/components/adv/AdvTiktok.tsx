import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Play, Flame, Heart, TrendingUp } from 'lucide-react';

interface TiktokCampaign {
  id: string;
  name: string;
  views: number;
  likes: number;
  ctr: number;
  amountSpent: number;
  completions: number;
}

const completionData = [
  { name: 'Start', value: 100, fill: 'var(--primary)' },
  { name: '25% view', value: 65, fill: 'var(--accent)' },
  { name: '50% view', value: 38, fill: 'var(--info)' },
  { name: '100% view', value: 12, fill: 'var(--success)' }
];

const initialCampaigns: TiktokCampaign[] = [
  { id: '1', name: 'Spark Ad - QuickBooks vs Traditional', views: 85000, likes: 4500, ctr: 2.10, amountSpent: 1200, completions: 9200 },
  { id: '2', name: 'Video Ad - Small Biz Bookkeeping Hacks', views: 145000, likes: 8900, ctr: 1.85, amountSpent: 2200, completions: 14200 }
];

export const AdvTiktok: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          TikTok Ads Manager
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Track TikTok video campaigns, hook-rates, likes interactions, and video watch milestones.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Video Views</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>230,000</h2>
          </div>
          <Play size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Likes & Shares</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>13,400</h2>
          </div>
          <Heart size={24} style={{ color: 'var(--accent)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Completed Views</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>23,400</h2>
          </div>
          <TrendingUp size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Hook Rate (3s)</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--warning)' }}>64.5%</h2>
          </div>
          <Flame size={24} style={{ color: 'var(--warning)' }} />
        </div>
      </div>

      {/* Video milestones funnel */}
      <div className="responsive-layout">
        {/* Watch retention chart */}
        <div className="glass-card" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Video Retention Funnel (%)</h3>
          <div style={{ flex: 1, width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table list */}
        <div className="glass-card" style={{ height: '350px', padding: 0, overflow: 'hidden' }}>
          <div className="table-container" style={{ border: 'none', borderRadius: 0, height: '100%', overflowY: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>TikTok Video Ad</th>
                  <th>Video Views</th>
                  <th>Likes</th>
                  <th>CTR (%)</th>
                  <th>Spend</th>
                  <th>Completions</th>
                </tr>
              </thead>
              <tbody>
                {initialCampaigns.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>{c.views.toLocaleString()}</td>
                    <td>{c.likes.toLocaleString()}</td>
                    <td>{c.ctr}%</td>
                    <td>${c.amountSpent.toLocaleString()}</td>
                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>{c.completions.toLocaleString()}</td>
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
