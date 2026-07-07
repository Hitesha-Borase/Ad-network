import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';

interface PipelineDeal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: 'Discovery' | 'Proposal Sent' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
}

const pipelineStages = [
  'Discovery',
  'Proposal Sent',
  'Negotiation',
  'Closed Won',
  'Closed Lost'
] as const;

const initialDeals: PipelineDeal[] = [
  { id: '1', title: 'Cyberdyne AI Licensing', company: 'Cyberdyne Systems', value: 45000, stage: 'Negotiation' },
  { id: '2', title: 'Wayne Tech Integration', company: 'Wayne Enterprises', value: 280000, stage: 'Closed Won' },
  { id: '3', title: 'Stark Arc Reactor Marketing', company: 'Stark Industries', value: 150000, stage: 'Proposal Sent' },
  { id: '4', title: 'Daily Planet Subscription', company: 'Daily Planet', value: 35000, stage: 'Discovery' },
  { id: '5', title: 'LexCorp Satellite Ads', company: 'LexCorp', value: 120000, stage: 'Discovery' }
];

export const CrmPipeline: React.FC = () => {
  const [deals, setDeals] = useState<PipelineDeal[]>(initialDeals);

  const moveDeal = (id: string, direction: 'forward' | 'backward') => {
    setDeals(prevDeals => prevDeals.map(deal => {
      if (deal.id !== id) return deal;
      
      const currentIdx = pipelineStages.indexOf(deal.stage);
      let newIdx = currentIdx;
      if (direction === 'forward' && currentIdx < pipelineStages.length - 1) {
        newIdx += 1;
      } else if (direction === 'backward' && currentIdx > 0) {
        newIdx -= 1;
      }
      
      return {
        ...deal,
        stage: pipelineStages[newIdx]
      };
    }));
  };

  const getStageTotal = (stage: typeof pipelineStages[number]) => {
    return deals
      .filter(d => d.stage === stage)
      .reduce((sum, d) => sum + d.value, 0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      {/* Description header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Interactive Sales funnel. Click on arrow triggers to move deals between phases.
          </span>
        </div>
        <button 
          onClick={() => setDeals(initialDeals)}
          className="btn btn-secondary btn-sm"
        >
          <RefreshCw size={14} /> Reset Pipeline
        </button>
      </div>

      {/* Board Scroll Wrapper */}
      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        paddingBottom: '16px',
        minHeight: '520px'
      }}>
        {pipelineStages.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage);
          const stageTotal = getStageTotal(stage);

          return (
            <div key={stage} style={{
              flex: '1',
              minWidth: '260px',
              maxWidth: '320px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 12px',
              gap: '12px'
            }}>
              {/* Header column */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                    {stage}
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {stageDeals.length} {stageDeals.length === 1 ? 'deal' : 'deals'}
                  </span>
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: stage === 'Closed Won' ? 'var(--success)' : 'var(--text-muted)'
                }}>
                  ${stageTotal.toLocaleString()}
                </span>
              </div>

              {/* Cards lists */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                flex: 1,
                overflowY: 'auto'
              }}>
                {stageDeals.map(deal => (
                  <div key={deal.id} className="glass-card" style={{
                    padding: '14px',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div>
                      <h4 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                        {deal.title}
                      </h4>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{deal.company}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--success)' }}>
                        ${deal.value.toLocaleString()}
                      </span>

                      {/* Controls arrows */}
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {stage !== 'Discovery' && (
                          <button 
                            onClick={() => moveDeal(deal.id, 'backward')}
                            style={{
                              padding: '4px',
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid var(--border-color)',
                              borderRadius: '4px',
                              color: 'var(--text-secondary)',
                              cursor: 'pointer',
                              display: 'flex'
                            }}
                          >
                            <ArrowLeft size={12} />
                          </button>
                        )}
                        {stage !== 'Closed Lost' && (
                          <button 
                            onClick={() => moveDeal(deal.id, 'forward')}
                            style={{
                              padding: '4px',
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid var(--border-color)',
                              borderRadius: '4px',
                              color: 'var(--text-secondary)',
                              cursor: 'pointer',
                              display: 'flex'
                            }}
                          >
                            <ArrowRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed var(--border-color)',
                    borderRadius: '8px',
                    padding: '24px 12px',
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    textAlign: 'center'
                  }}>
                    No deals in {stage}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
