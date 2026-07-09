import React, { useState, useEffect, useCallback } from 'react';
import { X, RefreshCw, TrendingUp, ShoppingCart, Star, Zap, Target, Brain, BarChart2, Users } from 'lucide-react';

/* ─── Shared Design Tokens ──────────────────────────────────────── */
const card: React.CSSProperties = {
  background: 'rgba(17, 24, 39, 0.7)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '14px',
  padding: '24px',
};

const metaCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '10px',
  padding: '16px',
};

const inp: React.CSSProperties = {
  width: '100%',
  background: '#0d1117',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '13px',
  color: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
};

const sel: React.CSSProperties = {
  ...inp,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%239ca3af' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: '36px',
};

const btnPrimary: React.CSSProperties = {
  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
  border: 'none',
  color: '#fff',
  padding: '9px 18px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const btnSec: React.CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  padding: '9px 18px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: 500,
  cursor: 'pointer',
};

const th: React.CSSProperties = {
  padding: '11px 14px',
  color: '#6b7280',
  fontWeight: 700,
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  textAlign: 'left',
};

const td: React.CSSProperties = {
  padding: '13px 14px',
  color: '#9ca3af',
  fontSize: '13px',
  borderBottom: '1px solid rgba(255,255,255,0.03)',
};

const badge = (color: string): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  background: `${color}18`,
  border: `1px solid ${color}33`,
  color: color,
  padding: '3px 10px',
  borderRadius: '20px',
  fontSize: '11px',
  fontWeight: 600,
});

const statBox = (accent: string): React.CSSProperties => ({
  ...metaCard,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  borderLeft: `3px solid ${accent}`,
});

/* ─── Modal ─────────────────────────────────────────────────────── */
const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean }> = ({ open, onClose, title, children, wide }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', width: '100%', maxWidth: wide ? '680px' : '520px', boxShadow: '0 25px 60px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '22px', maxHeight: '78vh', overflowY: 'auto' }}>{children}</div>
      </div>
    </div>
  );
};

/* ─── Toast dispatcher ───────────────────────────────────────────── */
const toast = (msg: string) => window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));

/* ─── useEcomEvents hook ─────────────────────────────────────────── */
const useEcomEvents = (pageId: string, onPrimary: () => void, onSecondary: () => void) => {
  const pri = useCallback(onPrimary, []);
  const sec = useCallback(onSecondary, []);
  useEffect(() => {
    const hp = () => pri();
    const hs = () => sec();
    window.addEventListener(`ecom-pri-ecom-${pageId}`, hp);
    window.addEventListener(`ecom-sec-ecom-${pageId}`, hs);
    return () => {
      window.removeEventListener(`ecom-pri-ecom-${pageId}`, hp);
      window.removeEventListener(`ecom-sec-ecom-${pageId}`, hs);
    };
  }, [pri, sec, pageId]);
};

/* ─── Mini Bar Chart ─────────────────────────────────────────────── */
const MiniBar: React.FC<{ values: number[]; color: string; height?: number }> = ({ values, color, height = 40 }) => {
  const max = Math.max(...values, 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height }}>
      {values.map((v, i) => (
        <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, background: color, borderRadius: '2px 2px 0 0', opacity: 0.7 + (i / values.length) * 0.3, minHeight: 2 }} />
      ))}
    </div>
  );
};

/* ─── Progress Bar ───────────────────────────────────────────────── */
const ProgressBar: React.FC<{ pct: number; color: string }> = ({ pct, color }) => (
  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '4px', height: '6px', width: '100%', overflow: 'hidden' }}>
    <div style={{ width: `${Math.min(pct, 100)}%`, background: color, height: '100%', borderRadius: '4px', transition: 'width 0.6s ease' }} />
  </div>
);

/* ============================================================
   1. PRODUCT FEED MANAGEMENT
   ============================================================ */
export const EcomProductFeed: React.FC = () => {
  const [syncing, setSyncing] = useState(false);
  const [modal, setModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [feeds, setFeeds] = useState([
    { id: 'FEED-01', name: 'Master Shopify JSON Feed', items: 4510, interval: 'Every 6h', lastSync: '3h ago', status: 'Healthy', format: 'JSON' },
    { id: 'FEED-02', name: 'WooCommerce XML Export', items: 1820, interval: 'Every 12h', lastSync: '11h ago', status: 'Healthy', format: 'XML' },
    { id: 'FEED-03', name: 'Custom API Catalog Feed', items: 310, interval: 'Daily', lastSync: '18h ago', status: 'Warning', format: 'JSON' },
  ]);
  const [form, setForm] = useState({ url: '', name: '', interval: '6', format: 'JSON' });

  const doSync = () => {
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setFeeds(f => f.map(x => ({ ...x, lastSync: 'Just now' }))); toast('All product feeds synced successfully.'); }, 1800);
  };

  useEcomEvents('feed', doSync, () => setModal(true));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Total SKUs', value: '6,640', icon: <ShoppingCart size={16} />, color: '#6366f1' },
          { label: 'Active Feeds', value: '3', icon: <RefreshCw size={16} />, color: '#10b981' },
          { label: 'Avg Sync Time', value: '4.2s', icon: <Zap size={16} />, color: '#f59e0b' },
          { label: 'Errors Today', value: '2', icon: <Target size={16} />, color: '#ef4444' },
        ].map((s, i) => (
          <div key={i} style={statBox(s.color)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: s.color }}>{s.icon}<span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>{s.label}</span></div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Feed Table */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Registered Catalog Feeds</h4>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Product list (naam, price, stock) ek file me taiyar hoti hai jo platforms ko bheji jaati hai</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={btnSec} onClick={() => setAddModal(true)}>+ Add Feed</button>
            <button style={{ ...btnPrimary, opacity: syncing ? 0.7 : 1 }} onClick={doSync} disabled={syncing}>
              <RefreshCw size={14} className={syncing ? 'spin' : ''} />
              {syncing ? 'Syncing...' : 'Sync All Feeds'}
            </button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>{['Feed ID', 'Feed Name', 'Format', 'SKU Count', 'Sync Interval', 'Last Sync', 'Status', 'Action'].map(h => <th key={h} style={th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {feeds.map((f, i) => (
                <tr key={i} style={{ transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={td}><code style={{ fontSize: '11px', color: '#8b5cf6' }}>{f.id}</code></td>
                  <td style={{ ...td, color: '#fff', fontWeight: 600 }}>{f.name}</td>
                  <td style={td}><span style={badge('#6366f1')}>{f.format}</span></td>
                  <td style={td}>{f.items.toLocaleString()} items</td>
                  <td style={td}>{f.interval}</td>
                  <td style={td}>{f.lastSync}</td>
                  <td style={td}><span style={badge(f.status === 'Healthy' ? '#10b981' : '#f59e0b')}>{f.status}</span></td>
                  <td style={td}><button style={{ ...btnSec, padding: '5px 12px', fontSize: '12px' }} onClick={() => { toast(`Feed ${f.id} synced.`); }}>Sync</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Log */}
      <div style={card}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 14px' }}>Recent Sync Activity</h4>
        {[
          { time: '3h ago', msg: 'FEED-01 synced 4,510 products — 0 errors', color: '#10b981' },
          { time: '11h ago', msg: 'FEED-02 synced 1,820 products — 0 errors', color: '#10b981' },
          { time: '18h ago', msg: 'FEED-03 synced 310 products — 2 warnings (missing images)', color: '#f59e0b' },
          { time: '1d ago', msg: 'Scheduled sync completed for all feeds', color: '#6366f1' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: a.color, marginTop: '5px', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', color: '#d1d5db' }}>{a.msg}</div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="Feed Configuration Settings">
        <form onSubmit={e => { e.preventDefault(); setModal(false); toast('Feed settings saved.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Default Catalog URL</label>
            <input style={inp} type="url" defaultValue="https://mybrand.com/feeds/master.json" /></div>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Default Sync Interval</label>
            <select style={sel}><option value="6">Every 6 hours</option><option value="12">Every 12 hours</option><option value="24">Daily</option></select></div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSec}>Cancel</button>
            <button type="submit" style={btnPrimary}>Save Settings</button>
          </div>
        </form>
      </Modal>

      {/* Add Feed Modal */}
      <Modal open={addModal} onClose={() => setAddModal(false)} title="Add New Product Feed">
        <form onSubmit={e => {
          e.preventDefault();
          setFeeds(f => [...f, { id: `FEED-0${f.length + 1}`, name: form.name, items: 0, interval: `Every ${form.interval}h`, lastSync: 'Never', status: 'Pending', format: form.format }]);
          setAddModal(false); toast('New product feed registered.');
        }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Feed Name</label>
            <input style={inp} required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. My Store Feed" /></div>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Feed URL</label>
            <input style={inp} type="url" required value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Format</label>
              <select style={sel} value={form.format} onChange={e => setForm(f => ({ ...f, format: e.target.value }))}><option>JSON</option><option>XML</option></select></div>
            <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Sync Interval</label>
              <select style={sel} value={form.interval} onChange={e => setForm(f => ({ ...f, interval: e.target.value }))}><option value="6">Every 6h</option><option value="12">Every 12h</option><option value="24">Daily</option></select></div>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setAddModal(false)} style={btnSec}>Cancel</button>
            <button type="submit" style={btnPrimary}>Register Feed</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================
   2. GOOGLE MERCHANT CENTER
   ============================================================ */
export const EcomGoogleMerchant: React.FC = () => {
  const [logsModal, setLogsModal] = useState(false);
  const [reauthing, setReauthing] = useState(false);
  const stats = { accountId: '981-240-9943', approved: 4492, disapproved: 18, pending: 36, connection: 'Authenticated' };
  const weekData = [312, 420, 398, 455, 410, 490, 472];

  useEcomEvents('merchant', () => {
    setReauthing(true);
    setTimeout(() => { setReauthing(false); toast('Google Merchant Center re-authenticated.'); }, 1500);
  }, () => setLogsModal(true));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'GMC Account ID', value: stats.accountId, color: '#6366f1' },
          { label: 'Approved SKUs', value: stats.approved.toLocaleString(), color: '#10b981' },
          { label: 'Disapproved', value: stats.disapproved, color: '#ef4444' },
          { label: 'Auth Status', value: stats.connection, color: '#10b981' },
        ].map((s, i) => (
          <div key={i} style={statBox(s.color)}>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            <div style={{ fontSize: i === 0 ? '14px' : '22px', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Main card */}
        <div style={card}>
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Google Merchant Center API</h4>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 20px' }}>Store ke products automatically Google Shopping pe upload hote hain</p>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
              <span style={{ color: '#9ca3af' }}>Approval Rate</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>{((stats.approved / (stats.approved + stats.disapproved)) * 100).toFixed(1)}%</span>
            </div>
            <ProgressBar pct={(stats.approved / (stats.approved + stats.disapproved)) * 100} color="#10b981" />
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button style={{ ...btnPrimary, opacity: reauthing ? 0.7 : 1 }} onClick={() => { setReauthing(true); setTimeout(() => { setReauthing(false); toast('Re-authenticated.'); }, 1500); }} disabled={reauthing}>
              {reauthing ? 'Authenticating...' : 'Re-Authenticate GMC'}
            </button>
            <button style={btnSec} onClick={() => setLogsModal(true)}>View Sync Logs</button>
          </div>
        </div>

        {/* Weekly impressions chart */}
        <div style={card}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Weekly Shopping Impressions</h4>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 16px' }}>Google Shopping pe product views (last 7 days)</p>
          <MiniBar values={weekData} color="#6366f1" height={70} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={i} style={{ fontSize: '10px', color: '#6b7280', flex: 1, textAlign: 'center' }}>{d}</span>
            ))}
          </div>
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#10b981', fontWeight: 600 }}>↑ +12.4% vs last week</div>
        </div>
      </div>

      {/* Disapproved items list */}
      <div style={card}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 14px' }}>Disapproved Items Requiring Attention</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['SKU', 'Product', 'Reason', 'Severity', 'Action'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
          <tbody>
            {[
              { sku: 'SKU-120', name: 'Running Shoes Pro', reason: 'Missing shipping_weight', sev: 'Warning' },
              { sku: 'SKU-442', name: 'Sports Jacket XL', reason: 'Price mismatch (Feed vs Page)', sev: 'Error' },
              { sku: 'SKU-891', name: 'Yoga Mat Premium', reason: 'Missing GTIN barcode', sev: 'Warning' },
            ].map((r, i) => (
              <tr key={i} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={td}><code style={{ color: '#8b5cf6', fontSize: '11px' }}>{r.sku}</code></td>
                <td style={{ ...td, color: '#fff', fontWeight: 500 }}>{r.name}</td>
                <td style={td}>{r.reason}</td>
                <td style={td}><span style={badge(r.sev === 'Error' ? '#ef4444' : '#f59e0b')}>{r.sev}</span></td>
                <td style={td}><button style={{ ...btnSec, padding: '4px 10px', fontSize: '11px' }} onClick={() => toast(`Fixed: ${r.reason}`)}>Fix Now</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={logsModal} onClose={() => setLogsModal(false)} title="Google Merchant Sync Logs">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '14px', fontFamily: 'monospace', fontSize: '11.5px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ color: '#f59e0b' }}>[WARN] SKU-120: Missing shipping_weight. Auto-defaulting to 1kg.</div>
            <div style={{ color: '#ef4444' }}>[ERROR] SKU-442: Price mismatch ($49.99 vs $59.99). Please review landing page.</div>
            <div style={{ color: '#f59e0b' }}>[WARN] SKU-891: GTIN barcode not found. Performance may be reduced.</div>
            <div style={{ color: '#10b981', marginTop: '6px' }}>[OK] Sync Complete. 4,492 products approved. 18 issues flagged.</div>
          </div>
          <button style={btnSec} onClick={() => setLogsModal(false)}>Close Logs</button>
        </div>
      </Modal>
    </div>
  );
};


/* ============================================================
   3. META CATALOG
   ============================================================ */
export const EcomMetaCatalog: React.FC = () => {
  const [pixelModal, setPixelModal] = useState(false);
  const [ingesting, setIngesting] = useState(false);
  const [lastIngest, setLastIngest] = useState('2 hours ago');

  const doIngest = () => {
    setIngesting(true);
    setTimeout(() => { setIngesting(false); setLastIngest('Just now'); toast('Meta catalog ingest complete.'); }, 1600);
  };

  useEcomEvents('meta', doIngest, () => setPixelModal(true));

  const platforms = [
    { name: 'Facebook Shop', items: 4510, status: 'Synced', color: '#1877f2' },
    { name: 'Instagram Shop', items: 4510, status: 'Synced', color: '#e1306c' },
    { name: 'Facebook DPA', items: 4510, status: 'Active', color: '#1877f2' },
    { name: 'Instagram DPA', items: 4510, status: 'Active', color: '#e1306c' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Catalog ID', value: '1092840192', color: '#1877f2' },
          { label: 'Meta Pixel', value: '192004992011', color: '#8b5cf6' },
          { label: 'Products Synced', value: '4,510', color: '#10b981' },
          { label: 'Last Ingest', value: lastIngest, color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={statBox(s.color)}>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: i < 2 ? '13px' : '18px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Meta Commerce Catalog Sync</h4>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Facebook aur Instagram Shop pe products sync hote hain, price aur stock bhi sync hota hai</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={btnSec} onClick={() => setPixelModal(true)}>Pixel Settings</button>
            <button style={{ ...btnPrimary, opacity: ingesting ? 0.7 : 1 }} onClick={doIngest} disabled={ingesting}>
              {ingesting ? 'Ingesting...' : 'Trigger Ingest'}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          {platforms.map((p, i) => (
            <div key={i} style={{ ...metaCard, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{p.items.toLocaleString()} products</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={badge('#10b981')}>{p.status}</span>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color, marginTop: '6px', marginLeft: 'auto' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sync settings */}
      <div style={card}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 14px' }}>Dynamic Product Ads Configuration</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            { label: 'Retargeting Window', value: '30 days', change: 'Edit' },
            { label: 'Audience Type', value: 'ViewContent + ATC', change: 'Edit' },
            { label: 'Optimization Goal', value: 'Purchase Conversions', change: 'Edit' },
          ].map((c, i) => (
            <div key={i} style={metaCard}>
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>{c.label}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{c.value}</div>
              <button style={{ ...btnSec, fontSize: '11px', padding: '4px 10px', marginTop: '8px' }} onClick={() => toast(`${c.label} updated.`)}>{c.change}</button>
            </div>
          ))}
        </div>
      </div>

      <Modal open={pixelModal} onClose={() => setPixelModal(false)} title="Meta Pixel & Catalog Settings">
        <form onSubmit={e => { e.preventDefault(); setPixelModal(false); toast('Meta Pixel settings saved.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Meta Pixel ID</label>
            <input style={inp} defaultValue="192004992011" required /></div>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Catalog ID</label>
            <input style={inp} defaultValue="1092840192" required /></div>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Micro-data Mapping</label>
            <select style={sel}><option>Auto-detect JSON-LD schema</option><option>OpenGraph tags fallback</option></select></div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setPixelModal(false)} style={btnSec}>Cancel</button>
            <button type="submit" style={btnPrimary}>Save Settings</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================
   4. TIKTOK CATALOG
   ============================================================ */
export const EcomTikTokCatalog: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('5 hours ago');

  useEcomEvents('tiktok', () => {
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setLastSync('Just now'); toast('TikTok catalog synced.'); }, 1500);
  }, () => setModal(true));

  const metrics = [
    { label: 'Products Synced', value: '3,200', color: '#ff0050' },
    { label: 'TikTok Pixel', value: 'TT-10928-XX', color: '#69c9d0' },
    { label: 'Shop Status', value: 'Connected', color: '#10b981' },
    { label: 'Last Sync', value: lastSync, color: '#f59e0b' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {metrics.map((m, i) => (
          <div key={i} style={statBox(m.color)}>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>{m.label}</div>
            <div style={{ fontSize: i === 0 ? '22px' : '14px', fontWeight: 700, color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>TikTok Shop Catalog Integration</h4>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Products TikTok business account se connect hain, TikTok Shop pe bik sakte hain</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={btnSec} onClick={() => setModal(true)}>Pixel Settings</button>
            <button style={{ ...btnPrimary, opacity: syncing ? 0.7 : 1 }} onClick={() => { setSyncing(true); setTimeout(() => { setSyncing(false); setLastSync('Just now'); toast('Synced.'); }, 1500); }} disabled={syncing}>
              {syncing ? 'Syncing...' : 'Trigger TikTok Sync'}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
          {[
            { label: 'TikTok Shop', status: 'Connected', products: 3200 },
            { label: 'TikTok Ads Manager', status: 'Active', products: 3200 },
            { label: 'Live Shopping', status: 'Ready', products: 150 },
          ].map((p, i) => (
            <div key={i} style={{ ...metaCard, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{p.label}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{p.products.toLocaleString()} products</div>
              <span style={badge('#10b981')}>{p.status}</span>
            </div>
          ))}
        </div>

        {/* Category breakdown */}
        <h5 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: '0 0 12px' }}>Top Categories on TikTok Shop</h5>
        {[
          { name: 'Beauty & Personal Care', pct: 78, revenue: '$24,500' },
          { name: 'Fashion & Apparel', pct: 65, revenue: '$18,200' },
          { name: 'Electronics', pct: 42, revenue: '$11,800' },
          { name: 'Home & Lifestyle', pct: 35, revenue: '$9,400' },
        ].map((c, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
              <span style={{ color: '#d1d5db' }}>{c.name}</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>{c.revenue}</span>
            </div>
            <ProgressBar pct={c.pct} color="#ff0050" />
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="TikTok Pixel & Shop Settings">
        <form onSubmit={e => { e.preventDefault(); setModal(false); toast('TikTok settings saved.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>TikTok Developer Token</label>
            <input style={inp} defaultValue="tt-dev-token-98124" required /></div>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>TikTok Pixel ID</label>
            <input style={inp} defaultValue="TT-10928400-XX" required /></div>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Shop Region</label>
            <select style={sel}><option>Global</option><option>US</option><option>UK</option><option>Southeast Asia</option></select></div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSec}>Cancel</button>
            <button type="submit" style={btnPrimary}>Save Settings</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================
   5. DYNAMIC PRODUCT ADS
   ============================================================ */
export const EcomDynamicAds: React.FC = () => {
  const [campaignModal, setCampaignModal] = useState(false);
  const [campaigns, setCampaigns] = useState([
    { name: 'Meta Cart Abandoners', platform: 'Facebook', budget: '$150/day', conversions: 45, roas: '3.2x', status: 'Active' },
    { name: 'Instagram PDP Visitors', platform: 'Instagram', budget: '$80/day', conversions: 28, roas: '2.8x', status: 'Active' },
    { name: 'TikTok Retargeting', platform: 'TikTok', budget: '$60/day', conversions: 17, roas: '2.1x', status: 'Paused' },
  ]);
  const [form, setForm] = useState({ name: '', budget: '', platform: 'Facebook', audience: '' });

  useEcomEvents('dynads', () => setCampaignModal(true), () => toast('Dynamic Ads analytics exported.'));

  const total = campaigns.reduce((a, c) => a + c.conversions, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'Active').length, color: '#10b981' },
          { label: 'Total Conversions (30d)', value: total, color: '#6366f1' },
          { label: 'Avg. ROAS', value: '2.7x', color: '#f59e0b' },
          { label: 'Total Spend', value: '$8,740', color: '#ef4444' },
        ].map((s, i) => (
          <div key={i} style={statBox(s.color)}>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Dynamic Retargeting Campaigns</h4>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Jo customer pehle product dekh chuka hai, usko wahi product dikhane wale ads automatically bante hain</p>
          </div>
          <button style={btnPrimary} onClick={() => setCampaignModal(true)}>+ Deploy Campaign</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['Campaign', 'Platform', 'Daily Budget', 'Conversions (30d)', 'ROAS', 'Status', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr key={i} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ ...td, color: '#fff', fontWeight: 600 }}>{c.name}</td>
                <td style={td}><span style={badge('#6366f1')}>{c.platform}</span></td>
                <td style={td}><code style={{ color: '#f59e0b' }}>{c.budget}</code></td>
                <td style={td}>{c.conversions} Sales</td>
                <td style={{ ...td, color: '#10b981', fontWeight: 700 }}>{c.roas}</td>
                <td style={td}><span style={badge(c.status === 'Active' ? '#10b981' : '#6b7280')}>{c.status}</span></td>
                <td style={td}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button style={{ ...btnSec, padding: '4px 10px', fontSize: '11px' }} onClick={() => toast(`Editing ${c.name}`)}>Edit</button>
                    <button style={{ ...btnSec, padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                      setCampaigns(cs => cs.map((x, j) => j === i ? { ...x, status: x.status === 'Active' ? 'Paused' : 'Active' } : x));
                    }}>{c.status === 'Active' ? 'Pause' : 'Resume'}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Audience segments */}
      <div style={card}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 14px' }}>Retargeting Audience Segments</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            { name: 'Cart Abandoners', size: '12,400', ctr: '3.8%', color: '#6366f1' },
            { name: 'Product View (7d)', size: '45,200', ctr: '2.1%', color: '#8b5cf6' },
            { name: 'Past Purchasers', size: '8,900', ctr: '5.2%', color: '#10b981' },
          ].map((a, i) => (
            <div key={i} style={{ ...metaCard, borderLeft: `3px solid ${a.color}` }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{a.name}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: a.color, marginBottom: '4px' }}>{a.size}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>CTR: <span style={{ color: '#10b981', fontWeight: 600 }}>{a.ctr}</span></div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={campaignModal} onClose={() => setCampaignModal(false)} title="Deploy Dynamic Product Ad Campaign" wide>
        <form onSubmit={e => {
          e.preventDefault();
          setCampaigns(cs => [...cs, { name: form.name, platform: form.platform, budget: `$${form.budget}/day`, conversions: 0, roas: '---', status: 'Active' }]);
          setCampaignModal(false); toast('Dynamic retargeting campaign deployed.');
        }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Campaign Name</label>
              <input style={inp} required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Platform</label>
              <select style={sel} value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}>
                <option>Facebook</option><option>Instagram</option><option>TikTok</option>
              </select></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Daily Budget ($)</label>
              <input style={inp} type="number" required value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} /></div>
            <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Audience Segment</label>
              <select style={sel}><option>Cart Abandoners</option><option>Product View (7d)</option><option>Past Purchasers</option></select></div>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setCampaignModal(false)} style={btnSec}>Cancel</button>
            <button type="submit" style={btnPrimary}>Deploy Campaign</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================
   6. CART RECOVERY
   ============================================================ */
export const EcomCartRecovery: React.FC = () => {
  const [seqModal, setSeqModal] = useState(false);
  const [sequences, setSequences] = useState([
    { delay: '30 mins after abandon', channel: 'Email', discount: 'SAVE10 (10%)', recovered: '$4,200', rate: '18.4%', status: 'Enabled' },
    { delay: '2 hours after abandon', channel: 'WhatsApp', discount: 'BACK20 (20%)', recovered: '$2,800', rate: '12.1%', status: 'Enabled' },
    { delay: '24 hours after abandon', channel: 'SMS', discount: 'None', recovered: '$1,100', rate: '6.8%', status: 'Enabled' },
  ]);
  const [form, setForm] = useState({ delay: '30 mins after abandon', channel: 'Email', discount: '' });

  useEcomEvents('recovery', () => setSeqModal(true), () => toast('Cart recovery stats exported.'));

  const weekRecovery = [840, 1200, 980, 1450, 1100, 1680, 1420];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Abandoned Carts (30d)', value: '3,240', color: '#ef4444' },
          { label: 'Recovered Revenue', value: '$8,100', color: '#10b981' },
          { label: 'Recovery Rate', value: '24.7%', color: '#6366f1' },
          { label: 'Active Sequences', value: '3', color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={statBox(s.color)}>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Recovery Automation Sequences</h4>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Cart me item daal ke checkout kiye bina gaye customer ko wapas bulana</p>
            </div>
            <button style={btnPrimary} onClick={() => setSeqModal(true)}>+ Add Sequence</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Trigger Delay', 'Channel', 'Promo Code', 'Revenue Recovered', 'Recovery Rate', 'Status'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
            <tbody>
              {sequences.map((s, i) => (
                <tr key={i} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ ...td, color: '#fff', fontWeight: 600 }}>{s.delay}</td>
                  <td style={td}><span style={badge('#6366f1')}>{s.channel}</span></td>
                  <td style={td}><code style={{ color: '#f59e0b', fontSize: '12px' }}>{s.discount}</code></td>
                  <td style={{ ...td, color: '#10b981', fontWeight: 700 }}>{s.recovered}</td>
                  <td style={td}>{s.rate}</td>
                  <td style={td}><span style={badge('#10b981')}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={card}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Weekly Recovery</h4>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 16px' }}>Revenue recovered this week</p>
          <MiniBar values={weekRecovery} color="#10b981" height={80} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={i} style={{ fontSize: '10px', color: '#6b7280', flex: 1, textAlign: 'center' }}>{d}</span>
            ))}
          </div>
          <div style={{ marginTop: '14px', padding: '12px', background: 'rgba(16,185,129,0.08)', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.15)' }}>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Best Performing</div>
            <div style={{ fontSize: '13px', color: '#fff', marginTop: '4px' }}>30-min Email → 18.4% rate</div>
          </div>
        </div>
      </div>

      <Modal open={seqModal} onClose={() => setSeqModal(false)} title="Create Recovery Sequence">
        <form onSubmit={e => {
          e.preventDefault();
          setSequences(ss => [...ss, { delay: form.delay, channel: form.channel, discount: form.discount || 'None', recovered: '$0', rate: '0%', status: 'Enabled' }]);
          setSeqModal(false); toast('Recovery sequence activated.');
        }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Trigger Delay</label>
            <select style={sel} value={form.delay} onChange={e => setForm(f => ({ ...f, delay: e.target.value }))}>
              <option>30 mins after abandon</option><option>2 hours after abandon</option><option>24 hours after abandon</option>
            </select></div>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Channel</label>
            <select style={sel} value={form.channel} onChange={e => setForm(f => ({ ...f, channel: e.target.value }))}>
              <option>Email</option><option>WhatsApp</option><option>SMS</option>
            </select></div>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Promo Code (optional)</label>
            <input style={inp} value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} placeholder="e.g. SAVE10" /></div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setSeqModal(false)} style={btnSec}>Cancel</button>
            <button type="submit" style={btnPrimary}>Create Sequence</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================
   7. AI UPSELL
   ============================================================ */
export const EcomAiUpsell: React.FC = () => {
  const [ruleModal, setRuleModal] = useState(false);
  const [upsells, setUpsells] = useState([
    { trigger: 'Cart > $50', offer: 'Extended Warranty', acceptRate: '12.4%', revLift: '+$1,450', shown: 890, status: 'Active' },
    { trigger: 'Cart > $100', offer: 'VIP Priority Shipping', acceptRate: '18.2%', revLift: '+$2,100', shown: 1240, status: 'Active' },
    { trigger: 'Electronics Category', offer: 'Screen Protector Bundle', acceptRate: '9.6%', revLift: '+$680', shown: 560, status: 'Active' },
  ]);
  const [form, setForm] = useState({ trigger: '', offer: '', position: 'Pre-checkout' });

  useEcomEvents('upsell', () => setRuleModal(true), () => toast('Upsell analytics generated.'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Active Upsell Rules', value: upsells.filter(u => u.status === 'Active').length, color: '#6366f1' },
          { label: 'Total Revenue Lift', value: '+$4,230', color: '#10b981' },
          { label: 'Avg Accept Rate', value: '13.4%', color: '#f59e0b' },
          { label: 'Shown This Month', value: '2,690', color: '#8b5cf6' },
        ].map((s, i) => (
          <div key={i} style={statBox(s.color)}>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>AI Checkout Upsell Rules</h4>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Checkout ke time AI customer ko usi product ka behtar version lene ka suggestion deta hai</p>
          </div>
          <button style={btnPrimary} onClick={() => setRuleModal(true)}>+ Add Upsell Rule</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['Trigger Condition', 'Upsell Offer', 'Accept Rate', 'Revenue Lift', 'Times Shown', 'Status'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
          <tbody>
            {upsells.map((u, i) => (
              <tr key={i} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={td}>{u.trigger}</td>
                <td style={{ ...td, color: '#fff', fontWeight: 600 }}>{u.offer}</td>
                <td style={td}>{u.acceptRate}</td>
                <td style={{ ...td, color: '#10b981', fontWeight: 700 }}>{u.revLift}</td>
                <td style={td}>{u.shown.toLocaleString()}</td>
                <td style={td}><span style={badge('#10b981')}>{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upsell placement preview */}
      <div style={card}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 14px' }}>Upsell Placement Positions</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            { pos: 'Pre-checkout Page', active: true, conversions: 245 },
            { pos: 'Checkout Summary', active: true, conversions: 182 },
            { pos: 'Order Confirmation', active: false, conversions: 0 },
          ].map((p, i) => (
            <div key={i} style={{ ...metaCard, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{p.pos}</div>
                <span style={badge(p.active ? '#10b981' : '#6b7280')}>{p.active ? 'Active' : 'Inactive'}</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#6366f1' }}>{p.conversions}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>conversions this month</div>
              <button style={{ ...btnSec, fontSize: '11px', padding: '4px 10px' }} onClick={() => toast(`${p.pos} toggled.`)}>
                {p.active ? 'Disable' : 'Enable'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal open={ruleModal} onClose={() => setRuleModal(false)} title="Configure AI Upsell Rule">
        <form onSubmit={e => {
          e.preventDefault();
          setUpsells(us => [...us, { trigger: form.trigger, offer: form.offer, acceptRate: '—', revLift: '+$0', shown: 0, status: 'Active' }]);
          setRuleModal(false); toast('AI upsell rule activated.');
        }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Trigger Condition</label>
            <input style={inp} required value={form.trigger} onChange={e => setForm(f => ({ ...f, trigger: e.target.value }))} placeholder="e.g. Cart > $75" /></div>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Upsell Product/Offer</label>
            <input style={inp} required value={form.offer} onChange={e => setForm(f => ({ ...f, offer: e.target.value }))} placeholder="e.g. Premium Support Plan" /></div>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Placement Position</label>
            <select style={sel} value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))}>
              <option>Pre-checkout Page</option><option>Checkout Summary</option><option>Order Confirmation</option>
            </select></div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setRuleModal(false)} style={btnSec}>Cancel</button>
            <button type="submit" style={btnPrimary}>Save Rule</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================
   8. AI CROSS SELL
   ============================================================ */
export const EcomAiCrossSell: React.FC = () => {
  const [ruleModal, setRuleModal] = useState(false);
  const [crossSells, setCrossSells] = useState([
    { anchor: 'Smartphones', recommended: 'Phone Case + Screen Guard Bundle', support: '68%', orders: 340, status: 'Active' },
    { anchor: 'Running Shoes', recommended: 'Performance Socks + Insoles', support: '54%', orders: 218, status: 'Active' },
    { anchor: 'Laptop', recommended: 'Laptop Bag + USB Hub', support: '71%', orders: 192, status: 'Active' },
    { anchor: 'Coffee Maker', recommended: 'Premium Coffee Beans + Filter Pack', support: '42%', orders: 156, status: 'Active' },
  ]);
  const [form, setForm] = useState({ anchor: '', recommended: '' });

  useEcomEvents('cross', () => setRuleModal(true), () => toast('Cross-sell placement logs loaded.'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Cross-Sell Rules', value: crossSells.length, color: '#8b5cf6' },
          { label: 'Total Cross-Sell Orders', value: crossSells.reduce((a, c) => a + c.orders, 0).toLocaleString(), color: '#10b981' },
          { label: 'Avg Co-occurrence', value: '59%', color: '#f59e0b' },
          { label: 'Revenue Boost', value: '+$12,400', color: '#6366f1' },
        ].map((s, i) => (
          <div key={i} style={statBox(s.color)}>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>AI Cross-Sell Recommendation Rules</h4>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Purchase ke baad AI milte-julte ya matching products suggest karta hai</p>
          </div>
          <button style={btnPrimary} onClick={() => setRuleModal(true)}>+ Add Cross-Sell Rule</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['Anchor Category', 'Recommended Bundle', 'AI Co-occurrence', 'Orders Attributed', 'Status'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
          <tbody>
            {crossSells.map((c, i) => (
              <tr key={i} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={td}><span style={badge('#6366f1')}>{c.anchor}</span></td>
                <td style={{ ...td, color: '#fff', fontWeight: 600 }}>{c.recommended}</td>
                <td style={td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#f59e0b', fontWeight: 600 }}>{c.support}</span>
                    <div style={{ flex: 1, maxWidth: '60px' }}><ProgressBar pct={parseInt(c.support)} color="#f59e0b" /></div>
                  </div>
                </td>
                <td style={{ ...td, color: '#10b981', fontWeight: 700 }}>{c.orders}</td>
                <td style={td}><span style={badge('#10b981')}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI model info */}
      <div style={card}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 14px' }}>AI Model Configuration</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            { label: 'Algorithm', value: 'Collaborative Filtering + Apriori', icon: <Brain size={16} /> },
            { label: 'Training Data', value: '124,000 orders (90 days)', icon: <BarChart2 size={16} /> },
            { label: 'Model Accuracy', value: '82.4% precision', icon: <Target size={16} /> },
          ].map((m, i) => (
            <div key={i} style={metaCard}>
              <div style={{ color: '#8b5cf6', marginBottom: '6px' }}>{m.icon}</div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>{m.label}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{m.value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '14px' }}>
          <button style={btnPrimary} onClick={() => toast('AI cross-sell model retrained.')}>
            <Brain size={14} /> Retrain AI Model
          </button>
        </div>
      </div>

      <Modal open={ruleModal} onClose={() => setRuleModal(false)} title="Add AI Cross-Sell Rule">
        <form onSubmit={e => {
          e.preventDefault();
          setCrossSells(cs => [...cs, { anchor: form.anchor, recommended: form.recommended, support: '—', orders: 0, status: 'Active' }]);
          setRuleModal(false); toast('Cross-sell rule added.');
        }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Anchor Category/Product</label>
            <input style={inp} required value={form.anchor} onChange={e => setForm(f => ({ ...f, anchor: e.target.value }))} placeholder="e.g. Shoes" /></div>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Recommended Cross-Sell</label>
            <input style={inp} required value={form.recommended} onChange={e => setForm(f => ({ ...f, recommended: e.target.value }))} placeholder="e.g. Shoe Polish Kit" /></div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setRuleModal(false)} style={btnSec}>Cancel</button>
            <button type="submit" style={btnPrimary}>Add Rule</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================
   9. CLV PREDICTION
   ============================================================ */
export const EcomClvPrediction: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [predictions, setPredictions] = useState([
    { segment: 'VIP Purchase Cohort', size: '1,240', churn: '2.4%', clv: '$12,450', buyFreq: '4.2x/year', trend: '↑' },
    { segment: 'Regular Shoppers', size: '8,900', churn: '12.8%', clv: '$3,200', buyFreq: '2.1x/year', trend: '→' },
    { segment: 'New Customers (30d)', size: '2,100', churn: '38.5%', clv: '$480', buyFreq: '0.8x/year', trend: '↓' },
    { segment: 'Dormant (90d inactive)', size: '4,500', churn: '72.1%', clv: '$120', buyFreq: '0.2x/year', trend: '↓' },
  ]);

  const doRun = () => {
    setRunning(true);
    setTimeout(() => { setRunning(false); toast('AI CLV predictions recalculated.'); }, 2000);
  };

  useEcomEvents('clv', doRun, () => toast('CLV spreadsheet exported.'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Avg Customer LTV', value: '$4,062', color: '#6366f1' },
          { label: 'Predicted Revenue (12m)', value: '$2.4M', color: '#10b981' },
          { label: 'Avg Churn Risk', value: '14.2%', color: '#ef4444' },
          { label: 'VIP Customers', value: '1,240', color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={statBox(s.color)}>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Customer Cohort CLV Estimations</h4>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Purane orders dekh kar AI andaza lagata hai ki ek customer aage kitni total kamai de sakta hai</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={btnSec} onClick={() => toast('CLV data exported.')}>Export CSV</button>
            <button style={{ ...btnPrimary, opacity: running ? 0.7 : 1 }} onClick={doRun} disabled={running}>
              {running ? <><RefreshCw size={14} /> Running AI...</>  : <><Brain size={14} /> Run CLV Analysis</>}
            </button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['Customer Segment', 'Segment Size', 'Churn Risk', 'Predicted CLV', 'Purchase Frequency', 'Trend'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
          <tbody>
            {predictions.map((p, i) => (
              <tr key={i} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ ...td, color: '#fff', fontWeight: 600 }}>{p.segment}</td>
                <td style={td}>{p.size}</td>
                <td style={td}>
                  <span style={{ color: parseFloat(p.churn) > 30 ? '#ef4444' : parseFloat(p.churn) > 10 ? '#f59e0b' : '#10b981', fontWeight: 600 }}>
                    {p.churn}
                  </span>
                </td>
                <td style={{ ...td, color: '#10b981', fontWeight: 700 }}>{p.clv}</td>
                <td style={td}>{p.buyFreq}</td>
                <td style={td}>
                  <span style={{ color: p.trend === '↑' ? '#10b981' : p.trend === '↓' ? '#ef4444' : '#f59e0b', fontSize: '16px', fontWeight: 700 }}>{p.trend}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions based on CLV */}
      <div style={card}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 14px' }}>AI-Recommended Actions by Segment</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {[
            { segment: 'VIP Cohort', action: 'Send exclusive loyalty rewards + early access', color: '#10b981', icon: <Star size={14} /> },
            { segment: 'Regular Shoppers', action: 'Deploy cross-sell campaigns + referral incentives', color: '#6366f1', icon: <TrendingUp size={14} /> },
            { segment: 'New Customers', action: 'Trigger onboarding email drip + first purchase discount', color: '#f59e0b', icon: <Zap size={14} /> },
            { segment: 'Dormant Users', action: 'Win-back SMS campaign + steep discount offer', color: '#ef4444', icon: <Target size={14} /> },
          ].map((a, i) => (
            <div key={i} style={{ ...metaCard, borderLeft: `3px solid ${a.color}` }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', color: a.color, marginBottom: '6px' }}>
                {a.icon}<span style={{ fontSize: '12px', fontWeight: 700 }}>{a.segment}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#d1d5db', lineHeight: 1.5 }}>{a.action}</div>
              <button style={{ ...btnSec, fontSize: '11px', padding: '4px 10px', marginTop: '8px' }} onClick={() => toast(`Campaign launched for ${a.segment}.`)}>Launch Campaign</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


/* ============================================================
   10. PRODUCT RECOMMENDATION ENGINE
   ============================================================ */
export const EcomProductRecommendation: React.FC = () => {
  const [widgetModal, setWidgetModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [widgets, setWidgets] = useState([
    { placement: 'Home Page Hero', algo: 'Trending + Personalized', maxItems: 8, ctr: '4.2%', status: 'Active' },
    { placement: 'Product Detail Page', algo: 'Collaborative Filtering', maxItems: 6, ctr: '6.8%', status: 'Active' },
    { placement: 'Cart Drawer', algo: 'Frequently Bought Together', maxItems: 4, ctr: '9.1%', status: 'Active' },
    { placement: 'Order Confirmation', algo: 'Post-purchase Cross-sell', maxItems: 4, ctr: '3.4%', status: 'Active' },
    { placement: 'Email Newsletter', algo: 'User History + Trending', maxItems: 6, ctr: '2.9%', status: 'Active' },
  ]);
  const [form, setForm] = useState({ placement: '', algo: 'Collaborative Filtering', maxItems: '6' });

  useEcomEvents('recs', () => setWidgetModal(true), () => toast('Recommendation settings saved.'));

  const mockProducts = [
    { name: 'Wireless Headphones Pro', price: '$129', score: 98, img: '🎧' },
    { name: 'Smart Watch Series 5', price: '$249', score: 94, img: '⌚' },
    { name: 'Bluetooth Speaker', price: '$79', score: 91, img: '🔊' },
    { name: 'USB-C Hub 7-in-1', price: '$49', score: 88, img: '🔌' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Active Widgets', value: widgets.filter(w => w.status === 'Active').length, color: '#6366f1' },
          { label: 'Avg CTR', value: '5.3%', color: '#10b981' },
          { label: 'Recommendations/Day', value: '48,200', color: '#f59e0b' },
          { label: 'Revenue Attributed', value: '$18,900', color: '#8b5cf6' },
        ].map((s, i) => (
          <div key={i} style={statBox(s.color)}>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Personalization Recommendation Widgets</h4>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Customer ki pasand ke hisaab se personalized products dikhaye jaate hain</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={btnSec} onClick={() => setPreviewModal(true)}>Preview Recommendations</button>
            <button style={btnPrimary} onClick={() => setWidgetModal(true)}>+ Add Widget</button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['Placement Location', 'Algorithm', 'Max Items', 'CTR', 'Status', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
          <tbody>
            {widgets.map((w, i) => (
              <tr key={i} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ ...td, color: '#fff', fontWeight: 600 }}>{w.placement}</td>
                <td style={td}>{w.algo}</td>
                <td style={td}><code style={{ color: '#8b5cf6' }}>{w.maxItems} items</code></td>
                <td style={{ ...td, color: '#10b981', fontWeight: 700 }}>{w.ctr}</td>
                <td style={td}><span style={badge('#10b981')}>{w.status}</span></td>
                <td style={td}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button style={{ ...btnSec, padding: '4px 10px', fontSize: '11px' }} onClick={() => toast(`Editing ${w.placement}`)}>Edit</button>
                    <button style={{ ...btnSec, padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                      setWidgets(ws => ws.filter((_, j) => j !== i));
                      toast('Widget removed.');
                    }}>Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Algorithm comparison */}
      <div style={card}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 14px' }}>Algorithm Performance Comparison</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            { name: 'Collaborative Filtering', ctr: '6.8%', accuracy: 84, color: '#6366f1' },
            { name: 'Content-Based TF-IDF', ctr: '4.2%', accuracy: 76, color: '#8b5cf6' },
            { name: 'Trending + Personalized', ctr: '5.1%', accuracy: 79, color: '#10b981' },
          ].map((a, i) => (
            <div key={i} style={{ ...metaCard, borderTop: `3px solid ${a.color}` }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>{a.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: '#6b7280' }}>CTR</span>
                <span style={{ color: a.color, fontWeight: 700 }}>{a.ctr}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                <span style={{ color: '#6b7280' }}>Accuracy</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{a.accuracy}%</span>
              </div>
              <ProgressBar pct={a.accuracy} color={a.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Add Widget Modal */}
      <Modal open={widgetModal} onClose={() => setWidgetModal(false)} title="Deploy Recommendation Widget">
        <form onSubmit={e => {
          e.preventDefault();
          setWidgets(ws => [...ws, { placement: form.placement, algo: form.algo, maxItems: parseInt(form.maxItems), ctr: '0%', status: 'Active' }]);
          setWidgetModal(false); toast('Recommendation widget deployed.');
        }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Placement Location</label>
            <input style={inp} required value={form.placement} onChange={e => setForm(f => ({ ...f, placement: e.target.value }))} placeholder="e.g. Category Page" /></div>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Algorithm</label>
            <select style={sel} value={form.algo} onChange={e => setForm(f => ({ ...f, algo: e.target.value }))}>
              <option>Collaborative Filtering</option>
              <option>Content-Based TF-IDF</option>
              <option>Trending + Personalized</option>
              <option>Frequently Bought Together</option>
              <option>Post-purchase Cross-sell</option>
            </select></div>
          <div><label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Max Items to Show</label>
            <select style={sel} value={form.maxItems} onChange={e => setForm(f => ({ ...f, maxItems: e.target.value }))}>
              <option value="4">4 items</option><option value="6">6 items</option><option value="8">8 items</option><option value="12">12 items</option>
            </select></div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setWidgetModal(false)} style={btnSec}>Cancel</button>
            <button type="submit" style={btnPrimary}>Deploy Widget</button>
          </div>
        </form>
      </Modal>

      {/* Preview Modal */}
      <Modal open={previewModal} onClose={() => setPreviewModal(false)} title="Live Recommendation Preview" wide>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>AI-generated product recommendations based on user "John D." profile</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {mockProducts.map((p, i) => (
              <div key={i} style={{ ...metaCard, display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ fontSize: '32px' }}>{p.img}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{p.name}</div>
                  <div style={{ fontSize: '14px', color: '#10b981', fontWeight: 700 }}>{p.price}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>AI Score</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#6366f1' }}>{p.score}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px', background: 'rgba(99,102,241,0.08)', borderRadius: '8px', border: '1px solid rgba(99,102,241,0.15)', fontSize: '12px', color: '#9ca3af' }}>
            <strong style={{ color: '#6366f1' }}>Algorithm:</strong> Collaborative Filtering based on 47 similar user profiles. Confidence: 92.4%
          </div>
          <button style={btnSec} onClick={() => setPreviewModal(false)}>Close Preview</button>
        </div>
      </Modal>
    </div>
  );
};
