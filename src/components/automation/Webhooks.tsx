import React, { useState } from 'react';
import { Server, Activity, Plus, Copy, Trash2, X, Check, ChevronRight, AlertCircle } from 'lucide-react';

interface Webhook {
  id: number;
  name: string;
  url: string;
  status: 'Active' | 'Disabled';
  last: string;
  events: string[];
  totalCalls: number;
}

const initialWebhooks: Webhook[] = [
  { id: 1, name: 'Shopify Order Sync', url: 'https://api.adnetwork.os/v1/wh/sk_live_89f2...', status: 'Active', last: '2 mins ago', events: ['order.created', 'order.fulfilled'], totalCalls: 12480 },
  { id: 2, name: 'Typeform Lead Capture', url: 'https://api.adnetwork.os/v1/wh/sk_live_11x9...', status: 'Active', last: '1 hour ago', events: ['form.submitted'], totalCalls: 4210 },
  { id: 3, name: 'Stripe Payment Failed', url: 'https://api.adnetwork.os/v1/wh/sk_live_99a1...', status: 'Active', last: 'Yesterday', events: ['payment.failed', 'subscription.cancelled'], totalCalls: 891 },
  { id: 4, name: 'Custom ERP Sync', url: 'https://api.adnetwork.os/v1/wh/sk_live_44b0...', status: 'Disabled', last: 'Never', events: ['erp.inventory.update'], totalCalls: 0 },
];

const sampleLogs = [
  { time: '10:42:18', status: 200, duration: '84ms', body: '{"event":"order.created","id":"ord_98812"}' },
  { time: '10:38:05', status: 200, duration: '112ms', body: '{"event":"order.created","id":"ord_98811"}' },
  { time: '10:20:44', status: 500, duration: '2041ms', body: '{"error":"Timeout connecting to upstream"}' },
  { time: '10:18:01', status: 200, duration: '73ms', body: '{"event":"order.fulfilled","id":"ord_98800"}' },
];

interface WebhookModeConfig {
  title: string;
  description: string;
  createLabel: string;
  gradient: string;
  borderColor: string;
  accent: string;
}

const webhookModeConfigs: Record<string, WebhookModeConfig> = {
  'auto-webhooks': {
    title: 'Webhook Endpoints',
    description: 'Create secure endpoints to receive real-time data payloads from external services.',
    createLabel: 'Create Endpoint',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(16,185,129,0.15) 100%)',
    borderColor: 'rgba(99,102,241,0.2)',
    accent: 'var(--success)'
  },
  'auto-api': {
    title: 'API Client Keys',
    description: 'Generate client keys, API credentials, and manage secure developer scopes.',
    createLabel: 'Generate API Key',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(99,102,241,0.15) 100%)',
    borderColor: 'rgba(168,85,247,0.2)',
    accent: 'var(--primary)'
  },
  'auto-integrations': {
    title: 'Outbound Integrations Library',
    description: 'Manage connected outbound app channels, messaging bots, and data warehouse links.',
    createLabel: 'Add Integration',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(16,185,129,0.15) 100%)',
    borderColor: 'rgba(245,158,11,0.2)',
    accent: 'var(--warning)'
  }
};

export const Webhooks: React.FC<{ mode?: string }> = ({ mode = 'auto-webhooks' }) => {
  const [webhooks, setWebhooks] = useState<Webhook[]>(initialWebhooks);
  const [showCreate, setShowCreate] = useState(false);
  const [logsFor, setLogsFor] = useState<Webhook | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [toast, setToast] = useState('');
  const [newName, setNewName] = useState('');
  const [newEvents, setNewEvents] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const copyUrl = async (url: string) => {
    try { await navigator.clipboard.writeText(url); showToast('📋 URL copied to clipboard!'); }
    catch { showToast('📋 URL copied!'); }
  };

  const toggleStatus = (id: number) => {
    setWebhooks(ws => ws.map(w => w.id === id ? { ...w, status: w.status === 'Active' ? 'Disabled' : 'Active' } : w));
    const wh = webhooks.find(w => w.id === id);
    showToast(wh?.status === 'Active' ? '⚠️ Webhook disabled' : '✅ Webhook enabled');
  };

  const deleteWebhook = (id: number) => {
    setWebhooks(ws => ws.filter(w => w.id !== id));
    setDeleteId(null);
    showToast('🗑 Webhook deleted');
  };

  const createWebhook = () => {
    if (!newName.trim()) return;
    const newId = Math.max(...webhooks.map(w => w.id)) + 1;
    const url = `https://api.adnetwork.os/v1/wh/sk_live_${Math.random().toString(36).substr(2,6)}...`;
    setWebhooks(ws => [...ws, { id: newId, name: newName, url, status: 'Active', last: 'Never', events: newEvents.split(',').map(e => e.trim()).filter(Boolean), totalCalls: 0 }]);
    setNewName(''); setNewEvents('');
    setShowCreate(false);
    showToast('✅ Webhook endpoint created!');
  };

  const config = webhookModeConfigs[mode] || webhookModeConfigs['auto-webhooks'];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {toast && <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--primary)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--primary)' }}>{toast}</div>}

      <div className="glass-card" style={{ background: config.gradient, border: `1px solid ${config.borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Server size={24} color={config.accent}/> {config.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>{config.description}</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: config.accent, border: 'none' }} onClick={() => setShowCreate(true)}>
          <Plus size={14}/> {config.createLabel}
        </button>
      </div>

      {mode === 'auto-webhooks' && (
        <div className="grid-cols-3">
          {[
            { label: 'Active Endpoints', val: webhooks.filter(w => w.status === 'Active').length, color: 'var(--success)' },
            { label: 'Total Calls (30d)', val: webhooks.reduce((s, w) => s + w.totalCalls, 0).toLocaleString(), color: 'var(--primary)' },
            { label: 'Disabled', val: webhooks.filter(w => w.status === 'Disabled').length, color: 'var(--text-muted)' },
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {mode === 'auto-webhooks' && (
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-responsive-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Endpoint Name</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>URL</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Events</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Last Request</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {webhooks.map(row => (
                  <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="table-row-hover">
                    <td style={{ padding: '16px 24px', fontWeight: 600 }}>{row.name}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <code style={{ padding: '4px 8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', color: 'var(--text-muted)', fontSize: '12px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.url}</code>
                        <button onClick={() => copyUrl(row.url)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px', borderRadius: '4px' }} title="Copy URL"><Copy size={14}/></button>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {row.events.map(e => <span key={e} style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(99,102,241,0.1)', color: 'var(--primary)', fontSize: '10px', fontWeight: 600 }}>{e}</span>)}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <button onClick={() => toggleStatus(row.id)} style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, backgroundColor: row.status === 'Active' ? 'var(--success-light)' : 'rgba(255,255,255,0.05)', color: row.status === 'Active' ? 'var(--success)' : 'var(--text-muted)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {row.status}
                      </button>
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {row.last !== 'Never' && <Activity size={12} color="var(--success)"/>} {row.last}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setLogsFor(row)}><ChevronRight size={12}/> Logs</button>
                        <button onClick={() => setDeleteId(row.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <style>{`.table-row-hover:hover{background:rgba(255,255,255,0.02)}`}</style>
        </div>
      )}

      {mode === 'auto-api' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Active API Keys & Credentials</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Production Client Access Key', key: 'pk_live_019283f2a839d481bb2e9acb834', created: 'Jul 2, 2026', scope: 'Read/Write' },
                { name: 'Sandbox Testing Key', key: 'pk_test_99214b8a12e84a21cb92acb8941', created: 'Yesterday', scope: 'Full Access' }
              ].map((k, idx) => (
                <div key={idx} style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{k.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Created: {k.created} · Scope: <strong style={{ color: 'var(--primary)' }}>{k.scope}</strong></div>
                    <code style={{ display: 'block', padding: '4px 8px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '4px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px', fontFamily: 'monospace', wordBreak: 'break-all' }}>{k.key}</code>
                  </div>
                  <button onClick={() => { copyUrl(k.key); showToast('✅ Copied API key!'); }} className="btn btn-secondary btn-sm"><Copy size={13}/> Copy Key</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === 'auto-integrations' && (
        <div className="grid-cols-4">
          {[
            { name: 'Slack Messaging Hub', desc: 'Sync alert channels and custom bot alerts.', status: 'Connected', icon: '💬', color: 'var(--success)' },
            { name: 'HubSpot CRM Sync', desc: 'Auto-update lead custom field profiles.', status: 'Connected', icon: '⚡', color: 'var(--success)' },
            { name: 'Shopify Checkout Sync', desc: 'Track cart events and customer checkouts.', status: 'Active', icon: '🛒', color: 'var(--success)' },
            { name: 'Salesforce Outbound link', desc: 'Post won deals pipeline statistics.', status: 'Inactive', icon: '☁️', color: 'var(--text-muted)' }
          ].map((app, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid var(--border-color)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }}>{app.icon}</span>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', backgroundColor: app.status === 'Inactive' ? 'rgba(255,255,255,0.05)' : 'rgba(16,185,129,0.1)', color: app.status === 'Inactive' ? 'var(--text-secondary)' : 'var(--success)', fontWeight: 600 }}>{app.status}</span>
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px 0' }}>{app.name}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>{app.desc}</p>
              </div>
              <button onClick={() => showToast(`Settings opened for ${app.name}`)} className="btn btn-secondary btn-sm" style={{ marginTop: '8px' }}>Configure App</button>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Create Webhook Endpoint</h2>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20}/></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>ENDPOINT NAME *</label><input className="form-control" placeholder="e.g. HubSpot Contact Sync" value={newName} onChange={e => setNewName(e.target.value)}/></div>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>EVENTS (comma-separated)</label><input className="form-control" placeholder="e.g. contact.created, contact.updated" value={newEvents} onChange={e => setNewEvents(e.target.value)}/></div>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>SECRET (optional)</label><input className="form-control" type="password" placeholder="Signing secret for verification"/></div>
              <div style={{ padding: '12px', backgroundColor: 'rgba(14,165,233,0.08)', borderRadius: '8px', border: '1px solid rgba(14,165,233,0.2)', fontSize: '12px', color: 'var(--info)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '1px' }}/> A unique endpoint URL will be generated automatically upon creation.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={createWebhook}><Check size={14}/> Create Endpoint</button>
            </div>
          </div>
        </div>
      )}

      {/* Logs Modal */}
      {logsFor && (
        <div className="modal-overlay" onClick={() => setLogsFor(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 4px 0' }}>Request Logs</h2>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{logsFor.name}</div>
              </div>
              <button onClick={() => setLogsFor(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20}/></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {sampleLogs.map((log, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, backgroundColor: log.status === 200 ? 'var(--success-light)' : 'var(--danger-light)', color: log.status === 200 ? 'var(--success)' : 'var(--danger)', flexShrink: 0 }}>{log.status}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      <span>{log.time}</span><span>{log.duration}</span>
                    </div>
                    <code style={{ fontSize: '11px', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>{log.body}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId !== null && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '380px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 12px 0' }}>Delete Webhook?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 24px 0' }}>This will permanently delete "<strong>{webhooks.find(w => w.id === deleteId)?.name}</strong>". This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--danger)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 500 }} onClick={() => deleteWebhook(deleteId!)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
