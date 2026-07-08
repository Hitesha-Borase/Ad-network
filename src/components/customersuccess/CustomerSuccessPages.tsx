import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { 
  TrendingUp, CheckCircle, AlertTriangle, Zap, Users, Clock, Star, 
  BookOpen, MessageCircle, Bot, X, Send, Sliders, Database, Search, 
  ArrowRight, ShieldCheck, Mail, Sparkles, Filter 
} from 'lucide-react';

const ticketTrend = [
  { day: 'Mon', tickets: 45 },
  { day: 'Tue', tickets: 55 },
  { day: 'Wed', tickets: 40 },
  { day: 'Thu', tickets: 65 },
  { day: 'Fri', tickets: 50 },
  { day: 'Sat', tickets: 20 },
  { day: 'Sun', tickets: 15 }
];

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

// Reusable Modal Component
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
        maxWidth: '500px',
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
          borderBottom: '1px solid #333333'
        }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>{title}</h3>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            color: '#888888',
            cursor: 'pointer',
            padding: '4px'
          }}>
            <X size={18} />
          </button>
        </div>
        {/* Body */}
        <div style={{ padding: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   1. CUSTOMER SUCCESS DASHBOARD (Sidebar hidden but kept for build compatibility)
   ---------------------------------------------------- */
export const CustomerSuccessDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Support Tickets', val: '1,424', sub: 'Assigned: 120', icon: <MessageCircle size={18}/>, iconBg: 'rgba(99,102,241,0.1)', iconColor: '#6366f1' },
    { label: 'Open / Pending Tickets', val: '45 / 18', sub: 'Escalated: 3', icon: <AlertTriangle size={18}/>, iconBg: 'rgba(245,158,11,0.1)', iconColor: '#f59e0b' },
    { label: 'Customer CSAT Score', val: '94.5%', sub: 'Target: > 90%', icon: <Star size={18}/>, iconBg: 'rgba(16,185,129,0.1)', iconColor: '#10b981' },
    { label: 'SLA Compliance Rate', val: '99.2%', sub: 'Target: > 98%', icon: <CheckCircle size={18}/>, iconBg: 'rgba(6,182,212,0.1)', iconColor: '#06b6d4' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(99,102,241,0.12) 100%)', border: '1px solid rgba(16,185,129,0.2)', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 6px 0' }}>Customer Success Platform</h1>
          <p style={{ color: '#888888', fontSize: '14px', margin: 0 }}>Monitor agent activities, ticket trends, CSAT scores, and SLA compliance.</p>
        </div>
        <div style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', fontSize: '13px', fontWeight: 500, border: '1px solid #333333', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
          All Systems Normal
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#888888', fontSize: '13px', fontWeight: 500 }}>{s.label}</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.iconColor }}>{s.icon}</div>
            </div>
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: 700, margin: '4px 0 0 0', letterSpacing: '-0.5px', color: '#ffffff' }}>{s.val}</h2>
              <div style={{ fontSize: '12px', color: '#666666', marginTop: '6px' }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   2. TICKET SYSTEM
   ---------------------------------------------------- */
export const CustomerSuccessTickets: React.FC = () => {
  const [tickets, setTickets] = useState([
    { id: 'TCK-4409', subject: 'Billing failure on custom upgrade', customer: 'Apex Technologies', priority: 'High', agent: 'Alex Mercer', status: 'Open', pc: '#ef4444', sc: '#f59e0b' },
    { id: 'TCK-4408', subject: 'API Rate limit errors on sandbox', customer: 'CloudSystem Inc', priority: 'Normal', agent: 'Jessica Patel', status: 'Pending', pc: '#0ea5e9', sc: '#f59e0b' },
    { id: 'TCK-4407', subject: 'WhatsApp template rejected by Meta', customer: 'TechFlow Ltd', priority: 'High', agent: 'Ravi Sharma', status: 'In Progress', pc: '#ef4444', sc: '#6366f1' },
    { id: 'TCK-4406', subject: 'Dashboard loading slowly on mobile', customer: 'DevOps Studio', priority: 'Low', agent: 'Priya Nair', status: 'Resolved', pc: '#6b7280', sc: '#10b981' },
  ]);

  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({});
  const [newTicket, setNewTicket] = useState({ subject: '', customer: '', priority: 'Normal', agent: 'Alex Mercer' });
  const [assignState, setAssignState] = useState({ ticketId: 'TCK-4409', agent: 'Jessica Patel' });
  
  // Selected ticket for chat details log
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Customer', text: 'Hi, our webhook requests are failing with a 403 Forbidden error since this morning.', time: '10:30 AM' },
    { sender: 'System AI', text: 'Analyzing webhook records... Checking endpoint configurations. Error maps to a missing Bearer token authorization header.', time: '10:31 AM' },
  ]);
  const [newChatMessage, setNewChatMessage] = useState('');

  const openModal = (id: string) => setModalState(prev => ({ ...prev, [id]: true }));
  const closeModal = (id: string) => setModalState(prev => ({ ...prev, [id]: false }));

  useEffect(() => {
    const onPri = () => openModal('new-ticket');
    const onSec = () => openModal('assign');
    window.addEventListener('cs-pri-cs-tickets', onPri);
    window.addEventListener('cs-sec-cs-tickets', onSec);
    return () => {
      window.removeEventListener('cs-pri-cs-tickets', onPri);
      window.removeEventListener('cs-sec-cs-tickets', onSec);
    };
  }, []);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TCK-${Math.floor(4400 + Math.random() * 600)}`;
    const color = newTicket.priority === 'High' ? '#ef4444' : newTicket.priority === 'Normal' ? '#0ea5e9' : '#6b7280';
    const added = {
      id,
      subject: newTicket.subject,
      customer: newTicket.customer,
      priority: newTicket.priority,
      agent: newTicket.agent,
      status: 'Open',
      pc: color,
      sc: '#f59e0b'
    };
    setTickets([added, ...tickets]);
    closeModal('new-ticket');
    setNewTicket({ subject: '', customer: '', priority: 'Normal', agent: 'Alex Mercer' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Ticket ${id} registered successfully!` }));
  };

  const handleAssignTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTickets(tickets.map(t => t.id === assignState.ticketId ? { ...t, agent: assignState.agent, status: 'In Progress', sc: '#6366f1' } : t));
    closeModal('assign');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Assigned ${assignState.ticketId} to ${assignState.agent}` }));
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatMessage.trim()) return;
    setChatMessages([...chatMessages, { sender: 'Agent (You)', text: newChatMessage, time: 'Just now' }]);
    setNewChatMessage('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'Customer', text: 'Thank you, I will rotate the authorization tokens and check again.', time: 'Just now' }]);
    }, 1200);
  };

  const handleSelectTicket = (t: any) => {
    setSelectedTicket(t);
    setChatMessages([
      { sender: 'Customer', text: `Regarding "${t.subject}": We need immediate assistance resolving this.`, time: '10:30 AM' },
      { sender: 'System AI', text: `Analyzing issue metrics. Priority tier is configured as ${t.priority}.`, time: '10:31 AM' },
    ]);
    openModal('ticket-details');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Support Tickets Ledger</h3>
            <p style={{ fontSize: '12px', color: '#666666', margin: '2px 0 0 0' }}>Review, assign, and communicate on active platform support tickets.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => openModal('assign')} style={btnSecondaryStyle}>Assign Tickets</button>
            <button onClick={() => openModal('new-ticket')} style={btnPrimaryStyle}>+ New Ticket</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                {['Ticket ID', 'Subject', 'Customer', 'Priority', 'Assigned To', 'Status', 'Actions'].map(h => <th key={h} style={thHead}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {tickets.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#6366f1', fontWeight: 700, fontFamily: 'monospace', cursor: 'pointer' }} onClick={() => handleSelectTicket(row)}>{row.id}</td>
                  <td style={{ ...thCell, color: '#ffffff', fontWeight: 500 }}>{row.subject}</td>
                  <td style={thCell}>{row.customer}</td>
                  <td style={thCell}><span style={badge(row.pc)}>{row.priority}</span></td>
                  <td style={thCell}>{row.agent}</td>
                  <td style={thCell}><span style={badge(row.sc)}>{row.status}</span></td>
                  <td style={thCell}>
                    <button onClick={() => handleSelectTicket(row)} style={{ border: 'none', backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>View Thread</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: NEW TICKET */}
      <Modal isOpen={!!modalState['new-ticket']} onClose={() => closeModal('new-ticket')} title="Create Support Ticket">
        <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Subject / Issue Description</label>
            <input type="text" required placeholder="e.g. 2FA verification code sms not received" value={newTicket.subject} onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Customer Tenant Name</label>
            <input type="text" required placeholder="e.g. Acme Corp" value={newTicket.customer} onChange={(e) => setNewTicket({ ...newTicket, customer: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Priority Level</label>
              <select value={newTicket.priority} onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })} style={{ ...inputStyle, backgroundColor: '#121212' }}>
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Assign To Agent</label>
              <select value={newTicket.agent} onChange={(e) => setNewTicket({ ...newTicket, agent: e.target.value })} style={{ ...inputStyle, backgroundColor: '#121212' }}>
                <option value="Alex Mercer">Alex Mercer</option>
                <option value="Jessica Patel">Jessica Patel</option>
                <option value="Ravi Sharma">Ravi Sharma</option>
                <option value="Priya Nair">Priya Nair</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('new-ticket')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Create Ticket</button>
          </div>
        </form>
      </Modal>

      {/* MODAL: ASSIGN TICKET */}
      <Modal isOpen={!!modalState['assign']} onClose={() => closeModal('assign')} title="Assign Pending Support Ticket">
        <form onSubmit={handleAssignTicket} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Select Ticket</label>
            <select value={assignState.ticketId} onChange={(e) => setAssignState({ ...assignState, ticketId: e.target.value })} style={{ ...inputStyle, backgroundColor: '#121212' }}>
              {tickets.filter(t => t.status !== 'Resolved').map(t => <option key={t.id} value={t.id}>{t.id} - {t.subject}</option>)}
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Support Agent</label>
            <select value={assignState.agent} onChange={(e) => setAssignState({ ...assignState, agent: e.target.value })} style={{ ...inputStyle, backgroundColor: '#121212' }}>
              <option value="Alex Mercer">Alex Mercer (Online)</option>
              <option value="Jessica Patel">Jessica Patel (Online)</option>
              <option value="Ravi Sharma">Ravi Sharma (Offline)</option>
              <option value="Priya Nair">Priya Nair (Online)</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('assign')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Assign Agent</button>
          </div>
        </form>
      </Modal>

      {/* MODAL: TICKET CHAT WINDOW */}
      <Modal isOpen={!!modalState['ticket-details']} onClose={() => closeModal('ticket-details')} title={selectedTicket ? `Chat Logs: ${selectedTicket.id}` : ''}>
        {selectedTicket && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '10px 14px', backgroundColor: '#111111', borderRadius: '8px', border: '1px solid #222222', fontSize: '13px' }}>
              <div><strong>Subject:</strong> {selectedTicket.subject}</div>
              <div style={{ color: '#888888', marginTop: '4px', fontSize: '12px' }}>Customer: {selectedTicket.customer} | Agent: {selectedTicket.agent}</div>
            </div>

            <div style={{ height: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid #333333', borderRadius: '8px', padding: '12px', backgroundColor: '#0f0f0f' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.sender.includes('You') ? 'flex-end' : msg.sender === 'System AI' ? 'center' : 'flex-start',
                  backgroundColor: msg.sender.includes('You') ? '#6366f1' : msg.sender === 'System AI' ? '#222222' : '#333333',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  maxWidth: '85%',
                  fontSize: '12.5px',
                  textAlign: msg.sender === 'System AI' ? 'center' : 'left'
                }}>
                  <div style={{ fontSize: '10px', color: '#aaaaaa', fontWeight: 600, marginBottom: '2px' }}>{msg.sender} • {msg.time}</div>
                  <div style={{ color: '#ffffff' }}>{msg.text}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChatMessage} style={{ display: 'flex', gap: '8px' }}>
              <input type="text" placeholder="Write response to user..." value={newChatMessage} onChange={(e) => setNewChatMessage(e.target.value)} style={{ ...inputStyle, marginTop: 0 }} />
              <button type="submit" style={{ ...btnPrimaryStyle, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Send size={14} /></button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   3. KNOWLEDGE BASE
   ---------------------------------------------------- */
export const CustomerSuccessKb: React.FC = () => {
  const [articles, setArticles] = useState([
    { title: 'Configuring custom webhook endpoints', cat: 'Developer Settings', author: 'Alex Mercer', views: '1,420', status: 'Published', sc: '#10b981', body: 'Webhooks can be registered under Developer tab by pasting target URL listeners. Make sure to whitelist IP endpoints.' },
    { title: 'Managing enterprise billing structures', cat: 'Billing Setup', author: 'Jessica Patel', views: '890', status: 'Draft', sc: '#f59e0b', body: 'Billing dashboard contains custom features sliders to update metrics and download invoice logs sheets.' },
    { title: 'WhatsApp template approval guidelines', cat: 'Communication', author: 'Ravi Sharma', views: '2,140', status: 'Published', sc: '#10b981', body: 'Meta templates must conform to standard templates guidelines. Avoid variables prefix placeholders in buttons.' },
    { title: 'Setting up SSO with SAML 2.0', cat: 'Authentication', author: 'Priya Nair', views: '3,810', status: 'Published', sc: '#10b981', body: 'Enterprise clients can activate SAML 2.0 logins under Settings -> Authentication layout.' },
  ]);

  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({});
  const [newArticle, setNewArticle] = useState({ title: '', cat: 'Developer Settings', author: 'Alex Mercer', body: '' });
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [publishList, setPublishList] = useState<string[]>([]);

  const openModal = (id: string) => setModalState(prev => ({ ...prev, [id]: true }));
  const closeModal = (id: string) => setModalState(prev => ({ ...prev, [id]: false }));

  useEffect(() => {
    const onPri = () => openModal('create-article');
    const onSec = () => openModal('publish-drafts');
    window.addEventListener('cs-pri-cs-kb', onPri);
    window.addEventListener('cs-sec-cs-kb', onSec);
    return () => {
      window.removeEventListener('cs-pri-cs-kb', onPri);
      window.removeEventListener('cs-sec-cs-kb', onSec);
    };
  }, []);

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const added = {
      title: newArticle.title,
      cat: newArticle.cat,
      author: newArticle.author,
      views: '0',
      status: 'Published',
      sc: '#10b981',
      body: newArticle.body || 'This article provides a walkthrough instructions overview for system managers.'
    };
    setArticles([...articles, added]);
    closeModal('create-article');
    setNewArticle({ title: '', cat: 'Developer Settings', author: 'Alex Mercer', body: '' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Knowledge Base article published!' }));
  };

  const handleSelectArticle = (art: any) => {
    setSelectedArticle(art);
    openModal('read-article');
  };

  const handlePublishSelected = () => {
    setArticles(articles.map(art => publishList.includes(art.title) ? { ...art, status: 'Published', sc: '#10b981' } : art));
    closeModal('publish-drafts');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Draft articles published successfully!' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Articles Catalogue</h3>
            <p style={{ fontSize: '12px', color: '#666666', margin: '2px 0 0 0' }}>Author, review, and search help articles for documentation search portals.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => openModal('publish-drafts')} style={btnSecondaryStyle}>Publish Drafts</button>
            <button onClick={() => openModal('create-article')} style={btnPrimaryStyle}>+ Create Article</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                {['Article Title', 'Category', 'Author', 'Views', 'Status', 'Action'].map(h => <th key={h} style={thHead}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {articles.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#ffffff', fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSelectArticle(row)}>{row.title}</td>
                  <td style={thCell}>{row.cat}</td>
                  <td style={{ ...thCell, color: '#6366f1' }}>{row.author}</td>
                  <td style={{ ...thCell, color: '#ffffff', fontWeight: 600 }}>{row.views}</td>
                  <td style={thCell}><span style={badge(row.sc)}>{row.status}</span></td>
                  <td style={thCell}>
                    <button onClick={() => handleSelectArticle(row)} style={{ border: 'none', backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Read Article</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: CREATE ARTICLE */}
      <Modal isOpen={!!modalState['create-article']} onClose={() => closeModal('create-article')} title="Create Help Article">
        <form onSubmit={handleCreateArticle} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Article Title</label>
            <input type="text" required placeholder="e.g. Troubleshooting API Authentication" value={newArticle.title} onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Article Category</label>
              <select value={newArticle.cat} onChange={(e) => setNewArticle({ ...newArticle, cat: e.target.value })} style={{ ...inputStyle, backgroundColor: '#121212' }}>
                <option value="Developer Settings">Developer Settings</option>
                <option value="Billing Setup">Billing Setup</option>
                <option value="Communication">Communication</option>
                <option value="Authentication">Authentication</option>
              </select>
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Author</label>
              <select value={newArticle.author} onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })} style={{ ...inputStyle, backgroundColor: '#121212' }}>
                <option value="Alex Mercer">Alex Mercer</option>
                <option value="Jessica Patel">Jessica Patel</option>
                <option value="Ravi Sharma">Ravi Sharma</option>
                <option value="Priya Nair">Priya Nair</option>
              </select>
            </div>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Article Body Content</label>
            <textarea placeholder="Write full documentation details here..." required value={newArticle.body} onChange={(e) => setNewArticle({ ...newArticle, body: e.target.value })} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('create-article')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Publish Article</button>
          </div>
        </form>
      </Modal>

      {/* MODAL: PUBLISH DRAFTS CHECKLIST */}
      <Modal isOpen={!!modalState['publish-drafts']} onClose={() => closeModal('publish-drafts')} title="Publish Pending Drafts">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Select draft articles to instantly publish to help center portals.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {articles.filter(art => art.status === 'Draft').map((art, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', backgroundColor: '#121212', border: '1px solid #222222', borderRadius: '6px' }}>
                <input type="checkbox" onChange={(e) => {
                  if (e.target.checked) setPublishList([...publishList, art.title]);
                  else setPublishList(publishList.filter(title => title !== art.title));
                }} style={{ width: '16px', height: '16px' }} />
                <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: 600 }}>{art.title}</div>
              </div>
            ))}
            {articles.filter(art => art.status === 'Draft').length === 0 && (
              <div style={{ fontSize: '13px', color: '#666666', textAlign: 'center', padding: '10px' }}>No draft articles found in vector database indexes.</div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button onClick={() => closeModal('publish-drafts')} style={btnSecondaryStyle}>Cancel</button>
            <button onClick={handlePublishSelected} style={btnPrimaryStyle} disabled={publishList.length === 0}>Publish Selected</button>
          </div>
        </div>
      </Modal>

      {/* MODAL: READ ARTICLE */}
      <Modal isOpen={!!modalState['read-article']} onClose={() => closeModal('read-article')} title={selectedArticle ? selectedArticle.title : ''}>
        {selectedArticle && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', lineHeight: '1.6', color: '#aaaaaa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', borderBottom: '1px solid #333333', paddingBottom: '8px', color: '#666666' }}>
              <span>Category: <strong>{selectedArticle.cat}</strong></span>
              <span>Author: {selectedArticle.author}</span>
            </div>
            <p style={{ color: '#ffffff', margin: 0 }}>{selectedArticle.body}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button onClick={() => closeModal('read-article')} style={btnPrimaryStyle}>Done Reading</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   4. HELP CENTER
   ---------------------------------------------------- */
export const CustomerSuccessHelp: React.FC = () => {
  const [searchVal, setSearchVal] = useState('');
  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({});
  
  // Custom mock questions database mapped by topics card
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [activeFAQ, setActiveFAQ] = useState<any>(null);

  const topics = [
    { topic: 'Getting Started', icon: <Zap size={20}/>, color: '#6366f1', desc: 'Sync developer tokens and configure your vectors database integration.', faqs: [
      { q: 'How do I rotate API secrets?', a: 'Go to Settings -> Security and click Rotate credentials. Confirm via SMS 2FA code.' },
      { q: 'How do I whitelists server IPs?', a: 'Navigate to API whitelist configuration and insert individual CIDR notation blocks.' }
    ] },
    { topic: 'Billing & Plans', icon: <Star size={20}/>, color: '#f59e0b', desc: 'Manage organization pricing tier plans and billing receipts.', faqs: [
      { q: 'Can I add multiple payment gateways?', a: 'Yes! Access Payment Settings to link Razorpay, Stripe, and Paypal cards.' },
      { q: 'Where are monthly invoices located?', a: 'Download active receipts under Invoices section as spreadsheet CSV logs.' }
    ] },
    { topic: 'API Reference', icon: <BookOpen size={20}/>, color: '#a855f7', desc: 'Consult REST schema guidelines, webhooks registers, and developer tools.', faqs: [
      { q: 'What is the default webhook retry frequency?', a: 'System executes up to 5 automatic retry loops with exponential fallback pauses.' }
    ] },
    { topic: 'User Management', icon: <Users size={20}/>, color: '#10b981', desc: 'Manage access controls, assign team roles, and configure SAML permissions.', faqs: [
      { q: 'How do I sync SAML metadata?', a: 'Paste identity provider metadata.xml text under authentication settings.' }
    ] },
  ];

  const openModal = (id: string) => setModalState(prev => ({ ...prev, [id]: true }));
  const closeModal = (id: string) => setModalState(prev => ({ ...prev, [id]: false }));

  useEffect(() => {
    const onPri = () => openModal('submit-request');
    const onSec = () => openModal('contact-support');
    window.addEventListener('cs-pri-cs-help', onPri);
    window.addEventListener('cs-sec-cs-help', onSec);
    return () => {
      window.removeEventListener('cs-pri-cs-help', onPri);
      window.removeEventListener('cs-sec-cs-help', onSec);
    };
  }, []);

  const handleOpenTopic = (t: any) => {
    setSelectedTopic(t);
    openModal('topic-faqs');
  };

  const filteredTopics = topics.filter(t => 
    t.topic.toLowerCase().includes(searchVal.toLowerCase()) || 
    t.desc.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.1) 100%)', border: '1px solid rgba(99,102,241,0.2)', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px 0', color: '#ffffff' }}>Enterprise Help Portal</h2>
        <p style={{ color: '#888888', margin: '0 0 20px 0', fontSize: '14px' }}>Search guides, select topics for troubleshooting, or dispatch custom requests.</p>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', maxWidth: '480px', margin: '0 auto' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: '#666666' }} />
          <input 
            type="text" 
            placeholder="Search help topics..." 
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '36px', marginTop: 0 }} 
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {filteredTopics.map((t, i) => (
          <div key={i} onClick={() => handleOpenTopic(t)} style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer', transition: 'border 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: `${t.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.color }}>{t.icon}</div>
              <span style={{ fontSize: '11px', color: '#666666', fontWeight: 600 }}>Explore →</span>
            </div>
            <strong style={{ color: '#ffffff', fontSize: '15px' }}>{t.topic}</strong>
            <p style={{ fontSize: '13px', color: '#888888', margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
          </div>
        ))}
      </div>

      {/* MODAL: SUBMIT REQUEST */}
      <Modal isOpen={!!modalState['submit-request']} onClose={() => closeModal('submit-request')} title="Submit Platform Inquiry Request">
        <form onSubmit={(e) => { e.preventDefault(); closeModal('submit-request'); window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Inquiry request successfully submitted!' })); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Select Platform Component</label>
            <select style={{ ...inputStyle, backgroundColor: '#121212' }}>
              <option value="Billing">Billing & Subscription upgrade issues</option>
              <option value="Marketplace">Marketplace plugin setup questions</option>
              <option value="Settings">White label domains & RBAC</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Brief Subject</label>
            <input type="text" required placeholder="Describe your inquiry..." style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Details / Logs</label>
            <textarea placeholder="Describe full scenario logs here..." style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('submit-request')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Submit request</button>
          </div>
        </form>
      </Modal>

      {/* MODAL: CONTACT SUPPORT CALLBACK */}
      <Modal isOpen={!!modalState['contact-support']} onClose={() => closeModal('contact-support')} title="Contact Support Callback">
        <form onSubmit={(e) => { e.preventDefault(); closeModal('contact-support'); window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Callback request registered!' })); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Select Contact Method</label>
            <select style={{ ...inputStyle, backgroundColor: '#121212' }}>
              <option value="Phone">Phone Callback (Under 10 mins)</option>
              <option value="Email">Email Followup (Under 1 hour)</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Your Phone / Email address</label>
            <input type="text" required placeholder="+1 (555) 019-2834" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('contact-support')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Request callback</button>
          </div>
        </form>
      </Modal>

      {/* MODAL: TOPIC FAQS EXPLORER */}
      <Modal isOpen={!!modalState['topic-faqs']} onClose={() => closeModal('topic-faqs')} title={selectedTopic ? `${selectedTopic.topic} FAQs` : ''}>
        {selectedTopic && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {selectedTopic.faqs.map((faq: any, i: number) => (
              <div key={i} style={{ padding: '12px', backgroundColor: '#121212', border: '1px solid #333333', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '13.5px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }} onClick={() => setActiveFAQ(activeFAQ === faq.q ? null : faq.q)}>
                  <span>{faq.q}</span>
                  <span style={{ color: '#6366f1' }}>{activeFAQ === faq.q ? '▲' : '▼'}</span>
                </div>
                {activeFAQ === faq.q && (
                  <p style={{ fontSize: '12.5px', color: '#aaaaaa', margin: '8px 0 0 0', lineHeight: 1.5 }}>{faq.a}</p>
                )}
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button onClick={() => closeModal('topic-faqs')} style={btnPrimaryStyle}>Close FAQs</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   5. COMMUNITY FORUM
   ---------------------------------------------------- */
export const CustomerSuccessCommunity: React.FC = () => {
  const [posts, setPosts] = useState([
    { title: 'Best practices for API secret key rotations?', replies: 14, likes: 35, cat: 'Security', catColor: '#ef4444', time: '10 mins ago', author: 'Jessica Patel', body: 'Rotating security keys must sync with webhooks servers.' },
    { title: 'Meta Ads campaign triggers latency issue', replies: 8, likes: 12, cat: 'Advertising', catColor: '#f59e0b', time: '1 hour ago', author: 'Ravi Sharma', body: 'Meta API experiences latency spike around server refresh cycles.' },
    { title: 'How to set up multi-tenant white-label branding', replies: 22, likes: 58, cat: 'Settings', catColor: '#6366f1', time: '3 hours ago', author: 'Alex Mercer', body: 'White-labeling needs custom DNS registries whitelisting configurations.' },
    { title: 'Feature Request: Bulk import leads via CSV', replies: 5, likes: 44, cat: 'Feature Request', catColor: '#10b981', time: 'Yesterday', author: 'Priya Nair', body: 'Requesting standard schema parser validator for csv leads columns upload.' },
  ]);

  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({});
  const [newPost, setNewPost] = useState({ title: '', cat: 'Security', body: '' });
  const [selectedPost, setSelectedPost] = useState<any>(null);
  
  // Custom timeline replies state for discussions modal
  const [replies, setReplies] = useState([
    { author: 'Ravi Sharma', text: 'I agree, SSO endpoints need specific certificate syncs.', time: '2 hours ago' },
    { author: 'Jessica Patel', text: 'Will post the setup checklist for rotations tomorrow.', time: '1 hour ago' }
  ]);
  const [newReply, setNewReply] = useState('');

  const openModal = (id: string) => setModalState(prev => ({ ...prev, [id]: true }));
  const closeModal = (id: string) => setModalState(prev => ({ ...prev, [id]: false }));

  useEffect(() => {
    const onPri = () => openModal('create-post');
    const onSec = () => openModal('review-requests');
    window.addEventListener('cs-pri-cs-community', onPri);
    window.addEventListener('cs-sec-cs-community', onSec);
    return () => {
      window.removeEventListener('cs-pri-cs-community', onPri);
      window.removeEventListener('cs-sec-cs-community', onSec);
    };
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const added = {
      title: newPost.title,
      replies: 0,
      likes: 0,
      cat: newPost.cat,
      catColor: newPost.cat === 'Security' ? '#ef4444' : newPost.cat === 'Feature Request' ? '#10b981' : '#6366f1',
      time: 'Just now',
      author: 'You (Agent)',
      body: newPost.body
    };
    setPosts([added, ...posts]);
    closeModal('create-post');
    setNewPost({ title: '', cat: 'Security', body: '' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Discussion thread posted!' }));
  };

  const handleSelectPost = (p: any) => {
    setSelectedPost(p);
    setReplies([
      { author: 'Alex Mercer', text: `Regarding "${p.title}": Looking forward to team inputs.`, time: '1 hour ago' },
      { author: 'Priya Nair', text: 'Subscribed to this topic.', time: '20 mins ago' }
    ]);
    openModal('post-replies');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;
    setReplies([...replies, { author: 'You (Agent)', text: newReply, time: 'Just now' }]);
    setNewReply('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Community Forums</h3>
            <p style={{ fontSize: '12px', color: '#666666', margin: '2px 0 0 0' }}>Collaborate on best practices, ask setup questions, and request features.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => openModal('review-requests')} style={btnSecondaryStyle}>Review Requests</button>
            <button onClick={() => openModal('create-post')} style={btnPrimaryStyle}>+ Create Post</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                {['Topic Title', 'Author', 'Replies', 'Likes', 'Category', 'Last Activity', 'Action'].map(h => <th key={h} style={thHead}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {posts.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#ffffff', fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSelectPost(row)}>{row.title}</td>
                  <td style={thCell}>{row.author}</td>
                  <td style={{ ...thCell, color: '#6366f1', fontWeight: 700 }}>{row.replies}</td>
                  <td style={{ ...thCell, color: '#10b981', fontWeight: 700 }}>{row.likes}</td>
                  <td style={thCell}><span style={badge(row.catColor)}>{row.cat}</span></td>
                  <td style={{ ...thCell, color: '#666666' }}>{row.time}</td>
                  <td style={thCell}>
                    <button onClick={() => handleSelectPost(row)} style={{ border: 'none', backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>View replies</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: CREATE POST */}
      <Modal isOpen={!!modalState['create-post']} onClose={() => closeModal('create-post')} title="Create Forum Post">
        <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Discussion Title</label>
            <input type="text" required placeholder="e.g. Best settings for Whitelabel SSO logins" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Category</label>
            <select value={newPost.cat} onChange={(e) => setNewPost({ ...newPost, cat: e.target.value })} style={{ ...inputStyle, backgroundColor: '#121212' }}>
              <option value="Security">Security configuration</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Settings">General settings</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Message Body</label>
            <textarea placeholder="Write message..." required value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('create-post')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Submit post</button>
          </div>
        </form>
      </Modal>

      {/* MODAL: REVIEW REQUESTS */}
      <Modal isOpen={!!modalState['review-requests']} onClose={() => closeModal('review-requests')} title="Review Reported Forum posts">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Approve or clean reported posts on the community forum timeline.</p>
          <div style={{ padding: '12px', backgroundColor: '#121212', border: '1px solid #ef44441c', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: '#ef4444', fontSize: '13px' }}>Flagged: Spam Link Promotion</div>
            <p style={{ fontSize: '12px', color: '#888888', margin: '4px 0 8px 0' }}>"Click here to buy premium backlinks from external directory SEO..."</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => { closeModal('review-requests'); window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Post deleted permanently!' })); }} style={{ ...btnPrimaryStyle, backgroundColor: '#ef4444', fontSize: '11px', padding: '4px 10px' }}>Delete Post</button>
              <button onClick={() => { closeModal('review-requests'); window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Post approved' })); }} style={{ ...btnSecondaryStyle, fontSize: '11px', padding: '4px 10px' }}>Approve</button>
            </div>
          </div>
        </div>
      </Modal>

      {/* MODAL: FORUM POST DETAILS & TIMELINE */}
      <Modal isOpen={!!modalState['post-replies']} onClose={() => closeModal('post-replies')} title={selectedPost ? `Thread: ${selectedPost.title}` : ''}>
        {selectedPost && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '12px', backgroundColor: '#121212', borderRadius: '8px', border: '1px solid #333333' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666666', borderBottom: '1px solid #222222', paddingBottom: '6px' }}>
                <span>Author: <strong>{selectedPost.author}</strong></span>
                <span>Category: {selectedPost.cat}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#ffffff', margin: '8px 0 0 0', lineHeight: 1.5 }}>{selectedPost.body}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#888888' }}>Comments & Replies ({replies.length})</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto' }}>
                {replies.map((rep, idx) => (
                  <div key={idx} style={{ padding: '8px 10px', backgroundColor: '#222222', borderRadius: '6px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#888888', marginBottom: '2px' }}>
                      <strong>{rep.author}</strong>
                      <span>{rep.time}</span>
                    </div>
                    <div style={{ color: '#ffffff' }}>{rep.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendReply} style={{ display: 'flex', gap: '8px' }}>
              <input type="text" placeholder="Write reply to this thread..." value={newReply} onChange={(e) => setNewReply(e.target.value)} style={{ ...inputStyle, marginTop: 0 }} />
              <button type="submit" style={btnPrimaryStyle}>Comment</button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   6. LIVE CHAT
   ---------------------------------------------------- */
export const CustomerSuccessLiveSupport: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({});
  
  const [agents, setAgents] = useState([
    { name: 'Alex Mercer', slots: '2 / 3', duration: '4h 12m', status: 'Online', sc: '#10b981' },
    { name: 'Jessica Patel', slots: '3 / 3', duration: '2h 44m', status: 'Busy', sc: '#f59e0b' },
    { name: 'Ravi Sharma', slots: '0 / 3', duration: '0m', status: 'Away', sc: '#6b7280' },
  ]);

  const [chatSettings, setChatSettings] = useState({
    welcomeMsg: 'Hello! How can we assist you with our platform tools today?',
    maxChats: 3,
    routing: 'Round Robin'
  });

  const [simulationChat, setSimulationChat] = useState<{ customer: string; text: string; sender: string }[]>([
    { customer: 'David', text: 'Hello, our client billing is reporting double transaction ledger entries.', sender: 'Customer' },
  ]);
  const [simReply, setSimReply] = useState('');

  const openModal = (id: string) => setModalState(prev => ({ ...prev, [id]: true }));
  const closeModal = (id: string) => setModalState(prev => ({ ...prev, [id]: false }));

  useEffect(() => {
    const onPri = () => {
      setIsOnline(!isOnline);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: `Support status changed to: ${!isOnline ? 'ONLINE' : 'OFFLINE'}` }));
    };
    const onSec = () => openModal('chat-settings');
    window.addEventListener('cs-pri-cs-support', onPri);
    window.addEventListener('cs-sec-cs-support', onSec);
    return () => {
      window.removeEventListener('cs-pri-cs-support', onPri);
      window.removeEventListener('cs-sec-cs-support', onSec);
    };
  }, [isOnline]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal('chat-settings');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Chat widgets configurations updated!' }));
  };

  const handleSendSimReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simReply.trim()) return;
    setSimulationChat([...simulationChat, { customer: 'David', text: simReply, sender: 'You (Agent)' }]);
    setSimReply('');
    setTimeout(() => {
      setSimulationChat(prev => [...prev, { customer: 'David', text: 'Checked. Rotating credentials solved transaction loops. Thanks!', sender: 'Customer' }]);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ color: '#888888', fontSize: '13px' }}>Active Chat Channels</span>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff', margin: 0 }}>4 active</h2>
          <div style={{ fontSize: '12px', color: '#10b981' }}>● Agent queues whitelisted</div>
        </div>
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ color: '#888888', fontSize: '13px' }}>Support Center Status</span>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: isOnline ? '#10b981' : '#ef4444', margin: 0 }}>{isOnline ? 'Online & Active' : 'Offline'}</h2>
          <div style={{ fontSize: '12px', color: '#666666' }}>Toggle header primary CTA to switch</div>
        </div>
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ color: '#888888', fontSize: '13px' }}>Average Chat Wait time</span>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff', margin: 0 }}>12 secs</h2>
          <div style={{ fontSize: '12px', color: '#666666' }}>Target SLA: &lt; 45 secs</div>
        </div>
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Active Live Agents Monitor</h3>
            <p style={{ fontSize: '12px', color: '#666666', margin: '2px 0 0 0' }}>Assign slots and monitor active duration parameters.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => openModal('chat-settings')} style={btnSecondaryStyle}>Chat Settings</button>
            <button onClick={() => {
              setIsOnline(!isOnline);
              window.dispatchEvent(new CustomEvent('show-toast', { detail: `Status changed to: ${!isOnline ? 'ONLINE' : 'OFFLINE'}` }));
            }} style={btnPrimaryStyle}>{isOnline ? 'Go Offline' : 'Go Online'}</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                {['Agent Name', 'Assign Slots', 'Active Duration', 'Status', 'Action'].map(h => <th key={h} style={thHead}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {agents.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#ffffff', fontWeight: 700 }}>{row.name}</td>
                  <td style={thCell}>{row.slots}</td>
                  <td style={{ ...thCell, color: '#666666' }}>{row.duration}</td>
                  <td style={thCell}><span style={badge(row.sc)}>{row.status}</span></td>
                  <td style={thCell}>
                    <button onClick={() => {
                      if (row.status === 'Online' || row.status === 'Busy') openModal('simulate-chat');
                      else window.dispatchEvent(new CustomEvent('show-toast', { detail: `${row.name} is currently offline.` }));
                    }} style={{ border: 'none', backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>
                      Simulate Support
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: CHAT SETTINGS */}
      <Modal isOpen={!!modalState['chat-settings']} onClose={() => closeModal('chat-settings')} title="Live Chat Settings">
        <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Default Welcome Message Greeting</label>
            <input type="text" required value={chatSettings.welcomeMsg} onChange={(e) => setChatSettings({ ...chatSettings, welcomeMsg: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Max Active Chats Per Agent</label>
              <input type="number" required min={1} max={10} value={chatSettings.maxChats} onChange={(e) => setChatSettings({ ...chatSettings, maxChats: parseInt(e.target.value) || 3 })} style={inputStyle} />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Routing Strategy</label>
              <select value={chatSettings.routing} onChange={(e) => setChatSettings({ ...chatSettings, routing: e.target.value })} style={{ ...inputStyle, backgroundColor: '#121212' }}>
                <option value="Round Robin">Round Robin allocation</option>
                <option value="Least Busy">Least Busy agent priority</option>
                <option value="Skills Based">Skills category routing</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('chat-settings')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Apply Settings</button>
          </div>
        </form>
      </Modal>

      {/* MODAL: SIMULATE LIVE CHAT CLIENT */}
      <Modal isOpen={!!modalState['simulate-chat']} onClose={() => closeModal('simulate-chat')} title="Support chat channel simulation">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ padding: '8px 12px', backgroundColor: '#222222', borderRadius: '6px', fontSize: '12px', border: '1px solid #333333' }}>
            <span>Channel Assigned: <strong>David (Developer Client)</strong></span>
          </div>

          <div style={{ height: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid #333333', borderRadius: '8px', padding: '10px', backgroundColor: '#0c0c0c' }}>
            {simulationChat.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.sender.includes('You') ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender.includes('You') ? '#6366f1' : '#333333',
                borderRadius: '8px',
                padding: '6px 10px',
                maxWidth: '85%',
                fontSize: '12.5px'
              }}>
                <div style={{ fontSize: '9px', color: '#aaaaaa', marginBottom: '2px' }}>{msg.sender}</div>
                <div style={{ color: '#ffffff' }}>{msg.text}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendSimReply} style={{ display: 'flex', gap: '8px' }}>
            <input type="text" placeholder="Type reply to client..." value={simReply} onChange={(e) => setSimReply(e.target.value)} style={{ ...inputStyle, marginTop: 0 }} />
            <button type="submit" style={btnPrimaryStyle}>Send</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   7. AI SUPPORT AGENT
   ---------------------------------------------------- */
export const CustomerSuccessAiAgent: React.FC = () => {
  const [syncing, setSyncing] = useState(false);
  const [retraining, setRetraining] = useState(false);
  
  const [aiStats, setAiStats] = useState([
    { label: 'Deflected Chats Today', val: '450', sub: 'Deflection rate: 84%', icon: <Bot size={18}/>, iconBg: 'rgba(168,85,247,0.1)', iconColor: '#a855f7' },
    { label: 'AI Resolution Time', val: '4 sec', sub: 'Real-time sync API', icon: <Zap size={18}/>, iconBg: 'rgba(99,102,241,0.1)', iconColor: '#6366f1' },
    { label: 'Model Confidence', val: '98.5%', sub: 'Target: > 95%', icon: <TrendingUp size={18}/>, iconBg: 'rgba(16,185,129,0.1)', iconColor: '#10b981' },
  ]);

  useEffect(() => {
    const onPri = () => {
      setRetraining(true);
      setTimeout(() => {
        setRetraining(false);
        setAiStats(prev => [
          prev[0],
          prev[1],
          { ...prev[2], val: '99.1%' }
        ]);
        window.dispatchEvent(new CustomEvent('show-toast', { detail: 'AI models retrained successfully!' }));
      }, 2000);
    };

    const onSec = () => {
      setSyncing(true);
      setTimeout(() => {
        setSyncing(false);
        window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Knowledge Base synced with vector indexes!' }));
      }, 2000);
    };

    window.addEventListener('cs-pri-cs-agent', onPri);
    window.addEventListener('cs-sec-cs-agent', onSec);
    return () => {
      window.removeEventListener('cs-pri-cs-agent', onPri);
      window.removeEventListener('cs-sec-cs-agent', onSec);
    };
  }, []);

  const handleRetrain = () => {
    setRetraining(true);
    setTimeout(() => {
      setRetraining(false);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Model retraining completed!' }));
    }, 2000);
  };

  const handleSyncKB = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Synced vector DB tables!' }));
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {aiStats.map((s, i) => (
          <div key={i} style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#888888', fontSize: '13px', fontWeight: 500 }}>{s.label}</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.iconColor }}>{s.icon}</div>
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 700, margin: '4px 0 0 0', color: '#ffffff' }}>{s.val}</h2>
            <div style={{ fontSize: '12px', color: '#666666' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>AI Agent System Health & Parameters</h3>
            <p style={{ fontSize: '12px', color: '#666666', margin: '2px 0 0 0' }}>Manage vector indexes, temperature profiles, and custom training cycles.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleSyncKB} style={btnSecondaryStyle} disabled={syncing}>
              {syncing ? 'Syncing...' : 'Sync Knowledge Base'}
            </button>
            <button onClick={handleRetrain} style={btnPrimaryStyle} disabled={retraining}>
              {retraining ? 'Retraining...' : 'Retrain Models'}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {[
            { label: 'Context Window size', val: '128k Tokens', desc: 'Gemini Pro Flash Context limits', color: '#a855f7' },
            { label: 'Vector database status', val: '4 indexes linked', desc: 'Scylla & Pinecone cloud nodes connected', color: '#6366f1' },
            { label: 'Linked source documents', val: '84 guides', desc: 'Auto refreshed daily', color: '#06b6d4' },
            { label: 'Model provider', val: 'Google Gemini 1.5', desc: 'SLA priority routing configuration', color: '#10b981' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '14px 16px', background: '#121212', borderRadius: '8px', border: '1px solid #333333' }}>
              <div style={{ fontSize: '11px', color: '#666666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{item.label}</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: item.color }}>{item.val}</div>
              <div style={{ fontSize: '12px', color: '#888888', marginTop: '4px' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   8. SLA MANAGEMENT
   ---------------------------------------------------- */
export const CustomerSuccessSla: React.FC = () => {
  const [policies, setPolicies] = useState([
    { name: 'Premium Tier SLA', response: '< 15 mins', resolution: '< 2 hours', escalation: 'Level 3 (VP Support)', compliance: '99.8%', cc: '#10b981' },
    { name: 'Standard Core SLA', response: '< 1 hour', resolution: '< 12 hours', escalation: 'Level 1 (Agent Lead)', compliance: '98.5%', cc: '#10b981' },
    { name: 'Enterprise Custom SLA', response: '< 5 mins', resolution: '< 1 hour', escalation: 'Level 4 (CTO Direct)', compliance: '100%', cc: '#6366f1' },
  ]);

  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({});
  const [newSla, setNewSla] = useState({ name: '', response: '< 15 mins', resolution: '< 2 hours', escalation: 'Level 1 (Agent Lead)' });

  const openModal = (id: string) => setModalState(prev => ({ ...prev, [id]: true }));
  const closeModal = (id: string) => setModalState(prev => ({ ...prev, [id]: false }));

  useEffect(() => {
    const onPri = () => openModal('create-sla');
    const onSec = () => openModal('violations');
    window.addEventListener('cs-pri-cs-sla', onPri);
    window.addEventListener('cs-sec-cs-sla', onSec);
    return () => {
      window.removeEventListener('cs-pri-cs-sla', onPri);
      window.removeEventListener('cs-sec-cs-sla', onSec);
    };
  }, []);

  const handleCreateSLA = (e: React.FormEvent) => {
    e.preventDefault();
    const added = {
      name: newSla.name,
      response: newSla.response,
      resolution: newSla.resolution,
      escalation: newSla.escalation,
      compliance: '100%',
      cc: '#6366f1'
    };
    setPolicies([...policies, added]);
    closeModal('create-sla');
    setNewSla({ name: '', response: '< 15 mins', resolution: '< 2 hours', escalation: 'Level 1 (Agent Lead)' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'SLA Policy matrix registered!' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>SLA Policy Matrices</h3>
            <p style={{ fontSize: '12px', color: '#666666', margin: '2px 0 0 0' }}>Configure response targets, resolution times, and escalation pathways.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => openModal('violations')} style={btnSecondaryStyle}>Violation Alerts</button>
            <button onClick={() => openModal('create-sla')} style={btnPrimaryStyle}>+ Create SLA Policy</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                {['SLA Target Name', 'Response Target', 'Resolution Target', 'Escalation Level', 'Compliance'].map(h => <th key={h} style={thHead}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {policies.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#ffffff', fontWeight: 700 }}>{row.name}</td>
                  <td style={{ ...thCell, color: '#0ea5e9' }}>{row.response}</td>
                  <td style={{ ...thCell, color: '#f59e0b' }}>{row.resolution}</td>
                  <td style={thCell}>{row.escalation}</td>
                  <td style={thCell}><span style={badge(row.cc)}>{row.compliance}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: CREATE SLA */}
      <Modal isOpen={!!modalState['create-sla']} onClose={() => closeModal('create-sla')} title="Create SLA Policy Matrix">
        <form onSubmit={handleCreateSLA} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>SLA Name</label>
            <input type="text" required placeholder="e.g. VIP Response SLA" value={newSla.name} onChange={(e) => setNewSla({ ...newSla, name: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Response Target</label>
              <select value={newSla.response} onChange={(e) => setNewSla({ ...newSla, response: e.target.value })} style={{ ...inputStyle, backgroundColor: '#121212' }}>
                <option value="< 5 mins">&lt; 5 minutes</option>
                <option value="< 15 mins">&lt; 15 minutes</option>
                <option value="< 1 hour">&lt; 1 hour</option>
              </select>
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Resolution Target</label>
              <select value={newSla.resolution} onChange={(e) => setNewSla({ ...newSla, resolution: e.target.value })} style={{ ...inputStyle, backgroundColor: '#121212' }}>
                <option value="< 1 hour">&lt; 1 hour</option>
                <option value="< 2 hours">&lt; 2 hours</option>
                <option value="< 12 hours">&lt; 12 hours</option>
              </select>
            </div>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Escalation Level Pathway</label>
            <select value={newSla.escalation} onChange={(e) => setNewSla({ ...newSla, escalation: e.target.value })} style={{ ...inputStyle, backgroundColor: '#121212' }}>
              <option value="Level 1 (Agent Lead)">Level 1 (Agent Lead)</option>
              <option value="Level 3 (VP Support)">Level 3 (VP Support)</option>
              <option value="Level 4 (CTO Direct)">Level 4 (CTO Direct)</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('create-sla')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Create SLA</button>
          </div>
        </form>
      </Modal>

      {/* MODAL: VIOLATIONS LOG */}
      <Modal isOpen={!!modalState['violations']} onClose={() => closeModal('violations')} title="SLA Violations Auditing Logs">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#9ca3af' }}>
          <p style={{ margin: 0 }}>Review recent ticket warnings nearing escalation thresholds.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'TCK-4409', warning: 'Response limit warning (14 mins left)', assignee: 'Alex Mercer' },
              { id: 'TCK-4320', warning: 'Escalated Resolution warning (1 hour past target)', assignee: 'Priya Nair' }
            ].map((v, i) => (
              <div key={i} style={{ padding: '10px', backgroundColor: '#121212', border: '1px solid #ef44441a', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ color: '#ffffff' }}>{v.id}</strong>
                  <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '2px' }}>{v.warning}</div>
                </div>
                <span style={{ fontSize: '11px', color: '#888888', alignSelf: 'center' }}>Assignee: {v.assignee}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button onClick={() => closeModal('violations')} style={btnPrimaryStyle}>Acknowledge warnings</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ----------------------------------------------------
   9. CUSTOMER HEALTH SCORE
   ---------------------------------------------------- */
export const CustomerSuccessCustomerHealth: React.FC = () => {
  const [accounts, setAccounts] = useState([
    { name: 'Apex Technologies', usage: '94%', tickets: '2 / mo', risk: 'Low Risk', riskC: '#10b981', health: 'Healthy', hC: '#10b981', manager: 'Alex Mercer' },
    { name: 'CloudSystem Inc', usage: '78%', tickets: '5 / mo', risk: 'Moderate', riskC: '#f59e0b', health: 'Good', hC: '#6366f1', manager: 'Jessica Patel' },
    { name: 'TechFlow Ltd', usage: '42%', tickets: '18 / mo', risk: 'High Risk', riskC: '#ef4444', health: 'At Risk', hC: '#ef4444', manager: 'Ravi Sharma' },
    { name: 'DevOps Studio', usage: '88%', tickets: '1 / mo', risk: 'Low Risk', riskC: '#10b981', health: 'Healthy', hC: '#10b981', manager: 'Priya Nair' },
  ]);

  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({});
  const [outreachEmail, setOutreachEmail] = useState({ manager: 'Ravi Sharma', client: 'TechFlow Ltd', subject: 'Campaign support outreach alert', text: 'Hello, we noticed usage drops. Setting up call back consulting.' });

  const openModal = (id: string) => setModalState(prev => ({ ...prev, [id]: true }));
  const closeModal = (id: string) => setModalState(prev => ({ ...prev, [id]: false }));

  const handleExportCSV = () => {
    // Generate simulated CSV string
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Customer Account,Usage Score,Ticket Volume,Risk Assessment,Health Status"].join(",") + "\n"
      + accounts.map(a => `${a.name},${a.usage},${a.tickets},${a.risk},${a.health}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Customer_Health_Ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Customer health ledger downloaded successfully!' }));
  };

  useEffect(() => {
    const onPri = handleExportCSV;
    const onSec = () => openModal('risk-indicators');
    window.addEventListener('cs-pri-cs-health', onPri);
    window.addEventListener('cs-sec-cs-health', onSec);
    return () => {
      window.removeEventListener('cs-pri-cs-health', onPri);
      window.removeEventListener('cs-sec-cs-health', onSec);
    };
  }, [accounts]);

  const handleSendOutreach = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal('risk-indicators');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Outreach email sent to ${outreachEmail.client} via ${outreachEmail.manager}` }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ color: '#888888', fontSize: '13px' }}>Overall Tenant Engagement</span>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff', margin: 0 }}>92 / 100</h2>
          <div style={{ fontSize: '12px', color: '#10b981' }}>● Highly Active</div>
        </div>
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ color: '#888888', fontSize: '13px' }}>Net Promoter Score (NPS)</span>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff', margin: 0 }}>72 NPS</h2>
          <div style={{ fontSize: '12px', color: '#666666' }}>Target Score: &gt; 50</div>
        </div>
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ color: '#888888', fontSize: '13px' }}>Accounts At Risk</span>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#ef4444', margin: 0 }}>1 high risk</h2>
          <div style={{ fontSize: '12px', color: '#ef4444' }}>Outreach alert recommended</div>
        </div>
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Customer Health score ledger</h3>
            <p style={{ fontSize: '12px', color: '#666666', margin: '2px 0 0 0' }}>Track NPS score, support call frequency, and tenant usage index variables.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => openModal('risk-indicators')} style={btnSecondaryStyle}>Risk Indicators</button>
            <button onClick={handleExportCSV} style={btnPrimaryStyle}>Export Health Ledger</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                {['Customer Account', 'Usage Score', 'Ticket Volume', 'Risk Assessment', 'Health Status', 'Account Manager'].map(h => <th key={h} style={thHead}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {accounts.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ ...thCell, color: '#6366f1', fontWeight: 700 }}>{row.name}</td>
                  <td style={{ ...thCell, color: '#ffffff', fontWeight: 600 }}>{row.usage}</td>
                  <td style={thCell}>{row.tickets}</td>
                  <td style={thCell}><span style={badge(row.riskC)}>{row.risk}</span></td>
                  <td style={thCell}><span style={badge(row.hC)}>{row.health}</span></td>
                  <td style={thCell}>{row.manager}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: RISK INDICATORS */}
      <Modal isOpen={!!modalState['risk-indicators']} onClose={() => closeModal('risk-indicators')} title="High Risk Account outreach wizard">
        <form onSubmit={handleSendOutreach} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Client Account At Risk</label>
            <select value={outreachEmail.client} onChange={(e) => setOutreachEmail({ ...outreachEmail, client: e.target.value })} style={{ ...inputStyle, backgroundColor: '#121212' }}>
              {accounts.filter(a => a.risk.includes('Risk') || a.risk === 'Moderate').map(a => <option key={a.name} value={a.name}>{a.name} ({a.risk})</option>)}
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Account Success Manager</label>
            <select value={outreachEmail.manager} onChange={(e) => setOutreachEmail({ ...outreachEmail, manager: e.target.value })} style={{ ...inputStyle, backgroundColor: '#121212' }}>
              <option value="Ravi Sharma">Ravi Sharma</option>
              <option value="Alex Mercer">Alex Mercer</option>
              <option value="Jessica Patel">Jessica Patel</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email Subject</label>
            <input type="text" required value={outreachEmail.subject} onChange={(e) => setOutreachEmail({ ...outreachEmail, subject: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email Body</label>
            <textarea required value={outreachEmail.text} onChange={(e) => setOutreachEmail({ ...outreachEmail, text: e.target.value })} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('risk-indicators')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Send Outreach Alert</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
