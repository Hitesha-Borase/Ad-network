import React from 'react';
import { Target, ShieldAlert, Cpu, BarChart } from 'lucide-react';

interface DspCampaign {
  id: string;
  name: string;
  sspPartner: string;
  bidPrice: number;
  winRate: number;
  impressions: number;
  ecpm: number;
}

const initialCampaigns: DspCampaign[] = [
  { id: '1', name: 'Premium Display - Finance Executives', sspPartner: 'Google SSP', bidPrice: 4.50, winRate: 64, impressions: 84000, ecpm: 2.80 },
  { id: '2', name: 'Video Programmatic - Business Tech Owners', sspPartner: 'PubMatic', bidPrice: 9.80, winRate: 42, impressions: 45000, ecpm: 6.20 }
];

export const AdvDsp: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Programmatic DSP
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Manage real-time bidding parameters, programmatic SSP exchanges inventory, and custom audience segments.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Average Win Rate</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>53.0%</h2>
          </div>
          <Target size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Programmatic eCPM</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>$3.99</h2>
          </div>
          <BarChart size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>DSP Bid Floor</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>$1.20</h2>
          </div>
          <Cpu size={24} style={{ color: 'var(--info)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Bidding Errors</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--danger)' }}>0</h2>
          </div>
          <ShieldAlert size={24} style={{ color: 'var(--danger)' }} />
        </div>
      </div>

      {/* Table list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Real-Time Programmatic Bidding Logs</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Target Segment Name</th>
                  <th>SSP Exchange Partner</th>
                  <th>Max Bid (CPM)</th>
                  <th>Win Rate (%)</th>
                  <th>Impressions Bid</th>
                  <th>Average eCPM</th>
                </tr>
              </thead>
              <tbody>
                {initialCampaigns.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>{c.sspPartner}</td>
                    <td>${c.bidPrice.toFixed(2)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '40px', height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${c.winRate}%`, height: '100%', backgroundColor: 'var(--success)' }} />
                        </div>
                        <span>{c.winRate}%</span>
                      </div>
                    </td>
                    <td>{c.impressions.toLocaleString()}</td>
                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>${c.ecpm.toFixed(2)}</td>
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
