import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Bell, User, LogOut, Settings, Compass, Search, ChevronDown, 
  MessageSquare, Sparkles, Sun, Moon, ShoppingCart, Heart, Filter 
} from 'lucide-react';

interface HeaderProps {
  setMobileOpen: (open: boolean) => void;
  activeId: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ setMobileOpen, activeId, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showOrgSwitcher, setShowOrgSwitcher] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const orgSwitcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
      if (orgSwitcherRef.current && !orgSwitcherRef.current.contains(event.target as Node)) {
        setShowOrgSwitcher(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Check if we are in the wireframe views
  const isCommView = activeId.startsWith('comm-');
  const isMarketplaceView = activeId.startsWith('mktplace-');
  const isSecurityView = activeId.startsWith('sec-');
  const isDeveloperView = activeId.startsWith('dev-');
  const isCustomerSuccessView = activeId.startsWith('cs-');
  const isSettingsView = activeId.startsWith('settings-');
  const isSuperAdminView = activeId.startsWith('admin-');
  const isWireframeView = isCommView || isMarketplaceView || isSecurityView || isDeveloperView || isCustomerSuccessView || isSettingsView || isSuperAdminView;

  if (false && isWireframeView) {
    return (
      <header style={{
        height: 'var(--header-height)',
        backgroundColor: '#161616',
        borderBottom: '1px solid #333333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 800,
        color: '#dddddd'
      }}>
        {/* Left side: Mobile Toggle, switcher & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, marginRight: '16px' }}>
          <button 
            onClick={() => setMobileOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#888888',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="mobile-menu-toggle"
          >
            <Menu size={22} />
          </button>

          {/* Org Switcher — hide on small mobile */}
          <div ref={orgSwitcherRef} style={{ position: 'relative' }} className="org-switcher-wrap">
            <button 
              onClick={() => setShowOrgSwitcher(!showOrgSwitcher)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#222222',
                border: '1px solid #333333',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '13px',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: 500,
                whiteSpace: 'nowrap'
              }}
            >
              <span>Kiaan OS (Default)</span>
              <ChevronDown size={14} style={{ color: '#666666' }} />
            </button>
            {showOrgSwitcher && (
              <div style={{
                position: 'absolute',
                top: '40px',
                left: 0,
                width: '180px',
                backgroundColor: '#1e1e1e',
                border: '1px solid #333333',
                borderRadius: '6px',
                padding: '4px',
                zIndex: 1000,
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}>
                {['Kiaan OS (Default)', 'Acme Corporation', 'Global Marketing BU'].map((org, i) => (
                  <div 
                    key={i} 
                    onClick={() => setShowOrgSwitcher(false)}
                    style={{
                      padding: '8px 12px',
                      fontSize: '12.5px',
                      color: '#dddddd',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                    className="dropdown-link"
                  >
                    {org}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Configuration */}
          {isMarketplaceView ? (
            <div style={{ display: 'flex', gap: '10px', flex: 1, alignItems: 'center' }}>
              {/* Global Search */}
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: '#666666' }} />
                <input 
                  type="text"
                  placeholder="Global Search..."
                  style={{
                    width: '100%',
                    backgroundColor: '#222222',
                    border: '1px solid #333333',
                    borderRadius: '6px',
                    padding: '6px 10px 6px 30px',
                    fontSize: '12px',
                    color: '#ffffff',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Marketplace Search */}
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: '#666666' }} />
                <input 
                  type="text"
                  placeholder="Marketplace Search..."
                  style={{
                    width: '100%',
                    backgroundColor: '#222222',
                    border: '1px solid #333333',
                    borderRadius: '6px',
                    padding: '6px 10px 6px 30px',
                    fontSize: '12px',
                    color: '#ffffff',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Category Filter */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#222222',
                border: '1px solid #333333',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '12px',
                color: '#aaaaaa',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}>
                <Filter size={12} />
                <span>Category Filter</span>
                <ChevronDown size={12} />
              </div>
            </div>
          ) : (
            /* Communication Global Search */
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#666666' }} />
              <input 
                type="text"
                placeholder="Search conversations, contacts, campaigns..."
                style={{
                  width: '100%',
                  backgroundColor: '#222222',
                  border: '1px solid #333333',
                  borderRadius: '6px',
                  padding: '8px 12px 8px 38px',
                  fontSize: '13px',
                  color: '#ffffff',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          )}
        </div>

        {/* Right side items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {isMarketplaceView ? (
            <>
              {/* Wishlist */}
              <button style={{
                background: 'none',
                border: 'none',
                color: '#888888',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} className="icon-button">
                <Heart size={18} />
              </button>

              {/* Cart */}
              <button style={{
                background: 'none',
                border: 'none',
                color: '#888888',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '50%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} className="icon-button">
                <ShoppingCart size={18} />
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#888888'
                }} />
              </button>
            </>
          ) : (
            <>
              {/* AI Assistant Button */}
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#2c2c2c',
                border: '1px solid #444444',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12.5px',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: 500
              }}>
                <Sparkles size={14} style={{ color: '#888888' }} />
                <span>AI Assistant</span>
              </button>

              {/* Messages Icon */}
              <button style={{
                background: 'none',
                border: 'none',
                color: '#888888',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '50%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} className="icon-button">
                <MessageSquare size={18} />
                <span style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#888888'
                }} />
              </button>
            </>
          )}

          {/* Notifications Icon (Shared) */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#888888',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="icon-button"
            >
              <Bell size={18} />
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#888888'
              }} />
            </button>

            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: '45px',
                right: 0,
                width: '320px',
                padding: '16px',
                zIndex: 1000,
                backgroundColor: '#1e1e1e',
                border: '1px solid #333333',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px', color: '#ffffff' }}>Notifications</span>
                  <span style={{ fontSize: '11px', color: '#888888', cursor: 'pointer' }}>Mark all read</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {mockNotifications.map(n => (
                    <div key={n.id} style={{
                      padding: '8px',
                      borderRadius: '6px',
                      backgroundColor: '#262626',
                      borderLeft: '3px solid #666666',
                      fontSize: '11.5px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                        <span style={{ color: '#ffffff' }}>{n.title}</span>
                        <span style={{ color: '#666666', fontSize: '9.5px' }}>{n.time}</span>
                      </div>
                      <div style={{ color: '#888888', marginTop: '2px' }}>{n.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Toggle (Shared) */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: 'none',
              border: 'none',
              color: '#888888',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="icon-button"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Profile Menu (Shared) */}
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
                padding: '4px'
              }}
            >
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#333333',
                border: '1px solid #444444',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '12.5px'
              }}>
                JD
              </div>
            </button>

            {showProfile && (
              <div style={{
                position: 'absolute',
                top: '45px',
                right: 0,
                width: '220px',
                padding: '12px',
                zIndex: 1000,
                backgroundColor: '#1e1e1e',
                border: '1px solid #333333',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ padding: '8px', borderBottom: '1px solid #333333', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#ffffff' }}>John Doe</div>
                  <div style={{ fontSize: '11px', color: '#666666' }}>john.doe@kiaan.com</div>
                </div>
                
                <button className="dropdown-link" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  background: 'none',
                  border: 'none',
                  color: '#888888',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderRadius: '6px'
                }}>
                  <User size={14} /> Profile
                </button>
                
                <button className="dropdown-link" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  background: 'none',
                  border: 'none',
                  color: '#888888',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderRadius: '6px'
                }}>
                  <Settings size={14} /> Account Settings
                </button>

                <button className="dropdown-link" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  background: 'none',
                  border: 'none',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderRadius: '6px',
                  borderTop: '1px solid #333333',
                  marginTop: '6px',
                  color: '#bbbbbb'
                }} onClick={() => { onLogout?.(); }}>
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .mobile-menu-toggle { display: flex !important; }
            .org-switcher-wrap { display: none !important; }
            .header-ai-btn { display: none !important; }
          }
          @media (max-width: 480px) {
            .header-search-bar { display: none !important; }
          }
          .icon-button:hover {
            background-color: rgba(255,255,255,0.05);
            color: #ffffff !important;
          }
          .dropdown-link:hover {
            background-color: rgba(255,255,255,0.03);
            color: #ffffff !important;
          }
        `}</style>
      </header>
    );
  }

  // Fallback for CRM and other standard modules (unmodified)
  return (
    <header style={{
      height: 'var(--header-height)',
      backgroundColor: 'rgba(15, 19, 26, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'sticky',
      top: 0,
      zIndex: 800,
      flexShrink: 0
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Global Navigation Shortcut — hide on mobile */}
        <div className="hide-on-mobile" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '20px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          fontSize: '12px',
          color: 'var(--primary)',
          fontWeight: 500,
          whiteSpace: 'nowrap'
        }}>
          <Compass size={14} />
          <span>CRM Sandbox Active</span>
        </div>

        {/* Notifications Icon with dropdown */}
        <div ref={notificationRef} style={{ position: 'relative' }}>
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
              width: 'min(320px, 90vw)',
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
        <div ref={profileRef} style={{ position: 'relative' }}>
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
              }} onClick={() => { onLogout?.(); }}>
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-toggle { display: flex !important; }
          .hide-on-mobile { display: none !important; }
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
