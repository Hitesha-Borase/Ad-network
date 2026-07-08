import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Search, Filter, MessageSquare, Mail, MessageCircle, Send, 
  ChevronDown, Bot, Zap, CheckCircle, AlertCircle, 
  XCircle, Users, Download, Upload, Paperclip, Sparkles, Clock, Globe, Plus, X
} from 'lucide-react';

// App design system colors
const grayColors = {
  bgDark: '#080b11',
  bgCard: 'rgba(22, 28, 38, 0.6)',
  border: 'rgba(255,255,255,0.08)',
  borderLight: 'rgba(255,255,255,0.04)',
  textMuted: '#6b7280',
  textSecondary: '#9ca3af',
  textPrimary: '#f3f4f6',
  chartFill: '#6366f1',
  chartStroke: '#818cf8',
  chartGrid: 'rgba(255,255,255,0.05)',
  shades: ['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#0ea5e9', '#ef4444']
};

// Mock data for Conversation Volume (Last 30 Days)
const conversationVolumeData = [
  { date: '06/10', volume: 120 },
  { date: '06/13', volume: 150 },
  { date: '06/16', volume: 140 },
  { date: '06/19', volume: 180 },
  { date: '06/22', volume: 220 },
  { date: '06/25', volume: 210 },
  { date: '06/28', volume: 250 },
  { date: '07/01', volume: 290 },
  { date: '07/04', volume: 270 },
  { date: '07/07', volume: 320 }
];

// Mock data for Channel Distribution
const channelDistributionData = [
  { name: 'Email', value: 350 },
  { name: 'WhatsApp', value: 280 },
  { name: 'SMS', value: 180 },
  { name: 'Telegram', value: 120 },
  { name: 'Live Chat', value: 210 },
  { name: 'AI Chatbot', value: 450 }
];

interface CommunicationDashboardProps {
  onKpiClick?: (title: string) => void;
}

export const CommunicationDashboard: React.FC<CommunicationDashboardProps> = ({ onKpiClick }) => {
  const [inboxSearch, setInboxSearch] = useState('');
  const [activeInboxTab, setActiveInboxTab] = useState('all'); // all, unread, assigned

  const [selectedInboxId, setSelectedInboxId] = useState(1);
  const [replyText, setReplyText] = useState('');

  // Modals state
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);

  // New Message Form state
  const [newMessageForm, setNewMessageForm] = useState({
    recipient: 'Sarah Jenkins',
    customRecipient: '',
    channel: 'WhatsApp',
    message: ''
  });

  // Create Campaign Form state
  const [createCampaignForm, setCreateCampaignForm] = useState({
    name: '',
    channel: 'Email',
    audience: 'All Qualified Leads',
    subject: '',
    message: ''
  });

  // Listen for the global events dispatched by App.tsx CTA buttons
  useEffect(() => {
    const handleNewMessage = () => {
      setIsNewMessageOpen(true);
    };
    const handleCreateCampaign = () => {
      setIsCreateCampaignOpen(true);
    };

    window.addEventListener('comm-new-message', handleNewMessage);
    window.addEventListener('comm-create-campaign', handleCreateCampaign);

    return () => {
      window.removeEventListener('comm-new-message', handleNewMessage);
      window.removeEventListener('comm-create-campaign', handleCreateCampaign);
    };
  }, []);

  // Mock Omnichannel Performance Table Data
  const [performanceRows, setPerformanceRows] = useState([
    { channel: 'Email', sent: 12450, delivered: '99.2%', openRate: '24.5%', responseRate: '8.2%', status: 'Active' },
    { channel: 'WhatsApp', sent: 8920, delivered: '98.5%', openRate: '92.1%', responseRate: '46.8%', status: 'Active' },
    { channel: 'SMS', sent: 5400, delivered: '94.8%', openRate: '98.0%', responseRate: '12.4%', status: 'Active' },
    { channel: 'Telegram', sent: 3120, delivered: '99.0%', openRate: '85.4%', responseRate: '31.2%', status: 'Active' },
    { channel: 'Live Chat', sent: 1850, delivered: '100%', openRate: '100%', responseRate: '88.5%', status: 'Active' },
    { channel: 'AI Chatbot', sent: 4210, delivered: '100%', openRate: '100%', responseRate: '92.0%', status: 'Active' }
  ]);

  // Mock Inbox Conversations List
  const [inboxConversations, setInboxConversations] = useState([
    { 
      id: 1, 
      name: 'Sarah Jenkins', 
      avatar: 'SJ', 
      channel: 'WhatsApp', 
      preview: 'I would like to upgrade my enterprise subscription to the custom tier. Can we hop on a call tomorrow at 10 AM EST?', 
      time: '10:42 AM', 
      unread: 2, 
      category: 'Sales',
      email: 'sarah.j@enterprise.com',
      phone: '+1 (555) 019-2834',
      company: 'Apex Technologies',
      leadStatus: 'Qualified Prospect',
      agent: 'Alex Mercer (You)',
      tags: ['Enterprise', 'Pricing Upgrade', 'High Priority'],
      notes: 'Requested direct line callback. Prefers WhatsApp communication.',
      activities: [
        { type: 'Incoming WhatsApp', time: '10:42 AM', desc: 'Message received from client' },
        { type: 'AI Suggestion Generated', time: '10:43 AM', desc: 'Suggested response for scheduling call' },
        { type: 'Email Sent', time: 'Yesterday', desc: 'Sent Q3 proposal attachment' }
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
      preview: 'Our technical team has reviewed the API integration guidelines. We have a few questions about rate limits.', 
      time: '9:15 AM', 
      unread: 0, 
      category: 'Support',
      email: 'm.vance@cloudsystem.io',
      phone: '+1 (555) 438-9210',
      company: 'CloudSystem Inc',
      leadStatus: 'Customer',
      agent: 'Jessica Patel',
      tags: ['API Support', 'Technical'],
      notes: 'Developer relations team needs to loop in on rate limits.',
      activities: [
        { type: 'Email Received', time: '9:15 AM', desc: 'Detailed API query' }
      ],
      messages: [
        { sender: 'client', time: '9:15 AM', content: 'Our technical team has reviewed the API integration guidelines. We have a few questions about rate limits.' }
      ]
    },
    { 
      id: 3, 
      name: 'Elena Rostova', 
      avatar: 'ER', 
      channel: 'Telegram', 
      preview: 'The custom broadcast campaign looks excellent! Can we schedule it for Friday afternoon?', 
      time: 'Yesterday', 
      unread: 0, 
      category: 'Marketing',
      email: 'elena@rostov-media.com',
      phone: '+44 20 7946 0192',
      company: 'Rostov Media',
      leadStatus: 'Active Lead',
      agent: 'Alex Mercer (You)',
      tags: ['Campaign Feedback', 'Telegram Campaign'],
      notes: 'Planning Russia and Eastern European campaign coverage.',
      activities: [
        { type: 'Telegram Message', time: 'Yesterday', desc: 'Approved campaign draft' }
      ],
      messages: [
        { sender: 'client', time: 'Yesterday', content: 'The custom broadcast campaign looks excellent! Can we schedule it for Friday afternoon?' }
      ]
    },
    { 
      id: 4, 
      name: 'David Chen', 
      avatar: 'DC', 
      channel: 'Live Chat', 
      preview: 'How do I export my historical reports into CSV? The export button seems greyed out.', 
      time: 'Yesterday', 
      unread: 1, 
      category: 'Billing',
      email: 'dchen@capital-fund.com',
      phone: '+1 (555) 883-4921',
      company: 'Capital Fund LLC',
      leadStatus: 'Trial User',
      agent: 'AI Support Agent',
      tags: ['Report Export', 'UI Question'],
      notes: 'User has trial expiring in 4 days.',
      activities: [
        { type: 'Live Chat Started', time: 'Yesterday', desc: 'Initiated from pricing page' }
      ],
      messages: [
        { sender: 'client', time: 'Yesterday', content: 'How do I export my historical reports into CSV? The export button seems greyed out.' }
      ]
    }
  ]);

  // Mock Recent Activity Timeline
  const [timelineActivities, setTimelineActivities] = useState([
    { action: 'Email Sent', time: '10m ago', user: 'Alex Mercer', status: 'Delivered', icon: CheckCircle },
    { action: 'WhatsApp Delivered', time: '24m ago', user: 'System Agent', status: 'Delivered', icon: CheckCircle },
    { action: 'SMS Failed', time: '45m ago', user: 'System Gateway', status: 'Failed', icon: XCircle },
    { action: 'Telegram Message Received', time: '1h ago', user: 'Elena Rostova', status: 'Received', icon: AlertCircle },
    { action: 'Live Chat Started', time: '2h ago', user: 'David Chen', status: 'Ongoing', icon: Clock },
    { action: 'AI Chatbot Resolved Conversation', time: '3h ago', user: 'AI Bot V2', status: 'Resolved', icon: CheckCircle }
  ]);

  const filteredConversations = inboxConversations.filter(c => {
    if (inboxSearch.trim() && !c.name.toLowerCase().includes(inboxSearch.toLowerCase()) && !c.preview.toLowerCase().includes(inboxSearch.toLowerCase())) {
      return false;
    }
    if (activeInboxTab === 'unread') return c.unread > 0;
    if (activeInboxTab === 'assigned') return c.agent.includes('You');
    return true;
  });

  const selectedConversation = filteredConversations.find(c => c.id === selectedInboxId) || filteredConversations[0] || inboxConversations[0];

  const handleSend = () => {
    if (!replyText.trim()) return;
    
    // Add reply to state
    setInboxConversations(prev => prev.map(c => {
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

    setTimelineActivities(prev => [
      {
        action: `${selectedConversation.channel} Message Sent`,
        time: 'Just now',
        user: 'Alex Mercer',
        status: 'Sent',
        icon: CheckCircle
      },
      ...prev
    ]);

    setReplyText('');
  };

  // Submit New Message
  const handleSendQuickMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageForm.message) return;

    const targetName = newMessageForm.recipient === 'custom' ? newMessageForm.customRecipient : newMessageForm.recipient;
    
    // Update performance counts
    setPerformanceRows(prev => prev.map(row => {
      if (row.channel === newMessageForm.channel) {
        return { ...row, sent: row.sent + 1 };
      }
      return row;
    }));

    // Add activity to timeline
    setTimelineActivities(prev => [
      {
        action: `${newMessageForm.channel} Quick Message`,
        time: 'Just now',
        user: 'Alex Mercer',
        status: 'Delivered',
        icon: CheckCircle
      },
      ...prev
    ]);

    // Check if user already has conversation
    const existingIndex = inboxConversations.findIndex(c => c.name.toLowerCase() === targetName.toLowerCase() && c.channel === newMessageForm.channel);
    
    if (existingIndex >= 0) {
      setInboxConversations(prev => prev.map((c, i) => {
        if (i === existingIndex) {
          return {
            ...c,
            preview: newMessageForm.message,
            time: 'Just now',
            messages: [...c.messages, { sender: 'agent', time: 'Just now', content: newMessageForm.message }]
          };
        }
        return c;
      }));
    } else {
      // Create new conversation entry
      setInboxConversations(prev => [
        {
          id: prev.length + 1,
          name: targetName,
          avatar: targetName.split(' ').map(n => n[0]).join('').toUpperCase() || 'Q',
          channel: newMessageForm.channel,
          preview: newMessageForm.message,
          time: 'Just now',
          unread: 0,
          category: 'Sales',
          email: `${targetName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
          phone: '+1 (555) 999-9999',
          company: 'Inbound Interest',
          leadStatus: 'New Lead',
          agent: 'Alex Mercer (You)',
          tags: ['Inbound', 'Quick Message'],
          notes: 'Initiated from dashboard quick message creator.',
          activities: [{ type: 'Sent Message', time: 'Just now', desc: 'Message dispatched from dashboard' }],
          messages: [{ sender: 'agent', time: 'Just now', content: newMessageForm.message }]
        },
        ...prev
      ]);
    }

    setIsNewMessageOpen(false);
    setNewMessageForm(prev => ({ ...prev, message: '' }));
  };

  // Submit New Campaign
  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createCampaignForm.name || !createCampaignForm.message) return;

    // Update performance counts
    setPerformanceRows(prev => prev.map(row => {
      if (row.channel === createCampaignForm.channel) {
        return { ...row, sent: row.sent + 1 };
      }
      return row;
    }));

    // Add activity
    setTimelineActivities(prev => [
      {
        action: `Campaign: ${createCampaignForm.name}`,
        time: 'Just now',
        user: 'Alex Mercer',
        status: 'Launching',
        icon: CheckCircle
      },
      ...prev
    ]);

    setIsCreateCampaignOpen(false);
    setCreateCampaignForm({
      name: '',
      channel: 'Email',
      audience: 'All Qualified Leads',
      subject: '',
      message: ''
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#dddddd' }} className="fade-in">
      
      {/* GLOBAL FILTERS PANEL */}
      <div className="glass-card" style={{
        padding: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        background: '#1a1a1a',
        border: '1px solid #333333',
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#888888', marginRight: '8px' }}>
          <Filter size={16} />
          <span>Global Filters:</span>
        </div>
        
        {[
          { label: 'Date Range', val: 'Last 30 Days' },
          { label: 'Channel', val: 'All Channels' },
          { label: 'Campaign', val: 'All Campaigns' },
          { label: 'Team', val: 'All Teams' },
          { label: 'Agent', val: 'All Agents' },
          { label: 'Status', val: 'All Statuses' },
          { label: 'Organization', val: 'Default Org' }
        ].map((f, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#222222',
            border: '1px solid #333333',
            borderRadius: '6px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '12.5px'
          }}>
            <span style={{ color: '#888888' }}>{f.label}:</span>
            <span style={{ color: '#ffffff', fontWeight: 500 }}>{f.val}</span>
            <ChevronDown size={14} style={{ color: '#666666' }} />
          </div>
        ))}
      </div>

      {/* 8-CARD KPI STATISTICS SECTION */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px'
      }}>
        {[
          { title: 'Total Conversations', value: '45,820', trend: '+12.4%', sub: 'vs last month', icon: MessageSquare, color: '#6366f1' },
          { title: 'Active Conversations', value: '1,424', trend: '+8.2%', sub: 'vs yesterday', icon: Clock, color: '#10b981' },
          { title: 'Unread Messages', value: '238', trend: '-14.3%', sub: 'vs yesterday', icon: AlertCircle, color: '#f59e0b' },
          { title: 'Emails Sent Today', value: '8,420', trend: '+15.1%', sub: 'vs daily avg', icon: Mail, color: '#0ea5e9' },
          { title: 'WhatsApp Messages', value: '5,890', trend: '+22.5%', sub: 'vs daily avg', icon: MessageCircle, color: '#10b981' },
          { title: 'SMS Delivered', value: '4,110', trend: '+5.4%', sub: 'vs daily avg', icon: Globe, color: '#0ea5e9' },
          { title: 'Telegram Messages', value: '2,450', trend: '+18.0%', sub: 'vs daily avg', icon: Users, color: '#a855f7' },
          { title: 'AI Chatbot Conv.', value: '12,980', trend: '+35.2%', sub: 'vs last month', icon: Bot, color: '#f59e0b' }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          const isPositive = !kpi.trend.startsWith('-');
          return (
            <div key={idx} 
              onClick={() => onKpiClick && onKpiClick(kpi.title)}
              style={{
                background: '#1a1a1a',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
                cursor: onKpiClick ? 'pointer' : 'default'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ color: '#888888', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {kpi.title}
                </span>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: `${kpi.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: kpi.color
                }}>
                  <Icon size={16} />
                </div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
                  {kpi.value}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px' }}>
                  <span style={{ color: isPositive ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                    {kpi.trend}
                  </span>
                  <span style={{ color: '#555555' }}>
                    {kpi.sub}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ANALYTICS SECTION */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
      }}>
        {/* Left Chart: Conversation Volume (Last 30 Days) */}
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: 0 }}>Conversation Volume (Last 30 Days)</h3>
            <p style={{ fontSize: '12px', color: '#666666', margin: '4px 0 0 0' }}>Omnichannel interactions received over the last 30 days</p>
          </div>
          
          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conversationVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={grayColors.chartGrid} />
                <XAxis dataKey="date" stroke={grayColors.textMuted} fontSize={11} />
                <YAxis stroke={grayColors.textMuted} fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333333', color: '#ffffff' }}
                  labelStyle={{ color: '#888888' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="volume" 
                  stroke={grayColors.chartStroke} 
                  fill={grayColors.chartFill} 
                  fillOpacity={0.15} 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Channel Distribution */}
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: 0 }}>Channel Distribution</h3>
            <p style={{ fontSize: '12px', color: '#666666', margin: '4px 0 0 0' }}>Proportion of tickets per communication gateway</p>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelDistributionData} layout="vertical" margin={{ top: 5, right: 10, left: 15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={grayColors.chartGrid} horizontal={true} vertical={false} />
                <XAxis type="number" stroke={grayColors.textMuted} fontSize={10} />
                <YAxis dataKey="name" type="category" stroke={grayColors.textMuted} fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333333', color: '#ffffff' }} />
                <Bar dataKey="value" fill={grayColors.chartFill} radius={[0, 4, 4, 0]}>
                  {channelDistributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={grayColors.shades[index % grayColors.shades.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3 MEDIUM ANALYTICS CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px'
      }}>
        {[
          { label: 'Average Response Time', value: '4m 12s', sub: 'Target: < 5 mins', status: 'Optimal', val: 84 },
          { label: 'Customer Satisfaction Score', value: '94.8%', sub: 'Target: > 90.0%', status: 'Excellent', val: 94 },
          { label: 'Delivery Success Rate', value: '98.2%', sub: 'Target: > 97.5%', status: 'Stable', val: 98 }
        ].map((c, idx) => (
          <div key={idx} style={{
            background: '#1a1a1a',
            border: '1px solid #333333',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#888888', fontWeight: 500 }}>{c.label}</span>
              <span style={{ fontSize: '11px', color: '#aaaaaa', padding: '2px 6px', border: '1px solid #333333', borderRadius: '4px' }}>
                {c.status}
              </span>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>{c.value}</div>
              <span style={{ fontSize: '11px', color: '#555555' }}>{c.sub}</span>
            </div>
            <div style={{ width: '100%', height: '4px', backgroundColor: '#262626', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${c.val}%`, height: '100%', backgroundColor: '#666666' }} />
            </div>
          </div>
        ))}
      </div>

      {/* OMNICHANNEL PERFORMANCE */}
      <div style={{
        background: '#1a1a1a',
        border: '1px solid #333333',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Omnichannel Performance</h3>
          <p style={{ fontSize: '12px', color: '#666666' }}>Performance statistics breakdown per communication channel</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333333' }}>
                {['Channel', 'Messages Sent', 'Delivered', 'Open Rate', 'Response Rate', 'Status'].map((h, idx) => (
                  <th key={idx} style={{ padding: '12px 8px', color: '#888888', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {performanceRows.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 600, color: '#ffffff' }}>{row.channel}</td>
                  <td style={{ padding: '12px 8px', color: '#aaaaaa' }}>{row.sent.toLocaleString()}</td>
                  <td style={{ padding: '12px 8px', color: '#aaaaaa' }}>{row.delivered}</td>
                  <td style={{ padding: '12px 8px', color: '#aaaaaa' }}>{row.openRate}</td>
                  <td style={{ padding: '12px 8px', color: '#aaaaaa' }}>{row.responseRate}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{
                      fontSize: '11px',
                      color: '#999999',
                      backgroundColor: '#222222',
                      border: '1px solid #333333',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UNIFIED INBOX PREVIEW (3-COLUMN LAYOUT) */}
      <div style={{
        background: '#1a1a1a',
        border: '1px solid #333333',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #333333',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#161616'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={16} style={{ color: '#888888' }} />
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Unified Inbox Preview</h3>
          </div>
          <span style={{ fontSize: '11px', color: '#666666' }}>[3-Column Layout Sandbox]</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr 300px',
          height: '520px'
        }}>
          {/* COLUMN 1: Conversation List */}
          <div style={{ borderRight: '1px solid #333333', display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#181818' }}>
            {/* Search and Filters */}
            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid #262626' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: '#555555' }} />
                <input 
                  type="text"
                  placeholder="Search conversations..."
                  value={inboxSearch}
                  onChange={(e) => setInboxSearch(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#121212',
                    border: '1px solid #333333',
                    borderRadius: '4px',
                    padding: '6px 12px 6px 30px',
                    fontSize: '12px',
                    color: '#ffffff',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {['All', 'Unread', 'Assigned'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveInboxTab(tab.toLowerCase())}
                    style={{
                      flex: 1,
                      backgroundColor: activeInboxTab === tab.toLowerCase() ? '#2c2c2c' : '#1e1e1e',
                      border: '1px solid #333333',
                      color: activeInboxTab === tab.toLowerCase() ? '#ffffff' : '#888888',
                      fontSize: '11px',
                      padding: '4px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Category Filter Placeholder */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#888888', padding: '2px 4px' }}>
                <span>Conversation Categories</span>
                <Filter size={12} />
              </div>
            </div>

            {/* List */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filteredConversations.map((conv) => {
                const isActive = conv.id === selectedInboxId;
                return (
                  <div 
                    key={conv.id}
                    onClick={() => setSelectedInboxId(conv.id)}
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #222222',
                      cursor: 'pointer',
                      backgroundColor: isActive ? '#222222' : 'transparent',
                      display: 'flex',
                      gap: '10px'
                    }}
                  >
                    {/* Avatar Placeholder */}
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#333333',
                      border: '1px solid #444444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#cccccc',
                      flexShrink: 0
                    }}>
                      {conv.avatar}
                    </div>

                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, fontSize: '12.5px', color: '#ffffff' }}>{conv.name}</span>
                        <span style={{ fontSize: '10px', color: '#666666' }}>{conv.time}</span>
                      </div>
                      
                      <p style={{
                        fontSize: '11px',
                        color: '#888888',
                        margin: 0,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                      }}>
                        {conv.preview}
                      </p>
                    </div>

                    {/* Unread Badge */}
                    {conv.unread > 0 && (
                      <div style={{
                        alignSelf: 'center',
                        backgroundColor: '#444444',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        padding: '2px 6px',
                        borderRadius: '10px',
                        flexShrink: 0
                      }}>
                        {conv.unread}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: Conversation Window */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#131313' }}>
            {/* Customer Header */}
            <div style={{
              padding: '12px 20px',
              borderBottom: '1px solid #333333',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#1b1b1b'
            }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                  {selectedConversation.name}
                </h4>
                <p style={{ fontSize: '11px', color: '#666666', margin: 0 }}>
                  Channel: {selectedConversation.channel} | Agent: {selectedConversation.agent}
                </p>
              </div>
            </div>

            {/* Message Timeline */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedConversation.messages.map((m, idx) => {
                const isAgent = m.sender === 'agent';
                return (
                  <div 
                    key={idx}
                    style={{
                      alignSelf: isAgent ? 'flex-end' : 'flex-start',
                      maxWidth: '75%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isAgent ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div style={{
                      backgroundColor: isAgent ? '#2c2c2c' : '#1e1e1e',
                      border: '1px solid #333333',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#dddddd',
                      fontSize: '12px',
                      lineHeight: '1.4'
                    }}>
                      {m.content}
                    </div>
                    <span style={{ fontSize: '9px', color: '#555555', marginTop: '4px' }}>
                      {m.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* AI Assistant panel for quick actions / suggestions */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {/* Attachments Placeholder */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#666666' }}>
                <Paperclip size={12} />
                <span>Attachments Placeholder (Drop files here)</span>
              </div>
              
              {/* AI Suggested Replies */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#888888', fontWeight: 600 }}>
                  <Sparkles size={11} /> AI Suggested Replies:
                </span>
                {[
                  'Sure, I will schedule a call tomorrow.',
                  'Can you share your email address?',
                  'Let me check this with the team.'
                ].map((reply, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setReplyText(reply)}
                    style={{
                      backgroundColor: '#222222',
                      border: '1px solid #333333',
                      color: '#aaaaaa',
                      fontSize: '10px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Reply Text Area & Send Button */}
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid #333333',
              backgroundColor: '#1b1b1b',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <input 
                type="text"
                placeholder="Type a response..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                style={{
                  flex: 1,
                  backgroundColor: '#121212',
                  border: '1px solid #333333',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  color: '#ffffff',
                  outline: 'none'
                }}
              />

              <button 
                onClick={handleSend}
                style={{
                  backgroundColor: '#333333',
                  border: '1px solid #444444',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Send</span>
                <Send size={12} />
              </button>
            </div>
          </div>

          {/* COLUMN 3: Customer Details Panel */}
          <div style={{ borderLeft: '1px solid #333333', display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#181818', overflowY: 'auto' }}>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Profile Overview */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '6px', paddingBottom: '12px', borderBottom: '1px solid #262626' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#333333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#ffffff'
                }}>
                  {selectedConversation.avatar}
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                    {selectedConversation.name}
                  </h4>
                  <span style={{ fontSize: '11px', color: '#666666' }}>
                    {selectedConversation.company}
                  </span>
                </div>
              </div>

              {/* Attributes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px' }}>
                {[
                  { label: 'Email', value: selectedConversation.email },
                  { label: 'Phone', value: selectedConversation.phone },
                  { label: 'Company', value: selectedConversation.company },
                  { label: 'Lead Status', value: selectedConversation.leadStatus },
                  { label: 'Assigned Agent', value: selectedConversation.agent }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666666' }}>{item.label}:</span>
                    <span style={{ color: '#bbbbbb', fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#666666', textTransform: 'uppercase' }}>Tags</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {selectedConversation.tags.map((tag, idx) => (
                    <span key={idx} style={{
                      fontSize: '9.5px',
                      color: '#aaaaaa',
                      backgroundColor: '#222222',
                      border: '1px solid #333333',
                      padding: '2px 6px',
                      borderRadius: '3px'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#666666', textTransform: 'uppercase' }}>Notes</span>
                <div style={{
                  backgroundColor: '#121212',
                  border: '1px solid #262626',
                  borderRadius: '4px',
                  padding: '8px',
                  fontSize: '10.5px',
                  color: '#888888',
                  lineHeight: '1.3'
                }}>
                  {selectedConversation.notes}
                </div>
              </div>

              {/* Previous Interactions / Activities */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#666666', textTransform: 'uppercase' }}>Previous Interactions</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedConversation.activities.map((act, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderLeft: '1px solid #333333',
                      paddingLeft: '8px',
                      marginLeft: '2px',
                      gap: '2px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#bbbbbb' }}>{act.type}</span>
                        <span style={{ fontSize: '8.5px', color: '#555555' }}>{act.time}</span>
                      </div>
                      <span style={{ fontSize: '9.5px', color: '#666666' }}>{act.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* CAMPAIGN SUMMARY */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Campaign Summary</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }}>
          {[
            { channel: 'Email Campaign Performance', name: 'Q3 Product Newsletter', sent: '12,450', delivered: '99.2%', openRate: '24.5%', clickRate: '4.8%', status: 'Completed' },
            { channel: 'WhatsApp Campaign Performance', name: 'Flash Sale Broadcast', sent: '8,920', delivered: '98.5%', openRate: '92.1%', clickRate: '18.4%', status: 'Active' },
            { channel: 'SMS Campaign Performance', name: 'OTP Verification Alerts', sent: '5,400', delivered: '94.8%', openRate: '98.0%', clickRate: '1.2%', status: 'Active' },
            { channel: 'Telegram Campaign Performance', name: 'Crypto Channel Promo', sent: '3,120', delivered: '99.0%', openRate: '85.4%', clickRate: '12.6%', status: 'Draft' }
          ].map((camp, idx) => (
            <div key={idx} style={{
              background: '#1a1a1a',
              border: '1px solid #333333',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '10px', color: '#888888', fontWeight: 600, textTransform: 'uppercase' }}>{camp.channel}</div>
                <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginTop: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {camp.name}
                </h4>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
                <div>
                  <span style={{ color: '#555555' }}>Sent:</span>
                  <div style={{ color: '#aaaaaa', fontWeight: 500 }}>{camp.sent}</div>
                </div>
                <div>
                  <span style={{ color: '#555555' }}>Delivered:</span>
                  <div style={{ color: '#aaaaaa', fontWeight: 500 }}>{camp.delivered}</div>
                </div>
                <div>
                  <span style={{ color: '#555555' }}>Open Rate:</span>
                  <div style={{ color: '#aaaaaa', fontWeight: 500 }}>{camp.openRate}</div>
                </div>
                <div>
                  <span style={{ color: '#555555' }}>Click Rate:</span>
                  <div style={{ color: '#aaaaaa', fontWeight: 500 }}>{camp.clickRate}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #262626' }}>
                <span style={{ fontSize: '10px', color: '#666666' }}>Status Badge:</span>
                <span style={{
                  fontSize: '10px',
                  color: '#999999',
                  backgroundColor: '#222222',
                  border: '1px solid #333333',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {camp.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI INSIGHTS PANEL & RECENT TIMELINE / QUICK ACTIONS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }}>
        {/* Left: AI Insights Panel */}
        <div style={{
          background: '#1a1a1a',
          border: '1px solid #333333',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bot size={18} style={{ color: '#888888' }} />
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>AI Insights Panel</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
            {[
              { title: 'AI Recommended Follow-ups', desc: 'Draft replies for Sarah Jenkins scheduling call upgrade request.', color: 'var(--success)' },
              { title: 'High Priority Conversations', desc: '3 unresolved VIP tickets from Enterprise clients pending response.', color: 'var(--danger)' },
              { title: 'Customers Waiting More Than 24 Hours', desc: '1 client (David Chen) waiting on report export guides.', color: 'var(--warning)' },
              { title: 'Suggested Campaign Opportunities', desc: 'Target 120 cold leads on WhatsApp based on recent activity spike.', color: 'var(--primary)' },
              { title: 'Best Time to Send Messages', desc: 'Emails perform best between 9:00 AM - 11:30 AM EST for Rostov Media.', color: 'var(--info)' },
              { title: 'AI Automation Suggestions', desc: 'Auto-categorize and tag API queries using technical tags to save agent queue time.', color: 'var(--accent)' }
            ].map((insight, idx) => (
              <div key={idx} style={{
                padding: '10px',
                backgroundColor: 'rgba(255,255,255,0.01)',
                border: '1px solid var(--border-color)',
                borderLeft: `3px solid ${insight.color}`,
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <span style={{ fontWeight: 600, color: '#ffffff' }}>{insight.title}</span>
                <p style={{ color: '#888888', margin: 0, fontSize: '11px', lineHeight: 1.4 }}>{insight.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Timeline & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Quick Actions Panel */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Quick Actions Panel</h3>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px'
            }}>
              {[
                { label: 'Compose Email', icon: Mail, action: () => { setCreateCampaignForm(prev => ({ ...prev, channel: 'Email' })); setIsCreateCampaignOpen(true); } },
                { label: 'Send WhatsApp', icon: MessageCircle, action: () => { setNewMessageForm(prev => ({ ...prev, channel: 'WhatsApp' })); setIsNewMessageOpen(true); } },
                { label: 'Send SMS', icon: Globe, action: () => { setNewMessageForm(prev => ({ ...prev, channel: 'SMS' })); setIsNewMessageOpen(true); } },
                { label: 'Create Telegram Broadcast', icon: Users, action: () => { setCreateCampaignForm(prev => ({ ...prev, channel: 'Telegram' })); setIsCreateCampaignOpen(true); } },
                { label: 'Start Live Chat', icon: MessageSquare, action: () => window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Initializing Live Chat session...' })) },
                { label: 'Train AI Chatbot', icon: Bot, action: () => window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Opening Chatbot training matrix...' })) },
                { label: 'Import Contacts', icon: Upload, action: () => window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Select CSV contacts file...' })) },
                { label: 'Export Reports', icon: Download, action: () => window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Exporting performance CSV logs...' })) }
              ].map((act, idx) => {
                const Icon = act.icon;
                return (
                  <button key={idx} onClick={act.action} style={{
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '10px',
                    color: '#dddddd',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textAlign: 'left'
                  }}>
                    <Icon size={14} style={{ color: 'var(--primary)' }} />
                    <span>{act.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Recent Activity Timeline</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {timelineActivities.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '8px',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon size={14} style={{ color: act.status === 'Failed' ? 'var(--danger)' : 'var(--success)' }} />
                      <span style={{ fontWeight: 600, color: '#ffffff' }}>{act.action}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#888888' }}>
                      <span>By: {act.user}</span>
                      <span>{act.time}</span>
                      <span style={{
                        padding: '1px 5px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '3px',
                        fontSize: '9px',
                        backgroundColor: '#1b1b1b',
                        color: act.status === 'Failed' ? 'var(--danger)' : 'var(--success)'
                      }}>
                        {act.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          NEW MESSAGE MODAL
          ========================================== */}
      {isNewMessageOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handleSendQuickMessage}
            className="glass-card" 
            style={{ width: '500px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={18} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Send Quick Message</h3>
              </div>
              <button type="button" onClick={() => setIsNewMessageOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {/* Recipient */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Recipient Customer *</label>
              <select 
                value={newMessageForm.recipient}
                onChange={e => setNewMessageForm(prev => ({ ...prev, recipient: e.target.value }))}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="Sarah Jenkins">Sarah Jenkins (Apex Technologies)</option>
                <option value="Marcus Vance">Marcus Vance (CloudSystem Inc)</option>
                <option value="Elena Rostova">Elena Rostova (Rostov Media)</option>
                <option value="David Chen">David Chen (Capital Fund LLC)</option>
                <option value="custom">Send to custom name...</option>
              </select>
            </div>

            {/* Custom Recipient input */}
            {newMessageForm.recipient === 'custom' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Recipient Custom Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter name"
                  value={newMessageForm.customRecipient}
                  onChange={e => setNewMessageForm(prev => ({ ...prev, customRecipient: e.target.value }))}
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
                />
              </div>
            )}

            {/* Channel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Communication Channel *</label>
              <select 
                value={newMessageForm.channel}
                onChange={e => setNewMessageForm(prev => ({ ...prev, channel: e.target.value }))}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="WhatsApp">WhatsApp Gateway</option>
                <option value="Email">SMTP Email Server</option>
                <option value="SMS">Twilio SMS Gateway</option>
                <option value="Telegram">Telegram Bot Sync</option>
              </select>
            </div>

            {/* Message Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Message Content Body *</label>
              <textarea 
                required
                rows={4}
                placeholder="Type your message text here..."
                value={newMessageForm.message}
                onChange={e => setNewMessageForm(prev => ({ ...prev, message: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'sans-serif', resize: 'vertical' }}
              />
            </div>

            {/* Actions footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button 
                type="button" 
                onClick={() => setIsNewMessageOpen(false)}
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                style={{ backgroundColor: 'var(--primary)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Send size={13} /> Send Message
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ==========================================
          CREATE CAMPAIGN MODAL
          ========================================== */}
      {isCreateCampaignOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)',
          paddingTop: '60px', overflowY: 'auto'
        }}>
          <form 
            onSubmit={handleLaunchCampaign}
            className="glass-card" 
            style={{ width: '520px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0f131a', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} style={{ color: 'var(--accent)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Create Omnichannel Campaign</h3>
              </div>
              <button type="button" onClick={() => setIsCreateCampaignOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {/* Campaign Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Campaign Name *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Q3 Growth Broadcast Campaign"
                value={createCampaignForm.name}
                onChange={e => setCreateCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>

            {/* Channel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Campaign Channel *</label>
              <select 
                value={createCampaignForm.channel}
                onChange={e => setCreateCampaignForm(prev => ({ ...prev, channel: e.target.value }))}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="Email">Email Campaigns</option>
                <option value="WhatsApp">WhatsApp Broadcasts</option>
                <option value="SMS">Twilio SMS blasts</option>
                <option value="Telegram">Telegram Channels broadcast</option>
              </select>
            </div>

            {/* Audience Segment */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Target Audience Segment *</label>
              <select 
                value={createCampaignForm.audience}
                onChange={e => setCreateCampaignForm(prev => ({ ...prev, audience: e.target.value }))}
                style={{ backgroundColor: '#131924', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              >
                <option value="All Qualified Leads">All Qualified Leads (1,424 contacts)</option>
                <option value="Enterprise Clients">Enterprise Clients (280 contacts)</option>
                <option value="Inactive Trial users">Inactive Trial users (180 contacts)</option>
                <option value="Subscribers Segment">Subscribers Segment (1,424 contacts)</option>
              </select>
            </div>

            {/* Subject (for Email only) */}
            {createCampaignForm.channel === 'Email' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Subject Line *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter email subject line"
                  value={createCampaignForm.subject}
                  onChange={e => setCreateCampaignForm(prev => ({ ...prev, subject: e.target.value }))}
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
                />
              </div>
            )}

            {/* Campaign Template / Message */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Campaign Message Body Content *</label>
              <textarea 
                required
                rows={5}
                placeholder="Write your campaign broadcast message here..."
                value={createCampaignForm.message}
                onChange={e => setCreateCampaignForm(prev => ({ ...prev, message: e.target.value }))}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'sans-serif', resize: 'vertical' }}
              />
            </div>

            {/* Actions footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button 
                type="button" 
                onClick={() => setIsCreateCampaignOpen(false)}
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                style={{ backgroundColor: 'var(--accent)', border: 'none', color: '#fff', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Send size={13} /> Launch Campaign
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
