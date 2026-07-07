import React, { useState } from 'react';
import { Search, Building, Users, ExternalLink, Plus } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  industry: string;
  employees: number;
  revenue: string;
  deals: number;
  dealValue: string;
  website: string;
}

const initialCompanies: Company[] = [
  { id: '1', name: 'Stark Industries', industry: 'Defense & Clean Energy', employees: 12000, revenue: '$850M', deals: 4, dealValue: '$450,000', website: 'https://stark.com' },
  { id: '2', name: 'Wayne Enterprises', industry: 'Industrial & Technology', employees: 45000, revenue: '$2.1B', deals: 2, dealValue: '$280,000', website: 'https://wayne.com' },
  { id: '3', name: 'Cyberdyne Systems', industry: 'Robotics & AI Research', employees: 850, revenue: '$45M', deals: 1, dealValue: '$45,000', website: 'https://cyberdyne.org' },
  { id: '4', name: 'Daily Planet', industry: 'Media & Publishing', employees: 300, revenue: '$12M', deals: 3, dealValue: '$95,000', website: 'https://dailyplanet.com' },
  { id: '5', name: 'LexCorp', industry: 'Biotech & Aerospace', employees: 25000, revenue: '$1.4B', deals: 1, dealValue: '$150,000', website: 'https://lexcorp.com' }
];

export const CrmCompanies: React.FC = () => {
  const [companies] = useState<Company[]>(initialCompanies);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      {/* Search & Actions */}
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
            placeholder="Search companies by name or industry..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '38px' }}
          />
        </div>

        <button className="btn btn-primary">
          <Plus size={16} /> Add Company
        </button>
      </div>

      {/* Grid */}
      <div className="grid-cols-2">
        {filteredCompanies.map(company => (
          <div key={company.id} className="glass-card" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)'
                }}>
                  <Building size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                    {company.name}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {company.industry}
                  </span>
                </div>
              </div>

              <a 
                href={company.website} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                className="hover-primary"
              >
                <ExternalLink size={16} />
              </a>
            </div>

            {/* Middle statistics metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              padding: '12px',
              backgroundColor: 'rgba(255,255,255,0.02)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)'
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Employees</span>
                <span style={{ fontSize: '13.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={12} style={{ color: 'var(--primary)' }} /> {company.employees.toLocaleString()}
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Est. Revenue</span>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{company.revenue}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Active Deals</span>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--success)' }}>
                  {company.deals} ({company.dealValue})
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary btn-sm">Company Details</button>
              <button className="btn btn-primary btn-sm">Create New Deal</button>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .hover-primary:hover {
          color: var(--primary) !important;
        }
      `}</style>
    </div>
  );
};
