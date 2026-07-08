import React, { useState } from 'react';
import { 
  Users, Plus, Save, Play, X, Activity, Check, Trash2, ChevronDown,
  Target, Compass, Zap, TrendingUp, DollarSign, Globe, Database, Store, Layers
} from 'lucide-react';

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
