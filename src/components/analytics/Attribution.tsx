import React, { useState } from 'react';
import { Target, Share2, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Model = 'data-driven' | 'first-touch' | 'last-touch' | 'linear' | 'time-decay';

const modelData: Record<Model, {
  label: string; cac: string; touchpoints: string; topChannel: string; topChannelPct: string;
  data: { name: string; value: number }[];
}> = {
  'data-driven': {
    label: 'Data-Driven (AI Recommended)', cac: '$142.50', touchpoints: '4.2', topChannel: 'Organic Social', topChannelPct: '35%',
    data: [
      { name: 'Direct', value: 310 }, { name: 'Organic', value: 480 }, { name: 'Paid Search', value: 390 }, { name: 'Social', value: 360 }, { name: 'Email', value: 240 },
    ],
  },
  'first-touch': {
    label: 'First Touch', cac: '$189.20', touchpoints: '4.2', topChannel: 'Paid Search', topChannelPct: '42%',
    data: [
      { name: 'Direct', value: 200 }, { name: 'Organic', value: 500 }, { name: 'Paid Search', value: 300 }, { name: 'Social', value: 400 }, { name: 'Email', value: 100 },
    ],
  },
  'last-touch': {
    label: 'Last Touch', cac: '$128.80', touchpoints: '4.2', topChannel: 'Email', topChannelPct: '38%',
    data: [
      { name: 'Direct', value: 400 }, { name: 'Organic', value: 300 }, { name: 'Paid Search', value: 450 }, { name: 'Social', value: 200 }, { name: 'Email', value: 350 },
    ],
  },
  'linear': {
    label: 'Linear (Equal Credit)', cac: '$160.10', touchpoints: '4.2', topChannel: 'Organic Search', topChannelPct: '28%',
    data: [
      { name: 'Direct', value: 280 }, { name: 'Organic', value: 420 }, { name: 'Paid Search', value: 350 }, { name: 'Social', value: 310 }, { name: 'Email', value: 270 },
    ],
  },
  'time-decay': {
    label: 'Time Decay', cac: '$135.60', touchpoints: '4.2', topChannel: 'Email', topChannelPct: '41%',
    data: [
      { name: 'Direct', value: 350 }, { name: 'Organic', value: 260 }, { name: 'Paid Search', value: 410 }, { name: 'Social', value: 190 }, { name: 'Email', value: 410 },
    ],
  },
};

const MODEL_KEYS = Object.keys(modelData) as Model[];

export const Attribution: React.FC = () => {
  const [model, setModel] = useState<Model>('data-driven');
  const m = modelData[model];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)', border: '1px solid rgba(168, 85, 247, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={24} color="var(--accent)"/> Multi-Touch Attribution
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Understand the true ROI of your channels using AI-driven attribution models.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select
            value={model}
            onChange={e => setModel(e.target.value as Model)}
            style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '9px 14px', color: '#fff', fontSize: '13px', cursor: 'pointer', minWidth: '220px' }}
          >
            {MODEL_KEYS.map(k => <option key={k} value={k} style={{ backgroundColor: '#1a1f2e' }}>{modelData[k].label}</option>)}
          </select>
        </div>
      </div>

      {/* Model description badge */}
      <div style={{ padding: '12px 20px', borderRadius: '8px', backgroundColor: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.2)', fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Target size={16} color="var(--accent)"/>
        <span>Active model: <strong style={{ color: 'var(--accent)' }}>{m.label}</strong> — credits conversion value across touchpoints in the customer journey.</span>
      </div>

      <div className="grid-cols-3">
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 500 }}>Customer Acquisition Cost (CAC)</div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>{m.cac}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--success)' }}><TrendingUp size={14}/> -12% vs last month</div>
        </div>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 500 }}>Avg. Touchpoints to Conversion</div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>{m.touchpoints}</h2>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Across 2.1 unique channels</div>
        </div>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 500 }}>Top Assisting Channel</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Share2 size={20}/>
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>{m.topChannel}</h2>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Generated {m.topChannelPct} of assisted conversions</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Conversions by Channel — {m.label}</h2>
        </div>
        <div style={{ height: '360px', width: '100%', marginTop: '8px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={m.data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false}/>
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false}/>
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false}/>
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }}/>
              <Bar dataKey="value" name="Attributed Conversions" fill="var(--accent)" radius={[6,6,0,0]}>
                {m.data.map((_, i) => {
                  const colors = ['#6366f1','#8b5cf6','#a855f7','#d946ef','#ec4899'];
                  return <rect key={i} fill={colors[i % colors.length]}/>;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
