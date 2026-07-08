import React, { useState } from 'react';
import { Bot, Settings, Activity, Cpu, Search, Power } from 'lucide-react';

const agents = [
  { id: 'mkt', name: 'Marketing Agent', role: 'Campaign Optimization', status: 'active', tasks: 124, efficiency: '98%', color: '#6366f1' },
  { id: 'seo', name: 'SEO Agent', role: 'Content & Keyword Strategy', status: 'active', tasks: 45, efficiency: '95%', color: '#10b981' },
  { id: 'ppc', name: 'PPC Agent', role: 'Ad Spend Bidding & Optimization', status: 'paused', tasks: 0, efficiency: '-', color: '#f59e0b' },
  { id: 'sales', name: 'Sales Agent', role: 'Lead Scoring & Outreach', status: 'active', tasks: 890, efficiency: '99%', color: '#8b5cf6' },
  { id: 'content', name: 'Content Agent', role: 'Copywriting & Editing', status: 'active', tasks: 32, efficiency: '91%', color: '#ec4899' },
  { id: 'support', name: 'Support Agent', role: 'Customer Query Resolution', status: 'error', tasks: 15, efficiency: '76%', color: '#ef4444' },
  { id: 'finance', name: 'Finance Agent', role: 'Billing & Invoicing Automation', status: 'paused', tasks: 0, efficiency: '-', color: '#64748b' },
  { id: 'data', name: 'Data Scientist', role: 'Predictive Modeling & Analytics', status: 'active', tasks: 5300, efficiency: '99.9%', color: '#0ea5e9' },
];

export const AiAgentsList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      {/* Header Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
        border: '1px solid rgba(14, 165, 233, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)' }}>
            <Cpu size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
              Autonomous Agent Fleet
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
              Deploy and manage specialized AI agents to automate your entire marketing and business operations.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ padding: '6px 12px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', border: '1px solid var(--border-color)' }}>
            <Activity size={14} color="var(--success)" /> System Load: 42%
          </div>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusIcon /> Train New Agent
          </button>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button onClick={() => setActiveTab('all')} style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', background: activeTab === 'all' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'all' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px', fontWeight: 500, transition: 'all 0.2s' }}>All Agents</button>
          <button onClick={() => setActiveTab('active')} style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', background: activeTab === 'active' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'active' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px', fontWeight: 500, transition: 'all 0.2s' }}>Active</button>
          <button onClick={() => setActiveTab('paused')} style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', background: activeTab === 'paused' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'paused' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px', fontWeight: 500, transition: 'all 0.2s' }}>Paused</button>
        </div>
        
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '9px', color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search agents..." style={{ padding: '8px 12px 8px 36px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '13px', width: '240px' }} />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid-cols-4">
        {agents.filter(a => activeTab === 'all' ? true : a.status === activeTab).map(agent => (
          <div key={agent.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden' }}>
            {/* Status indicator line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: agent.status === 'active' ? 'var(--success)' : agent.status === 'paused' ? 'var(--text-muted)' : 'var(--danger)' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: `${agent.color}20`, color: agent.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={24} />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}><Settings size={16} /></button>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px 0' }}>{agent.name}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>{agent.role}</p>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Tasks Executed</span>
                <span style={{ fontSize: '16px', fontWeight: 600 }}>{agent.tasks.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Efficiency</span>
                <span style={{ fontSize: '16px', fontWeight: 600, color: agent.status === 'active' ? 'var(--success)' : 'inherit' }}>{agent.efficiency}</span>
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 500, color: agent.status === 'active' ? 'var(--success)' : agent.status === 'error' ? 'var(--danger)' : 'var(--text-secondary)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'currentColor' }}></div>
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </div>
              <button style={{ 
                display: 'flex', alignItems: 'center', gap: '6px', 
                padding: '6px 12px', borderRadius: '6px', 
                backgroundColor: agent.status === 'active' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', 
                color: agent.status === 'active' ? 'var(--danger)' : 'var(--success)',
                border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600
              }}>
                <Power size={12} /> {agent.status === 'active' ? 'Pause' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlusIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
