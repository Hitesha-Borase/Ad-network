import React, { useState, useEffect } from 'react';
import { 
  Building2, Briefcase, Settings2, Users, Clock, 
  CreditCard, CheckSquare, Megaphone, Calendar, Plus, 
  Trash2, Play, RefreshCw, X, Download, ShieldCheck
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

/* Custom events listener hook for Agency dispatches */
const useAgencyEvents = (
  pageId: string, 
  onPrimary: () => void, 
  onSecondary: () => void
) => {
  useEffect(() => {
    const handlePri = () => onPrimary();
    const handleSec = () => onSecondary();

    window.addEventListener(`agency-pri-agency-${pageId}`, handlePri);
    window.addEventListener(`agency-sec-agency-${pageId}`, handleSec);

    return () => {
      window.removeEventListener(`agency-pri-agency-${pageId}`, handlePri);
      window.removeEventListener(`agency-sec-agency-${pageId}`, handleSec);
    };
  }, [onPrimary, onSecondary, pageId]);
};

const triggerToast = (msg: string) => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
};


/* ============================================================================
   1. AGENCY DASHBOARD
   ============================================================================ */
export const AgencyDashboard: React.FC = () => {
  const [accountModal, setAccountModal] = useState(false);
  const [whiteLabelModal, setWhiteLabelModal] = useState(false);
  const [stats, setStats] = useState([
    { label: 'Total Managed MRR', value: '$84,500/mo', sub: '+12% this month' },
    { label: 'Active Workspaces', value: '14 Clients', sub: '2 pending sync' },
    { label: 'Hours Logged (July)', value: '382 hrs', sub: '92% billable' },
    { label: 'Pending Approvals', value: '5 Creatives', sub: 'SLA deadline: 2 hrs' }
  ]);

  useAgencyEvents(
    'dashboard',
    () => setAccountModal(true),
    () => setWhiteLabelModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {stats.map((st, i) => (
          <div key={i} style={cardStyle}>
            <span style={{ fontSize: '11px', color: '#888888', fontWeight: 600, textTransform: 'uppercase' }}>{st.label}</span>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>{st.value}</div>
            <div style={{ fontSize: '11px', color: '#555555', marginTop: '4px' }}>{st.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={cardStyle}>
          <h4 style={{ fontSize: '14.5px', color: '#ffffff', margin: 0 }}>Active Retainers Allocation</h4>
          <p style={{ fontSize: '13px', color: '#aaaaaa' }}>Distribution of contract revenue streams across agency business units.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { unit: 'Search Engine Marketing', value: '35% ($29,575)', color: '#6366f1' },
              { unit: 'Creative Development', value: '25% ($21,125)', color: '#a855f7' },
              { unit: 'Email Automations', value: '40% ($33,800)', color: '#10b981' }
            ].map((pct, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: '#aaaaaa' }}>● {pct.unit}</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{pct.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h4 style={{ fontSize: '14.5px', color: '#ffffff', margin: 0 }}>Portal Security White Label Status</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#aaaaaa' }}>
            <div>SSL Certificate: <strong style={{ color: '#10b981' }}>Active</strong></div>
            <div>Custom Domain: <strong>portal.myagency.com</strong></div>
            <button style={btnSecStyle} onClick={() => setWhiteLabelModal(true)}>Modify White Label Rules</button>
          </div>
        </div>
      </div>

      {/* Account Modal */}
      <Modal isOpen={accountModal} onClose={() => setAccountModal(false)} title="Add Agency Account Entity">
        <form onSubmit={(e) => { e.preventDefault(); setAccountModal(false); triggerToast('Agency account registered.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Legal Agency Name</label>
            <input type="text" style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Contract Billing Currency</label>
            <select style={selectStyle}>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setAccountModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Account</button>
          </div>
        </form>
      </Modal>

      {/* White Label Modal */}
      <Modal isOpen={whiteLabelModal} onClose={() => setWhiteLabelModal(false)} title="Configure White Label Branding Layout">
        <form onSubmit={(e) => { e.preventDefault(); setWhiteLabelModal(false); triggerToast('White Label configurations synced.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Primary Accent Hex Color</label>
            <input type="text" defaultValue="#6366F1" style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Legal Terms URL mapping</label>
            <input type="url" defaultValue="https://myagency.com/terms" style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setWhiteLabelModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Apply Rules</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   2. CLIENT WORKSPACES
   ============================================================================ */
export const AgencyClientWorkspaces: React.FC = () => {
  const [provisionModal, setProvisionModal] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const [workspaces, setWorkspaces] = useState([
    { name: 'Acme Corporates', database: 'acme_tenant_db', location: 'EU (Frankfurt)', status: 'Active' },
    { name: 'Velocity Incs', database: 'velocity_tenant_db', location: 'US (Virginia)', status: 'Syncing' }
  ]);
  const [form, setForm] = useState({ name: '', region: 'US (Virginia)' });

  useAgencyEvents(
    'workspaces',
    () => setProvisionModal(true),
    () => setTemplateModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Provisioned Client Tenant Sandboxes</h4>
          <button style={btnStyle} onClick={() => setProvisionModal(true)}>Provision Client Workspace</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Client Organization</th>
                <th style={tableHeaderStyle}>Isolated Database Name</th>
                <th style={tableHeaderStyle}>Server Regional Zone</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {workspaces.map((w, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{w.name}</td>
                  <td style={tableCellStyle}><code>{w.database}</code></td>
                  <td style={tableCellStyle}>{w.location}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: w.status === 'Active' ? '#10b981' : '#f59e0b' }}>{w.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision Workspace modal */}
      <Modal isOpen={provisionModal} onClose={() => setProvisionModal(false)} title="Provision Client Isolated Sandbox">
        <form onSubmit={(e) => { e.preventDefault(); setWorkspaces([...workspaces, { name: form.name, database: `${form.name.toLowerCase().replace(/\s/g, '_')}_tenant_db`, location: form.region, status: 'Active' }]); setProvisionModal(false); triggerToast('Client isolated sandbox database provisioned.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Client Organization Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} placeholder="e.g. Apex Globals" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Regional Database Hosting Lock</label>
            <select value={form.region} onChange={e => setForm({...form, region: e.target.value})} style={selectStyle}>
              <option value="US (Virginia)">US East (N. Virginia)</option>
              <option value="EU (Frankfurt)">EU Central (Frankfurt)</option>
              <option value="AP (Singapore)">Asia Pacific (Singapore)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setProvisionModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Initialize Sandbox</button>
          </div>
        </form>
      </Modal>

      {/* Template Configurator Modal */}
      <Modal isOpen={templateModal} onClose={() => setTemplateModal(false)} title="Client Database Catalog Templates">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
          <p style={{ color: '#aaaaaa' }}>Choose a starting template to populate default schemas when workspace initialization triggers.</p>
          {['E-Commerce CRM template package', 'B2B SaaS Lead Generation baseline', 'Standard Mobile Analytics layout'].map((t, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#121212', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ color: '#ffffff' }}>{t}</span>
              <button style={{ ...btnStyle, padding: '4px 10px', fontSize: '11.5px' }} onClick={() => { triggerToast(`${t} set as default template.`); setTemplateModal(false); }}>Select</button>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};


/* ============================================================================
   3. WHITE LABEL PORTALS
   ============================================================================ */
export const AgencyWhiteLabelPortals: React.FC = () => {
  const [domainModal, setDomainModal] = useState(false);
  const [customDomain, setCustomDomain] = useState('portal.kiaanagency.com');
  const [sslStatus, setSslStatus] = useState('Active Secure');

  useAgencyEvents(
    'portals',
    () => setDomainModal(true),
    () => {
      triggerToast('Generating White Label Client portal interface preview... Complete.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Briefcase style={{ color: '#6366f1' }} size={20} />
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>White Label Client Portal Domain Mapping</h4>
        </div>
        <div style={{ fontSize: '13px', color: '#aaaaaa' }}>
          Map the platform client access portal URL to your agency's domain name seamlessly.
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
            <div style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.08)', padding: '14px', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>CUSTOM CANONICAL URL</span>
              <code style={{ fontSize: '13px', color: '#818cf8', display: 'block', marginTop: '4px' }}>{customDomain}</code>
            </div>
            <div style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.08)', padding: '14px', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>SSL CERTIFICATE STATUS</span>
              <span style={{ fontSize: '13px', color: '#10b981', display: 'block', marginTop: '4px', fontWeight: 600 }}>{sslStatus}</span>
            </div>
          </div>
          <button style={{ ...btnStyle, marginTop: '20px' }} onClick={() => setDomainModal(true)}>Map Portal Custom Domain</button>
        </div>
      </div>

      <Modal isOpen={domainModal} onClose={() => setDomainModal(false)} title="Map Custom Domain Domain">
        <form onSubmit={(e) => { e.preventDefault(); setDomainModal(false); setSslStatus('Generating SSL...'); setTimeout(() => setSslStatus('Active Secure'), 2000); triggerToast('Domain mapping saved. SSL certificate provisioning triggered.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Mapped CNAME URL</label>
            <input type="text" value={customDomain} onChange={e => setCustomDomain(e.target.value)} style={inputStyle} placeholder="clients.myagency.com" required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setDomainModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Mapping</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   4. TEAM MANAGEMENT
   ============================================================================ */
export const AgencyTeamManagement: React.FC = () => {
  const [inviteModal, setInviteModal] = useState(false);
  const [team, setTeam] = useState([
    { name: 'Kiaan Patel', role: 'Lead Director', email: 'kiaan@agency.com', rate: '$150/hr', status: 'Active' },
    { name: 'Riya Sen', role: 'Ad Copywriter', email: 'riya@agency.com', rate: '$90/hr', status: 'Active' }
  ]);
  const [form, setForm] = useState({ name: '', role: 'Ad Copywriter', email: '', rate: '$80/hr' });

  useAgencyEvents(
    'team',
    () => setInviteModal(true),
    () => {
      triggerToast('Agency team member utilization logs generated.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Agency Team Directory & Resource Allocation</h4>
          <button style={btnStyle} onClick={() => setInviteModal(true)}>Invite Team Engineer</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Team Member</th>
                <th style={tableHeaderStyle}>Corporate Email</th>
                <th style={tableHeaderStyle}>Access Role</th>
                <th style={tableHeaderStyle}>Billable Hourly Rate</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {team.map((t, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{t.name}</td>
                  <td style={tableCellStyle}>{t.email}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', backgroundColor: 'rgba(99,102,241,0.15)', color: '#818cf8', padding: '3px 8px', borderRadius: '4px' }}>{t.role}</span>
                  </td>
                  <td style={tableCellStyle}><code>{t.rate}</code></td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={inviteModal} onClose={() => setInviteModal(false)} title="Invite Agency Team Engineer">
        <form onSubmit={(e) => { e.preventDefault(); setTeam([...team, { name: form.name, email: form.email, role: form.role, rate: form.rate, status: 'Active' }]); setInviteModal(false); triggerToast('Team invitation dispatch code sent.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Member Full Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Corporate Email</label>
            <input type="email" onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Role mapping</label>
            <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} style={selectStyle}>
              <option value="Lead Director">Lead Director</option>
              <option value="Ad Copywriter">Ad Copywriter</option>
              <option value="Media Buyer">Media Buyer</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Billable Hourly Rate ($)</label>
            <input type="text" value={form.rate} onChange={e => setForm({...form, rate: e.target.value})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setInviteModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Send Invite</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   5. TIME TRACKING
   ============================================================================ */
export const AgencyTimeTracking: React.FC = () => {
  const [timeModal, setTimeModal] = useState(false);
  const [timeEntries, setTimeEntries] = useState([
    { engineer: 'Kiaan Patel', project: 'Acme Ad Campaign', duration: '4.5 hrs', description: 'Setup custom analytics metrics', date: '07/08/2026' },
    { engineer: 'Riya Sen', project: 'Velocity Rebranding', duration: '2.0 hrs', description: 'Drafting Google Ad copy layouts', date: '07/07/2026' }
  ]);
  const [form, setForm] = useState({ project: 'Acme Ad Campaign', duration: '1.0', desc: '' });

  useAgencyEvents(
    'time',
    () => setTimeModal(true),
    () => {
      triggerToast('Exporting monthly timesheets log CSV.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Timesheet Billable Hours Ledger</h4>
          <button style={btnStyle} onClick={() => setTimeModal(true)}>Log Manual Time Entry</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Team Member</th>
                <th style={tableHeaderStyle}>Target Project</th>
                <th style={tableHeaderStyle}>Duration logged</th>
                <th style={tableHeaderStyle}>Task Description</th>
                <th style={tableHeaderStyle}>Date logged</th>
              </tr>
            </thead>
            <tbody>
              {timeEntries.map((e, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{e.engineer}</td>
                  <td style={tableCellStyle}>{e.project}</td>
                  <td style={tableCellStyle}><code>{e.duration}</code></td>
                  <td style={tableCellStyle}>{e.description}</td>
                  <td style={tableCellStyle}>{e.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={timeModal} onClose={() => setTimeModal(false)} title="Log Manual Timesheet Entry">
        <form onSubmit={(e) => { e.preventDefault(); setTimeEntries([...timeEntries, { engineer: 'Self Manager', project: form.project, duration: `${form.duration} hrs`, description: form.desc, date: 'Today' }]); setTimeModal(false); triggerToast('Manual timesheet hours logged.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Target Client Project</label>
            <select value={form.project} onChange={e => setForm({...form, project: e.target.value})} style={selectStyle}>
              <option value="Acme Ad Campaign">Acme Ad Campaign</option>
              <option value="Velocity Rebranding">Velocity Rebranding</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Duration Hours</label>
            <input type="number" step="0.5" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Task Description Details</label>
            <input type="text" onChange={e => setForm({...form, desc: e.target.value})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setTimeModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Log Hours</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   6. CLIENT BILLING
   ============================================================================ */
export const AgencyClientBilling: React.FC = () => {
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [retainerModal, setRetainerModal] = useState(false);
  const [invoices, setInvoices] = useState([
    { id: 'INV-A809', client: 'Acme Corporates', amount: '$5,000.00', terms: 'Monthly Retainer', status: 'Sent' },
    { id: 'INV-A741', client: 'Velocity Incs', amount: '$3,800.00', terms: 'Ad production hours', status: 'Paid' }
  ]);
  const [form, setForm] = useState({ client: 'Acme Corporates', amount: '', terms: 'Monthly Retainer' });

  useAgencyEvents(
    'billing',
    () => setInvoiceModal(true),
    () => setRetainerModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Client Invoices & Subscription Retainers</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={btnSecStyle} onClick={() => setRetainerModal(true)}>Retainer setup</button>
            <button style={btnStyle} onClick={() => setInvoiceModal(true)}>Create Client Invoice</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Invoice ID</th>
                <th style={tableHeaderStyle}>Client Organization</th>
                <th style={tableHeaderStyle}>Invoice Amount</th>
                <th style={tableHeaderStyle}>Billing Terms</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle}><code>{inv.id}</code></td>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{inv.client}</td>
                  <td style={tableCellStyle}>{inv.amount}</td>
                  <td style={tableCellStyle}>{inv.terms}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: inv.status === 'Paid' ? '#10b981' : '#f59e0b' }}>{inv.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice modal */}
      <Modal isOpen={invoiceModal} onClose={() => setInvoiceModal(false)} title="Create Client Bill Invoice">
        <form onSubmit={(e) => { e.preventDefault(); setInvoices([...invoices, { id: 'INV-A810', client: form.client, amount: `$${form.amount}`, terms: form.terms, status: 'Sent' }]); setInvoiceModal(false); triggerToast('Invoice generated and dispatched to client.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Client Organization</label>
            <select value={form.client} onChange={e => setForm({...form, client: e.target.value})} style={selectStyle}>
              <option value="Acme Corporates">Acme Corporates</option>
              <option value="Velocity Incs">Velocity Incs</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Billing Amount ($)</label>
            <input type="number" onChange={e => setForm({...form, amount: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Billing Description / Terms</label>
            <input type="text" onChange={e => setForm({...form, terms: e.target.value})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setInvoiceModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Create & Send Invoice</button>
          </div>
        </form>
      </Modal>

      {/* Retainer Settings Modal */}
      <Modal isOpen={retainerModal} onClose={() => setRetainerModal(false)} title="Corporate Client Retainers Settings">
        <form onSubmit={(e) => { e.preventDefault(); setRetainerModal(false); triggerToast('Retainer thresholds saved.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Monthly Retainer Minimum Threshold ($)</label>
            <input type="text" defaultValue="3000" style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Payment Grace Period Days</label>
            <input type="number" defaultValue="14" style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setRetainerModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Retainer Configuration</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   7. CLIENT APPROVALS
   ============================================================================ */
export const AgencyClientApprovals: React.FC = () => {
  const [approvalModal, setApprovalModal] = useState(false);
  const [approvals, setApprovals] = useState([
    { name: 'Acme Search Ads Creative Copy', format: 'Text copy layout', status: 'Pending Review', date: '07/08/2026' },
    { name: 'Velocity Launch Banner Image', format: 'PNG banner asset', status: 'Approved', date: '07/06/2026' }
  ]);
  const [form, setForm] = useState({ name: '', format: 'Ad Copy Text' });

  useAgencyEvents(
    'approvals',
    () => setApprovalModal(true),
    () => {
      triggerToast('Client creative approvals history logs generated.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Client Design & Copy Approval Pipeline</h4>
          <button style={btnStyle} onClick={() => setApprovalModal(true)}>Request Client Review</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Creative Design / Copy Asset</th>
                <th style={tableHeaderStyle}>Format Type</th>
                <th style={tableHeaderStyle}>Approval Status</th>
                <th style={tableHeaderStyle}>Registered Date</th>
                <th style={tableHeaderStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((a, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{a.name}</td>
                  <td style={tableCellStyle}>{a.format}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: a.status === 'Approved' ? '#10b981' : '#f59e0b' }}>{a.status}</span>
                  </td>
                  <td style={tableCellStyle}>{a.date}</td>
                  <td style={tableCellStyle}>
                    {a.status === 'Pending Review' && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          style={{ ...btnStyle, padding: '4px 10px', fontSize: '11px' }} 
                          onClick={() => {
                            setApprovals(approvals.map(x => x.name === a.name ? { ...x, status: 'Approved' } : x));
                            triggerToast('Creative asset approved.');
                          }}
                        >
                          Approve
                        </button>
                        <button 
                          style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px', color: '#ef4444' }} 
                          onClick={() => {
                            setApprovals(approvals.map(x => x.name === a.name ? { ...x, status: 'Revision Requested' } : x));
                            triggerToast('Revision requested.');
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={approvalModal} onClose={() => setApprovalModal(false)} title="Submit Asset for Client Review">
        <form onSubmit={(e) => { e.preventDefault(); setApprovals([...approvals, { name: form.name, format: form.format, status: 'Pending Review', date: 'Today' }]); setApprovalModal(false); triggerToast('Approval request sent. Client notified via portal.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Asset Name / Title</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} placeholder="e.g. Q4 Instagram Video Layout" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Asset Format Type</label>
            <select value={form.format} onChange={e => setForm({...form, format: e.target.value})} style={selectStyle}>
              <option value="Ad Copy Text">Ad Copy Script / Text</option>
              <option value="PNG Banner Image">Image Banner (PNG/JPG)</option>
              <option value="MP4 Video Campaign">Video File (MP4)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setApprovalModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Submit Approval Ticket</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   8. CAMPAIGN WORKSPACE
   ============================================================================ */
export const AgencyCampaignWorkspace: React.FC = () => {
  const [campaignModal, setCampaignModal] = useState(false);
  const [budgetModal, setBudgetModal] = useState(false);
  const [campaigns, setCampaigns] = useState([
    { id: 'CAMP-991', name: 'Acme Brand Awareness Q3', channels: 'Meta Ads, Google Search', budget: '$15,000.00', status: 'Running' },
    { id: 'CAMP-992', name: 'Velocity Launch Promotion', channels: 'LinkedIn Business', budget: '$8,000.00', status: 'Draft' }
  ]);
  const [form, setForm] = useState({ name: '', channels: 'Meta Ads', budget: '' });

  useAgencyEvents(
    'campaigns',
    () => setCampaignModal(true),
    () => setBudgetModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Agency Managed Multi-Network Ad Campaigns</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={btnSecStyle} onClick={() => setBudgetModal(true)}>Campaign Budget limits</button>
            <button style={btnStyle} onClick={() => setCampaignModal(true)}>Deploy Multi-Channel Campaign</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Campaign ID</th>
                <th style={tableHeaderStyle}>Campaign Name</th>
                <th style={tableHeaderStyle}>Integrated Channels</th>
                <th style={tableHeaderStyle}>Allocated Budget</th>
                <th style={tableHeaderStyle}>Execution Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle}><code>{c.id}</code></td>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{c.name}</td>
                  <td style={tableCellStyle}>{c.channels}</td>
                  <td style={tableCellStyle}>{c.budget}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: c.status === 'Running' ? '#10b981' : '#888888' }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={campaignModal} onClose={() => setCampaignModal(false)} title="Deploy Agency Campaign Workspace">
        <form onSubmit={(e) => { e.preventDefault(); setCampaigns([...campaigns, { id: 'CAMP-993', name: form.name, channels: form.channels, budget: `$${form.budget}`, status: 'Running' }]); setCampaignModal(false); triggerToast('Campaign setup finalized and running.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Campaign Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Target Channels</label>
            <input type="text" value={form.channels} onChange={e => setForm({...form, channels: e.target.value})} style={inputStyle} placeholder="e.g. Meta Ads, Google Ads" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Total Ingest Budget ($)</label>
            <input type="number" onChange={e => setForm({...form, budget: e.target.value})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setCampaignModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Deploy Campaign</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={budgetModal} onClose={() => setBudgetModal(false)} title="Campaign Global Budget thresholds">
        <form onSubmit={(e) => { e.preventDefault(); setBudgetModal(false); triggerToast('Global Campaign thresholds saved.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Maximum Daily Channel Spend Cap ($)</label>
            <input type="number" defaultValue="2000" style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Alert threshold email address</label>
            <input type="email" defaultValue="finance@agency.com" style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setBudgetModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save caps</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   9. RESOURCE PLANNING
   ============================================================================ */
export const AgencyResourcePlanning: React.FC = () => {
  const [assignModal, setAssignModal] = useState(false);
  const [allocations, setAllocations] = useState([
    { resource: 'Kiaan Patel', allocation: 'Setup metrics dashboard', load: '90%', hours: '36 hrs/wk' },
    { resource: 'Riya Sen', allocation: 'Write ad copy scripts', load: '50%', hours: '20 hrs/wk' }
  ]);
  const [form, setForm] = useState({ resource: 'Kiaan Patel', task: '', load: '80%' });

  useAgencyEvents(
    'resources',
    () => setAssignModal(true),
    () => {
      triggerToast('Generating capacity load logs for resource utilization report.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Resource Allocation & Task Sprints Planner</h4>
          <button style={btnStyle} onClick={() => setAssignModal(true)}>Assign Resource Booking</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Agency Resource</th>
                <th style={tableHeaderStyle}>Sprint Task Assignment</th>
                <th style={tableHeaderStyle}>Capacity Load %</th>
                <th style={tableHeaderStyle}>Sprint Hours Allocated</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((a, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{a.resource}</td>
                  <td style={tableCellStyle}>{a.allocation}</td>
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>{a.load}</span>
                      <div style={{ width: '60px', height: '6px', backgroundColor: '#333333', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: a.load, height: '100%', backgroundColor: parseInt(a.load) > 85 ? '#ef4444' : '#6366f1' }}></div>
                      </div>
                    </div>
                  </td>
                  <td style={tableCellStyle}><code>{a.hours}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={assignModal} onClose={() => setAssignModal(false)} title="Assign Capacity Task Booking">
        <form onSubmit={(e) => { e.preventDefault(); setAllocations([...allocations, { resource: form.resource, allocation: form.task, load: form.load, hours: '32 hrs/wk' }]); setAssignModal(false); triggerToast('Resource capacity allocation recorded.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Agency Resource Name</label>
            <select value={form.resource} onChange={e => setForm({...form, resource: e.target.value})} style={selectStyle}>
              <option value="Kiaan Patel">Kiaan Patel</option>
              <option value="Riya Sen">Riya Sen</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Sprint Task Assignment</label>
            <input type="text" onChange={e => setForm({...form, task: e.target.value})} style={inputStyle} placeholder="e.g. Design ad layouts" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Capacity Load Percentage (%)</label>
            <input type="text" value={form.load} onChange={e => setForm({...form, load: e.target.value})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setAssignModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Log Booking</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
