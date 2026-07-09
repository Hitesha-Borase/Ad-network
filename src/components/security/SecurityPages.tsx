import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { 
  RefreshCw, Trash2, Eye, EyeOff
} from 'lucide-react';

// Common visual styles matching the dark premium theme
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
   1. Threat Detection
   ---------------------------------------------------- */
export const SecurityThreatDetection: React.FC = () => {
  const [threats] = useState([
    { id: 'TR-9902', vector: 'Brute Force Login Attempt', sev: 'High', sevColor: '#ef4444', ip: '198.51.100.42', status: 'IP Blocked (Permanent)' },
    { id: 'TR-9901', vector: 'SQL Injection Attempt', sev: 'Critical', sevColor: '#dc2626', ip: '203.0.113.88', status: 'Request Dropped & Logged' },
    { id: 'TR-9900', vector: 'XSS Payload in Form Field', sev: 'Medium', sevColor: '#f59e0b', ip: '192.0.2.55', status: 'Sanitized by WAF' },
  ]);
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');

  useEffect(() => {
    const handlePri = () => {
      setScanning(false);
      setScanResult('');
      setIsScanOpen(true);
    };
    const handleSec = () => setIsLogsOpen(true);
    window.addEventListener('sec-pri-sec-threat', handlePri);
    window.addEventListener('sec-sec-sec-threat', handleSec);
    return () => {
      window.removeEventListener('sec-pri-sec-threat', handlePri);
      window.removeEventListener('sec-sec-sec-threat', handleSec);
    };
  }, []);

  const triggerScan = () => {
    setScanning(true);
    setScanResult('');
    setTimeout(() => {
      setScanning(false);
      setScanResult('Completed successfully. 0 active threats detected. 12 background assets audited.');
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'AI Security Threat scan completed.' }));
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', color: '#ffffff', margin: 0, fontWeight: 700 }}>Active Incident Mitigation Log</h4>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr>{['Threat ID', 'Attack Vector', 'Severity', 'Source IP', 'Mitigation Status'].map(h => <th key={h} style={thHead}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {threats.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#818cf8', fontWeight: 700, fontFamily: 'monospace' }}>{row.id}</td>
                  <td style={{ ...thCell, color: '#ffffff' }}>{row.vector}</td>
                  <td style={thCell}>
                    <span style={badge(row.sevColor)}>{row.sev}</span>
                  </td>
                  <td style={{ ...thCell, color: '#888888', fontFamily: 'monospace', fontSize: '12px' }}>{row.ip}</td>
                  <td style={{ ...thCell, color: '#aaaaaa' }}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Threat Scan Modal */}
      <Modal isOpen={isScanOpen} onClose={() => setIsScanOpen(false)} title="AI Security Center Scan Console">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Analyze directory components, active developer keys, and ingress web application firewall logs for signs of compromise.
          </p>
          {scanning ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', padding: '20px 0' }}>
              <RefreshCw className="animate-spin" size={32} color="#6366f1" />
              <span style={{ fontSize: '13px', color: '#eab308' }}>Auditing active sessions and database handlers...</span>
            </div>
          ) : (
            <button onClick={triggerScan} style={btnPrimaryStyle}>Start Full System Scan</button>
          )}
          {scanResult && (
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e', fontSize: '13px' }}>
              {scanResult}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsScanOpen(false)} style={btnSecondaryStyle}>Close</button>
          </div>
        </div>
      </Modal>

      {/* Mitigation logs Modal */}
      <Modal isOpen={isLogsOpen} onClose={() => setIsLogsOpen(false)} title="Security Sandbox Sandbox Logs">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Historical sandbox events processed inside our AI containment zone:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
            {[
              'TR-9902: Sandbox isolated attacker file upload structure (100% mitigated)',
              'TR-9901: Blocked SQLi attempt from Tor IP 203.0.113.88',
              'TR-9900: Scrubbed HTML tags from payload parameters input'
            ].map((log, idx) => (
              <div key={idx} style={{ padding: '10px', background: '#0a0a0a', border: '1px solid #222222', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', color: '#818cf8' }}>
                {log}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsLogsOpen(false)} style={btnSecondaryStyle}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   2. DDoS Protection
   ---------------------------------------------------- */
export const SecurityDdos: React.FC = () => {
  const [rateLimit, setRateLimit] = useState('200');
  const [mitigationMode, setMitigationMode] = useState('JS Challenge');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  useEffect(() => {
    const handlePri = () => setIsConfigOpen(true);
    const handleSec = () => setIsAnalyticsOpen(true);
    window.addEventListener('sec-pri-sec-ddos', handlePri);
    window.addEventListener('sec-sec-sec-ddos', handleSec);
    return () => {
      window.removeEventListener('sec-pri-sec-ddos', handlePri);
      window.removeEventListener('sec-sec-sec-ddos', handleSec);
    };
  }, []);

  const ddosTrendData = [
    { time: '11:40', traffic: 120 },
    { time: '11:42', traffic: 180 },
    { time: '11:44', traffic: 950 }, // Attack spike
    { time: '11:46', traffic: 220 }, // Mitigated
    { time: '11:48', traffic: 140 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h4 style={{ fontSize: '15px', color: '#ffffff', margin: 0, fontWeight: 700 }}>Real-time Request Scrubbing Volume</h4>
        <div style={{ height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ddosTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="ddosGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#666666" fontSize={11} tickLine={false} />
              <YAxis stroke="#666666" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333333', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="traffic" stroke="#ef4444" fill="url(#ddosGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Configure Limits Modal */}
      <Modal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} title="Configure Ingress DDoS Protection Settings">
        <form onSubmit={(e) => {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('show-toast', { detail: 'DDoS rate thresholds updated.' }));
          setIsConfigOpen(false);
        }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Max requests per client IP (per minute)</label>
            <input 
              type="number" 
              value={rateLimit} 
              onChange={(e) => setRateLimit(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Attack Mitigation Strategy</label>
            <select value={mitigationMode} onChange={(e) => setMitigationMode(e.target.value)} style={inputStyle}>
              <option value="JS Challenge">JavaScript Challenge (Saves legit traffic)</option>
              <option value="CAPTCHA">Force Google CAPTCHA Verification</option>
              <option value="Block">Immediate IP drop (Highly defensive)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setIsConfigOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Apply Shield Rules</button>
          </div>
        </form>
      </Modal>

      {/* Traffic Analytics Modal */}
      <Modal isOpen={isAnalyticsOpen} onClose={() => setIsAnalyticsOpen(false)} title="Security Traffic telemetry logs">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Telemetry status of recent blocked layer-7 flooding attempts:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
            {[
              'Blocked IP 45.18.29.112 (Sent 1,420 req/sec | Mitigated in 0.4s)',
              'Blocked IP 203.88.22.44 (Sent 980 req/sec | Mitigated in 0.2s)',
              'Challenged IP 104.99.12.92 (JS challenge answered - Allowed entry)'
            ].map((log, idx) => (
              <div key={idx} style={{ padding: '10px', background: '#0a0a0a', border: '1px solid #222222', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', color: '#ef4444' }}>
                {log}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsAnalyticsOpen(false)} style={btnSecondaryStyle}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   3. API Security
   ---------------------------------------------------- */
export const SecurityApiSecurity: React.FC = () => {
  const [keys, setKeys] = useState([
    { id: '1', label: 'default_webhook_sync', created: '2026-03-12', last: '2 mins ago', scope: 'Read/Write', status: 'Active', statusColor: '#22c55e' },
    { id: '2', label: 'crm_sync_production', created: '2026-05-18', last: '1 hour ago', scope: 'Read-only', status: 'Active', statusColor: '#22c55e' }
  ]);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [isRotateOpen, setIsRotateOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyScope, setNewKeyScope] = useState('Read/Write');

  useEffect(() => {
    const handlePri = () => {
      setNewKeyName('');
      setIsGenerateOpen(true);
    };
    const handleSec = () => setIsRotateOpen(true);
    window.addEventListener('sec-pri-sec-api', handlePri);
    window.addEventListener('sec-sec-sec-api', handleSec);
    return () => {
      window.removeEventListener('sec-pri-sec-api', handlePri);
      window.removeEventListener('sec-sec-sec-api', handleSec);
    };
  }, []);

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    setKeys([
      ...keys,
      {
        id: String(Date.now()),
        label: newKeyName,
        created: new Date().toISOString().split('T')[0],
        last: 'Never',
        scope: newKeyScope,
        status: 'Active',
        statusColor: '#22c55e'
      }
    ]);
    setIsGenerateOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'API security key generated.' }));
  };

  const revokeKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'API Key revoked.' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', color: '#ffffff', margin: 0, fontWeight: 700 }}>API Access Tokens & Keys</h4>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr>{['Key Label', 'Created Date', 'Last Active', 'Access Scope', 'Status', 'Action'].map(h => <th key={h} style={thHead}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {keys.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#818cf8', fontWeight: 700, fontFamily: 'monospace', fontSize: '12px' }}>{row.label}</td>
                  <td style={{ ...thCell, color: '#888888' }}>{row.created}</td>
                  <td style={thCell}>{row.last}</td>
                  <td style={thCell}>{row.scope}</td>
                  <td style={thCell}><span style={badge(row.statusColor)}>{row.status}</span></td>
                  <td style={thCell}>
                    <button onClick={() => revokeKey(row.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Revoke Key">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate API Key Modal */}
      <Modal isOpen={isGenerateOpen} onClose={() => setIsGenerateOpen(false)} title="Generate Secure API Token Credentials">
        <form onSubmit={handleGenerateKey} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>API Key Label</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. analytics_sync_token" 
              value={newKeyName} 
              onChange={(e) => setNewKeyName(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Scope Policy</label>
            <select value={newKeyScope} onChange={(e) => setNewKeyScope(e.target.value)} style={inputStyle}>
              <option value="Read/Write">Read/Write (Full access)</option>
              <option value="Read-only">Read-only (Telemetry sync)</option>
              <option value="Write-only">Write-only (Webhook ingestion)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setIsGenerateOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Generate Key Credentials</button>
          </div>
        </form>
      </Modal>

      {/* Rotate Key Set Modal */}
      <Modal isOpen={isRotateOpen} onClose={() => setIsRotateOpen(false)} title="Rotate Master Key configurations">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Forces rotation of all active publisher key tokens. All current client connections must reconnect with the new rotated credentials.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsRotateOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button onClick={() => {
              window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Rotating secrets keyset... completed.' }));
              setIsRotateOpen(false);
            }} style={btnPrimaryStyle}>Confirm Rotate Now</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   4. WAF (Web Application Firewall)
   ---------------------------------------------------- */
export const SecurityWaf: React.FC = () => {
  const [sqli, setSqli] = useState(true);
  const [xss, setXss] = useState(true);
  const [ssrf, setSsrf] = useState(false);
  const [rules, setRules] = useState([
    { id: '1', name: 'Block User Agent: Scrapy', action: 'Block', pattern: '^Scrapy\\/.*', status: 'Enabled' },
    { id: '2', name: 'CAPTCHA challenge non-US Traffic', action: 'Challenge', pattern: 'GeoIp.Country != US', status: 'Enabled' }
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleAction, setNewRuleAction] = useState('Block');
  const [newRulePattern, setNewRulePattern] = useState('');

  useEffect(() => {
    const handlePri = () => {
      setNewRuleName('');
      setNewRulePattern('');
      setIsAddOpen(true);
    };
    const handleSec = () => setIsLogsOpen(true);
    window.addEventListener('sec-pri-sec-waf', handlePri);
    window.addEventListener('sec-sec-sec-waf', handleSec);
    return () => {
      window.removeEventListener('sec-pri-sec-waf', handlePri);
      window.removeEventListener('sec-sec-sec-waf', handleSec);
    };
  }, []);

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;
    setRules([
      ...rules,
      {
        id: String(Date.now()),
        name: newRuleName,
        action: newRuleAction,
        pattern: newRulePattern,
        status: 'Enabled'
      }
    ]);
    setIsAddOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Custom WAF filter rule added.' }));
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'WAF rule removed.' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', color: '#ffffff', margin: 0, fontWeight: 700 }}>Web Application Firewall (WAF) Control Center</h4>
        </div>

        {/* Global toggles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'SQL Injection filter (SQLi)', state: sqli, toggle: () => setSqli(!sqli) },
            { label: 'Cross-Site Scripting filter (XSS)', state: xss, toggle: () => setXss(!xss) },
            { label: 'Server-Side Request Forgery filter (SSRF)', state: ssrf, toggle: () => setSsrf(!ssrf) },
          ].map((t, idx) => (
            <div key={idx} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid #333333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#ffffff' }}>{t.label}</span>
              <button 
                onClick={t.toggle}
                style={{
                  width: '42px',
                  height: '22px',
                  borderRadius: '9999px',
                  background: t.state ? '#6366f1' : '#333333',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#ffffff', position: 'absolute', top: '3px', left: t.state ? '23px' : '3px', transition: 'left 0.3s' }}></div>
              </button>
            </div>
          ))}
        </div>

        {/* Custom rules table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr>{['Rule Name', 'Action', 'Target Pattern/Header', 'Status', 'Action'].map(h => <th key={h} style={thHead}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {rules.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#ffffff', fontWeight: 600 }}>{row.name}</td>
                  <td style={thCell}><span style={badge(row.action === 'Block' ? '#ef4444' : '#eab308')}>{row.action}</span></td>
                  <td style={{ ...thCell, fontFamily: 'monospace', color: '#6366f1' }}>{row.pattern}</td>
                  <td style={thCell}><span style={badge('#22c55e')}>{row.status}</span></td>
                  <td style={thCell}>
                    <button onClick={() => removeRule(row.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Delete Rule">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Rule Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Create Web Application Firewall Custom Filter Rule">
        <form onSubmit={handleAddRule} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Rule Name</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Block malicious user-agents" 
              value={newRuleName} 
              onChange={(e) => setNewRuleName(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Action Rule</label>
            <select value={newRuleAction} onChange={(e) => setNewRuleAction(e.target.value)} style={inputStyle}>
              <option value="Block">Block Connection (Immediate reject)</option>
              <option value="Challenge">JavaScript Challenge verification</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Target Pattern (Regex / String Match)</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. ^python-requests.*" 
              value={newRulePattern} 
              onChange={(e) => setNewRulePattern(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setIsAddOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Create Custom WAF Rule</button>
          </div>
        </form>
      </Modal>

      {/* WAF logs Modal */}
      <Modal isOpen={isLogsOpen} onClose={() => setIsLogsOpen(false)} title="Web Application Firewall Ingress block logs">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Recent request blocks registered by active filters:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
            {[
              'Blocked IP 202.99.18.204 (Matched rule-set user-agent: Scrapy)',
              'Sanitized parameter inputs /v3/marketing?name=<script> (Matched pattern XSS Filter)'
            ].map((log, idx) => (
              <div key={idx} style={{ padding: '10px', background: '#0a0a0a', border: '1px solid #222222', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', color: '#eab308' }}>
                {log}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsLogsOpen(false)} style={btnSecondaryStyle}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   5. Secrets Manager
   ---------------------------------------------------- */
export const SecuritySecrets: React.FC = () => {
  const [secrets, setSecrets] = useState([
    { id: '1', name: 'DATABASE_PRODUCTION_PASSWORD', desc: 'PostgreSQL admin credentials credentials', value: 'pg_admin_secretdbpass_8820', hidden: true },
    { id: '2', name: 'STRIPE_API_SANDBOX_KEY', desc: 'Mock stripe payment integrations secret', value: 'sk_test_51N88201a93B2F', hidden: true }
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newSecretName, setNewSecretName] = useState('');
  const [newSecretDesc, setNewSecretDesc] = useState('');
  const [newSecretValue, setNewSecretValue] = useState('');

  useEffect(() => {
    const handlePri = () => {
      setNewSecretName('');
      setNewSecretDesc('');
      setNewSecretValue('');
      setIsAddOpen(true);
    };
    const handleSec = () => setIsSettingsOpen(true);
    window.addEventListener('sec-pri-sec-secrets', handlePri);
    window.addEventListener('sec-sec-sec-secrets', handleSec);
    return () => {
      window.removeEventListener('sec-pri-sec-secrets', handlePri);
      window.removeEventListener('sec-sec-sec-secrets', handleSec);
    };
  }, []);

  const handleAddSecret = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSecretName.trim()) return;
    setSecrets([
      ...secrets,
      {
        id: String(Date.now()),
        name: newSecretName.toUpperCase(),
        desc: newSecretDesc,
        value: newSecretValue,
        hidden: true
      }
    ]);
    setIsAddOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Encrypted secret saved to vault.' }));
  };

  const toggleReveal = (id: string) => {
    setSecrets(secrets.map(s => s.id === id ? { ...s, hidden: !s.hidden } : s));
  };

  const removeSecret = (id: string) => {
    setSecrets(secrets.filter(s => s.id !== id));
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Secret deleted from vault.' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', color: '#ffffff', margin: 0, fontWeight: 700 }}>Secrets Vault parameters</h4>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr>{['Secret Name Key', 'Description Note', 'Vault Value', 'Action'].map(h => <th key={h} style={thHead}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {secrets.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#ffffff', fontWeight: 600, fontFamily: 'monospace' }}>{row.name}</td>
                  <td style={thCell}>{row.desc}</td>
                  <td style={{ ...thCell, fontFamily: 'monospace' }}>
                    {row.hidden ? '••••••••••••••••' : row.value}
                  </td>
                  <td style={thCell}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <button onClick={() => toggleReveal(row.id)} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer' }}>
                        {row.hidden ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button onClick={() => removeSecret(row.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Secret Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Save Encrypted Secret parameters to Vault">
        <form onSubmit={handleAddSecret} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Secret Key (Variable name)</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. SENDGRID_API_KEY" 
              value={newSecretName} 
              onChange={(e) => setNewSecretName(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Description Note</label>
            <input 
              type="text" 
              required 
              placeholder="What is this credential used for?" 
              value={newSecretDesc} 
              onChange={(e) => setNewSecretDesc(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Secret Value string</label>
            <input 
              type="password" 
              required 
              placeholder="Paste password / certificate text here" 
              value={newSecretValue} 
              onChange={(e) => setNewSecretValue(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setIsAddOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Save Secret</button>
          </div>
        </form>
      </Modal>

      {/* Vault settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="Configure Global Vault Encryption Policies">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Encrypt vault secrets with customized HSM or local keys rotation intervals.
          </p>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Vault Encryption Key Strategy</label>
            <select style={inputStyle}>
              <option>AWS KMS Managed Cryptography</option>
              <option>Internal AES-GCM 256 Vault</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Secrets Key Rotation Frequency</label>
            <select style={inputStyle}>
              <option>Every 90 days (Recommended)</option>
              <option>Every 30 days (High Security)</option>
              <option>Manual Rotation only</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsSettingsOpen(false)} style={btnSecondaryStyle}>Close</button>
            <button onClick={() => {
              window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Vault secrets policies updated.' }));
              setIsSettingsOpen(false);
            }} style={btnPrimaryStyle}>Save Settings</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   6. Audit Logs
   ---------------------------------------------------- */
export const SecurityAuditLogs: React.FC = () => {
  const [logs] = useState([
    { ts: '2026-07-07 10:42:15', user: 'alex.mercer@kiaan.com', module: 'API Keys', action: 'Rotate Secret API Key', ip: '192.168.1.140', status: 'Success', statusColor: '#22c55e' },
    { ts: '2026-07-07 09:15:30', user: 'jessica.patel@kiaan.com', module: 'WAF Settings', action: 'Enable Block Suspicious IPs', ip: '192.168.1.152', status: 'Success', statusColor: '#22c55e' },
    { ts: '2026-07-06 22:13:05', user: 'system@kiaan.com', module: 'Authentication', action: 'Blocked brute force: 5 attempts', ip: '198.51.100.42', status: 'Blocked', statusColor: '#ef4444' },
  ]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCsvOpen, setIsCsvOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [exportingCsv, setExportingCsv] = useState(false);

  useEffect(() => {
    const handlePri = () => {
      setSearchQuery('');
      setIsSearchOpen(true);
    };
    const handleSec = () => {
      setExportingCsv(false);
      setIsCsvOpen(true);
    };
    window.addEventListener('sec-pri-sec-logs', handlePri);
    window.addEventListener('sec-sec-sec-logs', handleSec);
    return () => {
      window.removeEventListener('sec-pri-sec-logs', handlePri);
      window.removeEventListener('sec-sec-sec-logs', handleSec);
    };
  }, []);

  const handleDownloadCsv = () => {
    setExportingCsv(true);
    setTimeout(() => {
      setExportingCsv(false);
      setIsCsvOpen(false);
      // Trigger a client-side CSV download
      const csvContent = "data:text/csv;charset=utf-8,Timestamp,User,Module,Action,IP,Status\n"
        + "2026-07-07 10:42:15,alex.mercer@kiaan.com,API Keys,Rotate Secret,192.168.1.140,Success\n"
        + "2026-07-07 09:15:30,jessica.patel@kiaan.com,WAF Settings,Enable block list,192.168.1.152,Success\n";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "system_audit_logs.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Audit logs CSV downloaded.' }));
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', color: '#ffffff', margin: 0, fontWeight: 700 }}>Administrator Audit Log Database</h4>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr>{['Timestamp', 'User', 'Module', 'Action', 'IP Address', 'Status'].map(h => <th key={h} style={thHead}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {logs.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#888888', fontSize: '12px', fontFamily: 'monospace' }}>{row.ts}</td>
                  <td style={{ ...thCell, color: '#818cf8', fontWeight: 600 }}>{row.user}</td>
                  <td style={{ ...thCell, color: '#dddddd' }}>{row.module}</td>
                  <td style={{ ...thCell, color: '#ffffff' }}>{row.action}</td>
                  <td style={{ ...thCell, fontFamily: 'monospace', fontSize: '12px' }}>{row.ip}</td>
                  <td style={thCell}><span style={badge(row.statusColor)}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Search Logs Modal */}
      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Audit Logs Database Query Search">
        <form onSubmit={(e) => {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('show-toast', { detail: `Search filter applied: "${searchQuery}"` }));
          setIsSearchOpen(false);
        }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Search Query Term</label>
            <input 
              type="text" 
              placeholder="e.g. WAF settings, or user email" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setIsSearchOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Search Logs</button>
          </div>
        </form>
      </Modal>

      {/* Export CSV Modal */}
      <Modal isOpen={isCsvOpen} onClose={() => setIsCsvOpen(false)} title="Export Audit logs CSV sheet">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Generate and download standard spreadsheets format list of all admin mutations audit history.
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

/* ----------------------------------------------------
   7. Compliance Dashboard
   ---------------------------------------------------- */
export const SecurityCompliance: React.FC = () => {
  const [checklist, setChecklist] = useState([
    { reg: 'GDPR Article 32', req: 'Security of processing client credentials', audit: 'Verified', status: 'Compliant', color: '#22c55e' },
    { reg: 'CCPA / CPRA', req: 'Right to opt-out and delete data registry', audit: 'Verified', status: 'Compliant', color: '#22c55e' },
    { reg: 'SOC 2 Type II', req: 'Availability & Confidentiality controls', audit: 'Annual Audit', status: 'Certified', color: '#6366f1' },
    { reg: 'HIPAA Technical', req: 'Encryption at-rest and in-transit', audit: 'Reviewed', status: 'Compliant', color: '#22c55e' }
  ]);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [auditing, setAuditing] = useState(false);

  useEffect(() => {
    const handlePri = () => {
      setAuditing(false);
      setIsAuditOpen(true);
    };
    const handleSec = () => setIsPdfOpen(true);
    window.addEventListener('sec-pri-sec-compliance', handlePri);
    window.addEventListener('sec-sec-sec-compliance', handleSec);
    return () => {
      window.removeEventListener('sec-pri-sec-compliance', handlePri);
      window.removeEventListener('sec-sec-sec-compliance', handleSec);
    };
  }, []);

  const triggerComplianceScan = () => {
    setAuditing(true);
    setTimeout(() => {
      setChecklist(checklist.map(item => ({ ...item, status: 'Compliant', audit: 'Verified', color: '#22c55e' })));
      setAuditing(false);
      setIsAuditOpen(false);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'SOC 2 & GDPR Compliance alignment verified.' }));
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', color: '#ffffff', margin: 0, fontWeight: 700 }}>Compliance Rules Checklist</h4>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr>{['Compliance Regulation', 'Requirement', 'Audit Status', 'Status'].map(h => <th key={h} style={thHead}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {checklist.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#818cf8', fontWeight: 700 }}>{row.reg}</td>
                  <td style={{ ...thCell, color: '#dddddd' }}>{row.req}</td>
                  <td style={thCell}>{row.audit}</td>
                  <td style={thCell}><span style={badge(row.color)}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Run Audit Modal */}
      <Modal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} title="Compliance Framework Audit Scanner">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Run real-time cryptography and consent verification scripts against compliance regulatory models.
          </p>
          {auditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', padding: '20px 0' }}>
              <RefreshCw className="animate-spin" size={32} color="#6366f1" />
              <span style={{ fontSize: '13px', color: '#eab308' }}>Checking TLS ciphers and database encrypt states...</span>
            </div>
          ) : (
            <button onClick={triggerComplianceScan} style={btnPrimaryStyle}>Start Compliance verification</button>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsAuditOpen(false)} style={btnSecondaryStyle}>Close</button>
          </div>
        </div>
      </Modal>

      {/* PDF Export Modal */}
      <Modal isOpen={isPdfOpen} onClose={() => setIsPdfOpen(false)} title="Export Compliance Audit PDF Report">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Generate a full audit-ready security validation PDF packet for external auditors.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsPdfOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button onClick={() => {
              window.dispatchEvent(new CustomEvent('show-toast', { detail: 'SOC 2 type II Audit PDF report downloaded.' }));
              setIsPdfOpen(false);
            }} style={btnPrimaryStyle}>Download PDF Report</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   8. Zero Trust Access
   ---------------------------------------------------- */
export const SecurityZeroTrust: React.FC = () => {
  const [sessions, setSessions] = useState([
    { id: '1', user: 'alex.mercer@kiaan.com', role: 'Dev Lead', ip: '192.168.1.140', mfa: 'Verified', scope: 'Developer platform full write' },
    { id: '2', user: 'jessica.patel@kiaan.com', role: 'Security Ops', ip: '192.168.1.152', mfa: 'Verified', scope: 'AI security configuration access' }
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSessionsOpen, setIsSessionsOpen] = useState(false);
  const [newIp, setNewIp] = useState('');
  const [newScope, setNewScope] = useState('Developer platform full write');

  useEffect(() => {
    const handlePri = () => {
      setNewIp('');
      setIsAddOpen(true);
    };
    const handleSec = () => setIsSessionsOpen(true);
    window.addEventListener('sec-pri-sec-zerotrust', handlePri);
    window.addEventListener('sec-sec-sec-zerotrust', handleSec);
    return () => {
      window.removeEventListener('sec-pri-sec-zerotrust', handlePri);
      window.removeEventListener('sec-sec-sec-zerotrust', handleSec);
    };
  }, []);

  const handleAddPolicy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIp.trim()) return;
    setIsAddOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Zero Trust IP policy added for: ${newIp}` }));
  };

  const revokeSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Session revoked instantly.' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '15px', color: '#ffffff', margin: 0, fontWeight: 700 }}>Active Verified Zero Trust Sessions</h4>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr>{['User Email', 'Identity Role', 'IP Endpoint', 'MFA Status', 'Access Token scope', 'Action'].map(h => <th key={h} style={thHead}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {sessions.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#ffffff', fontWeight: 600 }}>{row.user}</td>
                  <td style={thCell}>{row.role}</td>
                  <td style={{ ...thCell, fontFamily: 'monospace', fontSize: '12px' }}>{row.ip}</td>
                  <td style={thCell}><span style={badge('#22c55e')}>{row.mfa}</span></td>
                  <td style={thCell}>{row.scope}</td>
                  <td style={thCell}>
                    <button onClick={() => revokeSession(row.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Revoke access session">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Policy Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Custom Zero Trust Verification Policy">
        <form onSubmit={handleAddPolicy} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Restricted IP CIDR Block</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. 192.168.1.0/24" 
              value={newIp} 
              onChange={(e) => setNewIp(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Target Access Scope</label>
            <select value={newScope} onChange={(e) => setNewScope(e.target.value)} style={inputStyle}>
              <option value="Developer platform full write">Developer platform full write</option>
              <option value="AI security configuration access">AI security configuration access</option>
              <option value="Settings Localization update">Settings Localization update</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setIsAddOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Apply IP Policy</button>
          </div>
        </form>
      </Modal>

      {/* Active Sessions Modal */}
      <Modal isOpen={isSessionsOpen} onClose={() => setIsSessionsOpen(false)} title="Zero Trust Access Policy Guidelines">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Every developer and admin connection must undergo contextual MFA and IP whitelist check on every API call.
          </p>
          <div style={{ padding: '12px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '8px', color: '#22c55e', fontSize: '13.5px' }}>
            ✔ All ingress pipelines are configured with least-privilege RBAC.
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsSessionsOpen(false)} style={btnSecondaryStyle}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   9. Security Monitoring
   ---------------------------------------------------- */
export const SecurityMonitoring: React.FC = () => {
  const [slackUrl, setSlackUrl] = useState('https://hooks.slack.com/services/T00/B00/X00');
  const [channels, setChannels] = useState('#sec-alerts');
  const [isSlackOpen, setIsSlackOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    const handlePri = () => {
      setSlackUrl('https://hooks.slack.com/services/T00/B00/X00');
      setChannels('#sec-alerts');
      setIsSlackOpen(true);
    };
    const handleSec = () => setIsAlertOpen(true);
    window.addEventListener('sec-pri-sec-monitoring', handlePri);
    window.addEventListener('sec-sec-sec-monitoring', handleSec);
    return () => {
      window.removeEventListener('sec-pri-sec-monitoring', handlePri);
      window.removeEventListener('sec-sec-sec-monitoring', handleSec);
    };
  }, []);

  const handleSlackConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSlackOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Slack webhook notifications settings updated.' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Metrics status */}
      <div className="grid-cols-3" style={{ gap: '20px' }}>
        {[
          { title: 'CPU Usage metrics', val: '14.2%', sub: 'Limit: 85%', state: 'Healthy', color: '#22c55e' },
          { title: 'Threat Mitigations today', val: '24 events', sub: 'WAF rules matching', state: 'Healthy', color: '#22c55e' },
          { title: 'API Connection Latency', val: '38 ms', sub: 'Target: < 80ms', state: 'Healthy', color: '#22c55e' }
        ].map((m, idx) => (
          <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#888888', textTransform: 'uppercase' }}>{m.title}</span>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>{m.val}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '12px' }}>
              <span style={{ color: '#666666' }}>{m.sub}</span>
              <span style={{ color: m.color, fontWeight: 'bold' }}>{m.state}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Slack Hooks Modal */}
      <Modal isOpen={isSlackOpen} onClose={() => setIsSlackOpen(false)} title="Configure Alert Notification Channels">
        <form onSubmit={handleSlackConfigSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Incoming Webhook URL</label>
            <input 
              type="url" 
              required 
              value={slackUrl} 
              onChange={(e) => setSlackUrl(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Target Slack Channels</label>
            <input 
              type="text" 
              required 
              value={channels} 
              onChange={(e) => setChannels(e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setIsSlackOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Apply Alert Notifications</button>
          </div>
        </form>
      </Modal>

      {/* Alerts Logs Modal */}
      <Modal isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} title="Download Alerts Logs spreadsheet file">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#aaaaaa', fontSize: '13px', margin: 0 }}>
            Generate and export alert warning history records as a spreadsheet report file.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button onClick={() => setIsAlertOpen(false)} style={btnSecondaryStyle}>Cancel</button>
            <button onClick={() => {
              window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Alert history log file download started.' }));
              setIsAlertOpen(false);
            }} style={btnPrimaryStyle}>Download Alert Logs</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
