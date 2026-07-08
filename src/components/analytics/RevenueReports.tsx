import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, Download, Filter, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';

const dataByPeriod: Record<string, { label: string; arr: string; mrr: string; ads: string; data: { period: string; recurring: number; oneTime: number; ads: number }[] }> = {
  monthly: {
    label: 'Monthly (H1 2024)',
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
    label: 'Quarterly (2024)',
    arr: '$1,840,000', mrr: '$153,333', ads: '$62,100',
    data: [
      { period: 'Q1', recurring: 41500, oneTime: 8500, ads: 13200 },
      { period: 'Q2', recurring: 58000, oneTime: 11500, ads: 18500 },
      { period: 'Q3', recurring: 71000, oneTime: 14200, ads: 23100 },
      { period: 'Q4', recurring: 88000, oneTime: 18000, ads: 29400 },
    ],
  },
  yearly: {
    label: 'Yearly (2021-2024)',
    arr: '$4,200,000', mrr: '$350,000', ads: '$188,400',
    data: [
      { period: '2021', recurring: 180000, oneTime: 42000, ads: 28000 },
      { period: '2022', recurring: 320000, oneTime: 68000, ads: 45000 },
      { period: '2023', recurring: 520000, oneTime: 92000, ads: 78000 },
      { period: '2024', recurring: 850000, oneTime: 142000, ads: 118000 },
    ],
  },
};

type SortKey = 'date' | 'name' | 'amount' | 'status';
type SortDir = 'asc' | 'desc';

const allTransactions = [
  { date: 'Oct 24, 2024', name: 'Acme Corp', type: 'Annual Subscription', amount: 12000, status: 'Paid' },
  { date: 'Oct 24, 2024', name: 'Google AdX', type: 'Publisher Payout', amount: 4250, status: 'Pending' },
  { date: 'Oct 23, 2024', name: 'Stark Industries', type: 'Consulting Retainer', amount: 3500, status: 'Paid' },
  { date: 'Oct 22, 2024', name: 'Wayne Enterprises', type: 'Monthly Subscription', amount: 1000, status: 'Failed' },
  { date: 'Oct 21, 2024', name: 'Parker Solutions', type: 'One-Time Setup', amount: 5500, status: 'Paid' },
  { date: 'Oct 20, 2024', name: 'Umbrella Corp', type: 'Enterprise License', amount: 24000, status: 'Paid' },
];

export const RevenueReports: React.FC = () => {
  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [toast, setToast] = useState('');

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

  const SortIcon = ({ col }: { col: SortKey }) => sortKey === col
    ? (sortDir === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)
    : <ChevronDown size={12} style={{ opacity: 0.3 }}/>;

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {toast && <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--success)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--success)' }}>{toast}</div>}

      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={22} color="var(--success)"/> Revenue Analytics
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>Detailed breakdown of your recurring, one-time, and ad revenue streams.</p>
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

      <div className="glass-card" style={{ height: '380px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
