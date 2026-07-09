import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, Bot, Zap, BarChart3, Database, Server, Building2, MessageSquare, 
  Store, Code2, LifeBuoy, Sparkles, ShieldCheck, Target, Briefcase, Cpu, 
  ArrowRight, Search
} from 'lucide-react';

interface Feature {
  name: string;
  desc: string;
}

interface ModuleData {
  id: string;
  num: number;
  title: string;
  summary: string;
  icon: React.ComponentType<any>;
  color: string;
  jumpId: string;
  features: Feature[];
}

const modulesData: ModuleData[] = [
  {
    id: 'ecom',
    num: 1,
    title: 'E-commerce Marketing',
    summary: 'This section is for displaying online store products on various platforms (Google, Facebook, TikTok) and retargeting customers.',
    icon: ShoppingBag,
    color: '#6366f1',
    jumpId: 'ecom-feed',
    features: [
      { name: 'Product Feed Management', desc: 'Prepares the product list (name, price, stock) in a file format (XML/JSON) to send to third-party ad networks.' },
      { name: 'Google Merchant Center', desc: 'Automatically syncs and uploads store products to Google Shopping so they appear directly in search results.' },
      { name: 'Meta Catalog', desc: 'Syncs products, pricing, and stock levels with Facebook and Instagram Shop catalogs.' },
      { name: 'TikTok Catalog', desc: 'Connects store products to TikTok Business accounts for seamless display on TikTok Shop.' },
      { name: 'Dynamic Product Ads', desc: 'Automatically creates personalized retargeting ads for items that visitors have previously viewed.' },
      { name: 'Cart Recovery', desc: 'Sends automated emails or SMS alerts to customers who abandon their carts before checkout.' },
      { name: 'AI Upsell', desc: 'Recommends premium or higher-priced upgrades to customers during the checkout process using AI.' },
      { name: 'AI Cross Sell', desc: 'Suggests complementary accessories or matching items (e.g., phone cases with a mobile) post-purchase.' },
      { name: 'CLV Prediction', desc: 'Predicts the customer lifetime value and long-term revenue potential of each customer based on historical orders.' },
      { name: 'Product Recommendations', desc: 'Renders personalized product grid suggestions based on user browsing history and preferences.' }
    ]
  },
  {
    id: 'agents',
    num: 2,
    title: 'AI Agents',
    summary: 'Fully autonomous AI workers that automatically perform specialized tasks across marketing, sales, SEO, support, and development.',
    icon: Bot,
    color: '#3b82f6',
    jumpId: 'agent-marketing',
    features: [
      { name: 'Marketing Agent', desc: 'Analyzes performance data and plans optimal copywriting or content distribution strategies.' },
      { name: 'SEO Agent', desc: 'Crawls the website, monitors search rankings, and automatically refines page metadata.' },
      { name: 'PPC Agent', desc: 'Monitors ad campaign budgets and provides automated bid adjustment suggestions.' },
      { name: 'DSP Agent', desc: 'Bids in real-time on premium display banner inventory at the most optimal price points.' },
      { name: 'SSP Agent', desc: 'Manages publisher ad slots to maximize occupancy and programmatic ad revenue.' },
      { name: 'Affiliate Agent', desc: 'Tracks referrals and sales from marketing affiliates and calculates commission payouts.' },
      { name: 'Publisher Agent', desc: 'Maximizes monetization by scheduling optimal content placements and ad inventory layouts.' },
      { name: 'Sales Agent', desc: 'Ingests inbound leads from CRM pipelines and automatically initiates customized initial outreach messages.' },
      { name: 'Finance Agent', desc: 'Automatically audits invoices, expense reports, and bills to detect discrepancies and anomalies.' },
      { name: 'Compliance Agent', desc: 'Checks user permissions and tracking consent status to ensure GDPR and CCPA regulatory compliance.' },
      { name: 'Fraud Detection Agent', desc: 'Identifies click fraud or automated bot behavior and blocks suspicious IP addresses.' },
      { name: 'Customer Support Agent', desc: 'Resolves user tickets and answers standard FAQs by reference-indexing company knowledge documents.' },
      { name: 'Business Analyst Agent', desc: 'Generates automated KPI reports, metric tables, and operational status summaries from databases.' },
      { name: 'Product Manager Agent', desc: 'Drafts scoping documents, requirement lists, and product roadmaps from text prompts.' },
      { name: 'Campaign Optimizer Agent', desc: 'Adjusts campaign bidding structures based on temporal and geographical performance patterns.' },
      { name: 'Creative Designer Agent', desc: 'Translates asset guidelines into high-quality image generation prompts for ad design.' },
      { name: 'Content Writer Agent', desc: 'Drafts company newsletters and SEO-friendly blogs matching current market trends.' },
      { name: 'Data Scientist Agent', desc: 'Builds predictive algorithms and runs python training models on tabular data.' },
      { name: 'DevOps Agent', desc: 'Resolves system incidents and restarts failed GPU nodes or container instances automatically.' }
    ]
  },
  {
    id: 'automation',
    num: 3,
    title: 'AI Automation Builder',
    summary: 'Drag-and-drop tool to construct visual trigger-action workflows without writing any code.',
    icon: Zap,
    color: '#ec4899',
    jumpId: 'auto-builder',
    features: [
      { name: 'Visual Workflow Builder', desc: 'Design automatic workflows by connecting triggers and actions on a visual canvas.' },
      { name: 'Trigger System', desc: 'Defines the execution hook for when a workflow starts, such as a checkout event.' },
      { name: 'Event Engine', desc: 'Evaluates incoming event properties against configured rules before continuing execution.' },
      { name: 'API Automation', desc: 'Fires webhook requests to external applications automatically based on workflow events.' },
      { name: 'CRM Automation', desc: 'Transitions CRM deal stages or lead owner assignments upon specific customer triggers.' },
      { name: 'Marketing Automation', desc: 'Launches personalized newsletters or retargeting cohorts when dynamic criteria are met.' },
      { name: 'Webhook Automation', desc: 'Receives structured incoming payloads from third-party sites using custom endpoints.' },
      { name: 'AI Decision Trees', desc: 'Directs workflow execution paths dynamically based on contextual text evaluations.' },
      { name: 'Scheduled Workflows', desc: 'Runs recurring administrative tasks, automated reporting, or backup scripts at preset times.' }
    ]
  },
  {
    id: 'bi',
    num: 4,
    title: 'AI Business Intelligence',
    summary: 'Comprehensive system to monitor company analytics, sales revenue, traffic trends, and key performance indicators.',
    icon: BarChart3,
    color: '#10b981',
    jumpId: 'bi-exec-dashboards',
    features: [
      { name: 'Executive Dashboards', desc: 'Displays all critical metrics (revenue, conversion rates, traffic) on a unified console.' },
      { name: 'KPI Monitoring', desc: 'Sends alerts if key business targets fall below defined operational thresholds.' },
      { name: 'Revenue Forecasting', desc: 'Predicts future months\' sales margins using historic seasonal revenue trends.' },
      { name: 'Marketing Mix Modeling', desc: 'Evaluates performance ROI across search, social, and programmatic ad campaigns.' },
      { name: 'Attribution Modeling', desc: 'Maps out conversion weights for multiple touchpoints across the customer conversion path.' },
      { name: 'Predictive Analytics', desc: 'Forecasts purchase likelihood scores for target demographics.' },
      { name: 'AI Insights', desc: 'Instantly surfaces structural anomalies like signup drops or sudden check-out bottlenecks.' },
      { name: 'Natural Language Analytics', desc: 'Translates natural language questions into database SQL queries to return instant charts.' },
      { name: 'AI Recommendations', desc: 'Recommends budget allocation optimizations and site layout shifts to maximize conversions.' }
    ]
  },
  {
    id: 'cdp',
    num: 5,
    title: 'AI Customer Data Platform (CDP)',
    summary: 'Collects and unifies customer actions across all devices to build a single consolidated profile database.',
    icon: Database,
    color: '#a855f7',
    jumpId: 'cdp-unified-profiles',
    features: [
      { name: 'Unified Customer Profiles', desc: 'Creates a single record sheet detailing customer information, traits, and behavioral logs.' },
      { name: 'Identity Resolution', desc: 'Resolves anonymous browser cookies and emails to merge duplicates into a single user profile.' },
      { name: 'Cross-Device Identity Graph', desc: 'Connects a single user across desktop, tablet, and mobile browsers in a visual node chart.' },
      { name: 'Customer 360°', desc: 'Displays demographic profiles, communication timelines, and product histories in a consolidated view.' },
      { name: 'Behavioral Tracking', desc: 'Tracks real-time user events, clicks, and page view triggers using analytics pixels.' },
      { name: 'Predictive Segmentation', desc: 'Groups users based on advanced criteria like high churn risk or high-intent buyer scores.' },
      { name: 'Consent & Privacy', desc: 'Manages GDPR/CCPA data opt-outs and records user consent preferences.' },
      { name: 'Audience Activation', desc: 'Syncs customer segments directly to ad delivery networks for targeted campaigns.' },
      { name: 'Data Clean Rooms', desc: 'Compares encrypted datasets with marketing partners without exposing sensitive private details.' }
    ]
  },
  {
    id: 'dmp',
    num: 6,
    title: 'Data Management Platform (DMP)',
    summary: 'Build, expand, and activate targeted audience pools using first-party tracking and third-party data marketplaces.',
    icon: Server,
    color: '#f59e0b',
    jumpId: 'dmp-3p-audience',
    features: [
      { name: 'Third-party Marketplace', desc: 'Ingests demographically scored third-party lists to enrich audience targets.' },
      { name: 'First-party Management', desc: 'Tracks and classifies first-party audience segments generated directly on client domains.' },
      { name: 'Interest Categories', desc: 'Classifies users into targeted buckets based on affinity and browsing actions (e.g., Tech Buyers).' },
      { name: 'Lookalike Builder', desc: 'Analyzes characteristics of top customers to generate expanded profiles with matching behavior.' },
      { name: 'AI Audience Expansion', desc: 'Generates broader target sets using AI to match similar behavior patterns.' },
      { name: 'Audience Scoring', desc: 'Scores list groups according to historical conversion probability and buying history.' },
      { name: 'Demographic Targeting', desc: 'Focuses campaigns using custom parameters such as age brackets, locations, and gender filters.' },
      { name: 'Interest Prediction', desc: 'Estimates purchase interests based on cross-domain behavior signals.' },
      { name: 'Purchase Intent Modeling', desc: 'Predicts buying timelines by analyzing temporal search patterns and high-value clicks.' }
    ]
  },
  {
    id: 'agency',
    num: 7,
    title: 'Agency Management Platform',
    summary: 'Tools built for digital marketing agencies to manage clients, allocate team members, and handle invoicing.',
    icon: Building2,
    color: '#06b6d4',
    jumpId: 'agency-dashboard',
    features: [
      { name: 'Agency Dashboard', desc: 'Summarizes active campaigns, total billable hours, and client retainers on a single page.' },
      { name: 'Client Workspaces', desc: 'Separates data and databases into isolated instances for individual clients.' },
      { name: 'White Label Portals', desc: 'Customizes the client login portal with agency branding, custom domains, and custom colors.' },
      { name: 'Team Management', desc: 'Assigns work projects and tasks to copywriters, developers, and project managers.' },
      { name: 'Time Tracking', desc: 'Logs hourly work logs per client to ensure accurate invoice calculations.' },
      { name: 'Client Invoicing', desc: 'Generates billing invoices and handles subscription retainers automatically.' },
      { name: 'Client Approvals', desc: 'Facilitates approval workflows for marketing copies, design layouts, and creative assets.' },
      { name: 'Campaign Workspace', desc: 'Group client digital advertising channels and media files in one place.' },
      { name: 'Resource Planning', desc: 'Visualizes team capacity limits and workload distribution schedules.' }
    ]
  },
  {
    id: 'communication',
    num: 8,
    title: 'Omnichannel Communication Platform',
    summary: 'Centralized hub to manage customer interactions across Email, SMS, WhatsApp, Live Chat, and AI chatbots.',
    icon: MessageSquare,
    color: '#ef4444',
    jumpId: 'comm-email',
    features: [
      { name: 'Email', desc: 'Send newsletters, marketing broadcasts, and transactional emails with HTML templates.' },
      { name: 'WhatsApp', desc: 'Delivers transactional notifications and updates using approved WhatsApp Business templates.' },
      { name: 'Telegram', desc: 'Delivers automated channel broadcasts and posts alerts to user groups.' },
      { name: 'SMS', desc: 'Delivers quick notifications and verification codes using SMS gateway channels.' },
      { name: 'Voice Calls', desc: 'Connected dialer and calls log tracking directly within the dashboard.' },
      { name: 'Push Notifications', desc: 'Dispatches mobile app push alerts to iOS and Android devices.' },
      { name: 'In-App Messaging', desc: 'Renders targeted alerts and banner messages within user dashboards.' },
      { name: 'Live Chat', desc: 'Connects support agents directly with live website visitors.' },
      { name: 'AI Chatbot', desc: 'Deploys natural language chatbots to handle initial support inquiries.' },
      { name: 'Video Messaging', desc: 'Records and sends short video links of screen recordings to support clients.' },
      { name: 'Omnichannel Inbox', desc: 'Consolidates messages from Email, WhatsApp, and SMS into one unified conversation timeline.' }
    ]
  },
  {
    id: 'marketplace',
    num: 9,
    title: 'Marketplace',
    summary: 'Integration directory for plugins, campaign templates, custom themes, and qualified developers.',
    icon: Store,
    color: '#8b5cf6',
    jumpId: 'mktplace-plugins',
    features: [
      { name: 'Plugin Marketplace', desc: 'Connects external tools and integrations with single-click installation scripts.' },
      { name: 'Template Marketplace', desc: 'Downloads layout structures, marketing emails, and campaign templates.' },
      { name: 'Theme Marketplace', desc: 'Installs customized dashboard skins and layouts for personalized viewing.' },
      { name: 'AI Prompt Marketplace', desc: 'Catalog of curated, pre-tested prompts for content generators and assistants.' },
      { name: 'Agency Marketplace', desc: 'Database of verified development, creative, and consulting agencies.' },
      { name: 'Freelancer Marketplace', desc: 'Database of independent contractors, copywriters, and designers.' },
      { name: 'Influencer Marketplace', desc: 'Directory of content creators filtered by niche, follower counts, and engagement scores.' },
      { name: 'Service Marketplace', desc: 'Order standard services like custom integrations or page design setup directly.' }
    ]
  },
  {
    id: 'developer',
    num: 10,
    title: 'Developer Platform',
    summary: 'Developers portal featuring rest endpoints, webhooks, CLI commands, and playground environments.',
    icon: Code2,
    color: '#14b8a6',
    jumpId: 'dev-rest',
    features: [
      { name: 'REST APIs', desc: 'Generates and manages authentication tokens and access permissions.' },
      { name: 'GraphQL APIs', desc: 'Returns highly flexible, optimized schema queries matching developer requirements.' },
      { name: 'Webhooks', desc: 'Sends real-time event updates in JSON format to configured endpoint URLs.' },
      { name: 'SDKs', desc: 'Distributes code packages for major languages to simplify database connections.' },
      { name: 'CLI', desc: 'Provides command-line tools to control environment options directly.' },
      { name: 'API Sandbox', desc: 'Provides a secure environment to run testing code without touching live database records.' },
      { name: 'Event Bus', desc: 'Monitored stream displaying all system actions and webhook fires in real-time.' },
      { name: 'Marketplace APIs', desc: 'Manages secure endpoint privileges for marketplace extension developers.' },
      { name: 'API Analytics', desc: 'Monitors latency stats, system request rates, and error rate percentages.' }
    ]
  },
  {
    id: 'cs',
    num: 11,
    title: 'Customer Success Platform',
    summary: 'Support portal with ticket queues, help centers, forums, and customer satisfaction metrics.',
    icon: LifeBuoy,
    color: '#f43f5e',
    jumpId: 'cs-help',
    features: [
      { name: 'Help Center', desc: 'Customer support portal housing troubleshooting guides and ticket registration options.' },
      { name: 'Ticket System', desc: 'Prioritizes and assigns user inquiries to support agents.' },
      { name: 'Knowledge Base', desc: 'Creation studio to build and publish searchable help documentation.' },
      { name: 'Live Chat', desc: 'Direct agent-to-customer communication tools for resolution of complex issues.' },
      { name: 'AI Support Agent', desc: 'Automated bot configured to resolve low-level tickets instantly.' },
      { name: 'Community Forum', desc: 'Workspace for clients to discuss setup patterns and share suggestions.' },
      { name: 'SLA Management', desc: 'Highlights outstanding tickets nearing response deadlines.' },
      { name: 'Customer Health Score', desc: 'Rates clients by activity trends and metrics to flag churn risk accounts.' }
    ]
  },
  {
    id: 'reco',
    num: 12,
    title: 'AI Recommendation Engine',
    summary: 'AI analysis tools that scan campaigns, bidding rates, and budgets to recommend performance lift adjustments.',
    icon: Sparkles,
    color: '#eab308',
    jumpId: 'reco-product',
    features: [
      { name: 'Product Recommendations', desc: 'Recommends optimal product bundle groups matching customer order histories.' },
      { name: 'Campaign Recommendations', desc: 'Flags underperforming ad creatives and suggests replacements.' },
      { name: 'Budget Recommendations', desc: 'Reallocates resources from low-ROI channels to high-performance campaigns.' },
      { name: 'Audience Recommendations', desc: 'Pinpoints top lookalike clusters matching best conversion metrics.' },
      { name: 'Keyword Recommendations', desc: 'Evaluates bidding costs and search volumes for target keyword sets.' },
      { name: 'Creative Recommendations', desc: 'Suggests layout shifts and graphic overlays to improve ad click-through rates.' },
      { name: 'Pricing Recommendations', desc: 'Simulates pricing scenarios to identify the optimal price point.' }
    ]
  },
  {
    id: 'saas',
    num: 13,
    title: 'Enterprise SaaS Features',
    summary: 'Advanced configurations for multi-branch organizations including compliance, auditing, SSO, and billing.',
    icon: ShieldCheck,
    color: '#059669',
    jumpId: 'saas-multitenant',
    features: [
      { name: 'Multi-Tenant Architecture', desc: 'Isolates and secures client database instances within separate backend environments.' },
      { name: 'White Label Platform', desc: 'Customizes portal domains, logo files, and stylesheet parameters.' },
      { name: 'Multiple Business Units', desc: 'Grants distinct budgets, parameters, and roles to different company branches.' },
      { name: 'Regional Data Centers', desc: 'Restricts data storage locations to comply with regional privacy rules.' },
      { name: 'High Availability', desc: 'Monitors backup servers and load distribution to guarantee continuous uptime.' },
      { name: 'Disaster Recovery', desc: 'Runs simulated failover routines to test systems recovery times.' },
      { name: 'Backup & Restore', desc: 'Schedules database backups and manages quick restoration points.' },
      { name: 'Feature Flags', desc: 'Controls custom access switches to platform features per client tier.' },
      { name: 'Tenant-Level Customization', desc: 'Enables custom configurations and styling limits for premium accounts.' },
      { name: 'Usage-Based Billing', desc: 'Tracks monthly API calls and resources used to automate pricing invoices.' },
      { name: 'Subscription Management', desc: 'Manages platform plan levels, payments, and usage caps.' },
      { name: 'Audit Trails', desc: 'Keeps secure records of system accesses, user modifications, and login times.' },
      { name: 'API Rate Limiting', desc: 'Enforces execution caps to protect platform stability.' },
      { name: 'SCIM Provisioning', desc: 'Connects client directory integrations to sync user account creations.' },
      { name: 'Enterprise SSO', desc: 'Integrates Single Sign-On authentications like Okta and Azure Active Directory.' }
    ]
  },
  {
    id: 'cro',
    num: 14,
    title: 'Conversion Rate Optimization (CRO)',
    summary: 'Analytics tools containing session playbacks, heatmaps, and funnel diagrams to improve site performance.',
    icon: Target,
    color: '#dc2626',
    jumpId: 'cro-session',
    features: [
      { name: 'Session Recording', desc: 'Records mouse movements and scroll paths to playback real user sessions.' },
      { name: 'Heatmaps', desc: 'Highlights areas of highest user clicks using color overlay intensity maps.' },
      { name: 'Scroll Maps', desc: 'Displays visual indicators showing how far visitors scroll down landing pages.' },
      { name: 'Click Maps', desc: 'Renders click count totals directly on interactive buttons and text links.' },
      { name: 'Funnel Analysis', desc: 'Renders step-by-step conversion drops during user signup and checkouts.' },
      { name: 'User Journey Mapping', desc: 'Visualizes the click paths users take between different pages.' },
      { name: 'AI UX Recommendations', desc: 'Highlights structural interface bugs and design bottlenecks impacting sales.' },
      { name: 'Form Analytics', desc: 'Identifies which input fields cause users to abandon signup forms.' },
      { name: 'Exit Intent', desc: 'Triggers promotional overlays when mouse tracking indicates the user is leaving the site.' },
      { name: 'Smart Popups', desc: 'Renders custom modal offers matching specific user behavioral signals.' },
      { name: 'Website Personalization', desc: 'Customizes page headers and layouts matching the user\'s referrer link.' }
    ]
  },
  {
    id: 'industry',
    num: 15,
    title: 'Industry-Specific Solutions',
    summary: 'Pre-configured tracking platforms tailored to distinct business sectors.',
    icon: Briefcase,
    color: '#4f46e5',
    jumpId: 'industry-healthcare',
    features: [
      { name: 'Healthcare', desc: 'Encrypts patient lead records to ensure HIPAA regulatory standards.' },
      { name: 'Finance', desc: 'Verifies inbound investment leads matching SEC and FINRA audit guidelines.' },
      { name: 'Real Estate', desc: 'Links sales reps to property listing directories and leads.' },
      { name: 'Education', desc: 'Manages student applications, campus tours, and university enrollments.' },
      { name: 'Automotive', desc: 'Syncs dealer inventory listings with test-drive booking requests.' },
      { name: 'Travel', desc: 'Tracks vacation packages, tour inquiries, and itinerary confirmations.' },
      { name: 'Hospitality', desc: 'Connects booking engines with resort room availability calendars.' },
      { name: 'E-commerce', desc: 'Displays sales margins, inventory trends, and cart recovery statistics.' },
      { name: 'SaaS', desc: 'Renders recurring revenue projections, churn analytics, and seats usage.' },
      { name: 'Gaming', desc: 'Tracks in-app purchases, level milestones, and gameplay events.' },
      { name: 'iGaming', desc: 'Manages betting limits, licensing, and compliance parameters.' },
      { name: 'Logistics', desc: 'Monitors delivery statuses, shipment timelines, and driver logs.' },
      { name: 'Manufacturing', desc: 'Logs factory outputs, inventory logs, and product quality checks.' },
      { name: 'Government', desc: 'Tracks citizen registrations, public records, and requests.' },
      { name: 'Non-Profit', desc: 'Tracks donation campaigns, donor records, and funding summaries.' }
    ]
  },
  {
    id: 'aiml',
    num: 16,
    title: 'AI & ML Platform',
    summary: 'Advanced development suite to register models, store data features, manage prompts, and trace training runs.',
    icon: Cpu,
    color: '#f43f5e',
    jumpId: 'aiml-registry',
    features: [
      { name: 'Model Registry', desc: 'Logs active machine learning model files, tracking metadata and deployment versions.' },
      { name: 'Feature Store', desc: 'Unified variables database sharing data features across model training cycles.' },
      { name: 'Prompt Management', desc: 'Stores, tests, and evaluates prompt iterations for custom AI text models.' },
      { name: 'RAG Knowledge Base', desc: 'Indexes company documentation to feed context to custom retrieval-augmented generation.' },
      { name: 'Fine-Tuning Support', desc: 'Monitors fine-tuning job runs to tailor models on custom datasets.' },
      { name: 'Vector Database', desc: 'Manages database connections for index structures like Pinecone or pgvector.' },
      { name: 'AI Observability', desc: 'Traces input prompts and outputs to catch hallucinations and prompt drifts.' },
      { name: 'AI Cost Management', desc: 'Evaluates token usage logs to calculate exact costs per model.' },
      { name: 'Experiment Tracking', desc: 'Compares parameters and metrics across multiple training runs.' },
      { name: 'AI Governance', desc: 'Enforces automated safety rules and compliance checks before deployments.' },
      { name: 'Long-Term Vision', desc: 'Roadmap and planning documentation detailing upcoming updates to target models.' }
    ]
  }
];

interface ProjectDirectoryProps {
  setActiveId: (id: string) => void;
}

export const ProjectDirectory: React.FC<ProjectDirectoryProps> = ({ setActiveId }) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('ecom');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedModule = useMemo(() => {
    return modulesData.find(m => m.id === selectedModuleId) || modulesData[0];
  }, [selectedModuleId]);

  // Filter modules/features based on search
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return modulesData;
    const query = searchQuery.toLowerCase();
    return modulesData.filter(m => {
      const matchModule = m.title.toLowerCase().includes(query) || m.summary.toLowerCase().includes(query);
      const matchFeatures = m.features.some(f => f.name.toLowerCase().includes(query) || f.desc.toLowerCase().includes(query));
      return matchModule || matchFeatures;
    });
  }, [searchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Search Bar */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Search size={18} style={{ color: 'var(--text-muted)' }} />
        <input 
          type="text"
          placeholder="Search modules or features (e.g. 'Identity Resolution', 'SaaS', 'SEO')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontSize: '14px'
          }}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px' }}
          >
            Clear
          </button>
        )}
      </div>

      <div className="responsive-layout" style={{ gap: '24px' }}>
        {/* Left Column: Modules List */}
        <div className="glass-card" style={{ flex: '0 0 340px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '720px', overflowY: 'auto' }}>
          <div style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Modules Directory ({filteredModules.length})
          </div>
          {filteredModules.map((m) => {
            const Icon = m.icon;
            const isSelected = m.id === selectedModuleId;
            return (
              <div 
                key={m.id}
                onClick={() => setSelectedModuleId(m.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                  borderLeft: isSelected ? `3px solid ${m.color}` : '3px solid transparent',
                  transition: 'all 0.2s ease',
                  userSelect: 'none'
                }}
                className="directory-item"
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: isSelected ? `${m.color}25` : 'rgba(255,255,255,0.02)',
                  color: isSelected ? m.color : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '13px',
                  flexShrink: 0
                }}>
                  {m.num}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '13.5px', color: isSelected ? '#fff' : 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {m.title}
                  </div>
                </div>
                <Icon size={16} style={{ color: isSelected ? m.color : 'var(--text-muted)', flexShrink: 0 }} />
              </div>
            );
          })}
        </div>

        {/* Right Column: Features Table Details */}
        <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}>
          {/* Module Banner */}
          <div style={{
            background: `linear-gradient(135deg, ${selectedModule.color}15 0%, ${selectedModule.color}05 100%)`,
            border: `1px solid ${selectedModule.color}25`,
            borderRadius: '10px',
            padding: '18px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: selectedModule.color, backgroundColor: `${selectedModule.color}15`, padding: '2px 8px', borderRadius: '4px' }}>
                  Module {selectedModule.num}
                </span>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#fff' }}>
                  {selectedModule.title}
                </h2>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {selectedModule.summary}
              </p>
            </div>
            <button 
              onClick={() => setActiveId(selectedModule.jumpId)}
              style={{
                backgroundColor: selectedModule.color,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Open Module <ArrowRight size={14} />
            </button>
          </div>

          {/* Features Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
              Features & Specifications ({selectedModule.features.length})
            </div>
            <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <th style={{ padding: '10px 14px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', borderBottom: '1px solid var(--border-color)', width: '220px' }}>
                      Feature
                    </th>
                    <th style={{ padding: '10px 14px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', borderBottom: '1px solid var(--border-color)' }}>
                      Description & Specification
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedModule.features.map((f, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} className="table-row-hover">
                      <td style={{ padding: '12px 14px', color: '#fff', fontSize: '12.5px', fontWeight: 600 }}>
                        {f.name}
                      </td>
                      <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontSize: '12.5px', lineHeight: 1.5 }}>
                        {f.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .directory-item:hover {
          background-color: rgba(255, 255, 255, 0.02) !important;
        }
        .table-row-hover:hover {
          background-color: rgba(255, 255, 255, 0.01);
        }
      `}</style>
    </div>
  );
};
