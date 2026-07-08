import React from 'react';
import { Map, MapPin, Compass, Play } from 'lucide-react';

interface Billboard {
  location: string;
  dimensions: string;
  loopsPerHour: number;
  estImpressions: number;
  status: 'active' | 'scheduled';
}

const billboardData: Billboard[] = [
  { location: 'Times Square Banner - North Facing', dimensions: '14x48 ft', loopsPerHour: 60, estImpressions: 480000, status: 'active' },
  { location: 'Silicon Valley Highway - Electronic Board', dimensions: '20x60 ft', loopsPerHour: 45, estImpressions: 220000, status: 'scheduled' }
];

export const AdvDooh: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Digital Out-Of-Home (DOOH)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Manage digital billboard loop listings, physical screen placements, schedules, and hourly audience indexes.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Active Screens</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--primary)' }}>3 Screens</h2>
          </div>
          <Map size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Daily Loops Play</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>1,440</h2>
          </div>
          <Play size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Weekly Reach</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>700,000</h2>
          </div>
          <Compass size={24} style={{ color: 'var(--warning)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Main Markets</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--info)' }}>2 Cities</h2>
          </div>
          <MapPin size={24} style={{ color: 'var(--info)' }} />
        </div>
      </div>

      {/* Billboards Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Connected Billboard Listings</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Physical Board Location</th>
                  <th>Dimensions</th>
                  <th>Loops / Hour</th>
                  <th>Daily Est. Impressions</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {billboardData.map((b, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{b.location}</td>
                    <td>{b.dimensions}</td>
                    <td>{b.loopsPerHour} times</td>
                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>{b.estImpressions.toLocaleString()}</td>
                    <td>
                      <span className={`badge badge-${b.status === 'active' ? 'success' : 'warning'}`}>
                        {b.status}
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
