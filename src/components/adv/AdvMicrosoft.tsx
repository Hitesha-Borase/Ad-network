import React from 'react';
import { Search, Compass, MousePointer, Shield } from 'lucide-react';

interface MSAdGroup {
  id: string;
  name: string;
  clicks: number;
  impressions: number;
  ctr: number;
  spend: number;
  cpc: number;
}

const initialGroups: MSAdGroup[] = [
  { id: '1', name: 'Accounting Tools for Desktop', clicks: 280, impressions: 5800, ctr: 4.82, spend: 640, cpc: 2.28 },
  { id: '2', name: 'Biz Expense Planning Software', clicks: 140, impressions: 4200, ctr: 3.33, spend: 380, cpc: 2.71 }
];

export const AdvMicrosoft: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Microsoft Ads Manager
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Manage and monitor search advertisements running across Bing, Yahoo, and MSN networks.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Microsoft Spend</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>$1,020</h2>
          </div>
          <Compass size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Audience Clicks</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--info)' }}>420</h2>
          </div>
          <MousePointer size={24} style={{ color: 'var(--info)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Average CTR</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>4.20%</h2>
          </div>
          <Shield size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Average CPC</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>$2.42</h2>
          </div>
          <Search size={24} style={{ color: 'var(--warning)' }} />
        </div>
      </div>

      {/* Campaign Groups table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Bing Search Ad Groups</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Ad Group Name</th>
                  <th>Clicks</th>
                  <th>Impressions</th>
                  <th>CTR (%)</th>
                  <th>Total Spend</th>
                  <th>Average CPC</th>
                </tr>
              </thead>
              <tbody>
                {initialGroups.map(group => (
                  <tr key={group.id}>
                    <td style={{ fontWeight: 600 }}>{group.name}</td>
                    <td>{group.clicks.toLocaleString()}</td>
                    <td>{group.impressions.toLocaleString()}</td>
                    <td>{group.ctr}%</td>
                    <td>${group.spend.toLocaleString()}</td>
                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>${group.cpc.toFixed(2)}</td>
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
