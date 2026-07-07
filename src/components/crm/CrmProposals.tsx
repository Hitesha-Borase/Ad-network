import React, { useState } from 'react';
import { Send, CheckCircle, XCircle, Plus } from 'lucide-react';

interface Proposal {
  id: string;
  title: string;
  client: string;
  value: number;
  status: 'draft' | 'sent' | 'accepted' | 'declined';
  sentDate: string;
}

const initialProposals: Proposal[] = [
  { id: '1', title: 'Enterprise Software Integration Proposal', client: 'Wayne Enterprises', value: 280000, status: 'accepted', sentDate: '2026-06-25' },
  { id: '2', title: 'Ad Campaign Creative Strategy & Media Buy', client: 'Stark Industries', value: 150000, status: 'sent', sentDate: '2026-07-02' },
  { id: '3', title: 'Robotics Automation Licensing Terms', client: 'Cyberdyne Systems', value: 45000, status: 'sent', sentDate: '2026-07-04' },
  { id: '4', title: 'Digital Brand Refresh Phase 2', client: 'Daily Planet', value: 35000, status: 'draft', sentDate: '-' }
];

export const CrmProposals: React.FC = () => {
  const [proposals] = useState<Proposal[]>(initialProposals);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(initialProposals[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      <div className="grid-cols-3" style={{ gridTemplateColumns: '1.2fr 1.8fr' }}>
        {/* Proposal List */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Proposals List</h2>
            <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }}>
              <Plus size={12} /> New Draft
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '450px', overflowY: 'auto' }}>
            {proposals.map(p => (
              <div 
                key={p.id}
                onClick={() => setSelectedProposal(p)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: selectedProposal?.id === p.id ? 'var(--primary)' : 'var(--border-color)',
                  backgroundColor: selectedProposal?.id === p.id ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="badge" style={{
                    fontSize: '9.5px',
                    padding: '2px 6px',
                    backgroundColor: 
                      p.status === 'accepted' ? 'var(--success-light)' :
                      p.status === 'declined' ? 'var(--danger-light)' :
                      p.status === 'sent' ? 'var(--warning-light)' : 'rgba(255,255,255,0.03)',
                    color:
                      p.status === 'accepted' ? 'var(--success)' :
                      p.status === 'declined' ? 'var(--danger)' :
                      p.status === 'sent' ? 'var(--warning)' : 'var(--text-muted)'
                  }}>
                    {p.status}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--success)' }}>
                    ${p.value.toLocaleString()}
                  </span>
                </div>
                <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0 }}>{p.client}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Proposal Details/Document Preview */}
        {selectedProposal ? (
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px 0' }}>{selectedProposal.title}</h2>
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Client: <strong style={{ color: 'var(--text-primary)' }}>{selectedProposal.client}</strong>
                </span>
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sent: {selectedProposal.sentDate}</span>
            </div>

            {/* Document Mock View */}
            <div style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.01)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxHeight: '340px',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed var(--border-color)', paddingBottom: '10px' }}>
                <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--primary)' }}>
                  Executive Summary
                </span>
                <span style={{ fontSize: '12px', fontWeight: 600 }}>ID: PROP-{selectedProposal.id}88</span>
              </div>

              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                This business proposal presents our comprehensive framework designed to integrate seamlessly into {selectedProposal.client}'s operations. Our platform enables enterprise-level scaling, multi-tenant workspace setups, advanced developer sandboxes, and AI-driven campaign automation tools.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <strong style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Scope of Deliverables:</strong>
                <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>Custom Multi-Workspace Dashboard Configuration</li>
                  <li>Developer Sandbox Integration & Webhook Automation Builders</li>
                  <li>Real-time Forecasting Algorithms & Lead Tiers Metrics</li>
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', paddingTop: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Estimated Investment:</span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--success)' }}>${selectedProposal.value.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Actions bottom */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {selectedProposal.status === 'draft' && (
                <button className="btn btn-primary btn-sm">
                  <Send size={12} /> Send Proposal
                </button>
              )}
              {selectedProposal.status === 'sent' && (
                <>
                  <button className="btn btn-secondary btn-sm" style={{ color: 'var(--danger)', borderColor: 'var(--danger-light)' }}>
                    <XCircle size={12} /> Decline
                  </button>
                  <button className="btn btn-primary btn-sm">
                    <CheckCircle size={12} /> Accept Proposal
                  </button>
                </>
              )}
              {selectedProposal.status === 'accepted' && (
                <button className="btn btn-secondary btn-sm" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                  Accepted & Signed
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: 'var(--text-muted)' }}>
            Select a proposal to view draft terms.
          </div>
        )}
      </div>
    </div>
  );
};
