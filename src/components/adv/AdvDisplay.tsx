import React from 'react';

interface DisplaySlot {
  dimension: string;
  ctr: number;
  spend: number;
  conversions: number;
}

const slotData: DisplaySlot[] = [
  { dimension: '300x250 Medium Rectangle', ctr: 1.12, spend: 1200, conversions: 45 },
  { dimension: '728x90 Leaderboard', ctr: 0.82, spend: 950, conversions: 28 },
  { dimension: '160x600 Wide Skyscraper', ctr: 0.45, spend: 320, conversions: 8 }
];

export const AdvDisplay: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Display Banner Ads
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Manage display banners placement whitelist, creative sizes CTR, and dynamic remarketing listings.
        </p>
      </div>

      {/* Slots Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Creative Banner Sizes Performance</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Creative Dimension</th>
                  <th>CTR (%)</th>
                  <th>Amount Spent</th>
                  <th>Conversions</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {slotData.map((s, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{s.dimension}</td>
                    <td>{s.ctr}%</td>
                    <td>${s.spend}</td>
                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>{s.conversions}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary btn-sm">Inspect Placements</button>
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
