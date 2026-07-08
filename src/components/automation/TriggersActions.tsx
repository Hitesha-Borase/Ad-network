import React, { useState, useMemo } from 'react';
import { Zap, Plug, Server, MessageSquare, Mail, Box, Search, Plus, ChevronDown, ChevronUp, ToggleLeft, ToggleRight, X, Check } from 'lucide-react';

interface TriggerItem {
  id: string;
  name: string;
  icon: React.ElementType;
  desc: string;
  color: string;
  category: 'Web' | 'Email' | 'CRM' | 'Custom';
  enabled: boolean;
  expanded: boolean;
}

interface ActionItem {
  id: string;
  name: string;
  icon: React.ElementType;
  desc: string;
  color: string;
  category: 'Messaging' | 'CRM' | 'Data' | 'Custom';
  enabled: boolean;
  expanded: boolean;
}

const initialTriggers: TriggerItem[] = [
  { id: 't1', name: 'Form Submission', icon: Box, desc: 'Triggers when a native or embedded form is submitted.', color: 'var(--primary)', category: 'Web', enabled: true, expanded: false },
  { id: 't2', name: 'Page Visit', icon: Server, desc: 'Triggers when a user visits a specific URL.', color: 'var(--info)', category: 'Web', enabled: true, expanded: false },
  { id: 't3', name: 'Tag Added', icon: Zap, desc: 'Triggers when a CRM tag is applied to a profile.', color: 'var(--accent)', category: 'CRM', enabled: false, expanded: false },
  { id: 't4', name: 'Email Opened', icon: Mail, desc: 'Triggers when a user opens a marketing email.', color: 'var(--success)', category: 'Email', enabled: true, expanded: false },
  { id: 't5', name: 'Deal Stage Changed', icon: Plug, desc: 'Triggers when a CRM deal moves to a new stage.', color: 'var(--warning)', category: 'CRM', enabled: true, expanded: false },
  { id: 't6', name: 'Webhook Received', icon: Server, desc: 'Triggers on an incoming HTTP POST from an external service.', color: 'var(--info)', category: 'Custom', enabled: false, expanded: false },
];

const initialActions: ActionItem[] = [
  { id: 'a1', name: 'Send Email', icon: Mail, desc: 'Dispatches a templated or AI-generated email.', color: 'var(--primary)', category: 'Messaging', enabled: true, expanded: false },
  { id: 'a2', name: 'Add to Segment', icon: Plug, desc: 'Moves the user into a specified CDP segment.', color: 'var(--info)', category: 'Data', enabled: true, expanded: false },
  { id: 'a3', name: 'Notify Slack', icon: MessageSquare, desc: 'Sends a custom message to a Slack channel.', color: 'var(--accent)', category: 'Messaging', enabled: true, expanded: false },
  { id: 'a4', name: 'Update CRM Field', icon: Box, desc: 'Overwrites a data attribute in the user profile.', color: 'var(--success)', category: 'CRM', enabled: true, expanded: false },
  { id: 'a5', name: 'Create CRM Task', icon: Zap, desc: 'Assigns a follow-up task to a sales rep.', color: 'var(--warning)', category: 'CRM', enabled: false, expanded: false },
  { id: 'a6', name: 'HTTP Request', icon: Server, desc: 'Sends data to any external API endpoint.', color: 'var(--danger)', category: 'Custom', enabled: false, expanded: false },
];

const ALL_CATS = 'All';

export const TriggersActions: React.FC = () => {
  const [triggers, setTriggers] = useState<TriggerItem[]>(initialTriggers);
  const [actions, setActions] = useState<ActionItem[]>(initialActions);
  const [query, setQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState('');
  const [tCategory, setTCategory] = useState(ALL_CATS);
  const [aCategory, setACategory] = useState(ALL_CATS);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const toggleTrigger = (id: string, field: 'enabled' | 'expanded') => {
    setTriggers(ts => ts.map(t => t.id === id ? { ...t, [field]: !t[field] } : field === 'expanded' ? { ...t, expanded: false } : t));
  };
  const toggleAction = (id: string, field: 'enabled' | 'expanded') => {
    setActions(as => as.map(a => a.id === id ? { ...a, [field]: !a[field] } : field === 'expanded' ? { ...a, expanded: false } : a));
  };

  const filteredTriggers = useMemo(() => triggers.filter(t =>
    (tCategory === ALL_CATS || t.category === tCategory) &&
    (query === '' || t.name.toLowerCase().includes(query.toLowerCase()) || t.desc.toLowerCase().includes(query.toLowerCase()))
  ), [triggers, query, tCategory]);

  const filteredActions = useMemo(() => actions.filter(a =>
    (aCategory === ALL_CATS || a.category === aCategory) &&
    (query === '' || a.name.toLowerCase().includes(query.toLowerCase()) || a.desc.toLowerCase().includes(query.toLowerCase()))
  ), [actions, query, aCategory]);

  const TCard = ({ item, onToggle }: { item: TriggerItem | ActionItem; onToggle: (id: string, f: 'enabled' | 'expanded') => void }) => (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0', cursor: 'pointer', transition: 'all 0.2s', padding: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }} onClick={() => onToggle(item.id, 'expanded')}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0 }}>
          <item.icon size={20}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 4px 0' }}>{item.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontWeight: 600 }}>{item.category}</span>
              {item.expanded ? <ChevronUp size={14} color="var(--text-muted)"/> : <ChevronDown size={14} color="var(--text-muted)"/>}
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
        </div>
      </div>
      {item.expanded && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Status</span>
            <button onClick={e => { e.stopPropagation(); onToggle(item.id, 'enabled'); showToast(item.enabled ? '⚠️ Integration disabled' : '✅ Integration enabled'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: item.enabled ? 'var(--success)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}>
              {item.enabled ? <ToggleRight size={22}/> : <ToggleLeft size={22}/>}
              {item.enabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>CONFIGURATION</label>
            <input className="form-control" style={{ fontSize: '12px' }} placeholder="Enter event name, URL pattern, or condition..."/>
          </div>
          <button className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-end' }} onClick={e => { e.stopPropagation(); showToast('✅ Configuration saved!'); }}>Save Config</button>
        </div>
      )}
    </div>
  );

  const tCategories = [ALL_CATS, ...Array.from(new Set(triggers.map(t => t.category)))];
  const aCategories = [ALL_CATS, ...Array.from(new Set(actions.map(a => a.category)))];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {toast && <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--primary)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--primary)' }}>{toast}</div>}

      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 30px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={24} color="var(--primary)"/> Triggers & Actions Library
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Manage the integrations and events that power your automation workflows.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }}/>
            <input type="text" placeholder="Search library..." value={query} onChange={e => setQuery(e.target.value)} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 12px 8px 36px', color: '#fff', fontSize: '13px', width: '240px' }}/>
          </div>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setShowAddModal(true)}><Plus size={14}/> Add Custom Integration</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Triggers */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Available Triggers <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 400 }}>({filteredTriggers.length})</span></h2>
            <div style={{ display: 'flex', gap: '6px' }}>
              {tCategories.map(c => <button key={c} onClick={() => setTCategory(c)} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: tCategory === c ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: tCategory === c ? '#fff' : 'var(--text-muted)', border: 'none', cursor: 'pointer' }}>{c}</button>)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredTriggers.length === 0 ? <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: '13px' }}>No triggers match your search.</div> : filteredTriggers.map(t => <TCard key={t.id} item={t} onToggle={toggleTrigger}/>)}
          </div>
        </div>

        {/* Actions */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Available Actions <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 400 }}>({filteredActions.length})</span></h2>
            <div style={{ display: 'flex', gap: '6px' }}>
              {aCategories.map(c => <button key={c} onClick={() => setACategory(c)} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: aCategory === c ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: aCategory === c ? '#fff' : 'var(--text-muted)', border: 'none', cursor: 'pointer' }}>{c}</button>)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredActions.length === 0 ? <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: '13px' }}>No actions match your search.</div> : filteredActions.map(a => <TCard key={a.id} item={a} onToggle={toggleAction}/>)}
          </div>
        </div>
      </div>

      {/* Add Custom Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Add Custom Integration</h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20}/></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>INTEGRATION NAME *</label><input className="form-control" placeholder="e.g. Stripe Payment Event"/></div>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>TYPE</label>
                <select className="form-control" style={{ cursor: 'pointer' }}><option>Trigger</option><option>Action</option></select>
              </div>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>ENDPOINT / EVENT KEY</label><input className="form-control" placeholder="e.g. payment.succeeded"/></div>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>DESCRIPTION</label><input className="form-control" placeholder="Brief description..."/></div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => { setShowAddModal(false); showToast('✅ Custom integration added!'); }}><Check size={14}/> Add Integration</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
