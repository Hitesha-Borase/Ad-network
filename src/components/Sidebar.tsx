import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Megaphone, 
  Globe, 
  Search, 
  PenTool, 
  Palette, 
  ShoppingBag, 
  Bot, 
  Zap, 
  BarChart3, 
  Database, 
  Server, 
  MessageSquare, 
  CreditCard, 
  Store, 
  ShieldAlert, 
  Code2, 
  LifeBuoy, 
  Settings as SettingsIcon, 
  Crown,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';

interface SidebarItem {
  name: string;
  id: string;
}

interface SidebarSection {
  title: string;
  icon: React.ComponentType<any>;
  items: SidebarItem[];
}

export const sidebarData: SidebarSection[] = [
  {
    title: 'Organization',
    icon: Building2,
    items: [
      { name: 'Organization', id: 'org-organization' },
      { name: 'Business Units', id: 'org-units' },
      { name: 'Workspaces', id: 'org-workspaces' },
      { name: 'Teams', id: 'org-teams' },
      { name: 'Users', id: 'org-users' },
      { name: 'Roles & Permissions', id: 'org-roles' },
      { name: 'Departments', id: 'org-departments' },
      { name: 'Locations', id: 'org-locations' },
      { name: 'API Keys', id: 'org-apikeys' }
    ]
  },
  {
    title: 'CRM & Sales',
    icon: Users,
    items: [
      { name: 'Overview', id: 'crm-overview' },
      { name: 'Leads', id: 'crm-leads' },
      { name: 'Contacts', id: 'crm-contacts' },
      { name: 'Companies', id: 'crm-companies' },
      { name: 'Deals', id: 'crm-deals' },
      { name: 'Pipeline', id: 'crm-pipeline' },
      { name: 'Tasks', id: 'crm-tasks' },
      { name: 'Calendar', id: 'crm-calendar' },
      { name: 'Meetings', id: 'crm-meetings' },
      { name: 'Proposals', id: 'crm-proposals' },
      { name: 'Quotes', id: 'crm-quotes' },
      { name: 'Contracts', id: 'crm-contracts' },
      { name: 'Invoices', id: 'crm-invoices' },
      { name: 'Commission', id: 'crm-commission' },
      { name: 'Forecasting', id: 'crm-forecasting' }
    ]
  },
  {
    title: 'Marketing',
    icon: Megaphone,
    items: [
      { name: 'Campaigns', id: 'mkt-campaigns' },
      { name: 'Campaign Builder', id: 'mkt-builder' },
      { name: 'Campaign Templates', id: 'mkt-templates' },
      { name: 'Audience Manager', id: 'mkt-audience' },
      { name: 'Customer Segments', id: 'mkt-segments' },
      { name: 'Customer Journey', id: 'mkt-journey' },
      { name: 'Personalization', id: 'mkt-personalization' },
      { name: 'Marketing Calendar', id: 'mkt-calendar' }
    ]
  },
  {
    title: 'Advertising',
    icon: BarChart3,
    items: [
      { name: 'Google Ads', id: 'adv-google' },
      { name: 'Meta Ads', id: 'adv-meta' },
      { name: 'LinkedIn Ads', id: 'adv-linkedin' },
      { name: 'TikTok Ads', id: 'adv-tiktok' },
      { name: 'Amazon Ads', id: 'adv-amazon' },
      { name: 'Microsoft Ads', id: 'adv-microsoft' },
      { name: 'DSP', id: 'adv-dsp' },
      { name: 'SSP', id: 'adv-ssp' },
      { name: 'RTB Exchange', id: 'adv-rtb' },
      { name: 'Publisher Management', id: 'adv-publishers' },
      { name: 'Native Ads', id: 'adv-native' },
      { name: 'Display Ads', id: 'adv-display' },
      { name: 'Video Ads', id: 'adv-video' },
      { name: 'CTV', id: 'adv-ctv' },
      { name: 'DOOH', id: 'adv-dooh' },
      { name: 'Affiliate Marketing', id: 'adv-affiliate' },
      { name: 'Influencer Marketing', id: 'adv-influencer' }
    ]
  },
  {
    title: 'SEO',
    icon: Globe,
    items: [
      { name: 'Projects', id: 'seo-projects' },
      { name: 'Keyword Research', id: 'seo-keywords' },
      { name: 'Rank Tracker', id: 'seo-rank' },
      { name: 'Competitor Analysis', id: 'seo-competitors' },
      { name: 'Site Audit', id: 'seo-audit' },
      { name: 'Backlinks', id: 'seo-backlinks' },
      { name: 'Technical SEO', id: 'seo-technical' },
      { name: 'Content Optimizer', id: 'seo-optimizer' },
      { name: 'SERP Analysis', id: 'seo-serp' },
      { name: 'Local SEO', id: 'seo-local' }
    ]
  },
  {
    title: 'AI Content Studio',
    icon: PenTool,
    items: [
      { name: 'AI Copywriter', id: 'aicontent-copywriter' },
      { name: 'Blog Writer', id: 'aicontent-blog' },
      { name: 'Landing Page Generator', id: 'aicontent-landing' },
      { name: 'Email Generator', id: 'aicontent-email' },
      { name: 'Social Media Generator', id: 'aicontent-social' },
      { name: 'Press Release', id: 'aicontent-press' },
      { name: 'Script Generator', id: 'aicontent-script' },
      { name: 'Newsletter Builder', id: 'aicontent-newsletter' },
      { name: 'Product Description', id: 'aicontent-products' },
      { name: 'Translation', id: 'aicontent-translation' },
      { name: 'Grammar Checker', id: 'aicontent-grammar' }
    ]
  },
  {
    title: 'AI Creative Studio',
    icon: Palette,
    items: [
      { name: 'Image Generator', id: 'aicreative-image' },
      { name: 'Banner Generator', id: 'aicreative-banner' },
      { name: 'Video Generator', id: 'aicreative-video' },
      { name: 'Thumbnail Generator', id: 'aicreative-thumbnail' },
      { name: 'Logo Generator', id: 'aicreative-logo' },
      { name: 'Brand Kit', id: 'aicreative-brand' },
      { name: 'Creative Templates', id: 'aicreative-templates' },
      { name: 'Asset Library', id: 'aicreative-assets' },
      { name: 'Creative Optimization', id: 'aicreative-opt' }
    ]
  },
  {
    title: 'E-Commerce',
    icon: ShoppingBag,
    items: [
      { name: 'Products', id: 'ecom-products' },
      { name: 'Categories', id: 'ecom-categories' },
      { name: 'Inventory', id: 'ecom-inventory' },
      { name: 'Product Feed', id: 'ecom-feed' },
      { name: 'Merchant Center', id: 'ecom-merchant' },
      { name: 'Catalogs', id: 'ecom-catalogs' },
      { name: 'Dynamic Ads', id: 'ecom-dynads' },
      { name: 'Recommendations', id: 'ecom-recs' },
      { name: 'Upsell Engine', id: 'ecom-upsell' },
      { name: 'Cross Sell', id: 'ecom-cross' },
      { name: 'Cart Recovery', id: 'ecom-recovery' },
      { name: 'Coupons', id: 'ecom-coupons' }
    ]
  },
  {
    title: 'AI Agents',
    icon: Bot,
    items: [
      { name: 'Marketing Agent', id: 'agent-marketing' },
      { name: 'SEO Agent', id: 'agent-seo' },
      { name: 'PPC Agent', id: 'agent-ppc' },
      { name: 'Sales Agent', id: 'agent-sales' },
      { name: 'Content Agent', id: 'agent-content' },
      { name: 'Creative Agent', id: 'agent-creative' },
      { name: 'Support Agent', id: 'agent-support' },
      { name: 'Compliance Agent', id: 'agent-compliance' },
      { name: 'Finance Agent', id: 'agent-finance' },
      { name: 'Analytics Agent', id: 'agent-analytics' },
      { name: 'Campaign Optimizer', id: 'agent-opt' },
      { name: 'Business Analyst', id: 'agent-biz' },
      { name: 'DevOps Agent', id: 'agent-devops' },
      { name: 'Data Scientist', id: 'agent-datasci' }
    ]
  },
  {
    title: 'Automation',
    icon: Zap,
    items: [
      { name: 'Workflow Builder', id: 'auto-builder' },
      { name: 'Triggers', id: 'auto-triggers' },
      { name: 'Conditions', id: 'auto-conditions' },
      { name: 'Actions', id: 'auto-actions' },
      { name: 'AI Decision Trees', id: 'auto-trees' },
      { name: 'Webhooks', id: 'auto-webhooks' },
      { name: 'API Automation', id: 'auto-api' },
      { name: 'Scheduled Jobs', id: 'auto-jobs' },
      { name: 'Event Engine', id: 'auto-events' },
      { name: 'Integrations', id: 'auto-integrations' }
    ]
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    items: [
      { name: 'Executive Dashboard', id: 'analytics-exec' },
      { name: 'Marketing Analytics', id: 'analytics-marketing' },
      { name: 'Campaign Analytics', id: 'analytics-campaign' },
      { name: 'Traffic Analytics', id: 'analytics-traffic' },
      { name: 'Sales Analytics', id: 'analytics-sales' },
      { name: 'Revenue Analytics', id: 'analytics-revenue' },
      { name: 'Customer Analytics', id: 'analytics-customer' },
      { name: 'Attribution', id: 'analytics-attribution' },
      { name: 'Funnels', id: 'analytics-funnels' },
      { name: 'Heatmaps', id: 'analytics-heatmaps' },
      { name: 'Session Replay', id: 'analytics-replay' },
      { name: 'Reports', id: 'analytics-reports' },
      { name: 'Custom Dashboards', id: 'analytics-custom' }
    ]
  },
  {
    title: 'Customer Data Platform',
    icon: Database,
    items: [
      { name: 'Customer 360', id: 'cdp-c360' },
      { name: 'Identity Graph', id: 'cdp-idgraph' },
      { name: 'Behavior Tracking', id: 'cdp-tracking' },
      { name: 'Audience Builder', id: 'cdp-audience' },
      { name: 'Predictive Segments', id: 'cdp-segments' },
      { name: 'Consent Management', id: 'cdp-consent' },
      { name: 'Data Activation', id: 'cdp-activation' }
    ]
  },
  {
    title: 'Data Platform',
    icon: Server,
    items: [
      { name: 'Data Warehouse', id: 'data-warehouse' },
      { name: 'Data Lake', id: 'data-lake' },
      { name: 'ETL', id: 'data-etl' },
      { name: 'ELT', id: 'data-elt' },
      { name: 'BigQuery', id: 'data-bigquery' },
      { name: 'Snowflake', id: 'data-snowflake' },
      { name: 'ClickHouse', id: 'data-clickhouse' },
      { name: 'Vector Database', id: 'data-vector' },
      { name: 'Search Index', id: 'data-search' }
    ]
  },
  {
    title: 'Communication',
    icon: MessageSquare,
    items: [
      { name: 'Email', id: 'comm-email' },
      { name: 'WhatsApp', id: 'comm-whatsapp' },
      { name: 'SMS', id: 'comm-sms' },
      { name: 'Telegram', id: 'comm-telegram' },
      { name: 'Push Notifications', id: 'comm-push' },
      { name: 'Voice Calls', id: 'comm-voice' },
      { name: 'Live Chat', id: 'comm-chat' },
      { name: 'Inbox', id: 'comm-inbox' },
      { name: 'Chatbot', id: 'comm-bot' },
      { name: 'Templates', id: 'comm-templates' }
    ]
  },
  {
    title: 'Billing',
    icon: CreditCard,
    items: [
      { name: 'Plans', id: 'bill-plans' },
      { name: 'Subscriptions', id: 'bill-subs' },
      { name: 'Invoices', id: 'bill-invoices' },
      { name: 'Payments', id: 'bill-payments' },
      { name: 'Transactions', id: 'bill-transactions' },
      { name: 'Usage', id: 'bill-usage' },
      { name: 'Credits', id: 'bill-credits' },
      { name: 'Taxes', id: 'bill-taxes' }
    ]
  },
  {
    title: 'Marketplace',
    icon: Store,
    items: [
      { name: 'Plugins', id: 'mktplace-plugins' },
      { name: 'Themes', id: 'mktplace-themes' },
      { name: 'Templates', id: 'mktplace-templates' },
      { name: 'AI Prompts', id: 'mktplace-prompts' },
      { name: 'Extensions', id: 'mktplace-extensions' },
      { name: 'Apps', id: 'mktplace-apps' },
      { name: 'SDKs', id: 'mktplace-sdks' },
      { name: 'Freelancers', id: 'mktplace-freelancers' },
      { name: 'Agencies', id: 'mktplace-agencies' }
    ]
  },
  {
    title: 'Security',
    icon: ShieldAlert,
    items: [
      { name: 'Security Center', id: 'sec-center' },
      { name: 'Threat Detection', id: 'sec-threat' },
      { name: 'Audit Logs', id: 'sec-logs' },
      { name: 'API Security', id: 'sec-api' },
      { name: 'Secrets Manager', id: 'sec-secrets' },
      { name: 'WAF', id: 'sec-waf' },
      { name: 'DDoS Protection', id: 'sec-ddos' },
      { name: 'Compliance', id: 'sec-compliance' },
      { name: 'Privacy Center', id: 'sec-privacy' }
    ]
  },
  {
    title: 'Developer',
    icon: Code2,
    items: [
      { name: 'REST API', id: 'dev-rest' },
      { name: 'GraphQL', id: 'dev-graphql' },
      { name: 'Webhooks', id: 'dev-webhooks' },
      { name: 'SDKs', id: 'dev-sdks' },
      { name: 'CLI', id: 'dev-cli' },
      { name: 'Sandbox', id: 'dev-sandbox' },
      { name: 'API Logs', id: 'dev-logs' },
      { name: 'API Analytics', id: 'dev-analytics' }
    ]
  },
  {
    title: 'Customer Success',
    icon: LifeBuoy,
    items: [
      { name: 'Tickets', id: 'cs-tickets' },
      { name: 'Knowledge Base', id: 'cs-kb' },
      { name: 'Help Center', id: 'cs-help' },
      { name: 'Community', id: 'cs-community' },
      { name: 'Live Support', id: 'cs-support' },
      { name: 'Customer Health', id: 'cs-health' },
      { name: 'SLA', id: 'cs-sla' }
    ]
  },
  {
    title: 'Settings',
    icon: SettingsIcon,
    items: [
      { name: 'General', id: 'settings-general' },
      { name: 'Branding', id: 'settings-branding' },
      { name: 'Domains', id: 'settings-domains' },
      { name: 'Integrations', id: 'settings-integrations' },
      { name: 'Notifications', id: 'settings-notifications' },
      { name: 'Languages', id: 'settings-languages' },
      { name: 'Localization', id: 'settings-localization' },
      { name: 'Storage', id: 'settings-storage' },
      { name: 'Backups', id: 'settings-backups' },
      { name: 'Feature Flags', id: 'settings-flags' },
      { name: 'Email Settings', id: 'settings-email' },
      { name: 'SMS Settings', id: 'settings-sms' },
      { name: 'AI Settings', id: 'settings-ai' },
      { name: 'Billing Settings', id: 'settings-billing' },
      { name: 'Security Settings', id: 'settings-security' }
    ]
  },
  {
    title: 'Super Admin',
    icon: Crown,
    items: [
      { name: 'Tenant Management', id: 'admin-tenant' },
      { name: 'Organizations', id: 'admin-orgs' },
      { name: 'Users', id: 'admin-users' },
      { name: 'Subscriptions', id: 'admin-subs' },
      { name: 'Billing', id: 'admin-billing' },
      { name: 'Marketplace', id: 'admin-market' },
      { name: 'AI Models', id: 'admin-models' },
      { name: 'System Health', id: 'admin-health' },
      { name: 'Infrastructure', id: 'admin-infra' },
      { name: 'Logs', id: 'admin-logs' },
      { name: 'Monitoring', id: 'admin-monitoring' },
      { name: 'Queues', id: 'admin-queues' },
      { name: 'Cron Jobs', id: 'admin-cron' },
      { name: 'Database', id: 'admin-db' },
      { name: 'Cache', id: 'admin-cache' },
      { name: 'Storage', id: 'admin-storage' },
      { name: 'Feature Flags', id: 'admin-flags' },
      { name: 'System Settings', id: 'admin-settings' },
      { name: 'License Manager', id: 'admin-license' }
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
    'CRM & Sales': true // Expand CRM & Sales by default since it is active
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
                            setActiveId(item.id);
                            setMobileOpen(false);
                          }}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
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
          }
          .sidebar.mobile-open {
            transform: translateX(0);
          }
          .mobile-close-btn {
            display: block !important;
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
      `}</style>
    </>
  );
};
