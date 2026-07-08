import React from 'react';
import { Activity, Radio, Cpu, ShieldAlert } from 'lucide-react';

interface Bidder {
  id: string;
  name: string;
  qps: number;
  avgBidPrice: number;
  winRate: number;
  status: 'active' | 'inactive';
}

const initialBidders: Bidder[] = [
  { id: '1', name: 'DV360 Bidder Platform', qps: 18400, avgBidPrice: 3.20, winRate: 58, status: 'active' },
  { id: '2', name: 'The Trade Desk RTB Engine', qps: 14200, avgBidPrice: 4.80, winRate: 46, status: 'active' },
  { id: '3', name: 'MediaMath Programmatic Node', qps: 0, avgBidPrice: 0.00, winRate: 0, status: 'inactive' }
];

export const AdvRtb: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          RTB Exchange Exchange
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Monitor live RTB auction bids, network queries per second (QPS), and bidding partner response errors.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Current QPS</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--primary)' }}>32,600 /s</h2>
          </div>
          <Activity size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Average Bid Price</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>$3.90 CPM</h2>
          </div>
          <Radio size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Floor CPM Level</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>$1.00 CPM</h2>
          </div>
          <Cpu size={24} style={{ color: 'var(--info)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Auction Timeouts</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--danger)' }}>0.02%</h2>
          </div>
          <ShieldAlert size={24} style={{ color: 'var(--danger)' }} />
        </div>
      </div>

      {/* Bidders Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Active RTB Bidder Nodes</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Bidder Name</th>
                  <th>Queries per Second (QPS)</th>
                  <th>Average Bid Price (CPM)</th>
                  <th>Win Rate (%)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {initialBidders.map(bidder => (
                  <tr key={bidder.id}>
                    <td style={{ fontWeight: 600 }}>{bidder.name}</td>
                    <td>{bidder.qps.toLocaleString()}</td>
                    <td>${bidder.avgBidPrice.toFixed(2)}</td>
                    <td>{bidder.winRate}%</td>
                    <td>
                      <span className={`badge badge-${bidder.status === 'active' ? 'success' : 'danger'}`}>
                        {bidder.status}
                      </span>
                    </td>
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
