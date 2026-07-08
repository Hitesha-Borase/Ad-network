import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface TechItem {
  id: string;
  checkName: string;
  status: 'passed' | 'warning' | 'failed';
  details: string;
}

const speedMetrics = [
  { id: '1', name: 'Largest Contentful Paint (LCP)', value: '1.8s', status: 'passed', note: 'Good (under 2.5s)' },
  { id: '2', name: 'First Input Delay (FID)', value: '18ms', status: 'passed', note: 'Good (under 100ms)' },
  { id: '3', name: 'Cumulative Layout Shift (CLS)', value: '0.04', status: 'passed', note: 'Good (under 0.1)' },
  { id: '4', name: 'Speed Index', value: '3.4s', status: 'warning', note: 'Needs improvement (under 3.0s)' }
];

const technicalChecks: TechItem[] = [
  { id: '1', checkName: 'SSL Certificate Validator', status: 'passed', details: 'Valid, expires in 280 days.' },
  { id: '2', checkName: 'Sitemap.xml Integration', status: 'passed', details: 'Detected at /sitemap.xml with 184 active nodes.' },
  { id: '3', checkName: 'Robots.txt Schema Compliance', status: 'passed', details: 'Valid config containing user-agent directives.' },
  { id: '4', checkName: 'Schema.org JSON-LD Markup', status: 'warning', details: 'Breadcrumb list schema is correct; product ratings tags are missing.' },
  { id: '5', checkName: 'HTTPS Canonicalization Redirects', status: 'passed', details: 'HTTP traffic auto redirects to HTTPS canonical nodes.' }
];

export const SeoTechnical: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Technical SEO
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Manage technical performance configurations, crawl index files, Core Web Vitals, and schemas.
        </p>
      </div>

      {/* Speedometer Scores */}
      <div className="grid-cols-2">
        {/* Mobile speed */}
        <div className="glass-card" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            border: '8px solid var(--border-color)',
            borderTopColor: 'var(--warning)',
            borderRightColor: 'var(--warning)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--warning)',
            flexShrink: 0
          }}>
            72%
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600 }}>
              <Smartphone size={16} style={{ color: 'var(--primary)' }} /> Mobile Speed Score
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4, margin: '6px 0 0 0' }}>
              Your mobile speed score is acceptable but resource loading paths can be optimized.
            </p>
          </div>
        </div>

        {/* Desktop Speed */}
        <div className="glass-card" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            border: '8px solid var(--border-color)',
            borderTopColor: 'var(--success)',
            borderRightColor: 'var(--success)',
            borderBottomColor: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--success)',
            flexShrink: 0
          }}>
            94%
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600 }}>
              <Monitor size={16} style={{ color: 'var(--success)' }} /> Desktop Speed Score
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4, margin: '6px 0 0 0' }}>
              Excellent desktop speed score, meeting search console standard metrics.
            </p>
          </div>
        </div>
      </div>

      {/* Core Web Vitals Summary */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Core Web Vitals Metrics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {speedMetrics.map(m => (
            <div key={m.id} style={{
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.01)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{m.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '8px' }}>
                <span style={{ fontSize: '22px', fontWeight: 700 }}>{m.value}</span>
                <span className="badge" style={{
                  backgroundColor: m.status === 'passed' ? 'var(--success-light)' : 'var(--warning-light)',
                  color: m.status === 'passed' ? 'var(--success)' : 'var(--warning)',
                  fontSize: '11px'
                }}>
                  {m.status}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{m.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Checks Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Technical Schema & Index Compliance</h3>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Validation Item</th>
                  <th>Status</th>
                  <th>Crawl Details</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {technicalChecks.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600 }}>{item.checkName}</td>
                    <td>
                      <span className="badge" style={{
                        backgroundColor: item.status === 'passed' ? 'var(--success-light)' : 'var(--warning-light)',
                        color: item.status === 'passed' ? 'var(--success)' : 'var(--warning)'
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>{item.details}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary btn-sm">Re-test</button>
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
