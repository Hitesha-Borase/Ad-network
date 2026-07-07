import React, { useState } from 'react';
import { Search, Plus, Filter, X, Mail, Phone, Calendar, UserPlus } from 'lucide-react';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'nurturing' | 'unqualified';
  created: string;
}

const initialLeads: Lead[] = [
  { id: '1', name: 'Sarah Connor', email: 'sconnor@cyberdyne.com', phone: '+1 (555) 0199', company: 'Cyberdyne Systems', status: 'new', created: '2026-07-01' },
  { id: '2', name: 'Bruce Wayne', email: 'bruce@waynecorp.com', phone: '+1 (555) 1939', company: 'Wayne Enterprises', status: 'qualified', created: '2026-06-28' },
  { id: '3', name: 'Tony Stark', email: 'tony@starkindustries.com', phone: '+1 (555) 1963', company: 'Stark Industries', status: 'contacted', created: '2026-07-03' },
  { id: '4', name: 'Peter Parker', email: 'peter@dailybugle.com', phone: '+1 (555) 0162', company: 'Daily Bugle', status: 'nurturing', created: '2026-06-15' },
  { id: '5', name: 'Clark Kent', email: 'clark@dailyplanet.com', phone: '+1 (555) 0134', company: 'Daily Planet', status: 'unqualified', created: '2026-05-20' }
];

export const CrmLeads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'new' as Lead['status']
  });

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email) return;

    const leadToAdd: Lead = {
      id: Date.now().toString(),
      ...newLead,
      created: new Date().toISOString().split('T')[0]
    };

    setLeads([leadToAdd, ...leads]);
    setShowAddModal(false);
    setNewLead({ name: '', email: '', phone: '', company: '', status: 'new' });
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      {/* Controls Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Search & Filters */}
        <div style={{ display: 'flex', gap: '12px', flex: 1, maxWidth: '600px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} />
            <input 
              type="text" 
              placeholder="Search leads by name, email, company..." 
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '38px' }}
            />
          </div>
          <div style={{ position: 'relative', width: '160px' }}>
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ appearance: 'none', paddingRight: '30px' }}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="nurturing">Nurturing</option>
              <option value="unqualified">Unqualified</option>
            </select>
            <Filter size={14} style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none'
            }} />
          </div>
        </div>

        {/* Add button */}
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
          style={{ height: '42px' }}
        >
          <Plus size={16} /> Add Lead
        </button>
      </div>

      {/* Leads Table Card */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Lead Name</th>
                <th>Company</th>
                <th>Contact Info</th>
                <th>Status</th>
                <th>Created</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map(lead => (
                  <tr key={lead.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: '12px',
                          border: '1px solid var(--border-color)'
                        }}>
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span style={{ fontWeight: 500 }}>{lead.name}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{lead.company}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                          <Mail size={12} /> {lead.email}
                        </span>
                        {lead.phone && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                            <Phone size={12} /> {lead.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${
                        lead.status === 'new' ? 'info' :
                        lead.status === 'contacted' ? 'warning' :
                        lead.status === 'qualified' ? 'success' :
                        lead.status === 'nurturing' ? 'primary' : 'danger'
                      }`} style={{
                        backgroundColor: 
                          lead.status === 'new' ? 'var(--info-light)' :
                          lead.status === 'contacted' ? 'var(--warning-light)' :
                          lead.status === 'qualified' ? 'var(--success-light)' :
                          lead.status === 'nurturing' ? 'var(--primary-light)' : 'var(--danger-light)',
                        color:
                          lead.status === 'new' ? 'var(--info)' :
                          lead.status === 'contacted' ? 'var(--warning)' :
                          lead.status === 'qualified' ? 'var(--success)' :
                          lead.status === 'nurturing' ? 'var(--primary)' : 'var(--danger)'
                      }}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={12} /> {lead.created}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 500
                      }}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No leads found matching current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal Overlay */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <UserPlus size={20} style={{ color: 'var(--primary)' }} /> Add New Lead
              </h2>
              <button 
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddLead} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  placeholder="e.g. Clark Kent"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    required
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="clark@dailyplanet.com"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Phone Number</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+1 (555) 1234"
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Company Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newLead.company}
                  onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                  placeholder="e.g. Daily Planet"
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Lead Status</label>
                <select 
                  className="form-control"
                  value={newLead.status}
                  onChange={(e) => setNewLead({ ...newLead, status: e.target.value as Lead['status'] })}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="nurturing">Nurturing</option>
                  <option value="unqualified">Unqualified</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
