import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { 
  Code, Zap, Globe, Database, TrendingUp, CheckCircle, 
  AlertTriangle, Copy, Trash2, Play, Layers
} from 'lucide-react';

// Common visual styles matching the main dark theme
const thHead = { padding: '12px 14px', color: '#888888', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: '1px solid #333333' };
const thCell = { padding: '12px 14px', color: '#aaaaaa', borderBottom: '1px solid #222222', fontSize: '13px' };
const badge = (color: string) => ({ background: `${color}18`, color, padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700 } as React.CSSProperties);

const inputStyle = {
  width: '100%',
  backgroundColor: '#121212',
  border: '1px solid #333333',
  borderRadius: '6px',
  padding: '8px 12px',
  color: '#ffffff',
  fontSize: '13px',
  outline: 'none',
  marginTop: '4px'
};

const labelStyle = {
  fontSize: '12px',
  fontWeight: 600,
  color: '#888888'
};

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '4px'
};

const btnPrimaryStyle = {
  backgroundColor: '#6366f1',
  color: '#ffffff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer'
};

const btnSecondaryStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid #333333',
  color: '#ffffff',
  padding: '8px 16px',
  borderRadius: '6px',
  fontSize: '13px',
  cursor: 'pointer'
};

// Reusable Modal Component matching CustomerSuccessPages.tsx style
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
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: '#1a1a1a',
        border: '1px solid #333333',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '550px',
        maxHeight: '90vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid #2a2a2a'
        }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>{title}</h3>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            color: '#888888',
            cursor: 'pointer',
            fontSize: '20px',
            lineHeight: 1
          }}>×</button>
        </div>
        {/* Body */}
        <div style={{ padding: '20px', overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   1. REST APIs
   ---------------------------------------------------- */
export const DeveloperRestApi: React.FC = () => {
  const [keys, setKeys] = useState([
    { id: '1', name: 'Acme Production Key', prefix: 'kos_live_...9A4F', created: '2026-02-14', scope: 'All Read/Write', status: 'Active' },
    { id: '2', name: 'Staging Sandbox Key', prefix: 'kos_test_...3F2C', created: '2026-05-01', scope: 'Read Only', status: 'Active' }
  ]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyScope, setNewKeyScope] = useState('All Read/Write');
  const [generatedKey, setGeneratedKey] = useState('');

  useEffect(() => {
    const handlePri = () => {
      setGeneratedKey('');
      setNewKeyName('');
      setIsCreateOpen(true);
    };
    const handleSec = () => setIsDownloadOpen(true);
    window.addEventListener('dev-pri-dev-rest', handlePri);
    window.addEventListener('dev-sec-dev-rest', handleSec);
    return () => {
      window.removeEventListener('dev-pri-dev-rest', handlePri);
      window.removeEventListener('dev-sec-dev-rest', handleSec);
    };
  }, []);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const randomKey = 'kos_live_' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setGeneratedKey(randomKey);
    setKeys([
      ...keys,
      {
        id: String(Date.now()),
        name: newKeyName,
        prefix: `${randomKey.substring(0, 9)}...${randomKey.substring(randomKey.length - 4)}`,
        created: new Date().toISOString().split('T')[0],
        scope: newKeyScope,
        status: 'Active'
      }
    ]);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKey);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'API Key copied to clipboard!' }));
  };

  const deleteKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'API Key revoked successfully.' }));
  };

  const stats = [
    { label: 'Total REST APIs', val: '48 endpoints', sub: 'Active collections: 6', icon: <Code size={18}/>, iconBg: '#6366f118', iconColor: '#6366f1' },
    { label: 'API Requests Today', val: '184,290', sub: 'Peak rate: 520 req/sec', icon: <Zap size={18}/>, iconBg: '#eab30818', iconColor: '#eab308' },
    { label: 'Avg Latency', val: '38 ms', sub: 'Target response: < 80ms', icon: <Globe size={18}/>, iconBg: '#22c55e18', iconColor: '#22c55e' },
    { label: 'Success Rate (2xx)', val: '99.99%', sub: 'Target: > 99.9%', icon: <CheckCircle size={18}/>, iconBg: '#06b6d418', iconColor: '#06b6d4' },
  ];

  const endpoints = [
    { method: 'GET', path: '/v3/crm/leads', desc: 'Retrieve list of qualified leads', scope: 'crm.leads.read', ver: 'v3.0', mc: '#22c55e' },
    { method: 'POST', path: '/v3/marketing/campaigns', desc: 'Create new marketing trigger layout', scope: 'marketing.write', ver: 'v3.0', mc: '#6366f1' },
    { method: 'PUT', path: '/v3/crm/deals/{id}', desc: 'Update deal stage in pipeline', scope: 'crm.deals.write', ver: 'v3.0', mc: '#eab308' },
    { method: 'DELETE', path: '/v3/contacts/{id}', desc: 'Archive a contact record', scope: 'crm.contacts.delete', ver: 'v2.5', mc: '#ef4444' },
    { method: 'GET', path: '/v3/marketplace/extensions', desc: 'List active third-party extensions', scope: 'marketplace.read', ver: 'v3.0', mc: '#22c55e' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Stats Cards */}
      <div className="grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#888888', fontSize: '13px', fontWeight: 500 }}>{s.label}</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.iconColor }}>{s.icon}</div>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '4px 0 0 0', color: '#ffffff' }}>{s.val}</h2>
            <div style={{ fontSize: '12px', color: '#666666' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Keys registry */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#ffffff' }}>Active API Credentials</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                {['Credential Name', 'Token/Prefix', 'Created Date', 'Scope', 'Status', 'Action'].map(h => <th key={h} style={thHead}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.id} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#ffffff', fontWeight: 600 }}>{k.name}</td>
                  <td style={{ ...thCell, fontFamily: 'monospace', color: '#6366f1' }}>{k.prefix}</td>
                  <td style={thCell}>{k.created}</td>
                  <td style={thCell}>{k.scope}</td>
                  <td style={thCell}><span style={badge('#22c55e')}>{k.status}</span></td>
                  <td style={thCell}>
                    <button onClick={() => deleteKey(k.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Revoke Key">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#ffffff' }}>REST APIs Directory</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>{['Method', 'Endpoint', 'Description', 'Scope', 'Version'].map(h => <th key={h} style={thHead}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {endpoints.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={thCell}><span style={badge(row.mc)}>{row.method}</span></td>
                  <td style={{ ...thCell, color: '#a5b4fc', fontFamily: 'monospace', fontWeight: 600 }}>{row.path}</td>
                  <td style={{ ...thCell, color: '#dddddd' }}>{row.desc}</td>
                  <td style={{ ...thCell, fontFamily: 'monospace', fontSize: '11px' }}>{row.scope}</td>
                  <td style={thCell}>{row.ver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New REST API Key">
        {!generatedKey ? (
          <form onSubmit={handleCreateKey} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>API Key Name</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Third-party Hubspot Sync" 
                value={newKeyName} 
                onChange={(e) => setNewKeyName(e.target.value)} 
                style={inputStyle} 
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Allowed Scope Profile</label>
              <select value={newKeyScope} onChange={(e) => setNewKeyScope(e.target.value)} style={inputStyle}>
                <option value="All Read/Write">All Read/Write (Full access)</option>
                <option value="Read Only">Read Only (Telemetry and syncs)</option>
                <option value="Billing Admin">Billing & Invoices write only</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button type="button" onClick={() => setIsCreateOpen(false)} style={btnSecondaryStyle}>Cancel</button>
              <button type="submit" style={btnPrimaryStyle}>Generate Credentials</button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', color: '#22c55e', fontSize: '13px' }}>
              <strong>Key Generated Successfully!</strong> Make sure to copy it now. For security, you will not be able to view it again.
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input type="text" readOnly value={generatedKey} style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '13px', marginTop: 0 }} />
              <button onClick={handleCopyKey} style={{ ...btnSecondaryStyle, padding: '10px' }} title="Copy to Clipboard">
                <Copy size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button onClick={() => setIsCreateOpen(false)} style={btnPrimaryStyle}>Done</button>
            </div>
          </div>
        )}
      </Modal>

      {/* OpenAPI Download Modal */}
      <Modal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} title="Download OpenAPI Spec (JSON)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Configure and retrieve the raw JSON definitions file containing all active REST endpoint routes.
          </p>
          <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#a855f7', backgroundColor: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', border: '1px solid #333333', maxHeight: '180px', overflowY: 'auto' }}>
            {`{
  "openapi": "3.0.0",
  "info": {
    "title": "Ad-Network Developer Hub REST API",
    "version": "3.0.0"
  },
  "paths": {
    "/v3/crm/leads": {
      "get": {
        "summary": "Retrieve leads list"
      }
    }
  }
}`}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsDownloadOpen(false)} style={btnSecondaryStyle}>Close</button>
            <button onClick={() => {
              window.dispatchEvent(new CustomEvent('show-toast', { detail: 'OpenAPI JSON spec file downloaded.' }));
              setIsDownloadOpen(false);
            }} style={btnPrimaryStyle}>Download Spec File</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   2. GraphQL APIs
   ---------------------------------------------------- */
export const DeveloperGraphql: React.FC = () => {
  const [query, setQuery] = useState(`query GetCampaignDetails {
  campaign(id: "cmp-88192") {
    name
    budgetLimit
    status
    adSets {
      id
      title
      clicks
    }
  }
}`);
  const [responseJson, setResponseJson] = useState(`{
  "data": {
    "campaign": {
      "name": "Summer Special Clearance",
      "budgetLimit": 12500.00,
      "status": "ACTIVE",
      "adSets": [
        { "id": "ads-10", "title": "Banner - Male 18-35", "clicks": 1420 },
        { "id": "ads-11", "title": "Video Overlay Feed", "clicks": 2894 }
      ]
    }
  }
}`);
  const [isPlayingOpen, setIsPlayingOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  useEffect(() => {
    const handlePri = () => setIsPlayingOpen(true);
    const handleSec = () => setIsExportOpen(true);
    window.addEventListener('dev-pri-dev-graphql', handlePri);
    window.addEventListener('dev-sec-dev-graphql', handleSec);
    return () => {
      window.removeEventListener('dev-pri-dev-graphql', handlePri);
      window.removeEventListener('dev-sec-dev-graphql', handleSec);
    };
  }, []);

  const executeMockQuery = () => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Executing GraphQL resolver...' }));
    if (query.toLowerCase().includes('campaign')) {
      setResponseJson(JSON.stringify({
        data: {
          campaign: {
            name: "Enterprise Brand Awareness Campaign",
            budgetLimit: 50000.00,
            status: "PAUSED",
            adSets: [
              { id: "ads-99", title: "Target Lookalikes US/EU", clicks: 12051 }
            ]
          }
        }
      }, null, 2));
    } else {
      setResponseJson(JSON.stringify({
        errors: [{ message: "Field not matching active schema structure. Try querying 'campaign'." }]
      }, null, 2));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 16px 0', color: '#ffffff' }}>GraphQL Schema Configurations</h3>
        <div className="grid-cols-3" style={{ gap: '16px', marginBottom: '8px' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid #222222' }}>
            <span style={{ fontSize: '12px', color: '#888888' }}>Schema Strategy</span>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#a855f7', marginTop: '4px' }}>Apollo Federated</div>
            <div style={{ fontSize: '12px', color: '#666666', marginTop: '2px' }}>Types Registered: 195</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid #222222' }}>
            <span style={{ fontSize: '12px', color: '#888888' }}>Total Queries / Mutations</span>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#6366f1', marginTop: '4px' }}>42 Queries / 28 Mutations</div>
            <div style={{ fontSize: '12px', color: '#666666', marginTop: '2px' }}>Subscriptions Active: 5</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid #222222' }}>
            <span style={{ fontSize: '12px', color: '#888888' }}>Avg execution latency</span>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#22c55e', marginTop: '4px' }}>62 ms</div>
            <div style={{ fontSize: '12px', color: '#666666', marginTop: '2px' }}>Health status: 100%</div>
          </div>
        </div>
      </div>

      <div className="grid-cols-2" style={{ gap: '20px' }}>
        {/* Editor panel */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ color: '#ffffff', fontSize: '14px' }}>Query Editor</strong>
            <button onClick={executeMockQuery} style={{ ...btnPrimaryStyle, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Play size={12} /> Run Query
            </button>
          </div>
          <textarea 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            rows={10} 
            style={{ width: '100%', background: '#0c0c0c', border: '1px solid #333333', borderRadius: '8px', padding: '12px', color: '#a5b4fc', fontFamily: 'monospace', fontSize: '13px', outline: 'none', resize: 'vertical' }}
          />
        </div>

        {/* Output Panel */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <strong style={{ color: '#ffffff', fontSize: '14px' }}>JSON Output Response</strong>
          <pre style={{ margin: 0, padding: '12px', background: '#0c0c0c', border: '1px solid #333333', borderRadius: '8px', color: '#22c55e', fontFamily: 'monospace', fontSize: '12px', height: '200px', overflow: 'auto' }}>
            {responseJson}
          </pre>
        </div>
      </div>

      {/* Playground Modal */}
      <Modal isOpen={isPlayingOpen} onClose={() => setIsPlayingOpen(false)} title="Interactive GraphQL Playground">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Access our hosted GraphiQL console to inspect available queries, documentation sidebars, and run queries against mock sandbox entities.
          </p>
          <div style={{ padding: '24px', background: '#121212', borderRadius: '8px', border: '1px solid #333333', textAlign: 'center' }}>
            <Layers size={36} color="#a855f7" style={{ marginBottom: '12px' }} />
            <h4 style={{ margin: '0 0 6px 0', color: '#ffffff' }}>Apollo Sandbox Playground</h4>
            <span style={{ fontSize: '12.5px', color: '#666666' }}>Active Endpoint: https://api.kiaan-os.io/graphql</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsPlayingOpen(false)} style={btnSecondaryStyle}>Close Console</button>
            <button onClick={() => {
              window.dispatchEvent(new CustomEvent('show-toast', { detail: 'GraphQL Web Playground launched.' }));
              setIsPlayingOpen(false);
            }} style={btnPrimaryStyle}>Launch External Window</button>
          </div>
        </div>
      </Modal>

      {/* Export schema Modal */}
      <Modal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} title="Export GraphQL Federation Schema">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Download the federated Schema Definition Language (SDL) config for local linting or code generator CLI systems.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Schema Version</label>
            <select style={inputStyle}>
              <option>v3.0 - Latest Federated</option>
              <option>v2.8 - Legacy Production</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsExportOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button onClick={() => {
              window.dispatchEvent(new CustomEvent('show-toast', { detail: 'GraphQL SDL schema definition file downloaded.' }));
              setIsExportOpen(false);
            }} style={btnPrimaryStyle}>Download Schema File</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   3. Webhooks
   ---------------------------------------------------- */
export const DeveloperWebhooks: React.FC = () => {
  const [webhooks, setWebhooks] = useState([
    { id: '1', url: 'https://api.acme.corp/webhooks/lead-sync', events: 'lead.created, deal.updated', date: '2026-04-18', status: 'Active', sc: '#22c55e' },
    { id: '2', url: 'https://bi.cloudco.io/ingest/marketing', events: 'campaign.sent', date: '2026-05-01', status: 'Active', sc: '#22c55e' }
  ]);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newEvent, setNewEvent] = useState('lead.created');
  const [testResponse, setTestResponse] = useState('');
  const [sendingTest, setSendingTest] = useState(false);

  useEffect(() => {
    const handlePri = () => {
      setNewUrl('');
      setIsRegisterOpen(true);
    };
    const handleSec = () => setIsTestOpen(true);
    window.addEventListener('dev-pri-dev-webhooks', handlePri);
    window.addEventListener('dev-sec-dev-webhooks', handleSec);
    return () => {
      window.removeEventListener('dev-pri-dev-webhooks', handlePri);
      window.removeEventListener('dev-sec-dev-webhooks', handleSec);
    };
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    setWebhooks([
      ...webhooks,
      {
        id: String(Date.now()),
        url: newUrl,
        events: newEvent,
        date: new Date().toISOString().split('T')[0],
        status: 'Active',
        sc: '#22c55e'
      }
    ]);
    setIsRegisterOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Webhook endpoint registered.' }));
  };

  const handleTestPayload = () => {
    setSendingTest(true);
    setTestResponse('');
    setTimeout(() => {
      setSendingTest(false);
      setTestResponse(JSON.stringify({
        status: 200,
        statusText: "OK",
        responseTimeMs: 145,
        responsePayload: {
          received: true,
          message: "Event processed successfully by ACME endpoint webhook listener"
        }
      }, null, 2));
    }, 1500);
  };

  const removeWebhook = (id: string) => {
    setWebhooks(webhooks.filter(w => w.id !== id));
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Webhook endpoint removed.' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#ffffff' }}>Webhook Event Subscriptions</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>{['Webhook Endpoint URL', 'Subscribed Events', 'Created Date', 'Status', 'Action'].map(h => <th key={h} style={thHead}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {webhooks.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#6366f1', fontFamily: 'monospace', fontSize: '12px' }}>{row.url}</td>
                  <td style={{ ...thCell, fontFamily: 'monospace', fontSize: '12px', color: '#dddddd' }}>{row.events}</td>
                  <td style={thCell}>{row.date}</td>
                  <td style={thCell}><span style={badge(row.sc)}>{row.status}</span></td>
                  <td style={thCell}>
                    <button onClick={() => removeWebhook(row.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Delete Endpoint">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register Modal */}
      <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} title="Register Webhook endpoint URL">
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Destination URL</label>
            <input 
              type="url" 
              required 
              placeholder="https://yourdomain.com/hooks/receive" 
              value={newUrl} 
              onChange={(e) => setNewUrl(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Event Trigger Subscription</label>
            <select value={newEvent} onChange={(e) => setNewEvent(e.target.value)} style={inputStyle}>
              <option value="lead.created">lead.created (Qualified leads ingestion)</option>
              <option value="deal.won">deal.won (Deal won in pipeline)</option>
              <option value="invoice.paid">invoice.paid (Receipt of payments)</option>
              <option value="campaign.completed">campaign.completed (End of marketing layout)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setIsRegisterOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Register Endpoint</button>
          </div>
        </form>
      </Modal>

      {/* Test Webhook Modal */}
      <Modal isOpen={isTestOpen} onClose={() => setIsTestOpen(false)} title="Test Webhook Payload Delivery">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Dispatch a mock trigger event payload to see how your backend endpoint receives and acknowledges payloads.
          </p>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Target URL Endpoint</label>
            <select style={inputStyle}>
              {webhooks.map(w => <option key={w.id} value={w.url}>{w.url}</option>)}
            </select>
          </div>
          <button onClick={handleTestPayload} disabled={sendingTest || webhooks.length === 0} style={{ ...btnPrimaryStyle, width: 'fit-content' }}>
            {sendingTest ? 'Sending Dispatch...' : 'Send Test Request'}
          </button>
          {testResponse && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={labelStyle}>Endpoint Response Receipt:</span>
              <pre style={{ margin: 0, padding: '12px', background: '#0c0c0c', border: '1px solid #333333', borderRadius: '8px', color: '#22c55e', fontFamily: 'monospace', fontSize: '12px', height: '140px', overflow: 'auto' }}>
                {testResponse}
              </pre>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsTestOpen(false)} style={btnSecondaryStyle}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   4. SDKs
   ---------------------------------------------------- */
export const DeveloperSdks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'javascript' | 'nodejs' | 'python' | 'go'>('javascript');
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  useEffect(() => {
    const handlePri = () => setIsDownloadOpen(true);
    const handleSec = () => setIsConfigOpen(true);
    window.addEventListener('dev-pri-dev-sdks', handlePri);
    window.addEventListener('dev-sec-dev-sdks', handleSec);
    return () => {
      window.removeEventListener('dev-pri-dev-sdks', handlePri);
      window.removeEventListener('dev-sec-dev-sdks', handleSec);
    };
  }, []);

  const snippets = {
    javascript: {
      install: 'npm install @kiaan/os-web-sdk',
      code: `import { KiaanClient } from '@kiaan/os-web-sdk';

const client = new KiaanClient({
  apiKey: 'YOUR_API_KEY_HERE',
  environment: 'production'
});

// Sync user interactions
await client.events.track('lead_converted', {
  leadId: 'LD-9912',
  value: 4500.00
});`
    },
    nodejs: {
      install: 'npm install @kiaan/os-node-sdk',
      code: `const { KiaanClient } = require('@kiaan/os-node-sdk');

const client = new KiaanClient({
  apiKey: 'YOUR_API_KEY_HERE',
  timeout: 5000
});

// Fetch active marketing campaigns
client.campaigns.list({ status: 'ACTIVE' })
  .then(campaigns => console.log(campaigns));`
    },
    python: {
      install: 'pip install kiaan-os-sdk',
      code: `from kiaan_os import KiaanClient

client = KiaanClient(
    api_key="YOUR_API_KEY_HERE",
    host="https://api.kiaan-os.io"
)

# Ingest new lead
response = client.leads.create(
    email="lead@acme.corp",
    full_name="Alex Mercer"
)`
    },
    go: {
      install: 'go get github.com/kiaan/os-go-sdk',
      code: `package main

import (
	"context"
	"fmt"
	"github.com/kiaan/os-go-sdk"
)

func main() {
	client := os.NewClient("YOUR_API_KEY_HERE")
	lead, err := client.Leads.Get(context.Background(), "LD-1002")
	if err == nil {
		fmt.Println("Lead Name:", lead.Name)
	}
}`
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #333333', paddingBottom: '12px', marginBottom: '16px' }}>
          {(['javascript', 'nodejs', 'python', 'go'] as const).map(lang => (
            <button 
              key={lang}
              onClick={() => setActiveTab(lang)}
              style={{
                background: activeTab === lang ? '#6366f1' : 'transparent',
                border: activeTab === lang ? 'none' : '1px solid #333333',
                color: activeTab === lang ? '#ffffff' : '#888888',
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Installation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={formGroupStyle}>
            <span style={labelStyle}>Installation Command:</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <pre style={{ margin: 0, padding: '10px 14px', background: '#0a0a0a', border: '1px solid #222222', borderRadius: '6px', color: '#eab308', fontFamily: 'monospace', fontSize: '13px', flex: 1 }}>
                {snippets[activeTab].install}
              </pre>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(snippets[activeTab].install);
                  window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Install command copied!' }));
                }}
                style={{ ...btnSecondaryStyle, padding: '10px' }}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          {/* Quickstart code */}
          <div style={formGroupStyle}>
            <span style={labelStyle}>Quickstart Guide:</span>
            <div style={{ position: 'relative' }}>
              <pre style={{ margin: 0, padding: '16px', background: '#0a0a0a', border: '1px solid #222222', borderRadius: '8px', color: '#a5b4fc', fontFamily: 'monospace', fontSize: '13px', lineHeight: 1.6, overflowX: 'auto' }}>
                {snippets[activeTab].code}
              </pre>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(snippets[activeTab].code);
                  window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Code sample copied!' }));
                }}
                style={{ position: 'absolute', top: '12px', right: '12px', ...btnSecondaryStyle, padding: '6px' }}
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Download SDK Packages Modal */}
      <Modal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} title="Download Custom SDK Build Packages">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Bundle multiple runtimes into a zip configuration package containing SDK libraries, types interfaces, and local offline documentations.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['JavaScript Web SDK', 'Node.js Core SDK', 'Python Sync/Async SDK', 'PHP API Wrappers', 'Java REST Bindings', 'Go Federation SDK'].map(sdk => (
              <label key={sdk} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontSize: '13px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: '#6366f1' }} />
                {sdk}
              </label>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsDownloadOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button onClick={() => {
              window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Zipped SDK packages download started.' }));
              setIsDownloadOpen(false);
            }} style={btnPrimaryStyle}>Start Download Zip</button>
          </div>
        </div>
      </Modal>

      {/* SDK Configuration Settings Modal */}
      <Modal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} title="SDK Global Configuration Settings">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Generate standard `.kiaan-sdk.json` parameters file to automate authorization environments globally.
          </p>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Active API Key Credentials</label>
            <select style={inputStyle}>
              <option>Acme Production Key (kos_live_...9A4F)</option>
              <option>Staging Sandbox Key (kos_test_...3F2C)</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Max Timeout Limits (ms)</label>
            <input type="number" defaultValue="5000" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsConfigOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button onClick={() => {
              window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Config settings updated.' }));
              setIsConfigOpen(false);
            }} style={btnPrimaryStyle}>Generate Config File</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   5. CLI
   ---------------------------------------------------- */
export const DeveloperCli: React.FC = () => {
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'Kiaan OS CommandLine Interface Console version 3.2.0',
    'Type "kiaan help" to list available commands.',
    ''
  ]);
  const [cliInput, setCliInput] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('');

  useEffect(() => {
    const handlePri = () => {
      const tok = 'kos_cli_tok_' + Math.floor(Math.random()*100000000);
      setGeneratedToken(tok);
      setIsAuthOpen(true);
    };
    const handleSec = () => setIsHelpOpen(true);
    window.addEventListener('dev-pri-dev-cli', handlePri);
    window.addEventListener('dev-sec-dev-cli', handleSec);
    return () => {
      window.removeEventListener('dev-pri-dev-cli', handlePri);
      window.removeEventListener('dev-sec-dev-cli', handleSec);
    };
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliInput.trim()) return;
    const cmd = cliInput.trim();
    let resp = '';

    if (cmd === 'kiaan help') {
      resp = `Available command sets:
  kiaan login --api-key=<key>   Authenticate terminal profile session
  kiaan deploy                  Push active directory extensions
  kiaan info                    Display authenticated workspace settings
  kiaan clear                   Flush terminal log dashboard screen`;
    } else if (cmd.startsWith('kiaan login')) {
      resp = 'Success: Authenticated CLI console with tenant workspace (Default Tenant).';
    } else if (cmd === 'kiaan deploy') {
      resp = 'Preparing bundles...\nDeploying extensions and themes configuration (100%)\nStatus: Success (Deployed to Production environment)';
    } else if (cmd === 'kiaan info') {
      resp = 'Active Tenant: Acme Corp (default_org)\nUser Session: Developer Client (Dev Relations)\nAPI Host: https://api.kiaan-os.io';
    } else if (cmd === 'kiaan clear') {
      setTerminalLines([]);
      setCliInput('');
      return;
    } else {
      resp = `Command not recognized: "${cmd}". Type "kiaan help" to view active command flags.`;
    }

    setTerminalLines([...terminalLines, `> ${cmd}`, resp, '']);
    setCliInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Terminal Emulator */}
      <div className="glass-card" style={{ background: '#080808', border: '1px solid #333333', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'space-between', borderBottom: '1px solid #1a1a1a', paddingBottom: '10px', width: '100%' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
          </div>
          <span style={{ color: '#666666', fontSize: '12px', marginLeft: 'auto' }}>Interactive Terminal</span>
        </div>
        <div style={{ height: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: '#a5b4fc', whiteSpace: 'pre-wrap' }}>
          {terminalLines.map((line, idx) => <div key={idx}>{line}</div>)}
        </div>
        <form onSubmit={handleCommandSubmit} style={{ display: 'flex', gap: '8px', borderTop: '1px solid #1a1a1a', paddingTop: '10px' }}>
          <span style={{ color: '#22c55e', fontSize: '14px', fontWeight: 'bold' }}>$</span>
          <input 
            type="text" 
            placeholder="Type command here (e.g. kiaan help)" 
            value={cliInput} 
            onChange={(e) => setCliInput(e.target.value)} 
            style={{ flex: 1, background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontFamily: 'monospace', fontSize: '13px' }}
          />
        </form>
      </div>

      {/* Auth Token Modal */}
      <Modal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} title="Generate CLI One-Time Auth Token">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Use this token to login from your machine. Run `kiaan login --token=&lt;token&gt;` inside your prompt window.
          </p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input type="text" readOnly value={generatedToken} style={{ ...inputStyle, marginTop: 0, fontFamily: 'monospace', fontSize: '13px' }} />
            <button onClick={() => {
              navigator.clipboard.writeText(generatedToken);
              window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Auth token copied!' }));
            }} style={{ ...btnSecondaryStyle, padding: '10px' }}>
              <Copy size={16} />
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsAuthOpen(false)} style={btnPrimaryStyle}>Done</button>
          </div>
        </div>
      </Modal>

      {/* Commands List Help Modal */}
      <Modal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} title="CLI Complete Command Reference Guide">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            List of primary CLI flags and parameter controls available:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            {[
              { cmd: 'kiaan init', desc: 'Initialize local workspace configurations settings.' },
              { cmd: 'kiaan login --api-key=<key>', desc: 'Authorize profile using generated live secret token.' },
              { cmd: 'kiaan deploy --env=<production|staging>', desc: 'Zip and sync local extension files to cloud server.' },
              { cmd: 'kiaan webhooks sync', desc: 'Saves and retrieves target API listener endpoints list.' },
              { cmd: 'kiaan version', desc: 'Displays active package version code details.' }
            ].map((c, i) => (
              <div key={i} style={{ borderBottom: '1px solid #222222', paddingBottom: '8px' }}>
                <strong style={{ color: '#eab308', fontFamily: 'monospace' }}>{c.cmd}</strong>
                <div style={{ color: '#888888', marginTop: '2px' }}>{c.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsHelpOpen(false)} style={btnSecondaryStyle}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   6. API Sandbox
   ---------------------------------------------------- */
export const DeveloperSandbox: React.FC = () => {
  const [users, setUsers] = useState([
    { id: '1', name: 'Mock User Alpha', email: 'alpha@mock-user.io', role: 'Tester Client', category: 'Enterprise Tier', status: 'Healthy' },
    { id: '2', name: 'Mock User Beta', email: 'beta@mock-user.io', role: 'Admin Client', category: 'Developer Tier', status: 'Healthy' },
  ]);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [confirmWord, setConfirmWord] = useState('');
  const [resetting, setResetting] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('45.00');
  const [simStatus, setSimStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  useEffect(() => {
    const handlePri = () => {
      setConfirmWord('');
      setResetting(false);
      setIsResetOpen(true);
    };
    const handleSec = () => {
      setSimStatus('idle');
      setIsPaymentOpen(true);
    };
    window.addEventListener('dev-pri-dev-sandbox', handlePri);
    window.addEventListener('dev-sec-dev-sandbox', handleSec);
    return () => {
      window.removeEventListener('dev-pri-dev-sandbox', handlePri);
      window.removeEventListener('dev-sec-dev-sandbox', handleSec);
    };
  }, []);

  const handleResetConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmWord !== 'RESET') return;
    setResetting(true);
    setTimeout(() => {
      setUsers([
        { id: String(Date.now()), name: 'Fresh System Account', email: 'admin@sandbox-fresh.io', role: 'Default Admin', category: 'Sandbox Init', status: 'Healthy' }
      ]);
      setResetting(false);
      setIsResetOpen(false);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Sandbox database flushed to initial defaults!' }));
    }, 2000);
  };

  const handleSimulatePayment = () => {
    setSimStatus('processing');
    setTimeout(() => {
      setSimStatus('success');
      window.dispatchEvent(new CustomEvent('show-toast', { detail: `Mock charge of $${paymentAmount} captured successfully!` }));
    }, 1500);
  };

  const generateRandomUser = () => {
    const rand = Math.floor(Math.random() * 1000);
    setUsers([
      ...users,
      {
        id: String(Date.now()),
        name: `Mock Profile #${rand}`,
        email: `profile_${rand}@mock-user.io`,
        role: 'Client Tester',
        category: 'Self Service Tier',
        status: 'Healthy'
      }
    ]);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'New random tester profile added.' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Profiles list */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, margin: 0, color: '#ffffff' }}>Active Sandbox Tester Profiles</h4>
          <button onClick={generateRandomUser} style={btnSecondaryStyle}>+ Generate Random Profile</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>{['User ID', 'Full Name', 'Email Address', 'Role/Permission', 'Pricing Tier', 'Health'].map(h => <th key={h} style={thHead}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, fontFamily: 'monospace', fontSize: '12px', color: '#6366f1' }}>{u.id}</td>
                  <td style={{ ...thCell, color: '#ffffff', fontWeight: 600 }}>{u.name}</td>
                  <td style={thCell}>{u.email}</td>
                  <td style={thCell}>{u.role}</td>
                  <td style={thCell}>{u.category}</td>
                  <td style={thCell}><span style={badge('#22c55e')}>{u.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reset Sandbox Modal */}
      <Modal isOpen={isResetOpen} onClose={() => setIsResetOpen(false)} title="Reset Sandbox Environment Database">
        <form onSubmit={handleResetConfirm} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '13px' }}>
            <strong>WARNING:</strong> This action will permanently flush and purge all mock leads, active sandbox api tokens, and generated tester customer health scores.
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Please type "RESET" to confirm deletion:</label>
            <input 
              type="text" 
              required 
              placeholder="RESET" 
              value={confirmWord} 
              onChange={(e) => setConfirmWord(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setIsResetOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" disabled={confirmWord !== 'RESET' || resetting} style={{ ...btnPrimaryStyle, backgroundColor: '#ef4444' }}>
              {resetting ? 'Flushing Database...' : 'Confirm Sandbox Purge'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Stripe mock payment Modal */}
      <Modal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} title="Simulate Stripe Gateways Capture">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Mock a Stripe credit card checkout event payload to test subscription renewals.
          </p>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Charge Amount ($ USD)</label>
            <input 
              type="number" 
              step="0.01" 
              value={paymentAmount} 
              onChange={(e) => setPaymentAmount(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Mock Card Number</label>
            <input type="text" readOnly value="4242 •••• •••• 4242" style={{ ...inputStyle, color: '#888888' }} />
          </div>
          {simStatus === 'processing' && (
            <div style={{ color: '#eab308', fontSize: '13px', fontWeight: 600 }}>Simulating token exchange handshake with Stripe sandbox servers...</div>
          )}
          {simStatus === 'success' && (
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e', fontSize: '13px' }}>
              <strong>Payment Accepted!</strong> Captured transaction code: TXN_STRIPE_MOCK_88201A9. Event `invoice.paid` dispatched to webhooks.
            </div>
          )}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsPaymentOpen(false)} style={btnSecondaryStyle}>Close</button>
            <button onClick={handleSimulatePayment} disabled={simStatus === 'processing'} style={btnPrimaryStyle}>Run Payment Simulation</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   7. Event Bus
   ---------------------------------------------------- */
export const DeveloperEventBus: React.FC = () => {
  const [topics] = useState([
    { name: 'lead.converted', subscribers: '3 active hooks', msgs: '4,520 dispatches', rate: '100% Success', color: '#6366f1' },
    { name: 'invoice.paid', subscribers: '2 active hooks', msgs: '1,490 dispatches', rate: '99.8% Success', color: '#22c55e' },
    { name: 'extension.installed', subscribers: '5 active hooks', msgs: '840 dispatches', rate: '100% Success', color: '#a855f7' }
  ]);
  const [logs, setLogs] = useState<string[]>([
    '[11:40:22] EventBus Initialized. Listening on event channel: default_pub_sub',
    '[11:42:01] Ingested message topic: extension.installed | payload={extId: "cos-hubspot-connector"}'
  ]);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [topicName, setTopicName] = useState('lead.converted');
  const [payloadText, setPayloadText] = useState(`{
  "leadId": "LD-88219",
  "name": "Jane Doe",
  "conversionValue": 1200.00
}`);

  useEffect(() => {
    const handlePri = () => setIsPublishOpen(true);
    const handleSec = () => setIsConfigOpen(true);
    window.addEventListener('dev-pri-dev-event-bus', handlePri);
    window.addEventListener('dev-sec-dev-event-bus', handleSec);
    return () => {
      window.removeEventListener('dev-pri-dev-event-bus', handlePri);
      window.removeEventListener('dev-sec-dev-event-bus', handleSec);
    };
  }, []);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const time = new Date().toTimeString().split(' ')[0];
    const logMsg = `[${time}] Ingested message topic: ${topicName} | payload=${payloadText.replace(/\s+/g, ' ')}`;
    setLogs([logMsg, ...logs]);
    setIsPublishOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Message published to Event Bus!' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Topics list */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#ffffff' }}>Active Event Bus Topics</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>{['Topic Name', 'Registered Subscribers', 'Total Message Count', 'Delivery Success Rate'].map(h => <th key={h} style={thHead}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {topics.map(t => (
                <tr key={t.name} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: t.color, fontWeight: 700, fontFamily: 'monospace' }}>{t.name}</td>
                  <td style={thCell}>{t.subscribers}</td>
                  <td style={thCell}>{t.msgs}</td>
                  <td style={thCell}><span style={badge('#22c55e')}>{t.rate}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Logger streaming output */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 600, margin: 0, color: '#ffffff' }}>Realtime Event Subscriber Logging Stream</h4>
        <pre style={{ margin: 0, padding: '16px', background: '#0a0a0a', border: '1px solid #333333', borderRadius: '8px', color: '#a5b4fc', fontFamily: 'monospace', fontSize: '13px', height: '180px', overflowY: 'auto' }}>
          {logs.join('\n')}
        </pre>
      </div>

      {/* Publish Modal */}
      <Modal isOpen={isPublishOpen} onClose={() => setIsPublishOpen(false)} title="Publish Manual Test Message Event">
        <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Select Topic</label>
            <select value={topicName} onChange={(e) => setTopicName(e.target.value)} style={inputStyle}>
              {topics.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>JSON Payload Body</label>
            <textarea 
              rows={5} 
              required
              value={payloadText} 
              onChange={(e) => setPayloadText(e.target.value)} 
              style={{ ...inputStyle, fontFamily: 'monospace', resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setIsPublishOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Broadcast Event</button>
          </div>
        </form>
      </Modal>

      {/* Event config Modal */}
      <Modal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} title="Configure Event Log Retention Policies">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Optimize event bus logging limits and storage thresholds.
          </p>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Log Storage Strategy</label>
            <select style={inputStyle}>
              <option>Retain last 7 days of logs (Recommended)</option>
              <option>Retain last 24 hours of logs</option>
              <option>No Retention (Streaming only)</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Max payload limits per event (KB)</label>
            <input type="number" defaultValue="256" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsConfigOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button onClick={() => {
              window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Log policy settings saved.' }));
              setIsConfigOpen(false);
            }} style={btnPrimaryStyle}>Apply Retention Policy</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   8. Marketplace APIs
   ---------------------------------------------------- */
export const DeveloperMarketplaceApis: React.FC = () => {
  const [credentials, setCredentials] = useState([
    { name: 'Plugin Registry Sync Key', key: 'kos_partner_mkt_...1A90', scope: 'Publish Plugin Extensions', status: 'Synced' },
    { name: 'Theme Webhook Sync Key', key: 'kos_partner_mkt_...8B12', scope: 'Theme Asset Sync', status: 'Synced' }
  ]);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const [newPartnerName, setNewPartnerName] = useState('');
  const [partnerScope, setPartnerScope] = useState('Publish Plugin Extensions');
  const [genKey, setGenKey] = useState('');
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const handlePri = () => {
      setGenKey('');
      setNewPartnerName('');
      setIsGenerateOpen(true);
    };
    const handleSec = () => {
      setSyncing(false);
      setSyncProgress(0);
      setIsSyncOpen(true);
    };
    window.addEventListener('dev-pri-dev-mkt-apis', handlePri);
    window.addEventListener('dev-sec-dev-mkt-apis', handleSec);
    return () => {
      window.removeEventListener('dev-pri-dev-mkt-apis', handlePri);
      window.removeEventListener('dev-sec-dev-mkt-apis', handleSec);
    };
  }, []);

  const handleGeneratePartnerKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartnerName.trim()) return;
    const randomKey = 'kos_partner_mkt_' + Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setGenKey(randomKey);
    setCredentials([
      ...credentials,
      {
        name: newPartnerName,
        key: `${randomKey.substring(0, 16)}...${randomKey.substring(randomKey.length - 4)}`,
        scope: partnerScope,
        status: 'Synced'
      }
    ]);
  };

  const handleSyncExtensions = () => {
    setSyncing(true);
    setSyncProgress(0);
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncing(false);
          window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Partner extension bundles synchronized!' }));
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Credentials Table */}
      <div className="glass-card">
        <h4 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 16px 0', color: '#ffffff' }}>Active Partner Keys</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>{['Partner Credential Name', 'Secret API Key prefix', 'Scope Permission', 'Synchronization State'].map(h => <th key={h} style={thHead}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {credentials.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#ffffff', fontWeight: 600 }}>{c.name}</td>
                  <td style={{ ...thCell, fontFamily: 'monospace', color: '#a855f7' }}>{c.key}</td>
                  <td style={thCell}>{c.scope}</td>
                  <td style={thCell}><span style={badge('#22c55e')}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Partner Key Modal */}
      <Modal isOpen={isGenerateOpen} onClose={() => setIsGenerateOpen(false)} title="Generate Marketplace Partner API Key">
        {!genKey ? (
          <form onSubmit={handleGeneratePartnerKey} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Partner/Agency Developer Name</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Acme Theme Creators Hub" 
                value={newPartnerName} 
                onChange={(e) => setNewPartnerName(e.target.value)} 
                style={inputStyle} 
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Access Scope Permissions</label>
              <select value={partnerScope} onChange={(e) => setPartnerScope(e.target.value)} style={inputStyle}>
                <option value="Publish Plugin Extensions">Publish Plugin Extensions</option>
                <option value="Theme Asset Sync">Theme Asset Sync</option>
                <option value="AI Prompts Ingest">AI Prompts Ingest API</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button type="button" onClick={() => setIsGenerateOpen(false)} style={btnSecondaryStyle}>Cancel</button>
              <button type="submit" style={btnPrimaryStyle}>Generate Partner Key</button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)', color: '#a855f7', fontSize: '13px' }}>
              <strong>Partner Key Generated!</strong> share it securely with your publisher client.
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input type="text" readOnly value={genKey} style={{ ...inputStyle, marginTop: 0, fontFamily: 'monospace', fontSize: '13px' }} />
              <button onClick={() => {
                navigator.clipboard.writeText(genKey);
                window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Partner key copied!' }));
              }} style={{ ...btnSecondaryStyle, padding: '10px' }}>
                <Copy size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button onClick={() => setIsGenerateOpen(false)} style={btnPrimaryStyle}>Done</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Sync extensions Modal */}
      <Modal isOpen={isSyncOpen} onClose={() => setIsSyncOpen(false)} title="Force Synchronize Extension Configurations">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Remotely trigger validation of uploaded third-party extensions schema files against the current core version.
          </p>
          <button onClick={handleSyncExtensions} disabled={syncing} style={btnPrimaryStyle}>
            {syncing ? 'Synchronizing...' : 'Start Schema Verification Sync'}
          </button>
          {syncing && (
            <div style={{ width: '100%', height: '8px', background: '#333333', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ width: `${syncProgress}%`, height: '100%', background: '#6366f1', transition: 'width 0.3s' }}></div>
            </div>
          )}
          {!syncing && syncProgress === 100 && (
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', color: '#22c55e', fontSize: '13px' }}>
              <strong>Sync Complete!</strong> Verified and published 15 plugin bundles & 4 templates.
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsSyncOpen(false)} style={btnSecondaryStyle}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   9. API Analytics
   ---------------------------------------------------- */
export const DeveloperApiAnalytics: React.FC = () => {
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isCsvOpen, setIsCsvOpen] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState('80');
  const [exportingCsv, setExportingCsv] = useState(false);

  useEffect(() => {
    const handlePri = () => setIsAlertsOpen(true);
    const handleSec = () => {
      setExportingCsv(false);
      setIsCsvOpen(true);
    };
    window.addEventListener('dev-pri-dev-analytics', handlePri);
    window.addEventListener('dev-sec-dev-analytics', handleSec);
    return () => {
      window.removeEventListener('dev-pri-dev-analytics', handlePri);
      window.removeEventListener('dev-sec-dev-analytics', handleSec);
    };
  }, []);

  const handleDownloadCsv = () => {
    setExportingCsv(true);
    setTimeout(() => {
      setExportingCsv(false);
      setIsCsvOpen(false);
      const csvContent = "data:text/csv;charset=utf-8,Timestamp,Endpoint,Method,Status,LatencyMs\n"
        + "2026-07-08T11:00:22,/v3/crm/leads,GET,200,31\n"
        + "2026-07-08T11:02:14,/v3/marketing/campaigns,POST,201,48\n";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "api_performance_analytics.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'API Analytics CSV downloaded.' }));
    }, 1500);
  };

  const requestTrend = [
    { time: '09:00', requests: 1200 },
    { time: '10:00', requests: 1500 },
    { time: '11:00', requests: 1800 },
    { time: '12:00', requests: 2400 },
    { time: '13:00', requests: 2200 },
    { time: '14:00', requests: 2800 },
    { time: '15:00', requests: 3100 }
  ];

  const stats = [
    { label: 'Total API Requests', val: '4.8M', sub: 'Last 30 days', icon: <TrendingUp size={18}/>, iconBg: '#6366f118', iconColor: '#6366f1' },
    { label: 'Average Latency', val: '42 ms', sub: 'Resolver: 10ms', icon: <Zap size={18}/>, iconBg: '#22c55e18', iconColor: '#22c55e' },
    { label: 'API Error Rate', val: '0.02%', sub: 'SLA target: < 0.1%', icon: <AlertTriangle size={18}/>, iconBg: '#ef444418', iconColor: '#ef4444' },
    { label: 'Bandwidth Consumed', val: '31.2 GB', sub: 'Limit: Uncapped', icon: <Database size={18}/>, iconBg: '#a855f718', iconColor: '#a855f7' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#888888', fontSize: '13px', fontWeight: 500 }}>{s.label}</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.iconColor }}>{s.icon}</div>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '4px 0 0 0', color: '#ffffff' }}>{s.val}</h2>
            <div style={{ fontSize: '12px', color: '#666666' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#ffffff' }}>API Requests Load Trend</h3>
          <p style={{ fontSize: '13px', color: '#888888', margin: '4px 0 0 0' }}>Request traffic volume tracked over last 7 hours</p>
        </div>
        <div style={{ height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={requestTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="apiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#666666" fontSize={11} tickLine={false} />
              <YAxis stroke="#666666" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333333', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="requests" stroke="#6366f1" fill="url(#apiGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts Modal */}
      <Modal isOpen={isAlertsOpen} onClose={() => setIsAlertsOpen(false)} title="Configure Latency Alerts Settings">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Set system-wide thresholds. Get Slack or Email alerts when latency peaks or error rates surpass limits.
          </p>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Latency Threshold (ms)</label>
            <input 
              type="number" 
              value={alertThreshold} 
              onChange={(e) => setAlertThreshold(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsAlertsOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button onClick={() => {
              window.dispatchEvent(new CustomEvent('show-toast', { detail: `Latency alert configured for > ${alertThreshold}ms.` }));
              setIsAlertsOpen(false);
            }} style={btnPrimaryStyle}>Save Configuration</button>
          </div>
        </div>
      </Modal>

      {/* CSV Export Modal */}
      <Modal isOpen={isCsvOpen} onClose={() => setIsCsvOpen(false)} title="Export Historical Analytics Logs">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Download performance metrics and endpoint audit records as a CSV spreadsheet.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsCsvOpen(false)} style={btnSecondaryStyle}>Close</button>
            <button onClick={handleDownloadCsv} disabled={exportingCsv} style={btnPrimaryStyle}>
              {exportingCsv ? 'Compiling File...' : 'Start Download'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
