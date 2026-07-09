import React, { useState, useEffect, useCallback } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts';
import { Users, MousePointerClick, TrendingUp, TrendingDown, ArrowUpRight, Zap, Target, Activity, Radio, AlertTriangle, Send, Sparkles, Sliders, Play, Brain, RefreshCw } from 'lucide-react';

/* ─── Shared UI Styling Tokens ──────────────────────────────────── */
const cardStyle: React.CSSProperties = {
  background: 'rgba(17, 24, 39, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '14px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};

const metaCardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.07)',
  borderRadius: '10px',
  padding: '16px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#0d1117',
  border: '1px solid rgba(255, 255, 255, 0.09)',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '13px',
  color: '#ffffff',
  outline: 'none',
  boxSizing: 'border-box'
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%239ca3af' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: '36px',
};

const btnStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  border: 'none',
  color: '#ffffff',
  padding: '10px 18px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'all 0.2s'
};

const btnSecStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#ffffff',
  padding: '10px 18px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: 500,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

const thStyle: React.CSSProperties = {
  padding: '11px 14px',
  color: '#6b7280',
  fontWeight: 700,
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  padding: '13px 14px',
  color: '#9ca3af',
  fontSize: '13px',
  borderBottom: '1px solid rgba(255,255,255,0.03)',
};

const badgeStyle = (color: string): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  background: `${color}15`,
  border: `1px solid ${color}30`,
  color: color,
  padding: '3px 10px',
  borderRadius: '20px',
  fontSize: '11px',
  fontWeight: 600,
});

const triggerToast = (msg: string) => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
};

const ProgressBar: React.FC<{ pct: number; color: string }> = ({ pct, color }) => (
  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '4px', height: '6px', width: '100%', overflow: 'hidden' }}>
    <div style={{ width: `${Math.min(pct, 100)}%`, background: color, height: '100%', borderRadius: '4px', transition: 'width 0.6s ease' }} />
  </div>
);

/* ─── Mock Datasets ────────────────────────────────────────────── */
const dataByRange: Record<string, { name: string; organic: number; paid: number }[]> = {
  '7d': [
    { name: 'Mon', organic: 4000, paid: 2400 },
    { name: 'Tue', organic: 3000, paid: 1398 },
    { name: 'Wed', organic: 2000, paid: 9800 },
    { name: 'Thu', organic: 2780, paid: 3908 },
    { name: 'Fri', organic: 1890, paid: 4800 },
    { name: 'Sat', organic: 2390, paid: 3800 },
    { name: 'Sun', organic: 3490, paid: 4300 },
  ],
  '30d': [
    { name: 'W1', organic: 18000, paid: 12000 },
    { name: 'W2', organic: 22000, paid: 15000 },
    { name: 'W3', organic: 19000, paid: 18000 },
    { name: 'W4', organic: 28000, paid: 22000 },
  ],
  '90d': [
    { name: 'Jan', organic: 55000, paid: 42000 },
    { name: 'Feb', organic: 68000, paid: 51000 },
    { name: 'Mar', organic: 72000, paid: 60000 },
  ],
};

const kpiByRange: Record<string, { visitors: string; visitorsDelta: string; cr: string; crDelta: string; bounce: string; bounceDelta: string; roi: string; roiDelta: string }> = {
  '7d':  { visitors: '124.5k', visitorsDelta: '+12.5%', cr: '4.82%', crDelta: '+1.2%', bounce: '42.3%', bounceDelta: '-5.4%', roi: '324%', roiDelta: '+18.4%' },
  '30d': { visitors: '512.1k', visitorsDelta: '+8.3%',  cr: '5.10%', crDelta: '+0.8%', bounce: '39.1%', bounceDelta: '-3.2%', roi: '287%', roiDelta: '+11.2%' },
  '90d': { visitors: '1.48M',  visitorsDelta: '+22.1%', cr: '4.65%', crDelta: '-0.4%', bounce: '44.7%', bounceDelta: '+2.1%', roi: '411%', roiDelta: '+29.8%' },
};

const conversionData = [
  { name: 'Direct', value: 400, color: '#6366f1' },
  { name: 'Social', value: 300, color: '#8b5cf6' },
  { name: 'Email', value: 300, color: '#ec4899' },
  { name: 'Referral', value: 200, color: '#10b981' },
];

interface DashboardProps {
  mode?: string;
}

export const AnalyticsDashboard: React.FC<DashboardProps> = ({ mode = 'bi-exec-dashboards' }) => {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [liveView, setLiveView] = useState(false);
  const [liveCount, setLiveCount] = useState(128);
  const [toast, setToast] = useState('');
  const [chartData, setChartData] = useState(dataByRange['7d']);

  const kpi = kpiByRange[range];
  const visitorsDisplay = useCountUp(kpi.visitors, 900);
  const crDisplay = useCountUp(kpi.cr, 900);
  const bounceDisplay = useCountUp(kpi.bounce, 900);
  const roiDisplay = useCountUp(kpi.roi, 900);

  /* --- Natural Language Queries States --- */
  const [nlInput, setNlInput] = useState('');
  const [nlQueryHistory, setNlQueryHistory] = useState<{ query: string; sql: string; result: any[] }[]>([
    {
      query: 'Show me total sales group by country',
      sql: 'SELECT country, SUM(sale_price) FROM sales_logs GROUP BY country ORDER BY 2 DESC;',
      result: [
        { Country: 'United States', Sales: '$124,500' },
        { Country: 'India', Sales: '$84,200' },
        { Country: 'Germany', Sales: '$42,100' }
      ]
    }
  ]);

  /* --- KPI Targets States --- */
  const [kpiTargets, setKpiTargets] = useState([
    { name: 'Conversion Rate', actual: '3.82%', target: '4.50%', state: 'Alert Triggered', color: '#ef4444' },
    { name: 'Daily Inbound Traffic', actual: '18,400', target: '15,000', state: 'Healthy Target', color: '#10b981' },
    { name: 'Average Basket Value', actual: '$64.20', target: '$70.00', state: 'Alert Triggered', color: '#ef4444' },
  ]);

  /* --- Marketing Mix Modeling States --- */
  const [channels, setChannels] = useState([
    { name: 'Google Ads Search', spend: '$1,200', ROAS: '3.8x', recommendedSpend: '$1,500', profit: '+$3,360' },
    { name: 'Meta Core Catalog', spend: '$800', ROAS: '4.2x', recommendedSpend: '$1,000', profit: '+$2,560' },
    { name: 'TikTok Shop ads', spend: '$400', ROAS: '2.1x', recommendedSpend: '$200', profit: '+$440' }
  ]);

  /* --- Predictive Analytics States --- */
  const [predictions] = useState([
    { name: 'VIP Buyers Segment', size: '1,240 customers', likelihood: '94%', expectedValue: '$840', risk: '2.4%' },
    { name: 'Dormant Cart Abandoners', size: '4,500 customers', likelihood: '32%', expectedValue: '$45', risk: '72.1%' },
    { name: 'Recent Product Viewers', size: '12,400 customers', likelihood: '68%', expectedValue: '$180', risk: '12.8%' }
  ]);

  useEffect(() => {
    setChartData(dataByRange[range]);
  }, [range]);

  useEffect(() => {
    if (!liveView) return;
    const t = setInterval(() => {
      setLiveCount(c => c + Math.floor(Math.random() * 5 - 1));
    }, 1200);
    return () => clearInterval(t);
  }, [liveView]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }, []);

  const handleExport = () => {
    const rows = [['Channel', 'Organic', 'Paid'], ...chartData.map(d => [d.name, d.organic, d.paid])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `analytics-${range}.csv`; a.click();
    URL.revokeObjectURL(url);
    showToast('✅ Report exported successfully!');
  };

  /* Natural Language SQL generation action */
  const handleNlQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlInput.trim()) return;

    let responseSql = 'SELECT * FROM users_logs;';
    let mockData = [{ 'Record Name': 'No data found', Status: 'Empty' }];

    if (nlInput.toLowerCase().includes('sale') || nlInput.toLowerCase().includes('kamai')) {
      responseSql = 'SELECT DATE_TRUNC(\'month\', created_at), SUM(revenue) FROM sales_db GROUP BY 1;';
      mockData = [
        { Month: 'June 2026', Revenue: '$124,500' },
        { Month: 'May 2026', Revenue: '$98,400' }
      ];
    } else if (nlInput.toLowerCase().includes('traffic') || nlInput.toLowerCase().includes('visitor')) {
      responseSql = 'SELECT page_path, COUNT(session_id) FROM session_tracking GROUP BY 1 ORDER BY 2 DESC LIMIT 3;';
      mockData = [
        { 'Page Path': '/products/headphones', Visits: '45,210' },
        { 'Page Path': '/categories/watches', Visits: '22,400' }
      ];
    } else if (nlInput.toLowerCase().includes('alert') || nlInput.toLowerCase().includes('drop')) {
      responseSql = 'SELECT metric_name, current_val, target_val FROM alert_thresholds WHERE current_val < target_val;';
      mockData = [
        { Metric: 'Conversion Rate', Actual: '3.82%', Target: '4.50%' }
      ];
    }

    setNlQueryHistory(prev => [
      { query: nlInput, sql: responseSql, result: mockData },
      ...prev
    ]);
    setNlInput('');
    triggerToast('NL query processed & SQL generated.');
  };

  /* Budget re-allocation optimization */
  const optimizeMarketingMix = () => {
    setChannels(prev => prev.map(c => {
      if (c.name.includes('Google')) {
        return { ...c, spend: '$1,500', profit: '+$5,700', ROAS: '4.2x' };
      } else if (c.name.includes('Meta')) {
        return { ...c, spend: '$1,000', profit: '+$4,200', ROAS: '4.5x' };
      } else if (c.name.includes('TikTok')) {
        return { ...c, spend: '$200', profit: '+$320', ROAS: '2.6x' };
      }
      return c;
    }));
    triggerToast('Ad budget redistributed for maximum ROAS yield.');
  };

  const renderActiveModeComponent = () => {
    switch (mode) {
      /* ─── 2. KPI MONITORING ─── */
      case 'bi-kpi':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: '0 0 4px' }}>Target KPI Alert Console</h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Jab important numbers target se neeche jaate hain, system alerts bhej deta hai</p>
                </div>
                <button style={btnStyle} onClick={() => triggerToast('All KPI logs validated.')}>Validate Thresholds</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {kpiTargets.map((kt, i) => (
                  <div key={i} style={{ ...metaCardStyle, borderLeft: `4px solid ${kt.color}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>{kt.name}</div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                        Actual: <strong style={{ color: '#ffffff' }}>{kt.actual}</strong> · Target Floor: <strong style={{ color: '#8b5cf6' }}>{kt.target}</strong>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={badgeStyle(kt.state.includes('Alert') ? '#ef4444' : '#10b981')}>{kt.state}</span>
                      {kt.state.includes('Alert') && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444', fontSize: '11px', marginTop: '6px', fontWeight: 600 }}>
                          <AlertTriangle size={12} /> Target deficit!
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Set thresholds form */}
            <div style={cardStyle}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', margin: 0 }}>Configure Threshold Rules</h4>
              <form onSubmit={e => { e.preventDefault(); triggerToast('KPI target triggers updated.'); }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: '12px', alignItems: 'end' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Target Metric</label>
                  <select style={selectStyle}>
                    <option>Conversion Rate</option><option>Average Basket Value</option><option>Active User Sessions</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Alert Operator</label>
                  <select style={selectStyle}>
                    <option>Falls Below (&lt;)</option><option>Exceeds (&gt;)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Threshold Target Value</label>
                  <input style={inputStyle} placeholder="e.g. 4.5%" />
                </div>
                <button type="submit" style={{ ...btnStyle, height: '38px' }}>Add Alert Rule</button>
              </form>
            </div>
          </div>
        );

      /* ─── 4. MARKETING MIX MODELING ─── */
      case 'bi-marketing-mix':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: '0 0 4px' }}>Marketing Mix Modeling (ROAS Compare)</h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Google, Meta, TikTok — har channel pe kharch kiye paise ka return (ROAS) compare karna</p>
                </div>
                <button style={btnStyle} onClick={optimizeMarketingMix}>
                  <Brain size={14} /> Optimize Budget Allocation
                </button>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Ad Channel</th>
                    <th style={thStyle}>Current Spend</th>
                    <th style={thStyle}>Measured ROAS</th>
                    <th style={thStyle}>AI Recommended Spend</th>
                    <th style={thStyle}>Projected Profit Lift</th>
                  </tr>
                </thead>
                <tbody>
                  {channels.map((c, i) => (
                    <tr key={i}>
                      <td style={{ ...tdStyle, color: '#ffffff', fontWeight: 600 }}>{c.name}</td>
                      <td style={tdStyle}><code>{c.spend}</code></td>
                      <td style={{ ...tdStyle, color: '#10b981', fontWeight: 700 }}>{c.ROAS}</td>
                      <td style={tdStyle}><code style={{ color: '#a855f7' }}>{c.recommendedSpend}</code></td>
                      <td style={{ ...tdStyle, color: '#10b981', fontWeight: 700 }}>{c.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      /* ─── 6. PREDICTIVE ANALYTICS ─── */
      case 'bi-predictive':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={cardStyle}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: '0 0 4px' }}>Predictive Purchase Cohorts</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Chuni hui customer list ke kharidne ke chances predict karna</p>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Target Customer Cohort</th>
                    <th style={thStyle}>Segment Size</th>
                    <th style={thStyle}>Purchase Likelihood</th>
                    <th style={thStyle}>Expected Value (AOV)</th>
                    <th style={thStyle}>Predicted Churn Risk</th>
                    <th style={thStyle}>Action Trigger</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((p, i) => (
                    <tr key={i}>
                      <td style={{ ...tdStyle, color: '#ffffff', fontWeight: 600 }}>{p.name}</td>
                      <td style={tdStyle}>{p.size}</td>
                      <td style={{ ...tdStyle, color: '#10b981', fontWeight: 700 }}>{p.likelihood}</td>
                      <td style={tdStyle}>{p.expectedValue}</td>
                      <td style={{ ...tdStyle, color: '#ef4444' }}>{p.risk}</td>
                      <td style={tdStyle}>
                        <button style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => triggerToast(`Campaign dispatched to ${p.name}`)}>Launch Campaign</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      /* ─── 8. NATURAL LANGUAGE ANALYTICS ─── */
      case 'bi-nl-analytics':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={cardStyle}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: '0 0 4px' }}>Natural Language Query SQL Engine</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Aap simple English/Hindi me sawal poochte ho, ye SQL query bana kar jawab deta hai</p>
              </div>

              <form onSubmit={handleNlQuery} style={{ display: 'flex', gap: '10px' }}>
                <input
                  style={inputStyle}
                  value={nlInput}
                  onChange={e => setNlInput(e.target.value)}
                  placeholder="e.g., Pichle mahine ki total ad sale ya traffic dikhao (Type in English/Hindi)"
                />
                <button type="submit" style={btnStyle}>
                  <Send size={14} /> Ask SQL
                </button>
              </form>

              {/* Console log outputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                {nlQueryHistory.map((h, i) => (
                  <div key={i} style={metaCardStyle}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#a855f7', fontWeight: 600, fontSize: '13px', marginBottom: '8px' }}>
                      <Sparkles size={14} /> Question: "{h.query}"
                    </div>
                    <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '10px', fontFamily: 'monospace', fontSize: '12px', color: '#9ca3af', marginBottom: '10px', overflowX: 'auto' }}>
                      <code>{h.sql}</code>
                    </div>
                    {/* Mock Result Table */}
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>SQL EXECUTION RESPONSE RESULT:</div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                      <thead>
                        <tr>
                          {Object.keys(h.result[0] || {}).map(k => <th key={k} style={{ ...thStyle, padding: '6px 8px' }}>{k}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {h.result.map((row, idx) => (
                          <tr key={idx}>
                            {Object.values(row).map((v: any, vidx) => <td key={vidx} style={{ ...tdStyle, padding: '8px', color: '#ffffff' }}>{v}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      /* ─── 1. EXECUTIVE DASHBOARD (DEFAULT) ─── */
      case 'bi-exec-dashboards':
      default:
        return (
          <>
            {/* KPI Cards */}
            <div className="stats-grid">
              {[
                { label: 'Total Visitors', val: visitorsDisplay, delta: kpi.visitorsDelta, icon: <Users size={18}/>, color: 'var(--primary)', bg: 'var(--primary-light)', positive: true },
                { label: 'Avg. Conversion Rate', val: crDisplay, delta: kpi.crDelta, icon: <Target size={18}/>, color: 'var(--accent)', bg: 'var(--accent-light)', positive: true },
                { label: 'Bounce Rate', val: bounceDisplay, delta: kpi.bounceDelta, icon: <MousePointerClick size={18}/>, color: 'var(--danger)', bg: 'var(--danger-light)', positive: kpi.bounceDelta.startsWith('-') },
                { label: 'AI Predicted ROI', val: roiDisplay, delta: kpi.roiDelta, icon: <Zap size={18}/>, color: 'var(--info)', bg: 'var(--info-light)', positive: true },
              ].map((k, i) => (
                <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 500 }}>{k.label}</span>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: k.color }}>{k.icon}</div>
                  </div>
                  <div>
                    <h2 style={{ fontSize: '28px', fontWeight: 700, margin: '4px 0 0 0', letterSpacing: '-0.5px' }}>{k.val}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginTop: '6px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', color: k.positive ? 'var(--success)' : 'var(--danger)' }}>
                        {k.positive ? <TrendingUp size={14} style={{ marginRight: '2px' }}/> : <TrendingDown size={14} style={{ marginRight: '2px' }}/>} {k.delta}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>vs prev period</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="analytics-chart-grid">
              <div className="glass-card" style={{ height: '380px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Traffic Overview</h2>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '12px', fontWeight: 500 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} /> Organic</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} /> Paid</span>
                  </div>
                </div>
                <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorOrg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
                        <linearGradient id="colorPd2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/><stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false}/>
                      <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false}/>
                      <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false}/>
                      <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }}/>
                      <Area type="monotone" dataKey="organic" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorOrg2)"/>
                      <Area type="monotone" dataKey="paid" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorPd2)"/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="glass-card" style={{ height: '380px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Conversions by Channel</h2>
                <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={conversionData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal vertical={false}/>
                      <XAxis type="number" stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false}/>
                      <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} width={60}/>
                      <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }}/>
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                        {conversionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)' }}>
                <Zap size={18}/><h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>AI Generated Insights</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
                  <Activity size={14} color="var(--success)"/>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Updated {range === '7d' ? '2 mins' : range === '30d' ? '1 hour' : '4 hours'} ago</span>
                </div>
              </div>
              <div className="grid-cols-3" style={{ gap: '16px' }}>
                <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--accent)' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 8px 0' }}>Anomalous Spike in Paid Traffic</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>We detected a 45% increase in paid traffic from Google Ads. Corresponding conversions remained flat. Consider reviewing keyword intent.</p>
                </div>
                <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--success)' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 8px 0' }}>Social Media ROI Improved</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Your LinkedIn campaign cost per acquisition dropped by $12.50 over the last 48 hours, signaling an optimized creative set.</p>
                </div>
                <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 8px 0' }}>Predicted Trend</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Based on historical data, organic traffic is expected to dip this weekend. Suggest scheduling email blasts on Friday afternoon to compensate.</p>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--success)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--success)' }}>
          {toast}
        </div>
      )}

      {/* Header Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)', border: '1px solid rgba(99, 102, 241, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
            {mode === 'bi-kpi' ? 'KPI Threshold Monitor' : mode === 'bi-marketing-mix' ? 'Marketing Mix Models' : mode === 'bi-predictive' ? 'Predictive LTV Analytics' : mode === 'bi-nl-analytics' ? 'SQL Query NLP Generator' : 'Executive Business Analytics'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>AI-driven insights into your cross-channel marketing performance and user behavior.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Date Range */}
          {mode === 'bi-exec-dashboards' && (
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              {(['7d', '30d', '90d'] as const).map(r => (
                <button key={r} onClick={() => setRange(r)} style={{ padding: '7px 14px', fontSize: '12px', fontWeight: 600, background: range === r ? 'var(--primary)' : 'none', color: range === r ? '#fff' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {r === '7d' ? '7D' : r === '30d' ? '30D' : '90D'}
                </button>
              ))}
            </div>
          )}
          <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: liveView ? 'var(--danger)' : 'var(--text-primary)', borderColor: liveView ? 'var(--danger)' : 'var(--border-color)' }} onClick={() => setLiveView(v => !v)}>
            <Radio size={14} style={{ animation: liveView ? 'pulse 1s infinite' : 'none' }} />
            {liveView ? `Live Viewers: ${liveCount}` : 'Live Status'}
          </button>
          <button className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={handleExport}>
            Export CSV <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {renderActiveModeComponent()}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .analytics-chart-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
        }
        @media (max-width: 900px) {
          .analytics-chart-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

/* Count up custom animation utility hook helper */
function useCountUp(target: string, duration = 1000) {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) { setDisplay(target); return; }
    const suffix = target.replace(/[0-9.]/g, '');
    let start = 0;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setDisplay(target); clearInterval(timer); return; }
      setDisplay((suffix.includes('k') || suffix.includes('M') || suffix.includes('%'))
        ? `${start.toFixed(start < 10 ? 1 : 0)}${suffix}`
        : `${Math.round(start)}`);
    }, 16);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return display;
}
