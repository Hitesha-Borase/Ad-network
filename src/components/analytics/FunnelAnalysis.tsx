import React, { useState } from 'react';
import { Filter, Users, ArrowDown, ArrowRight, Sparkles, Plus } from 'lucide-react';

type FunnelStep = { name: string; count: number; dropoff: string | null };

const funnels: Record<string, { title: string; subtitle: string; cr: string; steps: FunnelStep[] }> = {
  'b2b': {
    title: 'B2B Enterprise Lead Funnel',
    subtitle: 'Last 30 Days • All Traffic Sources',
    cr: '3.76%',
    steps: [
      { name: 'Website Visitors', count: 125000, dropoff: '45%' },
      { name: 'Product Page Views', count: 68750, dropoff: '62%' },
      { name: 'Add to Cart / Signups', count: 26125, dropoff: '70%' },
      { name: 'Checkout / Demo Booked', count: 7837, dropoff: '40%' },
      { name: 'Completed Purchase / Won', count: 4702, dropoff: null },
    ],
  },
  'ecommerce': {
    title: 'E-commerce Checkout Funnel',
    subtitle: 'Last 30 Days • Paid Traffic',
    cr: '6.12%',
    steps: [
      { name: 'Store Homepage', count: 98000, dropoff: '38%' },
      { name: 'Category / Search Page', count: 60760, dropoff: '52%' },
      { name: 'Product Detail Page', count: 29165, dropoff: '44%' },
      { name: 'Cart', count: 16332, dropoff: '63%' },
      { name: 'Order Confirmed', count: 5998, dropoff: null },
    ],
  },
  'saas': {
    title: 'SaaS Free Trial Funnel',
    subtitle: 'Last 30 Days • Organic + Referral',
    cr: '12.40%',
    steps: [
      { name: 'Landing Page', count: 44000, dropoff: '55%' },
      { name: 'Signup Page', count: 19800, dropoff: '30%' },
      { name: 'Email Verified', count: 13860, dropoff: '25%' },
      { name: 'First Feature Used', count: 10395, dropoff: '48%' },
      { name: 'Converted to Paid', count: 5458, dropoff: null },
    ],
  },
};

const FUNNEL_KEYS = Object.keys(funnels);
const FUNNEL_LABELS: Record<string, string> = {
  'b2b': 'B2B Enterprise Lead Funnel',
  'ecommerce': 'E-commerce Checkout',
  'saas': 'SaaS Free Trial',
};

export const FunnelAnalysis: React.FC = () => {
  const [selectedFunnel, setSelectedFunnel] = useState<string>('b2b');
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState('');

  const funnel = funnels[selectedFunnel];

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {toast && (
        <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--primary)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--primary)' }}>{toast}</div>
      )}

      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)', border: '1px solid rgba(99, 102, 241, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 30px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>Funnel Analysis</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Identify drop-offs and conversion bottlenecks across your customer journey.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select
            value={selectedFunnel}
            onChange={e => setSelectedFunnel(e.target.value)}
            style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '13px', cursor: 'pointer' }}
          >
            {FUNNEL_KEYS.map(k => <option key={k} value={k} style={{ backgroundColor: '#1a1f2e' }}>{FUNNEL_LABELS[k]}</option>)}
          </select>
          <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => showToast('📊 Filters applied')}><Filter size={14}/> Filter</button>
          <button className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setShowCreate(true)}><Plus size={14}/> New Funnel</button>
        </div>
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 4px 0' }}>{funnel.title}</h2>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{funnel.subtitle}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--success)' }}>{funnel.cr}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Overall Conversion Rate</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {funnel.steps.map((step, index) => {
            const widthPercentage = Math.max(20, 100 - (index * 16));
            return (
              <React.Fragment key={step.name}>
                <div style={{ width: `${widthPercentage}%`, minWidth: '300px', backgroundColor: `rgba(99, 102, 241, ${0.08 + (index * 0.16)})`, border: '1px solid var(--primary)', borderRadius: '8px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', position: 'relative', zIndex: 2, transition: 'transform 0.2s', cursor: 'default' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '2px' }}>STEP {index + 1}</div>
                    <div style={{ fontSize: '15px', fontWeight: 600 }}>{step.name}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700 }}>
                    {step.count.toLocaleString()} <Users size={16} color="var(--primary)"/>
                  </div>
                </div>
                {step.dropoff && (
                  <div style={{ height: '60px', width: '2px', backgroundColor: 'var(--border-color)', position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                      <ArrowDown size={12}/> {step.dropoff} Drop-off
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Sparkles size={20}/>
        </div>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0', color: 'var(--success)' }}>AI Bottleneck Alert</h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
            {selectedFunnel === 'b2b' && <>There is a severe <strong>70% drop-off</strong> between "Add to Cart / Signups" and "Checkout". Analysis suggests that mobile users from organic search are abandoning the form due to length.</>}
            {selectedFunnel === 'ecommerce' && <>There is a <strong>63% drop-off</strong> at the Cart stage. Recommend enabling 1-click checkout and showing trust badges near the CTA button.</>}
            {selectedFunnel === 'saas' && <>A <strong>48% drop-off</strong> occurs between "First Feature Used" and "Converted to Paid". Consider triggering an in-app upgrade prompt after 3 uses of the core feature.</>}
          </p>
          <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => showToast('📋 Opening form analytics...')}>View Form Analytics <ArrowRight size={14}/></button>
        </div>
      </div>

      {/* Create Funnel Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 20px 0' }}>Create New Funnel</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>FUNNEL NAME</label>
                <input className="form-control" placeholder="e.g. Mobile App Onboarding"/>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>TRAFFIC SOURCE</label>
                <select className="form-control" style={{ cursor: 'pointer' }}>
                  <option>All Sources</option><option>Organic</option><option>Paid</option><option>Email</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => { setShowCreate(false); showToast('✅ Funnel created!'); }}>Create Funnel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
