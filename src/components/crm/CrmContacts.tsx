import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin, Tag, Star } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  tag: 'client' | 'partner' | 'prospect';
  starred: boolean;
}

const initialContacts: Contact[] = [
  { id: '1', name: 'Diana Prince', role: 'Head of Procurement', company: 'Themyscira Exports', email: 'diana@themyscira.gov', phone: '+1 (555) 7777', location: 'London, UK', tag: 'client', starred: true },
  { id: '2', name: 'Barry Allen', role: 'Research Associate', company: 'Central City Lab', email: 'barry.allen@ccpd.org', phone: '+1 (555) 9999', location: 'Central City, USA', tag: 'prospect', starred: false },
  { id: '3', name: 'Hal Jordan', role: 'Chief Aviator', company: 'Ferris Aircraft', email: 'hal@ferrisair.com', phone: '+1 (555) 0188', location: 'Coast City, USA', tag: 'partner', starred: true },
  { id: '4', name: 'Arthur Curry', role: 'Director of Operations', company: 'Atlantis Shipping', email: 'arthur@atlantisship.com', phone: '+1 (555) 0144', location: 'Boston, USA', tag: 'client', starred: false },
  { id: '5', name: 'Victor Stone', role: 'Systems Engineer', company: 'S.T.A.R. Labs', email: 'victor.stone@starlabs.com', phone: '+1 (555) 0101', location: 'Detroit, USA', tag: 'partner', starred: false }
];

export const CrmContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState<string>('all');

  const toggleStar = (id: string) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, starred: !c.starred } : c));
  };

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = tagFilter === 'all' || c.tag === tagFilter;
    return matchesSearch && matchesTag;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      {/* Filters */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input
            type="text"
            placeholder="Search contacts by name, role, company..."
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '38px' }}
          />
        </div>

        {/* Tag Filters */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'client', 'partner', 'prospect'].map(tag => (
            <button
              key={tag}
              onClick={() => setTagFilter(tag)}
              className="btn btn-secondary btn-sm"
              style={{
                textTransform: 'capitalize',
                backgroundColor: tagFilter === tag ? 'var(--primary-light)' : undefined,
                borderColor: tagFilter === tag ? 'var(--primary)' : undefined,
                color: tagFilter === tag ? 'var(--text-primary)' : undefined
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Contact Cards */}
      <div className="grid-cols-3">
        {filteredContacts.map(contact => (
          <div key={contact.id} className="glass-card" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            padding: '24px'
          }}>
            {/* Star toggle */}
            <button 
              onClick={() => toggleStar(contact.id)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: contact.starred ? 'var(--warning)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              className="star-btn"
            >
              <Star size={18} fill={contact.starred ? 'var(--warning)' : 'none'} />
            </button>

            {/* Profile Avatar / General Details */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'var(--primary)',
                fontSize: '18px'
              }}>
                {contact.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                  {contact.name}
                </h3>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {contact.role} at <strong style={{ color: 'var(--text-primary)' }}>{contact.company}</strong>
                </span>
              </div>
            </div>

            {/* Middle divider */}
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }}></div>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Mail size={14} style={{ color: 'var(--text-muted)' }} />
                <span>{contact.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Phone size={14} style={{ color: 'var(--text-muted)' }} />
                <span>{contact.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
                <span>{contact.location}</span>
              </div>
            </div>

            {/* Card Footer tags and quick action */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <span className={`badge`} style={{
                backgroundColor: 
                  contact.tag === 'client' ? 'var(--success-light)' :
                  contact.tag === 'partner' ? 'var(--primary-light)' : 'var(--warning-light)',
                color:
                  contact.tag === 'client' ? 'var(--success)' :
                  contact.tag === 'partner' ? 'var(--primary)' : 'var(--warning)'
              }}>
                <Tag size={10} /> {contact.tag}
              </span>

              <a 
                href={`mailto:${contact.email}`}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11px', padding: '4px 8px' }}
              >
                Send Message
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        .star-btn:hover {
          transform: scale(1.15);
        }
      `}</style>
    </div>
  );
};
