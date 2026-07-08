import React, { useState } from 'react';
import { Tag, RefreshCw, Send, Clock, Plus, Search, Edit2, Copy, Trash2, X, Check, Loader } from 'lucide-react';

interface Segment {
  id: number;
  name: string;
  size: number;
  time: string;
  sync: string[];
  live: boolean;
  syncing?: boolean;
}

const DESTINATIONS = ['Meta Ads', 'Google Ads', 'Klaviyo', 'Salesforce', 'Intercom', 'HubSpot'];

const initialSegments: Segment[] = [
  { id: 1, name: 'High Intent Non-Converters (30d)', size: 14208, time: '10 mins ago', sync: ['Meta Ads', 'Google Ads'], live: true },
  { id: 2, name: 'Active Enterprise Customers', size: 1492, time: '1 hour ago', sync: ['Salesforce', 'Intercom'], live: true },
  { id: 3, name: 'Cart Abandoners (7d)', size: 5821, time: '5 mins ago', sync: ['Klaviyo', 'Meta Ads'], live: true },
  { id: 4, name: 'Churn Risk (Low Usage)', size: 890, time: '1 day ago', sync: ['Intercom'], live: true },
  { id: 5, name: 'Webinar Registrants (Q3)', size: 12450, time: 'Static List', sync: [], live: false },
];

export const Segments: React.FC = () => {
  const [segments, setSegments] = useState<Segment[]>(initialSegments);
  const [query, setQuery] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState<Segment | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [toast, setToast] = useState('');
  const [newName, setNewName] = useState('');
  const [newDest, setNewDest] = useState<string[]>([]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const syncNow = (id: number) => {
    setSegments(ss => ss.map(s => s.id === id ? { ...s, syncing: true } : s));
    setTimeout(() => {
      setSegments(ss => ss.map(s => s.id === id ? { ...s, syncing: false, time: 'Just now' } : s));
      showToast('✅ Segment synced successfully!');
    }, 1800);
  };

  const duplicateSegment = (seg: Segment) => {
    const newId = Math.max(...segments.map(s => s.id)) + 1;
    setSegments(ss => [...ss, { ...seg, id: newId, name: `${seg.name} (Copy)`, time: 'Just now' }]);
    showToast(`✅ "${seg.name}" duplicated`);
  };

  const deleteSegment = (id: number) => {
    setSegments(ss => ss.filter(s => s.id !== id));
    setDeleteId(null);
    showToast('🗑 Segment deleted');
  };

  const createSegment = () => {
    if (!newName.trim()) return;
    const newId = Math.max(...segments.map(s => s.id)) + 1;
    setSegments(ss => [...ss, { id: newId, name: newName, size: 0, time: 'Just created', sync: newDest, live: newDest.length > 0 }]);
    setNewName(''); setNewDest([]);
    setShowCreate(false);
    showToast('✅ Segment created!');
  };

  const toggleDest = (dest: string) => setNewDest(d => d.includes(dest) ? d.filter(x => x !== dest) : [...d, dest]);

  const filtered = segments.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {toast && <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--success)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--success)' }}>{toast}</div>}

      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(16,185,129,0.15) 100%)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tag size={22} color="var(--primary)"/> Audiences &amp; Segments
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>Manage your saved segments and sync them directly to ad networks and email platforms.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
            <input placeholder="Search segments..." value={query} onChange={e => setQuery(e.target.value)} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 12px 8px 32px', color: '#fff', fontSize: '13px', width: '180px' }}/>
          </div>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }} onClick={() => setShowCreate(true)}>
            <Plus size={14}/> New Segment
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Total Segments', val: segments.length, color: 'var(--primary)' },
          { label: 'Total Profiles', val: segments.reduce((s, sg) => s + sg.size, 0).toLocaleString(), color: 'var(--success)' },
          { label: 'Active Syncs', val: segments.filter(s => s.sync.length > 0).length, color: 'var(--accent)' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive-wrapper">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Segment Name</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Size</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Last Updated</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Sync Destinations</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="table-row-hover">
                  <td style={{ padding: '16px 24px', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: row.live ? 'var(--success)' : 'var(--text-muted)', flexShrink: 0 }}/>
                      {row.name}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: 700 }}>{row.size.toLocaleString()}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {row.time === 'Static List' ? <Clock size={13}/> : <RefreshCw size={13}/>} {row.time}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {row.sync.length > 0 ? row.sync.map(d => (
                        <span key={d} style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', fontSize: '11px', color: 'var(--text-secondary)' }}>{d}</span>
                      )) : <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No active syncs</span>}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', minWidth: '90px', justifyContent: 'center' }} onClick={() => syncNow(row.id)} disabled={row.syncing || row.sync.length === 0}>
                        {row.syncing ? <><Loader size={12} style={{ animation: 'spin 1s linear infinite' }}/> Syncing...</> : <><Send size={12}/> Sync Now</>}
                      </button>
                      <button title="Edit" onClick={() => setShowEdit(row)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px' }}><Edit2 size={14}/></button>
                      <button title="Duplicate" onClick={() => duplicateSegment(row)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px' }}><Copy size={14}/></button>
                      <button title="Delete" onClick={() => setDeleteId(row.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '6px' }}><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No segments match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <style>{`.table-row-hover:hover{background:rgba(255,255,255,0.02)} @keyframes spin{from{transform:rotate(0deg)} to{transform:rotate(360deg)}}`}</style>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Create New Segment</h2>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20}/></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>SEGMENT NAME *</label><input className="form-control" placeholder="e.g. Trial Users (Last 14d)" value={newName} onChange={e => setNewName(e.target.value)}/></div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '10px' }}>SYNC DESTINATIONS</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {DESTINATIONS.map(d => (
                    <button key={d} onClick={() => toggleDest(d)} style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 500, background: newDest.includes(d) ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: newDest.includes(d) ? '#fff' : 'var(--text-secondary)', border: `1px solid ${newDest.includes(d) ? 'var(--primary)' : 'var(--border-color)'}`, cursor: 'pointer' }}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={createSegment}><Check size={14}/> Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId !== null && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '380px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 12px 0' }}>Delete Segment?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 24px 0' }}>This will permanently delete "<strong>{segments.find(s => s.id === deleteId)?.name}</strong>". This cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--danger)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 500 }} onClick={() => deleteSegment(deleteId!)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
