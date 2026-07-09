import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Search, 
  ShoppingBag, 
  Bot, 
  Zap, 
  Sparkles,
  BarChart3, 
  Database, 
  Server,
  MessageSquare, 
  Store, 
  Code2, 
  LifeBuoy, 
  ChevronDown,
  ChevronRight,
  X,
  Target,
  Briefcase,
  Cpu
} from 'lucide-react';

interface SidebarItem {
  name: string;
  id: string;
  disabled?: boolean;
}

interface SidebarSection {
  title: string;
  icon: React.ComponentType<any>;
  items: SidebarItem[];
}

export const sidebarData: SidebarSection[] = [
  {
    title: 'E-commerce Marketing',
    icon: ShoppingBag,
    items: [
      { name: 'Product Feed Management', id: 'ecom-feed' },
      { name: 'Google Merchant Center Integration', id: 'ecom-merchant' },
      { name: 'Meta Catalog', id: 'ecom-meta' },
      { name: 'TikTok Catalog', id: 'ecom-tiktok' },
      { name: 'Dynamic Product Ads', id: 'ecom-dynads' },
      { name: 'Cart Recovery', id: 'ecom-recovery' },
      { name: 'AI Upsell', id: 'ecom-upsell' },
      { name: 'AI Cross Sell', id: 'ecom-cross' },
      { name: 'Customer Lifetime Value Prediction', id: 'ecom-clv' },
      { name: 'Product Recommendation Engine', id: 'ecom-recs' }
    ]
  },
  {
    title: 'AI Agents',
    icon: Bot,
    items: [
      { name: 'Marketing Agent', id: 'agent-marketing' },
      { name: 'SEO Agent', id: 'agent-seo' },
      { name: 'PPC Agent', id: 'agent-ppc' },
      { name: 'DSP Agent', id: 'agent-dsp' },
      { name: 'SSP Agent', id: 'agent-ssp' },
      { name: 'Affiliate Agent', id: 'agent-affiliate' },
      { name: 'Publisher Agent', id: 'agent-publisher' },
      { name: 'Sales Agent', id: 'agent-sales' },
      { name: 'Finance Agent', id: 'agent-finance' },
      { name: 'Compliance Agent', id: 'agent-compliance' },
      { name: 'Fraud Detection Agent', id: 'agent-fraud' },
      { name: 'Customer Support Agent', id: 'agent-support' },
      { name: 'Business Analyst Agent', id: 'agent-biz' },
      { name: 'Product Manager Agent', id: 'agent-pm' },
      { name: 'Campaign Optimizer Agent', id: 'agent-opt' },
      { name: 'Creative Designer Agent', id: 'agent-creative' },
      { name: 'Content Writer Agent', id: 'agent-content' },
      { name: 'Data Scientist Agent', id: 'agent-datasci' },
      { name: 'DevOps Agent', id: 'agent-devops' }
    ]
  },
  {
    title: 'AI Automation Builder',
    icon: Zap,
    items: [
      { name: 'Visual Workflow Builder', id: 'auto-builder' },
      { name: 'Trigger System', id: 'auto-triggers' },
      { name: 'Event Engine', id: 'auto-events' },
      { name: 'API Automation', id: 'auto-api' },
      { name: 'CRM Automation', id: 'auto-crm' },
      { name: 'Marketing Automation', id: 'auto-marketing' },
      { name: 'Webhook Automation', id: 'auto-webhooks' },
      { name: 'AI Decision Trees', id: 'auto-trees' },
      { name: 'Scheduled Workflows', id: 'auto-jobs' }
    ]
  },
  {
    title: 'AI Business Intelligence',
    icon: BarChart3,
    items: [
      { name: 'Executive Dashboards', id: 'bi-exec-dashboards' },
      { name: 'KPI Monitoring', id: 'bi-kpi' },
      { name: 'Revenue Forecasting', id: 'bi-revenue' },
      { name: 'Marketing Mix Modeling', id: 'bi-marketing-mix' },
      { name: 'Attribution Modeling', id: 'bi-attribution' },
      { name: 'Predictive Analytics', id: 'bi-predictive' },
      { name: 'AI Insights', id: 'bi-ai-insights' },
      { name: 'Natural Language Analytics', id: 'bi-nl-analytics' },
      { name: 'AI Recommendations', id: 'bi-ai-recommendations' }
    ]
  },
  {
    title: 'AI Customer Data Platform (CDP)',
    icon: Database,
    items: [
      { name: 'Unified Customer Profiles', id: 'cdp-unified-profiles' },
      { name: 'Identity Resolution', id: 'cdp-id-resolution' },
      { name: 'Cross-Device Identity Graph', id: 'cdp-idgraph' },
      { name: 'Customer 360°', id: 'cdp-c360' },
      { name: 'Behavioral Tracking', id: 'cdp-tracking' },
      { name: 'Predictive Segmentation', id: 'cdp-segments' },
      { name: 'Consent & Privacy Management', id: 'cdp-consent' },
      { name: 'Audience Activation', id: 'cdp-activation' },
      { name: 'Data Clean Rooms', id: 'cdp-clean-rooms' }
    ]
  },
  {
    title: 'Data Management Platform (DMP)',
    icon: Server,
    items: [
      { name: 'Third-party Audience Marketplace', id: 'dmp-3p-audience' },
      { name: 'First-party Audience Management', id: 'dmp-1p-audience' },
      { name: 'Interest Categories', id: 'dmp-interest-categories' },
      { name: 'Lookalike Audience Builder', id: 'dmp-lookalike' },
      { name: 'AI Audience Expansion', id: 'dmp-ai-expansion' },
      { name: 'Audience Scoring', id: 'dmp-audience-scoring' },
      { name: 'Demographic Targeting', id: 'dmp-demographic' },
      { name: 'Interest Prediction', id: 'dmp-interest-prediction' },
      { name: 'Purchase Intent Modeling', id: 'dmp-purchase-intent' }
    ]
  },
  {
    title: 'Agency Management Platform',
    icon: Building2,
    items: [
      { name: 'Agency Dashboard', id: 'agency-dashboard' },
      { name: 'Client Workspaces', id: 'agency-workspaces' },
      { name: 'White Label Portals', id: 'agency-portals' },
      { name: 'Team Management', id: 'agency-team' },
      { name: 'Time Tracking', id: 'agency-time' },
      { name: 'Client Billing', id: 'agency-billing' },
      { name: 'Client Approvals', id: 'agency-approvals' },
      { name: 'Campaign Workspace', id: 'agency-campaigns' },
      { name: 'Resource Planning', id: 'agency-resources' }
    ]
  },
  {
    title: 'Omnichannel Communication Platform',
    icon: MessageSquare,
    items: [
      { name: 'Email', id: 'comm-email' },
      { name: 'WhatsApp', id: 'comm-whatsapp' },
      { name: 'Telegram', id: 'comm-telegram' },
      { name: 'SMS', id: 'comm-sms' },
      { name: 'Voice Calls', id: 'comm-voice' },
      { name: 'Push Notifications', id: 'comm-push' },
      { name: 'In-App Messaging', id: 'comm-inapp' },
      { name: 'Live Chat', id: 'comm-chat' },
      { name: 'AI Chatbot', id: 'comm-bot' },
      { name: 'Video Messaging', id: 'comm-video' },
      { name: 'Omnichannel Inbox', id: 'comm-inbox' }
    ]
  },
  {
    title: 'Marketplace',
    icon: Store,
    items: [
      { name: 'Plugin Marketplace', id: 'mktplace-plugins' },
      { name: 'Template Marketplace', id: 'mktplace-templates' },
      { name: 'Theme Marketplace', id: 'mktplace-themes' },
      { name: 'AI Prompt Marketplace', id: 'mktplace-prompts' },
      { name: 'Agency Marketplace', id: 'mktplace-agencies' },
      { name: 'Freelancer Marketplace', id: 'mktplace-freelancers' },
      { name: 'Influencer Marketplace', id: 'mktplace-influencers' },
      { name: 'Service Marketplace', id: 'mktplace-services' }
    ]
  },
  {
    title: 'Developer Platform',
    icon: Code2,
    items: [
      { name: 'REST APIs', id: 'dev-rest' },
      { name: 'GraphQL APIs', id: 'dev-graphql' },
      { name: 'Webhooks', id: 'dev-webhooks' },
      { name: 'SDKs (JavaScript, Node.js, Python, PHP, Java, Go)', id: 'dev-sdks' },
      { name: 'CLI', id: 'dev-cli' },
      { name: 'API Sandbox', id: 'dev-sandbox' },
      { name: 'Event Bus', id: 'dev-event-bus' },
      { name: 'Marketplace APIs', id: 'dev-mkt-apis' },
      { name: 'API Analytics', id: 'dev-analytics' }
    ]
  },
  {
    title: 'Customer Success Platform',
    icon: LifeBuoy,
    items: [
      { name: 'Help Center', id: 'cs-help' },
      { name: 'Ticket System', id: 'cs-tickets' },
      { name: 'Knowledge Base', id: 'cs-kb' },
      { name: 'Live Chat', id: 'cs-support' },
      { name: 'AI Support Agent', id: 'cs-agent' },
      { name: 'Community Forum', id: 'cs-community' },
      { name: 'SLA Management', id: 'cs-sla' },
      { name: 'Customer Health Score', id: 'cs-health' }
    ]
  },
  {
    title: 'AI Recommendation Engine',
    icon: Sparkles,
    items: [
      { name: 'Product Recommendations', id: 'reco-product' },
      { name: 'Campaign Recommendations', id: 'reco-campaign' },
      { name: 'Budget Recommendations', id: 'reco-budget' },
      { name: 'Audience Recommendations', id: 'reco-audience' },
      { name: 'Keyword Recommendations', id: 'reco-keyword' },
      { name: 'Creative Recommendations', id: 'reco-creative' },
      { name: 'Pricing Recommendations', id: 'reco-pricing' }
    ]
  },
  {
    title: 'Enterprise SaaS Features',
    icon: Building2,
    items: [
      { name: 'Multi-Tenant Architecture', id: 'saas-multitenant' },
      { name: 'White Label Platform', id: 'saas-whitelabel' },
      { name: 'Multiple Business Units', id: 'saas-businessunits' },
      { name: 'Regional Data Centers', id: 'saas-datacenters' },
      { name: 'High Availability', id: 'saas-ha' },
      { name: 'Disaster Recovery', id: 'saas-dr' },
      { name: 'Backup & Restore', id: 'saas-backup' },
      { name: 'Feature Flags', id: 'saas-flags' },
      { name: 'Tenant-Level Customization', id: 'saas-customization' },
      { name: 'Usage-Based Billing', id: 'saas-billing' },
      { name: 'Subscription Management', id: 'saas-subscription' },
      { name: 'Audit Trails', id: 'saas-audit' },
      { name: 'API Rate Limiting', id: 'saas-ratelimit' },
      { name: 'SCIM Provisioning', id: 'saas-scim' },
      { name: 'Enterprise SSO (SAML/OIDC)', id: 'saas-sso' }
    ]
  },
  {
    title: 'Conversion Rate Optimization (CRO)',
    icon: Target,
    items: [
      { name: 'Session Recording', id: 'cro-session' },
      { name: 'Heatmaps', id: 'cro-heatmaps' },
      { name: 'Scroll Maps', id: 'cro-scroll' },
      { name: 'Click Maps', id: 'cro-click' },
      { name: 'Funnel Analysis', id: 'cro-funnel' },
      { name: 'User Journey Mapping', id: 'cro-journey' },
      { name: 'AI UX Recommendations', id: 'cro-ux' },
      { name: 'Form Analytics', id: 'cro-forms' },
      { name: 'Exit Intent', id: 'cro-exit' },
      { name: 'Smart Popups', id: 'cro-popups' },
      { name: 'Website Personalization', id: 'cro-personalization' }
    ]
  },
  {
    title: 'Industry-Specific Solutions',
    icon: Briefcase,
    items: [
      { name: 'Healthcare', id: 'industry-healthcare' },
      { name: 'Finance', id: 'industry-finance' },
      { name: 'Real Estate', id: 'industry-realestate' },
      { name: 'Education', id: 'industry-education' },
      { name: 'Automotive', id: 'industry-automotive' },
      { name: 'Travel', id: 'industry-travel' },
      { name: 'Hospitality', id: 'industry-hospitality' },
      { name: 'E-commerce', id: 'industry-ecommerce' },
      { name: 'SaaS', id: 'industry-saas' },
      { name: 'Gaming', id: 'industry-gaming' },
      { name: 'iGaming', id: 'industry-igaming' },
      { name: 'Logistics', id: 'industry-logistics' },
      { name: 'Manufacturing', id: 'industry-manufacturing' },
      { name: 'Government', id: 'industry-government' },
      { name: 'Non-Profit', id: 'industry-nonprofit' }
    ]
  },
  {
    title: 'AI & ML Platform',
    icon: Cpu,
    items: [
      { name: 'Model Registry', id: 'aiml-registry' },
      { name: 'Feature Store', id: 'aiml-feature-store' },
      { name: 'Prompt Management', id: 'aiml-prompts' },
      { name: 'RAG Knowledge Base', id: 'aiml-rag' },
      { name: 'Fine-Tuning Support', id: 'aiml-finetuning' },
      { name: 'Vector Database', id: 'aiml-vector' },
      { name: 'AI Observability', id: 'aiml-observability' },
      { name: 'AI Cost Management', id: 'aiml-cost' },
      { name: 'Experiment Tracking', id: 'aiml-experiments' },
      { name: 'AI Governance', id: 'aiml-governance' },
      { name: 'Long-Term Vision', id: 'aiml-vision' }
    ]
  }
];

interface SidebarProps {
  activeId: string;
  setActiveId: (id: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeId,
  setActiveId,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Communication': true // Expand Communication by default since it is active
  });

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  // Filter items based on search term
  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return sidebarData;

    const term = searchTerm.toLowerCase();
    return sidebarData
      .map(section => {
        const matchingItems = section.items.filter(item => 
          item.name.toLowerCase().includes(term) || 
          section.title.toLowerCase().includes(term)
        );
        return {
          ...section,
          items: matchingItems
        };
      })
      .filter(section => section.items.length > 0);
  }, [searchTerm]);

  // Automatically expand sections that have matching search results
  React.useEffect(() => {
    if (searchTerm.trim() !== '') {
      const autoExpand: Record<string, boolean> = {};
      filteredSections.forEach(s => {
        autoExpand[s.title] = true;
      });
      setExpandedSections(prev => ({ ...prev, ...autoExpand }));
    }
  }, [searchTerm, filteredSections]);

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 900,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 950,
          width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          maxWidth: '85vw',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: mobileOpen ? 'translateX(0)' : undefined
        }}
        className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}
      >
        {/* Brand Header */}
        <div style={{
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: '0 20px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {!collapsed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#fff',
                boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
              }}>
                A
              </div>
              <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
                Ad Network
              </span>
            </div>
          ) : (
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#fff'
            }}>
              A
            </div>
          )}

          {/* Close button for mobile */}
          <button 
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
            className="mobile-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search filter - Hide when collapsed */}
        {!collapsed && (
          <div style={{ padding: '16px 20px 8px 20px' }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Search size={16} style={{
                position: 'absolute',
                left: '12px',
                color: 'var(--text-muted)'
              }} />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '8px 12px 8px 36px',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>
          </div>
        )}

        {/* Navigation Area */}
        <div 
          className="sidebar-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px 12px 24px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {/* Dashboard static link */}
          <div
            onClick={() => {
              setActiveId('dashboard');
              setMobileOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              color: activeId === 'dashboard' ? 'var(--text-primary)' : 'var(--text-secondary)',
              backgroundColor: activeId === 'dashboard' ? 'var(--primary-light)' : 'transparent',
              border: activeId === 'dashboard' ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid transparent',
              transition: 'all 0.2s ease',
              justifyContent: collapsed ? 'center' : 'flex-start'
            }}
            className="sidebar-nav-item"
          >
            <LayoutDashboard size={18} style={{ color: activeId === 'dashboard' ? 'var(--primary)' : undefined }} />
            {!collapsed && <span style={{ fontSize: '14px', fontWeight: 500 }}>Dashboard</span>}
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '8px 0' }} />

          {/* Section Renderings */}
          {filteredSections.map(section => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.title];
            const hasActiveChild = section.items.some(item => item.id === activeId);

            return (
              <div key={section.title} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {/* Section Header */}
                <div
                  onClick={() => !collapsed && toggleSection(section.title)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: collapsed ? 'pointer' : 'pointer',
                    color: hasActiveChild ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: 500,
                    fontSize: '13px',
                    transition: 'all 0.2s ease',
                    userSelect: 'none'
                  }}
                  className="sidebar-section-header"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={18} style={{ color: hasActiveChild ? 'var(--primary)' : 'var(--text-secondary)' }} />
                    {!collapsed && <span style={{ fontSize: '13.5px', fontWeight: 600 }}>{section.title}</span>}
                  </div>
                  {!collapsed && (
                    isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                  )}
                </div>

                {/* Sub items */}
                {(!collapsed && isExpanded) && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '28px',
                    borderLeft: '1px solid rgba(255,255,255,0.05)',
                    marginLeft: '20px',
                    gap: '2px'
                  }}>
                    {section.items.map(item => {
                      const isActive = activeId === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (item.disabled) return;
                            setActiveId(item.id);
                            setMobileOpen(false);
                          }}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: item.disabled ? 'not-allowed' : 'pointer',
                            opacity: item.disabled ? 0.4 : 1,
                            fontSize: '13px',
                            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                            backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                            fontWeight: isActive ? 500 : 400,
                            transition: 'all 0.15s ease',
                            borderLeft: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                            paddingLeft: isActive ? '10px' : '12px'
                          }}
                          className="sidebar-sub-item"
                        >
                          {item.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Collapse button bottom */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="sidebar-collapse-toggle"
          >
            <ChevronRight size={18} style={{
              transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 0.3s ease'
            }} />
          </button>
        </div>
      </aside>

      {/* Additional CSS specifically for sidebar responsive states and hovers */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
            max-width: 85vw;
          }
          .sidebar.mobile-open {
            transform: translateX(0);
            box-shadow: 4px 0 24px rgba(0,0,0,0.5);
          }
          .mobile-close-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
          .sidebar-collapse-toggle {
            display: none !important;
          }
        }
        .sidebar-nav-item:hover, .sidebar-section-header:hover {
          background-color: rgba(255, 255, 255, 0.03);
          color: var(--text-primary) !important;
        }
        .sidebar-sub-item:hover {
          color: var(--text-primary) !important;
          background-color: rgba(255, 255, 255, 0.02);
        }
        @media (max-width: 768px) {
          .sidebar-nav-item,
          .sidebar-section-header {
            min-height: 44px;
          }
          .sidebar-sub-item {
            min-height: 40px;
            display: flex;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};
