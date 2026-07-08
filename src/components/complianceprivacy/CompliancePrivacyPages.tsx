import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, FileText, CheckCircle, Download, UserCheck, 
  MapPin, Activity, Database, Trash2, Globe, Key, FileCheck, 
  Eye, Settings, ExternalLink, X, AlertCircle
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

/* Helper custom event handler hook */
const usePrivacyEvents = (
  pageId: string, 
  onPrimary: () => void, 
  onSecondary: () => void
) => {
  useEffect(() => {
    const handlePri = () => onPrimary();
    const handleSec = () => onSecondary();

    window.addEventListener(`privacy-pri-privacy-${pageId}`, handlePri);
    window.addEventListener(`privacy-sec-privacy-${pageId}`, handleSec);

    return () => {
      window.removeEventListener(`privacy-pri-privacy-${pageId}`, handlePri);
      window.removeEventListener(`privacy-sec-privacy-${pageId}`, handleSec);
    };
  }, [onPrimary, onSecondary, pageId]);
};

/* Toast Dispatcher */
const triggerToast = (msg: string) => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
};


/* ============================================================================
   1. GDPR COMPLIANCE
   ============================================================================ */
export const ComplianceGdpr: React.FC = () => {
  const [dpoModal, setDpoModal] = useState(false);
  const [dpoForm, setDpoForm] = useState({ name: 'Alexander Sterling', email: 'dpo@kiaan.com', phone: '+44 20 7946 0958' });
  const [dpoSaved, setDpoSaved] = useState(true);

  usePrivacyEvents(
    'gdpr',
    () => setDpoModal(true),
    () => {
      triggerToast('GDPR Data Protection Audit exported successfully.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        
        {/* DPO Profile */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserCheck style={{ color: '#6366f1' }} size={20} />
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Data Protection Officer (DPO)</h4>
          </div>
          {dpoSaved ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#aaaaaa' }}>
              <div><strong>Name:</strong> {dpoForm.name}</div>
              <div><strong>Email:</strong> {dpoForm.email}</div>
              <div><strong>Contact:</strong> {dpoForm.phone}</div>
              <button style={btnSecStyle} onClick={() => setDpoModal(true)}>Modify Profile</button>
            </div>
          ) : (
            <div style={{ color: '#888888', fontSize: '13px' }}>
              No Data Protection Officer registered yet.
              <button style={{ ...btnStyle, width: '100%', marginTop: '12px' }} onClick={() => setDpoModal(true)}>Add DPO Profile</button>
            </div>
          )}
        </div>

        {/* Audit Checklist */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCheck style={{ color: '#10b981' }} size={20} />
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>GDPR Compliance Checklist Status</h4>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { rule: 'Article 30 Record of Processing Activities', active: true },
              { rule: 'Article 35 DPIA Framework & Guidelines', active: true },
              { rule: 'User Right to Access Interface (SAR)', active: true },
              { rule: 'Explicit Consent Opt-In Defaults', active: true },
              { rule: 'System Data Portability JSON Exporter', active: false },
              { rule: 'Data Processing Addendum signed', active: true }
            ].map((chk, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <CheckCircle size={16} style={{ color: chk.active ? '#10b981' : '#6b7280' }} />
                <span style={{ fontSize: '12.5px', color: chk.active ? '#dddddd' : '#6b7280' }}>{chk.rule}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Modal isOpen={dpoModal} onClose={() => setDpoModal(false)} title="Register Data Protection Officer (DPO)">
        <form onSubmit={(e) => { e.preventDefault(); setDpoSaved(true); setDpoModal(false); triggerToast('DPO Officer Profile registered successfully.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>DPO Name</label>
            <input type="text" value={dpoForm.name} onChange={e => setDpoForm({...dpoForm, name: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Corporate Email Address</label>
            <input type="email" value={dpoForm.email} onChange={e => setDpoForm({...dpoForm, email: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Direct Phone</label>
            <input type="text" value={dpoForm.phone} onChange={e => setDpoForm({...dpoForm, phone: e.target.value})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setDpoModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Profile</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   2. CCPA COMPLIANCE
   ============================================================================ */
export const ComplianceCcpa: React.FC = () => {
  const [requestModal, setRequestModal] = useState(false);
  const [requests, setRequests] = useState([
    { name: 'John Miller', email: 'jmiller@gmail.com', type: 'Access My Info', status: 'Completed', date: '07/04/2026' },
    { name: 'Alice Watson', email: 'awatson@yahoo.com', type: 'Do Not Sell / Share', status: 'Active Opt-Out', date: '07/06/2026' }
  ]);
  const [form, setForm] = useState({ name: '', email: '', type: 'Do Not Sell / Share' });

  usePrivacyEvents(
    'ccpa',
    () => setRequestModal(true),
    () => {
      triggerToast('CCPA Consumer Opt-Out registry downloaded.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>California Consumer Rights Requests Log</h4>
          <span style={{ fontSize: '11px', color: '#888888' }}>Total Submissions: {requests.length}</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Consumer</th>
                <th style={tableHeaderStyle}>Email Address</th>
                <th style={tableHeaderStyle}>Request Type</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Registered Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r, i) => (
                <tr key={i}>
                  <td style={tableCellStyle}>{r.name}</td>
                  <td style={tableCellStyle}>{r.email}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', backgroundColor: 'rgba(99,102,241,0.15)', color: '#818cf8', padding: '3px 8px', borderRadius: '4px' }}>{r.type}</span>
                  </td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11.5px', color: r.status === 'Completed' ? '#10b981' : '#f59e0b' }}>{r.status}</span>
                  </td>
                  <td style={tableCellStyle}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={requestModal} onClose={() => setRequestModal(false)} title="Log CCPA Consumer Request">
        <form onSubmit={(e) => { e.preventDefault(); setRequests([...requests, { name: form.name, email: form.email, type: form.type, status: 'Active Opt-Out', date: 'Today' }]); setRequestModal(false); triggerToast('CCPA request logged and processed.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Consumer Full Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Consumer Email Address</label>
            <input type="email" onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Request Type</label>
            <select onChange={e => setForm({...form, type: e.target.value})} style={selectStyle}>
              <option value="Do Not Sell / Share">Do Not Sell / Share my Personal Info (DNS)</option>
              <option value="Access My Info">Access my Personal Data</option>
              <option value="Limit Sensitive Info">Limit the Use of Sensitive Data</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setRequestModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Log Consumer Request</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   3. LGPD COMPLIANCE
   ============================================================================ */
export const ComplianceLgpd: React.FC = () => {
  const [dataMapModal, setDataMapModal] = useState(false);
  const [dataMaps, setDataMaps] = useState([
    { system: 'Platform Database', dataCategory: 'Credentials, User profile', purpose: 'Authentication, Access', legalBasis: 'Execution of Contract' },
    { system: 'Twilio SMS Gateway', dataCategory: 'Phone numbers', purpose: '2FA Alerts, Marketing', legalBasis: 'Explicit Consent' }
  ]);
  const [form, setForm] = useState({ system: '', category: '', purpose: '', basis: 'Consent' });

  usePrivacyEvents(
    'lgpd',
    () => setDataMapModal(true),
    () => {
      triggerToast('LGPD processing actions log audit generated.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>LGPD Data Mapping & Processing Inventory</h4>
          <button style={btnStyle} onClick={() => setDataMapModal(true)}>Add Data Map</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>System Entity</th>
                <th style={tableHeaderStyle}>Personal Data Categories</th>
                <th style={tableHeaderStyle}>Purpose of Processing</th>
                <th style={tableHeaderStyle}>Legal Basis (Art. 7 LGPD)</th>
              </tr>
            </thead>
            <tbody>
              {dataMaps.map((map, i) => (
                <tr key={i}>
                  <td style={tableCellStyle}>{map.system}</td>
                  <td style={tableCellStyle}>{map.dataCategory}</td>
                  <td style={tableCellStyle}>{map.purpose}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', backgroundColor: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '3px 8px', borderRadius: '4px' }}>{map.legalBasis}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={dataMapModal} onClose={() => setDataMapModal(false)} title="Register Data Mapping Log Entry">
        <form onSubmit={(e) => { e.preventDefault(); setDataMaps([...dataMaps, { system: form.system, dataCategory: form.category, purpose: form.purpose, legalBasis: form.basis }]); setDataMapModal(false); triggerToast('LGPD data mapping record added.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>System Entity Name</label>
            <input type="text" onChange={e => setForm({...form, system: e.target.value})} style={inputStyle} placeholder="e.g. Stripe Billing" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Personal Data Categories</label>
            <input type="text" onChange={e => setForm({...form, category: e.target.value})} style={inputStyle} placeholder="e.g. Email, Credit Cards" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Purpose of Processing</label>
            <input type="text" onChange={e => setForm({...form, purpose: e.target.value})} style={inputStyle} placeholder="e.g. Subscription Payments Processing" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Legal Processing Basis</label>
            <select onChange={e => setForm({...form, basis: e.target.value})} style={selectStyle}>
              <option value="Consent">Consent (Art. 7, I)</option>
              <option value="Execution of Contract">Execution of Contract (Art. 7, V)</option>
              <option value="Legal Obligation">Compliance with Legal Obligation (Art. 7, II)</option>
              <option value="Legitimate Interest">Legitimate Interest (Art. 7, IX)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setDataMapModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Record</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   4. COOKIE CONSENT
   ============================================================================ */
export const ComplianceCookieConsent: React.FC = () => {
  const [bannerModal, setBannerModal] = useState(false);
  const [cookieScanLoading, setCookieScanLoading] = useState(false);
  const [cookiesCount, setCookiesCount] = useState(14);
  const [theme, setTheme] = useState('Dark Glass');
  const [position, setPosition] = useState('Bottom Overlay Banner');

  usePrivacyEvents(
    'cookie',
    () => {
      setCookieScanLoading(true);
      setTimeout(() => {
        setCookieScanLoading(false);
        setCookiesCount(18);
        triggerToast('Cookie Scan complete! 18 tracking cookies categorized.');
      }, 2000);
    },
    () => setBannerModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Banner Configuration */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Settings style={{ color: '#818cf8' }} size={20} />
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Banner Presentation Configuration</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div>
              <span style={{ color: '#888888' }}>Display Position:</span>
              <strong style={{ color: '#ffffff', marginLeft: '6px' }}>{position}</strong>
            </div>
            <div>
              <span style={{ color: '#888888' }}>Styling Layout:</span>
              <strong style={{ color: '#ffffff', marginLeft: '6px' }}>{theme}</strong>
            </div>
            <div>
              <span style={{ color: '#888888' }}>Strictly Necessary:</span>
              <strong style={{ color: '#10b981', marginLeft: '6px' }}>Always Enabled</strong>
            </div>
            <button style={btnSecStyle} onClick={() => setBannerModal(true)}>Configure Banner Layout</button>
          </div>
        </div>

        {/* Scan Status */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity style={{ color: '#10b981' }} size={20} />
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Cookie Scan & Categorization</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#aaaaaa' }}>
            <div>Last Scan: <strong>Yesterday</strong></div>
            <div>Cookies Tracked: <strong style={{ color: '#ffffff' }}>{cookiesCount} detected</strong></div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button 
                onClick={() => {
                  setCookieScanLoading(true);
                  setTimeout(() => {
                    setCookieScanLoading(false);
                    setCookiesCount(18);
                    triggerToast('Cookie Scan complete! 18 tracking cookies categorized.');
                  }, 2000);
                }} 
                disabled={cookieScanLoading} 
                style={btnStyle}
              >
                {cookieScanLoading ? 'Scanning Web domains...' : 'Trigger Domain Scan'}
              </button>
            </div>
          </div>
        </div>

      </div>

      <Modal isOpen={bannerModal} onClose={() => setBannerModal(false)} title="Consent Banner Visual Builder">
        <form onSubmit={(e) => { e.preventDefault(); setBannerModal(false); triggerToast('Cookie Consent layout updated.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Banner Position</label>
            <select value={position} onChange={e => setPosition(e.target.value)} style={selectStyle}>
              <option value="Bottom Overlay Banner">Bottom Overlay Banner</option>
              <option value="Top Full Width Bar">Top Full Width Bar</option>
              <option value="Left Corner Card">Left Corner Card</option>
              <option value="Right Corner Card">Right Corner Card</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Banner Theme Style</label>
            <select value={theme} onChange={e => setTheme(e.target.value)} style={selectStyle}>
              <option value="Dark Glass">Dark Glassmorphism</option>
              <option value="Light Solid">Light Solid Gray</option>
              <option value="Deep Black Contrast">Deep Black Contrast</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setBannerModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Layout Settings</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   5. CMP (CONSENT MANAGEMENT PLATFORM)
   ============================================================================ */
export const ComplianceCmp: React.FC = () => {
  const [deployModal, setDeployModal] = useState(false);
  const [categoriesModal, setCategoriesModal] = useState(false);
  const [categories, setCategories] = useState([
    { name: 'Strictly Necessary', desc: 'Core session auth and system billing features', code: 'NEC', active: true },
    { name: 'Performance Analytics', desc: 'Page view logs, telemetry, loading timings', code: 'ANL', active: true },
    { name: 'Targeting Advertising', desc: 'Marketing pixels, retargeting cookies, user ads profiles', code: 'ADV', active: false }
  ]);

  usePrivacyEvents(
    'cmp',
    () => setDeployModal(true),
    () => setCategoriesModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>CMP Active Consent Categories</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={btnSecStyle} onClick={() => setCategoriesModal(true)}>Modify Categories</button>
            <button style={btnStyle} onClick={() => setDeployModal(true)}>Get Script Key</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Consent Category</th>
                <th style={tableHeaderStyle}>Key Code</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Default Enablement</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, i) => (
                <tr key={i}>
                  <td style={tableCellStyle}>{c.name}</td>
                  <td style={tableCellStyle}><code>{c.code}</code></td>
                  <td style={tableCellStyle}>{c.desc}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: c.active ? '#10b981' : '#888888' }}>{c.active ? 'Opt-In Enabled' : 'Opt-Out Required'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Script deploy modal */}
      <Modal isOpen={deployModal} onClose={() => setDeployModal(false)} title="Integrate Consent Management (CMP)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
          <p style={{ color: '#aaaaaa' }}>Add this tag to the header of your website to automatically sync tracking pixels to customer consent configurations.</p>
          <div style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '14px' }}>
            <code style={{ fontSize: '11.5px', color: '#818cf8', wordBreak: 'break-all' }}>
              {`<script src="https://cmp.kiaan.com/sdk.js?client=cos-9892011" async defer></script>`}
            </code>
          </div>
          <button style={{ ...btnStyle, marginTop: '8px' }} onClick={() => { triggerToast('CMP Script snippet copied to clipboard.'); setDeployModal(false); }}>Copy Snippet Code</button>
        </div>
      </Modal>

      {/* Configure Categories Modal */}
      <Modal isOpen={categoriesModal} onClose={() => setCategoriesModal(false)} title="Configure CMP Consent Categories">
        <form onSubmit={(e) => { e.preventDefault(); setCategoriesModal(false); triggerToast('Consent Categories configuration updated.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {categories.map((cat, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <span style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>{cat.name}</span>
                <span style={{ fontSize: '11px', color: '#666666' }}>{cat.desc}</span>
              </div>
              <input 
                type="checkbox" 
                checked={cat.active} 
                onChange={(e) => {
                  const updated = [...categories];
                  updated[idx].active = e.target.checked;
                  setCategories(updated);
                }}
                style={{ cursor: 'pointer', width: '16px', height: '16px' }} 
              />
            </div>
          ))}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setCategoriesModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Categories</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   6. DATA RETENTION POLICIES
   ============================================================================ */
export const ComplianceDataRetention: React.FC = () => {
  const [ruleModal, setRuleModal] = useState(false);
  const [rules, setRules] = useState([
    { category: 'Audit Logs & Telemetry', retention: '1 Year', trigger: 'Auto-Delete', status: 'Active' },
    { category: 'Financial & Invoice Invoices', retention: '7 Years', trigger: 'Archive to Cold Glacier', status: 'Active' },
    { category: 'Inactive User Sessions', retention: '30 Days', trigger: 'Hard Purge', status: 'Active' }
  ]);
  const [form, setForm] = useState({ category: '', retention: '6 Months', trigger: 'Auto-Delete' });

  usePrivacyEvents(
    'retention',
    () => setRuleModal(true),
    () => {
      triggerToast('Retention Policies manifest spreadsheet exported.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Active Storage Data Retention Rules</h4>
          <button style={btnStyle} onClick={() => setRuleModal(true)}>Add Retention Rule</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Data Category Group</th>
                <th style={tableHeaderStyle}>Retention Lifetime</th>
                <th style={tableHeaderStyle}>Disposition Trigger Action</th>
                <th style={tableHeaderStyle}>Rule Status</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule, i) => (
                <tr key={i}>
                  <td style={tableCellStyle} style={{ fontWeight: 600, color: '#ffffff', padding: '14px 16px' }}>{rule.category}</td>
                  <td style={tableCellStyle}>{rule.retention}</td>
                  <td style={tableCellStyle}><code>{rule.trigger}</code></td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', backgroundColor: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '3px 8px', borderRadius: '4px' }}>{rule.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={ruleModal} onClose={() => setRuleModal(false)} title="Add Custom Data Retention Policy Rule">
        <form onSubmit={(e) => { e.preventDefault(); setRules([...rules, { category: form.category, retention: form.retention, trigger: form.trigger, status: 'Active' }]); setRuleModal(false); triggerToast('Retention rule registered and running.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Data Category / Type</label>
            <input type="text" onChange={e => setForm({...form, category: e.target.value})} style={inputStyle} placeholder="e.g. Chat Support history" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Retention Period Duration</label>
            <select value={form.retention} onChange={e => setForm({...form, retention: e.target.value})} style={selectStyle}>
              <option value="30 Days">30 Days</option>
              <option value="6 Months">6 Months</option>
              <option value="1 Year">1 Year</option>
              <option value="5 Years">5 Years</option>
              <option value="7 Years">7 Years (Compliance limit)</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Expiration Trigger Action</label>
            <select value={form.trigger} onChange={e => setForm({...form, trigger: e.target.value})} style={selectStyle}>
              <option value="Auto-Delete">Auto-Delete / Hard Purge</option>
              <option value="Archive to Cold Glacier">Archive to Cold Glacier Storage</option>
              <option value="Anonymize Record">Anonymize Personal Columns</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setRuleModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Retention Rule</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   7. DATA RESIDENCY
   ============================================================================ */
export const ComplianceDataResidency: React.FC = () => {
  const [residencyModal, setResidencyModal] = useState(false);
  const [activeRegions, setActiveRegions] = useState([
    { region: 'European Union (Frankfurt)', code: 'EU-CENTRAL', usage: 'Primary customer databases, transaction data', encryption: 'AES-256 HSM keys' },
    { region: 'United States (N. Virginia)', code: 'US-EAST', usage: 'Marketing tracking, analytics metrics', encryption: 'KMS Default' }
  ]);
  const [form, setForm] = useState({ region: '', code: 'EU-WEST', usage: '', encryption: 'AES-256' });

  usePrivacyEvents(
    'residency',
    () => setResidencyModal(true),
    () => {
      triggerToast('Initiating Data Residency geographical audit... Checks passed.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Registered Region Server Databases Lock</h4>
          <button style={btnStyle} onClick={() => setResidencyModal(true)}>Lock Data to Region</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Geographical Residency Region</th>
                <th style={tableHeaderStyle}>Cluster Endpoint Key</th>
                <th style={tableHeaderStyle}>Data Scope Allowed</th>
                <th style={tableHeaderStyle}>Encryption Schema</th>
              </tr>
            </thead>
            <tbody>
              {activeRegions.map((reg, i) => (
                <tr key={i}>
                  <td style={tableCellStyle} style={{ fontWeight: 600, color: '#ffffff', padding: '14px 16px' }}>{reg.region}</td>
                  <td style={tableCellStyle}><code>{reg.code}</code></td>
                  <td style={tableCellStyle}>{reg.usage}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', backgroundColor: 'rgba(99,102,241,0.15)', color: '#818cf8', padding: '3px 8px', borderRadius: '4px' }}>{reg.encryption}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={residencyModal} onClose={() => setResidencyModal(false)} title="Enforce Data Residency Locking Region">
        <form onSubmit={(e) => { e.preventDefault(); setActiveRegions([...activeRegions, { region: form.region, code: form.code, usage: form.usage, encryption: form.encryption }]); setResidencyModal(false); triggerToast('Regional data residency lock configuration applied.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Region Name</label>
            <input type="text" onChange={e => setForm({...form, region: e.target.value})} style={inputStyle} placeholder="e.g. Asia Pacific (Singapore)" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Cluster Endpoint Code</label>
            <input type="text" onChange={e => setForm({...form, code: e.target.value})} style={inputStyle} placeholder="e.g. AP-SOUTHEAST" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Permitted Data Scope</label>
            <input type="text" onChange={e => setForm({...form, usage: e.target.value})} style={inputStyle} placeholder="e.g. Local client authentication logs" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Encryption Schema type</label>
            <select onChange={e => setForm({...form, encryption: e.target.value})} style={selectStyle}>
              <option value="AES-256 HSM keys">AES-256 HSM keys (Strict Hardware compliance)</option>
              <option value="KMS Default">AWS/GCP KMS Default Keys</option>
              <option value="Zero-Knowledge Secret Layer">Zero-Knowledge Custom Secrets Layer</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setResidencyModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Apply Region Lock</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   8. CONSENT LOGS
   ============================================================================ */
export const ComplianceConsentLogs: React.FC = () => {
  const [filterModal, setFilterModal] = useState(false);
  const [logs, setLogs] = useState([
    { id: 'TX-99081', ip: '192.168.1.45', category: 'GDPR Opt-In', status: 'Accepted', date: '07/08/2026 11:24:02' },
    { id: 'TX-99042', ip: '108.24.90.111', category: 'CCPA DNS Opt-Out', status: 'Withdrawn', date: '07/08/2026 09:12:11' },
    { id: 'TX-98991', ip: '82.204.14.89', category: 'Cookie consent banner choice', status: 'Accepted', date: '07/07/2026 18:45:30' }
  ]);

  usePrivacyEvents(
    'logs',
    () => {
      triggerToast('Consent logs exported to CSV spreadsheet file.');
    },
    () => setFilterModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Compliance User Consent Immutable Log Ledger</h4>
          <button style={btnSecStyle} onClick={() => setFilterModal(true)}>Filter Log Audit</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Transaction ID</th>
                <th style={tableHeaderStyle}>Anonymized User IP</th>
                <th style={tableHeaderStyle}>Consent Category Group</th>
                <th style={tableHeaderStyle}>Status Choice</th>
                <th style={tableHeaderStyle}>Timestamp (UTC)</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i}>
                  <td style={tableCellStyle}><code>{log.id}</code></td>
                  <td style={tableCellStyle}>{log.ip}</td>
                  <td style={tableCellStyle}>{log.category}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: log.status === 'Accepted' ? '#10b981' : '#f59e0b' }}>{log.status}</span>
                  </td>
                  <td style={tableCellStyle}>{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={filterModal} onClose={() => setFilterModal(false)} title="Audit Consent Log Ledger Filters">
        <form onSubmit={(e) => { e.preventDefault(); setFilterModal(false); triggerToast('Logs filter rules applied.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Choice Status</label>
            <select style={selectStyle}>
              <option value="All">All Consent choices</option>
              <option value="Accepted">Accepted / Opted-In</option>
              <option value="Withdrawn">Withdrawn / Opted-Out</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Category Scope</label>
            <select style={selectStyle}>
              <option value="All">All Regulations</option>
              <option value="GDPR">GDPR Scope</option>
              <option value="CCPA">CCPA Scope</option>
              <option value="LGPD">LGPD Scope</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setFilterModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Apply Filters</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   9. RIGHT TO ERASURE
   ============================================================================ */
export const ComplianceRightToErasure: React.FC = () => {
  const [erasureModal, setErasureModal] = useState(false);
  const [queueModal, setQueueModal] = useState(false);
  const [requests, setRequests] = useState([
    { ticket: 'DEL-2098', email: 'dsmith@outlook.com', scope: 'Complete profile delete', status: 'Completed', date: '07/02/2026' },
    { ticket: 'DEL-2104', email: 'vbrown@gmail.com', scope: 'Delete support history logs only', status: 'In Progress', date: '07/08/2026' }
  ]);
  const [form, setForm] = useState({ email: '', scope: 'Complete Profile Purge' });

  usePrivacyEvents(
    'erasure',
    () => setErasureModal(true),
    () => setQueueModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Article 17 GDPR Erasure Request Pipeline</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={btnSecStyle} onClick={() => setQueueModal(true)}>Review Pending Queue</button>
            <button style={btnStyle} onClick={() => setErasureModal(true)}>Submit Request</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Ticket ID</th>
                <th style={tableHeaderStyle}>Target Account Email</th>
                <th style={tableHeaderStyle}>Purge Scope Category</th>
                <th style={tableHeaderStyle}>Pipeline Status</th>
                <th style={tableHeaderStyle}>Logged Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r, i) => (
                <tr key={i}>
                  <td style={tableCellStyle}><code>{r.ticket}</code></td>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 500, padding: '14px 16px' }}>{r.email}</td>
                  <td style={tableCellStyle}>{r.scope}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: r.status === 'Completed' ? '#10b981' : '#f59e0b' }}>{r.status}</span>
                  </td>
                  <td style={tableCellStyle}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit request modal */}
      <Modal isOpen={erasureModal} onClose={() => setErasureModal(false)} title="Submit Article 17 Erasure Request">
        <form onSubmit={(e) => { e.preventDefault(); setRequests([...requests, { ticket: 'DEL-2105', email: form.email, scope: form.scope, status: 'In Progress', date: 'Today' }]); setErasureModal(false); triggerToast('Erasure request logged. Starting 30-day purge cycle.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Target Account Email</label>
            <input type="email" onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} placeholder="user@domain.com" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Data Purge Scope</label>
            <select onChange={e => setForm({...form, scope: e.target.value})} style={selectStyle}>
              <option value="Complete Profile Purge">Complete account profile, cookies and transactions delete</option>
              <option value="Marketing Logs Only">Delete marketing and analytics records only</option>
              <option value="Support conversations only">Delete support portal conversation logs only</option>
            </select>
          </div>
          <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', padding: '12px', borderRadius: '6px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <AlertCircle style={{ color: '#ef4444', flexShrink: 0 }} size={16} />
            <p style={{ margin: 0, fontSize: '11px', color: '#fca5a5' }}>Warning: Submission immediately deletes indexing keys. Action is completely irreversible.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setErasureModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={{ ...btnStyle, backgroundColor: '#ef4444' }}>Purge User Data</button>
          </div>
        </form>
      </Modal>

      {/* Queue Modal */}
      <Modal isOpen={queueModal} onClose={() => setQueueModal(false)} title="Right to Erasure Review Queue">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
          <p style={{ color: '#aaaaaa' }}>The following accounts are in their 30-day compliance hold phase before permanent hard disk delete.</p>
          {requests.filter(r => r.status === 'In Progress').map((req, idx) => (
            <div key={idx} style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#ffffff' }}>{req.email}</strong>
                <div style={{ fontSize: '11px', color: '#666666' }}>Scope: {req.scope}</div>
              </div>
              <button style={{ ...btnStyle, backgroundColor: '#ef4444', padding: '6px 12px', fontSize: '11.5px' }} onClick={() => { setRequests(requests.map(r => r.ticket === req.ticket ? { ...r, status: 'Completed' } : r)); triggerToast('Manual deletion executed immediately.'); }}>Purge Now</button>
            </div>
          ))}
          <button style={btnSecStyle} onClick={() => setQueueModal(false)}>Close View</button>
        </div>
      </Modal>
    </div>
  );
};


/* ============================================================================
   10. PRIVACY CENTER
   ============================================================================ */
export const CompliancePrivacyCenter: React.FC = () => {
  const [centerModal, setCenterModal] = useState(false);
  const [legalModal, setLegalModal] = useState(false);
  const [centerUrl, setCenterUrl] = useState('https://privacy.kiaan.com/brand/kiaan-marketing');
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState('https://kiaan.com/legal/privacy-policy');
  const [cookiePolicyUrl, setCookiePolicyUrl] = useState('https://kiaan.com/legal/cookie-policy');

  usePrivacyEvents(
    'center',
    () => setCenterModal(true),
    () => setLegalModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Customer Portal Link */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe style={{ color: '#6366f1' }} size={20} />
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Privacy Self-Service Customer Portal</h4>
          </div>
          <div style={{ fontSize: '13px', color: '#aaaaaa' }}>
            Allow customers to access cookie controls, audit requests history, or file right-to-erasure tickets on a white-labeled host.
            <div style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 14px', borderRadius: '6px', color: '#818cf8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <code style={{ fontSize: '11.5px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{centerUrl}</code>
              <ExternalLink size={14} style={{ cursor: 'pointer' }} onClick={() => triggerToast('Portal Link copied to clipboard.')} />
            </div>
            <button style={{ ...btnSecStyle, width: '100%', marginTop: '16px' }} onClick={() => setCenterModal(true)}>Modify Host URL</button>
          </div>
        </div>

        {/* Legal Link URLs */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText style={{ color: '#10b981' }} size={20} />
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Corporate Legal Documentation Mapping</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#aaaaaa' }}>
            <div>
              <span style={{ display: 'block', color: '#666666' }}>Privacy Policy URL:</span>
              <code style={{ color: '#ffffff' }}>{privacyPolicyUrl}</code>
            </div>
            <div>
              <span style={{ display: 'block', color: '#666666' }}>Cookie Statement Policy URL:</span>
              <code style={{ color: '#ffffff' }}>{cookiePolicyUrl}</code>
            </div>
            <button style={btnSecStyle} onClick={() => setLegalModal(true)}>Configure Policy URLs</button>
          </div>
        </div>

      </div>

      {/* Host URL Modal */}
      <Modal isOpen={centerModal} onClose={() => setCenterModal(false)} title="Change Customer Privacy Center Host URL">
        <form onSubmit={(e) => { e.preventDefault(); setCenterModal(false); triggerToast('Privacy Center URL configuration updated.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Custom Domain URL</label>
            <input type="url" value={centerUrl} onChange={e => setCenterUrl(e.target.value)} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setCenterModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Domain Host</button>
          </div>
        </form>
      </Modal>

      {/* Configure Legal links modal */}
      <Modal isOpen={legalModal} onClose={() => setLegalModal(false)} title="Configure Legal Documentation URLs">
        <form onSubmit={(e) => { e.preventDefault(); setLegalModal(false); triggerToast('Corporate Legal URLs synchronized.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Privacy Policy URL Link</label>
            <input type="url" value={privacyPolicyUrl} onChange={e => setPrivacyPolicyUrl(e.target.value)} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Cookie Consent Statement Policy Link</label>
            <input type="url" value={cookiePolicyUrl} onChange={e => setCookiePolicyUrl(e.target.value)} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setLegalModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Link Mappings</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
