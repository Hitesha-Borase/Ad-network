import React, { useState, useEffect } from 'react';
import { 
  Search, Mail, Plus, Send, X, Layout, Globe, Users, Bot, Zap
} from 'lucide-react';

const triggerToast = (msg: string) => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
};

/* ----------------------------------------------------
   1. COMMUNICATION INBOX
   ---------------------------------------------------- */
interface CommunicationInboxProps {
  activeTab?: 'all' | 'unread' | 'assigned';
  setActiveTab?: (tab: 'all' | 'unread' | 'assigned') => void;
  inboxSearch?: string;
  setInboxSearch?: (query: string) => void;
}

export const CommunicationInbox: React.FC<CommunicationInboxProps> = ({
  activeTab: propActiveTab,
  setActiveTab: propSetActiveTab,
  inboxSearch: propInboxSearch,
  setInboxSearch: propSetInboxSearch
}) => {
  const [localInboxSearch, setLocalInboxSearch] = useState('');
  const [localActiveTab, setLocalActiveTab] = useState<'all' | 'unread' | 'assigned'>('all');
  const [selectedInboxId, setSelectedInboxId] = useState(1);
  const [replyText, setReplyText] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Modals state
  const [isNewConvOpen, setIsNewConvOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter settings state
  const [filterChannel, setFilterChannel] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // New Conversation Form State
  const [newConvForm, setNewConvForm] = useState({
    name: '',
    channel: 'WhatsApp',
    category: 'Sales',
    message: ''
  });

  const inboxSearch = propInboxSearch !== undefined ? propInboxSearch : localInboxSearch;
  const setInboxSearch = propSetInboxSearch !== undefined ? propSetInboxSearch : setLocalInboxSearch;
  const activeTab = propActiveTab !== undefined ? propActiveTab : localActiveTab;
  const setActiveTab = propSetActiveTab !== undefined ? propSetActiveTab : setLocalActiveTab;

  const [conversations, setConversations] = useState([
    { 
      id: 1, 
      name: 'Sarah Jenkins', 
      avatar: 'SJ', 
      channel: 'WhatsApp', 
      preview: 'I would like to upgrade my enterprise subscription to the custom tier.', 
      time: '10:42 AM', 
      unread: 2, 
      category: 'Sales',
      email: 'sarah.j@enterprise.com',
      phone: '+1 (555) 019-2834',
      company: 'Apex Technologies',
      leadStatus: 'Qualified Prospect',
      agent: 'Alex Mercer (You)',
      tags: ['Enterprise', 'Pricing Upgrade', 'High Priority'],
      notes: 'Requested callback. Prefers WhatsApp.',
      activities: [
        { type: 'Incoming WhatsApp', time: '10:42 AM', desc: 'Message received from client' },
        { type: 'AI Suggestion Generated', time: '10:43 AM', desc: 'Suggested response generated' }
      ],
      messages: [
        { sender: 'client', time: '10:30 AM', content: 'Hello, following up on our meeting from last week.' },
        { sender: 'agent', time: '10:35 AM', content: 'Hi Sarah! I hope you are having a productive day. How can I help you?' },
        { sender: 'client', time: '10:42 AM', content: 'I would like to upgrade my enterprise subscription to the custom tier. Can we hop on a call tomorrow at 10 AM EST?' }
      ]
    },
    { 
      id: 2, 
      name: 'Marcus Vance', 
      avatar: 'MV', 
      channel: 'Email', 
      preview: 'Our technical team has reviewed the API integration guidelines.', 
      time: '9:15 AM', 
      unread: 0, 
      category: 'Support',
      email: 'm.vance@cloudsystem.io',
      phone: '+1 (555) 438-9210',
      company: 'CloudSystem Inc',
      leadStatus: 'Customer',
      agent: 'Jessica Patel',
      tags: ['API Support', 'Technical'],
      notes: 'Needs help with rate limits.',
      activities: [{ type: 'Email Received', time: '9:15 AM', desc: 'Detailed API query' }],
      messages: [{ sender: 'client', time: '9:15 AM', content: 'Our technical team has reviewed the API integration guidelines.' }]
    }
  ]);

  // Wire CTA Event Listeners
  useEffect(() => {
    const handleNewConv = () => setIsNewConvOpen(true);
    const handleFilter = () => setIsFilterOpen(true);

    window.addEventListener('inbox-new-conv', handleNewConv);
    window.addEventListener('inbox-filter', handleFilter);

    return () => {
      window.removeEventListener('inbox-new-conv', handleNewConv);
      window.removeEventListener('inbox-filter', handleFilter);
    };
  }, []);

  const filteredConversations = conversations.filter(c => {
    if (inboxSearch.trim() !== '') {
      return c.name.toLowerCase().includes(inboxSearch.toLowerCase()) || 
             c.preview.toLowerCase().includes(inboxSearch.toLowerCase());
    }
    if (filterChannel !== 'all' && c.channel.toLowerCase() !== filterChannel.toLowerCase()) return false;
    if (filterCategory !== 'all' && c.category.toLowerCase() !== filterCategory.toLowerCase()) return false;

    if (activeTab === 'unread') return c.unread > 0;
    if (activeTab === 'assigned') return c.agent.includes('You');
    return true;
  });

  const selectedConversation = conversations.find(c => c.id === selectedInboxId) || filteredConversations[0] || conversations[0];

  const handleSend = () => {
    if (!replyText.trim()) return;
    setConversations(prev => prev.map(c => {
      if (c.id === selectedConversation.id) {
        return {
          ...c,
          preview: replyText,
          time: 'Just now',
          messages: [
            ...c.messages,
            { sender: 'agent', time: 'Just now', content: replyText }
          ]
        };
      }
      return c;
    }));
    setReplyText('');
  };

  const handleCreateNewConversation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConvForm.name || !newConvForm.message) return;

    const newId = conversations.length + 1;
    const newEntry = {
      id: newId,
      name: newConvForm.name,
      avatar: newConvForm.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U',
      channel: newConvForm.channel,
      preview: newConvForm.message,
      time: 'Just now',
      unread: 0,
      category: newConvForm.category,
      email: `${newConvForm.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      phone: '+1 (555) 555-5555',
      company: 'Quick Contact',
      leadStatus: 'Prospect',
      agent: 'Alex Mercer (You)',
      tags: ['Inbound', 'Manual Creation'],
      notes: 'New manual conversation created.',
      activities: [{ type: 'Created', time: 'Just now', desc: 'Manual ticket creation' }],
      messages: [{ sender: 'client', time: 'Just now', content: newConvForm.message }]
    };

    setConversations(prev => [newEntry, ...prev]);
    setSelectedInboxId(newId);
    setIsNewConvOpen(false);
    setNewConvForm({ name: '', channel: 'WhatsApp', category: 'Sales', message: '' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Started conversation with ${newConvForm.name}!` }));
  };

  return (
    <div className="inbox-layout glass-card" style={{ display: 'grid', gridTemplateColumns: '300px 1fr 300px', height: '620px', padding: 0, overflow: 'hidden' }}>
      
      {/* CSS Injection for Responsiveness */}
      <style>{`
        @media (max-width: 1200px) {
          .inbox-layout {
            grid-template-columns: 260px 1fr !important;
          }
          .inbox-drawer-col {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .inbox-layout {
            display: flex !important;
            flex-direction: column !important;
            height: auto !important;
            min-height: 620px;
          }
          .inbox-list-col {
            width: 100% !important;
            height: 250px !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border-color);
          }
        }
      `}</style>

      {/* Column 1: Conversations List */}
      <div className="inbox-list-col" style={{ borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', height: '100%', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search inbox..."
              value={inboxSearch}
              onChange={(e) => setInboxSearch(e.target.value)}
              style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 12px 6px 30px', fontSize: '12px', color: '#ffffff', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['All', 'Unread', 'Assigned'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase() as any)}
                style={{ flex: 1, backgroundColor: activeTab === tab.toLowerCase() ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: activeTab === tab.toLowerCase() ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: '11px', padding: '5px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredConversations.map((conv) => (
            <div key={conv.id} onClick={() => setSelectedInboxId(conv.id)} style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer', backgroundColor: conv.id === selectedConversation.id ? 'rgba(255,255,255,0.04)' : 'transparent', display: 'flex', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--primary)' }}>
                {conv.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '12.5px', color: 'var(--text-primary)' }}>{conv.name}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{conv.time}</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {conv.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 2: Conversation Window */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{selectedConversation.name}</h4>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Channel: {selectedConversation.channel} | Agent: {selectedConversation.agent}</p>
          </div>
          <button 
            onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
          >
            Details
          </button>
        </div>

        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {selectedConversation.messages.map((m, idx) => (
            <div key={idx} style={{ alignSelf: m.sender === 'agent' ? 'flex-end' : 'flex-start', maxWidth: '75%', display: 'flex', flexDirection: 'column', alignItems: m.sender === 'agent' ? 'flex-end' : 'flex-start' }}>
              <div style={{ backgroundColor: m.sender === 'agent' ? 'var(--primary)' : 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 12px', color: m.sender === 'agent' ? '#fff' : 'var(--text-primary)', fontSize: '12.5px' }}>
                {m.content}
              </div>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>{m.time}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Type a response..." 
            value={replyText} 
            onChange={(e) => setReplyText(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }} 
          />
          <button onClick={handleSend} style={{ backgroundColor: 'var(--primary)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
            Send
          </button>
        </div>
      </div>

      {/* Column 3: Customer Details Drawer (Fixed or toggleable) */}
      <div className="inbox-drawer-col" style={{ display: isDrawerOpen ? 'flex' : 'none', flexDirection: 'column', height: '100%', background: 'rgba(255,255,255,0.01)', borderLeft: '1px solid var(--border-color)', padding: '16px', gap: '16px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '6px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: 'var(--primary)' }}>
            {selectedConversation.avatar}
          </div>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{selectedConversation.name}</h4>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{selectedConversation.company}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
          <div><span style={{ color: 'var(--text-muted)' }}>Email: </span><span style={{ color: 'var(--text-primary)' }}>{selectedConversation.email}</span></div>
          <div><span style={{ color: 'var(--text-muted)' }}>Phone: </span><span style={{ color: 'var(--text-primary)' }}>{selectedConversation.phone}</span></div>
          <div><span style={{ color: 'var(--text-muted)' }}>Status: </span><span style={{ color: 'var(--text-primary)' }}>{selectedConversation.leadStatus}</span></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tags</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {selectedConversation.tags.map((t, i) => (
              <span key={i} style={{ fontSize: '10px', color: 'var(--text-secondary)', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', padding: '2px 8px', borderRadius: '4px' }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Notes</span>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
            {selectedConversation.notes}
          </div>
        </div>
      </div>

      {/* ==========================================
          NEW CONVERSATION MODAL
          ========================================== */}
      {isNewConvOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handleCreateNewConversation}
            className="glass-card" 
            style={{ width: '500px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Start New Conversation</h3>
              </div>
              <button type="button" onClick={() => setIsNewConvOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Contact Name *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Johnathan Stark"
                value={newConvForm.name}
                onChange={e => setNewConvForm(prev => ({ ...prev, name: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Preferred Channel *</label>
              <select 
                value={newConvForm.channel}
                onChange={e => setNewConvForm(prev => ({ ...prev, channel: e.target.value }))}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Telegram">Telegram</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Department Category *</label>
              <select 
                value={newConvForm.category}
                onChange={e => setNewConvForm(prev => ({ ...prev, category: e.target.value }))}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="Sales">Sales & Pricing</option>
                <option value="Support">Technical Support</option>
                <option value="Billing">Billing & Subscriptions</option>
                <option value="Marketing">Marketing Campaigns</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Initial Message *</label>
              <textarea 
                required
                rows={4}
                placeholder="Type the message to send..."
                value={newConvForm.message}
                onChange={e => setNewConvForm(prev => ({ ...prev, message: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'sans-serif', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setIsNewConvOpen(false)} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ backgroundColor: 'var(--primary)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Dispatched Connect</button>
            </div>
          </form>
        </div>
      )}

      {/* ==========================================
          FILTER INBOX MODAL
          ========================================== */}
      {isFilterOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <div 
            className="glass-card" 
            style={{ width: '400px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Filter Inbox Inbox</h3>
              </div>
              <button type="button" onClick={() => setIsFilterOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Filter by Channel</label>
              <select 
                value={filterChannel}
                onChange={e => setFilterChannel(e.target.value)}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="all">All Channels</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Telegram">Telegram</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Filter by Department</label>
              <select 
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="all">All Departments</option>
                <option value="Sales">Sales & Pricing</option>
                <option value="Support">Technical Support</option>
                <option value="Billing">Billing & Subscriptions</option>
                <option value="Marketing">Marketing Campaigns</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button onClick={() => { setFilterChannel('all'); setFilterCategory('all'); setIsFilterOpen(false); }} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Reset Filters</button>
              <button onClick={() => setIsFilterOpen(false)} style={{ backgroundColor: 'var(--primary)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Apply Filters</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

/* ----------------------------------------------------
   2. COMMUNICATION EMAIL
   ---------------------------------------------------- */
export const CommunicationEmail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates' | 'sent' | 'drafts'>('campaigns');
  
  // Modals state
  const [isComposing, setIsComposing] = useState(false);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);

  // Email Campaigns state
  const [campaigns, setCampaigns] = useState([
    { name: 'Q3 Product Release Announcement', sent: '12,450', delivered: '99.2%', openRate: '24.5%', status: 'Completed', color: 'var(--success)' },
    { name: 'Weekly Newsletter - Tech Updates', sent: '24,800', delivered: '98.9%', openRate: '22.1%', status: 'Sending', color: 'var(--primary)' }
  ]);

  // Email Templates state
  const [templates, setTemplates] = useState([
    { id: 'welcome_seq', name: 'Welcome Sequence (Onboarding)', subject: 'Welcome to Kiaan OS - Let\'s get started!', category: 'Marketing', lastUsed: '2 hours ago' },
    { id: 'q3_update', name: 'Q3 Product Updates (Newsletter)', subject: 'Introducing our brand new unified workspaces', category: 'Product Update', lastUsed: '5 days ago' },
    { id: 'cart_recovery', name: 'Abandoned Cart Recovery', subject: 'Did you leave something behind?', category: 'Transactional', lastUsed: 'Never' },
    { id: 'follow_up', name: 'Meeting Schedule Follow-up', subject: 'Great speaking with you today', category: 'Sales', lastUsed: '1 day ago' }
  ]);

  // Sent emails log
  const [sent, setSent] = useState([
    { recipient: 'sarah.j@enterprise.com', subject: 'RE: Custom Enterprise Upgrade Quote', date: 'Today, 10:45 AM', status: 'Delivered', color: 'var(--success)' },
    { recipient: 'm.vance@cloudsystem.io', subject: 'API Integration sandbox credentials', date: 'Yesterday, 4:12 PM', status: 'Delivered', color: 'var(--success)' }
  ]);

  // Drafts
  const [drafts] = useState([
    { subject: 'Draft: Product Demo Invitation', recipient: 'Prospects Segment A', date: 'Saved 3 hours ago' },
    { subject: 'Draft: Monthly billing invoice check', recipient: 'billing@cloudsystem.io', date: 'Saved Yesterday' }
  ]);

  // Compose Email form data
  const [composeForm, setComposeForm] = useState({
    name: '',
    recipient: 'All Qualified Leads',
    customRecipient: '',
    subject: '',
    templateId: '',
    body: ''
  });

  // Create Template form data
  const [templateForm, setTemplateForm] = useState({
    name: '',
    subject: '',
    category: 'Marketing',
    body: ''
  });

  // Listen to the global CTA button click events dispatched from App.tsx
  useEffect(() => {
    const handleCompose = () => {
      setIsComposing(true);
    };
    const handleManageTemplates = () => {
      setActiveTab('templates');
    };

    window.addEventListener('email-compose', handleCompose);
    window.addEventListener('email-manage-templates', handleManageTemplates);

    return () => {
      window.removeEventListener('email-compose', handleCompose);
      window.removeEventListener('email-manage-templates', handleManageTemplates);
    };
  }, []);

  const emailStats = [
    { label: 'Emails Sent', val: (142450 + campaigns.length).toLocaleString(), sub: '+12.4% vs last week', color: 'var(--primary)' },
    { label: 'Open Rate', val: '24.5%', sub: 'Target: > 20%', color: 'var(--success)' },
    { label: 'Click-Through Rate', val: '4.8%', sub: 'Target: > 3.5%', color: 'var(--info)' },
    { label: 'Bounces', val: '0.8%', sub: 'Healthy target: < 2%', color: 'var(--danger)' }
  ];

  // Autofill body when template changes in compose form
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tId = e.target.value;
    const selectedTemplate = templates.find(t => t.id === tId);
    setComposeForm(prev => ({
      ...prev,
      templateId: tId,
      subject: selectedTemplate ? selectedTemplate.subject : prev.subject,
      body: selectedTemplate 
        ? `Hello,\n\nThis is a pre-configured layout using the "${selectedTemplate.name}" template.\n\nBest regards,\nThe Kiaan Team` 
        : prev.body
    }));
  };

  // Submit new campaign
  const handleSendCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeForm.name || !composeForm.subject || !composeForm.body) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Please fill in all required fields.' }));
      return;
    }

    const targetRecipient = composeForm.recipient === 'custom' ? composeForm.customRecipient : composeForm.recipient;
    
    // Add to campaigns
    setCampaigns(prev => [
      {
        name: composeForm.name,
        sent: '1',
        delivered: '100%',
        openRate: '0%',
        status: 'Sending',
        color: 'var(--primary)'
      },
      ...prev
    ]);

    // Add to sent log
    setSent(prev => [
      {
        recipient: targetRecipient || 'Campaign Recipients',
        subject: composeForm.subject,
        date: 'Just now',
        status: 'Delivered',
        color: 'var(--success)'
      },
      ...prev
    ]);

    // Trigger success notification
    window.dispatchEvent(new CustomEvent('show-toast', { 
      detail: `Campaign "${composeForm.name}" dispatched successfully!` 
    }));

    // Reset and close
    setComposeForm({
      name: '',
      recipient: 'All Qualified Leads',
      customRecipient: '',
      subject: '',
      templateId: '',
      body: ''
    });
    setIsComposing(false);
  };

  // Submit new template
  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateForm.name || !templateForm.subject || !templateForm.body) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Please fill in all template fields.' }));
      return;
    }

    const newId = templateForm.name.toLowerCase().replace(/\s+/g, '_');
    setTemplates(prev => [
      ...prev,
      {
        id: newId,
        name: templateForm.name,
        subject: templateForm.subject,
        category: templateForm.category,
        lastUsed: 'Never'
      }
    ]);

    window.dispatchEvent(new CustomEvent('show-toast', { 
      detail: `Template "${templateForm.name}" created successfully!` 
    }));

    setTemplateForm({
      name: '',
      subject: '',
      category: 'Marketing',
      body: ''
    });
    setIsCreatingTemplate(false);
  };

  // Trigger compose with preset template
  const useTemplateForCompose = (template: typeof templates[0]) => {
    setComposeForm({
      name: `Campaign - ${template.name}`,
      recipient: 'All Qualified Leads',
      customRecipient: '',
      subject: template.subject,
      templateId: template.id,
      body: `Hello,\n\nThis is a customized layout using the "${template.name}" template.\n\nBest regards,\nThe Kiaan Team`
    });
    setIsComposing(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top statistics cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {emailStats.map((stat, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</span>
            <div style={{ fontSize: '26px', fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.val}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs Row */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', gap: '24px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
          {['Campaigns', 'Templates', 'Sent', 'Drafts'].map((t) => (
            <button 
              key={t}
              onClick={() => setActiveTab(t.toLowerCase() as any)}
              style={{
                padding: '12px 4px', fontSize: '13px', border: 'none', background: 'none', cursor: 'pointer',
                fontWeight: 600,
                color: activeTab === t.toLowerCase() ? 'var(--primary)' : 'var(--text-secondary)',
                borderBottom: activeTab === t.toLowerCase() ? '2px solid var(--primary)' : '2px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', paddingBottom: '8px' }}>
          <button 
            onClick={() => setIsCreatingTemplate(true)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Plus size={14} /> New Template
          </button>
          <button 
            onClick={() => setIsComposing(true)}
            style={{
              backgroundColor: 'var(--primary)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Send size={14} /> Compose Email
          </button>
        </div>
      </div>

      {/* Main Tab Contents */}
      <div className="glass-card">
        {activeTab === 'campaigns' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Email Campaigns Registry</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    {['Campaign Name', 'Sent', 'Delivered', 'Open Rate', 'Status'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 700 }}>{c.name}</td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{c.sent}</td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{c.delivered}</td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{c.openRate}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ background: `${c.color}15`, color: c.color, padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700 }}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Available Email Templates</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    {['Template Name', 'Subject Line', 'Category', 'Last Used', 'Action'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {templates.map((t, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 700 }}>{t.name}</td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{t.subject}"</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', fontSize: '11.5px', border: '1px solid var(--border-color)' }}>
                          {t.category}
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{t.lastUsed}</td>
                      <td style={{ padding: '12px' }}>
                        <button 
                          onClick={() => useTemplateForCompose(t)}
                          style={{
                            backgroundColor: 'rgba(99,102,241,0.15)',
                            border: '1px solid rgba(99,102,241,0.3)',
                            color: '#818cf8',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          Use Template
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sent' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Sent Emails Ledger</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    {['Recipient', 'Subject Line', 'Timestamp', 'Status'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sent.map((s, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px', color: '#818cf8', fontWeight: 600 }}>{s.recipient}</td>
                      <td style={{ padding: '12px', color: 'var(--text-primary)' }}>{s.subject}</td>
                      <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{s.date}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ background: `${s.color}15`, color: s.color, padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700 }}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'drafts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Email Drafts</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    {['Draft Subject', 'Target Audience / Recipient', 'Last Auto-Saved', 'Action'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {drafts.map((d, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>{d.subject}</td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{d.recipient}</td>
                      <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{d.date}</td>
                      <td style={{ padding: '12px' }}>
                        <button 
                          onClick={() => {
                            setComposeForm({
                              name: 'Resume Draft Campaign',
                              recipient: d.recipient.includes('@') ? 'custom' : 'All Qualified Leads',
                              customRecipient: d.recipient.includes('@') ? d.recipient : '',
                              subject: d.subject.replace('Draft: ', ''),
                              templateId: '',
                              body: 'Write draft campaign body content here...'
                            });
                            setIsComposing(true);
                          }}
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          Continue Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ==========================================
          COMPOSE EMAIL MODAL
          ========================================== */}
      {isComposing && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handleSendCampaign}
            className="glass-card" 
            style={{ width: '560px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={18} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Compose Email Campaign</h3>
              </div>
              <button type="button" onClick={() => setIsComposing(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {/* Campaign Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Campaign Name *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. July Newsletter - Version 2"
                value={composeForm.name}
                onChange={e => setComposeForm(prev => ({ ...prev, name: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            {/* Recipients Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Recipients Target *</label>
              <select 
                value={composeForm.recipient}
                onChange={e => setComposeForm(prev => ({ ...prev, recipient: e.target.value }))}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="All Qualified Leads">All Qualified Leads (1,424 contacts)</option>
                <option value="Enterprise Customers Segment">Enterprise Customers Segment (280 contacts)</option>
                <option value="Pro Growth Segment">Pro Growth Segment (640 contacts)</option>
                <option value="custom">Send to Specific Custom Email Address</option>
              </select>
            </div>

            {/* Custom Recipient input */}
            {composeForm.recipient === 'custom' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Recipient Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  value={composeForm.customRecipient}
                  onChange={e => setComposeForm(prev => ({ ...prev, customRecipient: e.target.value }))}
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
                />
              </div>
            )}

            {/* Preconfigured Template Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Pre-configured Template (Optional)</label>
              <select 
                value={composeForm.templateId}
                onChange={handleTemplateChange}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="">-- Do not use a template (Plain campaign layout) --</option>
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Subject Line *</label>
              <input 
                type="text" 
                required
                placeholder="Enter email subject line"
                value={composeForm.subject}
                onChange={e => setComposeForm(prev => ({ ...prev, subject: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            {/* Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Message Content Body *</label>
              <textarea 
                required
                rows={5}
                placeholder="Write your email body content here..."
                value={composeForm.body}
                onChange={e => setComposeForm(prev => ({ ...prev, body: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'sans-serif', resize: 'vertical' }}
              />
            </div>

            {/* Actions footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button 
                type="button" 
                onClick={() => setIsComposing(false)}
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                style={{ backgroundColor: 'var(--primary)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Send size={13} /> Dispatched Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ==========================================
          CREATE TEMPLATE MODAL
          ========================================== */}
      {isCreatingTemplate && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handleCreateTemplate}
            className="glass-card" 
            style={{ width: '500px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layout size={18} style={{ color: 'var(--accent)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Create Email Template</h3>
              </div>
              <button type="button" onClick={() => setIsCreatingTemplate(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {/* Template Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Template Name *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Feedback Request Template"
                value={templateForm.name}
                onChange={e => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            {/* Category */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Category *</label>
              <select 
                value={templateForm.category}
                onChange={e => setTemplateForm(prev => ({ ...prev, category: e.target.value }))}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="Marketing">Marketing</option>
                <option value="Product Update">Product Update</option>
                <option value="Transactional">Transactional</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            {/* Default Subject line */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Default Subject Line *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Your opinion matters to us"
                value={templateForm.subject}
                onChange={e => setTemplateForm(prev => ({ ...prev, subject: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            {/* Template Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Template Layout Body *</label>
              <textarea 
                required
                rows={5}
                placeholder="Write template boilerplate text here..."
                value={templateForm.body}
                onChange={e => setTemplateForm(prev => ({ ...prev, body: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'sans-serif', resize: 'vertical' }}
              />
            </div>

            {/* Actions footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button 
                type="button" 
                onClick={() => setIsCreatingTemplate(false)}
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                style={{ backgroundColor: 'var(--accent)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus size={13} /> Save Template
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   3. COMMUNICATION WHATSAPP
   ---------------------------------------------------- */
export const CommunicationWhatsApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates'>('templates');
  
  // Modals state
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isTemplateEditorOpen, setIsTemplateEditorOpen] = useState(false);

  // Form states
  const [broadcastForm, setBroadcastForm] = useState({
    name: 'Flash Sale Alert',
    templateId: 'shipping_update_v1',
    segment: 'All Qualified Leads',
    messageOverride: ''
  });

  const [templateForm, setTemplateForm] = useState({
    name: '',
    category: 'Utility',
    language: 'en_US',
    bodyText: ''
  });

  const [templates, setTemplates] = useState([
    { name: 'shipping_update_v1', category: 'Utility', language: 'en_US', status: 'Approved', body: 'Your package has been dispatched. Track details: {{1}}' },
    { name: 'payment_reminder_v2', category: 'Utility', language: 'en_US', status: 'Approved', body: 'Friendly reminder that invoice {{1}} of USD {{2}} is due.' },
    { name: 'welcome_onboard_v1', category: 'Marketing', language: 'en_US', status: 'Pending Review', body: 'Welcome to Kiaan Software Services! Thank you for joining.' }
  ]);

  const [broadcasts, setBroadcasts] = useState([
    { name: 'Flash Sale Broadcast', sent: '8,920', delivered: '98.5%', readRate: '92.1%', status: 'Active', date: 'Jul 4, 2026' },
    { name: 'Weekly Feature Digest', sent: '6,450', delivered: '99.0%', readRate: '88.4%', status: 'Completed', date: 'Jun 28, 2026' }
  ]);

  // Wire CTA Event listeners
  useEffect(() => {
    const handleNewBroadcast = () => setIsBroadcastOpen(true);
    const handleTemplateEdit = () => setIsTemplateEditorOpen(true);

    window.addEventListener('whatsapp-new-broadcast', handleNewBroadcast);
    window.addEventListener('whatsapp-template-edit', handleTemplateEdit);

    return () => {
      window.removeEventListener('whatsapp-new-broadcast', handleNewBroadcast);
      window.removeEventListener('whatsapp-template-edit', handleTemplateEdit);
    };
  }, []);

  const handleSendBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBroadcast = {
      name: broadcastForm.name,
      sent: '1,424',
      delivered: '100%',
      readRate: 'Pending',
      status: 'Active',
      date: 'Just now'
    };
    setBroadcasts(prev => [newBroadcast, ...prev]);
    setIsBroadcastOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `WhatsApp Broadcast "${broadcastForm.name}" dispatched successfully!` }));
  };

  const handleCreateTemplateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateForm.name || !templateForm.bodyText) return;
    const newTpl = {
      name: templateForm.name.toLowerCase().replace(/\s+/g, '_'),
      category: templateForm.category,
      language: templateForm.language,
      status: 'Approved',
      body: templateForm.bodyText
    };
    setTemplates(prev => [...prev, newTpl]);
    setIsTemplateEditorOpen(false);
    setTemplateForm({ name: '', category: 'Utility', language: 'en_US', bodyText: '' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `WhatsApp Template "${newTpl.name}" created and approved!` }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top statistics cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Broadcasts Sent', val: '45,120', sub: 'Last 30 days', color: 'var(--primary)' },
          { label: 'Read Receipt Rate', val: '92.1%', sub: 'Target: > 85%', color: 'var(--success)' },
          { label: 'Opt-out Rate', val: '0.4%', sub: 'Healthy target: < 1%', color: 'var(--danger)' }
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</span>
            <div style={{ fontSize: '24px', fontWeight: 800, color: stat.color, marginTop: '4px' }}>{stat.val}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs Row */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', gap: '24px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
          {['Templates', 'Campaigns / Broadcasts'].map((t) => {
            const val = t.toLowerCase().includes('template') ? 'templates' : 'campaigns';
            return (
              <button 
                key={val}
                onClick={() => setActiveTab(val as any)}
                style={{
                  padding: '12px 4px', fontSize: '13px', border: 'none', background: 'none', cursor: 'pointer',
                  fontWeight: 600,
                  color: activeTab === val ? 'var(--primary)' : 'var(--text-secondary)',
                  borderBottom: activeTab === val ? '2px solid var(--primary)' : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '8px', paddingBottom: '8px' }}>
          <button 
            onClick={() => setIsTemplateEditorOpen(true)}
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '6px 12px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}
          >
            Templates Editor
          </button>
          <button 
            onClick={() => setIsBroadcastOpen(true)}
            style={{ backgroundColor: 'var(--primary)', border: 'none', color: '#ffffff', borderRadius: '6px', padding: '6px 12px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}
          >
            New Broadcast
          </button>
        </div>
      </div>

      {/* Tables list */}
      <div className="glass-card">
        {activeTab === 'templates' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>WhatsApp Message Templates</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '10px 12px' }}>Template Name</th>
                    <th style={{ padding: '10px 12px' }}>Category</th>
                    <th style={{ padding: '10px 12px' }}>Language</th>
                    <th style={{ padding: '10px 12px' }}>Approval Status</th>
                    <th style={{ padding: '10px 12px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((tpl, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 700 }}>{tpl.name}</td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{tpl.category}</td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{tpl.language}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ 
                          background: tpl.status === 'Approved' ? 'var(--success-light)' : 'var(--warning-light)', 
                          color: tpl.status === 'Approved' ? 'var(--success)' : 'var(--warning)', 
                          padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 
                        }}>
                          {tpl.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <button 
                          onClick={() => {
                            setBroadcastForm(prev => ({ ...prev, templateId: tpl.name }));
                            setIsBroadcastOpen(true);
                          }}
                          style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '4px 8px', borderRadius: '4px', fontSize: '11.5px', cursor: 'pointer' }}
                        >
                          Use Broadcast
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Active Broadcasts</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '10px 12px' }}>Broadcast Name</th>
                    <th style={{ padding: '10px 12px' }}>Audience Size</th>
                    <th style={{ padding: '10px 12px' }}>Delivered</th>
                    <th style={{ padding: '10px 12px' }}>Read Rate</th>
                    <th style={{ padding: '10px 12px' }}>Status</th>
                    <th style={{ padding: '10px 12px' }}>Launch Date</th>
                  </tr>
                </thead>
                <tbody>
                  {broadcasts.map((br, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 700 }}>{br.name}</td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{br.sent}</td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{br.delivered}</td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{br.readRate}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ 
                          background: br.status === 'Active' ? 'var(--info-light)' : 'rgba(255,255,255,0.03)', 
                          color: br.status === 'Active' ? 'var(--info)' : 'var(--text-muted)', 
                          padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 
                        }}>
                          {br.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{br.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ==========================================
          WHATSAPP BROADCAST MODAL
          ========================================== */}
      {isBroadcastOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handleSendBroadcastSubmit}
            className="glass-card" 
            style={{ width: '500px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Send size={18} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>New WhatsApp Broadcast</h3>
              </div>
              <button type="button" onClick={() => setIsBroadcastOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Broadcast Name *</label>
              <input 
                type="text" 
                required
                value={broadcastForm.name}
                onChange={e => setBroadcastForm(prev => ({ ...prev, name: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Choose WhatsApp Template *</label>
              <select 
                value={broadcastForm.templateId}
                onChange={e => setBroadcastForm(prev => ({ ...prev, templateId: e.target.value }))}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                {templates.filter(t => t.status === 'Approved').map(t => (
                  <option key={t.name} value={t.name}>{t.name} (Approved)</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Target Audience Segment *</label>
              <select 
                value={broadcastForm.segment}
                onChange={e => setBroadcastForm(prev => ({ ...prev, segment: e.target.value }))}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="All Qualified Leads">All Qualified Leads (1,424 numbers)</option>
                <option value="Enterprise Customers Segment">Enterprise Customers (280 numbers)</option>
                <option value="Pro Growth Segment">Pro Growth Segment (640 numbers)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Message Dynamic Variables Override</label>
              <input 
                type="text" 
                placeholder="e.g. Variable 1, Variable 2"
                value={broadcastForm.messageOverride}
                onChange={e => setBroadcastForm(prev => ({ ...prev, messageOverride: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setIsBroadcastOpen(false)} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ backgroundColor: 'var(--primary)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Dispatch Broadcast</button>
            </div>
          </form>
        </div>
      )}

      {/* ==========================================
          WHATSAPP TEMPLATE EDITOR MODAL
          ========================================== */}
      {isTemplateEditorOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handleCreateTemplateSubmit}
            className="glass-card" 
            style={{ width: '520px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layout size={18} style={{ color: 'var(--accent)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Create WhatsApp Template</h3>
              </div>
              <button type="button" onClick={() => setIsTemplateEditorOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Template Identifier Name *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. promo_discount_v1"
                value={templateForm.name}
                onChange={e => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Category *</label>
                <select 
                  value={templateForm.category}
                  onChange={e => setTemplateForm(prev => ({ ...prev, category: e.target.value }))}
                  style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
                >
                  <option value="Utility">Utility</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Authentication">Authentication (OTP)</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Language *</label>
                <select 
                  value={templateForm.language}
                  onChange={e => setTemplateForm(prev => ({ ...prev, language: e.target.value }))}
                  style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
                >
                  <option value="en_US">English (US)</option>
                  <option value="en_GB">English (UK)</option>
                  <option value="es_ES">Spanish (ES)</option>
                  <option value="fr_FR">French (FR)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Template Body Text * (Use {"{{1}}"} style variables)</label>
              <textarea 
                required
                rows={4}
                placeholder="e.g. Hello {{1}}, your order {{2}} has been confirmed."
                value={templateForm.bodyText}
                onChange={e => setTemplateForm(prev => ({ ...prev, bodyText: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'sans-serif', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setIsTemplateEditorOpen(false)} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ backgroundColor: 'var(--accent)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Save & Approve</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   4. COMMUNICATION SMS
   ---------------------------------------------------- */
export const CommunicationSMS: React.FC = () => {
  // Modals state
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Form states
  const [campaignForm, setCampaignForm] = useState({
    name: 'Discount Code Alert (July 4th)',
    target: 'All Qualified Leads',
    smsText: ''
  });

  const [settingsForm, setSettingsForm] = useState({
    twilioSid: 'AC98248194aef982847',
    twilioToken: '••••••••••••••••••••••••••••••••',
    smsSenderId: 'KIAANS'
  });

  const [campaigns, setCampaigns] = useState([
    { name: 'Discount Code Alert (July 4th)', recipientCount: '8,450', delivered: '98.5%', status: 'Completed', date: 'Jul 4, 2026' },
    { name: 'Onboarding Reminder SMS', recipientCount: '1,280', delivered: '99.1%', status: 'Active', date: 'Jul 6, 2026' }
  ]);

  // Wire CTA Event listeners
  useEffect(() => {
    const handleNewCampaign = () => setIsNewCampaignOpen(true);
    const handleSettings = () => setIsSettingsOpen(true);

    window.addEventListener('sms-new-campaign', handleNewCampaign);
    window.addEventListener('sms-settings', handleSettings);

    return () => {
      window.removeEventListener('sms-new-campaign', handleNewCampaign);
      window.removeEventListener('sms-settings', handleSettings);
    };
  }, []);

  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignForm.name || !campaignForm.smsText) return;
    const newCamp = {
      name: campaignForm.name,
      recipientCount: '1,424',
      delivered: 'Pending',
      status: 'Active',
      date: 'Just now'
    };
    setCampaigns(prev => [newCamp, ...prev]);
    setIsNewCampaignOpen(false);
    setCampaignForm({ name: '', target: 'All Qualified Leads', smsText: '' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `SMS Campaign "${newCamp.name}" launched!` }));
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSettingsOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'SMS Twilio Gateway configuration saved!' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {[
          { label: 'SMS Sent Today', val: '12,850', sub: '98.2% delivered', color: 'var(--primary)' },
          { label: 'Failed Deliveries', val: '1.8%', sub: 'Target: < 2%', color: 'var(--danger)' },
          { label: 'Total SMS Campaigns', val: '45', sub: 'Active: 2', color: 'var(--accent)' }
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</span>
            <div style={{ fontSize: '24px', fontWeight: 800, color: stat.color, marginTop: '4px' }}>{stat.val}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0, fontWeight: 700 }}>Active Campaigns</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 12px' }}>Campaign Name</th>
                <th style={{ padding: '10px 12px' }}>Recipient Count</th>
                <th style={{ padding: '10px 12px' }}>Delivered</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
                <th style={{ padding: '10px 12px' }}>Launch Date</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((camp, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 700 }}>{camp.name}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{camp.recipientCount}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{camp.delivered}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      background: camp.status === 'Active' ? 'var(--info-light)' : 'rgba(255,255,255,0.03)', 
                      color: camp.status === 'Active' ? 'var(--info)' : 'var(--text-muted)', 
                      padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 
                    }}>
                      {camp.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{camp.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          NEW SMS CAMPAIGN MODAL
          ========================================== */}
      {isNewCampaignOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handleCampaignSubmit}
            className="glass-card" 
            style={{ width: '500px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={18} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>New SMS Campaign</h3>
              </div>
              <button type="button" onClick={() => setIsNewCampaignOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>SMS Campaign Name *</label>
              <input 
                type="text" 
                required
                value={campaignForm.name}
                onChange={e => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Recipients Segment *</label>
              <select 
                value={campaignForm.target}
                onChange={e => setCampaignForm(prev => ({ ...prev, target: e.target.value }))}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="All Qualified Leads">All Qualified Leads (1,424 contacts)</option>
                <option value="Enterprise Segment">Enterprise Customers (280 contacts)</option>
                <option value="Inactive Trial users">Inactive Trial users (180 contacts)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>SMS Message Content * (Limit: 160 characters)</label>
              <textarea 
                required
                rows={4}
                maxLength={160}
                placeholder="Type SMS campaign content..."
                value={campaignForm.smsText}
                onChange={e => setCampaignForm(prev => ({ ...prev, smsText: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'sans-serif', resize: 'vertical' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '11px', color: 'var(--text-muted)' }}>
                {campaignForm.smsText.length}/160 chars (1 SMS message unit)
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setIsNewCampaignOpen(false)} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ backgroundColor: 'var(--primary)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Launch Campaign</button>
            </div>
          </form>
        </div>
      )}

      {/* ==========================================
          SMS SETTINGS MODAL
          ========================================== */}
      {isSettingsOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handleSettingsSubmit}
            className="glass-card" 
            style={{ width: '480px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={18} style={{ color: 'var(--accent)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>SMS Gateway Settings</h3>
              </div>
              <button type="button" onClick={() => setIsSettingsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Twilio Account SID</label>
              <input 
                type="text" 
                required
                value={settingsForm.twilioSid}
                onChange={e => setSettingsForm(prev => ({ ...prev, twilioSid: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Twilio Auth Token</label>
              <input 
                type="password" 
                required
                value={settingsForm.twilioToken}
                onChange={e => setSettingsForm(prev => ({ ...prev, twilioToken: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Default Sender AlphaID / Number</label>
              <input 
                type="text" 
                required
                value={settingsForm.smsSenderId}
                onChange={e => setSettingsForm(prev => ({ ...prev, smsSenderId: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setIsSettingsOpen(false)} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ backgroundColor: 'var(--accent)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Save Settings</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   5. COMMUNICATION TELEGRAM
   ---------------------------------------------------- */
export const CommunicationTelegram: React.FC = () => {
  // Modals state
  const [isNewBroadcastOpen, setIsNewBroadcastOpen] = useState(false);
  const [isRegisterBotOpen, setIsRegisterBotOpen] = useState(false);

  // Form states
  const [broadcastForm, setBroadcastForm] = useState({
    targetChannel: 'Kiaan Official Announcements',
    message: ''
  });

  const [botForm, setBotForm] = useState({
    username: 'KiaanSupportBot',
    token: ''
  });

  const [channels, setChannels] = useState([
    { name: 'Kiaan Official Announcements', type: 'Channel', subscribers: '12,400', bot: 'KiaanAnnounceBot', status: 'Active' },
    { name: 'Kiaan Beta Tester Community', type: 'Group', subscribers: '4,150', bot: 'KiaanSupportBot', status: 'Active' }
  ]);

  // Wire CTA Event listeners
  useEffect(() => {
    const handleNewBroadcast = () => setIsNewBroadcastOpen(true);
    const handleRegisterBot = () => setIsRegisterBotOpen(true);

    window.addEventListener('telegram-new-broadcast', handleNewBroadcast);
    window.addEventListener('telegram-register-bot', handleRegisterBot);

    return () => {
      window.removeEventListener('telegram-new-broadcast', handleNewBroadcast);
      window.removeEventListener('telegram-register-bot', handleRegisterBot);
    };
  }, []);

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastForm.message) return;
    setIsNewBroadcastOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Telegram Channel Broadcast broadcasted to ${broadcastForm.targetChannel}!` }));
  };

  const handleRegisterBotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!botForm.username || !botForm.token) return;
    const newChan = {
      name: `${botForm.username} Sync Channel`,
      type: 'Group',
      subscribers: '1',
      bot: botForm.username,
      status: 'Active'
    };
    setChannels(prev => [...prev, newChan]);
    setIsRegisterBotOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Telegram Bot @${botForm.username} registered and active!` }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Connected Bots', val: `${channels.length}`, sub: 'Active hooks synced', color: 'var(--primary)' },
          { label: 'Subscribers Linked', val: '24,150', sub: 'Across 8 channels', color: 'var(--success)' },
          { label: 'Broadcast Messages', val: '1,420', sub: 'Last 30 days', color: 'var(--accent)' }
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</span>
            <div style={{ fontSize: '24px', fontWeight: 800, color: stat.color, marginTop: '4px' }}>{stat.val}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0, fontWeight: 700 }}>Active Channels & Groups</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 12px' }}>Group/Channel Name</th>
                <th style={{ padding: '10px 12px' }}>Type</th>
                <th style={{ padding: '10px 12px' }}>Subscribers</th>
                <th style={{ padding: '10px 12px' }}>Bot Assigned</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {channels.map((chan, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 700 }}>{chan.name}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{chan.type}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{chan.subscribers}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{chan.bot}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      background: 'var(--success-light)', color: 'var(--success)', 
                      padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 
                    }}>
                      {chan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          TELEGRAM BROADCAST MODAL
          ========================================== */}
      {isNewBroadcastOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handleBroadcastSubmit}
            className="glass-card" 
            style={{ width: '500px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>New Telegram Broadcast</h3>
              </div>
              <button type="button" onClick={() => setIsNewBroadcastOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Target Group / Channel *</label>
              <select 
                value={broadcastForm.targetChannel}
                onChange={e => setBroadcastForm(prev => ({ ...prev, targetChannel: e.target.value }))}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                {channels.map(chan => (
                  <option key={chan.name} value={chan.name}>{chan.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Message Content *</label>
              <textarea 
                required
                rows={5}
                placeholder="Write your telegram broadcast Markdown text here..."
                value={broadcastForm.message}
                onChange={e => setBroadcastForm(prev => ({ ...prev, message: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'sans-serif', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setIsNewBroadcastOpen(false)} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ backgroundColor: 'var(--primary)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Launch Broadcast</button>
            </div>
          </form>
        </div>
      )}

      {/* ==========================================
          TELEGRAM REGISTER BOT MODAL
          ========================================== */}
      {isRegisterBotOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handleRegisterBotSubmit}
            className="glass-card" 
            style={{ width: '480px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={18} style={{ color: 'var(--accent)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Register Telegram Bot</h3>
              </div>
              <button type="button" onClick={() => setIsRegisterBotOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Telegram Bot Username * (without @)</label>
              <input 
                type="text" 
                required
                placeholder="e.g. MyBrandSupportBot"
                value={botForm.username}
                onChange={e => setBotForm(prev => ({ ...prev, username: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Telegram Bot Father API Token *</label>
              <input 
                type="password" 
                required
                placeholder="e.g. 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                value={botForm.token}
                onChange={e => setBotForm(prev => ({ ...prev, token: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setIsRegisterBotOpen(false)} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ backgroundColor: 'var(--accent)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Register Bot</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   6. COMMUNICATION LIVE CHAT
   ---------------------------------------------------- */
export const CommunicationLiveChat: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    maxSlots: 3,
    fallbackTimeout: 60,
    offlineAutoReply: 'We are currently offline. Please leave your email and query!'
  });

  const [operators, setOperators] = useState([
    { name: 'Alex Mercer', department: 'Sales & Pricing', activeSlots: '2 / 3', status: 'Online' },
    { name: 'Jessica Patel', department: 'Technical Support', activeSlots: '1 / 3', status: 'Online' },
    { name: 'Marcus Vance', department: 'Billing Support', activeSlots: '0 / 3', status: 'Offline' }
  ]);

  // Wire CTA Event listeners
  useEffect(() => {
    const handleGoOnline = () => {
      setIsOnline(prev => {
        const next = !prev;
        window.dispatchEvent(new CustomEvent('show-toast', { detail: next ? 'You are now ONLINE for live chat sessions.' : 'You are now OFFLINE for live chat.' }));
        // Update Alex Mercer status in list
        setOperators(prevOps => prevOps.map(op => {
          if (op.name === 'Alex Mercer') {
            return { ...op, status: next ? 'Online' : 'Offline' };
          }
          return op;
        }));
        return next;
      });
    };

    const handleSettings = () => setIsSettingsOpen(true);

    window.addEventListener('chat-go-online', handleGoOnline);
    window.addEventListener('chat-settings', handleSettings);

    return () => {
      window.removeEventListener('chat-go-online', handleGoOnline);
      window.removeEventListener('chat-settings', handleSettings);
    };
  }, []);

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSettingsOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Live Chat department routing settings applied!' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Operator State', val: isOnline ? 'Online' : 'Offline', sub: isOnline ? 'Accepting chats' : 'Queue paused', color: isOnline ? 'var(--success)' : 'var(--danger)' },
          { label: 'Online Operators Count', val: `${operators.filter(op => op.status === 'Online').length} / ${operators.length}`, sub: 'Operators synced', color: 'var(--primary)' },
          { label: 'Average Wait Time', val: '45 seconds', sub: 'SLA target: < 2 mins', color: 'var(--accent)' }
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</span>
            <div style={{ fontSize: '24px', fontWeight: 800, color: stat.color, marginTop: '4px' }}>{stat.val}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0, fontWeight: 700 }}>Active Operators Queue</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 12px' }}>Operator</th>
                <th style={{ padding: '10px 12px' }}>Department</th>
                <th style={{ padding: '10px 12px' }}>Active Slots</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {operators.map((op, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 700 }}>{op.name}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{op.department}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{op.activeSlots}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      background: op.status === 'Online' ? 'var(--success-light)' : 'var(--danger-light)', 
                      color: op.status === 'Online' ? 'var(--success)' : 'var(--danger)', 
                      padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 
                    }}>
                      {op.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          LIVE CHAT SETTINGS MODAL
          ========================================== */}
      {isSettingsOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handleSettingsSubmit}
            className="glass-card" 
            style={{ width: '480px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={18} style={{ color: 'var(--accent)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Department & SLA Routing Settings</h3>
              </div>
              <button type="button" onClick={() => setIsSettingsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Max Chats Allowed per Operator *</label>
              <input 
                type="number" 
                required
                value={settingsForm.maxSlots}
                onChange={e => setSettingsForm(prev => ({ ...prev, maxSlots: parseInt(e.target.value) || 3 }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>SLA Wait Timeout (seconds)</label>
              <input 
                type="number" 
                required
                value={settingsForm.fallbackTimeout}
                onChange={e => setSettingsForm(prev => ({ ...prev, fallbackTimeout: parseInt(e.target.value) || 60 }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Offline Gateway Custom Auto-Reply Message</label>
              <textarea 
                required
                rows={3}
                value={settingsForm.offlineAutoReply}
                onChange={e => setSettingsForm(prev => ({ ...prev, offlineAutoReply: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'sans-serif', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setIsSettingsOpen(false)} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ backgroundColor: 'var(--accent)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Apply & Sync</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   7. COMMUNICATION AI CHATBOT
   ---------------------------------------------------- */
export const CommunicationAIChatbot: React.FC = () => {
  // Modals state
  const [isTrainOpen, setIsTrainOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  // Form states
  const [trainForm, setTrainForm] = useState({
    name: '',
    type: 'URL Link',
    payload: ''
  });

  const [promptForm, setPromptForm] = useState({
    persona: 'You are Kiaan AI, a helpful, polite customer success agent. Provide troubleshooting guides and support tickets resolution parameters.',
    temperature: 0.2
  });

  const [knowledgeBases, setKnowledgeBases] = useState([
    { name: 'Default System FAQs & Policies', files: '45 entries', lastUpdated: 'Yesterday', status: 'Synced' },
    { name: 'API Endpoint Documentation v3', files: '12 entries', lastUpdated: '3 days ago', status: 'Synced' }
  ]);

  // Wire CTA Event listeners
  useEffect(() => {
    const handleTrain = () => setIsTrainOpen(true);
    const handlePrompt = () => setIsPromptOpen(true);

    window.addEventListener('bot-train-model', handleTrain);
    window.addEventListener('bot-prompt-settings', handlePrompt);

    return () => {
      window.removeEventListener('bot-train-model', handleTrain);
      window.removeEventListener('bot-prompt-settings', handlePrompt);
    };
  }, []);

  const handleTrainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainForm.name || !trainForm.payload) return;
    const newKb = {
      name: trainForm.name,
      files: trainForm.type === 'Text Doc' ? '1 text file' : '1 sync URL link',
      lastUpdated: 'Just now',
      status: 'Indexing...'
    };
    setKnowledgeBases(prev => [...prev, newKb]);
    setIsTrainOpen(false);
    setTrainForm({ name: '', type: 'URL Link', payload: '' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `AI knowledge base indexation started for "${newKb.name}"` }));

    // Simulating index completion
    setTimeout(() => {
      setKnowledgeBases(prev => prev.map(kb => {
        if (kb.name === newKb.name) {
          return { ...kb, status: 'Synced' };
        }
        return kb;
      }));
      window.dispatchEvent(new CustomEvent('show-toast', { detail: `AI Index training complete for "${newKb.name}"!` }));
    }, 4000);
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPromptOpen(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Chatbot system instruction model parameters re-aligned!' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Conversations Handled Today', val: '4,210', sub: '92% deflection rate', color: 'var(--primary)' },
          { label: 'AI Confidence Score', val: '88.5%', sub: 'Target: > 85%', color: 'var(--success)' },
          { label: 'Handed off to Human', val: '8%', sub: 'SLA target: < 10%', color: 'var(--warning)' }
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</span>
            <div style={{ fontSize: '24px', fontWeight: 800, color: stat.color, marginTop: '4px' }}>{stat.val}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0, fontWeight: 700 }}>AI Knowledge Bases</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 12px' }}>Knowledge Base Name</th>
                <th style={{ padding: '10px 12px' }}>Documents Synced</th>
                <th style={{ padding: '10px 12px' }}>Last Updated</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {knowledgeBases.map((kb, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 700 }}>{kb.name}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{kb.files}</td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{kb.lastUpdated}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      background: kb.status === 'Synced' ? 'var(--success-light)' : 'var(--warning-light)', 
                      color: kb.status === 'Synced' ? 'var(--success)' : 'var(--warning)', 
                      padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 
                    }}>
                      {kb.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          AI TRAINING MODAL
          ========================================== */}
      {isTrainOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handleTrainSubmit}
            className="glass-card" 
            style={{ width: '500px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bot size={18} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Train AI Chatbot</h3>
              </div>
              <button type="button" onClick={() => setIsTrainOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Knowledge Source Name *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Terms of Service URL or FAQ file"
                value={trainForm.name}
                onChange={e => setTrainForm(prev => ({ ...prev, name: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Source Type *</label>
              <select 
                value={trainForm.type}
                onChange={e => setTrainForm(prev => ({ ...prev, type: e.target.value }))}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="URL Link">URL Link Scraper</option>
                <option value="Text Doc">Direct Raw Text Copy</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {trainForm.type === 'URL Link' ? 'URL Target Link *' : 'Paste Knowledge Base Content *'}
              </label>
              {trainForm.type === 'URL Link' ? (
                <input 
                  type="url" 
                  required
                  placeholder="https://kiaan.com/faq"
                  value={trainForm.payload}
                  onChange={e => setTrainForm(prev => ({ ...prev, payload: e.target.value }))}
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
                />
              ) : (
                <textarea 
                  required
                  rows={4}
                  placeholder="Paste manual knowledge text here..."
                  value={trainForm.payload}
                  onChange={e => setTrainForm(prev => ({ ...prev, payload: e.target.value }))}
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'sans-serif', resize: 'vertical' }}
                />
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setIsTrainOpen(false)} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ backgroundColor: 'var(--primary)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Dispatched Retrain</button>
            </div>
          </form>
        </div>
      )}

      {/* ==========================================
          AI PROMPT CONFIGURATION MODAL
          ========================================== */}
      {isPromptOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handlePromptSubmit}
            className="glass-card" 
            style={{ width: '500px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={18} style={{ color: 'var(--accent)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>AI System Persona Configuration</h3>
              </div>
              <button type="button" onClick={() => setIsPromptOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>System Directive Persona Instructions *</label>
              <textarea 
                required
                rows={5}
                value={promptForm.persona}
                onChange={e => setPromptForm(prev => ({ ...prev, persona: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'sans-serif', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <span>LLM Temperature Settings (Creativity vs Accuracy)</span>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{promptForm.temperature}</span>
              </label>
              <input 
                type="range" 
                min={0}
                max={1.0}
                step={0.1}
                value={promptForm.temperature}
                onChange={e => setPromptForm(prev => ({ ...prev, temperature: parseFloat(e.target.value) || 0.2 }))}
                style={{ accentColor: 'var(--accent)', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setIsPromptOpen(false)} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ backgroundColor: 'var(--accent)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Apply Prompt</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};


/* ----------------------------------------------------
   8. VOICE CALLS
   ---------------------------------------------------- */
export const CommunicationVoiceCalls: React.FC = () => {
  const [dialModal, setDialModal] = useState(false);
  const [calls, setCalls] = useState([
    { id: 'CALL-09', customer: 'Kiaan Patel', duration: '4 min 12 sec', type: 'Outbound', status: 'Completed' },
    { id: 'CALL-08', customer: 'Sarah Jenkins', duration: '12 min 45 sec', type: 'Inbound', status: 'Completed' }
  ]);
  const [form, setForm] = useState({ customer: '', type: 'Outbound' });

  useEffect(() => {
    const handlePri = () => setDialModal(true);
    const handleSec = () => triggerToast('Exporting call logs history CSV.');

    window.addEventListener('comm-pri-comm-voice', handlePri);
    window.addEventListener('comm-sec-comm-voice', handleSec);

    return () => {
      window.removeEventListener('comm-pri-comm-voice', handlePri);
      window.removeEventListener('comm-sec-comm-voice', handleSec);
    };
  }, []);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{ padding: '24px', background: 'rgba(22, 28, 38, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Voice Telephony & Twilio Active Logs</h4>
          <button style={{ backgroundColor: '#6366f1', border: 'none', color: '#ffffff', padding: '10px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setDialModal(true)}>Start Voice Call</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Call ID</th>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Customer Target</th>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Call Duration</th>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Call Direction</th>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((c, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '14px 16px', color: '#aaaaaa', fontSize: '13px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}><code>{c.id}</code></td>
                  <td style={{ padding: '14px 16px', color: '#ffffff', fontSize: '13px', fontWeight: 600, borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{c.customer}</td>
                  <td style={{ padding: '14px 16px', color: '#aaaaaa', fontSize: '13px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{c.duration}</td>
                  <td style={{ padding: '14px 16px', color: '#aaaaaa', fontSize: '13px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{c.type}</td>
                  <td style={{ padding: '14px 16px', color: '#10b981', fontSize: '13px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {dialModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#0d1117', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Start Telephony Outbound Call</h3>
              <button onClick={() => setDialModal(false)} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setCalls([...calls, { id: 'CALL-10', customer: form.customer, duration: '0 sec', type: form.type, status: 'Calling...' }]); setDialModal(false); triggerToast('Telephony outbound call dispatched.'); }} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Target Customer Name</label>
                <input type="text" onChange={e => setForm({...form, customer: e.target.value})} style={{ width: '100%', backgroundColor: '#121212', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '10px 14px', fontSize: '13px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} required />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setDialModal(false)} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff', padding: '10px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: '#6366f1', border: 'none', color: '#ffffff', padding: '10px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Dial Outbound</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   9. PUSH NOTIFICATIONS
   ---------------------------------------------------- */
export const CommunicationPushNotifications: React.FC = () => {
  const [broadcastModal, setBroadcastModal] = useState(false);
  const [campaigns, setCampaigns] = useState([
    { title: 'Promo Launch Offer', segment: 'All Registered Active', target: 'iOS/Android App', status: 'Sent' }
  ]);
  const [form, setForm] = useState({ title: '', segment: 'All Registered Active' });

  useEffect(() => {
    const handlePri = () => setBroadcastModal(true);
    const handleSec = () => triggerToast('Push campaigns templates rules exported.');

    window.addEventListener('comm-pri-comm-push', handlePri);
    window.addEventListener('comm-sec-comm-push', handleSec);

    return () => {
      window.removeEventListener('comm-pri-comm-push', handlePri);
      window.removeEventListener('comm-sec-comm-push', handleSec);
    };
  }, []);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{ padding: '24px', background: 'rgba(22, 28, 38, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Active Mobile App Push Broadcasts</h4>
          <button style={{ backgroundColor: '#6366f1', border: 'none', color: '#ffffff', padding: '10px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setBroadcastModal(true)}>Send Push Campaign</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Campaign Title</th>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Target Segment</th>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Device Platforms</th>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '14px 16px', color: '#ffffff', fontSize: '13px', fontWeight: 600, borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{c.title}</td>
                  <td style={{ padding: '14px 16px', color: '#aaaaaa', fontSize: '13px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{c.segment}</td>
                  <td style={{ padding: '14px 16px', color: '#aaaaaa', fontSize: '13px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{c.target}</td>
                  <td style={{ padding: '14px 16px', color: '#10b981', fontSize: '13px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {broadcastModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#0d1117', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Create Push Notification Campaign</h3>
              <button onClick={() => setBroadcastModal(false)} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setCampaigns([...campaigns, { title: form.title, segment: form.segment, target: 'iOS/Android App', status: 'Sent' }]); setBroadcastModal(false); triggerToast('Push campaign broadcasted successfully.'); }} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Push Alert Title</label>
                <input type="text" onChange={e => setForm({...form, title: e.target.value})} style={{ width: '100%', backgroundColor: '#121212', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '10px 14px', fontSize: '13px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Target Customer Segment</label>
                <select onChange={e => setForm({...form, segment: e.target.value})} style={{ width: '100%', backgroundColor: '#121212', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '10px 14px', fontSize: '13px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }}>
                  <option value="All Registered Active">All Registered Active App Users</option>
                  <option value="Purchased Customers 30D">Purchased Customers 30D</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setBroadcastModal(false)} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff', padding: '10px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: '#6366f1', border: 'none', color: '#ffffff', padding: '10px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Broadcast Push</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   10. IN-APP MESSAGING
   ---------------------------------------------------- */
export const CommunicationInAppMessaging: React.FC = () => {
  const [inAppModal, setInAppModal] = useState(false);
  const [messages, setMessages] = useState([
    { triggerEvent: 'User Login Dashboard', messageText: 'Welcome back! Explore our custom databases.', activeStatus: 'Enabled' }
  ]);
  const [form, setForm] = useState({ trigger: 'User Login Dashboard', text: '' });

  useEffect(() => {
    const handlePri = () => setInAppModal(true);
    const handleSec = () => triggerToast('In-app messaging settings configurations synced.');

    window.addEventListener('comm-pri-comm-inapp', handlePri);
    window.addEventListener('comm-sec-comm-inapp', handleSec);

    return () => {
      window.removeEventListener('comm-pri-comm-inapp', handlePri);
      window.removeEventListener('comm-sec-comm-inapp', handleSec);
    };
  }, []);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{ padding: '24px', background: 'rgba(22, 28, 38, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>In-App Interstitial Overlays & Banners</h4>
          <button style={{ backgroundColor: '#6366f1', border: 'none', color: '#ffffff', padding: '10px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setInAppModal(true)}>Create In-App Campaign</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>App Trigger Event</th>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Overlay Message Content</th>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>State status</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '14px 16px', color: '#ffffff', fontSize: '13px', fontWeight: 600, borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{m.triggerEvent}</td>
                  <td style={{ padding: '14px 16px', color: '#aaaaaa', fontSize: '13px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{m.messageText}</td>
                  <td style={{ padding: '14px 16px', color: '#10b981', fontSize: '13px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{m.activeStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {inAppModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#0d1117', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Configure In-App Banner</h3>
              <button onClick={() => setInAppModal(false)} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setMessages([...messages, { triggerEvent: form.trigger, messageText: form.text, activeStatus: 'Enabled' }]); setInAppModal(false); triggerToast('In-App campaign compiled and enabled.'); }} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>App Trigger Event</label>
                <select onChange={e => setForm({...form, trigger: e.target.value})} style={{ width: '100%', backgroundColor: '#121212', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '10px 14px', fontSize: '13px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }}>
                  <option value="User Login Dashboard">User Login Dashboard</option>
                  <option value="Checkout Purchase Failure">Checkout Purchase Failure</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Overlay Message Text</label>
                <input type="text" onChange={e => setForm({...form, text: e.target.value})} style={{ width: '100%', backgroundColor: '#121212', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '10px 14px', fontSize: '13px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} required />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setInAppModal(false)} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff', padding: '10px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: '#6366f1', border: 'none', color: '#ffffff', padding: '10px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Save In-App banner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   11. VIDEO MESSAGING
   ---------------------------------------------------- */
export const CommunicationVideoMessaging: React.FC = () => {
  const [videoModal, setVideoModal] = useState(false);
  const [sessions, setSessions] = useState([
    { id: 'VID-04', client: 'Starlight Globals', format: 'WebRTC Dynamic Room', status: 'Completed' }
  ]);
  const [form, setForm] = useState({ client: '' });

  useEffect(() => {
    const handlePri = () => setVideoModal(true);
    const handleSec = () => triggerToast('Video meeting analytics loaded.');

    window.addEventListener('comm-pri-comm-video', handlePri);
    window.addEventListener('comm-sec-comm-video', handleSec);

    return () => {
      window.removeEventListener('comm-pri-comm-video', handlePri);
      window.removeEventListener('comm-sec-comm-video', handleSec);
    };
  }, []);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{ padding: '24px', background: 'rgba(22, 28, 38, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Interactive Video Rooms Log</h4>
          <button style={{ backgroundColor: '#6366f1', border: 'none', color: '#ffffff', padding: '10px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setVideoModal(true)}>Initialize Video Session</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Session ID</th>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Client Host</th>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Room Protocol</th>
                <th style={{ padding: '12px 16px', color: '#888888', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '14px 16px', color: '#aaaaaa', fontSize: '13px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}><code>{s.id}</code></td>
                  <td style={{ padding: '14px 16px', color: '#ffffff', fontSize: '13px', fontWeight: 600, borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{s.client}</td>
                  <td style={{ padding: '14px 16px', color: '#aaaaaa', fontSize: '13px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{s.format}</td>
                  <td style={{ padding: '14px 16px', color: '#10b981', fontSize: '13px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {videoModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#0d1117', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Initialize Video Room Session</h3>
              <button onClick={() => setVideoModal(false)} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setSessions([...sessions, { id: 'VID-05', client: form.client, format: 'WebRTC Dynamic Room', status: 'Connecting...' }]); setVideoModal(false); triggerToast('Video meeting room initialized.'); }} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Client Organization</label>
                <input type="text" onChange={e => setForm({...form, client: e.target.value})} style={{ width: '100%', backgroundColor: '#121212', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '10px 14px', fontSize: '13px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} required />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setVideoModal(false)} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff', padding: '10px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: '#6366f1', border: 'none', color: '#ffffff', padding: '10px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Initialize Session</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
