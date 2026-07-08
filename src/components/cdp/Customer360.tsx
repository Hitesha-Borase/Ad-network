import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Building, Calendar, ShoppingBag, Globe, Tag, 
  Activity, CreditCard, ChevronRight, Edit2, X, Check, Plus, 
  Shield, Zap, Users, Lock, RefreshCw, Play, FileCode2, Search
} from 'lucide-react';

interface Profile {
  initials: string; name: string; ltv: string; churnRisk: 'Low' | 'Medium' | 'High'; segment: string;
  email: string; phone: string; company: string; title: string; location: string;
  engagementScore: number; totalPurchases: number; lastActive: string;
  segments: string[];
  timeline: { icon: string; title: string; desc: string; time: string; color: string }[];
}

const profiles: Profile[] = [
  {
    initials: 'JD', name: 'John Doe', ltv: '$4,250', churnRisk: 'Low', segment: 'B2B Enterprise',
    email: 'john.doe@acmecorp.com', phone: '+1 (555) 123-4567', company: 'Acme Corp', title: 'Director of Marketing', location: 'San Francisco, CA, USA',
    engagementScore: 92, totalPurchases: 14, lastActive: '2h ago',
    segments: ['Q3 Enterprise Leads', 'Cart Abandoners (30d)', 'High Intent Web Visitors', 'Webinar Attendees'],
    timeline: [
      { icon: '📧', title: 'Clicked Email Link', desc: 'Clicked "Upgrade to Enterprise" link in Q3 Nurture Campaign.', time: 'Today, 10:42 AM', color: 'var(--primary)' },
      { icon: '🔍', title: 'Visited Pricing Page', desc: 'Spent 4m 12s on the Enterprise pricing tier section.', time: 'Today, 10:45 AM', color: 'var(--accent)' },
      { icon: '📅', title: 'Booked Demo Call', desc: 'Scheduled via Calendly integration with Sales Rep (Sarah).', time: 'Yesterday, 4:15 PM', color: 'var(--success)' },
      { icon: '📢', title: 'Google Ad Impression', desc: 'Saw Retargeting Banner - "Q3 B2B Enterprise Solutions".', time: 'Oct 12, 2023', color: 'var(--info)' },
    ],
  },
  {
    initials: 'SJ', name: 'Sarah Johnson', ltv: '$1,840', churnRisk: 'Medium', segment: 'SMB',
    email: 'sarah.j@techstartup.io', phone: '+1 (555) 987-6543', company: 'TechStartup Inc.', title: 'CEO', location: 'Austin, TX, USA',
    engagementScore: 67, totalPurchases: 6, lastActive: '1d ago',
    segments: ['SMB Prospects', 'Trial Converters'],
    timeline: [
      { icon: '🛒', title: 'Started Free Trial', desc: 'Signed up for 14-day Pro trial via Google Ads landing page.', time: 'Today, 9:00 AM', color: 'var(--success)' },
      { icon: '📧', title: 'Email Opened', desc: 'Opened onboarding email "Getting Started with AdNetwork OS".', time: 'Yesterday, 8:30 AM', color: 'var(--primary)' },
    ],
  },
  {
    initials: 'AM', name: 'Alex Mercer', ltv: '$12,100', churnRisk: 'Low', segment: 'VIP Enterprise',
    email: 'a.mercer@starkind.com', phone: '+1 (212) 555-0192', company: 'Stark Industries', title: 'VP Marketing', location: 'New York, NY, USA',
    engagementScore: 99, totalPurchases: 38, lastActive: '5m ago',
    segments: ['VIP Customers', 'Power Users', 'Annual Subscribers'],
    timeline: [
      { icon: '💳', title: 'Renewed Annual Plan', desc: 'Auto-renewed Enterprise Annual plan ($12,000/yr).', time: 'Today, 11:00 AM', color: 'var(--success)' },
      { icon: '🔍', title: 'Accessed API Dashboard', desc: 'Viewed API usage and rate limits in developer settings.', time: 'Today, 10:15 AM', color: 'var(--info)' },
    ],
  },
];

const TABS = ['Overview', 'Timeline', 'Attributes', 'Segments'] as const;
type Tab = typeof TABS[number];

interface CdpConfig {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  accent: string;
}

const cdpConfigs: Record<string, CdpConfig> = {
  'cdp-c360': {
    title: 'Customer 360° Profile',
    subtitle: 'Unified identity graph resolving cross-device behaviors and customer attributes.',
    icon: <User size={22} />,
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
    borderColor: 'rgba(99, 102, 241, 0.2)',
    accent: 'var(--primary)'
  },
  'cdp-unified-profiles': {
    title: 'Unified Customer Profiles',
    subtitle: 'Browse and query the entire master directory of verified customer identities.',
    icon: <Users size={22} />,
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
    borderColor: 'rgba(99, 102, 241, 0.2)',
    accent: 'var(--primary)'
  },
  'cdp-tracking': {
    title: 'Behavioral Ingestion Console',
    subtitle: 'Live tracking of client-side pixels, custom web hooks, and dynamic browser events.',
    icon: <Activity size={22} />,
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
    accent: 'var(--success)'
  },
  'cdp-consent': {
    title: 'Consent & Privacy Manager',
    subtitle: 'Setup cookie policies, monitor CCPA/GDPR compliance logs, and handle user consent audits.',
    icon: <Shield size={22} />,
    gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
    accent: 'var(--danger)'
  },
  'cdp-activation': {
    title: 'Audience Activation Hub',
    subtitle: 'Synchronize target CDP segment lists directly to outbound advertising channels and CRMs.',
    icon: <Zap size={22} />,
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
    borderColor: 'rgba(245, 158, 11, 0.2)',
    accent: 'var(--warning)'
  },
  'cdp-id-resolution': {
    title: 'Identity Resolution Console',
    subtitle: 'Define deterministic matching criteria and cross-device profile merging rules.',
    icon: <ChevronRight size={22} />,
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
    borderColor: 'rgba(99, 102, 241, 0.2)',
    accent: 'var(--primary)'
  },
  'cdp-clean-rooms': {
    title: 'Data Clean Rooms Sandbox',
    subtitle: 'Securely cross-match advertising overlapping groups with publishers under zero-trust privacy constraints.',
    icon: <Lock size={22} />,
    gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)',
    borderColor: 'var(--border-color)',
    accent: 'var(--text-secondary)'
  }
};

export const Customer360: React.FC<{ mode?: string }> = ({ mode = 'cdp-c360' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentProfile, setCurrentProfile] = useState<Profile>(profiles[0]);
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [showAddSeg, setShowAddSeg] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [editValues, setEditValues] = useState({ email: currentProfile.email, phone: currentProfile.phone, title: currentProfile.title });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    const found = profiles.find(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.email.toLowerCase().includes(q.toLowerCase()));
    if (found) { setCurrentProfile(found); setActiveTab('Overview'); }
  };

  const saveField = (field: string) => {
    setEditingField(null);
    showToast('✅ Contact updated successfully!');
  };

  const riskColor = (risk: string) => risk === 'Low' ? 'var(--success)' : risk === 'Medium' ? 'var(--warning)' : 'var(--danger)';
  const riskBg = (risk: string) => risk === 'Low' ? 'var(--success-light)' : risk === 'Medium' ? 'var(--warning-light)' : 'var(--danger-light)';

  const activeConfig = cdpConfigs[mode] || cdpConfigs['cdp-c360'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      {toast && <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--success)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--success)' }}>{toast}</div>}

      <div className="glass-card" style={{ background: activeConfig.gradient, border: `1px solid ${activeConfig.borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: activeConfig.accent, display: 'flex', alignItems: 'center' }}>{activeConfig.icon}</span> {activeConfig.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>{activeConfig.subtitle}</p>
        </div>
        
        {(mode === 'cdp-c360' || mode === 'cdp-unified-profiles') && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Search by name or email..." value={searchQuery} onChange={e => handleSearch(e.target.value)} style={{ padding: '9px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '13px', width: '220px' }}/>
              {searchQuery && profiles.find(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.email.toLowerCase().includes(searchQuery.toLowerCase())) && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                  {profiles.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.email.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                    <div key={p.email} onClick={() => { setCurrentProfile(p); setSearchQuery(''); }} style={{ padding: '10px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'background 0.2s' }} className="table-row-hover">
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>{p.initials}</div>
                      <div><div style={{ fontSize: '13px', fontWeight: 600 }}>{p.name}</div><div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.email}</div></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {mode === 'cdp-tracking' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Real-time Event Ingestion Stream</h2>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', fontFamily: 'monospace', fontSize: '12px', height: '340px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                '[info] Pixel listener active on port 443...',
                '[success] Received client event: pageview "/" from IP 92.142.1.84 (Today, 18:24:12)',
                '[success] Received client event: click "Pricing Plan Basic" from IP 104.22.4.9 (Today, 18:24:15)',
                '[info] Syncing identity cookies with browser fingerprint registry...',
                '[success] Ingested Custom Metric: checkout_completed ($142.00 value) (Today, 18:24:20)',
                '[success] Ingested Lead Event: email_signup "johndoe@email.com" (Today, 18:24:28)',
                '[info] Dispatched segment sync updates for 3 dynamic cohorts.'
              ].map((log, i) => {
                let color = 'var(--text-primary)';
                if (log.includes('[success]')) { color = '#10b981'; log = log.replace('[success] ', '➔ '); }
                else if (log.includes('[info]')) { color = 'var(--text-secondary)'; log = log.replace('[info] ', 'ℹ '); }
                return <div key={i} style={{ color, whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>{log}</div>;
              })}
            </div>
          </div>
          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Tracking SDK Setup</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>Include this script header tag on your site to ingest events directly:</p>
            <textarea readOnly value={`<!-- Ad Network Ingestion SDK -->\n<script src="https://cdn.adnetwork.com/sdk.js?id=an_cdp_9481"></script>`} style={{ width: '100%', height: '80px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', resize: 'none' }}/>
            <button onClick={() => showToast('✅ Copied tracking code to clipboard!')} className="btn btn-primary btn-sm">Copy Script Tag</button>
          </div>
        </div>
      )}

      {mode === 'cdp-consent' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Compliance & Privacy Settings</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Configure compliance templates to handle consumer data privacy regulations:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
              {[
                { name: 'GDPR (Europe Union)', desc: 'Requires opt-in consent for cookie placements and profiling rules.', checked: true },
                { name: 'CCPA / CPRA (California)', desc: 'Provides consumer opt-out consent mechanisms for 3rd party data shares.', checked: true },
                { name: 'LGPD (Brazil Privacy Framework)', desc: 'Enforces data protection officer registry audits.', checked: false }
              ].map((c, i) => (
                <div key={i} style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>{c.desc}</div>
                  </div>
                  <input type="checkbox" defaultChecked={c.checked} style={{ accentColor: 'var(--danger)', width: '16px', height: '16px', cursor: 'pointer' }} onChange={() => showToast('Consent template settings updated.')}/>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card" style={{ flex: 1 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Consent Audit Logs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <div>• User `usr_a9d3` Opt-in (Today, 18:14)</div>
              <div>• User `usr_x2e9` Opt-out CCPA (Today, 17:42)</div>
              <div>• User `usr_w3q2` Opt-in GDPR (Today, 16:30)</div>
              <button onClick={() => showToast('📥 Exporting compliance audit log PDF...')} className="btn btn-secondary btn-sm" style={{ marginTop: '12px' }}>Export Audit Ledger</button>
            </div>
          </div>
        </div>
      )}

      {mode === 'cdp-activation' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Connected Destination Channels</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {[
                { name: 'Meta Ads (Facebook / Instagram)', status: 'Connected', synced: '42K profiles', color: 'var(--success)' },
                { name: 'Google Ads (Search / YouTube)', status: 'Connected', synced: '14K profiles', color: 'var(--success)' },
                { name: 'TikTok Marketing Ads', status: 'Inactive', synced: '0 profiles', color: 'var(--text-muted)' },
                { name: 'HubSpot CRM Sync', status: 'Connected', synced: '2.4K contacts', color: 'var(--success)' }
              ].map((ch, idx) => (
                <div key={idx} style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{ch.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Synced: {ch.synced}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <span style={{ fontSize: '11px', color: ch.color }}>{ch.status}</span>
                    <button onClick={() => showToast(`Sync triggered for ${ch.name}`)} className="btn btn-secondary btn-sm">Sync Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Sync Scheduler</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>Define audience synchronization intervals for activated nodes:</p>
            <select style={{ padding: '8px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '13px' }}>
              <option>Real-time (HMR Stream)</option>
              <option>Hourly batch updates</option>
              <option>Daily at 00:00 UTC</option>
            </select>
          </div>
        </div>
      )}

      {mode === 'cdp-id-resolution' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Stitching & Merging Criteria</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Select key identifier fields to stitch cross-device actions into a single master profile:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Primary Key match: Email address', desc: 'Deterministic matching on primary email.', check: true },
                { name: 'Secondary Key match: Telephone phone number', desc: 'Deterministic matching on international phone formats.', check: true },
                { name: 'Browser Session Cookie match (1P Cookies)', desc: 'Stitch guest checkouts with previous session history.', check: true },
                { name: 'Device Fingerprint canvas hash match', desc: 'Stops profiles duplicating when cookies are cleared.', check: false }
              ].map((k, idx) => (
                <label key={idx} style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked={k.check} style={{ accentColor: 'var(--primary)' }}/>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{k.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{k.desc}</div>
                  </div>
                </label>
              ))}
            </div>
            <button onClick={() => showToast('✅ Identity resolution parameters updated.')} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Apply Merge Rules</button>
          </div>
          <div className="glass-card" style={{ flex: 1 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Resolution Metrics</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Raw Cookie ID nodes</span><span>1.2M</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Stitched Profiles</span><span>142K</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Compression Overlap</span><span style={{ color: 'var(--success)', fontWeight: 600 }}>88.1% overlap</span></div>
            </div>
          </div>
        </div>
      )}

      {mode === 'cdp-clean-rooms' && (
        <div className="responsive-layout">
          <div className="glass-card" style={{ flex: 2, minWidth: 0 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Secure Partner Sandboxes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Amazon Ads cleanroom sync', partner: 'Amazon Web Services', overlap: '42.1%', status: 'Active (Audited)' },
                { name: 'Google Ads Data Hub sync', partner: 'Google Ads Cloud', overlap: '58.4%', status: 'Active (Audited)' },
                { name: 'Retailer Network Matcher', partner: 'Walmart Connect', overlap: '12.8%', status: 'Deploying (Testing)' }
              ].map((r, idx) => (
                <div key={idx} style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{r.name}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>Partner: {r.partner} · Overlap: <strong style={{ color: 'var(--primary)' }}>{r.overlap}</strong></div>
                  </div>
                  <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Zero-Trust Privacy</h2>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Data Clean Rooms enable secure multi-party computation. All user identities are hashed (SHA-256) locally and matched under mathematical differential privacy guarantees without sharing raw PHI/PII records.
            </div>
          </div>
        </div>
      )}

      {(mode === 'cdp-c360' || mode === 'cdp-unified-profiles') && (
        <div className="responsive-layout">
        {/* Profile Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '30px 20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '16px', boxShadow: '0 8px 16px rgba(99,102,241,0.2)' }}>
              {currentProfile.initials}
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0' }}>{currentProfile.name}</h2>
            <div style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 500, marginBottom: '16px' }}>High Value Customer (LTV: {currentProfile.ltv})</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }}>{currentProfile.segment}</span>
              <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', backgroundColor: riskBg(currentProfile.churnRisk), color: riskColor(currentProfile.churnRisk) }}>Churn Risk: {currentProfile.churnRisk}</span>
            </div>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Contact Information</h3>
            </div>
            {([
              { icon: Mail, field: 'email', label: 'email', val: currentProfile.email },
              { icon: Phone, field: 'phone', label: 'phone', val: currentProfile.phone },
              { icon: Building, field: 'title', label: 'title', val: `${currentProfile.company} (${currentProfile.title})` },
              { icon: MapPin, field: null, label: 'location', val: currentProfile.location },
            ] as const).map(({ icon: Icon, field, val }) => (
              <div key={val} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                <Icon size={14} color="var(--text-muted)"/>
                <span style={{ color: 'var(--text-secondary)', flex: 1, wordBreak: 'break-all' }}>{val}</span>
                {field && <button onClick={() => setEditingField(field)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}><Edit2 size={12}/></button>}
              </div>
            ))}
            {editingField && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                <input className="form-control" defaultValue={currentProfile[editingField as 'email' | 'phone' | 'title']} style={{ fontSize: '12px' }}/>
                <button onClick={() => saveField(editingField)} style={{ background: 'var(--success)', border: 'none', color: '#fff', borderRadius: '6px', padding: '6px', cursor: 'pointer' }}><Check size={14}/></button>
                <button onClick={() => setEditingField(null)} style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-muted)', borderRadius: '6px', padding: '6px', cursor: 'pointer' }}><X size={14}/></button>
              </div>
            )}
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Identity Graph</h3>
            {[
              { icon: Globe, label: 'Web Cookie ID', val: 'ck_8f9a2...', color: 'var(--primary)' },
              { icon: ShoppingBag, label: 'Shopify ID', val: 'sh_10482', color: 'var(--accent)' },
              { icon: User, label: 'CRM Lead ID', val: 'ld_99211', color: 'var(--success)' },
            ].map(({ icon: Icon, label, val, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={14} color={color}/>
                  <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '12px' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Quick Stats */}
          <div className="grid-cols-3" style={{ gap: '12px' }}>
            {[
              { icon: Activity, label: 'Engagement Score', val: `${currentProfile.engagementScore}/100`, color: currentProfile.engagementScore > 80 ? 'var(--success)' : 'var(--warning)' },
              { icon: CreditCard, label: 'Total Purchases', val: currentProfile.totalPurchases, color: 'var(--primary)' },
              { icon: Calendar, label: 'Last Active', val: currentProfile.lastActive, color: 'var(--info)' },
            ].map(({ icon: Icon, label, val, color }) => (
              <div key={label} className="glass-card" style={{ padding: '16px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Icon size={14}/> {label}</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--border-color)' }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', fontSize: '13px', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)', borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent', transition: 'all 0.2s' }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'Overview' && (
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Active Audience Segments</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {currentProfile.segments.map(seg => (
                  <div key={seg} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <Tag size={12} color="var(--primary)"/> {seg}
                  </div>
                ))}
                <button onClick={() => setShowAddSeg(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '6px', backgroundColor: 'rgba(99,102,241,0.08)', border: '1px dashed rgba(99,102,241,0.3)', fontSize: '12px', color: 'var(--primary)', cursor: 'pointer', fontWeight: 500 }}>
                  <Plus size={12}/> Add to Segment
                </button>
              </div>
            </div>
          )}

          {(activeTab === 'Timeline' || activeTab === 'Overview') && (
            <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Unified Activity Timeline</h3>
                <button className="btn btn-secondary btn-sm">Filter</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative', paddingLeft: '20px' }}>
                <div style={{ position: 'absolute', left: '27px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--border-color)' }}/>
                {currentProfile.timeline.map((ev, i) => (
                  <div key={i} style={{ position: 'relative', paddingBottom: '24px' }}>
                    <div style={{ position: 'absolute', left: '0', top: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: ev.color, border: '4px solid var(--bg-secondary)', zIndex: 2 }}/>
                    <div style={{ paddingLeft: '32px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600 }}>{ev.icon} {ev.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{ev.time}</div>
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{ev.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Attributes' && (
            <div className="glass-card">
              <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 20px 0' }}>Custom Attributes</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  ['LTV', currentProfile.ltv], ['Plan', currentProfile.segment], ['Churn Risk', currentProfile.churnRisk],
                  ['Country', 'USA'], ['Lead Source', 'Google Ads'], ['Industry', 'Technology'],
                ].map(([k, v]) => (
                  <div key={k} style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>{k}</div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Segments' && (
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Segment Memberships</h3>
                <button className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setShowAddSeg(true)}><Plus size={12}/> Add</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentProfile.segments.map(seg => (
                  <div key={seg} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><Tag size={13} color="var(--primary)"/> {seg}</div>
                    <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>Active</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      )}

      {/* Add to Segment Modal */}
      {showAddSeg && (
        <div className="modal-overlay" onClick={() => setShowAddSeg(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Add to Segment</h2>
              <button onClick={() => setShowAddSeg(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20}/></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['High Value Customers', 'Upsell Candidates', 'Power Users', 'Annual Plan Eligible', 'Re-engagement (90d)'].map(seg => (
                <div key={seg} onClick={() => { setShowAddSeg(false); showToast(`✅ Added to "${seg}"`); }} style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }} className="table-row-hover">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><Tag size={13} color="var(--primary)"/> {seg}</div>
                  <ChevronRight size={14} color="var(--text-muted)"/>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <style>{`.table-row-hover:hover{background:rgba(255,255,255,0.03) !important}`}</style>
    </div>
  );
};
