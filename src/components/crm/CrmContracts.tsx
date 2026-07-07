import React, { useState } from 'react';
import { Search, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface Contract {
  id: string;
  title: string;
  client: string;
  status: 'active' | 'pending' | 'expired';
  startDate: string;
  endDate: string;
  complianceChecked: boolean;
}

const initialContracts: Contract[] = [
  { id: '1', title: 'Master Service Agreement', client: 'Wayne Enterprises', status: 'active', startDate: '2026-06-01', endDate: '2027-05-31', complianceChecked: true },
  { id: '2', title: 'Non-Disclosure Agreement', client: 'Stark Industries', status: 'active', startDate: '2026-07-02', endDate: '2028-07-01', complianceChecked: true },
  { id: '3', title: 'AI Engineering License SLA', client: 'Cyberdyne Systems', status: 'pending', startDate: '2026-07-15', endDate: '2027-07-14', complianceChecked: false },
  { id: '4', title: 'Pilot Sponsorship Agreement', client: 'Ferris Aircraft', status: 'expired', startDate: '2025-01-01', endDate: '2025-12-31', complianceChecked: true }
];

export const CrmContracts: React.FC = () => {
  const [contracts] = useState<Contract[]>(initialContracts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContracts = contracts.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      {/* Top search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            placeholder="Search contracts..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '38px' }}
          />
        </div>
      </div>

      {/* Contracts table */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Contract Document</th>
                <th>Client</th>
                <th>Status</th>
                <th>Validity Period</th>
                <th>Compliance</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={18} style={{ color: 'var(--primary)' }} />
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{c.client}</td>
                  <td>
                    <span className="badge" style={{
                      backgroundColor: 
                        c.status === 'active' ? 'var(--success-light)' :
                        c.status === 'expired' ? 'var(--danger-light)' : 'var(--warning-light)',
                      color:
                        c.status === 'active' ? 'var(--success)' :
                        c.status === 'expired' ? 'var(--danger)' : 'var(--warning)'
                    }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <span>{c.startDate} to {c.endDate}</span>
                  </td>
                  <td>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: c.complianceChecked ? 'var(--success)' : 'var(--warning)'
                    }}>
                      {c.complianceChecked ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                      {c.complianceChecked ? 'Verified' : 'Pending Verification'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary)',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 500,
                      marginRight: '12px'
                    }}>
                      Download
                    </button>
                    {c.status === 'pending' && (
                      <button style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--success)',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 600
                      }}>
                        Sign NDA
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
