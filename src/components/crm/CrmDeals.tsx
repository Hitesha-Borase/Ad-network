import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: 'Discovery' | 'Proposal Sent' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  probability: number;
  expectedClose: string;
  owner: string;
}

const initialDeals: Deal[] = [
  { id: '1', title: 'Cyberdyne AI Licensing', company: 'Cyberdyne Systems', value: 45000, stage: 'Negotiation', probability: 80, expectedClose: '2026-07-20', owner: 'Alex Mercer' },
  { id: '2', title: 'Wayne Corp Tech Integration', company: 'Wayne Enterprises', value: 280000, stage: 'Closed Won', probability: 100, expectedClose: '2026-06-30', owner: 'Alex Mercer' },
  { id: '3', title: 'Stark Arc Reactor Marketing', company: 'Stark Industries', value: 150000, stage: 'Proposal Sent', probability: 50, expectedClose: '2026-08-15', owner: 'Jane Foster' },
  { id: '4', title: 'Daily Planet Subscription Ad Buy', company: 'Daily Planet', value: 35000, stage: 'Discovery', probability: 20, expectedClose: '2026-09-01', owner: 'John Doe' },
  { id: '5', title: 'LexCorp Satellite Ad Networks', company: 'LexCorp', value: 120000, stage: 'Closed Lost', probability: 0, expectedClose: '2026-05-10', owner: 'Jane Foster' }
];

export const CrmDeals: React.FC = () => {
  const [deals] = useState<Deal[]>(initialDeals);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDeals = deals.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      {/* Search and Top stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input
            type="text"
            placeholder="Search deals..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '38px' }}
          />
        </div>

        {/* Short Summary stats */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Pipeline Value:</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>$630,000</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Deal Name</th>
                <th>Company</th>
                <th>Value</th>
                <th>Stage</th>
                <th>Probability</th>
                <th>Expected Close</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map(deal => (
                <tr key={deal.id}>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{deal.title}</span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{deal.company}</td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--success)' }}>
                      ${deal.value.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className="badge" style={{
                      backgroundColor: 
                        deal.stage === 'Closed Won' ? 'var(--success-light)' :
                        deal.stage === 'Closed Lost' ? 'var(--danger-light)' :
                        deal.stage === 'Negotiation' ? 'var(--warning-light)' :
                        deal.stage === 'Proposal Sent' ? 'var(--primary-light)' : 'var(--info-light)',
                      color:
                        deal.stage === 'Closed Won' ? 'var(--success)' :
                        deal.stage === 'Closed Lost' ? 'var(--danger)' :
                        deal.stage === 'Negotiation' ? 'var(--warning)' :
                        deal.stage === 'Proposal Sent' ? 'var(--primary)' : 'var(--info)'
                    }}>
                      {deal.stage}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        flex: 1,
                        width: '60px',
                        height: '6px',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${deal.probability}%`,
                          height: '100%',
                          backgroundColor: deal.probability > 70 ? 'var(--success)' : deal.probability > 40 ? 'var(--warning)' : 'var(--danger)'
                        }} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 500 }}>{deal.probability}%</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={13} style={{ color: 'var(--text-muted)' }} />
                      {deal.expectedClose}
                    </div>
                  </td>
                  <td style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>{deal.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
