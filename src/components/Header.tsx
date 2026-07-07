import React, { useState } from 'react';
import { Menu, Bell, User, LogOut, Settings, Compass } from 'lucide-react';

interface HeaderProps {
  setMobileOpen: (open: boolean) => void;
  activeId: string;
}

export const Header: React.FC<HeaderProps> = ({ setMobileOpen, activeId }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Format active layout title
  const getTitle = () => {
    if (activeId === 'dashboard') return 'Dashboard';
    
    // Convert e.g., 'crm-leads' to 'CRM & Sales > Leads'
    const parts = activeId.split('-');
    if (parts.length === 2) {
      const moduleName = parts[0].toUpperCase();
      const componentName = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
      
      let moduleLabel = moduleName;
      if (moduleName === 'CRM') moduleLabel = 'CRM & Sales';
      else if (moduleName === 'ORG') moduleLabel = 'Organization';
      else if (moduleName === 'MKT') moduleLabel = 'Marketing';
      else if (moduleName === 'ADV') moduleLabel = 'Advertising';
      else if (moduleName === 'SEO') moduleLabel = 'SEO';
      else if (moduleName === 'AICONTENT') moduleLabel = 'AI Content Studio';
      else if (moduleName === 'AICREATIVE') moduleLabel = 'AI Creative Studio';
      else if (moduleName === 'ECOM') moduleLabel = 'E-Commerce';
      else if (moduleName === 'AGENT') moduleLabel = 'AI Agents';
      else if (moduleName === 'AUTO') moduleLabel = 'Automation';
      else if (moduleName === 'ANALYTICS') moduleLabel = 'Analytics';
      else if (moduleName === 'CDP') moduleLabel = 'Customer Data Platform';
      else if (moduleName === 'DATA') moduleLabel = 'Data Platform';
      else if (moduleName === 'COMM') moduleLabel = 'Communication';
      else if (moduleName === 'BILL') moduleLabel = 'Billing';
      else if (moduleName === 'MKTPLACE') moduleLabel = 'Marketplace';
      else if (moduleName === 'SEC') moduleLabel = 'Security';
      else if (moduleName === 'DEV') moduleLabel = 'Developer';
      else if (moduleName === 'CS') moduleLabel = 'Customer Success';
      else if (moduleName === 'SETTINGS') moduleLabel = 'Settings';
      else if (moduleName === 'ADMIN') moduleLabel = 'Super Admin';

      return `${moduleLabel} / ${componentName}`;
    }
    return 'Ad Network';
  };

  const mockNotifications = [
    { id: 1, title: 'New lead assigned', desc: 'Sarah Connor was assigned to you.', time: '5m ago', read: false },
    { id: 2, title: 'Big deal updated', desc: 'Acme Corp deal moved to Negotiation.', time: '1h ago', read: false },
    { id: 3, title: 'Proposal accepted', desc: 'Stark Industries accepted Quote #2019.', time: '4h ago', read: true }
  ];

  return (
    <header style={{
      height: 'var(--header-height)',
      backgroundColor: 'rgba(15, 19, 26, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 800
    }}>
      {/* Left side: Mobile Toggle & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={() => setMobileOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="mobile-menu-toggle"
        >
          <Menu size={22} />
        </button>

        <h2 style={{
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: 0
        }}>
          {getTitle()}
        </h2>
      </div>

      {/* Right side: Search, Notifications, User profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        {/* Global Navigation Shortcut */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '20px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          fontSize: '12px',
          color: 'var(--primary)',
          fontWeight: 500
        }}>
          <Compass size={14} />
          <span>CRM Sandbox Active</span>
        </div>

        {/* Notifications Icon with dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              position: 'relative',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            className="icon-button"
          >
            <Bell size={20} />
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--danger)',
              border: '2px solid var(--bg-secondary)'
            }} />
          </button>

          {showNotifications && (
            <div className="glass-card" style={{
              position: 'absolute',
              top: '45px',
              right: 0,
              width: '320px',
              padding: '16px',
              zIndex: 1000,
              backgroundColor: 'var(--bg-secondary)',
              animation: 'fadeIn 0.2s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>Notifications</span>
                <span style={{ fontSize: '11px', color: 'var(--primary)', cursor: 'pointer' }}>Mark all read</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {mockNotifications.map(n => (
                  <div key={n.id} style={{
                    padding: '8px',
                    borderRadius: '6px',
                    backgroundColor: n.read ? 'transparent' : 'rgba(255,255,255,0.02)',
                    borderLeft: n.read ? 'none' : '3px solid var(--primary)',
                    fontSize: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                      <span>{n.title}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{n.time}</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>{n.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar with dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px',
              borderRadius: '20px'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '14px'
            }}>
              JD
            </div>
          </button>

          {showProfile && (
            <div className="glass-card" style={{
              position: 'absolute',
              top: '45px',
              right: 0,
              width: '220px',
              padding: '12px',
              zIndex: 1000,
              backgroundColor: 'var(--bg-secondary)',
              animation: 'fadeIn 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ padding: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '6px' }}>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>John Doe</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>john.doe@adnetwork.com</div>
              </div>
              
              <button className="dropdown-link" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left',
                borderRadius: '6px'
              }}>
                <User size={16} /> Profile
              </button>
              
              <button className="dropdown-link" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left',
                borderRadius: '6px'
              }}>
                <Settings size={16} /> Account Settings
              </button>

              <button className="dropdown-link" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                background: 'none',
                border: 'none',
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left',
                borderRadius: '6px',
                borderTop: '1px solid var(--border-color)',
                marginTop: '6px',
                color: 'var(--danger)'
              }}>
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
        .icon-button:hover {
          background-color: rgba(255,255,255,0.05);
          color: var(--text-primary) !important;
        }
        .dropdown-link:hover {
          background-color: rgba(255,255,255,0.03);
          color: var(--text-primary) !important;
        }
      `}</style>
    </header>
  );
};
