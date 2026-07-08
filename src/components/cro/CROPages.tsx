import React, { useState } from 'react';
import {
  Play, Pause, Video, Monitor, Smartphone, Tablet, MousePointerClick,
  Eye, ArrowDown, TrendingDown, Users, Target,
  GitFork, AlertTriangle, CheckCircle2, X,
  RefreshCw, Download, Plus, ToggleLeft, ToggleRight,
  ChevronRight, ChevronDown,
  Activity, Clock, Map, FileText, Sparkles
} from 'lucide-react';

// ─────────────────────────────────────────────────
// 1. SESSION RECORDING
// ─────────────────────────────────────────────────
export const CROSessionRecording: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(34);
  const [selectedSession, setSelectedSession] = useState(0);

  const sessions = [
    { id: 'S-9812', user: 'Anonymous #1', duration: '4m 22s', pages: 7, rage: true, device: 'desktop' },
    { id: 'S-9811', user: 'user@acme.com', duration: '2m 08s', pages: 3, rage: false, device: 'mobile' },
    { id: 'S-9810', user: 'Anonymous #3', duration: '6m 55s', pages: 12, rage: false, device: 'desktop' },
    { id: 'S-9809', user: 'admin@corp.io', duration: '1m 15s', pages: 2, rage: true, device: 'tablet' },
    { id: 'S-9808', user: 'Anonymous #5', duration: '3m 40s', pages: 5, rage: false, device: 'mobile' },
  ];

  const events = [
    { time: '0:12', type: 'click', label: 'Clicked "Pricing" link' },
    { time: '0:35', type: 'scroll', label: 'Scrolled to 40%' },
    { time: '1:04', type: 'rage', label: '⚡ Rage Click on CTA button' },
    { time: '1:28', type: 'input', label: 'Typed in email field' },
    { time: '2:10', type: 'click', label: 'Clicked "Sign Up"' },
    { time: '2:55', type: 'scroll', label: 'Scrolled to 90%' },
    { time: '3:30', type: 'click', label: 'Clicked "Features" nav' },
    { time: '4:22', type: 'exit', label: 'Session ended (tab closed)' },
  ];

  const deviceIcon = (d: string) => d === 'desktop' ? <Monitor size={14} /> : d === 'mobile' ? <Smartphone size={14} /> : <Tablet size={14} />;

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Total Sessions', value: '14,230', icon: <Video size={18} />, color: '#6366f1' },
          { label: 'Avg Duration', value: '3m 44s', icon: <Clock size={18} />, color: '#10b981' },
          { label: 'Rage Clicks', value: '1,024', icon: <AlertTriangle size={18} />, color: '#f59e0b' },
          { label: 'Frustration Score', value: '32%', icon: <Activity size={18} />, color: '#ef4444' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 700 }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', height: '480px' }}>
        <div className="glass-card" style={{ width: '280px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '13px' }}>Recent Sessions</div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {sessions.map((s, i) => (
              <div key={i} onClick={() => setSelectedSession(i)} style={{
                padding: '12px 14px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer',
                backgroundColor: selectedSession === i ? 'rgba(99,102,241,0.1)' : 'transparent',
                borderLeft: selectedSession === i ? '3px solid var(--primary)' : '3px solid transparent',
                transition: 'all 0.2s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{s.id}</span>
                  {s.rage && <span style={{ fontSize: '10px', backgroundColor: 'rgba(239,68,68,0.15)', color: '#ef4444', padding: '2px 5px', borderRadius: '4px' }}>⚡ Rage</span>}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{s.user}</div>
                <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', alignItems: 'center' }}>
                  {deviceIcon(s.device)} <span>{s.duration}</span> <span>·</span> <span>{s.pages}pg</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>{sessions[selectedSession].id}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', flex: 1 }}>{sessions[selectedSession].user}</span>
            <button onClick={() => setPlaying(!playing)} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 14px', cursor: 'pointer', fontSize: '13px' }}>
              {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? 'Pause' : 'Play'}
            </button>
            <button style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 10px', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Download size={13} /> Export
            </button>
          </div>
          <div style={{ padding: '8px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>1:32</span>
            <div style={{ flex: 1, height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', cursor: 'pointer' }} onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
            }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'var(--primary)', borderRadius: '3px' }} />
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>4:22</span>
          </div>
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <div style={{ flex: 1, backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ width: '75%', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '4px', width: '40%', marginBottom: '12px' }} />
                <div style={{ height: '7px', backgroundColor: '#f1f5f9', borderRadius: '3px', width: '75%', marginBottom: '8px' }} />
                <div style={{ height: '7px', backgroundColor: '#f1f5f9', borderRadius: '3px', width: '55%', marginBottom: '20px' }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1, height: '32px', backgroundColor: '#6366f1', borderRadius: '6px' }} />
                  <div style={{ flex: 1, height: '32px', backgroundColor: '#f1f5f9', borderRadius: '6px' }} />
                </div>
              </div>
              <div style={{ position: 'absolute', width: '14px', height: '14px', borderLeft: '2px solid #1e293b', borderTop: '2px solid #1e293b', transform: 'rotate(-45deg)', left: `${35 + progress * 0.25}%`, top: `${40 + Math.sin(progress / 10) * 8}%`, transition: 'all 0.3s', pointerEvents: 'none' }} />
            </div>
            <div style={{ width: '200px', borderLeft: '1px solid var(--border-color)', overflowY: 'auto', padding: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '10px', color: 'var(--text-secondary)' }}>EVENT TIMELINE</div>
              {events.map((ev, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', minWidth: '28px', marginTop: '1px' }}>{ev.time}</span>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: ev.type === 'rage' ? '#ef4444' : ev.type === 'click' ? '#6366f1' : ev.type === 'exit' ? '#f59e0b' : '#10b981', marginTop: '3px', flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{ev.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────
// 2. HEATMAPS
// ─────────────────────────────────────────────────
export const CROHeatmaps: React.FC = () => {
  const [mode, setMode] = useState<'click' | 'scroll' | 'move'>('click');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  const spots = [
    { x: 55, y: 58, intensity: 0.9, label: 'Pro Plan CTA' },
    { x: 25, y: 58, intensity: 0.4, label: 'Basic Plan' },
    { x: 80, y: 58, intensity: 0.7, label: 'Enterprise' },
    { x: 65, y: 12, intensity: 0.6, label: 'Contact nav' },
    { x: 8, y: 8, intensity: 0.3, label: 'Logo' },
  ];

  const getColor = (i: number) => {
    if (i > 0.8) return `radial-gradient(circle, rgba(239,68,68,0.85) 0%, rgba(234,179,8,0.5) 45%, transparent 70%)`;
    if (i > 0.5) return `radial-gradient(circle, rgba(234,179,8,0.75) 0%, rgba(59,130,246,0.4) 55%, transparent 70%)`;
    return `radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)`;
  };
  const getSize = (i: number) => i > 0.8 ? 90 : i > 0.5 ? 65 : 40;

  return (
    <div className="fade-in" style={{ display: 'flex', gap: '16px', height: '560px' }}>
      <div className="glass-card" style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px 0' }}>Heatmaps</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>Visualize where users click, scroll and move.</p>
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 500, marginBottom: '6px', display: 'block' }}>Page URL</label>
          <select style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 10px', color: 'var(--text-primary)', fontSize: '13px' }}>
            <option>acmecorp.com/pricing</option>
            <option>acmecorp.com/features</option>
            <option>acmecorp.com/signup</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 500, marginBottom: '8px', display: 'block' }}>Type</label>
          {(['click', 'scroll', 'move'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              width: '100%', textAlign: 'left', padding: '9px 12px', marginBottom: '6px', borderRadius: '8px', border: '1px solid', cursor: 'pointer',
              borderColor: mode === m ? 'var(--primary)' : 'var(--border-color)',
              backgroundColor: mode === m ? 'rgba(99,102,241,0.1)' : 'transparent',
              color: mode === m ? 'var(--primary)' : 'var(--text-secondary)', fontSize: '13px',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              {m === 'click' ? <MousePointerClick size={14} /> : m === 'scroll' ? <ArrowDown size={14} /> : <Map size={14} />}
              {m.charAt(0).toUpperCase() + m.slice(1)} Map
            </button>
          ))}
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 500, marginBottom: '8px', display: 'block' }}>Device</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['desktop', 'mobile'] as const).map(d => (
              <button key={d} onClick={() => setDevice(d)} style={{
                flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid',
                borderColor: device === d ? 'var(--primary)' : 'var(--border-color)',
                backgroundColor: device === d ? 'rgba(99,102,241,0.1)' : 'transparent',
                color: device === d ? 'var(--primary)' : 'var(--text-secondary)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {d === 'desktop' ? <Monitor size={16} /> : <Smartphone size={16} />}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>INTENSITY LEGEND</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
            Low
            <div style={{ flex: 1, height: '7px', borderRadius: '4px', background: 'linear-gradient(to right, rgba(59,130,246,0.4), rgba(234,179,8,0.7), rgba(239,68,68,0.9))' }} />
            High
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>HOT ZONES</div>
          {spots.slice(0, 3).map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
              <span style={{ fontWeight: 700, color: s.intensity > 0.8 ? '#ef4444' : s.intensity > 0.5 ? '#f59e0b' : '#6366f1' }}>{Math.round(s.intensity * 100)}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 600 }}>acmecorp.com/pricing ({device})</span>
          <button style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '4px 10px', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Download size={12} /> Export
          </button>
        </div>
        <div style={{ flex: 1, backgroundColor: '#f8fafc', overflow: 'hidden', position: 'relative' }}>
          <div style={{ width: device === 'mobile' ? '375px' : '100%', margin: '0 auto', height: '100%', backgroundColor: '#fff', position: 'relative', overflowY: 'auto' }}>
            <div style={{ padding: '20px 48px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', alignItems: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '18px', color: '#0f172a' }}>AcmeCorp</div>
              <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#64748b' }}>
                {['Features', 'Pricing', 'Contact'].map((nav, ni) => (
                  <span key={ni} style={{ position: 'relative' }}>
                    {nav}
                    {mode === 'click' && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: `${getSize(ni === 1 ? 0.6 : 0.3)}px`, height: `${getSize(ni === 1 ? 0.6 : 0.3)}px`, borderRadius: '50%', background: getColor(ni === 1 ? 0.6 : 0.3), pointerEvents: 'none' }} />}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ padding: '40px 48px', textAlign: 'center' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>Simple, Transparent Pricing</h1>
              <p style={{ color: '#64748b', fontSize: '15px' }}>No hidden fees. Cancel anytime.</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '0 48px 60px' }}>
              {spots.slice(0, 3).map((s, i) => (
                <div key={i} style={{ width: '200px', padding: '24px', backgroundColor: '#f8fafc', border: i === 0 ? '2px solid #6366f1' : '1px solid #e2e8f0', borderRadius: '12px', textAlign: 'center', position: 'relative' }}>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', marginBottom: '10px' }}>{['Pro', 'Basic', 'Enterprise'][i]}</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '18px' }}>{['$99', '$29', 'Custom'][i]}</div>
                  <div style={{ position: 'relative' }}>
                    <button style={{ width: '100%', padding: '10px', backgroundColor: i === 0 ? '#6366f1' : i === 2 ? '#0f172a' : '#f1f5f9', border: 'none', borderRadius: '8px', color: i === 1 ? '#0f172a' : '#fff', fontWeight: 600, cursor: 'default', fontSize: '13px' }}>{['Get Pro', 'Get Basic', 'Contact Sales'][i]}</button>
                    {mode === 'click' && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: `${getSize(s.intensity)}px`, height: `${getSize(s.intensity)}px`, borderRadius: '50%', background: getColor(s.intensity), pointerEvents: 'none' }} />}
                  </div>
                </div>
              ))}
            </div>
            {mode === 'scroll' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(239,68,68,0.18) 0%, rgba(234,179,8,0.1) 40%, rgba(59,130,246,0.06) 70%, transparent 100%)', pointerEvents: 'none' }} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────
// 3. SCROLL MAPS
// ─────────────────────────────────────────────────
export const CROScrollMaps: React.FC = () => {
  const zones = [
    { label: 'Hero Section', depth: '0–15%', pct: 100, readers: '14,230' },
    { label: 'Features Overview', depth: '15–35%', pct: 78, readers: '11,099' },
    { label: 'Pricing Cards', depth: '35–55%', pct: 55, readers: '7,827' },
    { label: 'Testimonials', depth: '55–70%', pct: 38, readers: '5,407' },
    { label: 'FAQ Section', depth: '70–85%', pct: 22, readers: '3,131' },
    { label: 'Footer / CTA', depth: '85–100%', pct: 11, readers: '1,565' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', gap: '16px', height: '540px' }}>
      <div className="glass-card" style={{ width: '270px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px 0' }}>Scroll Maps</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>See how far users scroll your pages.</p>
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 500, marginBottom: '6px', display: 'block' }}>Page</label>
          <select style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 10px', color: 'var(--text-primary)', fontSize: '13px' }}>
            <option>acmecorp.com/pricing</option>
            <option>acmecorp.com/features</option>
          </select>
        </div>
        <div style={{ flex: 1, borderTop: '1px solid var(--border-color)', paddingTop: '14px', overflowY: 'auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '10px', color: 'var(--text-secondary)' }}>SECTION BREAKDOWN</div>
          {zones.map((z, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 500 }}>{z.label}</span>
                <span style={{ color: z.pct > 70 ? '#ef4444' : z.pct > 40 ? '#f59e0b' : '#6366f1', fontWeight: 700 }}>{z.pct}%</span>
              </div>
              <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '3px' }}>
                <div style={{ height: '100%', width: `${z.pct}%`, borderRadius: '3px', background: `rgba(${z.pct > 70 ? '239,68,68' : z.pct > 40 ? '234,179,8' : '59,130,246'},0.7)` }} />
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{z.readers} readers · {z.depth}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', padding: '10px', backgroundColor: 'rgba(234,179,8,0.05)', borderRadius: '8px', border: '1px solid rgba(234,179,8,0.15)' }}>
          💡 Only <strong style={{ color: '#f59e0b' }}>11%</strong> reach the footer CTA. Move CTA higher.
        </div>
      </div>

      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontWeight: 600 }}>acmecorp.com/pricing (Desktop)</span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>14,230 sessions</span>
        </div>
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ width: '50px', backgroundColor: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' }}>
            {zones.map((z, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: `rgba(${z.pct > 70 ? '239,68,68' : z.pct > 40 ? '234,179,8' : '59,130,246'},${z.pct / 100 * 0.65})`, fontSize: '9px', color: '#fff', fontWeight: 700 }}>{z.pct}%</div>
            ))}
          </div>
          <div style={{ flex: 1, backgroundColor: '#f8fafc', overflowY: 'auto' }}>
            {zones.map((z, i) => (
              <div key={i} style={{ minHeight: '75px', padding: '18px 28px', display: 'flex', alignItems: 'center', borderBottom: '1px dashed #e2e8f0', backgroundColor: `rgba(${z.pct > 70 ? '239,68,68' : z.pct > 40 ? '234,179,8' : '59,130,246'},${z.pct / 100 * 0.07})` }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '3px' }}>{z.label}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{z.readers} users ({z.pct}%)</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────
// 4. CLICK MAPS
// ─────────────────────────────────────────────────
export const CROClickMaps: React.FC = () => {
  const [view, setView] = useState<'map' | 'table'>('map');
  const clicks = [
    { element: 'Pro Plan CTA Button', clicks: 4821, pct: 34, device: 'All', pos: { x: 55, y: 60 } },
    { element: 'Enterprise Contact Sales', clicks: 2140, pct: 15, device: 'Desktop', pos: { x: 80, y: 60 } },
    { element: 'Pricing nav link', clicks: 1988, pct: 14, device: 'All', pos: { x: 65, y: 10 } },
    { element: 'Basic Plan CTA', clicks: 1655, pct: 12, device: 'Mobile', pos: { x: 25, y: 60 } },
    { element: 'Logo / home link', clicks: 1102, pct: 8, device: 'All', pos: { x: 8, y: 10 } },
    { element: 'Features nav', clicks: 950, pct: 7, device: 'Desktop', pos: { x: 42, y: 10 } },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0' }}>Click Maps</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Analyze where users click across your pages.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['map', 'table'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', borderColor: view === v ? 'var(--primary)' : 'var(--border-color)', backgroundColor: view === v ? 'rgba(99,102,241,0.1)' : 'transparent', color: view === v ? 'var(--primary)' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px', textTransform: 'capitalize' }}>{v} View</button>
          ))}
        </div>
      </div>

      {view === 'map' ? (
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', height: '420px' }}>
          <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>acmecorp.com/pricing</span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>14,230 total clicks</span>
          </div>
          <div style={{ backgroundColor: '#f8fafc', height: 'calc(100% - 49px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, padding: '20px 40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ width: '80px', height: '14px', backgroundColor: '#1e293b', borderRadius: '3px' }} />
                <div style={{ display: 'flex', gap: '14px' }}>
                  {[60, 55, 65].map((w, ii) => <div key={ii} style={{ width: `${w}px`, height: '12px', backgroundColor: '#cbd5e1', borderRadius: '3px' }} />)}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '40px' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: '160px', height: '100px', backgroundColor: '#fff', border: i === 0 ? '2px solid #6366f1' : '1px solid #e2e8f0', borderRadius: '8px' }} />
                ))}
              </div>
            </div>
            {clicks.map((c, i) => (
              <div key={i} title={`${c.element}: ${c.clicks}`} style={{ position: 'absolute', left: `${c.pos.x}%`, top: `${c.pos.y}%`, width: `${c.pct * 2 + 15}px`, height: `${c.pct * 2 + 15}px`, borderRadius: '50%', background: `radial-gradient(circle, rgba(${c.pct > 25 ? '239,68,68' : c.pct > 12 ? '234,179,8' : '59,130,246'},${c.pct / 38 + 0.3}) 0%, transparent 70%)`, transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 10 }} />
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                {['Element', 'Clicks', 'Share', 'Device'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clicks.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 16px', fontSize: '13px' }}>{c.element}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600 }}>{c.clicks.toLocaleString()}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '80px', height: '5px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '3px' }}>
                        <div style={{ height: '100%', width: `${c.pct * 2.3}px`, backgroundColor: c.pct > 25 ? '#ef4444' : c.pct > 12 ? '#f59e0b' : '#6366f1', borderRadius: '3px' }} />
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.pct}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--text-secondary)' }}>{c.device}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────
// 5. FUNNEL ANALYSIS
// ─────────────────────────────────────────────────
export const CROFunnelAnalysis: React.FC = () => {
  const steps = [
    { label: 'Landing Page', users: 14230, pct: 100 },
    { label: 'Viewed Pricing', users: 9858, pct: 69 },
    { label: 'Clicked Sign Up', users: 5702, pct: 40 },
    { label: 'Filled Form', users: 3276, pct: 23 },
    { label: 'Confirmed Email', users: 1982, pct: 14 },
    { label: 'Onboarded', users: 1241, pct: 8.7 },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0' }}>Funnel Analysis</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Track user drop-off at each conversion step.</p>
        </div>
        <select style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 12px', color: 'var(--text-primary)', fontSize: '13px' }}>
          <option>Signup Funnel</option>
          <option>Checkout Funnel</option>
          <option>Onboarding Funnel</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {[
          { label: 'Total Entered', value: '14,230', color: '#6366f1' },
          { label: 'Converted', value: '1,241', color: '#10b981' },
          { label: 'Conversion Rate', value: '8.7%', color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '26px', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        {steps.map((step, i) => {
          const dropoff = i < steps.length - 1 ? Number((steps[i].pct - steps[i + 1].pct).toFixed(1)) : 0;
          return (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Step {i + 1}: {step.label}</span>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{step.users.toLocaleString()}</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: step.pct === 100 ? 'var(--text-primary)' : step.pct < 15 ? '#ef4444' : step.pct < 40 ? '#f59e0b' : '#10b981' }}>{step.pct}%</span>
                </div>
              </div>
              <div style={{ height: '30px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${step.pct}%`, background: `linear-gradient(to right, #6366f1, ${step.pct < 15 ? '#ef4444' : step.pct < 40 ? '#f59e0b' : '#10b981'})`, display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#fff', fontWeight: 600 }}>{step.pct}%</span>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingDown size={11} /> -{dropoff}% drop-off ({(step.users - steps[i + 1].users).toLocaleString()} users lost)
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────
// 6. USER JOURNEY MAPPING
// ─────────────────────────────────────────────────
export const CROUserJourneyMapping: React.FC = () => {
  const journeys = [
    { path: ['Landing', 'Pricing', 'Sign Up', 'Dashboard'], users: 4821, conversion: '33.9%', color: '#10b981' },
    { path: ['Landing', 'Features', 'Pricing', 'Sign Up', 'Dashboard'], users: 2140, conversion: '15.0%', color: '#6366f1' },
    { path: ['Landing', 'Pricing', 'Exit'], users: 3102, conversion: '0%', color: '#ef4444' },
    { path: ['Landing', 'Blog', 'Features', 'Pricing', 'Sign Up'], users: 1655, conversion: '11.6%', color: '#f59e0b' },
    { path: ['Landing', 'Exit'], users: 2512, conversion: '0%', color: '#ef4444' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0' }}>User Journey Mapping</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Discover the most common paths users take through your site.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {[
          { label: 'Unique Paths', value: '284', icon: <GitFork size={18} />, color: '#6366f1' },
          { label: 'Avg Path Length', value: '4.2 steps', icon: <ChevronRight size={18} />, color: '#10b981' },
          { label: 'Direct Conversions', value: '34%', icon: <Target size={18} />, color: '#f59e0b' },
          { label: 'Dead Ends', value: '31%', icon: <X size={18} />, color: '#ef4444' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 34, height: 34, borderRadius: '8px', background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card">
        <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '16px' }}>Top User Paths</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {journeys.map((j, i) => (
            <div key={i} style={{ padding: '14px 16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: `1px solid ${j.color}25` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Path #{i + 1}</span>
                <div style={{ display: 'flex', gap: '14px', fontSize: '12px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{j.users.toLocaleString()} users</span>
                  <span style={{ color: j.color, fontWeight: 600 }}>{j.conversion}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                {j.path.map((step, si) => (
                  <React.Fragment key={si}>
                    <div style={{ padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 500, backgroundColor: step === 'Exit' ? 'rgba(239,68,68,0.12)' : step === 'Dashboard' ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.05)', color: step === 'Exit' ? '#ef4444' : step === 'Dashboard' ? '#10b981' : 'var(--text-primary)', border: `1px solid ${step === 'Exit' ? 'rgba(239,68,68,0.2)' : step === 'Dashboard' ? 'rgba(16,185,129,0.2)' : 'var(--border-color)'}` }}>{step}</div>
                    {si < j.path.length - 1 && <ChevronRight size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────
// 7. AI UX RECOMMENDATIONS
// ─────────────────────────────────────────────────
export const CROAiUxRecommendations: React.FC = () => {
  const [applied, setApplied] = useState<number[]>([]);

  const recs = [
    { title: 'Move Primary CTA above the fold', impact: 'High', effort: 'Low', est: '+12% CVR', icon: <Target size={18} />, desc: 'AI analysis shows 68% of users never scroll to the current CTA. Moving it above the fold could significantly boost click-through rates.' },
    { title: 'Reduce form fields from 8 to 4', impact: 'High', effort: 'Medium', est: '+18% submissions', icon: <FileText size={18} />, desc: 'Users drop off at field 5 in 74% of incomplete submissions. Remove Company Size, Phone, and two custom fields to reduce friction.' },
    { title: 'Add social proof near pricing CTA', impact: 'Medium', effort: 'Low', est: '+8% CVR', icon: <Users size={18} />, desc: 'Pages with social proof adjacent to CTAs convert 23% better. Add a "10,000+ customers" badge next to the Pro plan button.' },
    { title: 'Implement exit-intent popup', impact: 'Medium', effort: 'Low', est: 'Recover 15% exits', icon: <Target size={18} />, desc: 'Currently 31% of users leave without converting. An exit-intent popup with a discount offer can recover a significant portion.' },
    { title: 'Optimize mobile checkout flow', impact: 'High', effort: 'High', est: '+22% mobile CVR', icon: <Smartphone size={18} />, desc: 'Mobile conversion rate is 60% lower than desktop. Simplify checkout to single-page, add Apple Pay/Google Pay.' },
  ];

  const impactColor: Record<string, string> = { High: '#ef4444', Medium: '#f59e0b', Low: '#10b981' };
  const effortColor: Record<string, string> = { Low: '#10b981', Medium: '#f59e0b', High: '#ef4444' };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0' }}>AI UX Recommendations</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>AI-generated optimization suggestions based on behavioral data.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px' }}>
            <RefreshCw size={14} /> Refresh
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
            <Sparkles size={14} /> Apply Quick Wins
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {[
          { label: 'Recommendations', value: recs.length, color: '#6366f1' },
          { label: 'Estimated Total Lift', value: '+75% CVR', color: '#10b981' },
          { label: 'Applied', value: applied.length, color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {recs.map((r, i) => (
          <div key={i} className="glass-card" style={{ padding: '18px', border: applied.includes(i) ? '1px solid rgba(16,185,129,0.3)' : '1px solid var(--border-color)', backgroundColor: applied.includes(i) ? 'rgba(16,185,129,0.04)' : undefined }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                <div style={{ width: 38, height: 38, borderRadius: '10px', backgroundColor: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', flexShrink: 0 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{r.title}</span>
                    <span style={{ fontSize: '11px', padding: '2px 7px', borderRadius: '20px', backgroundColor: `${impactColor[r.impact]}15`, color: impactColor[r.impact] }}>↑ {r.impact}</span>
                    <span style={{ fontSize: '11px', padding: '2px 7px', borderRadius: '20px', backgroundColor: `${effortColor[r.effort]}15`, color: effortColor[r.effort] }}>{r.effort} effort</span>
                    <span style={{ fontSize: '11px', padding: '2px 7px', borderRadius: '20px', backgroundColor: 'rgba(16,185,129,0.1)', color: '#10b981', fontWeight: 600 }}>{r.est}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.desc}</div>
                </div>
              </div>
              <button onClick={() => setApplied(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])} style={{
                padding: '7px 14px', borderRadius: '8px', border: '1px solid', cursor: 'pointer', fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0,
                borderColor: applied.includes(i) ? '#10b981' : 'var(--border-color)',
                backgroundColor: applied.includes(i) ? 'rgba(16,185,129,0.1)' : 'transparent',
                color: applied.includes(i) ? '#10b981' : 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', gap: '5px'
              }}>
                {applied.includes(i) ? <><CheckCircle2 size={13} /> Applied</> : 'Apply'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────
// 8. FORM ANALYTICS
// ─────────────────────────────────────────────────
export const CROFormAnalytics: React.FC = () => {
  const fields = [
    { name: 'Full Name', completions: 98, avgTime: '3.2s', dropoffs: 2, issues: [] },
    { name: 'Email Address', completions: 96, avgTime: '5.8s', dropoffs: 2, issues: [] },
    { name: 'Company Name', completions: 87, avgTime: '7.1s', dropoffs: 9, issues: ['High drop-off'] },
    { name: 'Phone Number', completions: 71, avgTime: '9.4s', dropoffs: 16, issues: ['High drop-off', 'Slow fill'] },
    { name: 'Company Size', completions: 64, avgTime: '4.0s', dropoffs: 7, issues: ['Friction'] },
    { name: 'Use Case', completions: 55, avgTime: '18.2s', dropoffs: 9, issues: ['Slow fill', 'High effort'] },
    { name: 'Budget Range', completions: 48, avgTime: '6.5s', dropoffs: 7, issues: ['Sensitive field'] },
    { name: 'How did you hear?', completions: 40, avgTime: '5.0s', dropoffs: 8, issues: ['Low priority'] },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0' }}>Form Analytics</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Analyze field-level performance and identify form friction points.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {[
          { label: 'Form Starts', value: '8,932', color: '#6366f1' },
          { label: 'Completions', value: '3,573', color: '#10b981' },
          { label: 'Completion Rate', value: '40%', color: '#f59e0b' },
          { label: 'Avg Fill Time', value: '2m 14s', color: '#ef4444' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Field Performance — Signup Form</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
              {['Field', 'Completion', 'Avg Fill Time', 'Drop-offs', 'Issues'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((f, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: f.dropoffs > 10 ? 'rgba(239,68,68,0.03)' : 'transparent' }}>
                <td style={{ padding: '11px 16px', fontSize: '13px', fontWeight: 500 }}>{f.name}</td>
                <td style={{ padding: '11px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '75px', height: '5px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '3px' }}>
                      <div style={{ height: '100%', width: `${f.completions}%`, backgroundColor: f.completions > 80 ? '#10b981' : f.completions > 60 ? '#f59e0b' : '#ef4444', borderRadius: '3px' }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: f.completions > 80 ? '#10b981' : f.completions > 60 ? '#f59e0b' : '#ef4444' }}>{f.completions}%</span>
                  </div>
                </td>
                <td style={{ padding: '11px 16px', fontSize: '13px', color: parseFloat(f.avgTime) > 10 ? '#ef4444' : 'var(--text-secondary)' }}>{f.avgTime}</td>
                <td style={{ padding: '11px 16px', fontSize: '13px', color: f.dropoffs > 10 ? '#ef4444' : 'var(--text-secondary)' }}>{f.dropoffs}%</td>
                <td style={{ padding: '11px 16px' }}>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {f.issues.map((iss, ii) => (<span key={ii} style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>{iss}</span>))}
                    {f.issues.length === 0 && <span style={{ fontSize: '11px', color: '#10b981' }}>✓ Good</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────
// 9. EXIT INTENT
// ─────────────────────────────────────────────────
export const CROExitIntent: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [discount, setDiscount] = useState('15');
  const [preview, setPreview] = useState(false);

  return (
    <div className="fade-in" style={{ display: 'flex', gap: '16px' }}>
      <div className="glass-card" style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px 0' }}>Exit Intent</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>Recover abandoning visitors with targeted offers.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>Exit Intent Active</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Triggers when cursor leaves viewport</div>
          </div>
          <button onClick={() => setEnabled(!enabled)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: enabled ? '#10b981' : 'var(--text-muted)', display: 'flex' }}>
            {enabled ? <ToggleRight size={26} /> : <ToggleLeft size={26} />}
          </button>
        </div>

        {[
          { label: 'Trigger Type', opts: ['Mouse Leave (Top)', 'Idle Timeout (30s)', 'Scroll Back Up'] },
          { label: 'Target Pages', opts: ['Pricing Page', 'All Pages', 'Checkout Only'] },
          { label: 'Show Frequency', opts: ['Once per session', 'Once per day', 'Always'] },
        ].map((f, i) => (
          <div key={i}>
            <label style={{ fontSize: '12px', fontWeight: 500, marginBottom: '6px', display: 'block' }}>{f.label}</label>
            <select style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 10px', color: 'var(--text-primary)', fontSize: '13px' }}>
              {f.opts.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}

        <div>
          <label style={{ fontSize: '12px', fontWeight: 500, marginBottom: '6px', display: 'block' }}>Discount Offer (%)</label>
          <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} min="0" max="50" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 10px', color: 'var(--text-primary)', fontSize: '13px', boxSizing: 'border-box' }} />
        </div>

        <button onClick={() => setPreview(!preview)} style={{ padding: '9px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px' }}>
          {preview ? 'Hide Preview' : 'Preview Popup'}
        </button>
        <button style={{ padding: '9px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Save Configuration</button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { label: 'Exit Attempts', value: '4,412', color: '#ef4444' },
            { label: 'Popup Shown', value: '3,108', color: '#f59e0b' },
            { label: 'Recovered (15%)', value: '467', color: '#10b981' },
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {preview ? (
          <div className="glass-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.35)' }}>
            <div style={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '16px', padding: '40px', maxWidth: '380px', textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
              <div style={{ fontSize: '38px', marginBottom: '12px' }}>🎁</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: '#fff' }}>Wait! Don't leave yet.</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>Get <strong style={{ color: '#6366f1' }}>{discount}% off</strong> your first month.</p>
              <button style={{ width: '100%', padding: '13px', backgroundColor: '#6366f1', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', marginBottom: '10px' }}>Claim {discount}% Discount</button>
              <button style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '12px', cursor: 'pointer' }}>No thanks, I'll pass</button>
            </div>
          </div>
        ) : (
          <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Recovery by Page (Last 30 days)</div>
            <div style={{ padding: '18px' }}>
              {['Pricing Page', 'Checkout', 'Sign Up Form', 'Features Page'].map((page, i) => {
                const exits = [1820, 1100, 780, 412][i];
                const recovered = [274, 198, 92, 31][i];
                const rate = Math.round((recovered / exits) * 100);
                return (
                  <div key={i} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                      <span style={{ fontWeight: 500 }}>{page}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{recovered} / {exits} ({rate}%)</span>
                    </div>
                    <div style={{ height: '7px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
                      <div style={{ height: '100%', width: `${rate * 3}%`, backgroundColor: '#10b981', borderRadius: '4px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────
// 10. SMART POPUPS
// ─────────────────────────────────────────────────
export const CROSmartPopups: React.FC = () => {
  const [activePopup, setActivePopup] = useState<number | null>(null);

  const popups = [
    { name: 'Black Friday Offer', type: 'Discount', trigger: 'Exit Intent', status: 'Active', shown: 8204, clicks: 1321, ctr: '16.1%' },
    { name: 'Newsletter Signup', type: 'Lead Capture', trigger: 'Time (30s)', status: 'Active', shown: 12411, clicks: 2108, ctr: '17.0%' },
    { name: 'Free Trial Offer', type: 'CTA', trigger: 'Scroll (60%)', status: 'Paused', shown: 4033, clicks: 512, ctr: '12.7%' },
    { name: 'Webinar Invite', type: 'Event', trigger: 'Page: /blog', status: 'Draft', shown: 0, clicks: 0, ctr: '—' },
  ];

  const statusColors: Record<string, string> = { Active: '#10b981', Paused: '#f59e0b', Draft: '#64748b' };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0' }}>Smart Popups</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Create intelligent, behavior-triggered popup campaigns.</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
          <Plus size={14} /> Create Popup
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {[
          { label: 'Total Popups', value: popups.length },
          { label: 'Active', value: popups.filter(p => p.status === 'Active').length },
          { label: 'Avg CTR', value: '15.3%' },
          { label: 'Leads Generated', value: '3,941' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 700 }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {popups.map((p, i) => (
          <div key={i} className="glass-card" style={{ padding: '16px 18px', cursor: 'pointer', border: `1px solid ${activePopup === i ? 'rgba(99,102,241,0.4)' : 'var(--border-color)'}` }} onClick={() => setActivePopup(activePopup === i ? null : i)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: statusColors[p.status] }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{p.type} · {p.trigger}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{p.shown.toLocaleString()}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Shown</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>{p.ctr}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>CTR</div>
                </div>
                <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', backgroundColor: `${statusColors[p.status]}15`, color: statusColors[p.status], fontWeight: 600 }}>{p.status}</span>
                <ChevronDown size={15} style={{ color: 'var(--text-muted)', transform: activePopup === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </div>
            </div>
            {activePopup === i && (
              <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px' }}>
                <button style={{ padding: '7px 14px', borderRadius: '8px', border: '1px solid var(--primary)', color: 'var(--primary)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px' }}>Edit</button>
                <button style={{ padding: '7px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px' }}>Duplicate</button>
                <button style={{ padding: '7px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px' }}>A/B Test</button>
                {p.status === 'Active' && <button style={{ padding: '7px 14px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px' }}>Pause</button>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────
// 11. WEBSITE PERSONALIZATION
// ─────────────────────────────────────────────────
export const CROWebsitePersonalization: React.FC = () => {
  const [segment, setSegment] = useState('New Visitors');

  const segments = ['New Visitors', 'Returning Users', 'Pricing Visitors', 'Enterprise Leads', 'Mobile Users'];

  const rules: Record<string, { element: string; original: string; personalized: string }[]> = {
    'New Visitors': [
      { element: 'Hero Headline', original: 'Grow Your Business', personalized: 'Start Free — No Credit Card' },
      { element: 'CTA Button', original: 'Get Started', personalized: 'Try Free for 14 Days' },
      { element: 'Social Proof', original: 'Hidden', personalized: 'Show "Join 10,000+ teams"' },
    ],
    'Returning Users': [
      { element: 'Hero Headline', original: 'Grow Your Business', personalized: 'Welcome Back! Pick up where you left off.' },
      { element: 'CTA Button', original: 'Get Started', personalized: 'Continue to Dashboard' },
      { element: 'Banner', original: 'None', personalized: 'Show upgrade prompt (free plan users)' },
    ],
    'Pricing Visitors': [
      { element: 'Exit Popup', original: 'None', personalized: 'Show 15% discount offer' },
      { element: 'Pricing Table', original: 'Monthly pricing', personalized: 'Highlight annual savings' },
      { element: 'Chat Widget', original: 'Default', personalized: 'Pre-fill "pricing question"' },
    ],
    'Enterprise Leads': [
      { element: 'CTA Button', original: 'Get Started', personalized: 'Talk to Enterprise Sales' },
      { element: 'Pricing Display', original: 'All plans', personalized: 'Enterprise plan only' },
      { element: 'Case Study', original: 'Hidden', personalized: 'Fortune 500 case study' },
    ],
    'Mobile Users': [
      { element: 'Nav Menu', original: 'Full nav', personalized: 'Hamburger menu' },
      { element: 'CTA Button', original: 'Long text', personalized: 'Short: "Try Free"' },
      { element: 'Hero Image', original: 'Desktop screenshot', personalized: 'Mobile app screenshot' },
    ],
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0' }}>Website Personalization</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Dynamically personalize content based on user segments.</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
          <Plus size={14} /> Add Rule
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {[
          { label: 'Active Rules', value: '12', color: '#6366f1' },
          { label: 'Segments', value: segments.length, color: '#10b981' },
          { label: 'Avg Lift', value: '+21% CVR', color: '#f59e0b' },
          { label: 'Users Affected', value: '8,421', color: '#6366f1' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '14px' }}>
        <div className="glass-card" style={{ width: '220px', padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '13px' }}>Segments</div>
          {segments.map((s, i) => (
            <div key={i} onClick={() => setSegment(s)} style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '13px', borderLeft: `3px solid ${segment === s ? 'var(--primary)' : 'transparent'}`, backgroundColor: segment === s ? 'rgba(99,102,241,0.1)' : 'transparent', color: segment === s ? 'var(--text-primary)' : 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', transition: 'all 0.15s' }}>
              {s}
            </div>
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="glass-card" style={{ padding: '14px 16px' }}>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>Rules for: {segment}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Content changes when visitor matches this segment</div>
          </div>
          {(rules[segment] || []).map((change, i) => (
            <div key={i} className="glass-card" style={{ padding: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{change.element}</div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'stretch' }}>
                <div style={{ flex: 1, padding: '12px', backgroundColor: 'rgba(239,68,68,0.05)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.15)' }}>
                  <div style={{ fontSize: '10px', color: '#ef4444', fontWeight: 700, marginBottom: '5px' }}>ORIGINAL</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{change.original}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', fontSize: '18px' }}>→</div>
                <div style={{ flex: 1, padding: '12px', backgroundColor: 'rgba(16,185,129,0.05)', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.15)' }}>
                  <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 700, marginBottom: '5px' }}>PERSONALIZED</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>{change.personalized}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
