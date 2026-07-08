import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';

export const AiInsights: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
        border: '1px solid rgba(14, 165, 233, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 30px'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={24} color="var(--primary)" /> AI Insights Feed
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Proactive alerts, anomaly detection, and optimization recommendations.
          </p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={16} /> Run Analysis Now
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Urgent Insight */}
        <div className="glass-card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--danger)', textTransform: 'uppercase' }}>High Priority Anomaly</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Detected 2 hours ago</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0' }}>Spike in CPA for "Summer Promo" Campaign</h3>
                <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '800px' }}>
                  The Cost Per Acquisition (CPA) on Google Ads has jumped by 45% in the last 24 hours. The AI has identified that the primary keyword "beach accessories" has encountered aggressive bidding from competitors. 
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-primary btn-sm">Auto-Optimize Bids</button>
                  <button className="btn btn-secondary btn-sm">Pause Campaign</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Positive Insight */}
        <div className="glass-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase' }}>Opportunity Discovered</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Detected yesterday</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0' }}>Untapped Lookalike Audience Segment</h3>
                <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '800px' }}>
                  Users who visited the "Enterprise Features" page but didn't convert have a high overlap with your top LTV customers. Creating a retargeting audience with a "Free Migration" offer has a predicted conversion lift of 18%.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-primary btn-sm">Create Audience & Campaign</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resolved Insight */}
        <div className="glass-card" style={{ opacity: 0.7, borderLeft: '4px solid var(--text-muted)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Resolved Automatically</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>3 days ago</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0', color: 'var(--text-secondary)' }}>Email Deliverability Drop</h3>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: '800px' }}>
                  The AI Agent paused the "Cold Outreach Q3" sequence because bounce rates exceeded 5%. The list has been scrubbed and the sequence was resumed.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
