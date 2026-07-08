import React, { useState } from 'react';
import { Search, Link, Award, Eye } from 'lucide-react';

interface SerpItem {
  rank: number;
  title: string;
  url: string;
  domainRating: number;
  backlinks: number;
  estTraffic: number;
  intent: 'Commercial' | 'Informational' | 'Transactional';
}

const initialSerp: SerpItem[] = [
  { rank: 1, title: 'Best Cloud Accounting Software of 2026 - Forbes Advisor', url: 'https://forbes.com/advisor/business/software/best-cloud-accounting', domainRating: 94, backlinks: 1200, estTraffic: 14500, intent: 'Commercial' },
  { rank: 2, title: 'Top Cloud Accounting software solutions - PCMag', url: 'https://pcmag.com/picks/the-best-accounting-software-for-small-business', domainRating: 91, backlinks: 840, estTraffic: 8200, intent: 'Commercial' },
  { rank: 3, title: 'What is Cloud Accounting? A Complete Guide - QuickBooks', url: 'https://quickbooks.intuit.com/r/accounting-software/cloud-accounting-guide', domainRating: 95, backlinks: 3200, estTraffic: 24000, intent: 'Informational' },
  { rank: 4, title: 'Cloud Accounting Solutions | Xero US', url: 'https://xero.com/us/features-and-tools/accounting-software/cloud', domainRating: 89, backlinks: 410, estTraffic: 5400, intent: 'Transactional' },
  { rank: 5, title: 'Cloud Accounting Software vs Desktop Accounting - Wave', url: 'https://waveapps.com/blog/accounting/cloud-vs-desktop-accounting', domainRating: 86, backlinks: 145, estTraffic: 1200, intent: 'Informational' }
];

export const SeoSerpAnalysis: React.FC = () => {
  const [query, setQuery] = useState('cloud accounting software');
  const [serp] = useState<SerpItem[]>(initialSerp);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          SERP Analysis
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Inspect Google search results layouts for keywords, page authority metrics, and organic click-through limits.
        </p>
      </div>

      {/* Query search */}
      <div className="glass-card" style={{ display: 'flex', gap: '12px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter target query..."
            style={{ paddingLeft: '38px' }}
          />
        </div>
        <button className="btn btn-primary">Fetch SERP</button>
      </div>

      {/* SERP visual list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Google Search Results for: "{query}"</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {serp.map(item => (
            <div key={item.rank} className="glass-card" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              borderLeft: item.rank <= 3 ? '4px solid var(--primary)' : '1px solid var(--border-color)'
            }}>
              {/* Result Title & Link */}
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>#{item.rank}</span>
                  <span>{item.url}</span>
                </div>
                <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--info)', marginTop: '4px', margin: '4px 0 0 0', cursor: 'pointer' }}>
                  {item.title}
                </h4>
              </div>

              {/* SERP SEO Metrics panel */}
              <div style={{
                display: 'flex',
                gap: '24px',
                paddingTop: '8px',
                borderTop: '1px solid rgba(255,255,255,0.03)',
                fontSize: '12px',
                color: 'var(--text-secondary)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={14} style={{ color: 'var(--warning)' }} />
                  <span>Domain Rating: <strong style={{ color: 'var(--text-primary)' }}>{item.domainRating}</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Link size={14} style={{ color: 'var(--success)' }} />
                  <span>Ref Links: <strong style={{ color: 'var(--text-primary)' }}>{item.backlinks}</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Eye size={14} style={{ color: 'var(--primary)' }} />
                  <span>Est Traffic: <strong style={{ color: 'var(--text-primary)' }}>{item.estTraffic.toLocaleString()}/mo</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="badge" style={{
                    backgroundColor: item.intent === 'Transactional' ? 'var(--success-light)' : item.intent === 'Commercial' ? 'var(--warning-light)' : 'var(--info-light)',
                    color: item.intent === 'Transactional' ? 'var(--success)' : item.intent === 'Commercial' ? 'var(--warning)' : 'var(--info)',
                    fontSize: '10px',
                    padding: '2px 8px'
                  }}>
                    {item.intent}
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
