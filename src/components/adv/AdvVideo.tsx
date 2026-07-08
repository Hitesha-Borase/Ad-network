import React from 'react';
import { Play, Eye, SkipForward, Music } from 'lucide-react';

interface VideoPerformance {
  adName: string;
  plays: number;
  skipRate: number;
  completedViews: number;
  audioOnRate: number;
}

const videoData: VideoPerformance[] = [
  { adName: 'Wayne Corp Vision - 30s Brand Video', plays: 120000, skipRate: 34.2, completedViews: 42000, audioOnRate: 48.6 },
  { adName: 'Automated Invoices - 15s Product Demo', plays: 64000, skipRate: 18.5, completedViews: 35000, audioOnRate: 64.2 }
];

export const AdvVideo: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Video Ads Manager
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Monitor video players start impressions, skip rates, sound indicators, and VAST/VPAID placements.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Video Plays</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>184,000</h2>
          </div>
          <Play size={24} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Completed Views</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>77,000</h2>
          </div>
          <Eye size={24} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Avg Skip Rate</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--danger)' }}>28.5%</h2>
          </div>
          <SkipForward size={24} style={{ color: 'var(--danger)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Sound On (%)</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--info)' }}>54.0%</h2>
          </div>
          <Music size={24} style={{ color: 'var(--info)' }} />
        </div>
      </div>

      {/* Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Active Video Creatives Performance</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Video Creative Name</th>
                  <th>Total Plays</th>
                  <th>Skip Rate (%)</th>
                  <th>Completed Views</th>
                  <th>Audio On Rate (%)</th>
                </tr>
              </thead>
              <tbody>
                {videoData.map((v, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{v.adName}</td>
                    <td>{v.plays.toLocaleString()}</td>
                    <td>{v.skipRate}%</td>
                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>{v.completedViews.toLocaleString()}</td>
                    <td>{v.audioOnRate}%</td>
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
