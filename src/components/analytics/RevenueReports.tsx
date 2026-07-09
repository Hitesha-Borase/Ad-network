import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { DollarSign, Download, Filter, TrendingUp, ChevronUp, ChevronDown, RefreshCw, Sparkles, Sliders } from 'lucide-react';

const dataByPeriod: Record<string, { label: string; arr: string; mrr: string; ads: string; data: { period: string; recurring: number; oneTime: number; ads: number }[] }> = {
  monthly: {
    label: 'Monthly (H1 2026)',
    arr: '$1,420,000', mrr: '$118,333', ads: '$45,210',
    data: [
      { period: 'Jan', recurring: 12000, oneTime: 3000, ads: 4000 },
      { period: 'Feb', recurring: 14000, oneTime: 3500, ads: 4200 },
      { period: 'Mar', recurring: 15500, oneTime: 2000, ads: 5000 },
      { period: 'Apr', recurring: 17000, oneTime: 4000, ads: 5500 },
      { period: 'May', recurring: 19000, oneTime: 3000, ads: 6000 },
      { period: 'Jun', recurring: 22000, oneTime: 4500, ads: 7000 },
    ],
  },
  quarterly: {
    label: 'Quarterly (2026)',
    arr: '$1,840,000', mrr: '$153,333', ads: '$62,100',
    data: [
      { period: 'Q1', recurring: 41500, oneTime: 8500, ads: 13200 },
      { period: 'Q2', recurring: 58000, oneTime: 11500, ads: 18500 },
      { period: 'Q3', recurring: 71000, oneTime: 14200, ads: 23100 },
      { period: 'Q4', recurring: 88000, oneTime: 18000, ads: 29400 },
    ],
  },
  yearly: {
    label: 'Yearly (2023-2026)',
    arr: '$4,200,000', mrr: '$350,000', ads: '$188,400',
    data: [
      { period: '2023', recurring: 180000, oneTime: 42000, ads: 28000 },
      { period: '2024', recurring: 320000, oneTime: 68000, ads: 45000 },
      { period: '2025', recurring: 520000, oneTime: 92000, ads: 78000 },
      { period: '2026', recurring: 850000, oneTime: 142000, ads: 118000 },
    ],
  },
};

type SortKey = 'date' | 'name' | 'amount' | 'status';
type SortDir = 'asc' | 'desc';

const allTransactions = [
  { date: 'Jul 9, 2026', name: 'Acme Corp', type: 'Annual Subscription', amount: 12000, status: 'Paid' },
  { date: 'Jul 9, 2026', name: 'Google AdX', type: 'Publisher Payout', amount: 4250, status: 'Pending' },
  { date: 'Jul 8, 2026', name: 'Stark Industries', type: 'Consulting Retainer', amount: 3500, status: 'Paid' },
  { date: 'Jul 8, 2026', name: 'Wayne Enterprises', type: 'Monthly Subscription', amount: 1000, status: 'Failed' },
  { date: 'Jul 7, 2026', name: 'Parker Solutions', type: 'One-Time Setup', amount: 5500, status: 'Paid' },
  { date: 'Jul 6, 2026', name: 'Umbrella Corp', type: 'Enterprise License', amount: 24000, status: 'Paid' },
];

export const RevenueReports: React.FC = () => {
  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [toast, setToast] = useState('');

  /* --- Revenue Forecasting States --- */
  const [growthRate, setGrowthRate] = useState(12); // Growth rate in percentage
  const [forecastMonths, setForecastMonths] = useState(6);

  const p = dataByPeriod[period];

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const sorted = [...allTransactions].sort((a, b) => {
    let av: string | number = a[sortKey === 'date' ? 'date' : sortKey === 'name' ? 'name' : sortKey === 'amount' ? 'amount' : 'status'];
    let bv: string | number = b[sortKey === 'date' ? 'date' : sortKey === 'name' ? 'name' : sortKey === 'amount' ? 'amount' : 'status'];
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const handleExport = () => {
    const rows = [['Date','Customer','Type','Amount','Status'], ...sorted.map(r => [r.date, r.name, r.type, `$${r.amount}`, r.status])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `revenue-${period}.csv`; a.click();
    URL.revokeObjectURL(url);
    showToast('✅ Revenue report exported!');
  };

  /* Generate dynamic forecasting points */
  const forecastData = React.useMemo(() => {
    const lastItem = p.data[p.data.length - 1];
    let baseVal = lastItem ? lastItem.recurring + lastItem.oneTime + lastItem.ads : 30000;
    const list = p.data.map(item => ({
      period: item.period,
      Revenue: item.recurring + item.oneTime + item.ads,
      type: 'Actual'
    }));

    for (let i = 1; i <= forecastMonths; i++) {
      const nextVal = baseVal * (1 + (growthRate / 100) * i);
      list.push({
        period: `F+${i}`,
        Revenue: Math.round(nextVal),
        type: 'Forecast'
      });
    }
    return list;
  }, [p, growthRate, forecastMonths]);

  const SortIcon = ({ col }: { col: SortKey }) => sortKey === col
    ? (sortDir === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)
    : <ChevronDown size={12} style={{ opacity: 0.3 }}/>;

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {toast && <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--success)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--success)' }}>{toast}</div>}

      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={22} color="var(--success)"/> Revenue Analytics &amp; Forecasting
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>Detailed breakdown of your recurring, one-time, and ad revenue streams with AI projections.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
            {(['monthly','quarterly','yearly'] as const).map(opt => (
              <button key={opt} onClick={() => setPeriod(opt)} style={{ padding: '7px 10px', fontSize: '12px', fontWeight: 600, background: period === opt ? 'var(--success)' : 'none', color: period === opt ? '#fff' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', textTransform: 'capitalize' }}>{opt}</button>
            ))}
          </div>
          <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => showToast('📊 Filters applied')}><Filter size={14}/> Filters</button>
          <button className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={handleExport}><Download size={14}/> Export</button>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        {[
          { label: 'Total ARR', val: p.arr, delta: '+24% YoY' },
          { label: 'MRR Growth', val: p.mrr, delta: '+5.2% MoM' },
          { label: 'Ad Revenue', val: p.ads, delta: '+12% MoM' },
        ].map((k, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 500 }}>{k.label}</div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>{k.val}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--success)' }}>
              <TrendingUp size={14}/> {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Forecasting Simulator */}
      <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="var(--success)" /> AI Revenue Forecasting Projections
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Target Period: next {forecastMonths} intervals</span>
          </div>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="period" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="Revenue" stroke="var(--success)" strokeWidth={3} dot={{ fill: 'var(--success)' }} name="Projected Revenue Stream" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: '1px solid var(--border-color)', paddingLeft: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sliders size={14} color="var(--primary)" /> Forecast Parameters
          </h3>
          <div>
            <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Target Growth Rate: <strong style={{ color: '#ffffff' }}>{growthRate}%</strong></label>
            <input type="range" min="0" max="100" value={growthRate} onChange={e => setGrowthRate(parseInt(e.target.value))} style={{ width: '100%', cursor: 'pointer' }} />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Forecast Steps: <strong style={{ color: '#ffffff' }}>{forecastMonths} intervals</strong></label>
            <input type="range" min="1" max="12" value={forecastMonths} onChange={e => setForecastMonths(parseInt(e.target.value))} style={{ width: '100%', cursor: 'pointer' }} />
          </div>
          <button className="btn btn-primary btn-sm" style={{ marginTop: 'auto' }} onClick={() => triggerToast('Projections calculated based on historical trend weights.')}>
            <RefreshCw size={12} /> Recalculate Projections
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ height: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Revenue by Source ({p.label})</h2>
        <div style={{ flex: 1, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={p.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false}/>
              <XAxis dataKey="period" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false}/>
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false}/>
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }}/>
              <Legend wrapperStyle={{ fontSize: '12px' }}/>
              <Bar dataKey="recurring" name="Recurring Revenue" stackId="a" fill="var(--primary)" radius={[0,0,4,4]}/>
              <Bar dataKey="oneTime" name="One-Time Sales" stackId="a" fill="var(--accent)"/>
              <Bar dataKey="ads" name="Ad Revenue" stackId="a" fill="var(--success)" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Recent Transactions</h2>
        <div className="table-responsive-wrapper">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                {([['date','Date'],['name','Customer'],['amount','Amount'],['status','Status']] as [SortKey,string][]).map(([key, label]) => (
                  <th key={key} onClick={() => handleSort(key)} style={{ padding: '12px 8px', fontWeight: 500, cursor: 'pointer', userSelect: 'none' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>{label} <SortIcon col={key}/></span>
                  </th>
                ))}
                <th style={{ padding: '12px 8px', fontWeight: 500 }}>Type</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="table-row-hover">
                  <td style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>{row.date}</td>
                  <td style={{ padding: '12px 8px', fontWeight: 500 }}>{row.name}</td>
                  <td style={{ padding: '12px 8px', fontWeight: 700 }}>${row.amount.toLocaleString()}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, backgroundColor: row.status === 'Paid' ? 'var(--success-light)' : row.status === 'Pending' ? 'var(--info-light)' : 'rgba(239,68,68,0.1)', color: row.status === 'Paid' ? 'var(--success)' : row.status === 'Pending' ? 'var(--info)' : 'var(--danger)' }}>{row.status}</span>
                  </td>
                  <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <style>{`.table-row-hover:hover{background:rgba(255,255,255,0.02)}`}</style>
      </div>
    </div>
  );
};
