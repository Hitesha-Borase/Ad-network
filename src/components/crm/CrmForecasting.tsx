import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, TrendingUp } from 'lucide-react';

const forecastData = [
  { name: 'Q1 26 (Act)', revenue: 120000, project: 120000 },
  { name: 'Q2 26 (Act)', revenue: 155000, project: 155000 },
  { name: 'Q3 26 (Est)', revenue: null, project: 190000 },
  { name: 'Q4 26 (Est)', revenue: null, project: 240000 },
  { name: 'Q1 27 (Est)', revenue: null, project: 310000 }
];

export const CrmForecasting: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      {/* Top Banner AI Prediction */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px'
      }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>AI forecasting projections active</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Projections calculated based on active pipeline win rates and lead scores metrics.</span>
          </div>
        </div>
      </div>

      <div className="responsive-layout">
        {/* Forecast Chart */}
        <div className="glass-card" style={{ height: '360px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Revenue Projections (Actual vs. Forecast)</h2>
          <div style={{ flex: 1, width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="project" stroke="var(--accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorForecast)" name="Projected" />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} fillOpacity={0} name="Actual" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Forecast Stats card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Growth Predictions</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px' }}>
            <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>ESTIMATED Q4 REVENUE</span>
              <strong style={{ fontSize: '18px', color: '#fff' }}>$240,000</strong>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>YOY GROWTH ANGLE</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={18} /> +34.5%
              </span>
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>Factors considered:</span>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Q3 Pipeline conversion rates</li>
                <li>Historic seasonal holiday ad-buys trends</li>
                <li>Expansion coefficient on existing accounts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
