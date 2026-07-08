import React from 'react';
import { Globe, Star, ArrowUpRight } from 'lucide-react';

interface Publisher {
  id: string;
  domain: string;
  category: string;
  monthlyTraffic: number;
  rating: number;
  directDeals: number;
}

const initialPublishers: Publisher[] = [
  { id: '1', domain: 'forbes.com', category: 'Business & Finance', monthlyTraffic: 45000000, rating: 4.8, directDeals: 12 },
  { id: '2', domain: 'techcrunch.com', category: 'Technology', monthlyTraffic: 22000000, rating: 4.5, directDeals: 5 },
  { id: '3', domain: 'dailyplanet.com', category: 'News & Media', monthlyTraffic: 98000000, rating: 4.2, directDeals: 24 }
];

export const AdvPublishers: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Publisher Management
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Manage direct deals catalog, publisher site metrics, and private marketplace agreements.
        </p>
      </div>

      {/* Directory Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Premium Publisher Directory</h3>

        <div className="grid-cols-3">
          {initialPublishers.map(pub => (
            <div key={pub.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={18} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontWeight: 700, fontSize: '16px' }}>{pub.domain}</span>
                </div>
                <ArrowUpRight size={16} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />
              </div>

              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Category: <strong>{pub.category}</strong>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Monthly Views:</span>
                  <span>{pub.monthlyTraffic.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Quality Rating:</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--warning)' }}>
                    <Star size={12} fill="var(--warning)" /> {pub.rating}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Active Direct Deals:</span>
                  <span className="badge" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)', padding: '2px 8px' }}>
                    {pub.directDeals} Deals
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
