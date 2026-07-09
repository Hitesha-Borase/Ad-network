import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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

/* Event routing listener hook */
const useCrmEvents = (
  pageId: string,
  onPrimary: () => void,
  onSecondary: () => void
) => {
  useEffect(() => {
    const handlePri = () => onPrimary();
    const handleSec = () => onSecondary();

    window.addEventListener(`crm-pri-crm-${pageId}`, handlePri);
    window.addEventListener(`crm-sec-crm-${pageId}`, handleSec);

    return () => {
      window.removeEventListener(`crm-pri-crm-${pageId}`, handlePri);
      window.removeEventListener(`crm-sec-crm-${pageId}`, handleSec);
    };
  }, [onPrimary, onSecondary, pageId]);
};

const triggerToast = (msg: string) => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
};


/* ============================================================================
   1. LEAD MANAGEMENT
   ============================================================================ */
export const CrmLeadManagement: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [leads, setLeads] = useState([
    { name: 'John Doe', email: 'john@acme.com', source: 'Google Ads', score: 85, status: 'Contacted' },
    { name: 'Sarah Connor', email: 'sarah@skynet.com', source: 'Organic SEO', score: 92, status: 'Qualified' }
  ]);
  const [form, setForm] = useState({ name: '', email: '', source: 'Direct Inbound', score: 70 });

  useCrmEvents('leads', () => setModal(true), () => triggerToast('Leads registry report exported.'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Leads Registry</h4>
          <button style={btnStyle} onClick={() => setModal(true)}>Add Inbound Lead</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Lead Name</th>
                <th style={tableHeaderStyle}>Email Address</th>
                <th style={tableHeaderStyle}>Marketing Source</th>
                <th style={tableHeaderStyle}>Quality Score</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{l.name}</td>
                  <td style={tableCellStyle}><code>{l.email}</code></td>
                  <td style={tableCellStyle}>{l.source}</td>
                  <td style={tableCellStyle}>
                    <span style={{ color: l.score >= 80 ? '#10b981' : '#f59e0b', fontWeight: 700 }}>{l.score}/100</span>
                  </td>
                  <td style={tableCellStyle}>{l.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Add Inbound Lead Profile">
        <form onSubmit={(e) => { e.preventDefault(); setLeads([...leads, { ...form, score: Number(form.score), status: 'New' }]); setModal(false); triggerToast('Lead profile added.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Email</label>
            <input type="email" onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Estimated Score (0-100)</label>
            <input type="number" onChange={e => setForm({...form, score: Number(e.target.value)})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Lead</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   2. PIPELINE
   ============================================================================ */
export const CrmPipelineBoard: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [deals, setDeals] = useState([
    { name: 'Acme Enterprise License', value: '$12,500', stage: 'Prospect' },
    { name: 'Stark Industries SLA', value: '$45,000', stage: 'Proposal Sent' }
  ]);
  const [form, setForm] = useState({ name: '', value: '', stage: 'Prospect' });

  useCrmEvents('deals', () => setModal(true), () => triggerToast('Pipeline analytics loaded.'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {['Prospect', 'Proposal Sent', 'Contract Finalized'].map((stage) => (
          <div key={stage} style={{ ...cardStyle, background: 'rgba(15, 23, 42, 0.4)' }}>
            <h5 style={{ margin: 0, fontSize: '13px', color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>{stage}</h5>
            {deals.filter(d => d.stage === stage).map((d, idx) => (
              <div key={idx} style={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.05)', padding: '12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: 600, display: 'block' }}>{d.name}</span>
                <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 700, display: 'block', marginTop: '4px' }}>{d.value}</span>
              </div>
            ))}
            <button style={{ ...btnSecStyle, width: '100%', fontSize: '12px', padding: '6px' }} onClick={() => { setForm({ ...form, stage }); setModal(true); }}>+ Add Deal</button>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Register Deal Pipeline Opportunity">
        <form onSubmit={(e) => { e.preventDefault(); setDeals([...deals, form]); setModal(false); triggerToast('Deal added to pipeline.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Deal Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Contract Value ($)</label>
            <input type="text" onChange={e => setForm({...form, value: `$${e.target.value}`})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Deal</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   3. OPPORTUNITY TRACKING
   ============================================================================ */
export const CrmOpportunityTracking: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [opps, setOpps] = useState([
    { client: 'Globex Corp', tier: 'Enterprise Tier', CloseDate: '2026-09-01', probability: '75%' }
  ]);
  const [form, setForm] = useState({ client: '', tier: 'Enterprise Tier', CloseDate: '', probability: '50%' });

  useCrmEvents('opp', () => setModal(true), () => triggerToast('Opportunity metrics charts generated.'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>High-Value Opportunities</h4>
          <button style={btnStyle} onClick={() => setModal(true)}>Register Opportunity</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Client / Org</th>
                <th style={tableHeaderStyle}>Contract Tier</th>
                <th style={tableHeaderStyle}>Expected Close Date</th>
                <th style={tableHeaderStyle}>Win Probability</th>
              </tr>
            </thead>
            <tbody>
              {opps.map((o, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{o.client}</td>
                  <td style={tableCellStyle}>{o.tier}</td>
                  <td style={tableCellStyle}><code>{o.CloseDate}</code></td>
                  <td style={{ ...tableCellStyle, color: '#10b981', fontWeight: 700 }}>{o.probability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Register High-Value Opportunity">
        <form onSubmit={(e) => { e.preventDefault(); setOpps([...opps, form]); setModal(false); triggerToast('High-value opportunity registered.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Client Organization</label>
            <input type="text" onChange={e => setForm({...form, client: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Expected Close Date</label>
            <input type="date" onChange={e => setForm({...form, CloseDate: e.target.value})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Register</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   4. SALES AUTOMATION
   ============================================================================ */
export const CrmSalesAutomation: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [rules, setRules] = useState([
    { event: 'Lead Created', action: 'Send Intro Email sequence', status: 'Active' }
  ]);
  const [form, setForm] = useState({ event: 'Lead Created', action: '' });

  useCrmEvents('automation', () => setModal(true), () => triggerToast('Automation execution logs loaded.'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Trigger-based Automation Rules</h4>
          <button style={btnStyle} onClick={() => setModal(true)}>Create Automation Rule</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Trigger Event</th>
                <th style={tableHeaderStyle}>System Action</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((r, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle}>{r.event}</td>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{r.action}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Create Automation Workflow Rule">
        <form onSubmit={(e) => { e.preventDefault(); setRules([...rules, { event: form.event, action: form.action, status: 'Active' }]); setModal(false); triggerToast('Sales automation rule created.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Trigger Trigger Event</label>
            <select value={form.event} onChange={e => setForm({...form, event: e.target.value})} style={selectStyle}>
              <option value="Lead Created">Lead Ingestion/Creation</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Contract Expired">Contract Expiring (30 days)</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Action Response</label>
            <input type="text" onChange={e => setForm({...form, action: e.target.value})} style={inputStyle} placeholder="e.g. Schedule task 'Follow Up Call'" required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Rule</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   5. PROPOSAL GENERATOR
   ============================================================================ */
export const CrmProposalGenerator: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [proposals, setProposals] = useState([
    { title: 'Cloud Migration SLA', recipient: 'Lex Corp', estimatedPrice: '$18,000', status: 'Sent' }
  ]);
  const [form, setForm] = useState({ title: '', recipient: '', estimatedPrice: '' });

  useCrmEvents('proposals', () => setModal(true), () => triggerToast('Proposal template options loaded.'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Active Business Proposals</h4>
          <button style={btnStyle} onClick={() => setModal(true)}>Generate Business Proposal</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Proposal Title</th>
                <th style={tableHeaderStyle}>Recipient Client</th>
                <th style={tableHeaderStyle}>Value Pitch</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((p, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{p.title}</td>
                  <td style={tableCellStyle}>{p.recipient}</td>
                  <td style={tableCellStyle}><code>{p.estimatedPrice}</code></td>
                  <td style={tableCellStyle}>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Generate Dynamic Business Proposal">
        <form onSubmit={(e) => { e.preventDefault(); setProposals([...proposals, { ...form, status: 'Draft' }]); setModal(false); triggerToast('Proposal PDF document generated.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Title</label>
            <input type="text" onChange={e => setForm({...form, title: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Recipient Client</label>
            <input type="text" onChange={e => setForm({...form, recipient: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Value Pitch ($)</label>
            <input type="text" onChange={e => setForm({...form, estimatedPrice: `$${e.target.value}`})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Generate PDF</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   6. CONTRACT MANAGEMENT
   ============================================================================ */
export const CrmContractManagement: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [contracts, setContracts] = useState([
    { name: 'Wayne Enterprises SLA', tier: 'Gold Tier Support', status: 'Signed' }
  ]);
  const [form, setForm] = useState({ name: '', tier: 'Gold Tier Support' });

  useCrmEvents('contracts', () => setModal(true), () => triggerToast('Legal contract templates catalog loaded.'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Active SLA Contracts</h4>
          <button style={btnStyle} onClick={() => setModal(true)}>Request Contract Review</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Contract Name</th>
                <th style={tableHeaderStyle}>SLA Tier</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{c.name}</td>
                  <td style={tableCellStyle}>{c.tier}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Request Legal Contract Review">
        <form onSubmit={(e) => { e.preventDefault(); setContracts([...contracts, { ...form, status: 'In Review' }]); setModal(false); triggerToast('Legal contract review request dispatched.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Contract / SLA Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>SLA Tier Level</label>
            <select value={form.tier} onChange={e => setForm({...form, tier: e.target.value})} style={selectStyle}>
              <option value="Gold Tier Support">Gold Tier Support</option>
              <option value="Premium 24/7 SLA">Premium 24/7 SLA</option>
              <option value="Self-Host Core License">Self-Host Core License</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Request Review</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   7. QUOTE BUILDER
   ============================================================================ */
export const CrmQuoteBuilder: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [quotes, setQuotes] = useState([
    { code: 'Q-98124', client: 'Cyberdyne Systems', itemsPrice: '$9,800', tax: '$784', total: '$10,584' }
  ]);
  const [form, setForm] = useState({ client: '', itemsPrice: '' });

  useCrmEvents('quotes', () => setModal(true), () => triggerToast('Default billing quote settings saved.'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Generated Price Quotes</h4>
          <button style={btnStyle} onClick={() => setModal(true)}>Generate Pricing Quote</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Quote ID</th>
                <th style={tableHeaderStyle}>Target Client</th>
                <th style={tableHeaderStyle}>Subtotal Price</th>
                <th style={tableHeaderStyle}>Calculated Tax (8%)</th>
                <th style={tableHeaderStyle}>Calculated Total</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle}><code>{q.code}</code></td>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{q.client}</td>
                  <td style={tableCellStyle}>{q.itemsPrice}</td>
                  <td style={tableCellStyle}><code>{q.tax}</code></td>
                  <td style={{ ...tableCellStyle, color: '#10b981', fontWeight: 700 }}>{q.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Generate Custom Pricing Quote">
        <form onSubmit={(e) => { e.preventDefault(); const p = Number(form.itemsPrice); setQuotes([...quotes, { code: 'Q-98125', client: form.client, itemsPrice: `$${p}`, tax: `$${(p * 0.08).toFixed(0)}`, total: `$${(p * 1.08).toFixed(0)}` }]); setModal(false); triggerToast('Custom quote sheet calculated.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Target Client Company</label>
            <input type="text" onChange={e => setForm({...form, client: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Subtotal Price ($)</label>
            <input type="number" onChange={e => setForm({...form, itemsPrice: e.target.value})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Calculate Quote</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   8. AI SALES ASSISTANT
   ============================================================================ */
export const CrmAiSalesAssistant: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [copilotRule, setCopilotRule] = useState('Standard response templates guidelines synced.');

  useCrmEvents('sales-assistant', () => setModal(true), () => triggerToast('Assistant response prompt parameters updated.'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>AI Smart Co-Pilot Sales Assistant</h4>
        <p style={{ fontSize: '13px', color: '#aaaaaa', margin: 0 }}>
          Train auto-response logic models and draft cold outreach templates.
        </p>
        <div style={{ backgroundColor: '#121212', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: '11px', color: '#666666', display: 'block', textTransform: 'uppercase' }}>Active Assistant Prompt Policy</span>
          <p style={{ fontSize: '13px', color: '#ffffff', margin: '6px 0 0 0', fontWeight: 600 }}>{copilotRule}</p>
        </div>
        <div>
          <button style={btnStyle} onClick={() => setModal(true)}>Train Assistant Model</button>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Train Sales Assistant Prompts">
        <form onSubmit={(e) => { e.preventDefault(); setModal(false); triggerToast('Assistant model weights trained with new prompt policy.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Outreach Instructions & Prompt Guidelines</label>
            <textarea onChange={e => setCopilotRule(e.target.value)} defaultValue={copilotRule} style={{ ...inputStyle, height: '100px', resize: 'none' }} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Deploy Model</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   9. FORECASTING
   ============================================================================ */
export const CrmForecastingDashboard: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [projections] = useState([
    { quarter: 'Q3 2026', projectedRevenue: '$245,000', confidenceInterval: '92% Likelihood', status: 'Calculated' }
  ]);

  useCrmEvents(
    'forecasting',
    () => {
      setRunning(true);
      setTimeout(() => {
        setRunning(false);
        triggerToast('Quarterly deals forecasting recalculated.');
      }, 1500);
    },
    () => {
      triggerToast('Deals projections spreadsheet exported.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Quarterly Deals Projections</h4>
          <button style={btnStyle} onClick={() => { setRunning(true); setTimeout(() => { setRunning(false); triggerToast('Recalculated.'); }, 1200); }} disabled={running}>
            {running ? 'Running forecast computations...' : 'Run Forecast Model'}
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Target Quarter</th>
                <th style={tableHeaderStyle}>Projected Sales Revenue</th>
                <th style={tableHeaderStyle}>ML Model Confidence Interval</th>
                <th style={tableHeaderStyle}>Calculation Status</th>
              </tr>
            </thead>
            <tbody>
              {projections.map((p, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{p.quarter}</td>
                  <td style={{ ...tableCellStyle, color: '#10b981', fontWeight: 700 }}>{p.projectedRevenue}</td>
                  <td style={tableCellStyle}><code>{p.confidenceInterval}</code></td>
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
   10. COMMISSION TRACKING
   ============================================================================ */
export const CrmCommissionTracking: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [reps, setReps] = useState([
    { name: 'Alice Cooper', margins: '$85,000', rate: '5%', payout: '$4,250' }
  ]);
  const [form, setForm] = useState({ name: '', margins: '', rate: '5%' });

  useCrmEvents('commission', () => setModal(true), () => triggerToast('Commissions ledger history exported.'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Sales Representative Commission Rates</h4>
          <button style={btnStyle} onClick={() => setModal(true)}>Configure Commission Rates</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Representative</th>
                <th style={tableHeaderStyle}>Allocated Margins Closed</th>
                <th style={tableHeaderStyle}>Payout Rate</th>
                <th style={tableHeaderStyle}>Calculated Payout</th>
              </tr>
            </thead>
            <tbody>
              {reps.map((r, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{r.name}</td>
                  <td style={tableCellStyle}>{r.margins}</td>
                  <td style={tableCellStyle}><code>{r.rate}</code></td>
                  <td style={{ ...tableCellStyle, color: '#10b981', fontWeight: 700 }}>{r.payout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Configure Sales Rep Payout Tier">
        <form onSubmit={(e) => { e.preventDefault(); const m = Number(form.margins); const r = Number(form.rate.replace('%', '')) / 100; setReps([...reps, { name: form.name, margins: `$${m}`, rate: form.rate, payout: `$${m * r}` }]); setModal(false); triggerToast('Rep commission tier adjusted.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Representative Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Margins Closed ($)</label>
            <input type="number" onChange={e => setForm({...form, margins: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Payout Rate %</label>
            <select value={form.rate} onChange={e => setForm({...form, rate: e.target.value})} style={selectStyle}>
              <option value="5%">5% Commission</option>
              <option value="8%">8% Commission</option>
              <option value="12%">12% Commission</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Tier</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
