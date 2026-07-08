import React from 'react';
import { Tv, Monitor, Smartphone, Volume2 } from 'lucide-react';

interface CtvPlatform {
  device: string;
  impressions: number;
  completionRate: number;
  frequency: number;
}

const platformData: CtvPlatform[] = [
  { device: 'Roku TV', impressions: 45000, completionRate: 98.2, frequency: 1.4 },
  { device: 'Apple TV', impressions: 24000, completionRate: 99.0, frequency: 1.2 },
  { device: 'Samsung Smart TV', impressions: 18000, completionRate: 96.5, frequency: 1.5 }
];

export const AdvCtv: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Connected TV (CTV) Ads
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Manage streaming media ad purchases, smart TV device impressions, and frequency capping rules.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>CTV Impressions</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--primary)' }}>87,000</h2>
          </div>
          <Tv size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Video Completion (VCR)</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>98.1%</h2>
          </div>
          <Monitor size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Avg Frequency</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>1.3x</h2>
          </div>
          <Smartphone size={24} style={{ color: 'var(--warning)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Audio Level</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--info)' }}>100%</h2>
          </div>
          <Volume2 size={24} style={{ color: 'var(--info)' }} />
        </div>
      </div>

      {/* Platforms Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Streaming Platform Analytics</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Device / Smart TV OS</th>
                  <th>Impressions</th>
                  <th>Completion Rate (%)</th>
                  <th>Frequency Cap</th>
                </tr>
              </thead>
              <tbody>
                {platformData.map((p, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{p.device}</td>
                    <td>{p.impressions.toLocaleString()}</td>
                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>{p.completionRate}%</td>
                    <td>{p.frequency}x / household</td>
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
