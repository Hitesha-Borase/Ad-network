import React, { useState } from 'react';
import { Pause, Play, Settings, Plus, Zap, MousePointerClick, MessageSquare, Mail, Database, Trash2, X, Check } from 'lucide-react';

type WorkflowStatus = 'active' | 'paused';
interface Workflow {
  id: number;
  name: string;
  description: string;
  status: WorkflowStatus;
  triggers: number;
  actions: number;
  runCount: number;
}

export const initialWorkflows: Workflow[] = [
  { id: 1, name: 'Lead Nurturing Sequence', description: 'Form submit → AI score → route to sales or drip', status: 'active', triggers: 1, actions: 4, runCount: 1240 },
  { id: 2, name: 'Abandoned Cart Recovery', description: 'Cart abandoned → wait 1h → send email series', status: 'active', triggers: 2, actions: 3, runCount: 843 },
  { id: 3, name: 'VIP Customer Onboarding', description: 'Deal won → assign CSM → send welcome series', status: 'paused', triggers: 1, actions: 6, runCount: 120 },
  { id: 4, name: 'Support Ticket Escalation', description: 'Ticket priority high → Slack alert → assign senior', status: 'active', triggers: 3, actions: 2, runCount: 4530 },
];

export const canvasNodes: Record<number, { trigger: string; nodes: { label: string; type: string; detail: string; color: string }[] }> = {
  1: {
    trigger: 'Form Submitted → Website Lead Magnet',
    nodes: [
      { label: 'Analyze Lead Quality', type: 'AI Action', detail: 'Engine: GPT-4 Lead Scorer', color: 'var(--primary)' },
      { label: 'Notify Sales Rep', type: 'Action (Score > 80)', detail: 'Via: Slack #leads-hot', color: 'var(--success)' },
      { label: 'Add to Drip Campaign', type: 'Action (Score < 80)', detail: 'Sequence: 5-step nurture', color: 'var(--text-muted)' },
    ],
  },
  2: {
    trigger: 'Cart Abandoned → E-commerce Store',
    nodes: [
      { label: 'Wait 1 Hour', type: 'Delay', detail: 'Check if order completed', color: 'var(--warning)' },
      { label: 'Send Recovery Email #1', type: 'Action', detail: 'Template: cart_recovery_1', color: 'var(--primary)' },
      { label: 'Send 10% Coupon', type: 'Action (No Open)', detail: 'After 24h if not opened', color: 'var(--accent)' },
    ],
  },
  3: {
    trigger: 'Deal Stage = Won → CRM Pipeline',
    nodes: [
      { label: 'Assign Customer Success Manager', type: 'Action', detail: 'Round-robin assignment', color: 'var(--primary)' },
      { label: 'Send Welcome Email', type: 'Action', detail: 'Template: vip_welcome', color: 'var(--success)' },
      { label: 'Schedule Onboarding Call', type: 'Action', detail: 'Via Calendly integration', color: 'var(--info)' },
    ],
  },
  4: {
    trigger: 'Support Ticket Priority = High',
    nodes: [
      { label: 'Notify Slack Channel', type: 'Action', detail: '#support-urgent', color: 'var(--danger)' },
      { label: 'Assign Senior Agent', type: 'Action', detail: 'Agent: On-call rotation', color: 'var(--primary)' },
    ],
  },
};

const getWorkflowsForMode = (mode: string): Workflow[] => {
  switch (mode) {
    case 'auto-trees':
      return [
        { id: 1, name: 'Lead Scoring Logic Tree', description: 'Evaluate demographics & behavior score', status: 'active', triggers: 2, actions: 3, runCount: 840 },
        { id: 2, name: 'Enterprise Exemption Rules', description: 'Approve custom quote bounds automatically', status: 'active', triggers: 1, actions: 2, runCount: 190 },
        { id: 3, name: 'Support SLA Tier Assigner', description: 'Categorize tickets into SLA queues', status: 'paused', triggers: 1, actions: 3, runCount: 430 }
      ];
    case 'auto-events':
      return [
        { id: 1, name: 'High Value Add-To-Cart Event', description: 'Capture cart value > $100 -> trigger pixel', status: 'active', triggers: 1, actions: 2, runCount: 1420 },
        { id: 2, name: 'Scroll Depth Ingestion Trigger', description: 'Track 75% scroll -> load newsletter box', status: 'active', triggers: 1, actions: 1, runCount: 9340 },
        { id: 3, name: 'Outbound Partner Click', description: 'Track referral redirect details', status: 'paused', triggers: 2, actions: 2, runCount: 10 }
      ];
    case 'auto-crm':
      return [
        { id: 1, name: 'HubSpot Lead Score Pipeline', description: 'Sync profile segment membership to CRM field', status: 'active', triggers: 1, actions: 3, runCount: 4210 },
        { id: 2, name: 'Salesforce Deal Stage Alert', description: 'Won deal -> ping Slack & post to DB', status: 'active', triggers: 2, actions: 2, runCount: 1840 },
        { id: 3, name: 'Intercom Contact Archiver', description: 'Archive idle leads automatically after 90d', status: 'paused', triggers: 1, actions: 1, runCount: 80 }
      ];
    case 'auto-marketing':
      return [
        { id: 1, name: 'Product Demo Drip Sequence', description: 'Sign up -> send 3 lessons -> buy prompt', status: 'active', triggers: 1, actions: 5, runCount: 3820 },
        { id: 2, name: 'Black Friday Campaign Dispatch', status: 'active', description: 'Schedule promo email & SMS tags', triggers: 2, actions: 2, runCount: 12400 },
        { id: 3, name: 'Inactive Subscriber Nudge', description: 'No email open in 30d -> trigger re-engagement', status: 'paused', triggers: 1, actions: 2, runCount: 990 }
      ];
    case 'auto-builder':
    default:
      return [
        { id: 1, name: 'Lead Nurturing Sequence', description: 'Form submit → AI score → route to sales or drip', status: 'active', triggers: 1, actions: 4, runCount: 1240 },
        { id: 2, name: 'Abandoned Cart Recovery', description: 'Cart abandoned → wait 1h → send email series', status: 'active', triggers: 2, actions: 3, runCount: 843 },
        { id: 3, name: 'VIP Customer Onboarding', description: 'Deal won → assign CSM → send welcome series', status: 'paused', triggers: 1, actions: 6, runCount: 120 },
        { id: 4, name: 'Support Ticket Escalation', description: 'Ticket priority high → Slack alert → assign senior', status: 'active', triggers: 3, actions: 2, runCount: 4530 }
      ];
  }
};

const getCanvasNodesForMode = (mode: string, selected: number) => {
  const dataset: Record<string, Record<number, { trigger: string; nodes: { label: string; type: string; detail: string; color: string }[] }>> = {
    'auto-trees': {
      1: {
        trigger: 'Evaluate Account Demographics',
        nodes: [
          { label: 'Check Employee Size > 500', type: 'Logic Rule', detail: 'Evaluate enterprise match', color: 'var(--accent)' },
          { label: 'Route to Premium SLA Tier', type: 'Result (True)', detail: 'Priority: High', color: 'var(--success)' },
          { label: 'Route to SMB Nurture List', type: 'Result (False)', detail: 'Priority: Medium', color: 'var(--text-muted)' }
        ]
      },
      2: {
        trigger: 'Quote Discrepancy > 20%',
        nodes: [
          { label: 'Trigger VP CFO Audit Request', type: 'Action', detail: 'Notification: CFO Inboxes', color: 'var(--danger)' },
          { label: 'Hold Deal Stage Progress', type: 'Action', detail: 'CRM lock enabled', color: 'var(--warning)' }
        ]
      },
      3: {
        trigger: 'Support Ticket SLA Priority Check',
        nodes: [
          { label: 'Assign Tier-1 Agent support', type: 'Action', detail: 'Round robin', color: 'var(--primary)' }
        ]
      }
    },
    'auto-events': {
      1: {
        trigger: 'Add-To-Cart event detected',
        nodes: [
          { label: 'Verify Cart Valuation > $100', type: 'Event Condition', detail: 'Basket totals checkout check', color: 'var(--success)' },
          { label: 'Inject High-Intent Target Cookie', type: 'Action', detail: 'Stitch profile cookie metrics', color: 'var(--primary)' }
        ]
      },
      2: {
        trigger: 'Scroll depth triggers >= 75%',
        nodes: [
          { label: 'Wait 3 Seconds', type: 'Delay', detail: 'Avoid page view overlays overload', color: 'var(--warning)' },
          { label: 'Load Newsletter Modal', type: 'Trigger UI View', detail: 'Overlay popup active', color: 'var(--accent)' }
        ]
      },
      3: {
        trigger: 'Outbound Referral Redirect Event',
        nodes: [
          { label: 'Record Redirect IP & Coordinates', type: 'Logger', detail: 'Database mirror storage', color: 'var(--text-muted)' }
        ]
      }
    },
    'auto-crm': {
      1: {
        trigger: 'Contact added to segment "Enterprise Leads"',
        nodes: [
          { label: 'Fetch HubSpot Account ID', type: 'Sync Check', detail: 'API call: hubspot_leads_v2', color: 'var(--primary)' },
          { label: 'Overwrite Target CRM Field', type: 'Action', detail: 'Segment: enterprise_qualified', color: 'var(--success)' }
        ]
      },
      2: {
        trigger: 'Salesforce Deal status = Closed-Won',
        nodes: [
          { label: 'Dispatch Slack Alert #sales-wins', type: 'Notification', detail: 'Template: victory_ping', color: 'var(--accent)' },
          { label: 'Add user to VIP Active Segment', type: 'CDP Action', detail: 'Target database insertion', color: 'var(--success)' }
        ]
      },
      3: {
        trigger: 'Profile last activity check > 90 days',
        nodes: [
          { label: 'Mark Contact Idle In CRM', type: 'Update Field', detail: 'Active: false', color: 'var(--text-muted)' }
        ]
      }
    },
    'auto-marketing': {
      1: {
        trigger: 'User signs up for Trial Platform',
        nodes: [
          { label: 'Send Welcome Email Sequence', type: 'Marketing Email', detail: 'Template: welcome_day_1', color: 'var(--info)' },
          { label: 'Wait 3 Days', type: 'Schedule Delay', detail: 'Wait before next lesson', color: 'var(--warning)' },
          { label: 'Send Premium Feature Overview', type: 'Marketing Email', detail: 'Template: lesson_day_4', color: 'var(--primary)' }
        ]
      },
      2: {
        trigger: 'Black Friday Campaign Launch Timer',
        nodes: [
          { label: 'Broadcast Promo Blast Campaign', type: 'Bulk Dispatch', detail: 'Recipients: All Subscribers', color: 'var(--primary)' },
          { label: 'Ping Campaign SMS Broadcast', type: 'Mobile SMS', detail: 'Rate limits active', color: 'var(--success)' }
        ]
      },
      3: {
        trigger: 'No email open in past 30 days',
        nodes: [
          { label: 'Apply Re-engagement tag', type: 'CRM Action', detail: 'Tag: idle_reengage', color: 'var(--warning)' }
        ]
      }
    }
  };

  const modeConfig = dataset[mode];
  if (modeConfig && modeConfig[selected]) {
    return modeConfig[selected];
  }

  // Fallback to auto-builder config
  const fallbackDataset: Record<number, { trigger: string; nodes: { label: string; type: string; detail: string; color: string }[] }> = {
    1: {
      trigger: 'Form Submitted → Website Lead Magnet',
      nodes: [
        { label: 'Analyze Lead Quality', type: 'AI Action', detail: 'Engine: GPT-4 Lead Scorer', color: 'var(--primary)' },
        { label: 'Notify Sales Rep', type: 'Action (Score > 80)', detail: 'Via: Slack #leads-hot', color: 'var(--success)' },
        { label: 'Add to Drip Campaign', type: 'Action (Score < 80)', detail: 'Sequence: 5-step nurture', color: 'var(--text-muted)' },
      ],
    },
    2: {
      trigger: 'Cart Abandoned → E-commerce Store',
      nodes: [
        { label: 'Wait 1 Hour', type: 'Delay', detail: 'Check if order completed', color: 'var(--warning)' },
        { label: 'Send Recovery Email #1', type: 'Action', detail: 'Template: cart_recovery_1', color: 'var(--primary)' },
        { label: 'Send 10% Coupon', type: 'Action (No Open)', detail: 'After 24h if not opened', color: 'var(--accent)' },
      ],
    },
    3: {
      trigger: 'Deal Stage = Won → CRM Pipeline',
      nodes: [
        { label: 'Assign Customer Success Manager', type: 'Action', detail: 'Round-robin assignment', color: 'var(--primary)' },
        { label: 'Send Welcome Email', type: 'Action', detail: 'Template: vip_welcome', color: 'var(--success)' },
        { label: 'Schedule Onboarding Call', type: 'Action', detail: 'Via Calendly integration', color: 'var(--info)' },
      ],
    },
    4: {
      trigger: 'Support Ticket Priority = High',
      nodes: [
        { label: 'Notify Slack Channel', type: 'Action', detail: '#support-urgent', color: 'var(--danger)' },
        { label: 'Assign Senior Agent', type: 'Action', detail: 'Agent: On-call rotation', color: 'var(--primary)' },
      ],
    },
  };

  return fallbackDataset[selected] || { trigger: 'Custom Trigger', nodes: [] };
};

interface AutoModeConfig {
  title: string;
  description: string;
  createLabel: string;
  gradient: string;
  borderColor: string;
  accent: string;
}

const autoModeConfigs: Record<string, AutoModeConfig> = {
  'auto-builder': {
    title: 'Workflow Automation Builder',
    description: 'Visually design AI-driven workflows that connect your apps, data, and communication channels.',
    createLabel: 'Create Workflow',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%)',
    borderColor: 'rgba(99,102,241,0.2)',
    accent: 'var(--primary)'
  },
  'auto-trees': {
    title: 'Decision Logic Trees',
    description: 'Configure multi-branch logic checks, fallback statements, and custom score pathways.',
    createLabel: 'Create Logic Tree',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.15) 100%)',
    borderColor: 'rgba(168,85,247,0.2)',
    accent: 'var(--accent)'
  },
  'auto-events': {
    title: 'Event Capture Flowcharts',
    description: 'Map event pipelines and trigger automated sequences based on custom user touchpoint actions.',
    createLabel: 'Map Event Flow',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(99,102,241,0.15) 100%)',
    borderColor: 'rgba(16,185,129,0.2)',
    accent: 'var(--success)'
  },
  'auto-crm': {
    title: 'CRM Integration Pipelines',
    description: 'Sync pipeline changes, assign deals to sales reps, and schedule onboarding events.',
    createLabel: 'Create Sync Rules',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(168,85,247,0.15) 100%)',
    borderColor: 'rgba(245,158,11,0.2)',
    accent: 'var(--warning)'
  },
  'auto-marketing': {
    title: 'Marketing Campaign Sequencers',
    description: 'Schedule automated drip emails, custom tagging routes, and subscriber list updates.',
    createLabel: 'New Campaign Sequence',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(59,130,246,0.15) 100%)',
    borderColor: 'rgba(99,102,241,0.2)',
    accent: 'var(--info)'
  }
};

export const WorkflowBuilder: React.FC<{ mode?: string }> = ({ mode = 'auto-builder' }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>(getWorkflowsForMode(mode));
  const [selected, setSelected] = useState<number>(1);
  const [showCreate, setShowCreate] = useState(false);
  const [showDeleteId, setShowDeleteId] = useState<number | null>(null);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [toast, setToast] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  React.useEffect(() => {
    setWorkflows(getWorkflowsForMode(mode));
    setSelected(1);
  }, [mode]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const toggleStatus = (id: number) => {
    setWorkflows(ws => ws.map(w => w.id === id ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w));
    const wf = workflows.find(w => w.id === id);
    showToast(wf?.status === 'active' ? '⏸ Workflow paused' : '▶ Workflow activated');
  };

  const deleteWorkflow = (id: number) => {
    setWorkflows(ws => ws.filter(w => w.id !== id));
    if (selected === id) setSelected(workflows.find(w => w.id !== id)?.id ?? 1);
    setShowDeleteId(null);
    showToast('🗑 Workflow deleted');
  };

  const createWorkflow = () => {
    if (!newName.trim()) return;
    const newId = Math.max(...workflows.map(w => w.id)) + 1;
    setWorkflows(ws => [...ws, { id: newId, name: newName, description: newDesc || 'No description', status: 'active', triggers: 1, actions: 1, runCount: 0 }]);
    setSelected(newId);
    setNewName(''); setNewDesc('');
    setShowCreate(false);
    showToast('✅ Workflow created successfully!');
  };

  const currentWf = workflows.find(w => w.id === selected);
  const canvas = getCanvasNodesForMode(mode, selected);

  const config = autoModeConfigs[mode] || autoModeConfigs['auto-builder'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      {toast && <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--primary)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--primary)' }}>{toast}</div>}

      <div className="glass-card" style={{ background: config.gradient, border: `1px solid ${config.borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>{config.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>{config.description}</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', backgroundColor: config.accent, border: 'none' }} onClick={() => setShowCreate(true)}>
          <Plus size={16}/> {config.createLabel}
        </button>
      </div>

      <div className="responsive-layout">
        {/* Workflows List */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Your Workflows</h2>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{workflows.length} Total</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {workflows.map(wf => (
              <div key={wf.id} onClick={() => setSelected(wf.id)} style={{ padding: '12px', borderRadius: '8px', backgroundColor: selected === wf.id ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)', border: selected === wf.id ? '1px solid rgba(99,102,241,0.3)' : '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px' }}>{wf.name}</span>
                  <div style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', backgroundColor: wf.status === 'active' ? 'var(--success-light)' : 'rgba(255,255,255,0.1)', color: wf.status === 'active' ? 'var(--success)' : 'var(--text-secondary)' }}>{wf.status}</div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>{wf.description}</div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text-muted)', alignItems: 'center' }}>
                  <span>{wf.triggers} Trigger</span>
                  <span>{wf.actions} Actions</span>
                  <span style={{ marginLeft: 'auto', color: wf.status === 'active' ? 'var(--success)' : 'var(--text-muted)' }}>{wf.runCount.toLocaleString()} runs</span>
                </div>
                {selected === wf.id && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }} onClick={e => e.stopPropagation()}>
                    <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }} onClick={() => toggleStatus(wf.id)}>
                      {wf.status === 'active' ? <><Pause size={11}/> Pause</> : <><Play size={11}/> Resume</>}
                    </button>
                    <button className="btn btn-secondary btn-sm" style={{ fontSize: '11px', color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.3)' }} onClick={() => setShowDeleteId(wf.id)}>
                      <Trash2 size={11}/>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', minHeight: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', zIndex: 10 }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} color="var(--primary)"/> {currentWf?.name}
            </h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary btn-sm" style={{ padding: '6px' }} onClick={() => showToast('⚙️ Settings opened')}><Settings size={14}/></button>
              <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => currentWf && toggleStatus(currentWf.id)}>
                {currentWf?.status === 'active' ? <><Pause size={14}/> Pause</> : <><Play size={14}/> Resume</>}
              </button>
            </div>
          </div>

          <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px dashed var(--border-color)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0', gap: '0' }}>
            {/* Trigger Node */}
            <div style={{ width: '280px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--accent)', borderRadius: '8px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer' }} onClick={() => setSelectedNode(selectedNode === 'trigger' ? null : 'trigger')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MousePointerClick size={16}/></div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Trigger</div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{canvas.trigger.split('→')[0].trim()}</div>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{canvas.trigger.split('→').slice(1).join('→').trim()}</div>
              {selectedNode === 'trigger' && (
                <div style={{ marginTop: '12px', padding: '10px', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.05)', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  ✓ Trigger configured. Click to edit conditions.
                </div>
              )}
            </div>

            {canvas.nodes.map((node, idx) => (
              <React.Fragment key={idx}>
                <div style={{ width: '2px', height: '36px', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', border: '2px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}/>
                </div>
                <div style={{ width: '280px', backgroundColor: 'var(--bg-primary)', border: `1px solid ${node.color === 'var(--text-muted)' ? 'var(--border-color)' : node.color}`, borderRadius: '8px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setSelectedNode(selectedNode === `node-${idx}` ? null : `node-${idx}`)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {idx === 0 ? <Database size={16}/> : idx === 1 ? <MessageSquare size={16}/> : <Mail size={16}/>}
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{node.type}</div>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>{node.label}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{node.detail}</div>
                  {selectedNode === `node-${idx}` && (
                    <div style={{ marginTop: '12px', padding: '10px', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.05)', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      Click to configure this action step in detail.
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}

            <div style={{ width: '2px', height: '32px', backgroundColor: 'var(--border-color)' }}/>
            <div onClick={() => showToast('➕ Add a new node to continue the workflow')} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.4)', transition: 'transform 0.2s' }}>
              <Plus size={20}/>
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Create New Workflow</h2>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20}/></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>WORKFLOW NAME *</label>
                <input className="form-control" placeholder="e.g. Post-Purchase Review Request" value={newName} onChange={e => setNewName(e.target.value)}/>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>DESCRIPTION</label>
                <input className="form-control" placeholder="Brief description of what this workflow does" value={newDesc} onChange={e => setNewDesc(e.target.value)}/>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>TRIGGER TYPE</label>
                <select className="form-control" style={{ cursor: 'pointer' }}>
                  <option>Form Submission</option><option>Page Visit</option><option>Tag Added</option><option>Email Opened</option><option>Deal Stage Changed</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={createWorkflow}><Check size={14}/> Create Workflow</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {showDeleteId !== null && (
        <div className="modal-overlay" onClick={() => setShowDeleteId(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 12px 0' }}>Delete Workflow?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 24px 0' }}>This will permanently delete "<strong>{workflows.find(w=>w.id===showDeleteId)?.name}</strong>" and all its run history.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowDeleteId(null)}>Cancel</button>
              <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--danger)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 500 }} onClick={() => deleteWorkflow(showDeleteId!)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
