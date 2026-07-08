import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { EmptyState } from './components/EmptyState';

import { 
  CrmLeadManagement, CrmPipelineBoard, CrmOpportunityTracking, CrmSalesAutomation, 
  CrmProposalGenerator, CrmContractManagement, CrmQuoteBuilder, CrmAiSalesAssistant, 
  CrmForecastingDashboard, CrmCommissionTracking 
} from './components/crm/CrmSalesPlatformPages';
import { MarketplaceDashboard } from './components/marketplace/MarketplaceDashboard';
import { 
  CommunicationInbox, CommunicationEmail, CommunicationWhatsApp, 
  CommunicationSMS, CommunicationTelegram, CommunicationLiveChat, 
  CommunicationAIChatbot, CommunicationVoiceCalls, CommunicationPushNotifications, 
  CommunicationInAppMessaging, CommunicationVideoMessaging 
} from './components/communication/CommunicationPages';
import { 
  BillingDashboard, BillingPlans, BillingSubscriptions, BillingInvoices, 
  BillingPayments, BillingTransactions, BillingUsage, BillingTaxes, 
  BillingCoupons, BillingReports 
} from './components/billing/BillingPages';
import { 
  SecurityThreatDetection, SecurityDdos, SecurityApiSecurity, 
  SecurityWaf, SecuritySecrets, SecurityAuditLogs, 
  SecurityCompliance, SecurityZeroTrust, SecurityMonitoring
} from './components/security/SecurityPages';
import { 
  DeveloperRestApi, DeveloperGraphql, DeveloperWebhooks, DeveloperSdks, 
  DeveloperCli, DeveloperSandbox, DeveloperEventBus, DeveloperMarketplaceApis, 
  DeveloperApiAnalytics 
} from './components/developer/DeveloperPages';
import { 
  CustomerSuccessDashboard, CustomerSuccessTickets, CustomerSuccessKb, 
  CustomerSuccessHelp, CustomerSuccessCommunity, CustomerSuccessLiveSupport, 
  CustomerSuccessCustomerHealth, CustomerSuccessSla, CustomerSuccessAiAgent 
} from './components/customersuccess/CustomerSuccessPages';
import { 
  ComplianceGdpr, ComplianceCcpa, ComplianceLgpd, ComplianceCookieConsent, 
  ComplianceCmp, ComplianceDataRetention, ComplianceDataResidency, 
  ComplianceConsentLogs, ComplianceRightToErasure, CompliancePrivacyCenter
} from './components/complianceprivacy/CompliancePrivacyPages';
import { 
  SuperAdminDashboard, SuperAdminTenants, SuperAdminOrganizations, SuperAdminUsers, 
  SuperAdminSubscriptions, SuperAdminBilling, SuperAdminMarketplace, SuperAdminAiModels, 
  SuperAdminSystemHealth, SuperAdminInfrastructure, SuperAdminLogs, SuperAdminMonitoring, 
  SuperAdminQueues, SuperAdminCronJobs, SuperAdminDatabase, SuperAdminCache, 
  SuperAdminStorage, SuperAdminFeatureFlags, SuperAdminSystemSettings, SuperAdminLicenseManager 
} from './components/superadmin/SuperAdminPages';
import { 
  DataWarehouseBigQuery, DataWarehouseSnowflake, DataWarehouseClickHouse, 
  DataWarehouseDataLake, DataWarehouseEtl, DataWarehouseElt, 
  DataWarehouseAnalytics 
} from './components/datawarehouse/DataWarehousePages';
import { 
  AgencyDashboard, AgencyClientWorkspaces, AgencyWhiteLabelPortals, 
  AgencyTeamManagement, AgencyTimeTracking, AgencyClientBilling, 
  AgencyClientApprovals, AgencyCampaignWorkspace, AgencyResourcePlanning 
} from './components/agency/AgencyPages';
import { 
  RecoProduct, RecoCampaign, RecoBudget, RecoAudience, 
  RecoKeyword, RecoCreative, RecoPricing 
} from './components/recommendation/RecommendationPages';
import { 
  SaasMultiTenant, SaasWhiteLabel, SaasOrganization, SaasBusinessUnits, 
  SaasDataCenters, SaasHighAvailability, SaasDisasterRecovery, SaasBackupRestore, 
  SaasFeatureFlags, SaasTenantCustomization, SaasUsageBilling, SaasSubscription, 
  SaasAuditTrails, SaasRateLimiting, SaasScimProvisioning, SaasEnterpriseSso 
} from './components/enterprisesaas/EnterpriseSaaSPages';
import { 
  EcomProductFeed, EcomGoogleMerchant, EcomMetaCatalog, EcomTikTokCatalog, 
  EcomDynamicAds, EcomCartRecovery, EcomAiUpsell, EcomAiCrossSell, 
  EcomClvPrediction, EcomProductRecommendation 
} from './components/ecommerce/ECommerceMarketingPages';

import { 
  SearchSemantic, SearchVector, SearchKb, SearchEnterprise, SearchDocIntel 
} from './components/search/AiSearchEnginePages';

import { 
  AgentMarketing, AgentSeo, AgentPpc, AgentDsp, AgentSsp, AgentAffiliate, 
  AgentPublisher, AgentSales, AgentFinance, AgentCompliance, AgentFraud, 
  AgentSupport, AgentBiz, AgentPm, AgentOpt, AgentCreative, AgentContent, 
  AgentDataSci, AgentDevops 
} from './components/agents/AiAgentsPages';

// Lucide icons for Dashboard
import { LayoutGrid, Sparkles, Shield, ArrowRight } from 'lucide-react';

function App() {
  const [activeId, setActiveId] = useState<string>('comm-email');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Shared Communication States (managed internally in CommunicationPages components)

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  // Auto-hide toast after 3 seconds & listen to global toast events
  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      showToast(customEvent.detail);
    };
    window.addEventListener('show-toast', handleToastEvent);

    let timer: number;
    if (toastMessage) {
      timer = window.setTimeout(() => setToastMessage(null), 3000);
    }
    return () => {
      window.removeEventListener('show-toast', handleToastEvent);
      if (timer) clearTimeout(timer);
    };
  }, [toastMessage]);

  // Render main body contents based on selected sidebar item ID
  const renderContentBody = () => {
    switch (activeId) {
      // Dashboard Homepage
      case 'dashboard':
        return (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header banner */}
            <div className="glass-card" style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              padding: '30px'
            }}>
              <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.75px' }}>
                Welcome to Ad Network OS
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '640px', lineHeight: 1.6, margin: 0 }}>
                A premium, unified hub built for high-performance organizations. Connect your campaigns, sales workflows, design studios, and data infrastructure within a single integrated environment.
              </p>
            </div>

            {/* General OS overview items */}
            <div className="grid-cols-3">
              {/* Card 1 */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
                  <LayoutGrid size={18} />
                  <strong style={{ fontSize: '14px', fontWeight: 600 }}>Active Sandbox Modules</strong>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Explore the fully-functional CRM & Sales module. The other sections serve as layout indicators.
                </p>
                <button 
                  onClick={() => setActiveId('crm-overview')}
                  className="btn btn-secondary btn-sm"
                  style={{ alignSelf: 'flex-start', marginTop: '6px' }}
                >
                  Open Sales Module <ArrowRight size={12} />
                </button>
              </div>

              {/* Card 2 */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)' }}>
                  <Sparkles size={18} />
                  <strong style={{ fontSize: '14px', fontWeight: 600 }}>AI Creative Capabilities</strong>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Future releases will include our AI Creative Studio and Copywriter engines powered by next-gen LLMs.
                </p>
              </div>

              {/* Card 3 */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)' }}>
                  <Shield size={18} />
                  <strong style={{ fontSize: '14px', fontWeight: 600 }}>System Health & Audits</strong>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>API Status:</span>
                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>Operational</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Latency:</span>
                    <span>14ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );



      // Fallback empty states
      default:
        // Check dynamic page configurations for Communication, Billing and Marketplace
        const config = getPageConfig(activeId);
        if (config) {
          const isBilling = activeId.startsWith('bill-');
          const isMarketplace = activeId.startsWith('mktplace-');
          const isSecurity = activeId.startsWith('sec-');
          const isDeveloper = activeId.startsWith('dev-');
          const isCustomerSuccess = activeId.startsWith('cs-');
          const isPrivacy = activeId.startsWith('privacy-');
          const isDataWarehouse = activeId.startsWith('data-');
          const isAgency = activeId.startsWith('agency-');
          const isRecommendation = activeId.startsWith('reco-');
          const isSaas = activeId.startsWith('saas-');
          const isEcom = activeId.startsWith('ecom-');
          const isCrm = activeId.startsWith('crm-');
          const isSearch = activeId.startsWith('search-');
          const isAgent = activeId.startsWith('agent-');
          const isSuperAdmin = activeId.startsWith('admin-');
          let moduleName = 'Omnichannel Communication Platform';
          if (isBilling) moduleName = 'Billing';
          else if (isMarketplace) moduleName = 'Marketplace';
          else if (isSecurity) moduleName = 'Security';
          else if (isDeveloper) moduleName = 'Developer';
          else if (isCustomerSuccess) moduleName = 'Customer Success';
          else if (isPrivacy) moduleName = 'Compliance & Privacy';
          else if (isDataWarehouse) moduleName = 'Data Warehouse';
          else if (isAgency) moduleName = 'Agency Management Platform';
          else if (isRecommendation) moduleName = 'AI Recommendation Engine';
          else if (isSaas) moduleName = 'Enterprise SaaS Features';
          else if (isEcom) moduleName = 'E-commerce Marketing';
          else if (isCrm) moduleName = 'CRM & Sales Platform';
          else if (isSearch) moduleName = 'AI Search Engine';
          else if (isAgent) moduleName = 'AI Agents';
          else if (isSuperAdmin) moduleName = 'Super Admin';

          return (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Breadcrumbs, Page Title, Subtitle and CTAs */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingBottom: '16px',
                borderBottom: '1px solid #333333'
              }}>
                <div>
                  {/* Breadcrumbs */}
                  <div style={{ fontSize: '12px', color: '#666666', marginBottom: '8px' }}>
                    <span>Home</span>
                    <span style={{ margin: '0 6px' }}>→</span>
                    <span>{moduleName}</span>
                    <span style={{ margin: '0 6px' }}>→</span>
                    <span style={{ color: '#dddddd' }}>{config.breadcrumb}</span>
                  </div>
                  {/* Title */}
                  <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                    {config.title}
                  </h1>
                  {/* Subtitle */}
                  <p style={{ color: '#888888', fontSize: '13.5px', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                    {config.subtitle}
                  </p>
                </div>
                
                {/* Primary & Secondary CTA Buttons */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button 
                    onClick={() => {
                      if (activeId === 'comm-email') {
                        window.dispatchEvent(new CustomEvent('email-manage-templates'));
                      } else if (activeId === 'comm-dashboard') {
                        window.dispatchEvent(new CustomEvent('comm-create-campaign'));
                      } else if (activeId === 'comm-inbox') {
                        window.dispatchEvent(new CustomEvent('inbox-filter'));
                      } else if (activeId === 'comm-whatsapp') {
                        window.dispatchEvent(new CustomEvent('whatsapp-template-edit'));
                      } else if (activeId === 'comm-sms') {
                        window.dispatchEvent(new CustomEvent('sms-settings'));
                      } else if (activeId === 'comm-telegram') {
                        window.dispatchEvent(new CustomEvent('telegram-register-bot'));
                      } else if (activeId === 'comm-chat') {
                        window.dispatchEvent(new CustomEvent('chat-settings'));
                      } else if (activeId === 'comm-bot') {
                        window.dispatchEvent(new CustomEvent('bot-prompt-settings'));
                      } else if (activeId === 'bill-dashboard') {
                        window.dispatchEvent(new CustomEvent('bill-open-settings'));
                      } else if (activeId === 'bill-plans') {
                        window.dispatchEvent(new CustomEvent('bill-edit-features'));
                      } else if (activeId === 'bill-subs') {
                        window.dispatchEvent(new CustomEvent('bill-export-csv'));
                      } else if (activeId === 'bill-invoices') {
                        window.dispatchEvent(new CustomEvent('bill-batch-export'));
                      } else if (activeId === 'bill-payments') {
                        window.dispatchEvent(new CustomEvent('bill-configure-retries'));
                      } else if (activeId === 'bill-transactions') {
                        window.dispatchEvent(new CustomEvent('bill-reconcile-accounts'));
                      } else if (activeId === 'bill-usage') {
                        window.dispatchEvent(new CustomEvent('bill-api-settings'));
                      } else if (activeId === 'bill-taxes') {
                        window.dispatchEvent(new CustomEvent('bill-export-audit-logs'));
                      } else if (activeId === 'bill-coupons') {
                        window.dispatchEvent(new CustomEvent('bill-view-redeemed'));
                      } else if (activeId === 'bill-reports') {
                        window.dispatchEvent(new CustomEvent('bill-auditing-logs'));
                      } else if (activeId.startsWith('mktplace-')) {
                        window.dispatchEvent(new CustomEvent(`mkt-sec-${activeId}`));
                      } else if (activeId.startsWith('cs-')) {
                        window.dispatchEvent(new CustomEvent(`cs-sec-${activeId}`));
                      } else if (activeId.startsWith('dev-')) {
                        window.dispatchEvent(new CustomEvent(`dev-sec-${activeId}`));
                      } else if (activeId.startsWith('sec-')) {
                        window.dispatchEvent(new CustomEvent(`sec-sec-${activeId}`));
                      } else if (activeId.startsWith('privacy-')) {
                        window.dispatchEvent(new CustomEvent(`privacy-sec-${activeId}`));
                      } else if (activeId.startsWith('data-')) {
                        window.dispatchEvent(new CustomEvent(`data-sec-${activeId}`));
                      } else if (activeId.startsWith('agency-')) {
                        window.dispatchEvent(new CustomEvent(`agency-sec-${activeId}`));
                      } else if (activeId.startsWith('reco-')) {
                        window.dispatchEvent(new CustomEvent(`reco-sec-${activeId}`));
                      } else if (activeId.startsWith('saas-')) {
                        window.dispatchEvent(new CustomEvent(`saas-sec-${activeId}`));
                      } else if (activeId.startsWith('comm-')) {
                        window.dispatchEvent(new CustomEvent(`comm-sec-${activeId}`));
                      } else if (activeId.startsWith('ecom-')) {
                        window.dispatchEvent(new CustomEvent(`ecom-sec-${activeId}`));
                      } else if (activeId.startsWith('crm-')) {
                        window.dispatchEvent(new CustomEvent(`crm-sec-${activeId}`));
                      } else if (activeId.startsWith('search-')) {
                        window.dispatchEvent(new CustomEvent(`search-sec-${activeId}`));
                      } else if (activeId.startsWith('agent-')) {
                        window.dispatchEvent(new CustomEvent(`agent-sec-${activeId}`));
                      } else {
                        showToast(`Action triggered: ${config.secondaryCta}`);
                      }
                    }}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                  >
                    {config.secondaryCta}
                  </button>
                  <button 
                    onClick={() => {
                      if (activeId === 'comm-email') {
                        window.dispatchEvent(new CustomEvent('email-compose'));
                      } else if (activeId === 'comm-dashboard') {
                        window.dispatchEvent(new CustomEvent('comm-new-message'));
                      } else if (activeId === 'comm-inbox') {
                        window.dispatchEvent(new CustomEvent('inbox-new-conv'));
                      } else if (activeId === 'comm-whatsapp') {
                        window.dispatchEvent(new CustomEvent('whatsapp-new-broadcast'));
                      } else if (activeId === 'comm-sms') {
                        window.dispatchEvent(new CustomEvent('sms-new-campaign'));
                      } else if (activeId === 'comm-telegram') {
                        window.dispatchEvent(new CustomEvent('telegram-new-broadcast'));
                      } else if (activeId === 'comm-chat') {
                        window.dispatchEvent(new CustomEvent('chat-go-online'));
                      } else if (activeId === 'comm-bot') {
                        window.dispatchEvent(new CustomEvent('bot-train-model'));
                      } else if (activeId === 'bill-dashboard') {
                        window.dispatchEvent(new CustomEvent('bill-view-financial-reports'));
                      } else if (activeId === 'bill-plans') {
                        window.dispatchEvent(new CustomEvent('bill-create-pricing-plan'));
                      } else if (activeId === 'bill-subs') {
                        window.dispatchEvent(new CustomEvent('bill-new-subscription'));
                      } else if (activeId === 'bill-invoices') {
                        window.dispatchEvent(new CustomEvent('bill-generate-invoice'));
                      } else if (activeId === 'bill-payments') {
                        window.dispatchEvent(new CustomEvent('bill-add-payment-gateway'));
                      } else if (activeId === 'bill-transactions') {
                        window.dispatchEvent(new CustomEvent('bill-export-ledger'));
                      } else if (activeId === 'bill-usage') {
                        window.dispatchEvent(new CustomEvent('bill-set-limit-alerts'));
                      } else if (activeId === 'bill-taxes') {
                        window.dispatchEvent(new CustomEvent('bill-add-tax-jurisdiction'));
                      } else if (activeId === 'bill-coupons') {
                        window.dispatchEvent(new CustomEvent('bill-create-coupon'));
                      } else if (activeId === 'bill-reports') {
                        window.dispatchEvent(new CustomEvent('bill-export-pdf-report'));
                      } else if (activeId.startsWith('mktplace-')) {
                        window.dispatchEvent(new CustomEvent(`mkt-pri-${activeId}`));
                      } else if (activeId.startsWith('cs-')) {
                        window.dispatchEvent(new CustomEvent(`cs-pri-${activeId}`));
                      } else if (activeId.startsWith('dev-')) {
                        window.dispatchEvent(new CustomEvent(`dev-pri-${activeId}`));
                      } else if (activeId.startsWith('sec-')) {
                        window.dispatchEvent(new CustomEvent(`sec-pri-${activeId}`));
                      } else if (activeId.startsWith('privacy-')) {
                        window.dispatchEvent(new CustomEvent(`privacy-pri-${activeId}`));
                      } else if (activeId.startsWith('data-')) {
                        window.dispatchEvent(new CustomEvent(`data-pri-${activeId}`));
                      } else if (activeId.startsWith('agency-')) {
                        window.dispatchEvent(new CustomEvent(`agency-pri-${activeId}`));
                      } else if (activeId.startsWith('reco-')) {
                        window.dispatchEvent(new CustomEvent(`reco-pri-${activeId}`));
                      } else if (activeId.startsWith('saas-')) {
                        window.dispatchEvent(new CustomEvent(`saas-pri-${activeId}`));
                      } else if (activeId.startsWith('comm-')) {
                        window.dispatchEvent(new CustomEvent(`comm-pri-${activeId}`));
                      } else if (activeId.startsWith('ecom-')) {
                        window.dispatchEvent(new CustomEvent(`ecom-pri-${activeId}`));
                      } else if (activeId.startsWith('crm-')) {
                        window.dispatchEvent(new CustomEvent(`crm-pri-${activeId}`));
                      } else if (activeId.startsWith('search-')) {
                        window.dispatchEvent(new CustomEvent(`search-pri-${activeId}`));
                      } else if (activeId.startsWith('agent-')) {
                        window.dispatchEvent(new CustomEvent(`agent-pri-${activeId}`));
                      } else {
                        showToast(`Action triggered: ${config.primaryCta}`);
                      }
                    }}
                    style={{
                      backgroundColor: 'var(--primary)',
                      border: '1px solid var(--primary-hover)',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(99, 102, 241, 0.2)',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                  >
                    {config.primaryCta}
                  </button>
                </div>
              </div>

              {config.component}
            </div>
          );
        }

        return <EmptyState activeId={activeId} setActiveId={setActiveId} />;
    }
  };

  // PageConfig interface and helper function defined inside App.tsx
  interface PageConfig {
    breadcrumb: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    component: React.ReactNode;
  }

  const getPageConfig = (id: string): PageConfig | null => {
    switch (id) {
      // Marketplace Module
      case 'mktplace-dashboard':
        return {
          breadcrumb: 'Dashboard',
          title: 'Marketplace Dashboard',
          subtitle: 'Discover, install, purchase and manage extensions, templates, AI assets and agency services from one centralized marketplace.',
          primaryCta: 'Browse Marketplace',
          secondaryCta: 'Publish Extension',
          component: <MarketplaceDashboard activeId="mktplace-dashboard" />
        };
      case 'mktplace-plugins':
        return {
          breadcrumb: 'Plugin Marketplace',
          title: 'Plugin Marketplace',
          subtitle: 'Browse, install, and manage functional integration plugins.',
          primaryCta: 'Upload Plugin',
          secondaryCta: 'Plugin SDK',
          component: <MarketplaceDashboard activeId="mktplace-plugins" />
        };
      case 'mktplace-themes':
        return {
          breadcrumb: 'Theme Marketplace',
          title: 'Theme Marketplace',
          subtitle: 'Discover clean user interface styles and custom layouts.',
          primaryCta: 'Upload Theme',
          secondaryCta: 'Theme Guidelines',
          component: <MarketplaceDashboard activeId="mktplace-themes" />
        };
      case 'mktplace-templates':
        return {
          breadcrumb: 'Template Marketplace',
          title: 'Template Marketplace',
          subtitle: 'Standardized campaign structures, workflows, and landing pages.',
          primaryCta: 'Duplicate Template',
          secondaryCta: 'Submit Template',
          component: <MarketplaceDashboard activeId="mktplace-templates" />
        };
      case 'mktplace-prompts':
        return {
          breadcrumb: 'AI Prompt Marketplace',
          title: 'AI Prompt Marketplace',
          subtitle: 'Pre-configured LLM prompt structures and contexts.',
          primaryCta: 'Publish Prompt',
          secondaryCta: 'Prompt Engine',
          component: <MarketplaceDashboard activeId="mktplace-prompts" />
        };
      case 'mktplace-agencies':
        return {
          breadcrumb: 'Agency Marketplace',
          title: 'Agency Marketplace Partner Directory',
          subtitle: 'Hire verified service partners and agency developers.',
          primaryCta: 'Become Agency Partner',
          secondaryCta: 'Request Agency',
          component: <MarketplaceDashboard activeId="mktplace-agencies" />
        };
      case 'mktplace-installed':
        return {
          breadcrumb: 'Installed Items',
          title: 'Installed Extensions & Tools',
          subtitle: 'Monitor license status and auto-updates.',
          primaryCta: 'Check for Updates',
          secondaryCta: 'Upload Custom Pack',
          component: <MarketplaceDashboard activeId="mktplace-installed" />
        };
      case 'mktplace-purchases':
        return {
          breadcrumb: 'Purchases',
          title: 'Purchases & Subscriptions Ledger',
          subtitle: 'Audit invoice history, subscriptions, and active credits.',
          primaryCta: 'Export Invoice Log',
          secondaryCta: 'Manage Payment Methods',
          component: <MarketplaceDashboard activeId="mktplace-purchases" />
        };
      case 'mktplace-favorites':
        return {
          breadcrumb: 'Favorites',
          title: 'Bookmarked Assets',
          subtitle: 'Quickly access your pinned plugins, templates, and prompts.',
          primaryCta: 'Browse Marketplace',
          secondaryCta: 'Share Wishlist',
          component: <MarketplaceDashboard activeId="mktplace-favorites" />
        };
      case 'mktplace-freelancers':
        return {
          breadcrumb: 'Freelancers',
          title: 'Freelancer Marketplace',
          subtitle: 'Hire verified freelancer experts or register as an independent contractor.',
          primaryCta: 'Hire Freelancer',
          secondaryCta: 'Become Freelancer',
          component: <MarketplaceDashboard activeId="mktplace-freelancers" />
        };
      case 'mktplace-services':
        return {
          breadcrumb: 'Services',
          title: 'Service Marketplace',
          subtitle: 'Browse custom service bundles, agency reviews, and consulting hours.',
          primaryCta: 'Request Service',
          secondaryCta: 'Offer Service',
          component: <MarketplaceDashboard activeId="mktplace-services" />
        };
      case 'mktplace-influencers':
        return {
          breadcrumb: 'Influencers',
          title: 'Influencer Marketplace',
          subtitle: 'Partner with top content creators and influencers in your niche.',
          primaryCta: 'Connect Influencer',
          secondaryCta: 'Become Partner',
          component: <MarketplaceDashboard activeId="mktplace-influencers" />
        };

      // Communication Module
      case 'comm-email':
        return {
          breadcrumb: 'Email',
          title: 'Email Campaigns',
          subtitle: 'Design, schedule and send automated email sequences.',
          primaryCta: 'Compose Email',
          secondaryCta: 'Manage Templates',
          component: <CommunicationEmail />
        };
      case 'comm-whatsapp':
        return {
          breadcrumb: 'WhatsApp',
          title: 'WhatsApp Broadcasts',
          subtitle: 'Send templates and trigger WhatsApp campaign sequences.',
          primaryCta: 'New Broadcast',
          secondaryCta: 'Templates Editor',
          component: <CommunicationWhatsApp />
        };
      case 'comm-telegram':
        return {
          breadcrumb: 'Telegram',
          title: 'Telegram Automation',
          subtitle: 'Broadcast alerts to channels and coordinate linked chat bots.',
          primaryCta: 'New Telegram Broadcast',
          secondaryCta: 'Register Bot',
          component: <CommunicationTelegram />
        };
      case 'comm-sms':
        return {
          breadcrumb: 'SMS',
          title: 'SMS Campaigns',
          subtitle: 'Trigger regional mobile SMS text alerts.',
          primaryCta: 'New SMS Campaign',
          secondaryCta: 'SMS Settings',
          component: <CommunicationSMS />
        };
      case 'comm-voice':
        return {
          breadcrumb: 'Voice Calls',
          title: 'Voice Telephony & Call Logs',
          subtitle: 'Coordinate outbound calls, view call times and trace Twilio logs.',
          primaryCta: 'Start Voice Call',
          secondaryCta: 'Export Call Logs',
          component: <CommunicationVoiceCalls />
        };
      case 'comm-push':
        return {
          breadcrumb: 'Push Notifications',
          title: 'Mobile App Push Broadcasts',
          subtitle: 'Design, configure segments and broadcast mobile app push alerts.',
          primaryCta: 'Send Push Campaign',
          secondaryCta: 'Export Templates',
          component: <CommunicationPushNotifications />
        };
      case 'comm-inapp':
        return {
          breadcrumb: 'In-App Messaging',
          title: 'In-App Interstitial Overlays',
          subtitle: 'Configure dynamic trigger rules to launch in-app notification popups.',
          primaryCta: 'Create In-App Campaign',
          secondaryCta: 'In-App settings',
          component: <CommunicationInAppMessaging />
        };
      case 'comm-chat':
        return {
          breadcrumb: 'Live Chat',
          title: 'Live Chat Support',
          subtitle: 'Interact with online visitors and distribute support tickets.',
          primaryCta: 'Go Online',
          secondaryCta: 'Department Settings',
          component: <CommunicationLiveChat />
        };
      case 'comm-bot':
        return {
          breadcrumb: 'AI Chatbot',
          title: 'AI Chatbot Assistant',
          subtitle: 'Train model prompt guidelines and sync customer FAQs.',
          primaryCta: 'Train AI Model',
          secondaryCta: 'Prompt Settings',
          component: <CommunicationAIChatbot />
        };
      case 'comm-video':
        return {
          breadcrumb: 'Video Messaging',
          title: 'WebRTC Video Messaging Session',
          subtitle: 'Host real-time customer support video call rooms directly in app.',
          primaryCta: 'Initialize Video Session',
          secondaryCta: 'Video stats',
          component: <CommunicationVideoMessaging />
        };
      case 'comm-inbox':
        return {
          breadcrumb: 'Omnichannel Inbox',
          title: 'Unified Omnichannel Inbox',
          subtitle: 'Unified Omnichannel Inbox for customer conversations across Email, SMS, Telegram, WhatsApp and Chat.',
          primaryCta: 'New Conversation',
          secondaryCta: 'Filter Inbox',
          component: <CommunicationInbox />
        };

      // Billing Module
      case 'bill-dashboard':
        return {
          breadcrumb: 'Dashboard',
          title: 'Billing Dashboard',
          subtitle: 'Overview of MRR, active plan allocations, and outstanding payments.',
          primaryCta: 'View Financial Reports',
          secondaryCta: 'Billing Settings',
          component: <BillingDashboard />
        };
      case 'bill-plans':
        return {
          breadcrumb: 'Plans',
          title: 'Billing Pricing Plans',
          subtitle: 'Configure Starter, Pro and Enterprise tier specifications.',
          primaryCta: 'Create Pricing Plan',
          secondaryCta: 'Edit Features',
          component: <BillingPlans />
        };
      case 'bill-subs':
        return {
          breadcrumb: 'Subscriptions',
          title: 'Subscription Database',
          subtitle: 'Manage active tenant subscriptions and upcoming renewals.',
          primaryCta: 'New Subscription',
          secondaryCta: 'Export CSV',
          component: <BillingSubscriptions />
        };
      case 'bill-invoices':
        return {
          breadcrumb: 'Invoices',
          title: 'Invoice Registry',
          subtitle: 'Log of billing invoices, dunning, and processing status.',
          primaryCta: 'Generate Invoice',
          secondaryCta: 'Batch Export',
          component: <BillingInvoices />
        };
      case 'bill-payments':
        return {
          breadcrumb: 'Payments',
          title: 'Payment Gateways',
          subtitle: 'Manage payment method channels and refund requests.',
          primaryCta: 'Add Payment Gateway',
          secondaryCta: 'Configure Retries',
          component: <BillingPayments />
        };
      case 'bill-transactions':
        return {
          breadcrumb: 'Transactions',
          title: 'Ledger Transactions',
          subtitle: 'Detailed accounting ledger tracking credits and charges.',
          primaryCta: 'Export Ledger',
          secondaryCta: 'Reconcile Accounts',
          component: <BillingTransactions />
        };
      case 'bill-usage':
        return {
          breadcrumb: 'Usage',
          title: 'Resource Usage Limits',
          subtitle: 'API queries, WhatsApp volumes and LLM token parameters.',
          primaryCta: 'Set Limit Alerts',
          secondaryCta: 'API Settings',
          component: <BillingUsage />
        };
      case 'bill-taxes':
        return {
          breadcrumb: 'Taxes',
          title: 'Tax Rules & Compliance',
          subtitle: 'Configure regional sales tax, VAT and B2B exemption policies.',
          primaryCta: 'Add Tax Jurisdiction',
          secondaryCta: 'Export Audit Logs',
          component: <BillingTaxes />
        };
      case 'bill-coupons':
        return {
          breadcrumb: 'Coupons',
          title: 'Coupons & Discounts',
          subtitle: 'Generate discount promo codes and set redemption caps.',
          primaryCta: 'Create Coupon',
          secondaryCta: 'View Redeemed',
          component: <BillingCoupons />
        };
      case 'bill-reports':
        return {
          breadcrumb: 'Billing Reports',
          title: 'Billing Reports',
          subtitle: 'Export Quarterly financial audits and MRR forecast indicators.',
          primaryCta: 'Export PDF Report',
          secondaryCta: 'Auditing Logs',
          component: <BillingReports />
        };

      // AI Security Center Module
      case 'sec-threat':
        return {
          breadcrumb: 'Threat Detection',
          title: 'Threat Detection Logs',
          subtitle: 'Live mitigation registry and sandbox activities.',
          primaryCta: 'Run Threat Scan',
          secondaryCta: 'Mitigation Logs',
          component: <SecurityThreatDetection />
        };
      case 'sec-ddos':
        return {
          breadcrumb: 'DDoS Protection',
          title: 'DDoS Protection Shield',
          subtitle: 'Monitor ingress network bandwidth and apply mitigation thresholds.',
          primaryCta: 'Configure Rate Limits',
          secondaryCta: 'Traffic Analytics',
          component: <SecurityDdos />
        };
      case 'sec-api':
        return {
          breadcrumb: 'API Security',
          title: 'API Security Controls',
          subtitle: 'Manage client tokens, rotate API keys, and set rate limits.',
          primaryCta: 'Generate API Key',
          secondaryCta: 'Rotate Key Set',
          component: <SecurityApiSecurity />
        };
      case 'sec-waf':
        return {
          breadcrumb: 'WAF',
          title: 'Web Application Firewall (WAF)',
          subtitle: 'Enforce application-layer threat filters, SQLi, and XSS rules.',
          primaryCta: 'Add Firewall Rule',
          secondaryCta: 'WAF Audit Logs',
          component: <SecurityWaf />
        };
      case 'sec-secrets':
        return {
          breadcrumb: 'Secrets Manager',
          title: 'Secrets Vault Manager',
          subtitle: 'Store, rotate, and access encrypted database keys and API tokens.',
          primaryCta: 'Add New Secret',
          secondaryCta: 'Vault Settings',
          component: <SecuritySecrets />
        };
      case 'sec-logs':
        return {
          breadcrumb: 'Audit Logs',
          title: 'System Audit Logs',
          subtitle: 'Verifiable database of administrator and member operations.',
          primaryCta: 'Run Audit Log Search',
          secondaryCta: 'Export Log CSV',
          component: <SecurityAuditLogs />
        };
      case 'sec-compliance':
        return {
          breadcrumb: 'Compliance Dashboard',
          title: 'Compliance Dashboard',
          subtitle: 'Status alignment for GDPR, CCPA, and SOC 2 requirements.',
          primaryCta: 'Run Compliance Audit',
          secondaryCta: 'Export SOC2 PDF',
          component: <SecurityCompliance />
        };
      case 'sec-zerotrust':
        return {
          breadcrumb: 'Zero Trust Access',
          title: 'Zero Trust Access Control',
          subtitle: 'Verify context-aware credentials and enforce lease-privilege permissions.',
          primaryCta: 'Add Zero Trust Policy',
          secondaryCta: 'Active Sessions',
          component: <SecurityZeroTrust />
        };
      case 'sec-monitoring':
        return {
          breadcrumb: 'Security Monitoring',
          title: 'Live Security Monitoring',
          subtitle: 'Configure real-time system alerts and webhook warning flags.',
          primaryCta: 'Configure Slack Hooks',
          secondaryCta: 'Download Alert History',
          component: <SecurityMonitoring />
        };

      // Developer Platform Module
      case 'dev-rest':
        return {
          breadcrumb: 'REST APIs',
          title: 'REST APIs Explorer',
          subtitle: 'Integrate, execute and audit standardized REST endpoints.',
          primaryCta: 'Create API Key',
          secondaryCta: 'Download OpenAPI',
          component: <DeveloperRestApi />
        };
      case 'dev-graphql':
        return {
          breadcrumb: 'GraphQL APIs',
          title: 'GraphQL APIs Playground',
          subtitle: 'Run and test unified federated schema structures.',
          primaryCta: 'Open Playground',
          secondaryCta: 'Export Schema',
          component: <DeveloperGraphql />
        };
      case 'dev-webhooks':
        return {
          breadcrumb: 'Webhooks',
          title: 'Webhook Subscriptions',
          subtitle: 'Receive realtime updates on tenant mutations.',
          primaryCta: 'Register Webhook',
          secondaryCta: 'Test Webhook Payload',
          component: <DeveloperWebhooks />
        };
      case 'dev-sdks':
        return {
          breadcrumb: 'SDKs (JavaScript, Node.js, Python, PHP, Java, Go)',
          title: 'SDKs (JavaScript, Node.js, Python, PHP, Java, Go)',
          subtitle: 'Official programmatic packages for your favorite runtimes.',
          primaryCta: 'Download Packages',
          secondaryCta: 'SDK Configuration',
          component: <DeveloperSdks />
        };
      case 'dev-cli':
        return {
          breadcrumb: 'CLI',
          title: 'CLI Console Tools',
          subtitle: 'Install and authenticate local developer command sets.',
          primaryCta: 'Generate Auth Token',
          secondaryCta: 'CLI Command Help',
          component: <DeveloperCli />
        };
      case 'dev-sandbox':
        return {
          breadcrumb: 'API Sandbox',
          title: 'API Sandbox Environment',
          subtitle: 'Reconcile logic against mock profiles and payment simulations.',
          primaryCta: 'Reset Sandbox DB',
          secondaryCta: 'Mock Stripe Payment',
          component: <DeveloperSandbox />
        };
      case 'dev-event-bus':
        return {
          breadcrumb: 'Event Bus',
          title: 'API Event Bus Console',
          subtitle: 'Audit, broadcast and register reactive pub-sub message queues.',
          primaryCta: 'Publish New Event',
          secondaryCta: 'Event Logs Config',
          component: <DeveloperEventBus />
        };
      case 'dev-mkt-apis':
        return {
          breadcrumb: 'Marketplace APIs',
          title: 'Marketplace Integration APIs',
          subtitle: 'Configure backend credentials for plugins, themes and prompt extensions.',
          primaryCta: 'Generate Partner Key',
          secondaryCta: 'Sync Ext Configurations',
          component: <DeveloperMarketplaceApis />
        };
      case 'dev-analytics':
        return {
          breadcrumb: 'API Analytics',
          title: 'API Performance Analytics',
          subtitle: 'Review error rates, traffic patterns and SLA thresholds.',
          primaryCta: 'Configure Alerts',
          secondaryCta: 'Download Analytics CSV',
          component: <DeveloperApiAnalytics />
        };

      // Customer Success Module
      case 'cs-dashboard':
        return {
          breadcrumb: 'Dashboard',
          title: 'Customer Success Dashboard',
          subtitle: 'Monitor agent activities, ticket trends, and CSAT scores.',
          primaryCta: 'Create Ticket',
          secondaryCta: 'Export CSAT logs',
          component: <CustomerSuccessDashboard />
        };
      case 'cs-tickets':
        return {
          breadcrumb: 'Ticket System',
          title: 'Ticket System',
          subtitle: 'Manage and resolve customer support inquiries.',
          primaryCta: 'New Ticket',
          secondaryCta: 'Assign Tickets',
          component: <CustomerSuccessTickets />
        };
      case 'cs-kb':
        return {
          breadcrumb: 'Knowledge Base',
          title: 'Knowledge Base',
          subtitle: 'Maintain helpful walkthroughs, guides and FAQs.',
          primaryCta: 'Create Article',
          secondaryCta: 'Publish Drafts',
          component: <CustomerSuccessKb />
        };
      case 'cs-help':
        return {
          breadcrumb: 'Help Center',
          title: 'Help Center',
          subtitle: 'Interactive customer portal FAQ registry and tutorials.',
          primaryCta: 'Submit Request',
          secondaryCta: 'Contact Support',
          component: <CustomerSuccessHelp />
        };
      case 'cs-community':
        return {
          breadcrumb: 'Community Forum',
          title: 'Community Forum',
          subtitle: 'Reconcile customer queries, feedback and feature requests.',
          primaryCta: 'Create Post',
          secondaryCta: 'Review Requests',
          component: <CustomerSuccessCommunity />
        };
      case 'cs-support':
        return {
          breadcrumb: 'Live Chat',
          title: 'Live Chat Support Center',
          subtitle: 'Online agent queues, response slots and active sessions.',
          primaryCta: 'Go Online',
          secondaryCta: 'Chat Settings',
          component: <CustomerSuccessLiveSupport />
        };
      case 'cs-agent':
        return {
          breadcrumb: 'AI Support Agent',
          title: 'AI Support Agent',
          subtitle: 'Track deflected chat queries, response latency and model status.',
          primaryCta: 'Retrain Models',
          secondaryCta: 'Sync Knowledge Base',
          component: <CustomerSuccessAiAgent />
        };
      case 'cs-health':
        return {
          breadcrumb: 'Customer Health Score',
          title: 'Customer Health Score',
          subtitle: 'Audit NPS scores, tenant usage values and renewal risks.',
          primaryCta: 'Export Health Ledger',
          secondaryCta: 'Risk Indicators',
          component: <CustomerSuccessCustomerHealth />
        };
      case 'cs-sla':
        return {
          breadcrumb: 'SLA Management',
          title: 'SLA Management',
          subtitle: 'SLA resolution parameters, response targets and escalations.',
          primaryCta: 'Create SLA Policy',
          secondaryCta: 'Violation Alerts',
          component: <CustomerSuccessSla />
        };

      // Compliance & Privacy Module
      case 'privacy-gdpr':
        return {
          breadcrumb: 'GDPR Compliance',
          title: 'GDPR Compliance Dashboard',
          subtitle: 'Audit, manage and enforce General Data Protection Regulation requirements.',
          primaryCta: 'Add DPO Profile',
          secondaryCta: 'Export GDPR Audit',
          component: <ComplianceGdpr />
        };
      case 'privacy-ccpa':
        return {
          breadcrumb: 'CCPA Compliance',
          title: 'CCPA / CPRA California Compliance',
          subtitle: 'Manage consumer rights, opt-out requests, and California privacy disclosures.',
          primaryCta: 'Add Consumer Request',
          secondaryCta: 'Download Opt-Outs',
          component: <ComplianceCcpa />
        };
      case 'privacy-lgpd':
        return {
          breadcrumb: 'LGPD Compliance',
          title: 'Brazilian LGPD Framework Settings',
          subtitle: 'Enforce Lei Geral de Proteção de Dados compliance settings and audits.',
          primaryCta: 'Register Data Map',
          secondaryCta: 'LGPD Action Log',
          component: <ComplianceLgpd />
        };
      case 'privacy-cookie':
        return {
          breadcrumb: 'Cookie Consent',
          title: 'Cookie Consent Settings & Banners',
          subtitle: 'Configure client-side cookie banners, scan frequency, and categorizations.',
          primaryCta: 'Scan Website Cookies',
          secondaryCta: 'Cookie Banner Builder',
          component: <ComplianceCookieConsent />
        };
      case 'privacy-cmp':
        return {
          breadcrumb: 'CMP Settings',
          title: 'Consent Management Platform (CMP)',
          subtitle: 'Integrate consent parameters with Tag Manager and third-party advertising APIs.',
          primaryCta: 'Deploy CMP Script',
          secondaryCta: 'Configure Categories',
          component: <ComplianceCmp />
        };
      case 'privacy-retention':
        return {
          breadcrumb: 'Data Retention',
          title: 'Data Retention Policies',
          subtitle: 'Define database storage lifetimes for backups, sessions, logs and analytics.',
          primaryCta: 'Add Retention Rule',
          secondaryCta: 'Export Policies',
          component: <ComplianceDataRetention />
        };
      case 'privacy-residency':
        return {
          breadcrumb: 'Data Residency',
          title: 'Data Residency & Regional Isolation',
          subtitle: 'Lock platform data databases to specific geographical regions (EU, US, APAC).',
          primaryCta: 'Register Server Region',
          secondaryCta: 'Run Residency Audit',
          component: <ComplianceDataResidency />
        };
      case 'privacy-logs':
        return {
          breadcrumb: 'Consent Logs',
          title: 'Compliance Consent Audits Log',
          subtitle: 'Audit immutable ledger records of user privacy choices and consents.',
          primaryCta: 'Export Consent CSV',
          secondaryCta: 'Audit Consent Log',
          component: <ComplianceConsentLogs />
        };
      case 'privacy-erasure':
        return {
          breadcrumb: 'Right to Erasure',
          title: 'Right to Erasure (Article 17 GDPR)',
          subtitle: 'Process and manage user data purge requests and confirmation receipts.',
          primaryCta: 'Submit Erasure Request',
          secondaryCta: 'Check Erasure Queue',
          component: <ComplianceRightToErasure />
        };
      case 'privacy-center':
        return {
          breadcrumb: 'Privacy Center',
          title: 'Customer Privacy Center Portal',
          subtitle: 'Configure public portal urls for user self-service privacy operations.',
          primaryCta: 'Generate Center Link',
          secondaryCta: 'Configure Legal URLs',
          component: <CompliancePrivacyCenter />
        };

      // Super Admin Module
      case 'admin-dashboard':
        return {
          breadcrumb: 'Dashboard',
          title: 'Super Admin Dashboard',
          subtitle: 'Global SaaS overview, load indicators and monthly recurring ARR.',
          primaryCta: 'Restart Services',
          secondaryCta: 'Create Tenant',
          component: <SuperAdminDashboard />
        };
      case 'admin-tenant':
        return {
          breadcrumb: 'Tenant Management',
          title: 'SaaS Tenants Management',
          subtitle: 'Manage client billing states, disk limits and databases.',
          primaryCta: 'Create Tenant Profile',
          secondaryCta: 'Export tenant list',
          component: <SuperAdminTenants />
        };
      case 'admin-orgs':
        return {
          breadcrumb: 'Organizations',
          title: 'Platform Business Units Registry',
          subtitle: 'Track active tenant departments, owners and statuses.',
          primaryCta: 'Add Business Unit',
          secondaryCta: 'Reorganize registry',
          component: <SuperAdminOrganizations />
        };
      case 'admin-users':
        return {
          breadcrumb: 'Users',
          title: 'Global Platform Users Directory',
          subtitle: 'Audit user roles, statuses, and last login timestamps.',
          primaryCta: 'Invite Platform User',
          secondaryCta: 'Import users list',
          component: <SuperAdminUsers />
        };
      case 'admin-subs':
        return {
          breadcrumb: 'Subscriptions',
          title: 'Tenant Subscription Plan ledger',
          subtitle: 'Manage active subscriptions, renew intervals and license rates.',
          primaryCta: 'Create Plan Option',
          secondaryCta: 'Subscriptions ledger',
          component: <SuperAdminSubscriptions />
        };
      case 'admin-billing':
        return {
          breadcrumb: 'Billing',
          title: 'Global Platform Billing Accounts',
          subtitle: 'Track invoices, refund reports and tax logs.',
          primaryCta: 'Export Invoices logs',
          secondaryCta: 'Billing ledger',
          component: <SuperAdminBilling />
        };
      case 'admin-market':
        return {
          breadcrumb: 'Marketplace',
          title: 'Marketplace Asset Publishing Approvals',
          subtitle: 'Approve theme, plugin, template and prompt submissions.',
          primaryCta: 'Asset Approvals Logs',
          secondaryCta: 'Marketplace stats',
          component: <SuperAdminMarketplace />
        };
      case 'admin-models':
        return {
          breadcrumb: 'AI Models',
          title: 'AI Providers & LLM Router Setup',
          subtitle: 'Monitor API uptime, token usages and monthly costs.',
          primaryCta: 'AI Models Router setup',
          secondaryCta: 'Model costs ledger',
          component: <SuperAdminAiModels />
        };
      case 'admin-health':
        return {
          breadcrumb: 'System Health',
          title: 'System Health Indicators Monitor',
          subtitle: 'Review memory bounds, database indexes and CPU limits.',
          primaryCta: 'Clear System Cache',
          secondaryCta: 'Health diagnostics',
          component: <SuperAdminSystemHealth />
        };
      case 'admin-infra':
        return {
          breadcrumb: 'Infrastructure',
          title: 'AWS & Google Cloud Clusters Monitoring',
          subtitle: 'Reconcile Kubernetes clusters, networks and containers.',
          primaryCta: 'Deploy Cluster Node',
          secondaryCta: 'Infrastructure logs',
          component: <SuperAdminInfrastructure />
        };
      case 'admin-logs':
        return {
          breadcrumb: 'Logs',
          title: 'SaaS Operations System Logs',
          subtitle: 'Monitor API errors, scheduler outputs and webhook hooks.',
          primaryCta: 'Download System Logs',
          secondaryCta: 'Clear Logs DB',
          component: <SuperAdminLogs />
        };
      case 'admin-monitoring':
        return {
          breadcrumb: 'Monitoring',
          title: 'Real-time Platform Load Monitors',
          subtitle: 'Audit traffic bandwidth, error counts and roundtrip delays.',
          primaryCta: 'Export Monitor Logs',
          secondaryCta: 'Real-time metrics',
          component: <SuperAdminMonitoring />
        };
      case 'admin-queues':
        return {
          breadcrumb: 'Queues',
          title: 'Redis Queue Job Workers',
          subtitle: 'Coordinate workers count, failed jobs retry lists and tasks.',
          primaryCta: 'Flush Job Queues',
          secondaryCta: 'Worker logs',
          component: <SuperAdminQueues />
        };
      case 'admin-cron':
        return {
          breadcrumb: 'Cron Jobs',
          title: 'Scheduler Cron Triggers',
          subtitle: 'Manage cron intervals, triggers and scheduled sync logs.',
          primaryCta: 'Manual Trigger Job',
          secondaryCta: 'Scheduler history',
          component: <SuperAdminCronJobs />
        };
      case 'admin-db':
        return {
          breadcrumb: 'Database',
          title: 'PostgreSQL DB Replication parameters',
          subtitle: 'Monitor read replicas, replication delays and table indices.',
          primaryCta: 'Optimize Indexes',
          secondaryCta: 'DB logs',
          component: <SuperAdminDatabase />
        };
      case 'admin-cache':
        return {
          breadcrumb: 'Cache',
          title: 'Redis Cache configuration',
          subtitle: 'Track memory hit ratios, keys count and flush caches.',
          primaryCta: 'Flush Redis Cache',
          secondaryCta: 'Cache logs',
          component: <SuperAdminCache />
        };
      case 'admin-storage':
        return {
          breadcrumb: 'Storage',
          title: 'Object Storage Buckets Audit',
          subtitle: 'Reconcile active buckets, media storage files and logs.',
          primaryCta: 'Storage Cleanup Logs',
          secondaryCta: 'Bucket parameters',
          component: <SuperAdminStorage />
        };
      case 'admin-flags':
        return {
          breadcrumb: 'Feature Flags',
          title: 'Global Platform Features Configuration',
          subtitle: 'Toggle features globally and configure beta testing rollouts.',
          primaryCta: 'Add Global Flag',
          secondaryCta: 'Flags ledger',
          component: <SuperAdminFeatureFlags />
        };
      case 'admin-settings':
        return {
          breadcrumb: 'System Settings',
          title: 'Global Configuration Settings',
          subtitle: 'Apply SaaS brand labels, timezone configurations and defaults.',
          primaryCta: 'Save Global Settings',
          secondaryCta: 'System defaults',
          component: <SuperAdminSystemSettings />
        };
      case 'admin-license':
        return {
          breadcrumb: 'License Manager',
          title: 'Active Tenant License Keys',
          subtitle: 'Generate client license keys and track expiration targets.',
          primaryCta: 'Generate License Key',
          secondaryCta: 'License ledger',
          component: <SuperAdminLicenseManager />
        };

      // Data Warehouse cases
      case 'data-bigquery':
        return {
          breadcrumb: 'BigQuery',
          title: 'Google BigQuery Dataset Explorer',
          subtitle: 'Run direct SQL queries, inspect table schemas, and manage cloud connections.',
          primaryCta: 'Run SQL Query',
          secondaryCta: 'Sync BigQuery Schema',
          component: <DataWarehouseBigQuery />
        };
      case 'data-snowflake':
        return {
          breadcrumb: 'Snowflake',
          title: 'Snowflake Virtual Warehouses',
          subtitle: 'Monitor warehouse status, toggle cluster sizes, and check current credit usage.',
          primaryCta: 'Resume Warehouse',
          secondaryCta: 'Snowflake Settings',
          component: <DataWarehouseSnowflake />
        };
      case 'data-clickhouse':
        return {
          breadcrumb: 'ClickHouse',
          title: 'ClickHouse Real-Time Database Analytics',
          subtitle: 'Monitor high-frequency insert metrics, cluster replicas, and query speeds.',
          primaryCta: 'Configure Replica Cluster',
          secondaryCta: 'Optimize Tables',
          component: <DataWarehouseClickHouse />
        };
      case 'data-lake':
        return {
          breadcrumb: 'Data Lake',
          title: 'Cloud Object Storage Data Lake',
          subtitle: 'Browse files, manage partitioning structures, and monitor bucket capacities.',
          primaryCta: 'Upload Object Pack',
          secondaryCta: 'Run Bucket Scan',
          component: <DataWarehouseDataLake />
        };
      case 'data-etl':
        return {
          breadcrumb: 'ETL Pipelines',
          title: 'Extract-Transform-Load Jobs Engine',
          subtitle: 'Schedule database ingestion, sync schemas, and track pipeline success logs.',
          primaryCta: 'Create ETL Pipeline',
          secondaryCta: 'Pipeline Sync Logs',
          component: <DataWarehouseEtl />
        };
      case 'data-elt':
        return {
          breadcrumb: 'ELT Pipelines',
          title: 'ELT Warehouse Transformations',
          subtitle: 'Manage DBT compilation models, scheduling, and custom analytics views.',
          primaryCta: 'Trigger In-Warehouse Run',
          secondaryCta: 'Compile DBT Models',
          component: <DataWarehouseElt />
        };
      case 'data-analytics':
        return {
          breadcrumb: 'AI Analytics Engine',
          title: 'AI Predictive Analytics Engine',
          subtitle: 'Generate machine learning sales projections, forecast trends, and detect anomalies.',
          primaryCta: 'Generate Forecast Insights',
          secondaryCta: 'Re-train Predictor Model',
          component: <DataWarehouseAnalytics />
        };

      // Agency Management Platform cases
      case 'agency-dashboard':
        return {
          breadcrumb: 'Agency Dashboard',
          title: 'Agency Operations Overview Control Room',
          subtitle: 'Monitor overall retained MRR, billable capacity, and creative approvals.',
          primaryCta: 'Add Agency Account',
          secondaryCta: 'Configure white label rules',
          component: <AgencyDashboard />
        };
      case 'agency-workspaces':
        return {
          breadcrumb: 'Client Workspaces',
          title: 'Client Account Workspaces Directory',
          subtitle: 'Provision, configure, and delete specific client tenant sandboxes.',
          primaryCta: 'Provision Client Workspace',
          secondaryCta: 'Client Catalog templates',
          component: <AgencyClientWorkspaces />
        };
      case 'agency-portals':
        return {
          breadcrumb: 'White Label Portals',
          title: 'White Label Client Portal Settings',
          subtitle: 'Configure DNS mappings, corporate logos, and client-portal permissions.',
          primaryCta: 'Map Portal Custom Domain',
          secondaryCta: 'White Label Preview',
          component: <AgencyWhiteLabelPortals />
        };
      case 'agency-team':
        return {
          breadcrumb: 'Team Management',
          title: 'Agency Team Members & Roles',
          subtitle: 'Assign billable rates, access permissions, and roles to team engineers.',
          primaryCta: 'Invite Team Engineer',
          secondaryCta: 'Team utilization logs',
          component: <AgencyTeamManagement />
        };
      case 'agency-time':
        return {
          breadcrumb: 'Time Tracking',
          title: 'Timesheets & Active Task Timer Log',
          subtitle: 'Track billable hours logged against specific client project budgets.',
          primaryCta: 'Log Manual Time Entry',
          secondaryCta: 'Export timesheet CSV',
          component: <AgencyTimeTracking />
        };
      case 'agency-billing':
        return {
          breadcrumb: 'Client Billing',
          title: 'Client Invoices & Subscription Retainers',
          subtitle: 'Coordinate MRR retainers, custom fees, and stripe invoice dispatches.',
          primaryCta: 'Create Client Invoice',
          secondaryCta: 'Retainer settings',
          component: <AgencyClientBilling />
        };
      case 'agency-approvals':
        return {
          breadcrumb: 'Client Approvals',
          title: 'Client Creative Approval Pipelines',
          subtitle: 'Review, approve, or request revisions for design, copy, and ad layouts.',
          primaryCta: 'Request Client Review',
          secondaryCta: 'Approvals History log',
          component: <AgencyClientApprovals />
        };
      case 'agency-campaigns':
        return {
          breadcrumb: 'Campaign Workspace',
          title: 'Agency Cross-Channel Ad Campaigns',
          subtitle: 'Coordinate multi-network budgets, target parameters, and performance charts.',
          primaryCta: 'Deploy Multi-Channel Campaign',
          secondaryCta: 'Campaign Budget limits',
          component: <AgencyCampaignWorkspace />
        };
      case 'agency-resources':
        return {
          breadcrumb: 'Resource Planning',
          title: 'Resource Allocation & Capacity Planning',
          subtitle: 'Assign tasks, monitor workload balances, and plan project sprints.',
          primaryCta: 'Assign Resource Booking',
          secondaryCta: 'Capacity logs',
          component: <AgencyResourcePlanning />
        };

      // AI Recommendation Engine cases
      case 'reco-product':
        return {
          breadcrumb: 'Product Recommendations',
          title: 'AI Product Recommendations & Cross-Sells',
          subtitle: 'Predict user product affinities, shopping basket associations, and up-sell opportunities.',
          primaryCta: 'Generate Product Associations',
          secondaryCta: 'Export Association Rules',
          component: <RecoProduct />
        };
      case 'reco-campaign':
        return {
          breadcrumb: 'Campaign Recommendations',
          title: 'AI Campaign Performance Optimizations',
          subtitle: 'Auto-detect underperforming channels and apply recommended bids or targets.',
          primaryCta: 'Run Optimization Audit',
          secondaryCta: 'Export Optimizer Rules',
          component: <RecoCampaign />
        };
      case 'reco-budget':
        return {
          breadcrumb: 'Budget Recommendations',
          title: 'AI Cross-Channel Budget Allocations',
          subtitle: 'Reallocate advertising budget daily to maximize conversion counts and lower CPCs.',
          primaryCta: 'Apply Redistribution',
          secondaryCta: 'Export Budget Strategy',
          component: <RecoBudget />
        };
      case 'reco-audience':
        return {
          breadcrumb: 'Audience Recommendations',
          title: 'AI Audience Expander & Lookalikes',
          subtitle: 'Analyze customer overlaps to recommend lookalike groups and interest targets.',
          primaryCta: 'Sync Lookalike Audience',
          secondaryCta: 'Export Audience Specs',
          component: <RecoAudience />
        };
      case 'reco-keyword':
        return {
          breadcrumb: 'Keyword Recommendations',
          title: 'AI Keyword Suggester & Volume Forecasts',
          subtitle: 'Discover high-intent SEO search queries, bid ranges, and competition metrics.',
          primaryCta: 'Add Target Keywords',
          secondaryCta: 'Download Keyword CSV',
          component: <RecoKeyword />
        };
      case 'reco-creative':
        return {
          breadcrumb: 'Creative Recommendations',
          title: 'AI Creative Copy & Layout Suggester',
          subtitle: 'Analyze conversion metrics to suggest copy revisions and design layout enhancements.',
          primaryCta: 'A/B Test Creative Recommendation',
          secondaryCta: 'Dismiss Recommendation',
          component: <RecoCreative />
        };
      case 'reco-pricing':
        return {
          breadcrumb: 'Pricing Recommendations',
          title: 'AI Price Elasticity & Competitor Rules',
          subtitle: 'Calculate optimal conversion prices based on dynamic elasticity curves and competitor rates.',
          primaryCta: 'Apply Dynamic Pricing Rule',
          secondaryCta: 'Export Price Curve',
          component: <RecoPricing />
        };

      // Enterprise SaaS Features cases
      case 'saas-multitenant':
        return {
          breadcrumb: 'Multi-Tenant Architecture',
          title: 'Enterprise Multi-Tenant Tenant Administration',
          subtitle: 'Reconcile database isolation modes, active tenant nodes, and network partitions.',
          primaryCta: 'Provision Tenant Workspace',
          secondaryCta: 'Tenant Partition Map',
          component: <SaasMultiTenant />
        };
      case 'saas-whitelabel':
        return {
          breadcrumb: 'White Label Platform',
          title: 'Custom Brand & Canonical Domain Mapping',
          subtitle: 'Manage white-label logo directories, custom CNAME mapping rules, and theme parameters.',
          primaryCta: 'Map Brand Domain',
          secondaryCta: 'Preview White Label Layout',
          component: <SaasWhiteLabel />
        };
      case 'saas-organization':
        return {
          breadcrumb: 'Organization Management',
          title: 'Corporate Organization Units & Hierarchy',
          subtitle: 'Define overall client organization parameters, access levels, and seat licenses.',
          primaryCta: 'Create Organization Unit',
          secondaryCta: 'Organization Hierarchy Map',
          component: <SaasOrganization />
        };
      case 'saas-businessunits':
        return {
          breadcrumb: 'Business Units',
          title: 'Subsidiaries & Multi-Divisional Workspaces',
          subtitle: 'Map enterprise cost centers, isolate departments, and manage cross-unit budgets.',
          primaryCta: 'Register Business Unit',
          secondaryCta: 'Business Unit ledger',
          component: <SaasBusinessUnits />
        };
      case 'saas-datacenters':
        return {
          breadcrumb: 'Regional Data Centers',
          title: 'Regional Residency & Database Datacenters',
          subtitle: 'Configure local server bindings, active routing zone maps, and regional lock states.',
          primaryCta: 'Register Datacenter Node',
          secondaryCta: 'Data Center Health stats',
          component: <SaasDataCenters />
        };
      case 'saas-ha':
        return {
          breadcrumb: 'High Availability',
          title: 'Load Balancing & Active Replica Clusters',
          subtitle: 'Monitor system network loads, health checkers, and dynamic proxy rules.',
          primaryCta: 'Scale Replica Cluster',
          secondaryCta: 'Proxy Configuration',
          component: <SaasHighAvailability />
        };
      case 'saas-dr':
        return {
          breadcrumb: 'Disaster Recovery',
          title: 'Active Failover & Disaster Recovery Systems',
          subtitle: 'Simulate server system crashes, check recovery time objectives (RTO), and verify sync rules.',
          primaryCta: 'Trigger Failover Simulation',
          secondaryCta: 'Recovery Logs',
          component: <SaasDisasterRecovery />
        };
      case 'saas-backup':
        return {
          breadcrumb: 'Backup & Restore',
          title: 'Immutable Backup Logs & Database Restore point',
          subtitle: 'Schedule daily incremental snapshots, manage retention years, and restore database status.',
          primaryCta: 'Trigger Backup Snapshot',
          secondaryCta: 'Restore Database',
          component: <SaasBackupRestore />
        };
      case 'saas-flags':
        return {
          breadcrumb: 'Feature Flags',
          title: 'Dynamic Feature Flags & Rollouts',
          subtitle: 'Deploy updates conditionally, manage canary groups, and configure target criteria.',
          primaryCta: 'Create Feature Flag',
          secondaryCta: 'Flags Audit Log',
          component: <SaasFeatureFlags />
        };
      case 'saas-customization':
        return {
          breadcrumb: 'Tenant Customization',
          title: 'Tenant-Level CSS & Logic Customizations',
          subtitle: 'Manage client custom JavaScript functions, custom database attributes, and layout variables.',
          primaryCta: 'Save Customization parameters',
          secondaryCta: 'Reset to System Default',
          component: <SaasTenantCustomization />
        };
      case 'saas-billing':
        return {
          breadcrumb: 'Usage-Based Billing',
          title: 'Usage Metering & API Consumption',
          subtitle: 'Aggregate client data usage metrics, metered credits, and overage alerts.',
          primaryCta: 'Generate Billing Ledger',
          secondaryCta: 'Export Metering CSV',
          component: <SaasUsageBilling />
        };
      case 'saas-subscription':
        return {
          breadcrumb: 'Subscription Management',
          title: 'Enterprise Subscription Retainers',
          subtitle: 'Review contract license terms, seat quotas, and payment renewal deadlines.',
          primaryCta: 'Renew Contract License',
          secondaryCta: 'Subscription stats',
          component: <SaasSubscription />
        };
      case 'saas-audit':
        return {
          breadcrumb: 'Audit Trails',
          title: 'Global Compliance Audit Logging',
          subtitle: 'Monitor corporate compliance audits, administrator changes, and workspace loggers.',
          primaryCta: 'Export Audit Logs CSV',
          secondaryCta: 'Clear System Log DB',
          component: <SaasAuditTrails />
        };
      case 'saas-ratelimit':
        return {
          breadcrumb: 'API Rate Limiting',
          title: 'API Gateway Rate Limits & Throttling',
          subtitle: 'Configure daily API limits, concurrent request limits, and custom rate limits.',
          primaryCta: 'Add Throttling Rule',
          secondaryCta: 'API Gateway Stats',
          component: <SaasRateLimiting />
        };
      case 'saas-scim':
        return {
          breadcrumb: 'SCIM Provisioning',
          title: 'SCIM Active Directory Provisioning',
          subtitle: 'Integrate corporate identity platforms (Okta, Azure AD) for auto-provisioning.',
          primaryCta: 'Sync SCIM Accounts',
          secondaryCta: 'SCIM Settings',
          component: <SaasScimProvisioning />
        };
      case 'saas-sso':
        return {
          breadcrumb: 'Enterprise SSO',
          title: 'Enterprise SSO (SAML/OIDC) Federation',
          subtitle: 'Configure corporate Single Sign-On federation rules, certificates, and metadata.',
          primaryCta: 'Upload SAML Metadata XML',
          secondaryCta: 'Rotate SSO Certificates',
          component: <SaasEnterpriseSso />
        };

      // E-commerce Marketing cases
      case 'ecom-feed':
        return {
          breadcrumb: 'Product Feed Management',
          title: 'Product Catalog XML/JSON Feed Sync',
          subtitle: 'Configure automated intervals, validate currency schemas, and resolve ingestion errors.',
          primaryCta: 'Sync Product Feed Now',
          secondaryCta: 'Feed Settings',
          component: <EcomProductFeed />
        };
      case 'ecom-merchant':
        return {
          breadcrumb: 'Google Merchant Center Integration',
          title: 'Google Merchant Center API Feeds',
          subtitle: 'Sync shopping ads statuses, fix pricing mismatches, and trace Google Merchant center flags.',
          primaryCta: 'Re-authenticate Google Merchant',
          secondaryCta: 'Merchant center Logs',
          component: <EcomGoogleMerchant />
        };
      case 'ecom-meta':
        return {
          breadcrumb: 'Meta Catalog',
          title: 'Meta Commerce Catalog Synchronization',
          subtitle: 'Trace pixel micro-data mappings, review sync schedules, and configure fallback images.',
          primaryCta: 'Trigger Meta Ingest',
          secondaryCta: 'Meta Pixel Settings',
          component: <EcomMetaCatalog />
        };
      case 'ecom-tiktok':
        return {
          breadcrumb: 'TikTok Catalog',
          title: 'TikTok Commerce catalog integrations',
          subtitle: 'Map SKU tags, monitor TikTok pixel checkouts, and verify regional pricing.',
          primaryCta: 'Trigger TikTok Sync',
          secondaryCta: 'TikTok Pixel Settings',
          component: <EcomTikTokCatalog />
        };
      case 'ecom-dynads':
        return {
          breadcrumb: 'Dynamic Product Ads',
          title: 'Dynamic Retargeting Product Ads',
          subtitle: 'Configure automated retargeting templates, target parameters, and budget structures.',
          primaryCta: 'Deploy Dynamic Campaign',
          secondaryCta: 'Dynamic Ads Stats',
          component: <EcomDynamicAds />
        };
      case 'ecom-recovery':
        return {
          breadcrumb: 'Cart Recovery',
          title: 'Abandoned Cart Recovery Automations',
          subtitle: 'Configure recovery email intervals, WhatsApp push rules, and promo coupon limits.',
          primaryCta: 'Create Recovery Sequence',
          secondaryCta: 'Recovery Stats',
          component: <EcomCartRecovery />
        };
      case 'ecom-upsell':
        return {
          breadcrumb: 'AI Upsell',
          title: 'AI Smart Upsell Recommendations',
          subtitle: 'Deploy checkout-interstitial upsells, calculate elasticity values, and track conversions.',
          primaryCta: 'Configure Upsell Rules',
          secondaryCta: 'Upsell Analytics',
          component: <EcomAiUpsell />
        };
      case 'ecom-cross':
        return {
          breadcrumb: 'AI Cross Sell',
          title: 'AI Cart Cross-Sell Placements',
          subtitle: 'Suggest related item cross-sells on checkout, customize layouts, and map exclusions.',
          primaryCta: 'Configure Cross-Sell Rules',
          secondaryCta: 'Cross-Sell Analytics',
          component: <EcomAiCrossSell />
        };
      case 'ecom-clv':
        return {
          breadcrumb: 'Customer Lifetime Value Prediction',
          title: 'AI Customer Lifetime Value (CLV) Estimations',
          subtitle: 'Predict user churn likelihoods, forecast purchases, and identify VIP shoppers.',
          primaryCta: 'Run CLV Analysis',
          secondaryCta: 'Export CLV ledger',
          component: <EcomClvPrediction />
        };
      case 'ecom-recs':
        return {
          breadcrumb: 'Product Recommendation Engine',
          title: 'Dynamic Product Recommendation Engine',
          subtitle: 'Configure user personalization parameters, home page slider grids, and target modules.',
          primaryCta: 'Deploy Personalization Rules',
          secondaryCta: 'Recommendation Settings',
          component: <EcomProductRecommendation />
        };

      // CRM & Sales Platform cases
      case 'crm-leads':
        return {
          breadcrumb: 'Lead Management',
          title: 'CRM Lead Management Center',
          subtitle: 'Track inbound marketing leads, score quality indicators, and assign representatives.',
          primaryCta: 'Add Inbound Lead',
          secondaryCta: 'Export Leads CSV',
          component: <CrmLeadManagement />
        };
      case 'crm-deals':
        return {
          breadcrumb: 'Pipeline',
          title: 'Sales Opportunity Pipeline Kanban',
          subtitle: 'Visualize stages of negotiation, drag deals across statuses, and monitor pipeline health.',
          primaryCta: 'Add Deal Opportunity',
          secondaryCta: 'Pipeline Stats',
          component: <CrmPipelineBoard />
        };
      case 'crm-opp':
        return {
          breadcrumb: 'Opportunity Tracking',
          title: 'High-Value Enterprise Opportunities',
          subtitle: 'Track expected close dates, contract estimates, and deal stages for active buyers.',
          primaryCta: 'Register Opportunity',
          secondaryCta: 'Opportunity metrics',
          component: <CrmOpportunityTracking />
        };
      case 'crm-automation':
        return {
          breadcrumb: 'Sales Automation',
          title: 'Trigger-based Sales Workflow Automation',
          subtitle: 'Configure automated actions (email, tasks creation) triggered by lead status transitions.',
          primaryCta: 'Create Automation Rule',
          secondaryCta: 'Execution Logs',
          component: <CrmSalesAutomation />
        };
      case 'crm-proposals':
        return {
          breadcrumb: 'Proposal Generator',
          title: 'Sales Proposals & SLA Contract Generator',
          subtitle: 'Design, review, and generate dynamic business proposals with pricing details.',
          primaryCta: 'Generate Business Proposal',
          secondaryCta: 'Proposal Templates',
          component: <CrmProposalGenerator />
        };
      case 'crm-contracts':
        return {
          breadcrumb: 'Contract Management',
          title: 'Legal SLA Contracts Registry',
          subtitle: 'Track signature statuses, review legal terms, and schedule renewal dates.',
          primaryCta: 'Request Contract Review',
          secondaryCta: 'Contract Templates',
          component: <CrmContractManagement />
        };
      case 'crm-quotes':
        return {
          breadcrumb: 'Quote Builder',
          title: 'Price Quote Builder Sheet',
          subtitle: 'Generate pricing sheets, apply custom discounts, and calculate customer tax totals.',
          primaryCta: 'Generate Pricing Quote',
          secondaryCta: 'Quote Settings',
          component: <CrmQuoteBuilder />
        };
      case 'crm-sales-assistant':
        return {
          breadcrumb: 'AI Sales Assistant',
          title: 'AI Smart Co-Pilot Sales Assistant',
          subtitle: 'Train response recommendations, configure email draft prompts, and sync CRM data.',
          primaryCta: 'Train Assistant Model',
          secondaryCta: 'Assistant Prompts',
          component: <CrmAiSalesAssistant />
        };
      case 'crm-forecasting':
        return {
          breadcrumb: 'Forecasting',
          title: 'Revenue Projections & Forecasting Calculations',
          subtitle: 'Forecast quarterly revenue lifts based on historic deals conversions.',
          primaryCta: 'Run Forecast Model',
          secondaryCta: 'Export Forecasts',
          component: <CrmForecastingDashboard />
        };
      case 'crm-commission':
        return {
          breadcrumb: 'Commission Tracking',
          title: 'Sales Rep Commissions Ledger',
          subtitle: 'Monitor individual seller target margins, calculate payouts, and review tier rates.',
          primaryCta: 'Configure Commission Rates',
          secondaryCta: 'Payout History',
          component: <CrmCommissionTracking />
        };

      // AI Search Engine cases
      case 'search-semantic':
        return {
          breadcrumb: 'Semantic Search',
          title: 'Semantic Query NLP Resolver',
          subtitle: 'Resolve context matching, intent categorization, and query expansions.',
          primaryCta: 'Run Semantic Evaluation',
          secondaryCta: 'Semantic settings',
          component: <SearchSemantic />
        };
      case 'search-vector':
        return {
          breadcrumb: 'Vector Search',
          title: 'Vector Embedding Indexing Console',
          subtitle: 'Sync pinecone vector databases, rebuild indices, and test cosine similarity scoring.',
          primaryCta: 'Rebuild Embedding Index',
          secondaryCta: 'Database Settings',
          component: <SearchVector />
        };
      case 'search-kb':
        return {
          breadcrumb: 'AI Knowledge Base',
          title: 'AI Knowledge Base Syncer',
          subtitle: 'Ingest company wikis, sync files directories, and build rag contextual data.',
          primaryCta: 'Sync Data Directory',
          secondaryCta: 'Ingestion Settings',
          component: <SearchKb />
        };
      case 'search-enterprise':
        return {
          breadcrumb: 'Enterprise Search',
          title: 'Global Enterprise Directory Search',
          subtitle: 'Coordinate federated search connectors, database indexes, and permissions models.',
          primaryCta: 'Add Search Connector',
          secondaryCta: 'Connector Settings',
          component: <SearchEnterprise />
        };
      case 'search-docintel':
        return {
          breadcrumb: 'Document Intelligence',
          title: 'Document OCR Intelligence & Metadata Extraction',
          subtitle: 'Ingest PDFs/images, extract structured JSON metadata keys, and calculate classification confidence.',
          primaryCta: 'Upload Test Document',
          secondaryCta: 'OCR settings',
          component: <SearchDocIntel />
        };

      // AI Agents cases
      case 'agent-marketing':
        return {
          breadcrumb: 'Marketing Agent',
          title: 'Autonomous Marketing Agent',
          subtitle: 'Autonomously deploy ad-creatives, bid allocations and track ROAS optimization parameters.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentMarketing />
        };
      case 'agent-seo':
        return {
          breadcrumb: 'SEO Agent',
          title: 'Specialized SEO Agent',
          subtitle: 'Autonomously run competitor analysis, crawl schemas, and suggest keyword links optimizations.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentSeo />
        };
      case 'agent-ppc':
        return {
          breadcrumb: 'PPC Agent',
          title: 'Specialized PPC Ads Agent',
          subtitle: 'Track keywords bidding strategies, adjust daily budgets, and monitor CPC metrics.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentPpc />
        };
      case 'agent-dsp':
        return {
          breadcrumb: 'DSP Agent',
          title: 'Specialized DSP Agent',
          subtitle: 'Autonomously bid on advertiser inventory, map coordinates, and select publishers.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentDsp />
        };
      case 'agent-ssp':
        return {
          breadcrumb: 'SSP Agent',
          title: 'Specialized SSP Agent',
          subtitle: 'Coordinate dynamic publisher yields optimization, header bidding logic, and floor rates.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentSsp />
        };
      case 'agent-affiliate':
        return {
          breadcrumb: 'Affiliate Agent',
          title: 'Specialized Affiliate Marketing Agent',
          subtitle: 'Ingest affiliate link clicks trackers, trace referrals commissions, and detect leaks.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentAffiliate />
        };
      case 'agent-publisher':
        return {
          breadcrumb: 'Publisher Agent',
          title: 'Specialized Publisher Agent',
          subtitle: 'Sync direct media placements, trace publisher ads impressions, and optimize layouts.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentPublisher />
        };
      case 'agent-sales':
        return {
          breadcrumb: 'Sales Agent',
          title: 'Specialized AI Sales Assistant Agent',
          subtitle: 'Auto-draft emails sequences, track leads qualification statuses, and schedule demos.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentSales />
        };
      case 'agent-finance':
        return {
          breadcrumb: 'Finance Agent',
          title: 'Specialized AI Finance Ledger Agent',
          subtitle: 'Autonomously reconciliate payout transactions, trace invoices, and track billing discrepancies.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentFinance />
        };
      case 'agent-compliance':
        return {
          breadcrumb: 'Compliance Agent',
          title: 'Specialized Regulatory Compliance Agent',
          subtitle: 'Audit server logs data residency parameters and check consent log trails.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentCompliance />
        };
      case 'agent-fraud':
        return {
          breadcrumb: 'Fraud Detection Agent',
          title: 'Autonomous Fraud Detection Security Agent',
          subtitle: 'Monitor concurrent API rate limits, trace bad IP addresses, and flag bot checkouts.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentFraud />
        };
      case 'agent-support':
        return {
          breadcrumb: 'Customer Support Agent',
          title: 'AI Customer Support Agent',
          subtitle: 'Resolve customer support FAQs, draft reply templates, and escalate tickets.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentSupport />
        };
      case 'agent-biz':
        return {
          breadcrumb: 'Business Analyst Agent',
          title: 'AI Business Analyst Agent',
          subtitle: 'Calculate daily conversion charts, analyze cohorts, and forecast sales.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentBiz />
        };
      case 'agent-pm':
        return {
          breadcrumb: 'Product Manager Agent',
          title: 'AI Product Manager Agent',
          subtitle: 'Analyze customer feedbacks, write mock specs, and construct roadmap timelines.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentPm />
        };
      case 'agent-opt':
        return {
          breadcrumb: 'Campaign Optimizer Agent',
          title: 'Campaign Optimizer Agent',
          subtitle: 'Calculate daily CPC margins, detect low CTR creatives, and adjust bids.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentOpt />
        };
      case 'agent-creative':
        return {
          breadcrumb: 'Creative Designer Agent',
          title: 'Creative Designer Agent',
          subtitle: 'Generate styled ad-creatives, review layouts variations, and suggest asset kits.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentCreative />
        };
      case 'agent-content':
        return {
          breadcrumb: 'Content Writer Agent',
          title: 'AI Copywriter Content Writer Agent',
          subtitle: 'Draft email outreach newsletters copy, generate seo blogs, and customize ads slogans.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentContent />
        };
      case 'agent-datasci':
        return {
          breadcrumb: 'Data Scientist Agent',
          title: 'AI Data Scientist Agent',
          subtitle: 'Train neural models, run regressions analyses, and calculate metrics variances.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentDataSci />
        };
      case 'agent-devops':
        return {
          breadcrumb: 'DevOps Agent',
          title: 'Autonomous DevOps Cloud Ingestion Agent',
          subtitle: 'Monitor server replication cluster lag, deploy container updates, and trigger backups.',
          primaryCta: 'Initialize Agent Run',
          secondaryCta: 'Agent Guidelines',
          component: <AgentDevops />
        };

      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#1a1a1a',
          border: '1px solid #333333',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '6px',
          zIndex: 9999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          fontSize: '13px',
          borderLeft: '4px solid #ffffff'
        }}>
          {toastMessage}
        </div>
      )}
      {/* Sidebar */}
      <Sidebar
        activeId={activeId}
        setActiveId={setActiveId}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Top Navbar Header */}
        <Header 
          setMobileOpen={setMobileSidebarOpen}
          activeId={activeId}
        />

        {/* Content Body viewports */}
        <main className="content-body">
          {renderContentBody()}
        </main>
      </div>
    </div>
  );
}

export default App;
