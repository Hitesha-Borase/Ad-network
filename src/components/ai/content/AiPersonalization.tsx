import React, { useState } from 'react';
import { Users, Sparkles, Zap, ChevronRight, Monitor, ShoppingCart, ArrowUpRight } from 'lucide-react';

const audiences = [
  { id: 'new', label: 'First-time Visitor', icon: '👤', tag: 'Awareness Stage' },
  { id: 'returning', label: 'Returning User', icon: '🔄', tag: 'Consideration Stage' },
  { id: 'enterprise', label: 'Enterprise Lead', icon: '🏢', tag: 'Decision Stage' },
  { id: 'churned', label: 'Churned Customer', icon: '💔', tag: 'Reactivation' },
];

const contentMap: Record<string, { headline: string; sub: string; cta: string; badge: string; ctaColor: string }> = {
  new: {
    headline: 'The All-in-One AI Marketing Platform',
    sub: 'Unify your CRM, creative studio, and analytics in one intelligent workspace. No card required.',
    cta: 'Start Free Trial →',
    badge: 'Trusted by 5,000+ teams',
    ctaColor: 'var(--primary)',
  },
  returning: {
    headline: 'Welcome Back! You Left 3 Campaigns Paused.',
    sub: 'Our AI has analyzed your last activity and has 4 optimizations ready to boost your ROAS immediately.',
    cta: 'Resume & Optimize →',
    badge: '⚡ 4 Quick Wins Ready',
    ctaColor: 'var(--warning)',
  },
  enterprise: {
    headline: 'Enterprise-Grade Marketing Infrastructure, Simplified.',
    sub: 'SOC-2 certified, SSO-enabled, and built with dedicated SLA and white-glove onboarding for teams 200+.',
    cta: 'Request Demo →',
    badge: '🏢 Custom Pricing Available',
    ctaColor: 'var(--accent)',
  },
  churned: {
    headline: "A Lot Has Changed Since You Left.",
    sub: "We've launched Predictive Analytics, a new Workflow Builder, and cut our base plan price by 30%. Come see what's new.",
    cta: 'See What\'s New →',
    badge: '🎁 Special Return Offer Inside',
    ctaColor: 'var(--success)',
  },
};

export const AiPersonalization: React.FC = () => {
  const [selectedAudience, setSelectedAudience] = useState('new');
  const content = contentMap[selectedAudience];

  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Panel: Audience Selector */}
      <div className="glass-card responsive-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={20} color="var(--accent)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Audience Selector</h2>
        </div>

        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Select an audience segment to instantly preview how the landing page personalizes itself for that visitor.
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {audiences.map((a) => (
            <div
              key={a.id}
              onClick={() => setSelectedAudience(a.id)}
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: selectedAudience === a.id ? 'rgba(168,85,247,0.08)' : 'transparent',
                borderLeft: selectedAudience === a.id ? '3px solid var(--accent)' : '3px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{a.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>{a.label}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{a.tag}</div>
                </div>
              </div>
              <ChevronRight size={16} color={selectedAudience === a.id ? 'var(--accent)' : 'var(--text-muted)'} />
            </div>
          ))}
        </div>

        <div style={{ padding: '16px' }}>
          <button style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'linear-gradient(45deg, var(--accent), var(--primary))', color: '#fff', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
            <Sparkles size={16} /> Add Audience Rule
          </button>
        </div>
      </div>

      {/* Right Panel: Live Page Preview */}
      <div className="glass-card responsive-content" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Monitor size={16} color="var(--text-muted)" />
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Live Preview — Personalized for: <strong style={{ color: 'var(--text-primary)' }}>{audiences.find(a => a.id === selectedAudience)?.label}</strong></span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          {/* Mock Landing Page Hero */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))',
            padding: '80px 60px',
            textAlign: 'center',
            borderBottom: '1px solid var(--border-color)',
            transition: 'all 0.3s ease',
          }}>
            <div style={{ display: 'inline-block', padding: '6px 18px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', fontSize: '13px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
              <Zap size={13} style={{ display: 'inline', marginRight: '6px' }} />{content.badge}
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.2, marginBottom: '20px', transition: 'all 0.4s ease' }}>
              {content.headline}
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: 1.6, transition: 'all 0.3s ease' }}>
              {content.sub}
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{ padding: '16px 36px', borderRadius: '12px', backgroundColor: content.ctaColor, color: '#fff', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease' }}>
                {content.cta} <ArrowUpRight size={18} />
              </button>
              <button style={{ padding: '16px 36px', borderRadius: '12px', backgroundColor: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Mock Social Proof Bar */}
          <div style={{ padding: '24px 60px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '40px', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.01)', flexWrap: 'wrap' }}>
            {[['5,000+', 'Active Teams'], ['94%', 'Avg ROAS Lift'], ['$2.4B', 'Ad Spend Managed'], ['4.9★', 'G2 Rating']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>{val}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Mock Feature Row */}
          <div style={{ padding: '40px 60px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { icon: <ShoppingCart size={24} />, title: 'AI Creative Studio', desc: 'Generate ads, banners, and landing pages in seconds.' },
              { icon: <Users size={24} />, title: 'CDP Engine', desc: 'Unify customer profiles from 50+ data sources.' },
              { icon: <Sparkles size={24} />, title: 'Predictive Analytics', desc: 'Know which campaigns will win before you go live.' },
            ].map((f) => (
              <div key={f.title} className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>{f.icon}</div>
                <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '15px' }}>{f.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
