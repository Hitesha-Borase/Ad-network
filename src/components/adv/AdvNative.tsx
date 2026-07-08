import React from 'react';

interface NativeCampaign {
  id: string;
  headline: string;
  ctr: number;
  cpc: number;
  conversions: number;
  spend: number;
}

const initialCampaigns: NativeCampaign[] = [
  { id: '1', headline: 'How B2B companies are automating their bookkeeping in 2026', ctr: 0.94, cpc: 0.42, conversions: 85, spend: 450 },
  { id: '2', headline: 'This simple accounting hack saves businesses 15 hours a week', ctr: 1.12, cpc: 0.38, conversions: 120, spend: 680 }
];

export const AdvNative: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Native Ads Manager
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Monitor Taboola, Outbrain, and other recommended content native widget CPC campaigns.
        </p>
      </div>

      {/* Campaigns list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Headline CTR Comparisons</h3>

        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Ad Headline</th>
                  <th>CTR (%)</th>
                  <th>Avg CPC</th>
                  <th>Conversions</th>
                  <th>Spend</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialCampaigns.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600, maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      "{c.headline}"
                    </td>
                    <td>{c.ctr}%</td>
                    <td>${c.cpc.toFixed(2)}</td>
                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>{c.conversions}</td>
                    <td>${c.spend}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary btn-sm">Edit Title</button>
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
