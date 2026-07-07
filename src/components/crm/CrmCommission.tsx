import React, { useState } from 'react';
import { Award, Target } from 'lucide-react';

interface CommissionTier {
  range: string;
  rate: number;
  bonus: string;
}

export const CrmCommission: React.FC = () => {
  const [salesVal, setSalesVal] = useState<number>(125000);
  const targetVal = 150000;

  const tiers: CommissionTier[] = [
    { range: '$0 - $50,000', rate: 2, bonus: 'None' },
    { range: '$50,001 - $100,000', rate: 5, bonus: 'Quarterly Kickback' },
    { range: '$100,001 - $200,000', rate: 8, bonus: '$5,000 Milestone Bonus' },
    { range: '$200,000+', rate: 12, bonus: '$10,000 Milestone Bonus' }
  ];

  // Calculate commission payout
  const calculateCommission = (sales: number) => {
    let commission = 0;
    if (sales <= 50000) {
      commission = sales * 0.02;
    } else if (sales <= 100000) {
      commission = (50000 * 0.02) + ((sales - 50000) * 0.05);
    } else if (sales <= 200000) {
      commission = (50000 * 0.02) + (50000 * 0.05) + ((sales - 100000) * 0.08);
    } else {
      commission = (50000 * 0.02) + (50000 * 0.05) + (100000 * 0.08) + ((sales - 200000) * 0.12);
    }
    return commission;
  };

  const currentCommission = calculateCommission(salesVal);
  const percentOfTarget = Math.min((salesVal / targetVal) * 100, 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      <div className="grid-cols-2">
        {/* Sales Agent Metrics */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Award size={18} style={{ color: 'var(--primary)' }} /> Agent Target Tracker
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Target Achievement:</span>
                <span style={{ fontWeight: 600 }}>{percentOfTarget.toFixed(1)}%</span>
              </div>
              <div style={{
                height: '8px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${percentOfTarget}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)'
                }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '8px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>CURRENT SALES</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input 
                    type="number"
                    className="form-control"
                    value={salesVal}
                    onChange={(e) => setSalesVal(Number(e.target.value))}
                    style={{ fontSize: '15px', fontWeight: 700, padding: '4px 8px', width: '120px' }}
                  />
                </div>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>TARGET METRIC</span>
                <strong style={{ fontSize: '16px' }}>${targetVal.toLocaleString()}</strong>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>Est. Commission Payout:</span>
              <strong style={{ fontSize: '18px', color: 'var(--success)' }}>${currentCommission.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Tiers list card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Target size={18} style={{ color: 'var(--accent)' }} /> Commission Schedule Tiers
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            {tiers.map((t, idx) => {
              const currentTierIdx = salesVal <= 50000 ? 0 : salesVal <= 100000 ? 1 : salesVal <= 200000 ? 2 : 3;
              const isActive = currentTierIdx === idx;

              return (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                }}>
                  <span style={{ fontWeight: isActive ? 600 : 400 }}>{t.range}</span>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: isActive ? 'var(--accent)' : 'var(--text-primary)' }}>{t.rate}% Rate</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.bonus}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
