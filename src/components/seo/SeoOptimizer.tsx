import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, XCircle } from 'lucide-react';

export const SeoOptimizer: React.FC = () => {
  const [targetKeyword, setTargetKeyword] = useState('cloud accounting software');
  const [pageTitle, setPageTitle] = useState('Best Cloud Accounting Software for Small Business');
  const [content, setContent] = useState(
    'Running a business requires keeping track of your finances. With modern cloud accounting software, you can manage invoices, expenses, and taxes seamlessly from anywhere. Our platform provides automated solutions built for growing enterprises.'
  );

  const [score, setScore] = useState(0);
  const [checks, setChecks] = useState({
    titleKeyword: false,
    contentKeywordCount: 0,
    contentLength: false,
    introKeyword: false,
    headingKeyword: false
  });

  useEffect(() => {
    const titleLower = pageTitle.toLowerCase();
    const contentLower = content.toLowerCase();
    const kwLower = targetKeyword.toLowerCase();

    // Check title contains keyword
    const hasTitleKw = kwLower ? titleLower.includes(kwLower) : false;

    // Check keyword count in content
    const kwRegex = new RegExp(kwLower.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
    const matches = kwLower ? contentLower.match(kwRegex) : null;
    const kwCount = matches ? matches.length : 0;

    // Check content length (minimum 50 words)
    const words = content.trim().split(/\s+/).filter(w => w.length > 0);
    const hasLength = words.length >= 30;

    // Check keyword in first 100 characters of content
    const introSnippet = contentLower.slice(0, 100);
    const hasIntroKw = kwLower ? introSnippet.includes(kwLower) : false;

    // Check heading tag content simulation (assuming first title contains keyword)
    const hasHeadingKw = hasTitleKw;

    setChecks({
      titleKeyword: hasTitleKw,
      contentKeywordCount: kwCount,
      contentLength: hasLength,
      introKeyword: hasIntroKw,
      headingKeyword: hasHeadingKw
    });

    // Calculate score (out of 100)
    let calculatedScore = 10;
    if (hasTitleKw) calculatedScore += 25;
    if (kwCount >= 1 && kwCount <= 5) calculatedScore += 20;
    if (kwCount > 5) calculatedScore += 10; // penalty for keyword stuffing
    if (hasLength) calculatedScore += 20;
    if (hasIntroKw) calculatedScore += 15;
    if (hasHeadingKw) calculatedScore += 10;

    if (!kwLower) calculatedScore = 0;

    setScore(calculatedScore);
  }, [targetKeyword, pageTitle, content]);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Content Optimizer
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Write search-optimized content with real-time scoring, keyword density checks, and compliance checklists.
        </p>
      </div>

      <div className="grid-cols-3" style={{ gridTemplateColumns: '2fr 1fr', alignItems: 'start' }}>
        {/* Editor Inputs */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Target Focus Keyword</label>
            <input
              type="text"
              className="form-control"
              value={targetKeyword}
              onChange={(e) => setTargetKeyword(e.target.value)}
              placeholder="e.g. cloud accounting software"
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Page Title / Tag</label>
            <input
              type="text"
              className="form-control"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="Write a catchy seo title..."
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Content Body Copy</label>
            <textarea
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder="Start writing or paste your copy here..."
              style={{ fontFamily: 'monospace', resize: 'vertical', lineHeight: 1.6 }}
            />
          </div>
        </div>

        {/* Analyzer Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Optimization Score */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '24px 20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', margin: 0 }}>SEO Content Score</h3>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '10px solid var(--border-color)',
              borderTopColor: score > 75 ? 'var(--success)' : score > 45 ? 'var(--warning)' : 'var(--danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              fontWeight: 800,
              color: score > 75 ? 'var(--success)' : score > 45 ? 'var(--warning)' : 'var(--danger)'
            }}>
              {score}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} style={{ color: 'var(--accent)' }} /> Real-time Audit
            </div>
          </div>

          {/* Checklist */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>SEO Content Checklist</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Check 1 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px' }}>
                {checks.titleKeyword ? (
                  <CheckCircle2 size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
                ) : (
                  <XCircle size={16} style={{ color: 'var(--danger)', marginTop: '2px', flexShrink: 0 }} />
                )}
                <span>Keyword in Title Tag</span>
              </div>

              {/* Check 2 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px' }}>
                {checks.introKeyword ? (
                  <CheckCircle2 size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
                ) : (
                  <XCircle size={16} style={{ color: 'var(--danger)', marginTop: '2px', flexShrink: 0 }} />
                )}
                <span>Keyword in First 100 characters</span>
              </div>

              {/* Check 3 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px' }}>
                {checks.contentKeywordCount >= 1 && checks.contentKeywordCount <= 5 ? (
                  <CheckCircle2 size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
                ) : (
                  <XCircle size={16} style={{ color: 'var(--danger)', marginTop: '2px', flexShrink: 0 }} />
                )}
                <span>Keyword density (Found: {checks.contentKeywordCount} times)</span>
              </div>

              {/* Check 4 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px' }}>
                {checks.contentLength ? (
                  <CheckCircle2 size={16} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
                ) : (
                  <XCircle size={16} style={{ color: 'var(--danger)', marginTop: '2px', flexShrink: 0 }} />
                )}
                <span>Word count is sufficient (30+ words)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
