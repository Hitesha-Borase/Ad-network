import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { 
  CheckCircle, AlertCircle, X, Download, Plus, Settings, DollarSign, 
  CreditCard, Percent, FileText, Check, FileSpreadsheet, History, 
  UserPlus, RefreshCw, AlertTriangle, Activity, ShieldCheck, Tag
} from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 55000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 70000 },
  { month: 'May', revenue: 85000 },
  { month: 'Jun', revenue: 110000 }
];

const card: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border-color)',
  borderRadius: '12px',
  padding: '20px',
};

const statCard: React.CSSProperties = {
  ...card,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const statusBadge = (color: string) => ({
  background: `${color}18`,
  color,
  padding: '3px 10px',
  borderRadius: '9999px',
  fontSize: '11px',
  fontWeight: 600,
} as React.CSSProperties);

const tableHead: React.CSSProperties = {
  padding: '10px 12px',
  color: 'var(--text-muted)',
  fontWeight: 600,
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  borderBottom: '1px solid var(--border-color)',
};

const tableCell: React.CSSProperties = {
  padding: '11px 12px',
  color: 'var(--text-secondary)',
  borderBottom: '1px solid var(--border-color)',
};

/* ----------------------------------------------------
   REUSABLE UI COMPONENTS
   ---------------------------------------------------- */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px',
    }}>
      <div style={{
        background: '#0d1117',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '520px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh',
        boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.8)',
        animation: 'fadeIn 0.2s ease-out',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#f3f4f6', letterSpacing: '-0.01em' }}>{title}</h3>
          <button 
            onClick={onClose} 
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>
        {/* Content */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const formGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  width: '100%',
};

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  color: '#9ca3af',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  backgroundColor: '#161b22',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  color: '#f3f4f6',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%239ca3af' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: '36px',
};

const switchContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 14px',
  backgroundColor: '#161b22',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
};

const btnPrimaryStyle: React.CSSProperties = {
  backgroundColor: '#6366f1',
  color: '#ffffff',
  border: 'none',
  padding: '11px 22px',
  borderRadius: '8px',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: '14px',
  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
  transition: 'background-color 0.2s',
};

const btnSecondaryStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: '#e5e7eb',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  padding: '11px 22px',
  borderRadius: '8px',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.2s',
};

/* ----------------------------------------------------
   1. BILLING DASHBOARD
   ---------------------------------------------------- */
export const BillingDashboard: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [settings, setSettings] = useState({
    currency: 'USD ($)',
    gracePeriod: '7',
    billingEmail: 'finance@apex-tech.com',
    autoChargeThreshold: '500',
  });

  useEffect(() => {
    const openSettings = () => setIsSettingsOpen(true);
    const openReports = () => setIsReportsOpen(true);
    window.addEventListener('bill-open-settings', openSettings);
    window.addEventListener('bill-view-financial-reports', openReports);
    return () => {
      window.removeEventListener('bill-open-settings', openSettings);
      window.removeEventListener('bill-view-financial-reports', openReports);
    };
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Settings saved! Base Currency: ${settings.currency}, Grace: ${settings.gracePeriod} days` }));
    setIsSettingsOpen(false);
  };

  const stats = [
    { label: 'Monthly Recurring Revenue (MRR)', val: '$85,420', sub: '+12.4% vs last month', color: '#10b981' },
    { label: 'Annual Recurring Revenue (ARR)', val: '$1,025,040', sub: 'Target: $1.2M', color: '#6366f1' },
    { label: 'Active Subscribers', val: '1,424', sub: '+8.2% growth', color: '#a855f7' },
    { label: 'Churn Rate', val: '1.2%', sub: 'Healthy target: < 2.0%', color: '#f59e0b' },
  ];
  const plans = [
    { plan: 'Enterprise Custom', share: 45, count: '280 subs', color: '#6366f1' },
    { plan: 'Pro Growth Scale', share: 35, count: '640 subs', color: '#a855f7' },
    { plan: 'Starter Core Pack', share: 20, count: '504 subs', color: '#10b981' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Dynamic Grid Layout for Responsive Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={statCard}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</span>
            <div style={{ fontSize: '26px', fontWeight: 800, color: stat.color }}>{stat.val}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Monthly Revenue Growth</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Revenue stream generated across all plans</p>
            </div>
            <div style={{ width: '100%', height: '220px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                  <YAxis stroke="#6b7280" fontSize={11} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Revenue']} contentStyle={{ backgroundColor: '#0f131a', borderColor: 'rgba(255,255,255,0.1)', color: '#f3f4f6', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#revGrad)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Subscription Split</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center', flex: 1 }}>
              {plans.map((p, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{p.plan}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{p.share}% ({p.count})</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${p.share}%`, height: '100%', backgroundColor: p.color, borderRadius: '3px', transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BILLING SETTINGS MODAL */}
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="General Billing Settings">
        <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Preferred Currency</label>
            <select 
              value={settings.currency} 
              onChange={(e) => setSettings({...settings, currency: e.target.value})} 
              style={selectStyle}
            >
              <option value="USD ($)">USD - US Dollar ($)</option>
              <option value="EUR (€)">EUR - Euro (€)</option>
              <option value="INR (₹)">INR - Indian Rupee (₹)</option>
              <option value="GBP (£)">GBP - British Pound (£)</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Payment Grace Period (Days)</label>
            <input 
              type="number" 
              required
              min="1"
              max="30"
              value={settings.gracePeriod} 
              onChange={(e) => setSettings({...settings, gracePeriod: e.target.value})} 
              style={inputStyle}
            />
            <span style={{ fontSize: '11px', color: '#6b7280' }}>Number of days client is allowed to pay overdue invoice before service suspension.</span>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Billing Contact Email</label>
            <input 
              type="email" 
              required
              value={settings.billingEmail} 
              onChange={(e) => setSettings({...settings, billingEmail: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Auto-Charge Threshold Limit ($)</label>
            <input 
              type="number" 
              required
              min="100"
              value={settings.autoChargeThreshold} 
              onChange={(e) => setSettings({...settings, autoChargeThreshold: e.target.value})} 
              style={inputStyle}
            />
            <span style={{ fontSize: '11px', color: '#6b7280' }}>Maximum threshold balance before triggering automatic card sweep.</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsSettingsOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Save Settings</button>
          </div>
        </form>
      </Modal>

      {/* FINANCIAL REPORTS ANALYTICS MODAL */}
      <Modal isOpen={isReportsOpen} onClose={() => setIsReportsOpen(false)} title="Financial Performance Analysis">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#f3f4f6', fontWeight: 600 }}>Billing Revenue Metrics</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: '#161b22', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>AVERAGE REVENUE PER USER (ARPU)</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#6366f1', marginTop: '4px' }}>$60.25</div>
              </div>
              <div style={{ background: '#161b22', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>CUSTOMER LIFETIME VALUE (LTV)</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#10b981', marginTop: '4px' }}>$5,020</div>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#f3f4f6', fontWeight: 600 }}>Revenue Split by Tier</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                <thead>
                  <tr>
                    <th style={{ ...tableHead, padding: '6px' }}>Plan Name</th>
                    <th style={{ ...tableHead, padding: '6px' }}>Subscribers</th>
                    <th style={{ ...tableHead, padding: '6px' }}>Share</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ ...tableCell, padding: '8px 6px' }}>Enterprise Custom</td>
                    <td style={{ ...tableCell, padding: '8px 6px' }}>280</td>
                    <td style={{ ...tableCell, padding: '8px 6px', fontWeight: 700, color: '#6366f1' }}>$38,439 (45%)</td>
                  </tr>
                  <tr>
                    <td style={{ ...tableCell, padding: '8px 6px' }}>Pro Growth Scale</td>
                    <td style={{ ...tableCell, padding: '8px 6px' }}>640</td>
                    <td style={{ ...tableCell, padding: '8px 6px', fontWeight: 700, color: '#a855f7' }}>$29,897 (35%)</td>
                  </tr>
                  <tr>
                    <td style={{ ...tableCell, padding: '8px 6px' }}>Starter Core Pack</td>
                    <td style={{ ...tableCell, padding: '8px 6px' }}>504</td>
                    <td style={{ ...tableCell, padding: '8px 6px', fontWeight: 700, color: '#10b981' }}>$17,084 (20%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#f3f4f6', fontWeight: 600 }}>Forecasted Cashflows</h4>
            <div style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.5, background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', padding: '12px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>July 2026 Projection:</span>
                <strong style={{ color: '#fff' }}>$92,450</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>August 2026 Projection:</span>
                <strong style={{ color: '#fff' }}>$98,120</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>September 2026 Projection:</span>
                <strong style={{ color: '#fff' }}>$104,800</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button onClick={() => setIsReportsOpen(false)} style={btnPrimaryStyle}>Close Report</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   2. BILLING PLANS
   ---------------------------------------------------- */
export const BillingPlans: React.FC = () => {
  const [plansList, setPlansList] = useState([
    { name: 'Starter Core Pack', price: '$29 / mo', desc: 'Best for startups and growing teams.', accent: '#10b981', features: ['Up to 5 operator slots', '10,000 WhatsApp messages', 'Basic Email campaign automations'] },
    { name: 'Pro Growth Scale', price: '$99 / mo', desc: 'Enhanced resources for mid-size business operations.', accent: '#6366f1', features: ['Up to 15 operator slots', '50,000 WhatsApp messages', 'AI Chatbot deflection agent', 'Custom SMTP integration'] },
    { name: 'Enterprise Custom', price: '$499 / mo', desc: 'High scale resources for modern organizations.', accent: '#a855f7', features: ['Unlimited operator slots', 'Uncapped WhatsApp broadcasts', 'Identity Graph integration', 'Dedicated SLA support'] },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    desc: '',
    accent: '#6366f1',
    featuresText: '',
  });

  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [editFeaturesText, setEditFeaturesText] = useState('');

  useEffect(() => {
    const handleCreate = () => setIsCreateOpen(true);
    const handleEdit = () => {
      setSelectedPlanIndex(0);
      setEditFeaturesText(plansList[0].features.join('\n'));
      setIsEditOpen(true);
    };

    window.addEventListener('bill-create-pricing-plan', handleCreate);
    window.addEventListener('bill-edit-features', handleEdit);

    return () => {
      window.removeEventListener('bill-create-pricing-plan', handleCreate);
      window.removeEventListener('bill-edit-features', handleEdit);
    };
  }, [plansList]);

  const handleSelectPlanChange = (index: number) => {
    setSelectedPlanIndex(index);
    setEditFeaturesText(plansList[index].features.join('\n'));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const splitFeats = newPlan.featuresText.split('\n').map(f => f.trim()).filter(Boolean);
    const plan = {
      name: newPlan.name,
      price: newPlan.price.includes('/') ? newPlan.price : `$${newPlan.price} / mo`,
      desc: newPlan.desc,
      accent: newPlan.accent,
      features: splitFeats.length > 0 ? splitFeats : ['Access to base settings'],
    };
    setPlansList([...plansList, plan]);
    setIsCreateOpen(false);
    setNewPlan({ name: '', price: '', desc: '', accent: '#6366f1', featuresText: '' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Pricing Plan "${plan.name}" created successfully!` }));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const splitFeats = editFeaturesText.split('\n').map(f => f.trim()).filter(Boolean);
    const updated = [...plansList];
    updated[selectedPlanIndex].features = splitFeats;
    setPlansList(updated);
    setIsEditOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Features updated for ${plansList[selectedPlanIndex].name}!` }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {plansList.map((plan, i) => (
          <div key={i} style={{ ...card, display: 'flex', flexDirection: 'column', gap: '16px', borderColor: i === 1 ? 'rgba(99,102,241,0.4)' : 'var(--border-color)', position: 'relative' }}>
            {i === 1 && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#6366f1', color: '#fff', padding: '3px 14px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700 }}>Most Popular</div>}
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{plan.name}</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px', marginBottom: 0 }}>{plan.desc}</p>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: plan.accent }}>{plan.price}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', flex: 1 }}>
              {plan.features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={14} style={{ color: plan.accent, flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <button onClick={() => {
              setSelectedPlanIndex(i);
              setEditFeaturesText(plan.features.join('\n'));
              setIsEditOpen(true);
            }} style={{ backgroundColor: i === 1 ? '#6366f1' : 'rgba(255,255,255,0.05)', border: `1px solid ${i === 1 ? '#6366f1' : 'var(--border-color)'}`, color: '#ffffff', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              Modify Features
            </button>
          </div>
        ))}
      </div>

      {/* CREATE PRICING PLAN MODAL */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Pricing Plan">
        <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Plan Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Agency Pro Hub"
              value={newPlan.name} 
              onChange={(e) => setNewPlan({...newPlan, name: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Pricing Rate (e.g. $199 / mo)</label>
            <input 
              type="text" 
              required
              placeholder="e.g. $199 / mo or $1,999 / yr"
              value={newPlan.price} 
              onChange={(e) => setNewPlan({...newPlan, price: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Description</label>
            <input 
              type="text" 
              required
              placeholder="Brief summary of the tier audience"
              value={newPlan.desc} 
              onChange={(e) => setNewPlan({...newPlan, desc: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Theme Color Accent</label>
            <select 
              value={newPlan.accent} 
              onChange={(e) => setNewPlan({...newPlan, accent: e.target.value})} 
              style={selectStyle}
            >
              <option value="#6366f1">Indigo (#6366f1)</option>
              <option value="#10b981">Emerald (#10b981)</option>
              <option value="#a855f7">Purple (#a855f7)</option>
              <option value="#f59e0b">Amber (#f59e0b)</option>
              <option value="#ef4444">Rose (#ef4444)</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Plan Features (One per line)</label>
            <textarea 
              rows={4}
              required
              placeholder="Up to 25 operator slots&#10;100k WhatsApp broadcasts&#10;Dedicated account manager"
              value={newPlan.featuresText} 
              onChange={(e) => setNewPlan({...newPlan, featuresText: e.target.value})} 
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsCreateOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Create Pricing Plan</button>
          </div>
        </form>
      </Modal>

      {/* EDIT FEATURES MODAL */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Plan Features">
        <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Select Plan to Edit</label>
            <select 
              value={selectedPlanIndex} 
              onChange={(e) => handleSelectPlanChange(Number(e.target.value))} 
              style={selectStyle}
            >
              {plansList.map((plan, idx) => (
                <option key={idx} value={idx}>{plan.name}</option>
              ))}
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Features List (One per line)</label>
            <textarea 
              rows={6}
              required
              value={editFeaturesText} 
              onChange={(e) => setEditFeaturesText(e.target.value)} 
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsEditOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Save Features</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   3. BILLING SUBSCRIPTIONS
   ---------------------------------------------------- */
export const BillingSubscriptions: React.FC = () => {
  const [subs, setSubs] = useState([
    { customer: 'Apex Technologies', plan: 'Enterprise Custom', cycle: 'Annual', renewal: '2027-06-15', autoRenew: true },
    { customer: 'CloudSystem Inc', plan: 'Pro Growth Scale', cycle: 'Monthly', renewal: '2026-08-04', autoRenew: true },
    { customer: 'DevOps Studio', plan: 'Starter Core Pack', cycle: 'Monthly', renewal: '2026-07-20', autoRenew: false },
    { customer: 'TechFlow Ltd', plan: 'Pro Growth Scale', cycle: 'Annual', renewal: '2027-03-01', autoRenew: true },
  ]);

  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [newSub, setNewSub] = useState({
    customer: '',
    plan: 'Pro Growth Scale',
    cycle: 'Monthly',
    renewal: '',
    autoRenew: true,
  });

  useEffect(() => {
    const handleNew = () => setIsNewOpen(true);
    const handleExport = () => setIsExportOpen(true);

    window.addEventListener('bill-new-subscription', handleNew);
    window.addEventListener('bill-export-csv', handleExport);

    return () => {
      window.removeEventListener('bill-new-subscription', handleNew);
      window.removeEventListener('bill-export-csv', handleExport);
    };
  }, []);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = {
      customer: newSub.customer,
      plan: newSub.plan,
      cycle: newSub.cycle,
      renewal: newSub.renewal || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      autoRenew: newSub.autoRenew,
    };
    setSubs([sub, ...subs]);
    setIsNewOpen(false);
    setNewSub({ customer: '', plan: 'Pro Growth Scale', cycle: 'Monthly', renewal: '', autoRenew: true });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Subscription for ${sub.customer} created!` }));
  };

  const generateCSVContent = () => {
    const headers = 'Customer,Current Plan,Billing Cycle,Next Renewal,Auto Renew\n';
    const rows = subs.map(s => `"${s.customer}","${s.plan}","${s.cycle}","${s.renewal}","${s.autoRenew ? 'Enabled' : 'Disabled'}"`).join('\n');
    return headers + rows;
  };

  const handleDownloadCSV = () => {
    const csvContent = generateCSVContent();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `subscriptions_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'CSV downloaded successfully!' }));
  };

  const stats = [
    { label: 'Active Subscriptions', val: subs.length.toString(), sub: '+12.4% vs last month', color: '#6366f1' },
    { label: 'Pending Cancellations', val: '18', sub: 'Scheduled: End of Period', color: '#f59e0b' },
    { label: 'Failed Renewals', val: '3', sub: 'Dunning emails triggered', color: '#ef4444' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {stats.map((s, i) => (
          <div key={i} style={statCard}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</span>
            <div style={{ fontSize: '28px', fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Subscribers Database</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setIsExportOpen(true)} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Export CSV</button>
            <button onClick={() => setIsNewOpen(true)} style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>+ New Subscription</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead><tr>{['Customer', 'Current Plan', 'Billing Cycle', 'Next Renewal', 'Auto Renew'].map(h => <th key={h} style={tableHead}>{h}</th>)}</tr></thead>
            <tbody>
              {subs.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ ...tableCell, color: '#818cf8', fontWeight: 700 }}>{row.customer}</td>
                  <td style={tableCell}>{row.plan}</td>
                  <td style={tableCell}>{row.cycle}</td>
                  <td style={tableCell}>{row.renewal}</td>
                  <td style={tableCell}><span style={statusBadge(row.autoRenew ? '#10b981' : '#6b7280')}>{row.autoRenew ? 'Enabled' : 'Disabled'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW SUBSCRIPTION MODAL */}
      <Modal isOpen={isNewOpen} onClose={() => setIsNewOpen(false)} title="Add New Customer Subscription">
        <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Customer Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Acme Corporation"
              value={newSub.customer} 
              onChange={(e) => setNewSub({...newSub, customer: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Assign Tier Plan</label>
            <select 
              value={newSub.plan} 
              onChange={(e) => setNewSub({...newSub, plan: e.target.value})} 
              style={selectStyle}
            >
              <option value="Starter Core Pack">Starter Core Pack ($29/mo)</option>
              <option value="Pro Growth Scale">Pro Growth Scale ($99/mo)</option>
              <option value="Enterprise Custom">Enterprise Custom ($499/mo)</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Billing Cycle</label>
            <select 
              value={newSub.cycle} 
              onChange={(e) => setNewSub({...newSub, cycle: e.target.value})} 
              style={selectStyle}
            >
              <option value="Monthly">Monthly</option>
              <option value="Annual">Annual (20% Discount)</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Renewal Date</label>
            <input 
              type="date" 
              value={newSub.renewal} 
              onChange={(e) => setNewSub({...newSub, renewal: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={switchContainerStyle}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#f3f4f6' }}>Enable Automatic Renewal</span>
            <input 
              type="checkbox" 
              checked={newSub.autoRenew} 
              onChange={(e) => setNewSub({...newSub, autoRenew: e.target.checked})} 
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsNewOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Create Subscription</button>
          </div>
        </form>
      </Modal>

      {/* EXPORT CSV MODAL */}
      <Modal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} title="Export Subscription Database CSV">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Review the subscription log data structure below prior to generating the raw CSV download link.</p>
          
          <pre style={{
            margin: 0,
            padding: '12px',
            backgroundColor: '#161b22',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            color: '#818cf8',
            fontFamily: 'monospace',
            fontSize: '12px',
            overflowX: 'auto',
            maxHeight: '180px',
            whiteSpace: 'pre',
          }}>
            {generateCSVContent()}
          </pre>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button onClick={() => setIsExportOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button onClick={handleDownloadCSV} style={btnPrimaryStyle}>
              <Download size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Download CSV File
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   4. BILLING INVOICES
   ---------------------------------------------------- */
export const BillingInvoices: React.FC = () => {
  const [invoices, setInvoices] = useState([
    { id: 'INV-4409', recipient: 'Apex Technologies', amount: '$499.00', date: '2026-06-15', status: 'Paid', statusColor: '#10b981' },
    { id: 'INV-4408', recipient: 'CloudSystem Inc', amount: '$99.00', date: '2026-06-04', status: 'Paid', statusColor: '#10b981' },
    { id: 'INV-4407', recipient: 'DevOps Studio', amount: '$29.00', date: '2026-06-01', status: 'Paid', statusColor: '#10b981' },
    { id: 'INV-4406', recipient: 'TechFlow Ltd', amount: '$99.00', date: '2026-05-15', status: 'Overdue', statusColor: '#ef4444' },
  ]);

  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [isBatchOpen, setIsBatchOpen] = useState(false);

  const [newInvoice, setNewInvoice] = useState({
    id: '',
    recipient: '',
    amount: '',
    date: '',
    status: 'Paid',
  });

  const [batchSettings, setBatchSettings] = useState({
    dateFrom: '',
    dateTo: '',
    status: 'All',
    format: 'CSV',
  });

  useEffect(() => {
    const handleGenerate = () => {
      const nextId = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
      setNewInvoice(prev => ({
        ...prev,
        id: nextId,
        date: new Date().toISOString().split('T')[0]
      }));
      setIsGenerateOpen(true);
    };

    const handleBatch = () => setIsBatchOpen(true);

    window.addEventListener('bill-generate-invoice', handleGenerate);
    window.addEventListener('bill-batch-export', handleBatch);

    return () => {
      window.removeEventListener('bill-generate-invoice', handleGenerate);
      window.removeEventListener('bill-batch-export', handleBatch);
    };
  }, []);

  const handleGenerateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inv = {
      id: newInvoice.id || `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      recipient: newInvoice.recipient,
      amount: newInvoice.amount.startsWith('$') ? newInvoice.amount : `$${newInvoice.amount}`,
      date: newInvoice.date,
      status: newInvoice.status,
      statusColor: newInvoice.status === 'Paid' ? '#10b981' : newInvoice.status === 'Overdue' ? '#ef4444' : '#f59e0b',
    };
    setInvoices([inv, ...invoices]);
    setIsGenerateOpen(false);
    setNewInvoice({ id: '', recipient: '', amount: '', date: '', status: 'Paid' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Invoice ${inv.id} generated successfully!` }));
  };

  const handleBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filtered = invoices.filter(inv => {
      if (batchSettings.status !== 'All' && inv.status !== batchSettings.status) return false;
      if (batchSettings.dateFrom && inv.date < batchSettings.dateFrom) return false;
      if (batchSettings.dateTo && inv.date > batchSettings.dateTo) return false;
      return true;
    });

    let content = '';
    if (batchSettings.format === 'CSV') {
      content = 'Invoice ID,Recipient,Amount,Issued Date,Status\n' +
        filtered.map(i => `"${i.id}","${i.recipient}","${i.amount}","${i.date}","${i.status}"`).join('\n');
    } else {
      content = JSON.stringify(filtered, null, 2);
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoice_batch_export_${Date.now()}.${batchSettings.format.toLowerCase()}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsBatchOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Batch exported ${filtered.length} invoice(s) in ${batchSettings.format}!` }));
  };

  const stats = [
    { label: 'Total Invoiced This Month', val: '$85,420', sub: '98% paid', color: '#10b981' },
    { label: 'Unpaid Invoices', val: `$${invoices.filter(i => i.status === 'Overdue').reduce((acc, curr) => acc + parseFloat(curr.amount.replace('$', '')), 0).toLocaleString()}`, sub: `${invoices.filter(i => i.status === 'Overdue').length} client(s) in dunning state`, color: '#ef4444' },
    { label: 'Refunded Invoices', val: '$240', sub: 'Last 30 days', color: '#f59e0b' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {stats.map((s, i) => (<div key={i} style={statCard}><span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</span><div style={{ fontSize: '28px', fontWeight: 800, color: s.color }}>{s.val}</div><div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.sub}</div></div>))}
      </div>
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Invoice Log</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setIsBatchOpen(true)} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Batch Export</button>
            <button onClick={() => {
              const nextId = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
              setNewInvoice(prev => ({
                ...prev,
                id: nextId,
                date: new Date().toISOString().split('T')[0]
              }));
              setIsGenerateOpen(true);
            }} style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>+ Generate Invoice</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead><tr>{['Invoice ID', 'Recipient', 'Amount', 'Issued Date', 'Status'].map(h => <th key={h} style={tableHead}>{h}</th>)}</tr></thead>
            <tbody>
              {invoices.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ ...tableCell, color: '#818cf8', fontWeight: 700, fontFamily: 'monospace' }}>{row.id}</td>
                  <td style={tableCell}>{row.recipient}</td>
                  <td style={{ ...tableCell, color: 'var(--text-primary)', fontWeight: 600 }}>{row.amount}</td>
                  <td style={tableCell}>{row.date}</td>
                  <td style={tableCell}><span style={statusBadge(row.statusColor)}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GENERATE INVOICE MODAL */}
      <Modal isOpen={isGenerateOpen} onClose={() => setIsGenerateOpen(false)} title="Generate Custom Invoice">
        <form onSubmit={handleGenerateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Invoice ID</label>
            <input 
              type="text" 
              required
              placeholder="e.g. INV-4410"
              value={newInvoice.id} 
              onChange={(e) => setNewInvoice({...newInvoice, id: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Recipient Client</label>
            <input 
              type="text" 
              required
              placeholder="e.g. DevOps Studio"
              value={newInvoice.recipient} 
              onChange={(e) => setNewInvoice({...newInvoice, recipient: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Invoice Amount ($)</label>
            <input 
              type="number" 
              step="0.01"
              required
              placeholder="e.g. 99.00"
              value={newInvoice.amount} 
              onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Issued Date</label>
            <input 
              type="date" 
              required
              value={newInvoice.date} 
              onChange={(e) => setNewInvoice({...newInvoice, date: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Initial Invoice Status</label>
            <select 
              value={newInvoice.status} 
              onChange={(e) => setNewInvoice({...newInvoice, status: e.target.value})} 
              style={selectStyle}
            >
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsGenerateOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Generate Invoice</button>
          </div>
        </form>
      </Modal>

      {/* BATCH EXPORT MODAL */}
      <Modal isOpen={isBatchOpen} onClose={() => setIsBatchOpen(false)} title="Batch Export Invoices Log">
        <form onSubmit={handleBatchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Date From</label>
              <input 
                type="date" 
                value={batchSettings.dateFrom} 
                onChange={(e) => setBatchSettings({...batchSettings, dateFrom: e.target.value})} 
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Date To</label>
              <input 
                type="date" 
                value={batchSettings.dateTo} 
                onChange={(e) => setBatchSettings({...batchSettings, dateTo: e.target.value})} 
                style={inputStyle}
              />
            </div>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Filter Status</label>
            <select 
              value={batchSettings.status} 
              onChange={(e) => setBatchSettings({...batchSettings, status: e.target.value})} 
              style={selectStyle}
            >
              <option value="All">All Invoices</option>
              <option value="Paid">Paid Only</option>
              <option value="Overdue">Overdue Only</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Export File Format</label>
            <select 
              value={batchSettings.format} 
              onChange={(e) => setBatchSettings({...batchSettings, format: e.target.value})} 
              style={selectStyle}
            >
              <option value="CSV">Comma Separated Values (.csv)</option>
              <option value="JSON">Structured JSON Object (.json)</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsBatchOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>
              <Download size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Export Batch
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   5. BILLING PAYMENTS
   ---------------------------------------------------- */
export const BillingPayments: React.FC = () => {
  const [gateways, setGateways] = useState([
    { provider: 'Stripe API', name: 'Primary Credit Card Gateway', mode: 'Live', status: 'Active', color: '#10b981' },
    { provider: 'PayPal SDK', name: 'Secondary Checkout Option', mode: 'Live', status: 'Active', color: '#10b981' },
  ]);

  const [isRetryOpen, setIsRetryOpen] = useState(false);
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);

  const [retryPolicy, setRetryPolicy] = useState({
    maxAttempts: '3',
    intervalDays: '3',
    failureAction: 'dunning-alert',
  });

  const [newGateway, setNewGateway] = useState({
    provider: 'Stripe API',
    name: '',
    mode: 'Sandbox',
    publicKey: '',
    secretKey: '',
  });

  useEffect(() => {
    const handleRetry = () => setIsRetryOpen(true);
    const handleGateway = () => setIsGatewayOpen(true);

    window.addEventListener('bill-configure-retries', handleRetry);
    window.addEventListener('bill-add-payment-gateway', handleGateway);

    return () => {
      window.removeEventListener('bill-configure-retries', handleRetry);
      window.removeEventListener('bill-add-payment-gateway', handleGateway);
    };
  }, []);

  const handleRetrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRetryOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Retry policy saved: retry up to ${retryPolicy.maxAttempts} times every ${retryPolicy.intervalDays} days.` }));
  };

  const handleGatewaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gw = {
      provider: newGateway.provider,
      name: newGateway.name || `${newGateway.provider} Connection`,
      mode: newGateway.mode,
      status: 'Active',
      color: '#10b981',
    };
    setGateways([...gateways, gw]);
    setIsGatewayOpen(false);
    setNewGateway({ provider: 'Stripe API', name: '', mode: 'Sandbox', publicKey: '', secretKey: '' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Connected payment gateway "${gw.name}" successfully!` }));
  };

  const stats = [
    { label: 'Gateway Success Rate', val: '99.8%', sub: `Smart Retries: Max ${retryPolicy.maxAttempts} attempts`, color: '#10b981' },
    { label: 'Total Payment Attempts', val: '1,890', sub: 'Last 30 days log', color: '#6366f1' },
    { label: 'Failed Attempts', val: '4', sub: `Trigger action: ${retryPolicy.failureAction}`, color: '#ef4444' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {stats.map((s, i) => (<div key={i} style={statCard}><span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</span><div style={{ fontSize: '28px', fontWeight: 800, color: s.color }}>{s.val}</div><div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.sub}</div></div>))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Connected Gateways */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Connected Gateways</h4>
            <button onClick={() => setIsGatewayOpen(true)} style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>+ Add Gateway</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {gateways.map((gw, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#161b22', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#f3f4f6' }}>{gw.name}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{gw.provider} • <span style={{ color: gw.mode === 'Live' ? '#10b981' : '#f59e0b', fontWeight: 600 }}>{gw.mode}</span></div>
                </div>
                <span style={statusBadge(gw.color)}>{gw.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Requests */}
        <div style={card}>
          <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: '0 0 16px 0', fontWeight: 700 }}>Refund Requests</h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead><tr>{['Refund ID', 'Customer', 'Amount', 'Status'].map(h => <th key={h} style={tableHead}>{h}</th>)}</tr></thead>
              <tbody>
                {[
                  { id: 'REF-0104', cust: 'DevOps Studio', amount: '$58.00', status: 'Approved', color: '#10b981' },
                  { id: 'REF-0103', cust: 'TechFlow Ltd', amount: '$99.00', status: 'Pending', color: '#f59e0b' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ ...tableCell, color: '#818cf8', fontWeight: 700, fontFamily: 'monospace' }}>{row.id}</td>
                    <td style={tableCell}>{row.cust}</td>
                    <td style={{ ...tableCell, color: 'var(--text-primary)', fontWeight: 600 }}>{row.amount}</td>
                    <td style={tableCell}><span style={statusBadge(row.color)}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CONFIGURE RETRIES MODAL */}
      <Modal isOpen={isRetryOpen} onClose={() => setIsRetryOpen(false)} title="Configure Retries & Dunning Strategy">
        <form onSubmit={handleRetrySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Max Payment Retries</label>
            <select 
              value={retryPolicy.maxAttempts} 
              onChange={(e) => setRetryPolicy({...retryPolicy, maxAttempts: e.target.value})} 
              style={selectStyle}
            >
              <option value="1">1 Attempt</option>
              <option value="2">2 Attempts</option>
              <option value="3">3 Attempts (Standard)</option>
              <option value="4">4 Attempts</option>
              <option value="5">5 Attempts (Max)</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Retry Interval (Days)</label>
            <input 
              type="number" 
              required
              min="1"
              max="15"
              value={retryPolicy.intervalDays} 
              onChange={(e) => setRetryPolicy({...retryPolicy, intervalDays: e.target.value})} 
              style={inputStyle}
            />
            <span style={{ fontSize: '11px', color: '#6b7280' }}>Number of days to wait before attempting card charge again.</span>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Action After Final Failed Attempt</label>
            <select 
              value={retryPolicy.failureAction} 
              onChange={(e) => setRetryPolicy({...retryPolicy, failureAction: e.target.value})} 
              style={selectStyle}
            >
              <option value="dunning-alert">Send Dunning Alert & Keep Active</option>
              <option value="pause-subscription">Pause Tenant Subscription</option>
              <option value="cancel-subscription">Cancel / Terminate Account immediately</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsRetryOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Apply Retry Policy</button>
          </div>
        </form>
      </Modal>

      {/* ADD PAYMENT GATEWAY MODAL */}
      <Modal isOpen={isGatewayOpen} onClose={() => setIsGatewayOpen(false)} title="Connect Payment Gateway Channel">
        <form onSubmit={handleGatewaySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Gateway Provider</label>
            <select 
              value={newGateway.provider} 
              onChange={(e) => setNewGateway({...newGateway, provider: e.target.value})} 
              style={selectStyle}
            >
              <option value="Stripe API">Stripe Credit Cards</option>
              <option value="PayPal SDK">PayPal Payments</option>
              <option value="Razorpay API">Razorpay India Local</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Connection Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Stripe USD Primary"
              value={newGateway.name} 
              onChange={(e) => setNewGateway({...newGateway, name: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Mode</label>
            <select 
              value={newGateway.mode} 
              onChange={(e) => setNewGateway({...newGateway, mode: e.target.value})} 
              style={selectStyle}
            >
              <option value="Sandbox">Sandbox / Test Mode</option>
              <option value="Live">Live Production Mode</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Public Client Key</label>
            <input 
              type="text" 
              required
              placeholder="pk_live_..."
              value={newGateway.publicKey} 
              onChange={(e) => setNewGateway({...newGateway, publicKey: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Secret Private Key</label>
            <input 
              type="password" 
              required
              placeholder="sk_live_..."
              value={newGateway.secretKey} 
              onChange={(e) => setNewGateway({...newGateway, secretKey: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsGatewayOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Connect Gateway</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   6. BILLING TRANSACTIONS
   ---------------------------------------------------- */
export const BillingTransactions: React.FC = () => {
  const [ledger, setLedger] = useState([
    { ref: 'TX-8802901', cust: 'Apex Technologies', type: 'Credit Charge', amount: '+$499.00', ts: '2026-06-15 10:45 AM', gw: 'Stripe API', color: '#10b981', reconciled: true },
    { ref: 'TX-8802900', cust: 'CloudSystem Inc', type: 'Credit Charge', amount: '+$99.00', ts: '2026-06-04 09:12 AM', gw: 'Stripe API', color: '#10b981', reconciled: true },
    { ref: 'TX-8802899', cust: 'DevOps Studio', type: 'Refund', amount: '-$58.00', ts: '2026-05-30 02:22 PM', gw: 'Stripe API', color: '#ef4444', reconciled: false },
  ]);

  const [isReconcileOpen, setIsReconcileOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [exportSettings, setExportSettings] = useState({
    format: 'Excel',
    includeLogs: true,
  });

  useEffect(() => {
    const handleReconcile = () => setIsReconcileOpen(true);
    const handleExport = () => setIsExportOpen(true);

    window.addEventListener('bill-reconcile-accounts', handleReconcile);
    window.addEventListener('bill-export-ledger', handleExport);

    return () => {
      window.removeEventListener('bill-reconcile-accounts', handleReconcile);
      window.removeEventListener('bill-export-ledger', handleExport);
    };
  }, []);

  const handlePerformReconciliation = () => {
    // Reconcile all unreconciled
    const updated = ledger.map(item => ({ ...item, reconciled: true }));
    setLedger(updated);
    setIsReconcileOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Ledger successfully reconciled with Stripe API logs!' }));
  };

  const handleExportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = ledger.map(l => `[${l.ts}] Ref:${l.ref} | Customer:${l.cust} | Type:${l.type} | Amt:${l.amount} | Reconciled:${l.reconciled}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `financial_ledger_${Date.now()}.${exportSettings.format === 'Excel' ? 'xlsx' : exportSettings.format.toLowerCase()}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsExportOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Ledger exported in ${exportSettings.format} format!` }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Accounting Ledger Transactions</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setIsReconcileOpen(true)} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Reconcile Accounts</button>
            <button onClick={() => setIsExportOpen(true)} style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Export Ledger</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead><tr>{['Reference ID', 'Customer', 'Type', 'Amount', 'Timestamp', 'Gateway', 'Reconciliation'].map(h => <th key={h} style={tableHead}>{h}</th>)}</tr></thead>
            <tbody>
              {ledger.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ ...tableCell, color: '#818cf8', fontWeight: 700, fontFamily: 'monospace', fontSize: '12px' }}>{row.ref}</td>
                  <td style={tableCell}>{row.cust}</td>
                  <td style={tableCell}>{row.type}</td>
                  <td style={{ ...tableCell, color: row.color, fontWeight: 700 }}>{row.amount}</td>
                  <td style={{ ...tableCell, fontFamily: 'monospace', fontSize: '12px' }}>{row.ts}</td>
                  <td style={tableCell}>{row.gw}</td>
                  <td style={tableCell}>
                    <span style={statusBadge(row.reconciled ? '#10b981' : '#f59e0b')}>
                      {row.reconciled ? 'Reconciled' : 'Unreconciled'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECONCILE ACCOUNTS MODAL */}
      <Modal isOpen={isReconcileOpen} onClose={() => setIsReconcileOpen(false)} title="Ledger Reconciliation Portal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>The reconciliation system scanned matching reference numbers in external gateway registers. We found the following mismatch:</p>
          
          <div style={{ border: '1px solid rgba(245,158,11,0.2)', backgroundColor: 'rgba(245,158,11,0.05)', padding: '12px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '13px', fontWeight: 700 }}>
              <AlertCircle size={16} />
              <span>Mismatch Found (1 entry)</span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#d1d5db', marginTop: '6px', marginBottom: 0, lineHeight: 1.5 }}>
              Refund Entry <strong style={{ fontFamily: 'monospace' }}>TX-8802899</strong> for DevOps Studio is showing as unpaid/unsettled in gateway records.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button onClick={() => setIsReconcileOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button onClick={handlePerformReconciliation} style={btnPrimaryStyle}>
              Reconcile Match Entry
            </button>
          </div>
        </div>
      </Modal>

      {/* EXPORT LEDGER MODAL */}
      <Modal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} title="Export Financial Ledger">
        <form onSubmit={handleExportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>File Format</label>
            <select 
              value={exportSettings.format} 
              onChange={(e) => setExportSettings({...exportSettings, format: e.target.value})} 
              style={selectStyle}
            >
              <option value="Excel">Microsoft Excel (.xlsx)</option>
              <option value="PDF">Portable Document Format (.pdf)</option>
              <option value="CSV">Comma Separated Values (.csv)</option>
            </select>
          </div>

          <div style={switchContainerStyle}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#f3f4f6' }}>Include Audit Trail Logs</span>
            <input 
              type="checkbox" 
              checked={exportSettings.includeLogs} 
              onChange={(e) => setExportSettings({...exportSettings, includeLogs: e.target.checked})} 
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsExportOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Export Ledger</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   7. BILLING USAGE
   ---------------------------------------------------- */
export const BillingUsage: React.FC = () => {
  const [usages, setUsages] = useState([
    { label: 'API Queries Processed', val: '842,450', limit: 1000000, used: 84.2, color: '#f59e0b' },
    { label: 'WhatsApp Segments Sent', val: '24,150', limit: 50000, used: 48.3, color: '#6366f1' },
    { label: 'Active LLM Tokens', val: '1.2M', limit: 5000000, used: 24, color: '#10b981' },
  ]);

  const [alerts, setAlerts] = useState([
    { resource: 'API Queries', threshold: '90%', channel: 'Email', target: 'devops-alerts@apex-tech.com', active: true },
    { resource: 'WhatsApp segments', threshold: '80%', channel: 'Slack webhook', target: '#billing-alerts', active: true }
  ]);

  const [isApiSettingsOpen, setIsApiSettingsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [apiSettings, setApiSettings] = useState({
    rpm: '600',
    overagesEnabled: true,
    cacheTime: '10',
  });

  const [newAlert, setNewAlert] = useState({
    resource: 'API Queries Processed',
    threshold: '85%',
    channel: 'Email',
    target: '',
  });

  useEffect(() => {
    const handleApiSettings = () => setIsApiSettingsOpen(true);
    const handleAlerts = () => setIsAlertOpen(true);

    window.addEventListener('bill-api-settings', handleApiSettings);
    window.addEventListener('bill-set-limit-alerts', handleAlerts);

    return () => {
      window.removeEventListener('bill-api-settings', handleApiSettings);
      window.removeEventListener('bill-set-limit-alerts', handleAlerts);
    };
  }, []);

  const handleApiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApiSettingsOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `API Settings applied: Max ${apiSettings.rpm} RPM, Overages: ${apiSettings.overagesEnabled ? 'Enabled' : 'Disabled'}` }));
  };

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const alert = {
      resource: newAlert.resource,
      threshold: newAlert.threshold,
      channel: newAlert.channel,
      target: newAlert.target || 'admin-alerts@ad-network.com',
      active: true,
    };
    setAlerts([alert, ...alerts]);
    setIsAlertOpen(false);
    setNewAlert({ resource: 'API Queries Processed', threshold: '85%', channel: 'Email', target: '' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Threshold alert at ${alert.threshold} created for ${alert.resource}!` }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {usages.map((s, i) => (
          <div key={i} style={statCard}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</span>
            <div style={{ fontSize: '26px', fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', marginTop: '4px' }}>
              <div style={{ width: `${s.used}%`, height: '100%', backgroundColor: s.color, borderRadius: '3px' }} />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.used}% of limit used</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Dynamic Alerts List */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Configured Threshold Alerts</h4>
            <button onClick={() => setIsAlertOpen(true)} style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>+ Set Alert</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {alerts.map((al, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#161b22', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#f3f4f6' }}>{al.resource} alert at {al.threshold}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>Route to: <span style={{ fontFamily: 'monospace' }}>{al.target}</span> ({al.channel})</div>
                </div>
                <span style={statusBadge('#10b981')}>Active</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic usage warning panel */}
        <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>System Notifications</h4>
          <div style={{ display: 'flex', gap: '10px', padding: '14px 16px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px', alignItems: 'flex-start' }}>
            <AlertCircle size={16} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '1px' }} />
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong style={{ color: '#f59e0b' }}>Apex Technologies</strong> API limits are at <strong style={{ color: '#f59e0b' }}>84% capacity</strong>. A dunning warning threshold alert will trigger at 90%.
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
            <button onClick={() => setIsApiSettingsOpen(true)} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
              Modify API Rate Limits
            </button>
          </div>
        </div>
      </div>

      {/* API SETTINGS MODAL */}
      <Modal isOpen={isApiSettingsOpen} onClose={() => setIsApiSettingsOpen(false)} title="REST API Endpoint Configurations">
        <form onSubmit={handleApiSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Max Client Requests (per minute)</label>
            <input 
              type="number" 
              required
              min="100"
              max="5000"
              value={apiSettings.rpm} 
              onChange={(e) => setApiSettings({...apiSettings, rpm: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={switchContainerStyle}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#f3f4f6' }}>Enable Metered Overages Billing</span>
            <input 
              type="checkbox" 
              checked={apiSettings.overagesEnabled} 
              onChange={(e) => setApiSettings({...apiSettings, overagesEnabled: e.target.checked})} 
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Client Cache Expiry Duration (Minutes)</label>
            <input 
              type="number" 
              required
              min="1"
              max="60"
              value={apiSettings.cacheTime} 
              onChange={(e) => setApiSettings({...apiSettings, cacheTime: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsApiSettingsOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Apply API Configuration</button>
          </div>
        </form>
      </Modal>

      {/* SET LIMIT ALERTS MODAL */}
      <Modal isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} title="Configure Usage Limit Threshold Alert">
        <form onSubmit={handleAlertSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Select Resource Volume</label>
            <select 
              value={newAlert.resource} 
              onChange={(e) => setNewAlert({...newAlert, resource: e.target.value})} 
              style={selectStyle}
            >
              <option value="API Queries Processed">API Queries Processed</option>
              <option value="WhatsApp Segments Sent">WhatsApp Segments Sent</option>
              <option value="Active LLM Tokens">Active LLM Tokens</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Trigger Threshold (%)</label>
            <select 
              value={newAlert.threshold} 
              onChange={(e) => setNewAlert({...newAlert, threshold: e.target.value})} 
              style={selectStyle}
            >
              <option value="75%">75% capacity</option>
              <option value="80%">80% capacity</option>
              <option value="85%">85% capacity</option>
              <option value="90%">90% capacity</option>
              <option value="95%">95% capacity</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Notification Channel</label>
            <select 
              value={newAlert.channel} 
              onChange={(e) => setNewAlert({...newAlert, channel: e.target.value})} 
              style={selectStyle}
            >
              <option value="Email">Email Notification</option>
              <option value="SMS">SMS Message Alert</option>
              <option value="Slack webhook">Slack Integration Channel</option>
              <option value="Generic Webhook">HTTP Post Webhook Endpoint</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Alert Recipient (Address / Endpoint URL)</label>
            <input 
              type="text" 
              required
              placeholder="e.g. engineering-alerts@company.com"
              value={newAlert.target} 
              onChange={(e) => setNewAlert({...newAlert, target: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsAlertOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Set Warning Alert</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   8. BILLING TAXES
   ---------------------------------------------------- */
export const BillingTaxes: React.FC = () => {
  const [taxRules, setTaxRules] = useState([
    { region: 'United States (New York)', type: 'Sales Tax', rate: '8.875%', exempt: 'Yes (B2B Exemption)', status: 'Active', color: '#10b981' },
    { region: 'European Union (VAT)', type: 'VAT', rate: '20.0%', exempt: 'Yes (Reverse Charge)', status: 'Active', color: '#10b981' },
    { region: 'United Kingdom', type: 'VAT', rate: '20.0%', exempt: 'No', status: 'Active', color: '#10b981' },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  const [newTax, setNewTax] = useState({
    region: '',
    type: 'VAT',
    rate: '',
    exempt: 'No',
  });

  // Mock Tax calculation audit log
  const auditLogs = [
    { date: '2026-07-08 10:12:04', region: 'European Union (VAT)', amount: '$99.00', tax: '$19.80', info: 'B2B Reverse charge check passed' },
    { date: '2026-07-07 14:55:18', region: 'United States (New York)', amount: '$499.00', tax: '$44.29', info: 'Sales tax successfully calculated' },
    { date: '2026-07-06 09:22:30', region: 'United Kingdom', amount: '$29.00', tax: '$5.80', info: 'VAT applied, no exemptions' }
  ];

  useEffect(() => {
    const handleAdd = () => setIsAddOpen(true);
    const handleAudit = () => setIsAuditOpen(true);

    window.addEventListener('bill-add-tax-jurisdiction', handleAdd);
    window.addEventListener('bill-export-audit-logs', handleAudit);

    return () => {
      window.removeEventListener('bill-add-tax-jurisdiction', handleAdd);
      window.removeEventListener('bill-export-audit-logs', handleAudit);
    };
  }, []);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tr = {
      region: newTax.region,
      type: newTax.type,
      rate: newTax.rate.endsWith('%') ? newTax.rate : `${newTax.rate}%`,
      exempt: newTax.exempt,
      status: 'Active',
      color: '#10b981',
    };
    setTaxRules([...taxRules, tr]);
    setIsAddOpen(false);
    setNewTax({ region: '', type: 'VAT', rate: '', exempt: 'No' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Tax rules for "${tr.region}" connected successfully!` }));
  };

  const handleExportAudit = () => {
    const content = 'Timestamp,Region,Taxable Amount,Calculated Tax,Exemptions Check\n' +
      auditLogs.map(a => `"${a.date}","${a.region}","${a.amount}","${a.tax}","${a.info}"`).join('\n');
    
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tax_compliance_audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsAuditOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Tax audit logs exported successfully!' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Tax Rules & Compliance Configurations</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setIsAuditOpen(true)} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Export Audit Logs</button>
            <button onClick={() => setIsAddOpen(true)} style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>+ Add Jurisdiction</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead><tr>{['Region / Jurisdiction', 'Tax Type', 'Rate', 'Exemptions Allowed', 'Status'].map(h => <th key={h} style={tableHead}>{h}</th>)}</tr></thead>
            <tbody>
              {taxRules.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ ...tableCell, color: '#818cf8', fontWeight: 700 }}>{row.region}</td>
                  <td style={tableCell}>{row.type}</td>
                  <td style={{ ...tableCell, color: 'var(--text-primary)', fontWeight: 700 }}>{row.rate}</td>
                  <td style={tableCell}>{row.exempt}</td>
                  <td style={tableCell}><span style={statusBadge(row.color)}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD TAX JURISDICTION MODAL */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Tax Jurisdiction & Policy">
        <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Country / State Jurisdiction</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Canada (Ontario)"
              value={newTax.region} 
              onChange={(e) => setNewTax({...newTax, region: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Tax Category Type</label>
            <select 
              value={newTax.type} 
              onChange={(e) => setNewTax({...newTax, type: e.target.value})} 
              style={selectStyle}
            >
              <option value="VAT">VAT (Value Added Tax)</option>
              <option value="GST">GST (Goods & Services Tax)</option>
              <option value="Sales Tax">Sales Tax</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Tax Percentage Rate (%)</label>
            <input 
              type="number" 
              step="0.001"
              required
              placeholder="e.g. 13.0"
              value={newTax.rate} 
              onChange={(e) => setNewTax({...newTax, rate: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Exemption Rules Allowed</label>
            <select 
              value={newTax.exempt} 
              onChange={(e) => setNewTax({...newTax, exempt: e.target.value})} 
              style={selectStyle}
            >
              <option value="No">No Exemptions Allowed</option>
              <option value="Yes (B2B Exemption)">Yes (B2B Exemption)</option>
              <option value="Yes (Reverse Charge)">Yes (Reverse Charge)</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsAddOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Add Tax Rule</button>
          </div>
        </form>
      </Modal>

      {/* EXPORT AUDIT LOGS MODAL */}
      <Modal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} title="Export Tax Audit compliance Trail">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Review the latest verified transactions processed by the tax compliance pipeline engine prior to audit log download.</p>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr>
                  <th style={{ ...tableHead, padding: '6px' }}>Timestamp</th>
                  <th style={{ ...tableHead, padding: '6px' }}>Jurisdiction</th>
                  <th style={{ ...tableHead, padding: '6px' }}>Calculated</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, idx) => (
                  <tr key={idx}>
                    <td style={{ ...tableCell, padding: '8px 6px', fontFamily: 'monospace' }}>{log.date.split(' ')[0]}</td>
                    <td style={{ ...tableCell, padding: '8px 6px' }}>{log.region}</td>
                    <td style={{ ...tableCell, padding: '8px 6px', color: '#10b981', fontWeight: 600 }}>{log.tax} ({log.amount})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button onClick={() => setIsAuditOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button onClick={handleExportAudit} style={btnPrimaryStyle}>
              <Download size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Download Audit CSV
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   9. BILLING COUPONS
   ---------------------------------------------------- */
export const BillingCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState([
    { code: 'WELCOME30', type: 'Percentage', value: '30% Off', redemptions: '142 / 500', expires: '2026-12-31', status: 'Active', color: '#10b981' },
    { code: 'ENTERPRISE100', type: 'Fixed Amount', value: '$100 Off', redemptions: '18 / 50', expires: '2026-09-30', status: 'Active', color: '#10b981' },
    { code: 'SUMMER2025', type: 'Percentage', value: '15% Off', redemptions: '500 / 500', expires: '2025-08-31', status: 'Expired', color: '#6b7280' },
  ]);

  const [redeemedLogs] = useState([
    { code: 'WELCOME30', customer: 'CloudSystem Inc', date: '2026-07-04', discountApplied: '$29.70' },
    { code: 'ENTERPRISE100', customer: 'Apex Technologies', date: '2026-06-15', discountApplied: '$100.00' },
    { code: 'WELCOME30', customer: 'DevOps Studio', date: '2026-06-01', discountApplied: '$8.70' },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isRedeemedOpen, setIsRedeemedOpen] = useState(false);

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'Percentage',
    value: '',
    expires: '',
    maxRedemptions: '500',
  });

  useEffect(() => {
    const handleCreate = () => setIsCreateOpen(true);
    const handleViewRedeemed = () => setIsRedeemedOpen(true);

    window.addEventListener('bill-create-coupon', handleCreate);
    window.addEventListener('bill-view-redeemed', handleViewRedeemed);

    return () => {
      window.removeEventListener('bill-create-coupon', handleCreate);
      window.removeEventListener('bill-view-redeemed', handleViewRedeemed);
    };
  }, []);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cp = {
      code: newCoupon.code.toUpperCase().replace(/\s+/g, ''),
      type: newCoupon.type,
      value: newCoupon.type === 'Percentage' ? `${newCoupon.value}% Off` : `$${newCoupon.value} Off`,
      redemptions: `0 / ${newCoupon.maxRedemptions}`,
      expires: newCoupon.expires || '2026-12-31',
      status: 'Active',
      color: '#10b981',
    };
    setCoupons([cp, ...coupons]);
    setIsCreateOpen(false);
    setNewCoupon({ code: '', type: 'Percentage', value: '', expires: '', maxRedemptions: '500' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Coupon Code "${cp.code}" created successfully!` }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Active Promo Codes</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setIsRedeemedOpen(true)} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>View Redeemed</button>
            <button onClick={() => setIsCreateOpen(true)} style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>+ Create Coupon</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead><tr>{['Coupon Code', 'Discount Type', 'Value', 'Redemptions', 'Expires', 'Status'].map(h => <th key={h} style={tableHead}>{h}</th>)}</tr></thead>
            <tbody>
              {coupons.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ ...tableCell, color: '#a855f7', fontWeight: 700, fontFamily: 'monospace' }}>{row.code}</td>
                  <td style={tableCell}>{row.type}</td>
                  <td style={{ ...tableCell, color: 'var(--text-primary)', fontWeight: 700 }}>{row.value}</td>
                  <td style={tableCell}>{row.redemptions}</td>
                  <td style={tableCell}>{row.expires}</td>
                  <td style={tableCell}><span style={statusBadge(row.color)}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE COUPON MODAL */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Coupon Promo Code">
        <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Coupon Promo Code</label>
            <input 
              type="text" 
              required
              placeholder="e.g. SUMMER50"
              value={newCoupon.code} 
              onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Discount Type</label>
            <select 
              value={newCoupon.type} 
              onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})} 
              style={selectStyle}
            >
              <option value="Percentage">Percentage discount (%)</option>
              <option value="Fixed Amount">Fixed dollar discount ($)</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Discount Value</label>
            <input 
              type="number" 
              required
              min="1"
              placeholder={newCoupon.type === 'Percentage' ? 'e.g. 30' : 'e.g. 50'}
              value={newCoupon.value} 
              onChange={(e) => setNewCoupon({...newCoupon, value: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Expiry Date</label>
            <input 
              type="date" 
              required
              value={newCoupon.expires} 
              onChange={(e) => setNewCoupon({...newCoupon, expires: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Redemption Cap Limit</label>
            <input 
              type="number" 
              required
              min="1"
              value={newCoupon.maxRedemptions} 
              onChange={(e) => setNewCoupon({...newCoupon, maxRedemptions: e.target.value})} 
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsCreateOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Create Coupon</button>
          </div>
        </form>
      </Modal>

      {/* VIEW REDEEMED COUPONS MODAL */}
      <Modal isOpen={isRedeemedOpen} onClose={() => setIsRedeemedOpen(false)} title="Coupon Redemption Audit Trail">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>List of coupon codes that have been successfully redeemed by active customer tenants.</p>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr>
                  <th style={{ ...tableHead, padding: '6px' }}>Customer</th>
                  <th style={{ ...tableHead, padding: '6px' }}>Coupon</th>
                  <th style={{ ...tableHead, padding: '6px' }}>Date</th>
                  <th style={{ ...tableHead, padding: '6px' }}>Saved</th>
                </tr>
              </thead>
              <tbody>
                {redeemedLogs.map((log, idx) => (
                  <tr key={idx}>
                    <td style={{ ...tableCell, padding: '8px 6px' }}>{log.customer}</td>
                    <td style={{ ...tableCell, padding: '8px 6px', fontFamily: 'monospace', color: '#a855f7', fontWeight: 700 }}>{log.code}</td>
                    <td style={{ ...tableCell, padding: '8px 6px' }}>{log.date}</td>
                    <td style={{ ...tableCell, padding: '8px 6px', color: '#10b981', fontWeight: 600 }}>{log.discountApplied}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button onClick={() => setIsRedeemedOpen(false)} style={btnPrimaryStyle}>Close Log</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   10. BILLING REPORTS
   ---------------------------------------------------- */
export const BillingReports: React.FC = () => {
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [exportSettings, setExportSettings] = useState({
    reportType: 'Revenue Forecast',
    range: 'Q3 2026',
    includeCharts: true,
  });

  const auditLogs = [
    { date: '2026-07-08 09:30:11', user: 'admin@ad-network.com', action: 'Modified features for Pro Growth Scale plan', status: 'Success' },
    { date: '2026-07-07 16:18:25', user: 'billing-system', action: 'Generated recurring invoice INV-4409', status: 'Success' },
    { date: '2026-07-06 11:05:48', user: 'admin@ad-network.com', action: 'Added Canada (Ontario) tax jurisdiction', status: 'Success' },
    { date: '2026-07-05 14:12:00', user: 'support@ad-network.com', action: 'Approved refund REF-0104 for DevOps Studio', status: 'Success' }
  ];

  useEffect(() => {
    const handleAudit = () => setIsAuditOpen(true);
    const handleExport = () => setIsExportOpen(true);

    window.addEventListener('bill-auditing-logs', handleAudit);
    window.addEventListener('bill-export-pdf-report', handleExport);

    return () => {
      window.removeEventListener('bill-auditing-logs', handleAudit);
      window.removeEventListener('bill-export-pdf-report', handleExport);
    };
  }, []);

  const handleExportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate generation and download
    const content = `=== Financial Report ===\nType: ${exportSettings.reportType}\nRange: ${exportSettings.range}\nGenerated: ${new Date().toISOString()}\n========================\nMRR: $85,420\nARR: $1,025,040\nActive Subs: 1,424\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `financial_report_${exportSettings.reportType.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsExportOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Report "${exportSettings.reportType}" downloaded successfully!` }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Quarterly Financial Forecast Projections</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setIsAuditOpen(true)} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Auditing Logs</button>
            <button onClick={() => setIsExportOpen(true)} style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Export Report</button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          {[
            { label: 'Q3 2026 Forecast', val: '$310,000', color: '#6366f1' },
            { label: 'YTD Revenue 2026', val: '$510,000', color: '#10b981' },
            { label: 'Annual Target', val: '$1,200,000', color: '#a855f7' },
          ].map((s, i) => (
            <div key={i} style={statCard}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</span>
              <div style={{ fontSize: '26px', fontWeight: 800, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>Financial report calculations are processed on a daily basis. The latest summary is generated based on standard Q3 operational metrics and reflects all active subscriptions, refunds, and coupon redemptions.</p>
      </div>

      {/* AUDITING LOGS MODAL */}
      <Modal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} title="System Administrative Auditing Logs">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Recent administrative actions taken inside the billing and subscription modules.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {auditLogs.map((log, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px', backgroundColor: '#161b22', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#818cf8', fontFamily: 'monospace' }}>
                  <span>{log.date}</span>
                  <span style={{ color: '#10b981' }}>{log.status}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#f3f4f6', fontWeight: 600, marginTop: '4px' }}>{log.action}</div>
                <div style={{ fontSize: '11.5px', color: '#9ca3af', marginTop: '2px' }}>Initiated by: <span style={{ fontFamily: 'monospace' }}>{log.user}</span></div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button onClick={() => setIsAuditOpen(false)} style={btnPrimaryStyle}>Close Log</button>
          </div>
        </div>
      </Modal>

      {/* EXPORT REPORT PDF MODAL */}
      <Modal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} title="Export Financial Performance Report">
        <form onSubmit={handleExportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Report Category Type</label>
            <select 
              value={exportSettings.reportType} 
              onChange={(e) => setExportSettings({...exportSettings, reportType: e.target.value})} 
              style={selectStyle}
            >
              <option value="Revenue Forecast">Revenue Forecast & ARR Summary</option>
              <option value="Operational Audit">Operational Audit Compliance</option>
              <option value="Tax Compliance Ledger">Tax Compliance Ledger & Rules</option>
              <option value="Churn Analytics">Churn Analytics Split</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Quarter Target</label>
            <select 
              value={exportSettings.range} 
              onChange={(e) => setExportSettings({...exportSettings, range: e.target.value})} 
              style={selectStyle}
            >
              <option value="Q3 2026">Q3 2026 Projections</option>
              <option value="Q4 2026">Q4 2026 Projections</option>
              <option value="Full Year 2026">Full Financial Year 2026</option>
            </select>
          </div>

          <div style={switchContainerStyle}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#f3f4f6' }}>Include Analytical Charts & Visuals</span>
            <input 
              type="checkbox" 
              checked={exportSettings.includeCharts} 
              onChange={(e) => setExportSettings({...exportSettings, includeCharts: e.target.checked})} 
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsExportOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>
              <Download size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Export Document Report
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
