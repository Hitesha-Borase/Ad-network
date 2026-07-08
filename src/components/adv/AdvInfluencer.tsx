import React from 'react';
import { Camera, Heart, DollarSign, Award } from 'lucide-react';

interface Influencer {
  name: string;
  platform: string;
  followers: string;
  cost: number;
  engagement: number;
  promoCode: string;
  codeSales: number;
}

const influencerData: Influencer[] = [
  { name: 'Bruce Wayne', platform: 'Instagram', followers: '1.2M', cost: 5000, engagement: 4.8, promoCode: 'WAYNE20', codeSales: 15400 },
  { name: 'Peter Parker', platform: 'YouTube', followers: '840K', cost: 3200, engagement: 6.2, promoCode: 'SPIDY15', codeSales: 9800 }
];

export const AdvInfluencer: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Influencer Outreach
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Manage your influencer rosters, contract deliverables checklist, and promo code sales attributions.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Promo Code Sales</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>$25,200</h2>
          </div>
          <DollarSign size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Influencer Spend</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>$8,200</h2>
          </div>
          <Award size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Engagement Avg</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--info)' }}>5.5%</h2>
          </div>
          <Heart size={24} style={{ color: 'var(--info)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Creators</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>2 partners</h2>
          </div>
          <Camera size={24} style={{ color: 'var(--warning)' }} />
        </div>
      </div>

      {/* Roster Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Active Creator Roster</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Influencer / Creator</th>
                  <th>Platform</th>
                  <th>Followers Count</th>
                  <th>Contract Fee</th>
                  <th>Engagement (%)</th>
                  <th>Promo Code</th>
                  <th>Attributed Sales</th>
                </tr>
              </thead>
              <tbody>
                {influencerData.map((inf, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{inf.name}</td>
                    <td>
                      <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', fontSize: '11px' }}>
                        {inf.platform}
                      </span>
                    </td>
                    <td>{inf.followers}</td>
                    <td>${inf.cost.toLocaleString()}</td>
                    <td>{inf.engagement}%</td>
                    <td>
                      <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 600 }}>
                        {inf.promoCode}
                      </span>
                    </td>
                    <td style={{ color: 'var(--success)', fontWeight: 600 }}>${inf.codeSales.toLocaleString()}</td>
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
