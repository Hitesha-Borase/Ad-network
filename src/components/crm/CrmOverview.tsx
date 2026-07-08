import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { DollarSign, Percent, Briefcase, UserCheck, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

const revenueData = [
  { name: 'Jan', revenue: 42000 },
  { name: 'Feb', revenue: 55000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 70000 },
  { name: 'May', revenue: 85000 },
  { name: 'Jun', revenue: 110000 }
];

const sourceData = [
  { name: 'Google Ads', value: 45, color: '#6366f1' },
  { name: 'Organic SEO', value: 30, color: '#10b981' },
  { name: 'LinkedIn', value: 15, color: '#0ea5e9' },
  { name: 'Referral', value: 10, color: '#f59e0b' }
];

const activities = [
  { id: 1, type: 'deal', user: 'Alex Mercer', action: 'moved deal Acme Corp to Negotiation', time: '12m ago', val: '$45,000' },
  { id: 2, type: 'lead', user: 'Jane Foster', action: 'added new lead Robert Downey', time: '45m ago', val: null },
  { id: 3, type: 'call', user: 'John Doe', action: 'completed demo call with Stark Industries', time: '2h ago', val: null },
  { id: 4, type: 'invoice', user: 'System', action: 'generated Invoice #INV-8802', time: '4h ago', val: '$12,500' }
];

export const CrmOverview: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      {/* Top Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
      }}>
        <div>
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
            CRM & Sales Overview
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Real-time pipeline tracking, deal status forecasting, and sales agent performance.
          </p>
        </div>
        <div style={{
          padding: '10px 16px',
          borderRadius: '8px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          fontSize: '13px',
          fontWeight: 500,
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
          Q3 Active Period
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-cols-4">
        {/* KPI 1 */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 500 }}>Total Revenue</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, margin: '4px 0 0 0', letterSpacing: '-0.5px' }}>$410,000</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginTop: '6px' }}>
              <span style={{ display: 'flex', alignItems: 'center', color: 'var(--success)' }}>
                <TrendingUp size={14} style={{ marginRight: '2px' }} /> +18.2%
              </span>
              <span style={{ color: 'var(--text-muted)' }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 500 }}>Win Rate</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
              <Percent size={18} />
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, margin: '4px 0 0 0', letterSpacing: '-0.5px' }}>64.8%</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginTop: '6px' }}>
              <span style={{ display: 'flex', alignItems: 'center', color: 'var(--success)' }}>
                <TrendingUp size={14} style={{ marginRight: '2px' }} /> +3.1%
              </span>
              <span style={{ color: 'var(--text-muted)' }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 500 }}>Pipeline Value</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
              <Briefcase size={18} />
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, margin: '4px 0 0 0', letterSpacing: '-0.5px' }}>$1,240,000</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginTop: '6px' }}>
              <span style={{ display: 'flex', alignItems: 'center', color: 'var(--danger)' }}>
                <TrendingDown size={14} style={{ marginRight: '2px' }} /> -2.4%
              </span>
              <span style={{ color: 'var(--text-muted)' }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 500 }}>Active Deals</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--info-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--info)' }}>
              <UserCheck size={18} />
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, margin: '4px 0 0 0', letterSpacing: '-0.5px' }}>124</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginTop: '6px' }}>
              <span style={{ display: 'flex', alignItems: 'center', color: 'var(--success)' }}>
                <TrendingUp size={14} style={{ marginRight: '2px' }} /> +12.4%
              </span>
              <span style={{ color: 'var(--text-muted)' }}>vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="responsive-layout">
        {/* Sales Area Chart */}
        <div className="glass-card" style={{ height: '380px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Monthly Revenue Growth</h2>
          <div style={{ flex: 1, width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }} 
                  labelStyle={{ fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Distribution */}
        <div className="glass-card" style={{ height: '380px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Lead Sources</h2>
          <div style={{ flex: 1, width: '100%', height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {sourceData.map(item => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }}></span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                </div>
                <span style={{ fontWeight: 600 }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Recent Activity Ledger</h2>
          <button style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            View All Audit Logs <ArrowUpRight size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activities.map(act => (
            <div key={act.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.01)',
              border: '1px solid var(--border-color)',
              fontSize: '13.5px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: act.type === 'deal' ? 'var(--primary)' : act.type === 'lead' ? 'var(--accent)' : act.type === 'call' ? 'var(--info)' : 'var(--success)'
                }}></div>
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{act.user}</span>{' '}
                  <span style={{ color: 'var(--text-secondary)' }}>{act.action}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {act.val && (
                  <span style={{
                    fontWeight: 600,
                    color: 'var(--success)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--success-light)',
                    fontSize: '12px'
                  }}>
                    {act.val}
                  </span>
                )}
                <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
