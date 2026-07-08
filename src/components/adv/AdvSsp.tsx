import React from 'react';
import { Layers, CheckCircle2, DollarSign, Award } from 'lucide-react';

interface SspSlot {
  id: string;
  name: string;
  format: string;
  adRequests: number;
  filledImpressions: number;
  fillRate: number;
  revenue: number;
}

const initialSlots: SspSlot[] = [
  { id: '1', name: 'Homepage Banner - Top Header', format: '728x90', adRequests: 420000, filledImpressions: 395000, fillRate: 94.0, revenue: 1185 },
  { id: '2', name: 'Sidebar Widget - Premium Ads Slot', format: '300x250', adRequests: 180000, filledImpressions: 162000, fillRate: 90.0, revenue: 486 }
];

export const AdvSsp: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Programmatic SSP
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Monitor publisher side ad request counts, filled rates, impressions monetization, and earned revenues.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Ad Requests</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>600,000</h2>
          </div>
          <Layers size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Fill Rate (%)</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>92.8%</h2>
          </div>
          <CheckCircle2 size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Earned Revenue</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--warning)' }}>$1,671</h2>
          </div>
          <DollarSign size={24} style={{ color: 'var(--warning)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Average CPM</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--info)' }}>$3.00</h2>
          </div>
          <Award size={24} style={{ color: 'var(--info)' }} />
        </div>
      </div>

      {/* Slots Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Publisher Placement Monetization</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Placement Name</th>
                  <th>Ad Dimension</th>
                  <th>Requests</th>
                  <th>Filled Impressions</th>
                  <th>Fill Rate (%)</th>
                  <th>Earned Revenue</th>
                </tr>
              </thead>
              <tbody>
                {initialSlots.map(slot => (
                  <tr key={slot.id}>
                    <td style={{ fontWeight: 600 }}>{slot.name}</td>
                    <td>
                      <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', fontSize: '11px' }}>
                        {slot.format}
                      </span>
                    </td>
                    <td>{slot.adRequests.toLocaleString()}</td>
                    <td>{slot.filledImpressions.toLocaleString()}</td>
                    <td>{slot.fillRate}%</td>
                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>${slot.revenue.toLocaleString()}</td>
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
