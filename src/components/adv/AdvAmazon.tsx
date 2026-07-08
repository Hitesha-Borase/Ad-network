import React from 'react';
import { ShoppingBag, TrendingUp, DollarSign, Star } from 'lucide-react';

interface AmazonCampaign {
  id: string;
  asin: string;
  name: string;
  spend: number;
  sales: number;
  acos: number;
  roas: number;
}

const initialCampaigns: AmazonCampaign[] = [
  { id: '1', asin: 'B08HQ8GZ5X', name: 'Sponsored Products - Bookkeeper Ledger Book', spend: 850, sales: 4500, acos: 18.8, roas: 5.3 },
  { id: '2', asin: 'B07P7S6XLM', name: 'Sponsored Brands - Wayne Expense Planners', spend: 1200, sales: 3800, acos: 31.5, roas: 3.1 }
];

export const AdvAmazon: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Amazon Ads Manager
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Monitor Amazon Seller Sponsored Products, ACoS indexes, and product store conversion attributes.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Ad Spend</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>$2,050</h2>
          </div>
          <DollarSign size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Ad Sales</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>$8,300</h2>
          </div>
          <ShoppingBag size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Average ACoS</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--warning)' }}>24.6%</h2>
          </div>
          <TrendingUp size={24} style={{ color: 'var(--warning)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Store RoAS</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--info)' }}>4.04x</h2>
          </div>
          <Star size={24} style={{ color: 'var(--info)' }} />
        </div>
      </div>

      {/* Campaigns list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Sponsored ASIN Catalog</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ASIN</th>
                  <th>Product Campaign Name</th>
                  <th>Spend</th>
                  <th>Sales Revenue</th>
                  <th>ACoS (%)</th>
                  <th>RoAS (x)</th>
                </tr>
              </thead>
              <tbody>
                {initialCampaigns.map(c => (
                  <tr key={c.id}>
                    <td>
                      <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', fontWeight: 600 }}>
                        {c.asin}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>${c.spend.toLocaleString()}</td>
                    <td style={{ color: 'var(--success)', fontWeight: 600 }}>${c.sales.toLocaleString()}</td>
                    <td>{c.acos}%</td>
                    <td style={{ fontWeight: 600, color: 'var(--info)' }}>{c.roas}x</td>
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
