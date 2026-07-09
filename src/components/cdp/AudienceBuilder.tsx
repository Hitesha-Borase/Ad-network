import React, { useState } from 'react';
import { Users, Plus, Save, Play, X, Activity, Check, Target, Compass, Zap, TrendingUp, DollarSign, Globe, Database, Store, Layers } from 'lucide-react';

type RuleType = 'include' | 'exclude';
type LogicOp = 'AND' | 'OR';

interface Rule {
  id: number;
  type: RuleType;
  attribute: string;
  operator: string;
  value: string;
}

const EVENTS = ['Viewed Pricing Page', 'Signed Up', 'Added to Cart', 'Clicked CTA', 'Opened Email', 'Visited Home Page'];
const ATTR_FIELDS = ['Subscription Status', 'Account Balance', 'LTV', 'Country', 'Plan Type', 'Last Login'];
const OPERATORS_EVENT = ['at least', 'exactly', 'less than'];
const OPERATORS_ATTR = ['is equal to', 'is not equal to', 'greater than', 'less than'];
const TIME_RANGES = ['7 days', '30 days', '60 days', '90 days'];
const STATUS_VALUES = ['Active Enterprise', 'Active Pro', 'Free', 'Cancelled', 'Trial'];

const sampleProfiles = [
  { id: 'usr_a1b2c3', intent: 'High Intent', active: '5m ago' },
  { id: 'sarah.j@tech.io', intent: 'High Intent', active: '2h ago' },
  { id: 'usr_x9y8z7', intent: 'Medium Intent', active: '1d ago' },
  { id: 'marketing@acme.com', intent: 'Low Intent', active: '3d ago' },
];

function genCount(rules: Rule[]): number {
  const base = 14208;
  return Math.max(800, base - (rules.filter(r => r.type === 'exclude').length * 3100) + (rules.filter(r => r.type === 'include').length * 1200));
}

interface ModeConfig {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  accent: string;
}

const modeConfigs: Record<string, ModeConfig> = {
  'cdp-audience': {
    title: 'Visual Audience Builder',
    subtitle: 'Query your CDP data to create hyper-targeted segments without writing SQL.',
    icon: <Users size={22} />,
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(99,102,241,0.15) 100%)',
    borderColor: 'rgba(236,72,153,0.2)',
    accent: 'var(--accent)'
  },
  'dmp-3p-audience': {
    title: 'Third-Party Audience Marketplace',
    subtitle: 'Browse, acquire, and target demographic data groups from verified third-party data brokers.',
    icon: <Store size={22} />,
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(16,185,129,0.15) 100%)',
    borderColor: 'rgba(99,102,241,0.2)',
    accent: 'var(--primary)'
  },
  'dmp-1p-audience': {
    title: 'First-Party Audience Manager',
    subtitle: 'Ingest, organize, and segment direct customer data records collected from your own properties.',
    icon: <Database size={22} />,
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(99,102,241,0.15) 100%)',
    borderColor: 'rgba(16,185,129,0.2)',
    accent: 'var(--success)'
  },
  'dmp-interest-categories': {
    title: 'Interest Categories Taxonomy',
    subtitle: 'Map user profiles to customized behavior topics, content channels, and buying patterns.',
    icon: <Layers size={22} />,
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(99,102,241,0.15) 100%)',
    borderColor: 'rgba(245,158,11,0.2)',
    accent: 'var(--warning)'
  },
  'dmp-lookalike': {
    title: 'Lookalike Audience Modeling',
    subtitle: 'Deploy custom neural models to scan millions of user profiles for patterns matching your high-value customers.',
    icon: <Target size={22} />,
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%)',
    borderColor: 'rgba(99,102,241,0.2)',
    accent: 'var(--primary)'
  },
  'dmp-ai-expansion': {
    title: 'AI Audience Expansion',
    subtitle: 'Leverage machine learning clusters to automatically scale targeted groups with high-probability matches.',
    icon: <Compass size={22} />,
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(99,102,241,0.15) 100%)',
    borderColor: 'rgba(168,85,247,0.2)',
    accent: 'var(--accent)'
  },
  'dmp-audience-scoring': {
    title: 'Audience Scoring & Valuations',
    subtitle: 'Rank customer profiles with predictive propensity scores for conversion, churn risk, and LTV.',
    icon: <Zap size={22} />,
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(245,158,11,0.15) 100%)',
    borderColor: 'rgba(236,72,153,0.2)',
    accent: 'var(--accent)'
  },
  'dmp-demographic': {
    title: 'Demographic Targeting Console',
    subtitle: 'Filter users by age clusters, geographic grids, industry sectors, and income brackets.',
    icon: <Globe size={22} />,
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(236,72,153,0.15) 100%)',
    borderColor: 'rgba(16,185,129,0.2)',
    accent: 'var(--success)'
  },
  'dmp-interest-prediction': {
    title: 'Interest Prediction Engine',
    subtitle: 'Track real-time intent queries to forecast upcoming purchasing trends and buyer interests.',
    icon: <TrendingUp size={22} />,
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(236,72,153,0.15) 100%)',
    borderColor: 'rgba(245,158,11,0.2)',
    accent: 'var(--warning)'
  },
  'dmp-purchase-intent': {
    title: 'Purchase Intent Predictor',
    subtitle: 'Monitor high-value actions to isolate profiles currently actively looking to make a purchase.',
    icon: <DollarSign size={22} />,
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(99,102,241,0.15) 100%)',
    borderColor: 'rgba(16,185,129,0.2)',
    accent: 'var(--success)'
  }
};

export const AudienceBuilder: React.FC<{ mode?: string }> = ({ mode = 'cdp-audience' }) => {
  const [rules, setRules] = useState<Rule[]>([
    { id: 1, type: 'include', attribute: EVENTS[0], operator: OPERATORS_EVENT[0], value: '30 days' },
    { id: 2, type: 'exclude', attribute: ATTR_FIELDS[0], operator: OPERATORS_ATTR[0], value: STATUS_VALUES[0] },
  ]);
  const [logic, setLogic] = useState<LogicOp>('AND');
  const [estimating, setEstimating] = useState(false);
  const [estimated, setEstimated] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [segName, setSegName] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const addRule = (type: RuleType) => {
    const newId = Math.max(...rules.map(r => r.id), 0) + 1;
    setRules(rs => [...rs, { id: newId, type, attribute: type === 'include' ? EVENTS[0] : ATTR_FIELDS[0], operator: type === 'include' ? OPERATORS_EVENT[0] : OPERATORS_ATTR[0], value: type === 'include' ? '30 days' : STATUS_VALUES[0] }]);
    setEstimated(false);
  };

  const removeRule = (id: number) => { setRules(rs => rs.filter(r => r.id !== id)); setEstimated(false); };

  const updateRule = (id: number, field: keyof Rule, val: string) => {
    setRules(rs => rs.map(r => r.id === id ? { ...r, [field]: val } : r));
    setEstimated(false);
  };

  const estimate = () => {
    setEstimating(true);
    setTimeout(() => { setEstimating(false); setEstimated(true); }, 1200);
  };

  const saveSegment = () => {
    if (!segName.trim()) return;
    setShowSave(false);
    setSegName('');
    showToast(`✅ Segment "${segName}" saved successfully!`);
  };

  const count = genCount(rules);
  const intentColor = (intent: string) => intent === 'High Intent' ? 'var(--success)' : intent === 'Medium Intent' ? 'var(--warning)' : 'var(--text-muted)';

  const activeConfig = modeConfigs[mode] || modeConfigs['cdp-audience'];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {toast && <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--success)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--success)' }}>{toast}</div>}

      <div className="glass-card" style={{ background: activeConfig.gradient, border: `1px solid ${activeConfig.borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: activeConfig.accent, display: 'flex', alignItems: 'center' }}>{activeConfig.icon}</span> {activeConfig.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>{activeConfig.subtitle}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }} onClick={estimate} disabled={estimating}>
            <Play size={14}/> {estimating ? 'Estimating...' : 'Estimate Size'}
          </button>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }} onClick={() => setShowSave(true)}>
            <Save size={14}/> Save Segment
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {mode === 'dmp-3p-audience' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Available Third-Party Audiences</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              {[
                { provider: 'Oracle Data Cloud', segment: 'B2B Tech Decision Makers', size: '240,000', cpm: '$2.10', category: 'Professional' },
                { provider: 'Nielsen Data', segment: 'Organic Food Shoppers', size: '1.2M', cpm: '$1.50', category: 'Lifestyle' },
                { provider: 'LiveRamp', segment: 'Frequent International Flyers', size: '890,000', cpm: '$2.80', category: 'Travel' },
                { provider: 'Equifax Insights', segment: 'High Net Worth Individuals', size: '140,000', cpm: '$3.50', category: 'Finance' },
                { provider: 'Adverty Media', segment: 'Console & PC Gamers', size: '3.4M', cpm: '$0.90', category: 'Gaming' },
                { provider: 'Bombora Intent', segment: 'Enterprise SaaS Buyers', size: '65,000', cpm: '$4.20', category: 'Intent' }
              ].map((p, idx) => (
                <div key={idx} style={{ padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>{p.provider}</span>
                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{p.category}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>{p.segment}</h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Size: {p.size} profiles</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700 }}>{p.cpm} <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 400 }}>CPM</span></span>
                    <button onClick={() => showToast(`✅ Added ${p.segment} to your campaigns.`)} className="btn btn-primary btn-sm">Acquire Segment</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card" style={{ flex: 1 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Marketplace Overview</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Active Providers</span><span style={{ fontWeight: 600 }}>18 partners</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Total Available Segments</span><span style={{ fontWeight: 600 }}>452 packs</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Acquired Profiles (MTD)</span><span style={{ fontWeight: 600 }}>1.8M total</span></div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '6px' }}>Verified Partners</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>All third-party data providers comply with CCPA, GDPR, and LGPD opt-out consent mechanisms.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === 'dmp-lookalike' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Create a Lookalike Model</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>SEED AUDIENCE SOURCE</label>
              <select style={{ padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '13px', outline: 'none' }}>
                <option>Active Enterprise Customers (1,492 profiles)</option>
                <option>Cart Abandoners (7d) (5,821 profiles)</option>
                <option>High Intent Non-Converters (14,208 profiles)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>TARGET GEOLOCATION</label>
              <select style={{ padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '13px', outline: 'none' }}>
                <option>United States (All)</option>
                <option>Europe (EEA countries)</option>
                <option>Asia-Pacific (APAC Region)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>AUDIENCE SIMILARITY LIMIT (1% - 10%)</label>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>2.0%</span>
              </div>
              <input type="range" min="1" max="10" defaultValue="2" style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}/>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>* Note: 1% matches your seed source most closely. 10% reaches a larger, broader target audience.</span>
            </div>

            <button onClick={() => showToast('🚀 Starting model training simulation on GPU cluster...')} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Generate Lookalike Audience</button>
          </div>

          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Active Lookalikes</h2>
            {[
              { name: 'Enterprise-Match-US-2%', source: 'Enterprise Customers', similarity: '2%', status: 'Active', size: '240K' },
              { name: 'Cart-Aband-EU-1%', source: 'Cart Abandoners (7d)', similarity: '1%', status: 'Active', size: '120K' },
              { name: 'Demo-APAC-5%', source: 'Webinar Leads', similarity: '5%', status: 'Training (42%)', size: '1.4M' }
            ].map((m, idx) => (
              <div key={idx} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginBottom: '4px' }}>
                  <span>{m.name}</span>
                  <span style={{ color: m.status.startsWith('Training') ? 'var(--warning)' : 'var(--success)' }}>{m.status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '11px', marginTop: '2px' }}>
                  <span>Seed: {m.source}</span>
                  <span>Size: {m.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === 'dmp-demographic' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Demographic Filters</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>AGE RANGE</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {['18-24 years', '25-34 years', '35-44 years', '45-54 years', '55+ years'].map((age, i) => (
                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked={i === 1 || i === 2} style={{ accentColor: 'var(--success)' }}/> {age}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>GENDER SELECTION</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['All', 'Male', 'Female'].map((g, i) => (
                    <button key={i} className="btn btn-secondary btn-sm" style={{ flex: 1, backgroundColor: i === 0 ? 'rgba(16,185,129,0.15)' : '', borderColor: i === 0 ? 'var(--success)' : '' }}>{g}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>HOUSEHOLD INCOME</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {['Top 10%', 'Top 11-25%', 'Top 26-50%', 'Bottom 50%'].map((income, i) => (
                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked={i === 0} style={{ accentColor: 'var(--success)' }}/> {income}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => showToast('✅ Demographic rules saved.')} className="btn btn-primary" style={{ backgroundColor: 'var(--success)', border: 'none', alignSelf: 'flex-start' }}>Apply Demographic Target</button>
          </div>

          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Target Location</h2>
            <input type="text" placeholder="Add country, city, or state..." style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '13px', outline: 'none' }}/>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
              {['California, US', 'London, UK', 'Berlin, DE'].map((loc, idx) => (
                <span key={idx} style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {loc} <X size={10} style={{ cursor: 'pointer' }} onClick={() => showToast(`Removed ${loc}`)}/>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === 'dmp-audience-scoring' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Predictive Cohort Propensity Scores</h2>
              <button onClick={() => showToast('🔄 Recalculating propensity scores...')} className="btn btn-secondary btn-sm">Refresh Scores</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '12px 16px' }}>User ID / Cohort</th>
                  <th style={{ padding: '12px 16px' }}>Conversion Propensity</th>
                  <th style={{ padding: '12px 16px' }}>Churn Risk</th>
                  <th style={{ padding: '12px 16px' }}>LTV Valuation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'usr_f8g9h0 (Midwest Retail)', score: '94.2%', risk: 'Low', ltv: '$12,400', riskColor: 'var(--success)' },
                  { id: 'usr_j2k3l4 (Tech Early Adopters)', score: '82.5%', risk: 'Low', ltv: '$8,120', riskColor: 'var(--success)' },
                  { id: 'usr_m5n6o7 (Cart Abandoners)', score: '38.1%', risk: 'Medium', ltv: '$2,450', riskColor: 'var(--warning)' },
                  { id: 'usr_p8q9r0 (Trial Users)', score: '18.9%', risk: 'High', ltv: '$890', riskColor: 'var(--danger)' }
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{row.id}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--success)', fontWeight: 700 }}>{row.score}</td>
                    <td style={{ padding: '12px 16px', color: row.riskColor, fontWeight: 600 }}>{row.risk}</td>
                    <td style={{ padding: '12px 16px' }}>{row.ltv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Scoring Metrics</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Scored Profiles</span><span>1.4M</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Average Score</span><span style={{ color: 'var(--success)', fontWeight: 600 }}>74.2%</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Churn Risk Index</span><span style={{ color: 'var(--warning)', fontWeight: 600 }}>12.8%</span></div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '4px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                AI propensity indexes recalculate daily at 00:00 UTC based on user interaction logs.
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === 'dmp-interest-categories' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Interest Taxonomy Tree</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Select target interest groups to build your campaign segment:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '320px', overflowY: 'auto', paddingRight: '8px' }}>
              {[
                { cat: 'Technology', sub: ['Software development', 'Gadgets & devices', 'Cryptocurrency'] },
                { cat: 'Lifestyle', sub: ['Travel & tourism', 'Fitness & outdoor', 'Fashion & apparel'] },
                { cat: 'Finance', sub: ['Investing & stock market', 'Personal loans', 'Insurance planning'] }
              ].map((c, i) => (
                <div key={i} style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '8px' }}>📁 {c.cat}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginLeft: '16px' }}>
                    {c.sub.map((subcat, j) => (
                      <label key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ accentColor: 'var(--warning)' }}/> {subcat}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => showToast('✅ Interest taxonomy filters applied.')} className="btn btn-primary" style={{ backgroundColor: 'var(--warning)', border: 'none', alignSelf: 'flex-start', color: '#fff' }}>Apply Taxonomy Filters</button>
          </div>

          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Taxonomy Summary</h2>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Aap dynamic category checklist filters compile karke high-intent target user pools structure construct kar sakte hain.
            </div>
          </div>
        </div>
      )}

      {mode === 'dmp-1p-audience' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>First-Party Ingestion Sources</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Website Pixel (JS SDK)', type: 'Real-time Stream', status: 'Live', events: '12.4M/day' },
                { name: 'Mobile App SDK (iOS & Android)', type: 'Real-time Stream', status: 'Live', events: '4.8M/day' },
                { name: 'CRM Integration (HubSpot)', type: 'Scheduled Sync', status: 'Active (Daily)', events: '42K profiles synced' },
                { name: 'Transactional DB Ingestion', type: 'Database Mirror', status: 'Active (Hourly)', events: '1.2M rows synced' }
              ].map((s, idx) => (
                <div key={idx} style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{s.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{s.type} · {s.events}</div>
                  </div>
                  <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--success)', fontWeight: 600 }}>{s.status}</span>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '20px', padding: '20px', border: '1px dashed var(--border-color)', borderRadius: '8px', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.01)' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Need to import offline contacts or user lists?</div>
              <button onClick={() => showToast('📂 Launching list uploader...')} className="btn btn-secondary btn-sm"><Plus size={12}/> Ingest Offline User CSV</button>
            </div>
          </div>
          <div className="glass-card" style={{ flex: 1 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Database Health</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Total Unique Profiles</span><span style={{ fontWeight: 600 }}>142,084</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Daily Ingestion Rate</span><span style={{ color: 'var(--success)', fontWeight: 600 }}>+4,200</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Data Freshness Lag</span><span>&lt; 500ms</span></div>
            </div>
          </div>
        </div>
      )}

      {mode === 'dmp-ai-expansion' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>AI Auto-Expansion Console</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Select your target expansion scale and let the machine learning model find similar high-probability matches:</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>BASE AUDIENCE COHORT</label>
              <select style={{ padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '13px', outline: 'none' }}>
                <option>Active Enterprise Customers (1,492 profiles)</option>
                <option>Cart Abandoners (7d) (5,821 profiles)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>EXPANSION SCALE MULTIPLIER</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['2x Scale', '5x Scale', '10x Scale'].map((scale, i) => (
                  <button key={i} className="btn btn-secondary" style={{ flex: 1, backgroundColor: i === 1 ? 'rgba(168,85,247,0.15)' : '', borderColor: i === 1 ? 'var(--accent)' : '' }}>{scale}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>AI CRITERIA FILTER</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}><input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)' }}/> High Churn Risk Prevention Filter</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}><input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)' }}/> Maximize Purchase Propensity Metric</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: 'var(--accent)' }}/> Cross-Channel Cookie Sync (3P Cookies Match)</label>
              </div>
            </div>

            <button onClick={() => showToast('🚀 Starting AI Audience Expansion execution...')} className="btn btn-primary" style={{ backgroundColor: 'var(--accent)', border: 'none', alignSelf: 'flex-start' }}>Initialize Auto-Expansion</button>
          </div>
          <div className="glass-card" style={{ flex: 1 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Simulated Output Metrics</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Expected Reach</span><span style={{ fontWeight: 600 }}>29,105 profiles</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Model Confidence</span><span style={{ color: 'var(--success)', fontWeight: 600 }}>91.4% Match</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Expected CPC Change</span><span style={{ color: 'var(--success)' }}>-12% CPC Reduction</span></div>
            </div>
          </div>
        </div>
      )}

      {mode === 'dmp-interest-prediction' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Predicted High-Growth Consumer Interests</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { keyword: 'AI-Enabled Hardware & Laptops', trend: '+340% weekly growth', probability: '94% buy intent', category: 'Technology' },
                { keyword: 'Sustainable & Eco Travel Kits', trend: '+180% weekly growth', probability: '82% buy intent', category: 'Lifestyle' },
                { keyword: 'SaaS Business Ingestion Hubs', trend: '+142% weekly growth', probability: '78% buy intent', category: 'Business' },
                { keyword: 'Connected VR Home Fitness', trend: '+95% weekly growth', probability: '65% buy intent', category: 'Health' }
              ].map((k, idx) => (
                <div key={idx} style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>🔥 {k.keyword}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{k.category} · {k.trend}</div>
                  </div>
                  <button onClick={() => showToast(`Added target keyword: ${k.keyword}`)} className="btn btn-secondary btn-sm" style={{ borderColor: 'rgba(245,158,11,0.3)', color: 'var(--warning)' }}>Target Audience</button>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card" style={{ flex: 1 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Prediction Engine Status</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Keywords Processed</span><span>12,492 / hr</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Confidence Threshold</span><span>&gt; 80%</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Drift Detection</span><span style={{ color: 'var(--success)' }}>Optimal</span></div>
            </div>
          </div>
        </div>
      )}

      {mode === 'dmp-purchase-intent' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Purchase Intent Funnel Groups</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              {[
                { stage: 'Pricing Review', count: '14,208 profiles', action: 'Highly motivated to buy', accent: 'var(--success)' },
                { stage: 'Product Comparison', count: '45,102 profiles', action: 'Comparing features/models', accent: 'var(--primary)' },
                { stage: 'Active Checkout Started', count: '5,821 profiles', action: 'Cart recovery active', accent: 'var(--accent)' },
                { stage: 'Returning Buyers', count: '1,492 profiles', action: 'High repeat conversion', accent: 'var(--warning)' }
              ].map((s, idx) => (
                <div key={idx} style={{ padding: '16px', borderRadius: '8px', border: `1px solid ${s.accent}30`, backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: s.accent }}>{s.stage}</div>
                  <div style={{ fontSize: '18px', fontWeight: 800 }}>{s.count}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{s.action}</div>
                  <button onClick={() => showToast(`Selected stage: ${s.stage}`)} className="btn btn-secondary btn-sm" style={{ marginTop: '4px' }}>Apply Target</button>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card" style={{ flex: 1 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Intent Analysis</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Active Buyers detected</span><span>66.6K</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Average Close Rate</span><span style={{ color: 'var(--success)', fontWeight: 600 }}>8.4%</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Signal Strength</span><span style={{ color: 'var(--success)' }}>Strong (9.4/10)</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Fallback to Standard CDP Rule Builder layout */}
      {mode !== 'dmp-3p-audience' && mode !== 'dmp-lookalike' && mode !== 'dmp-demographic' && mode !== 'dmp-audience-scoring' && mode !== 'dmp-interest-categories' && mode !== 'dmp-1p-audience' && mode !== 'dmp-ai-expansion' && mode !== 'dmp-interest-prediction' && mode !== 'dmp-purchase-intent' && (
        <div className="responsive-layout">
          {/* Builder */}
          <div className="glass-card" style={{ flex: 2, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Segment Rules</h2>
              <div style={{ display: 'flex', gap: '6px' }}>
                {(['AND','OR'] as LogicOp[]).map(op => (
                  <button key={op} onClick={() => setLogic(op)} style={{ padding: '5px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, background: logic === op ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: logic === op ? '#fff' : 'var(--text-muted)', border: '1px solid var(--border-color)', cursor: 'pointer' }}>{op}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {rules.map((rule, idx) => (
                <React.Fragment key={rule.id}>
                  {idx > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ padding: '4px 14px', backgroundColor: logic === 'AND' ? 'rgba(99,102,241,0.15)' : 'rgba(236,72,153,0.15)', borderRadius: '12px', fontSize: '11px', fontWeight: 700, color: logic === 'AND' ? 'var(--primary)' : 'var(--accent)' }}>{logic}</div>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.03)', padding: '14px 16px', borderRadius: '8px', border: `1px solid ${rule.type === 'include' ? 'rgba(99,102,241,0.2)' : 'rgba(239,68,68,0.2)'}`, flexWrap: 'wrap' }}>
                    <div style={{ padding: '6px 12px', backgroundColor: rule.type === 'include' ? 'var(--primary-light)' : 'rgba(239,68,68,0.2)', color: rule.type === 'include' ? 'var(--primary)' : 'var(--danger)', borderRadius: '4px', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
                      {rule.type.toUpperCase()}
                    </div>

                    {rule.type === 'include' ? (
                      <>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Users who performed</span>
                        <select value={rule.attribute} onChange={e => updateRule(rule.id, 'attribute', e.target.value)} style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px 8px', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>
                          {EVENTS.map(e => <option key={e} style={{ backgroundColor: '#1a1f2e' }}>{e}</option>)}
                        </select>
                        <select value={rule.operator} onChange={e => updateRule(rule.id, 'operator', e.target.value)} style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px 8px', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>
                          {OPERATORS_EVENT.map(op => <option key={op} style={{ backgroundColor: '#1a1f2e' }}>{op}</option>)}
                        </select>
                        <input type="number" defaultValue={2} style={{ width: '60px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px 8px', color: '#fff', fontSize: '12px' }}/>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>times in the last</span>
                        <select value={rule.value} onChange={e => updateRule(rule.id, 'value', e.target.value)} style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px 8px', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>
                          {TIME_RANGES.map(t => <option key={t} style={{ backgroundColor: '#1a1f2e' }}>{t}</option>)}
                        </select>
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Users whose</span>
                        <select value={rule.attribute} onChange={e => updateRule(rule.id, 'attribute', e.target.value)} style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px 8px', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>
                          {ATTR_FIELDS.map(f => <option key={f} style={{ backgroundColor: '#1a1f2e' }}>{f}</option>)}
                        </select>
                        <select value={rule.operator} onChange={e => updateRule(rule.id, 'operator', e.target.value)} style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px 8px', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>
                          {OPERATORS_ATTR.map(op => <option key={op} style={{ backgroundColor: '#1a1f2e' }}>{op}</option>)}
                        </select>
                        <select value={rule.value} onChange={e => updateRule(rule.id, 'value', e.target.value)} style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px 8px', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>
                          {STATUS_VALUES.map(v => <option key={v} style={{ backgroundColor: '#1a1f2e' }}>{v}</option>)}
                        </select>
                      </>
                    )}

                    {rules.length > 1 && (
                      <button onClick={() => removeRule(rule.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', marginLeft: 'auto', cursor: 'pointer', flexShrink: 0 }}><X size={16}/></button>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', borderStyle: 'dashed', fontSize: '13px' }} onClick={() => addRule('include')}>
                <Plus size={14}/> Add Include Condition
              </button>
              <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', borderStyle: 'dashed', fontSize: '13px', color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.3)' }} onClick={() => addRule('exclude')}>
                <Plus size={14}/> Add Exclude Condition
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 24px 0' }}>Estimated Audience</h2>
            <div style={{ textAlign: 'center', padding: '32px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}>
              {estimating ? (
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', animation: 'pulse 1.2s infinite' }}>Calculating...</div>
              ) : (
                <>
                  <div style={{ fontSize: '48px', fontWeight: 800, color: estimated ? 'var(--success)' : 'var(--primary)', lineHeight: 1, transition: 'color 0.5s' }}>
                    {count.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                    {estimated ? '✓ Verified Matched Profiles' : 'Matched Profiles (estimated)'}
                  </div>
                </>
              )}
            </div>

            <div style={{ marginBottom: '16px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(99,102,241,0.06)', border: '1px solid var(--border-color)', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <strong>{rules.filter(r => r.type === 'include').length}</strong> include rule(s) · <strong>{rules.filter(r => r.type === 'exclude').length}</strong> exclude rule(s) · Match logic: <strong style={{ color: 'var(--primary)' }}>{logic}</strong>
            </div>

            <h3 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 12px 0' }}>Sample Profiles</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {sampleProfiles.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}><Activity size={12}/></div>
                    <span style={{ fontSize: '12px', fontWeight: 500 }}>{p.id}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: intentColor(p.intent) }}>{p.intent}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.active}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save Modal */}
      {showSave && (
        <div className="modal-overlay" onClick={() => setShowSave(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Save as Segment</h2>
              <button onClick={() => setShowSave(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20}/></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>SEGMENT NAME *</label><input className="form-control" placeholder="e.g. High Intent Non-Converters (30d)" value={segName} onChange={e => setSegName(e.target.value)}/></div>
              <div style={{ padding: '12px', backgroundColor: 'rgba(99,102,241,0.06)', borderRadius: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                Estimated size: <strong style={{ color: 'var(--primary)' }}>{count.toLocaleString()}</strong> profiles · {rules.length} rules
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowSave(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={saveSegment}><Check size={14}/> Save Segment</button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  );
};
