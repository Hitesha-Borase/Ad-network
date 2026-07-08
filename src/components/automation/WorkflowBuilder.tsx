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

const initialWorkflows: Workflow[] = [
  { id: 1, name: 'Lead Nurturing Sequence', description: 'Form submit → AI score → route to sales or drip', status: 'active', triggers: 1, actions: 4, runCount: 1240 },
  { id: 2, name: 'Abandoned Cart Recovery', description: 'Cart abandoned → wait 1h → send email series', status: 'active', triggers: 2, actions: 3, runCount: 843 },
  { id: 3, name: 'VIP Customer Onboarding', description: 'Deal won → assign CSM → send welcome series', status: 'paused', triggers: 1, actions: 6, runCount: 120 },
  { id: 4, name: 'Support Ticket Escalation', description: 'Ticket priority high → Slack alert → assign senior', status: 'active', triggers: 3, actions: 2, runCount: 4530 },
];

const canvasNodes: Record<number, { trigger: string; nodes: { label: string; type: string; detail: string; color: string }[] }> = {
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

export const WorkflowBuilder: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const [selected, setSelected] = useState<number>(1);
  const [showCreate, setShowCreate] = useState(false);
  const [showDeleteId, setShowDeleteId] = useState<number | null>(null);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [toast, setToast] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

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
  const canvas = canvasNodes[selected] ?? { trigger: 'Custom Trigger', nodes: [] };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="fade-in">
      {toast && <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--primary)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--primary)' }}>{toast}</div>}

      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 30px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>Workflow Automation Builder</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Visually design AI-driven workflows that connect your apps, data, and communication channels.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setShowCreate(true)}>
          <Plus size={16}/> Create Workflow
        </button>
      </div>

      <div className="grid-cols-3" style={{ gridTemplateColumns: '1fr 2fr' }}>
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
