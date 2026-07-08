import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, RefreshCw, XCircle } from 'lucide-react';

interface AuditIssue {
  id: string;
  type: 'error' | 'warning' | 'notice';
  title: string;
  category: 'On-Page' | 'Technical' | 'Links' | 'Mobile';
  description: string;
  pagesAffected: number;
}

const initialIssues: AuditIssue[] = [
  { id: '1', type: 'error', title: '404 pages not redirected', category: 'Links', description: 'Internal pages linking to deleted URLs returning 4xx errors.', pagesAffected: 4 },
  { id: '2', type: 'warning', title: 'Meta descriptions too long', category: 'On-Page', description: 'Descriptions that exceed 160 characters might be truncated by search engines.', pagesAffected: 28 },
  { id: '3', type: 'notice', title: 'H1 tags missing on landing pages', category: 'On-Page', description: 'Missing structural heading tag indicates low formatting focus.', pagesAffected: 12 },
  { id: '4', type: 'error', title: 'Images missing alt attributes', category: 'Technical', description: 'Images are missing descriptive alt-text required for visual accessibility and rank.', pagesAffected: 145 },
  { id: '5', type: 'warning', title: 'Page speed is slow on mobile', category: 'Technical', description: 'Core Web Vitals LCP performance is lower than 2.5s.', pagesAffected: 8 }
];

export const SeoAudit: React.FC = () => {
  const [issues] = useState<AuditIssue[]>(initialIssues);
  const [filterType, setFilterType] = useState<string>('all');
  const [isCrawling, setIsCrawling] = useState(false);

  const triggerCrawl = () => {
    setIsCrawling(true);
    setTimeout(() => {
      setIsCrawling(false);
    }, 2000);
  };

  const filteredIssues = issues.filter(i =>
    filterType === 'all' || i.type === filterType
  );

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
      }}>
        <div>
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
            Site Audit
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Audit your site structures, resolve crawl errors, and optimize HTML tag compliance metrics.
          </p>
        </div>
        <button className="btn btn-primary" onClick={triggerCrawl} disabled={isCrawling}>
          <RefreshCw size={16} className={isCrawling ? 'spin' : ''} /> {isCrawling ? 'Crawling...' : 'Trigger Audit'}
        </button>
      </div>

      {/* Audit Stats Grid */}
      <div className="grid-cols-4">
        {/* Audit Score card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '8px solid var(--border-color)',
            borderTopColor: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--success)'
          }}>
            88%
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Crawl Health Score</span>
        </div>

        {/* Errors card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} onClick={() => setFilterType('error')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--danger)' }}>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Errors</span>
            <XCircle size={18} />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>149</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Require immediate fixes</span>
        </div>

        {/* Warnings card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} onClick={() => setFilterType('warning')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--warning)' }}>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Warnings</span>
            <AlertCircle size={18} />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>36</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Improve page ranking</span>
        </div>

        {/* Notices card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} onClick={() => setFilterType('notice')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--info)' }}>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Notices</span>
            <CheckCircle2 size={18} />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>12</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Formatting hints</span>
        </div>
      </div>

      {/* Issues List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Audit Recommendation Checklist</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className={`btn btn-secondary btn-sm ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>All Issues</button>
            <button className={`btn btn-secondary btn-sm ${filterType === 'error' ? 'active' : ''}`} onClick={() => setFilterType('error')} style={{ color: 'var(--danger)' }}>Errors Only</button>
            <button className={`btn btn-secondary btn-sm ${filterType === 'warning' ? 'active' : ''}`} onClick={() => setFilterType('warning')} style={{ color: 'var(--warning)' }}>Warnings Only</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredIssues.map(issue => (
            <div key={issue.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '50%',
                  backgroundColor:
                    issue.type === 'error' ? 'var(--danger-light)' :
                    issue.type === 'warning' ? 'var(--warning-light)' : 'var(--info-light)',
                  color:
                    issue.type === 'error' ? 'var(--danger)' :
                    issue.type === 'warning' ? 'var(--warning)' : 'var(--info)'
                }}>
                  {issue.type === 'error' && <XCircle size={18} />}
                  {issue.type === 'warning' && <AlertCircle size={18} />}
                  {issue.type === 'notice' && <CheckCircle2 size={18} />}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>{issue.title}</h4>
                    <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', fontSize: '11px' }}>
                      {issue.category}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', margin: '4px 0 0 0' }}>{issue.description}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {issue.pagesAffected} pages affected
                </span>
                <button className="btn btn-secondary btn-sm" style={{ padding: '6px' }}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
