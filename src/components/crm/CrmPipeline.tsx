import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Plus, X, DollarSign, Building, Check } from 'lucide-react';

interface PipelineDeal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: 'Discovery' | 'Proposal Sent' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  contact?: string;
  probability?: number;
  closeDate?: string;
}

const pipelineStages = ['Discovery', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost'] as const;
type Stage = typeof pipelineStages[number];

const stageColors: Record<Stage, string> = {
  'Discovery': 'var(--info)',
  'Proposal Sent': 'var(--primary)',
  'Negotiation': 'var(--warning)',
  'Closed Won': 'var(--success)',
  'Closed Lost': 'var(--danger)',
};

const initialDeals: PipelineDeal[] = [
  { id: '1', title: 'Cyberdyne AI Licensing', company: 'Cyberdyne Systems', value: 45000, stage: 'Negotiation', contact: 'Sarah Connor', probability: 65, closeDate: '2026-07-30' },
  { id: '2', title: 'Wayne Tech Integration', company: 'Wayne Enterprises', value: 280000, stage: 'Closed Won', contact: 'Bruce Wayne', probability: 100, closeDate: '2026-07-01' },
  { id: '3', title: 'Stark Arc Reactor Marketing', company: 'Stark Industries', value: 150000, stage: 'Proposal Sent', contact: 'Tony Stark', probability: 40, closeDate: '2026-08-15' },
  { id: '4', title: 'Daily Planet Subscription', company: 'Daily Planet', value: 35000, stage: 'Discovery', contact: 'Clark Kent', probability: 20, closeDate: '2026-09-01' },
  { id: '5', title: 'LexCorp Satellite Ads', company: 'LexCorp', value: 120000, stage: 'Discovery', contact: 'Lex Luthor', probability: 25, closeDate: '2026-08-30' },
];

export const CrmPipeline: React.FC = () => {
  const [deals, setDeals] = useState<PipelineDeal[]>(initialDeals);
  const [selectedDeal, setSelectedDeal] = useState<PipelineDeal | null>(null);
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [addStage, setAddStage] = useState<Stage>('Discovery');
  const [toast, setToast] = useState('');
  const [newDeal, setNewDeal] = useState({ title: '', company: '', value: '', contact: '', closeDate: '' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const moveDeal = (id: string, direction: 'forward' | 'backward') => {
    setDeals(prev => prev.map(deal => {
      if (deal.id !== id) return deal;
      const currentIdx = pipelineStages.indexOf(deal.stage);
      let newIdx = currentIdx;
      if (direction === 'forward' && currentIdx < pipelineStages.length - 1) newIdx += 1;
      else if (direction === 'backward' && currentIdx > 0) newIdx -= 1;
      if (newIdx !== currentIdx) {
        showToast(`✅ Moved to "${pipelineStages[newIdx]}"`);
        const updated = { ...deal, stage: pipelineStages[newIdx] };
        if (selectedDeal?.id === id) setSelectedDeal(updated);
        return updated;
      }
      return deal;
    }));
  };

  const deleteDeal = (id: string) => {
    setDeals(prev => prev.filter(d => d.id !== id));
    setSelectedDeal(null);
    showToast('🗑 Deal removed from pipeline');
  };

  const addDeal = () => {
    if (!newDeal.title.trim() || !newDeal.company.trim()) return;
    const newId = Date.now().toString();
    const deal: PipelineDeal = { id: newId, title: newDeal.title, company: newDeal.company, value: parseInt(newDeal.value) || 0, stage: addStage, contact: newDeal.contact, probability: 20, closeDate: newDeal.closeDate };
    setDeals(prev => [...prev, deal]);
    setNewDeal({ title: '', company: '', value: '', contact: '', closeDate: '' });
    setShowAddDeal(false);
    showToast('✅ Deal added to pipeline!');
  };

  const getStageTotal = (stage: Stage) => deals.filter(d => d.stage === stage).reduce((sum, d) => sum + d.value, 0);
  const totalPipeline = deals.filter(d => d.stage !== 'Closed Lost').reduce((sum, d) => sum + d.value, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      {toast && <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--primary)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--primary)' }}>{toast}</div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '16px' }}>{deals.length}</span> deals · <span style={{ fontWeight: 700, color: 'var(--success)', fontSize: '16px' }}>${totalPipeline.toLocaleString()}</span> pipeline
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => { setShowAddDeal(true); setAddStage('Discovery'); }} className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Plus size={14}/> Add Deal</button>
          <button onClick={() => setDeals(initialDeals)} className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><RefreshCw size={14}/> Reset</button>
        </div>
      </div>

      {/* Board */}
      <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '16px', minHeight: '520px' }}>
        {pipelineStages.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage);
          const stageTotal = getStageTotal(stage);
          return (
            <div key={stage} style={{ flex: '1', minWidth: '230px', maxWidth: '300px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: `1px solid ${stageColors[stage]}22`, display: 'flex', flexDirection: 'column', padding: '14px 10px', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${stageColors[stage]}33`, paddingBottom: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: stageColors[stage] }}/>
                    <h3 style={{ fontSize: '12px', fontWeight: 700, color: stageColors[stage], margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stage}</h3>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '12px' }}>{stageDeals.length} deal{stageDeals.length !== 1 ? 's' : ''}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: stage === 'Closed Won' ? 'var(--success)' : 'var(--text-secondary)' }}>${stageTotal.toLocaleString()}</span>
                  <button onClick={() => { setAddStage(stage); setShowAddDeal(true); }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginTop: '2px' }}><Plus size={14}/></button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
                {stageDeals.map(deal => (
                  <div key={deal.id} onClick={() => setSelectedDeal(deal)} className="glass-card" style={{ padding: '12px', backgroundColor: selectedDeal?.id === deal.id ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px', border: selectedDeal?.id === deal.id ? '1px solid rgba(99,102,241,0.3)' : '1px solid var(--border-color)', transition: 'all 0.2s' }}>
                    <div>
                      <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px 0', lineHeight: 1.3 }}>{deal.title}</h4>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{deal.company}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--success)' }}>${deal.value.toLocaleString()}</span>
                      <div style={{ display: 'flex', gap: '4px' }} onClick={e => e.stopPropagation()}>
                        {stage !== 'Discovery' && <button onClick={() => moveDeal(deal.id, 'backward')} style={{ padding: '3px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex' }}><ArrowLeft size={11}/></button>}
                        {stage !== 'Closed Lost' && <button onClick={() => moveDeal(deal.id, 'forward')} style={{ padding: '3px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '4px', color: 'var(--primary)', cursor: 'pointer', display: 'flex' }}><ArrowRight size={11}/></button>}
                      </div>
                    </div>
                  </div>
                ))}
                {stageDeals.length === 0 && (
                  <div onClick={() => { setAddStage(stage); setShowAddDeal(true); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-color)', borderRadius: '8px', padding: '24px 12px', color: 'var(--text-muted)', fontSize: '11px', textAlign: 'center', cursor: 'pointer', flexDirection: 'column', gap: '8px' }}>
                    <Plus size={16}/> Add deal
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deal Detail Drawer */}
      {selectedDeal && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '360px', backgroundColor: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)', zIndex: 500, display: 'flex', flexDirection: 'column', padding: '24px', gap: '20px', boxShadow: '-8px 0 32px rgba(0,0,0,0.4)', animation: 'fadeIn 0.2s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '11px', color: stageColors[selectedDeal.stage], fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>{selectedDeal.stage}</div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>{selectedDeal.title}</h2>
            </div>
            <button onClick={() => setSelectedDeal(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20}/></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { icon: Building, label: 'Company', val: selectedDeal.company },
              { icon: DollarSign, label: 'Deal Value', val: `$${selectedDeal.value.toLocaleString()}` },
              { icon: DollarSign, label: 'Contact', val: selectedDeal.contact ?? 'N/A' },
              { icon: DollarSign, label: 'Close Date', val: selectedDeal.closeDate ?? 'TBD' },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontWeight: 600 }}>{val}</span>
              </div>
            ))}
            {selectedDeal.probability !== undefined && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Win Probability</span>
                  <span style={{ fontWeight: 700, color: selectedDeal.probability > 60 ? 'var(--success)' : 'var(--warning)' }}>{selectedDeal.probability}%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${selectedDeal.probability}%`, height: '100%', backgroundColor: selectedDeal.probability > 60 ? 'var(--success)' : 'var(--warning)', borderRadius: '3px', transition: 'width 0.5s' }}/>
                </div>
              </div>
            )}
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {selectedDeal.stage !== 'Discovery' && <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => moveDeal(selectedDeal.id, 'backward')}><ArrowLeft size={12}/> Back</button>}
              {selectedDeal.stage !== 'Closed Lost' && <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => moveDeal(selectedDeal.id, 'forward')}>Advance <ArrowRight size={12}/></button>}
            </div>
            <button style={{ padding: '8px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', color: 'var(--danger)', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', fontSize: '12px', fontWeight: 500 }} onClick={() => deleteDeal(selectedDeal.id)}>Remove Deal</button>
          </div>
        </div>
      )}

      {/* Add Deal Modal */}
      {showAddDeal && (
        <div className="modal-overlay" onClick={() => setShowAddDeal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Add New Deal</h2>
              <button onClick={() => setShowAddDeal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20}/></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>DEAL TITLE *</label><input className="form-control" placeholder="e.g. Enterprise License 2024" value={newDeal.title} onChange={e => setNewDeal({...newDeal, title: e.target.value})}/></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>COMPANY *</label><input className="form-control" placeholder="Company name" value={newDeal.company} onChange={e => setNewDeal({...newDeal, company: e.target.value})}/></div>
                <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>VALUE ($)</label><input className="form-control" type="number" placeholder="50000" value={newDeal.value} onChange={e => setNewDeal({...newDeal, value: e.target.value})}/></div>
              </div>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>PIPELINE STAGE</label>
                <select className="form-control" value={addStage} onChange={e => setAddStage(e.target.value as Stage)} style={{ cursor: 'pointer' }}>
                  {pipelineStages.map(s => <option key={s} value={s} style={{ backgroundColor: '#1a1f2e' }}>{s}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>CONTACT</label><input className="form-control" placeholder="Contact name" value={newDeal.contact} onChange={e => setNewDeal({...newDeal, contact: e.target.value})}/></div>
                <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>CLOSE DATE</label><input className="form-control" type="date" value={newDeal.closeDate} onChange={e => setNewDeal({...newDeal, closeDate: e.target.value})}/></div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowAddDeal(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={addDeal}><Check size={14}/> Add Deal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
