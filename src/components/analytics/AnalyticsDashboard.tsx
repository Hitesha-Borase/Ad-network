import React, { useState, useEffect, useCallback } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Users, MousePointerClick, TrendingUp, TrendingDown, ArrowUpRight, Zap, Target, Activity, Radio } from 'lucide-react';

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

const RANGES = ['7d', '30d', '90d'] as const;
type Range = typeof RANGES[number];

export const AnalyticsDashboard: React.FC = () => {
  const [range, setRange] = useState<Range>('7d');
  const [liveView, setLiveView] = useState(false);
  const [liveCount, setLiveCount] = useState(128);
  const [toast, setToast] = useState('');
  const [chartData, setChartData] = useState(dataByRange['7d']);

  const kpi = kpiByRange[range];

  const visitorsDisplay = useCountUp(kpi.visitors, 900);
  const crDisplay = useCountUp(kpi.cr, 900);
  const bounceDisplay = useCountUp(kpi.bounce, 900);
  const roiDisplay = useCountUp(kpi.roi, 900);

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
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>Executive Analytics</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>AI-driven insights into your cross-channel marketing performance and user behavior.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Date Range */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
            {RANGES.map(r => (
              <button key={r} onClick={() => setRange(r)} style={{ padding: '7px 14px', fontSize: '12px', fontWeight: 600, background: range === r ? 'var(--primary)' : 'none', color: range === r ? '#fff' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                {r === '7d' ? '7D' : r === '30d' ? '30D' : '90D'}
              </button>
            ))}
          </div>
          <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: liveView ? 'var(--danger)' : 'var(--text-primary)', borderColor: liveView ? 'var(--danger)' : 'var(--border-color)' }} onClick={() => setLiveView(v => !v)}>
            <Radio size={14} style={{ animation: liveView ? 'pulse 1s infinite' : 'none' }} />
            {liveView ? `Live: ${liveCount}` : 'Live'}
          </button>
          <button className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={handleExport}>
            Export <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

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
