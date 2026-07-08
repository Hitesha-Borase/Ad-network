import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Briefcase, Building2, Users, CreditCard } from 'lucide-react';

interface LinkedinCampaign {
  id: string;
  name: string;
  clicks: number;
  ctr: number;
  conversions: number;
  conversionRate: number;
  spend: number;
}

const jobFunctionData = [
  { name: 'Finance', leads: 48, fill: 'var(--primary)' },
  { name: 'Operations', leads: 28, fill: 'var(--success)' },
  { name: 'Engineering', leads: 15, fill: 'var(--info)' },
  { name: 'IT Support', leads: 9, fill: 'var(--accent)' }
];

const initialCampaigns: LinkedinCampaign[] = [
  { id: '1', name: 'B2B CFO Decision Makers - Sponsored Post', clicks: 820, ctr: 1.45, conversions: 48, conversionRate: 5.85, spend: 3200 },
  { id: '2', name: 'Direct Message InMail - Free Consultation Offer', clicks: 240, ctr: 48.2, conversions: 32, conversionRate: 13.3, spend: 1800 }
];

export const AdvLinkedin: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          LinkedIn Ads Manager
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Manage your B2B demographic targets, sponsored articles, and lead forms stats.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Campaign Spend</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>$5,000</h2>
          </div>
          <CreditCard size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Conversions</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>80</h2>
          </div>
          <Users size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>CPA Rating</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>$62.50</h2>
          </div>
          <Briefcase size={24} style={{ color: 'var(--warning)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Targeted Companies</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>420</h2>
          </div>
          <Building2 size={24} style={{ color: 'var(--info)' }} />
        </div>
      </div>

      {/* Target Breakdown & table */}
      <div className="responsive-layout">
        {/* Job function distribution */}
        <div className="glass-card" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Leads by Job Function</h3>
          <div style={{ flex: 1, width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={jobFunctionData} layout="vertical" margin={{ left: -10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} vertical={true} />
                <XAxis type="number" stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="leads" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table of campaigns */}
        <div className="glass-card" style={{ height: '350px', padding: 0, overflow: 'hidden' }}>
          <div className="table-container" style={{ border: 'none', borderRadius: 0, height: '100%', overflowY: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>LinkedIn Ad Campaign</th>
                  <th>Clicks</th>
                  <th>CTR</th>
                  <th>Conversions</th>
                  <th>Conv Rate</th>
                  <th>Spend</th>
                </tr>
              </thead>
              <tbody>
                {initialCampaigns.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>{c.clicks.toLocaleString()}</td>
                    <td>{c.ctr}%</td>
                    <td>{c.conversions}</td>
                    <td>{c.conversionRate}%</td>
                    <td style={{ fontWeight: 600 }}>${c.spend.toLocaleString()}</td>
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
