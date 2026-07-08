import React from 'react';
import { DollarSign, Globe, Link2, Users } from 'lucide-react';

interface Affiliate {
  name: string;
  payoutRate: number;
  clicks: number;
  salesRevenue: number;
  earnedCommissions: number;
}

const affiliateData: Affiliate[] = [
  { name: 'David Miller', payoutRate: 15, clicks: 1240, salesRevenue: 12000, earnedCommissions: 1800 },
  { name: 'Stark Tech Blog', payoutRate: 20, clicks: 5800, salesRevenue: 45000, earnedCommissions: 9000 },
  { name: 'Sarah Accounting Review', payoutRate: 15, clicks: 820, salesRevenue: 6400, earnedCommissions: 960 }
];

export const AdvAffiliate: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Affiliate Marketing
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Manage your referral channels, payouts commissions scales, and affiliate links activations.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Affiliate Sales</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>$63,400</h2>
          </div>
          <DollarSign size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Affiliate Clicks</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>7,860</h2>
          </div>
          <Link2 size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Partners Registered</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>24 affiliates</h2>
          </div>
          <Users size={24} style={{ color: 'var(--info)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Payouts Paid</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--warning)' }}>$11,760</h2>
          </div>
          <Globe size={24} style={{ color: 'var(--warning)' }} />
        </div>
      </div>

      {/* Affiliate Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Affiliate Partners Performance</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Partner Name</th>
                  <th>Commission Rate (%)</th>
                  <th>Clicks Sent</th>
                  <th>Sales Revenue</th>
                  <th>Earned Commissions</th>
                </tr>
              </thead>
              <tbody>
                {affiliateData.map((a, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{a.name}</td>
                    <td>{a.payoutRate}%</td>
                    <td>{a.clicks.toLocaleString()}</td>
                    <td style={{ color: 'var(--success)', fontWeight: 600 }}>${a.salesRevenue.toLocaleString()}</td>
                    <td style={{ fontWeight: 600 }}>${a.earnedCommissions.toLocaleString()}</td>
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
