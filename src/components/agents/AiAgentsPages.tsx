import React, { useState, useEffect, useCallback } from 'react';
import { 
  Brain, Search, Sparkles, TrendingUp, Cpu, Users, BarChart3, 
  ShieldCheck, AlertTriangle, MessageSquare, Terminal, Settings, 
  Play, RefreshCw, Layers, Layout, Landmark, CheckCircle, Ban, 
  FileText, Calendar, Edit3, Eye, Zap, Database, Server
} from 'lucide-react';

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

/* ─── ProgressBar ───────────────────────────────────────────────── */
const ProgressBar: React.FC<{ pct: number; color: string }> = ({ pct, color }) => (
  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '4px', height: '6px', width: '100%', overflow: 'hidden' }}>
    <div style={{ width: `${Math.min(pct, 100)}%`, background: color, height: '100%', borderRadius: '4px', transition: 'width 0.6s ease' }} />
  </div>
);

/* ─── Base Agent Template ───────────────────────────────────────── */
interface AgentWrapperProps {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  metrics: { label: string; value: string; color?: string }[];
  initialLogs: { time: string; msg: string; type: 'success' | 'warning' | 'info' }[];
  children?: React.ReactNode;
}

const AgentWrapper: React.FC<AgentWrapperProps> = ({
  id,
  name,
  desc,
  icon,
  metrics,
  initialLogs,
  children
}) => {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState(initialLogs);
  const [systemPrompt, setSystemPrompt] = useState(`Focus: Optimize ${name} workflows autonomously based on telemetry data.`);
  const [editPromptModal, setEditPromptModal] = useState(false);

  useEffect(() => {
    const handlePri = () => {
      setRunning(true);
      setTimeout(() => {
        setRunning(false);
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [
          { time, msg: `Autonomous execution completed for ${name}.`, type: 'success' },
          ...prev
        ]);
        triggerToast(`${name} run successfully completed.`);
      }, 1500);
    };

    const handleSec = () => {
      setEditPromptModal(true);
    };

    window.addEventListener(`agent-pri-agent-${id}`, handlePri);
    window.addEventListener(`agent-sec-agent-${id}`, handleSec);

    return () => {
      window.removeEventListener(`agent-pri-agent-${id}`, handlePri);
      window.removeEventListener(`agent-sec-agent-${id}`, handleSec);
    };
  }, [id, name]);

  const handleManualRun = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      const time = new Date().toLocaleTimeString();
      setLogs(prev => [
        { time, msg: `Manual trigger: Executed successfully. Target parameters optimized.`, type: 'success' },
        ...prev
      ]);
      triggerToast(`${name} trigger complete.`);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Overview Card */}
      <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '10px', color: '#8b5cf6' }}>
            {icon}
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px', color: '#ffffff' }}>{name}</h2>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>{desc}</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {metrics.map((m, idx) => (
          <div key={idx} style={{ ...metaCardStyle, borderLeft: `3px solid ${m.color || '#8b5cf6'}` }}>
            <span style={{ fontSize: '11px', color: '#6b7280', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>{m.label}</span>
            <strong style={{ color: '#ffffff', fontSize: '20px', display: 'block', marginTop: '6px' }}>{m.value}</strong>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button style={{ ...btnStyle, width: '100%' }} onClick={handleManualRun} disabled={running}>
            {running ? <RefreshCw className="spin" size={14} /> : <Play size={14} />}
            {running ? 'Running...' : 'Execute Now'}
          </button>
        </div>
      </div>

      {/* Custom Component Workflows */}
      {children && (
        <div style={cardStyle}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Terminal size={16} color="#8b5cf6" /> Live Interactive Workspace
          </h3>
          {children}
        </div>
      )}

      {/* Guidelines and Console Logs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', margin: 0 }}>Agent Guidance Guidelines</h4>
            <button style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => setEditPromptModal(true)}>Configure</button>
          </div>
          <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '12px', fontFamily: 'monospace', fontSize: '12px', color: '#9ca3af', minHeight: '80px' }}>
            {systemPrompt}
          </div>
        </div>

        <div style={cardStyle}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', margin: 0 }}>Agent Activity Logs</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '140px', overflowY: 'auto', paddingRight: '4px' }}>
            {logs.map((l, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: '#6b7280', fontFamily: 'monospace' }}>{l.time}</span>
                <span style={{ color: l.type === 'success' ? '#10b981' : l.type === 'warning' ? '#ef4444' : '#fff', flex: 1 }}>{l.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit System Guidelines Modal */}
      {editPromptModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#0d1117', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', margin: 0 }}>Configure Agent Guidance Rules</h3>
              <button onClick={() => setEditPromptModal(false)} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setEditPromptModal(false); triggerToast('Agent instructions configured.'); }} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 600 }}>Guidelines & Directives</label>
                <textarea onChange={e => setSystemPrompt(e.target.value)} defaultValue={systemPrompt} style={{ ...inputStyle, height: '100px', resize: 'none', fontFamily: 'monospace' }} required />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setEditPromptModal(false)} style={btnSecStyle}>Cancel</button>
                <button type="submit" style={btnStyle}>Save Directives</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


/* ============================================================
   1. MARKETING AGENT
   ============================================================ */
export const AgentMarketing: React.FC = () => {
  const [drafts, setDrafts] = useState([
    { id: '1', channel: 'Facebook Feed', headline: 'Ready to scale up your ad returns?', body: 'Discover how our unified AI OS brings campaigns, CRMs, and analytics together.', status: 'Draft' },
    { id: '2', channel: 'Google Display', headline: 'AI Powered Business Suite', body: 'A premium hub built for enterprise teams. Sync feeds instantly.', status: 'Approved' }
  ]);
  const [form, setForm] = useState({ channel: 'Facebook Feed', headline: '', body: '' });

  return (
    <AgentWrapper
      id="marketing"
      name="Marketing Agent"
      desc="Data dekh kar khud hi best marketing copy/content ka plan banata hai."
      icon={<Brain size={20} />}
      metrics={[
        { label: 'Calculated ROAS', value: '4.8x', color: '#10b981' },
        { label: 'Active Channels', value: '3 Platforms', color: '#6366f1' },
        { label: 'Planned Copies', value: '12 drafts', color: '#f59e0b' }
      ]}
      initialLogs={[
        { time: '11:12:04 AM', msg: 'Analyzed ad conversion data for last 30 days.', type: 'info' },
        { time: '10:04:12 AM', msg: 'Generated 2 new marketing copy proposals.', type: 'success' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Planned Marketing Content Copy</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Channel</th>
              <th style={thStyle}>Headline</th>
              <th style={thStyle}>Body Copy</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {drafts.map((d, i) => (
              <tr key={i}>
                <td style={tdStyle}><span style={badgeStyle('#6366f1')}>{d.channel}</span></td>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{d.headline}</td>
                <td style={tdStyle}>{d.body}</td>
                <td style={tdStyle}><span style={badgeStyle(d.status === 'Approved' ? '#10b981' : '#f59e0b')}>{d.status}</span></td>
                <td style={tdStyle}>
                  {d.status === 'Draft' && (
                    <button style={{ ...btnStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                      setDrafts(prev => prev.map(x => x.id === d.id ? { ...x, status: 'Approved' } : x));
                      triggerToast('Marketing copy approved for output.');
                    }}>Approve</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={e => {
          e.preventDefault();
          setDrafts(prev => [...prev, { id: Date.now().toString(), channel: form.channel, headline: form.headline, body: form.body, status: 'Draft' }]);
          setForm({ channel: 'Facebook Feed', headline: '', body: '' });
          triggerToast('New creative copy draft added.');
        }} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 2fr auto', gap: '10px', alignItems: 'end', marginTop: '10px' }}>
          <div>
            <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Channel</label>
            <select style={selectStyle} value={form.channel} onChange={e => setForm(f => ({ ...f, channel: e.target.value }))}>
              <option>Facebook Feed</option><option>Google Display</option><option>TikTok Shop</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Headline</label>
            <input style={inputStyle} required value={form.headline} onChange={e => setForm(f => ({ ...f, headline: e.target.value }))} placeholder="e.g. Save 10% today" />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Body Content</label>
            <input style={inputStyle} required value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} placeholder="e.g. Shop now for fast shipping..." />
          </div>
          <button style={{ ...btnStyle, height: '38px' }} type="submit">Draft Copy</button>
        </form>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   2. SEO AGENT
   ============================================================ */
export const AgentSeo: React.FC = () => {
  const [pages, setPages] = useState([
    { path: '/products/headphones', score: 82, keyword: 'wireless headphones', meta: 'Buy premium wireless headphones at best price.', checked: '10 mins ago' },
    { path: '/categories/watches', score: 68, keyword: 'smart watch series 5', meta: 'Exclusive watches deals.', checked: '1h ago' }
  ]);

  return (
    <AgentWrapper
      id="seo"
      name="SEO Agent"
      desc="Website ki search ranking check karke SEO details (metadata) khud update karta hai."
      icon={<Search size={20} />}
      metrics={[
        { label: 'Average Rank', value: '4.2', color: '#10b981' },
        { label: 'Pages Scanned', value: '142 pages', color: '#6366f1' },
        { label: 'SEO Health', value: '88%', color: '#f59e0b' }
      ]}
      initialLogs={[
        { time: '11:15:00 AM', msg: 'Run background SEO validation on products indexes.', type: 'info' },
        { time: '09:00:15 AM', msg: 'Updated metadata guidelines for watches category.', type: 'success' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>SEO Page Ranking & Meta Audit</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Page Path</th>
              <th style={thStyle}>SEO Score</th>
              <th style={thStyle}>Target Keyword</th>
              <th style={thStyle}>Generated Meta Description</th>
              <th style={thStyle}>Last Audit</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff' }}><code>{p.path}</code></td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: p.score > 80 ? '#10b981' : '#f59e0b', fontWeight: 600 }}>{p.score}%</span>
                    <div style={{ width: '50px' }}><ProgressBar pct={p.score} color={p.score > 80 ? '#10b981' : '#f59e0b'} /></div>
                  </div>
                </td>
                <td style={tdStyle}><code>{p.keyword}</code></td>
                <td style={tdStyle}>{p.meta}</td>
                <td style={tdStyle}>{p.checked}</td>
                <td style={tdStyle}>
                  <button style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                    setPages(prev => prev.map(x => x.path === p.path ? { ...x, score: 95, meta: `Best ${p.keyword} online with fast delivery, warranty, and exclusive discount codes.` } : x));
                    triggerToast('SEO Meta descriptions auto-updated.');
                  }}>Optimize Meta</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   3. PPC AGENT
   ============================================================ */
export const AgentPpc: React.FC = () => {
  const [budgets, setBudgets] = useState([
    { platform: 'Google Ads', spend: '$1,200', allocation: 55, recommended: 60, status: 'Adjusted' },
    { platform: 'Facebook Ads', spend: '$800', allocation: 35, recommended: 30, status: 'Pending' },
    { platform: 'TikTok Ads', spend: '$250', allocation: 10, recommended: 10, status: 'Synced' }
  ]);

  return (
    <AgentWrapper
      id="ppc"
      name="PPC Agent"
      desc="Ad campaigns ka budget dekh kar behtar tarike se paise baantne ka suggestion deta hai."
      icon={<Sparkles size={20} />}
      metrics={[
        { label: 'Weekly Spend', value: '$2,250', color: '#8b5cf6' },
        { label: 'CPA Optimized', value: '$12.40', color: '#10b981' },
        { label: 'ROAS Lift', value: '+14.2%', color: '#10b981' }
      ]}
      initialLogs={[
        { time: '12:00:10 PM', msg: 'Detected CPC surge on Google search tags.', type: 'warning' },
        { time: '11:30:00 AM', msg: 'Drafted budget re-allocation options logic.', type: 'info' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Smart Budget Allocator</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {budgets.map((b, i) => (
            <div key={i} style={metaCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{b.platform}</span>
                <span style={badgeStyle(b.status === 'Adjusted' ? '#10b981' : '#f59e0b')}>{b.status}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>Weekly Spend: <span style={{ color: '#fff', fontWeight: 600 }}>{b.spend}</span></div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Current Split: {b.allocation}%</div>
              <ProgressBar pct={b.allocation} color="#6366f1" />
              <div style={{ fontSize: '12px', color: '#10b981', marginTop: '10px', fontWeight: 600 }}>Recommended: {b.recommended}%</div>
              {b.status === 'Pending' && (
                <button style={{ ...btnStyle, padding: '4px 10px', fontSize: '11px', marginTop: '12px', width: '100%' }} onClick={() => {
                  setBudgets(prev => prev.map(x => x.platform === b.platform ? { ...x, allocation: b.recommended, status: 'Adjusted' } : x));
                  triggerToast(`${b.platform} budget adjusted to target allocation.`);
                }}>Apply Recommendation</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   4. DSP AGENT
   ============================================================ */
export const AgentDsp: React.FC = () => {
  const [bids] = useState([
    { exchange: 'OpenX Video Slot', currentCPM: '$2.45', maxBidCPM: '$4.00', winRate: '68%', status: 'Active Bidding' },
    { exchange: 'PubMatic Banner', currentCPM: '$1.15', maxBidCPM: '$2.50', winRate: '54%', status: 'Active Bidding' }
  ]);

  return (
    <AgentWrapper
      id="dsp"
      name="DSP Agent"
      desc="Real-time me banner ads ke liye sabse sahi bid (price) lagata hai."
      icon={<TrendingUp size={20} />}
      metrics={[
        { label: 'Exchanges Synced', value: '18 networks', color: '#6366f1' },
        { label: 'Avg CPM Won', value: '$1.80', color: '#10b981' },
        { label: 'Bids Placed / Min', value: '4,500', color: '#f59e0b' }
      ]}
      initialLogs={[
        { time: '11:45:10 AM', msg: 'Bid matched on Google AdX video slot target.', type: 'info' },
        { time: '10:04:12 AM', msg: 'Re-arranged CPM floor bid parameters limits.', type: 'success' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Real-Time Bid Monitor</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Ad Exchange</th>
              <th style={thStyle}>Win-Rate</th>
              <th style={thStyle}>Current Bid (CPM)</th>
              <th style={thStyle}>Ceiling limit (CPM)</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((b, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{b.exchange}</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#10b981', fontWeight: 600 }}>{b.winRate}</span>
                    <div style={{ width: '50px' }}><ProgressBar pct={parseInt(b.winRate)} color="#10b981" /></div>
                  </div>
                </td>
                <td style={tdStyle}><code style={{ color: '#10b981' }}>{b.currentCPM}</code></td>
                <td style={tdStyle}><code>{b.maxBidCPM}</code></td>
                <td style={tdStyle}><span style={badgeStyle('#10b981')}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   5. SSP AGENT
   ============================================================ */
export const AgentSsp: React.FC = () => {
  const [slots, setSlots] = useState([
    { site: 'TechNews.com', slotId: 'Sidebar-Right', minFloor: '$1.50', fillRate: '98%', status: 'Active' },
    { site: 'FashionBlog.net', slotId: 'Header-Top', minFloor: '$3.20', fillRate: '88%', status: 'Active' }
  ]);

  return (
    <AgentWrapper
      id="ssp"
      name="SSP Agent"
      desc="Website ki available ad space ko manage karke zyada se zyada ad-revenue nikalta hai."
      icon={<Cpu size={20} />}
      metrics={[
        { label: 'SSP Fill Rate', value: '94.2%', color: '#10b981' },
        { label: 'Earning/CPM', value: '$3.40', color: '#6366f1' },
        { label: 'Active Slots', value: '412 units', color: '#f59e0b' }
      ]}
      initialLogs={[
        { time: '12:00:10 PM', msg: 'Adjusted header bidding prebid parameters.', type: 'info' },
        { time: '11:30:15 AM', msg: 'Yield audit complete for FashionBlog.net slots.', type: 'success' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Publisher Ad Slot Configurations</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Site Domain</th>
              <th style={thStyle}>Slot Placement ID</th>
              <th style={thStyle}>Current Floor price</th>
              <th style={thStyle}>Fill Rate</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((s, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{s.site}</td>
                <td style={tdStyle}><code>{s.slotId}</code></td>
                <td style={tdStyle}><code style={{ color: '#f59e0b' }}>{s.minFloor}</code></td>
                <td style={tdStyle}>{s.fillRate}</td>
                <td style={tdStyle}><span style={badgeStyle('#10b981')}>{s.status}</span></td>
                <td style={tdStyle}>
                  <button style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                    setSlots(prev => prev.map(x => x.slotId === s.slotId ? { ...x, minFloor: '$3.50' } : x));
                    triggerToast('Floor price automatically updated for maximum yield.');
                  }}>Optimize Yield</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   6. AFFILIATE AGENT
   ============================================================ */
export const AgentAffiliate: React.FC = () => {
  const [payouts] = useState([
    { partner: 'Alice Smith (Influencer)', referrals: 450, totalSale: '$12,400', commission: '$1,240', status: 'Calculated' },
    { partner: 'John Doe (Blog)', referrals: 182, totalSale: '$5,400', commission: '$540', status: 'Calculated' }
  ]);

  return (
    <AgentWrapper
      id="affiliate"
      name="Affiliate Agent"
      desc="Partners ke through hui sales ko track karke unka commission calculate karta hai."
      icon={<Users size={20} />}
      metrics={[
        { label: 'Affiliates Linked', value: '1,450 partners', color: '#6366f1' },
        { label: 'Attributed Sales', value: '$17,800', color: '#10b981' },
        { label: 'Unpaid Comms', value: '$1,780', color: '#ef4444' }
      ]}
      initialLogs={[
        { time: '11:00:10 AM', msg: 'Reconciled affiliate tracking pixels metrics.', type: 'info' },
        { time: '09:00:15 AM', msg: 'Calculated payout ledger logs.', type: 'success' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Partner Referrals & Commission Ledger</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Partner</th>
              <th style={thStyle}>Referral Count</th>
              <th style={thStyle}>Total Sales Volume</th>
              <th style={thStyle}>Commission Due</th>
              <th style={thStyle}>Calculation Status</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{p.partner}</td>
                <td style={tdStyle}>{p.referrals}</td>
                <td style={tdStyle}>{p.totalSale}</td>
                <td style={{ ...tdStyle, color: '#10b981', fontWeight: 700 }}>{p.commission}</td>
                <td style={tdStyle}><span style={badgeStyle('#10b981')}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   7. PUBLISHER AGENT
   ============================================================ */
export const AgentPublisher: React.FC = () => {
  const [placements] = useState([
    { name: 'Homepage Banner Carousel', impressions: '142,400', viewability: '92%', layoutShift: '0.01 (Excellent)' },
    { name: 'Article Sticky Bottom banner', impressions: '84,200', viewability: '88%', layoutShift: '0.04 (Good)' }
  ]);

  return (
    <AgentWrapper
      id="publisher"
      name="Publisher Agent"
      desc="Website pe ad slots ko schedule karke unka use maximum karta hai."
      icon={<Layout size={20} />}
      metrics={[
        { label: 'Viewability Rate', value: '90%', color: '#10b981' },
        { label: 'Direct Deals', value: '14 Active', color: '#6366f1' },
        { label: 'Layout Compliance', value: 'Excellent', color: '#8b5cf6' }
      ]}
      initialLogs={[
        { time: '11:15:10 AM', msg: 'Audited cumulative layout shifts for banner views.', type: 'success' },
        { time: '10:00:15 AM', msg: 'Scheduled native sponsor campaign for slot-B.', type: 'info' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Ad Layout Shifts & Viewability Analysis</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Ad Slot</th>
              <th style={thStyle}>Impressions (30d)</th>
              <th style={thStyle}>Avg Viewability</th>
              <th style={thStyle}>Layout Shift Score</th>
            </tr>
          </thead>
          <tbody>
            {placements.map((p, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{p.name}</td>
                <td style={tdStyle}>{p.impressions}</td>
                <td style={{ ...tdStyle, color: '#10b981', fontWeight: 600 }}>{p.viewability}</td>
                <td style={tdStyle}>{p.layoutShift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   8. SALES AGENT
   ============================================================ */
export const AgentSales: React.FC = () => {
  const [leads, setLeads] = useState([
    { name: 'John Doe', email: 'john@enterprise.com', company: 'Enterprise Corp', status: 'Greeting Sent' },
    { name: 'Sarah Connor', email: 'sarah@skynet.net', company: 'Cyberdyne', status: 'Pending Contact' }
  ]);

  return (
    <AgentWrapper
      id="sales"
      name="Sales Agent"
      desc="CRM se naye leads uthata hai aur unhe khud pehla greeting message bhejta hai."
      icon={<MessageSquare size={20} />}
      metrics={[
        { label: 'Leads Grabbed', value: '142 leads', color: '#6366f1' },
        { label: 'Outbound Sent', value: '118 greetings', color: '#10b981' },
        { label: 'Demos Booked', value: '18 schedules', color: '#f59e0b' }
      ]}
      initialLogs={[
        { time: '12:00:15 PM', msg: 'Ingested naye leads list from opportunity pipeline board.', type: 'info' },
        { time: '11:15:00 AM', msg: 'Dispatched automated welcome introductory template sequence.', type: 'success' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Inbound Leads Outreach Pipeline</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Contact Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Company</th>
              <th style={thStyle}>Outreach Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{l.name}</td>
                <td style={tdStyle}><code>{l.email}</code></td>
                <td style={tdStyle}>{l.company}</td>
                <td style={tdStyle}><span style={badgeStyle(l.status === 'Greeting Sent' ? '#10b981' : '#f59e0b')}>{l.status}</span></td>
                <td style={tdStyle}>
                  {l.status === 'Pending Contact' && (
                    <button style={{ ...btnStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                      setLeads(prev => prev.map(x => x.email === l.email ? { ...x, status: 'Greeting Sent' } : x));
                      triggerToast(`Greeting message sent automatically to ${l.name}`);
                    }}>Send Welcome Message</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   9. FINANCE AGENT
   ============================================================ */
export const AgentFinance: React.FC = () => {
  const [invoices, setInvoices] = useState([
    { id: 'INV-091', vendor: 'Shopify Core Gateway', amount: '$4,200', discrepancy: 'Tax calculation mismatch ($420 vs $450)', status: 'Flagged Error' },
    { id: 'INV-102', vendor: 'Meta Advertising LLC', amount: '$12,400', discrepancy: 'None', status: 'Clean' }
  ]);

  return (
    <AgentWrapper
      id="finance"
      name="Finance Agent"
      desc="Kharche aur costs ko check karke bill/invoice me galti ya gadbad pakadta hai."
      icon={<Landmark size={20} />}
      metrics={[
        { label: 'Reconciled Ledger', value: '4,510 entries', color: '#6366f1' },
        { label: 'Audit Match Ratio', value: '99.4%', color: '#f59e0b' },
        { label: 'Flagged Errors', value: '1 discrepancy', color: '#ef4444' }
      ]}
      initialLogs={[
        { time: '11:15:10 AM', msg: 'Flagged discrepancy in Shopify invoice tax total.', type: 'warning' },
        { time: '10:04:12 AM', msg: 'Reconciliation flow completed for active billing ledger.', type: 'success' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Invoice Audit & Discrepancies Monitor</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Invoice ID</th>
              <th style={thStyle}>Vendor</th>
              <th style={thStyle}>Billing Amount</th>
              <th style={thStyle}>Discrepancy / Error Details</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((v, i) => (
              <tr key={i}>
                <td style={tdStyle}><code>{v.id}</code></td>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{v.vendor}</td>
                <td style={tdStyle}>{v.amount}</td>
                <td style={{ ...tdStyle, color: v.discrepancy === 'None' ? '#9ca3af' : '#ef4444' }}>{v.discrepancy}</td>
                <td style={tdStyle}><span style={badgeStyle(v.status === 'Clean' ? '#10b981' : '#ef4444')}>{v.status}</span></td>
                <td style={tdStyle}>
                  {v.status === 'Flagged Error' && (
                    <button style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                      setInvoices(prev => prev.map(x => x.id === v.id ? { ...x, discrepancy: 'None', status: 'Clean' } : x));
                      triggerToast('Invoice corrected and adjusted.');
                    }}>Fix Bill details</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   10. COMPLIANCE AGENT
   ============================================================ */
export const AgentCompliance: React.FC = () => {
  const [consents] = useState([
    { zone: 'European Union (GDPR)', visitors: '45,200', consentRate: '88%', validation: 'Validated compliant' },
    { zone: 'California (CCPA)', visitors: '31,000', consentRate: '92%', validation: 'Validated compliant' }
  ]);

  return (
    <AgentWrapper
      id="compliance"
      name="Compliance Agent"
      desc="Data track karne se pehle check karta hai ki user ki permission (consent) hai ya nahi (GDPR/CCPA rules)."
      icon={<ShieldCheck size={20} />}
      metrics={[
        { label: 'Residency Check', value: '3 Active Regions', color: '#6366f1' },
        { label: 'Consent Audits', value: '100% logs', color: '#10b981' },
        { label: 'Regulatory Rating', value: 'Excellent', color: '#8b5cf6' }
      ]}
      initialLogs={[
        { time: '11:15:10 AM', msg: 'Verified user consent logs registry compliance data.', type: 'success' },
        { time: '10:00:15 AM', msg: 'Regulatory residency test validated successfully.', type: 'info' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Privacy Consent Log Audit (GDPR/CCPA)</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Data Zone Jurisdiction</th>
              <th style={thStyle}>Visitor Logs</th>
              <th style={thStyle}>Consent Acceptance Rate</th>
              <th style={thStyle}>Compliance Verification</th>
            </tr>
          </thead>
          <tbody>
            {consents.map((c, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{c.zone}</td>
                <td style={tdStyle}>{c.visitors}</td>
                <td style={tdStyle}>{c.consentRate}</td>
                <td style={tdStyle}><span style={badgeStyle('#10b981')}>{c.validation}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   11. FRAUD DETECTION AGENT
   ============================================================ */
export const AgentFraud: React.FC = () => {
  const [blocked, setBlocked] = useState([
    { ip: '192.12.0.4', country: 'RU', clicks: 420, reason: 'Rapid card testing requests', blockTime: '10 mins ago' },
    { ip: '45.109.81.22', country: 'CN', clicks: 1240, reason: 'Duplicate ad click bots activity', blockTime: '1h ago' }
  ]);

  return (
    <AgentWrapper
      id="fraud"
      name="Fraud Detection Agent"
      desc="Fake ya bot clicks pakad kar unke IP address ko block kar deta hai."
      icon={<Ban size={20} />}
      metrics={[
        { label: 'Attacks Blocked', value: '14 IPs today', color: '#ef4444' },
        { label: 'Monitored IPS', value: '45,100', color: '#6366f1' },
        { label: 'Safe Traffic Score', value: '99.8%', color: '#10b981' }
      ]}
      initialLogs={[
        { time: '12:04:12 PM', msg: 'Blocked bot click patterns origins IP.', type: 'warning' },
        { time: '10:14:10 AM', msg: 'Automated network scan completed successfully.', type: 'success' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Blocked IP Adress Registry (Bot / Fake Clicks)</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>IP Address</th>
              <th style={thStyle}>Country</th>
              <th style={thStyle}>Fake Clicks Intercepted</th>
              <th style={thStyle}>Reason</th>
              <th style={thStyle}>Time Blocked</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {blocked.map((b, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff' }}><code>{b.ip}</code></td>
                <td style={tdStyle}>{b.country}</td>
                <td style={{ ...tdStyle, color: '#ef4444', fontWeight: 700 }}>{b.clicks} clicks</td>
                <td style={tdStyle}>{b.reason}</td>
                <td style={tdStyle}>{b.blockTime}</td>
                <td style={tdStyle}>
                  <button style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                    setBlocked(prev => prev.filter(x => x.ip !== b.ip));
                    triggerToast(`IP ${b.ip} unblocked and allowed.`);
                  }}>Unblock IP</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   12. CUSTOMER SUPPORT AGENT
   ============================================================ */
export const AgentSupport: React.FC = () => {
  const [faqs, setFaqs] = useState([
    { question: 'What is the refund policy?', category: 'Refunds', confidence: '98%', status: 'Active' },
    { question: 'How do I export my invoice?', category: 'Invoicing', confidence: '94%', status: 'Active' }
  ]);

  return (
    <AgentWrapper
      id="support"
      name="Customer Support Agent"
      desc="Knowledge base padh kar customers ke common sawalon ka jawab khud deta hai."
      icon={<LifeBuoyIcon size={20} />}
      metrics={[
        { label: 'Auto Response', value: '72% tickets', color: '#10b981' },
        { label: 'Support Queue', value: '0 pending', color: '#6366f1' },
        { label: 'Customer Rating', value: '4.85/5', color: '#f59e0b' }
      ]}
      initialLogs={[
        { time: '11:15:10 AM', msg: 'Auto resolved password reset tickets payload requests.', type: 'success' },
        { time: '10:00:15 AM', msg: 'Escalated complex ticket query payload to human team.', type: 'info' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Automated FAQ Answers & Training Data</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>FAQ Question</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>AI Match Confidence</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((f, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{f.question}</td>
                <td style={tdStyle}><span style={badgeStyle('#6366f1')}>{f.category}</span></td>
                <td style={{ ...tdStyle, color: '#10b981', fontWeight: 700 }}>{f.confidence}</td>
                <td style={tdStyle}><span style={badgeStyle('#10b981')}>{f.status}</span></td>
                <td style={tdStyle}>
                  <button style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                    setFaqs(prev => prev.map(x => x.question === f.question ? { ...x, confidence: '99%' } : x));
                    triggerToast('FAQ response model retrained.');
                  }}>Retrain FAQ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   13. BUSINESS ANALYST AGENT
   ============================================================ */
export const AgentBiz: React.FC = () => {
  const [reports] = useState([
    { name: 'Monthly Executive Summary', type: 'KPI Report', lastUpdate: '10 mins ago', status: 'Ready' },
    { name: 'Quarterly Sales Forecast Analysis', type: 'Projection', lastUpdate: '2h ago', status: 'Ready' }
  ]);

  return (
    <AgentWrapper
      id="biz"
      name="Business Analyst Agent"
      desc="Company ke data se KPI report aur status update khud taiyar karta hai."
      icon={<BarChart3 size={20} />}
      metrics={[
        { label: 'KPI Accuracy Ratio', value: '98.4%', color: '#10b981' },
        { label: 'Forecasts Run', value: '18 groups', color: '#6366f1' },
        { label: 'Report Status', value: 'Generated', color: '#8b5cf6' }
      ]}
      initialLogs={[
        { time: '11:00:15 AM', msg: 'Run quarterly sales projections algorithms analysis.', type: 'success' },
        { time: '09:12:10 AM', msg: 'Synthesized customer lifetime metrics distributions variance.', type: 'info' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Automated KPI Reports & Status Summaries</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Report Name</th>
              <th style={thStyle}>Report Type</th>
              <th style={thStyle}>Last Automated Update</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{r.name}</td>
                <td style={tdStyle}><span style={badgeStyle('#6366f1')}>{r.type}</span></td>
                <td style={tdStyle}>{r.lastUpdate}</td>
                <td style={tdStyle}><span style={badgeStyle('#10b981')}>{r.status}</span></td>
                <td style={tdStyle}>
                  <button style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => triggerToast(`Exporting ${r.name}...`)}>Export PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   14. PRODUCT MANAGER AGENT
   ============================================================ */
export const AgentPm: React.FC = () => {
  const [specs, setSpecs] = useState([
    { feature: 'White Label Agency Portal integrations', date: 'Jul 9, 2026', author: 'AI PM Agent', scopeStatus: 'Completed Scope' },
    { feature: 'Direct Stripe gateway split payments', date: 'Jul 8, 2026', author: 'AI PM Agent', scopeStatus: 'Pending Review' }
  ]);

  return (
    <AgentWrapper
      id="pm"
      name="Product Manager Agent"
      desc="User ki requirement sun kar uska rough document/scope bana deta hai."
      icon={<FileText size={20} />}
      metrics={[
        { label: 'PRDs Generated', value: '12 draft files', color: '#6366f1' },
        { label: 'Requirement Scanned', value: '1,450 inputs', color: '#10b981' },
        { label: 'Roadmap Alignment', value: 'High', color: '#8b5cf6' }
      ]}
      initialLogs={[
        { time: '11:15:10 AM', msg: 'Built draft specification outlines for split payments rules.', type: 'success' },
        { time: '10:00:12 AM', msg: 'Ingested customer feature requests feedback lists.', type: 'info' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Automated Product Requirement Scopes (PRD)</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Target Product Feature</th>
              <th style={thStyle}>Date Generated</th>
              <th style={thStyle}>Author Assistant</th>
              <th style={thStyle}>Scope Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {specs.map((s, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{s.feature}</td>
                <td style={tdStyle}>{s.date}</td>
                <td style={tdStyle}>{s.author}</td>
                <td style={tdStyle}><span style={badgeStyle(s.scopeStatus === 'Completed Scope' ? '#10b981' : '#f59e0b')}>{s.scopeStatus}</span></td>
                <td style={tdStyle}>
                  <button style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => triggerToast(`Opening PRD spec document details...`)}>Open Document</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   15. CAMPAIGN OPTIMIZER AGENT
   ============================================================ */
export const AgentOpt: React.FC = () => {
  const [biddingHours] = useState([
    { hour: '08:00 AM - 12:00 PM (Morning traffic Peak)', bidMultiplier: '1.2x (increased)', reason: 'High intent CTR observed' },
    { hour: '02:00 PM - 06:00 PM (Afternoon dip)', bidMultiplier: '0.8x (decreased)', reason: 'CPA reduction strategy' },
    { hour: '08:00 PM - 11:00 PM (Evening surge)', bidMultiplier: '1.3x (increased)', reason: 'High purchase volumes cohort' }
  ]);

  return (
    <AgentWrapper
      id="opt"
      name="Campaign Optimizer Agent"
      desc="Din ke sahi time pe bidding values ko khud adjust karta hai."
      icon={<Settings size={20} />}
      metrics={[
        { label: 'Hourly Bid Rules', value: '128 rules', color: '#6366f1' },
        { label: 'Efficiency Gain', value: '+14.2% ROAS', color: '#10b981' },
        { label: 'Weekly Adjusts', value: '450 bid tags', color: '#f59e0b' }
      ]}
      initialLogs={[
        { time: '11:45:10 AM', msg: 'Adjusted bidding multipliers limits dynamically.', type: 'success' },
        { time: '09:14:02 AM', msg: 'Analyzed traffic distribution timeline hourly reports.', type: 'info' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Automated Bid Schedule Multipliers</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Target Hour Window</th>
              <th style={thStyle}>Bid Multiplier Allocation</th>
              <th style={thStyle}>Autonomous Decision Reason</th>
            </tr>
          </thead>
          <tbody>
            {biddingHours.map((bh, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{bh.hour}</td>
                <td style={tdStyle}><span style={badgeStyle('#10b981')}>{bh.bidMultiplier}</span></td>
                <td style={tdStyle}>{bh.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   16. CREATIVE DESIGNER AGENT
   ============================================================ */
export const AgentCreative: React.FC = () => {
  const [prompts, setPrompts] = useState([
    { id: '1', style: 'Minimalist Clean', instructions: 'Stunning premium wireless headphones on a clean dark abstract geometric background, purple HSL accents, high contrast glassmorphic UI, photorealistic 8k render.' },
    { id: '2', style: 'Neon Cyberpunk', instructions: 'Sports watch with neon glowing tracks, futuristic cybernetic framework overlays, dark gradient vector graphics.' }
  ]);

  return (
    <AgentWrapper
      id="creative"
      name="Creative Designer Agent"
      desc="Banner/image banane ke liye AI ko prompt (instruction) khud generate karta hai."
      icon={<Layers size={20} />}
      metrics={[
        { label: 'Prompts Ready', value: '18 schemas', color: '#6366f1' },
        { label: 'Aspect Ratios', value: '4 formats', color: '#10b981' },
        { label: 'Asset Library', value: '4,510 items', color: '#f59e0b' }
      ]}
      initialLogs={[
        { time: '11:00:15 AM', msg: 'Re-rendered active graphics prompt templates files.', type: 'success' },
        { time: '10:04:12 AM', msg: 'Created aspect ratios variations models tags.', type: 'info' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>AI Graphics Prompt Generator</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {prompts.map((p, i) => (
            <div key={i} style={metaCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{p.style} Layout Prompts</span>
                <button style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => triggerToast('Prompt copied to clipboard.')}>Copy Prompt</button>
              </div>
              <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '10px', fontFamily: 'monospace', fontSize: '12px', color: '#a855f7', lineHeight: '1.4' }}>
                {p.instructions}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   17. CONTENT WRITER AGENT
   ============================================================ */
export const AgentContent: React.FC = () => {
  const [drafts] = useState([
    { title: 'The Future of programmatic Unified AI OS', category: 'Blog Draft', keywords: 'AI business, ad network framework', wordCount: '840 words' },
    { title: 'Weekly SaaS Trends Newsletter issue-12', category: 'Newsletter Email', keywords: 'Multi-tenant apps, SSO, billing limits', wordCount: '620 words' }
  ]);

  return (
    <AgentWrapper
      id="content"
      name="Content Writer Agent"
      desc="Industry trends dekh kar newsletter aur blog khud likh deta hai."
      icon={<Edit3 size={20} />}
      metrics={[
        { label: 'Blog Posts Ready', value: '4 drafts', color: '#6366f1' },
        { label: 'Weekly Emails', value: '2 schedules', color: '#10b981' },
        { label: 'Tone Analyzer', value: 'Professional', color: '#f59e0b' }
      ]}
      initialLogs={[
        { time: '12:04:12 PM', msg: 'Ingested organic trends search ranking schemas.', type: 'info' },
        { time: '10:14:10 AM', msg: 'Autodrafted SaaS trends newsletter draft template.', type: 'success' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Organic Blogs & Email Newsletters</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Target Content Title</th>
              <th style={thStyle}>Channel Category</th>
              <th style={thStyle}>SEO Keywords matched</th>
              <th style={thStyle}>Word Count</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {drafts.map((d, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{d.title}</td>
                <td style={tdStyle}><span style={badgeStyle('#6366f1')}>{d.category}</span></td>
                <td style={tdStyle}><code>{d.keywords}</code></td>
                <td style={tdStyle}>{d.wordCount}</td>
                <td style={tdStyle}>
                  <button style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => triggerToast(`Opening text editor draft...`)}>Edit Draft</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   18. DATA SCIENTIST AGENT
   ============================================================ */
export const AgentDataSci: React.FC = () => {
  const [models] = useState([
    { name: 'CLV Cohort Random Forest Classifier', type: 'Scikit-Learn Random Forest', dataset: 'Order records (90 days)', accuracy: '98.2%' },
    { name: 'Bid Yield Linear Regression Model', type: 'PyTorch Regression Net', dataset: 'Programmatic bid logs (30 days)', accuracy: '94.6%' }
  ]);

  return (
    <AgentWrapper
      id="datasci"
      name="Data Scientist Agent"
      desc="Python ke models chala kar predictions nikalta hai."
      icon={<Database size={20} />}
      metrics={[
        { label: 'Models Run', value: '12 networks', color: '#8b5cf6' },
        { label: 'Training Epochs', value: '250 epochs', color: '#10b981' },
        { label: 'Regression Margin', value: '0.02 MSE', color: '#f59e0b' }
      ]}
      initialLogs={[
        { time: '12:30:15 PM', msg: 'Run random forest prediction accuracy evaluation tests.', type: 'success' },
        { time: '10:14:10 AM', msg: 'Optimized network covariance layers matrix calculations.', type: 'info' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Python Model Optimizer & Epoch Training</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Neural Network Name</th>
              <th style={thStyle}>Model Framework Type</th>
              <th style={thStyle}>Dataset size</th>
              <th style={thStyle}>Prediction Accuracy</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{m.name}</td>
                <td style={tdStyle}>{m.type}</td>
                <td style={tdStyle}>{m.dataset}</td>
                <td style={{ ...tdStyle, color: '#10b981', fontWeight: 700 }}>{m.accuracy}</td>
                <td style={tdStyle}>
                  <button style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => triggerToast(`Retraining ${m.name} model...`)}>Retrain Model</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ============================================================
   19. DEVOPS AGENT
   ============================================================ */
export const AgentDevops: React.FC = () => {
  const [servers, setServers] = useState([
    { node: 'US-East-Primary Cluster', status: 'Online', gpuUsage: '68%', ramUsage: '42%', uptime: '14 days' },
    { node: 'Backup Ingestion Worker-01', status: 'Warning', gpuUsage: '94%', ramUsage: '88%', uptime: '3h (Restarting)' }
  ]);

  return (
    <AgentWrapper
      id="devops"
      name="DevOps Agent"
      desc="Server/GPU ki health check karta hai, kuch fail ho to khud restart kar deta hai."
      icon={<Server size={20} />}
      metrics={[
        { label: 'Active Containers', value: '48 docker', color: '#6366f1' },
        { label: 'Deployment Speed', value: '45 seconds', color: '#10b981' },
        { label: 'Cluster Health', value: '98.2%', color: '#f59e0b' }
      ]}
      initialLogs={[
        { time: '11:15:10 AM', msg: 'Rebooted worker container due to memory threshold limit.', type: 'warning' },
        { time: '10:04:12 AM', msg: 'Snapshots verified immutable backup complete.', type: 'success' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Cluster Health & Container Resources Monitoring</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Node Host</th>
              <th style={thStyle}>Resource Status</th>
              <th style={thStyle}>GPU Usage Ratio</th>
              <th style={thStyle}>RAM Usage</th>
              <th style={thStyle}>System Uptime</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((s, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{s.node}</td>
                <td style={tdStyle}><span style={badgeStyle(s.status === 'Online' ? '#10b981' : '#f59e0b')}>{s.status}</span></td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#fff' }}>{s.gpuUsage}</span>
                    <div style={{ width: '60px' }}><ProgressBar pct={parseInt(s.gpuUsage)} color={parseInt(s.gpuUsage) > 85 ? '#ef4444' : '#10b981'} /></div>
                  </div>
                </td>
                <td style={tdStyle}>{s.ramUsage}</td>
                <td style={tdStyle}>{s.uptime}</td>
                <td style={tdStyle}>
                  <button style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                    setServers(prev => prev.map(x => x.node === s.node ? { ...x, status: 'Online', gpuUsage: '12%', ramUsage: '22%' } : x));
                    triggerToast(`Node ${s.node} reboot initialized.`);
                  }}>{s.status === 'Online' ? 'Restart Service' : 'Initialize Reboot'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentWrapper>
  );
};


/* ─── Temporary Icon Replacement Helper due to imports ───────────── */
function LifeBuoyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m4.93 4.93 4.24 4.24" />
      <path d="m14.83 9.17 4.24-4.24" />
      <path d="m14.83 14.83 4.24 4.24" />
      <path d="m9.17 14.83-4.24 4.24" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}
