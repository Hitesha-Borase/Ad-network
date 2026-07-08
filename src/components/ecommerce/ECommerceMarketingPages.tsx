import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Link, RefreshCw, AlertCircle, Play, 
  Settings, CheckCircle2, X, Plus, Activity, 
  TrendingUp, BarChart3, Users, DollarSign, Database
} from 'lucide-react';

/* Standard styles */
const cardStyle: React.CSSProperties = {
  background: 'rgba(22, 28, 38, 0.6)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '12px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#121212',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '6px',
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
  backgroundColor: '#6366f1',
  border: 'none',
  color: '#ffffff',
  padding: '10px 18px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background-color 0.2s'
};

const btnSecStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  color: '#ffffff',
  padding: '10px 18px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: 500,
  cursor: 'pointer'
};

const tableHeaderStyle: React.CSSProperties = {
  padding: '12px 16px',
  color: '#888888',
  fontWeight: 600,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
};

const tableCellStyle: React.CSSProperties = {
  padding: '14px 16px',
  color: '#aaaaaa',
  fontSize: '13px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
};

/* Reusable Modal Component */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#0d1117',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '520px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ padding: '20px', maxHeight: '75vh', overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

/* Custom events listener hook for Ecom dispatches */
const useEcomEvents = (
  pageId: string, 
  onPrimary: () => void, 
  onSecondary: () => void
) => {
  useEffect(() => {
    const handlePri = () => onPrimary();
    const handleSec = () => onSecondary();

    window.addEventListener(`ecom-pri-ecom-${pageId}`, handlePri);
    window.addEventListener(`ecom-sec-ecom-${pageId}`, handleSec);

    return () => {
      window.removeEventListener(`ecom-pri-ecom-${pageId}`, handlePri);
      window.removeEventListener(`ecom-sec-ecom-${pageId}`, handleSec);
    };
  }, [onPrimary, onSecondary, pageId]);
};

const triggerToast = (msg: string) => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
};


/* ============================================================================
   1. PRODUCT FEED MANAGEMENT
   ============================================================================ */
export const EcomProductFeed: React.FC = () => {
  const [syncing, setSyncing] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [feeds, setFeeds] = useState([
    { id: 'FEED-01', name: 'Master Shopify JSON Feed', items: 4510, interval: 'Every 6 hours', lastSync: '3 hours ago', status: 'Healthy' }
  ]);

  useEcomEvents(
    'feed',
    () => {
      setSyncing(true);
      setTimeout(() => {
        setSyncing(false);
        setFeeds(feeds.map(f => ({ ...f, lastSync: 'Just now' })));
        triggerToast('Product Catalog XML/JSON feed sync complete.');
      }, 1500);
    },
    () => setSettingsModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Registered Product Catalog Feeds</h4>
          <button style={btnStyle} onClick={() => { setSyncing(true); setTimeout(() => { setSyncing(false); triggerToast('Synced.'); }, 1000); }} disabled={syncing}>
            {syncing ? 'Synchronizing catalog...' : 'Sync Product Feed Now'}
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Feed ID</th>
                <th style={tableHeaderStyle}>Feed Ingest Name</th>
                <th style={tableHeaderStyle}>SKU Count</th>
                <th style={tableHeaderStyle}>Sync Interval</th>
                <th style={tableHeaderStyle}>Last Execution</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {feeds.map((f, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle}><code>{f.id}</code></td>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{f.name}</td>
                  <td style={tableCellStyle}>{f.items} items</td>
                  <td style={tableCellStyle}>{f.interval}</td>
                  <td style={tableCellStyle}>{f.lastSync}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>{f.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={settingsModal} onClose={() => setSettingsModal(false)} title="Product Feed Configurations">
        <form onSubmit={(e) => { e.preventDefault(); setSettingsModal(false); triggerToast('Feed synchronization settings saved.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Catalog Ingestion Target URL</label>
            <input type="url" defaultValue="https://mybrand.com/feeds/master.json" style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Sync Interval Frequency</label>
            <select style={selectStyle}>
              <option value="6">Every 6 hours</option>
              <option value="12">Every 12 hours</option>
              <option value="24">Daily (24 hours)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setSettingsModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Settings</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   2. GOOGLE MERCHANT CENTER INTEGRATION
   ============================================================================ */
export const EcomGoogleMerchant: React.FC = () => {
  const [logsModal, setLogsModal] = useState(false);
  const [stats, setStats] = useState({ accountId: '98124099', itemsApproved: 4492, itemsDisapproved: 18, connection: 'Authenticated' });

  useEcomEvents(
    'merchant',
    () => {
      triggerToast('Google Merchant Center API re-authentication completed.');
    },
    () => setLogsModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Google Merchant Center Connector API</h4>
        <div style={{ fontSize: '13px', color: '#aaaaaa' }}>
          Coordinate automated Google Shopping Ads catalog status feeds.
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '16px' }}>
            <div style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>GMC ACCOUNT ID</span>
              <strong style={{ color: '#ffffff', display: 'block', marginTop: '4px' }}>{stats.accountId}</strong>
            </div>
            <div style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>APPROVED SKUS</span>
              <strong style={{ color: '#10b981', display: 'block', marginTop: '4px' }}>{stats.itemsApproved} items</strong>
            </div>
            <div style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>DISAPPROVED SKUS</span>
              <strong style={{ color: '#ef4444', display: 'block', marginTop: '4px' }}>{stats.itemsDisapproved} items</strong>
            </div>
            <div style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>AUTH STATUS</span>
              <strong style={{ color: '#10b981', display: 'block', marginTop: '4px' }}>{stats.connection}</strong>
            </div>
          </div>
          <button style={{ ...btnStyle, marginTop: '20px' }} onClick={() => triggerToast('OAuth 2.0 flow dispatched.')}>Re-authenticate Google Merchant</button>
        </div>
      </div>

      <Modal isOpen={logsModal} onClose={() => setLogsModal(false)} title="Google Merchant Sync Logs">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
          <p style={{ color: '#aaaaaa' }}>GMC product validation warnings and API sync outputs.</p>
          <div style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '14px', fontFamily: 'monospace', fontSize: '11px', color: '#f59e0b', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>[Warning] SKU-120: Missing shipping_weight attribute. Defaulting to 1kg.</div>
            <div>[Warning] SKU-442: Price mismatch on Landing Page ($49.99 vs Feed $59.99). Autocorrecting to page value.</div>
            <div style={{ color: '#10b981', marginTop: '4px' }}>Sync state: Complete. 18 errors resolved.</div>
          </div>
          <button style={btnSecStyle} onClick={() => setLogsModal(false)}>Close Log View</button>
        </div>
      </Modal>
    </div>
  );
};


/* ============================================================================
   3. META CATALOG
   ============================================================================ */
export const EcomMetaCatalog: React.FC = () => {
  const [pixelModal, setPixelModal] = useState(false);
  const [stats, setStats] = useState({ name: 'Meta Core Catalog', id: '1092840192', lastIngest: '2 hours ago', status: 'Healthy' });

  useEcomEvents(
    'meta',
    () => {
      setStats({...stats, lastIngest: 'Just now'});
      triggerToast('Meta Commerce dynamic catalog ingest triggered.');
    },
    () => setPixelModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Meta Commerce Catalog Sync</h4>
          <button style={btnStyle} onClick={() => { setStats({...stats, lastIngest: 'Just now'}); triggerToast('Meta ingest triggered.'); }}>Trigger Meta Ingest</button>
        </div>
        <div style={{ fontSize: '13px', color: '#aaaaaa' }}>
          Sync variables to deploy Facebook and Instagram Dynamic Ads.
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '16px' }}>
            <div style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>CATALOG NAME</span>
              <strong style={{ color: '#ffffff', display: 'block', marginTop: '4px' }}>{stats.name}</strong>
            </div>
            <div style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>META PIXEL ID</span>
              <strong style={{ color: '#ffffff', display: 'block', marginTop: '4px' }}>192004992011</strong>
            </div>
            <div style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>LAST INGEST</span>
              <strong style={{ color: '#10b981', display: 'block', marginTop: '4px' }}>{stats.lastIngest}</strong>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={pixelModal} onClose={() => setPixelModal(false)} title="Meta Conversion Pixel Setup">
        <form onSubmit={(e) => { e.preventDefault(); setPixelModal(false); triggerToast('Meta Conversion pixel parameters updated.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Meta Pixel Code Key</label>
            <input type="text" defaultValue="192004992011" style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Dynamic Micro-data mapping</label>
            <select style={selectStyle}>
              <option value="JSON-LD">Auto-detect JSON-LD schema</option>
              <option value="OpenGraph">OpenGraph tags fallback</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setPixelModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Settings</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   4. TIKTOK CATALOG
   ============================================================================ */
export const EcomTikTokCatalog: React.FC = () => {
  const [pixelModal, setPixelModal] = useState(false);
  const [stats, setStats] = useState({ name: 'TikTok Catalog Sync', lastIngest: '5 hours ago' });

  useEcomEvents(
    'tiktok',
    () => {
      setStats({...stats, lastIngest: 'Just now'});
      triggerToast('TikTok Commerce catalog sync started.');
    },
    () => setPixelModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>TikTok Shop Catalog Sync</h4>
          <button style={btnStyle} onClick={() => { setStats({...stats, lastIngest: 'Just now'}); triggerToast('TikTok catalog ingest triggered.'); }}>Trigger TikTok Sync</button>
        </div>
        <div style={{ fontSize: '13px', color: '#aaaaaa' }}>
          Map dynamic product listings to TikTok pixel events.
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '16px' }}>
            <div style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>CATALOG NAME</span>
              <strong style={{ color: '#ffffff', display: 'block', marginTop: '4px' }}>{stats.name}</strong>
            </div>
            <div style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>TIKTOK PIXEL ID</span>
              <strong style={{ color: '#ffffff', display: 'block', marginTop: '4px' }}>TT-10928400-XX</strong>
            </div>
            <div style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>LAST INGEST</span>
              <strong style={{ color: '#10b981', display: 'block', marginTop: '4px' }}>{stats.lastIngest}</strong>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={pixelModal} onClose={() => setPixelModal(false)} title="TikTok Conversion Pixel Setup">
        <form onSubmit={(e) => { e.preventDefault(); setPixelModal(false); triggerToast('TikTok Pixel parameters saved.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>TikTok Developer Token</label>
            <input type="text" defaultValue="tt-dev-token-98124" style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setPixelModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Settings</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   5. DYNAMIC PRODUCT ADS
   ============================================================================ */
export const EcomDynamicAds: React.FC = () => {
  const [campaignModal, setCampaignModal] = useState(false);
  const [campaigns, setCampaigns] = useState([
    { name: 'Meta Cart Abandoners Retargeting', budget: '$150/day', conversions: 45, status: 'Active' }
  ]);
  const [form, setForm] = useState({ name: '', budget: '' });

  useEcomEvents(
    'dynads',
    () => setCampaignModal(true),
    () => {
      triggerToast('Dynamic Product Ads performance analytics generated.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Active Dynamic Ads Campaigns</h4>
          <button style={btnStyle} onClick={() => setCampaignModal(true)}>Deploy Dynamic Campaign</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Campaign Name</th>
                <th style={tableHeaderStyle}>Daily Budget Cap</th>
                <th style={tableHeaderStyle}>Conversions (30D)</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{c.name}</td>
                  <td style={tableCellStyle}><code>{c.budget}</code></td>
                  <td style={tableCellStyle}>{c.conversions} Sales</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={campaignModal} onClose={() => setCampaignModal(false)} title="Deploy Dynamic Product Ad Campaign">
        <form onSubmit={(e) => { e.preventDefault(); setCampaigns([...campaigns, { name: form.name, budget: `$${form.budget}/day`, conversions: 0, status: 'Active' }]); setCampaignModal(false); triggerToast('Dynamic retargeting campaign deployed to Meta/TikTok API.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Campaign Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Daily Budget Allocation ($)</label>
            <input type="number" onChange={e => setForm({...form, budget: e.target.value})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setCampaignModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Deploy Campaign</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   6. CART RECOVERY
   ============================================================================ */
export const EcomCartRecovery: React.FC = () => {
  const [seqModal, setSeqModal] = useState(false);
  const [sequences, setSequences] = useState([
    { triggerDelay: '30 mins after abandon', channel: 'Email Campaign', discount: '10% Coupon', status: 'Enabled' }
  ]);
  const [form, setForm] = useState({ delay: '30 mins after abandon', channel: 'Email Campaign', discount: 'None' });

  useEcomEvents(
    'recovery',
    () => setSeqModal(true),
    () => {
      triggerToast('Abandoned Cart metrics logs generated.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Abandoned Cart Recovery Workflows</h4>
          <button style={btnStyle} onClick={() => setSeqModal(true)}>Create Recovery Sequence</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Trigger Timing Delay</th>
                <th style={tableHeaderStyle}>Outbound Channel</th>
                <th style={tableHeaderStyle}>Incentive Promo Code</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sequences.map((s, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{s.triggerDelay}</td>
                  <td style={tableCellStyle}>{s.channel}</td>
                  <td style={tableCellStyle}><code>{s.discount}</code></td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={seqModal} onClose={() => setSeqModal(false)} title="Create Recovery Sequence Workflow">
        <form onSubmit={(e) => { e.preventDefault(); setSequences([...sequences, { triggerDelay: form.delay, channel: form.channel, discount: form.discount, status: 'Enabled' }]); setSeqModal(false); triggerToast('Cart recovery automated sequence enabled.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Trigger Delay</label>
            <select value={form.delay} onChange={e => setForm({...form, delay: e.target.value})} style={selectStyle}>
              <option value="30 mins after abandon">30 minutes after abandonment</option>
              <option value="2 hours after abandon">2 hours after abandonment</option>
              <option value="24 hours after abandon">24 hours after abandonment</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Communication Channel</label>
            <select value={form.channel} onChange={e => setForm({...form, channel: e.target.value})} style={selectStyle}>
              <option value="Email Campaign">Email Automation</option>
              <option value="WhatsApp Push">WhatsApp Business Broadcast</option>
              <option value="SMS Text Alert">SMS Text Alert</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Incentive discount code</label>
            <input type="text" value={form.discount} onChange={e => setForm({...form, discount: e.target.value})} style={inputStyle} placeholder="e.g. SAVE10" required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setSeqModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Create Flow</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   7. AI UPSELL
   ============================================================================ */
export const EcomAiUpsell: React.FC = () => {
  const [ruleModal, setRuleModal] = useState(false);
  const [upsells, setUpsells] = useState([
    { triggerTier: 'Cart values > $50', upsellOffer: 'Extended Warranty Coverage', acceptRate: '12.4%', revenueLift: '+$1,450.00' }
  ]);
  const [form, setForm] = useState({ trigger: '', offer: '' });

  useEcomEvents(
    'upsell',
    () => setRuleModal(true),
    () => {
      triggerToast('AI Smart Upsell conversion statistics generated.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Checkout Interstitial AI Upsells</h4>
          <button style={btnStyle} onClick={() => setRuleModal(true)}>Configure Upsell Rules</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Cart Trigger Condition</th>
                <th style={tableHeaderStyle}>Upsell Offer Product</th>
                <th style={tableHeaderStyle}>Customer Accept Rate</th>
                <th style={tableHeaderStyle}>Attributed Revenue Lift</th>
              </tr>
            </thead>
            <tbody>
              {upsells.map((u, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle}>{u.triggerTier}</td>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{u.upsellOffer}</td>
                  <td style={tableCellStyle}>{u.acceptRate}</td>
                  <td style={tableCellStyle} style={{ color: '#10b981', fontWeight: 700 }}>{u.revenueLift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={ruleModal} onClose={() => setRuleModal(false)} title="Configure AI Smart Upsell Rule">
        <form onSubmit={(e) => { e.preventDefault(); setUpsells([...upsells, { triggerTier: form.trigger, upsellOffer: form.offer, acceptRate: '---', revenueLift: '+$0.00' }]); setRuleModal(false); triggerToast('AI upsell checkout rule enabled.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Cart Trigger Condition</label>
            <input type="text" onChange={e => setForm({...form, trigger: e.target.value})} style={inputStyle} placeholder="e.g. Cart values > $100" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Upsell Product Offer</label>
            <input type="text" onChange={e => setForm({...form, offer: e.target.value})} style={inputStyle} placeholder="e.g. VIP Priority Shipping" required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setRuleModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Rule</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   8. AI CROSS SELL
   ============================================================================ */
export const EcomAiCrossSell: React.FC = () => {
  const [ruleModal, setRuleModal] = useState(false);
  const [crossSells, setCrossSells] = useState([
    { triggerCategory: 'Apparel & Clothes', recommendedCross: 'Dynamic Match Socks', supportRate: '34%', status: 'Active' }
  ]);
  const [form, setForm] = useState({ category: '', product: '' });

  useEcomEvents(
    'cross',
    () => setRuleModal(true),
    () => {
      triggerToast('AI Cross-sell placement logs loaded.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>AI Cart Cross-Sell Suggestions</h4>
          <button style={btnStyle} onClick={() => setRuleModal(true)}>Configure Cross-Sell Rules</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Anchor Product Category</th>
                <th style={tableHeaderStyle}>Recommended Cross-Sell</th>
                <th style={tableHeaderStyle}>AI Co-occurrence Support</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {crossSells.map((c, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle}>{c.triggerCategory}</td>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{c.recommendedCross}</td>
                  <td style={tableCellStyle}><code>{c.supportRate}</code></td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={ruleModal} onClose={() => setRuleModal(false)} title="Configure AI Cart Cross-Sell Placement">
        <form onSubmit={(e) => { e.preventDefault(); setCrossSells([...crossSells, { triggerCategory: form.category, recommendedCross: form.product, supportRate: '12%', status: 'Active' }]); setRuleModal(false); triggerToast('Cart cross-sell recommendation placement added.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Anchor Category</label>
            <input type="text" onChange={e => setForm({...form, category: e.target.value})} style={inputStyle} placeholder="e.g. Shoes" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Cross-Sell Recommendation SKU</label>
            <input type="text" onChange={e => setForm({...form, product: e.target.value})} style={inputStyle} placeholder="e.g. Polish Kit" required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setRuleModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Rule</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   9. CUSTOMER LIFETIME VALUE PREDICTION
   ============================================================================ */
export const EcomClvPrediction: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [predictions, setPredictions] = useState([
    { segments: 'VIP Purchase Cohort', churnRisk: '2.4%', predictedClv: '$12,450.00', status: 'Calculated' }
  ]);

  useEcomEvents(
    'clv',
    () => {
      setRunning(true);
      setTimeout(() => {
        setRunning(false);
        triggerToast('AI Customer lifetime value predictions re-calculated.');
      }, 1500);
    },
    () => {
      triggerToast('CLV ledger predictions spreadsheet exported.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Customer Cohort CLV Estimations</h4>
          <button style={btnStyle} onClick={() => { setRunning(true); setTimeout(() => { setRunning(false); triggerToast('Recalculated.'); }, 1200); }} disabled={running}>
            {running ? 'Running CLV calculations...' : 'Run CLV Analysis'}
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Target Customer Segment</th>
                <th style={tableHeaderStyle}>Predicted Churn Risk</th>
                <th style={tableHeaderStyle}>Estimated Lifecycle CLV</th>
                <th style={tableHeaderStyle}>Calculation Status</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{p.segments}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '12px', color: '#10b981' }}>{p.churnRisk}</span>
                  </td>
                  <td style={tableCellStyle} style={{ color: '#10b981', fontWeight: 700 }}>{p.predictedClv}</td>
                  <td style={tableCellStyle}>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


/* ============================================================================
   10. PRODUCT RECOMMENDATION ENGINE
   ============================================================================ */
export const EcomProductRecommendation: React.FC = () => {
  const [widgetModal, setWidgetModal] = useState(false);
  const [widgets, setWidgets] = useState([
    { location: 'Product Detail Page (PDP)', algorithm: 'Co-occurrence Collaborative Filtering', maxItems: 6, status: 'Active' }
  ]);
  const [form, setForm] = useState({ location: 'Product Detail Page (PDP)', algorithm: 'Co-occurrence Collaborative Filtering' });

  useEcomEvents(
    'recs',
    () => setWidgetModal(true),
    () => {
      triggerToast('Product recommendation engine options configuration saved.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Active Personalization Recommendation Widgets</h4>
          <button style={btnStyle} onClick={() => setWidgetModal(true)}>Deploy Personalization Rules</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Front-End Grid Placement</th>
                <th style={tableHeaderStyle}>Recommendation Algorithm</th>
                <th style={tableHeaderStyle}>Max Products Shown</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {widgets.map((w, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{w.location}</td>
                  <td style={tableCellStyle}>{w.algorithm}</td>
                  <td style={tableCellStyle}><code>{w.maxItems} items</code></td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>{w.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={widgetModal} onClose={() => setWidgetModal(false)} title="Deploy Recommendation Widget">
        <form onSubmit={(e) => { e.preventDefault(); setWidgets([...widgets, { location: form.location, algorithm: form.algorithm, maxItems: 4, status: 'Active' }]); setWidgetModal(false); triggerToast('Product personalization widget deployed.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>PDP Placement Location</label>
            <select value={form.location} onChange={e => setForm({...form, location: e.target.value})} style={selectStyle}>
              <option value="Product Detail Page (PDP)">Product Detail Page (PDP)</option>
              <option value="Cart Slideout drawer">Cart Slideout drawer</option>
              <option value="Checkout Order Success page">Checkout Order Success page</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Recommender Algorithm Model</label>
            <select value={form.algorithm} onChange={e => setForm({...form, algorithm: e.target.value})} style={selectStyle}>
              <option value="Co-occurrence Collaborative Filtering">Co-occurrence Collaborative Filtering</option>
              <option value="Content-based TF-IDF similarity">Content-based TF-IDF similarity</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setWidgetModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Deploy Widget</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
