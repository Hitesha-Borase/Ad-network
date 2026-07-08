import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Search, Filter, ShoppingCart, Heart, ChevronDown, Bot, Zap, 
  Clock, Download, Star, Code, Layout, Palette, Briefcase, ShieldCheck, X, Plus, Upload, BookOpen
} from 'lucide-react';

// App design system colors
const grayColors = {
  bgDark: '#080b11',
  bgCard: 'rgba(22, 28, 38, 0.6)',
  border: 'rgba(255,255,255,0.08)',
  borderLight: 'rgba(255,255,255,0.04)',
  textMuted: '#6b7280',
  textSecondary: '#9ca3af',
  textPrimary: '#f3f4f6',
  chartFill: '#6366f1',
  chartStroke: '#818cf8',
  chartGrid: 'rgba(255,255,255,0.05)',
  shades: ['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#0ea5e9', '#ef4444']
};

const card: React.CSSProperties = {
  background: 'var(--bg-card, rgba(22, 28, 38, 0.6))',
  border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
  borderRadius: '12px',
  padding: '20px',
};

const statCard: React.CSSProperties = {
  ...card,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const tableHead: React.CSSProperties = {
  padding: '12px 16px',
  color: 'var(--text-secondary, #9ca3af)',
  borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
  fontWeight: 600,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const tableCell: React.CSSProperties = {
  padding: '16px',
  color: 'var(--text-secondary, #9ca3af)',
  borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
};

const formGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  width: '100%',
};

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  color: '#9ca3af',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  backgroundColor: '#161b22',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  color: '#f3f4f6',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%239ca3af' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: '36px',
};

const switchContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 14px',
  backgroundColor: '#161b22',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
};

const btnPrimaryStyle: React.CSSProperties = {
  backgroundColor: '#6366f1',
  color: '#ffffff',
  border: 'none',
  padding: '11px 22px',
  borderRadius: '8px',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: '14px',
  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
  transition: 'background-color 0.2s',
};

const btnSecondaryStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: '#e5e7eb',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  padding: '11px 22px',
  borderRadius: '8px',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.2s',
};

/* ----------------------------------------------------
   REUSABLE UI COMPONENTS - MODAL
   ---------------------------------------------------- */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px',
    }}>
      <div style={{
        background: '#0d1117',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '520px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh',
        boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.8)',
        animation: 'fadeIn 0.2s ease-out',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#f3f4f6', letterSpacing: '-0.01em' }}>{title}</h3>
          <button 
            onClick={onClose} 
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>
        {/* Content */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// Mock data for Activity
const activityData = [
  { date: '06/10', downloads: 220 },
  { date: '06/13', downloads: 310 },
  { date: '06/16', downloads: 290 },
  { date: '06/19', downloads: 420 },
  { date: '06/22', downloads: 380 },
  { date: '06/25', downloads: 480 },
  { date: '06/28', downloads: 550 },
  { date: '07/01', downloads: 510 },
  { date: '07/04', downloads: 640 },
  { date: '07/07', downloads: 720 }
];

// Mock data for Categories
const categoriesData = [
  { name: 'Plugin', value: 420 },
  { name: 'Theme', value: 180 },
  { name: 'Template', value: 310 },
  { name: 'AI Prompt', value: 540 },
  { name: 'Agency', value: 85 },
  { name: 'Service', value: 120 }
];

interface MarketplaceDashboardProps {
  activeId?: string;
}

export const MarketplaceDashboard: React.FC<MarketplaceDashboardProps> = ({ activeId = 'mktplace-dashboard' }) => {
  const [pluginSearch, setPluginSearch] = useState('');
  const [promptCategory, setPromptCategory] = useState('All');
  const [templateCategory, setTemplateCategory] = useState('All');

  // Dynamic States for Lists
  const [plugins, setPlugins] = useState([
    { name: 'HubSpot Sync', dev: 'Kiaan Team', cat: 'CRM Integration', ver: 'v2.4.1', comp: 'Kiaan OS v3.0+', dl: '12,450', rate: '4.8', lic: 'Commercial', status: 'Installed' },
    { name: 'Stripe Payments', dev: 'Stripe Inc.', cat: 'Billing Gateway', ver: 'v1.8.0', comp: 'Kiaan OS v2.8+', dl: '18,920', rate: '4.9', lic: 'Free', status: 'Available' },
    { name: 'Mailchimp Automator', dev: 'Kiaan Labs', cat: 'Marketing', ver: 'v3.1.2', comp: 'Kiaan OS v3.0+', dl: '8,400', rate: '4.6', lic: 'Commercial', status: 'Installed' },
    { name: 'Meta Ads Connector', dev: 'AdTech Corp', cat: 'Advertising', ver: 'v1.2.0', comp: 'Kiaan OS v3.2+', dl: '5,120', rate: '4.3', lic: 'Commercial', status: 'Available' },
    { name: 'Google Analytics 4', dev: 'Google LLC', cat: 'Analytics', ver: 'v4.0.1', comp: 'Kiaan OS v2.0+', dl: '24,150', rate: '4.7', lic: 'Free', status: 'Installed' },
    { name: 'Zapier Webhooks', dev: 'Zapier', cat: 'Automation', ver: 'v2.0.4', comp: 'Kiaan OS v3.0+', dl: '14,890', rate: '4.5', lic: 'Free', status: 'Available' }
  ]);

  const [themes, setThemes] = useState([
    { name: 'NeoDark Pro', ind: 'Tech & SaaS', resp: true, dark: true, dl: '4,120', rate: '4.8' },
    { name: 'Minimal Enterprise', ind: 'Finance & Legal', resp: true, dark: false, dl: '2,980', rate: '4.5' },
    { name: 'Vibrant Commerce', ind: 'E-commerce', resp: true, dark: true, dl: '6,450', rate: '4.9' },
    { name: 'Clean Portfolio', ind: 'Agency & Creative', resp: true, dark: false, dl: '1,890', rate: '4.2' }
  ]);

  const [templates, setTemplates] = useState([
    { name: 'SaaS Lead Gen Landing Page', cat: 'Landing Pages', author: 'Kiaan Design', dl: '8,450', rate: '4.8' },
    { name: 'Q3 Newsletter Campaign', cat: 'Email Templates', author: 'Marketing Hub', dl: '12,980', rate: '4.7' },
    { name: 'Webinar Follow-up Workflow', cat: 'Workflow Templates', author: 'Automation Labs', dl: '4,110', rate: '4.6' },
    { name: 'SEO Content Campaign', cat: 'Marketing Campaigns', author: 'ContentPro', dl: '3,890', rate: '4.5' },
    { name: 'Customer Welcome Sequence', cat: 'Automation Templates', author: 'SaaS Engine', dl: '5,420', rate: '4.9' }
  ]);

  const [prompts, setPrompts] = useState([
    { name: 'Meta Ads Copywriter', cat: 'Marketing', comp: 'GPT-4 / Claude 3', creator: 'PromptMaster', dl: '14,210', tokens: '450', rate: '4.8' },
    { name: 'Technical SEO Auditor', cat: 'SEO', comp: 'GPT-4o', creator: 'SEO Guru', dl: '8,980', tokens: '820', rate: '4.7' },
    { name: 'Cold Sales Outreach Draft', cat: 'Sales', comp: 'Claude 3.5 Sonnet', creator: 'SalesForce', dl: '11,400', tokens: '350', rate: '4.9' },
    { name: 'Lead Nurture Sequence Generator', cat: 'CRM', comp: 'GPT-4', creator: 'Kiaan AI', dl: '7,890', tokens: '980', rate: '4.6' },
    { name: 'SQL Query Generator', cat: 'Analytics', comp: 'Claude 3 / GPT-4', creator: 'Data Analyst', dl: '9,120', tokens: '600', rate: '4.5' }
  ]);

  const [agencies, setAgencies] = useState([
    { name: 'Vanguard Digital', spec: 'Enterprise Marketing & SEO', loc: 'New York, USA', projects: '240+', rate: '4.9', price: '$5,000/mo' },
    { name: 'AdVantage Labs', spec: 'Google & Meta PPC Campaigns', loc: 'London, UK', projects: '180+', rate: '4.8', price: '$3,500/mo' },
    { name: 'FlowState Automation', spec: 'HubSpot & CRM Implementations', loc: 'Berlin, Germany', projects: '95+', rate: '4.7', price: '$4,000/mo' }
  ]);

  const [freelancers, setFreelancers] = useState([
    { name: 'Aarav Mehta', skills: 'React, Node.js, Custom Integrations', rate: '$50/hr', rating: '4.9', projects: '42', status: 'Available' },
    { name: 'Sophia Chen', skills: 'UI/UX Design, Figma, Tailwind CSS', rate: '$45/hr', rating: '4.8', projects: '28', status: 'Busy' },
    { name: 'Liam Davies', skills: 'SEO, Google Analytics, Ads Optimization', rate: '$60/hr', rating: '4.7', projects: '35', status: 'Available' }
  ]);

  const [services, setServices] = useState([
    { title: 'Full Website Audit', provider: 'Vanguard Digital', price: '$499', delivery: '5 Days', rating: '4.9' },
    { title: 'Meta Ads Management (1 Month)', provider: 'AdVantage Labs', price: '$999', delivery: '30 Days', rating: '4.8' },
    { title: 'HubSpot Pipeline Setup', provider: 'FlowState Automation', price: '$799', delivery: '7 Days', rating: '4.7' }
  ]);

  const [influencers, setInfluencers] = useState([
    { name: 'TechVibe YouTube', platform: 'YouTube', niche: 'Consumer Tech & SaaS', followers: '120K', price: '$500/post', rate: '4.9' },
    { name: 'GrowthHacker Twitter', platform: 'Twitter/X', niche: 'Marketing & B2B Startups', followers: '85K', price: '$200/post', rate: '4.7' },
    { name: 'Fiona Business Blog', platform: 'LinkedIn/Blog', niche: 'Finance & Enterprise Tech', followers: '45K', price: '$350/post', rate: '4.8' }
  ]);

  const [installedItems, setInstalledItems] = useState([
    { name: 'HubSpot Sync', type: 'Plugin', instVer: 'v2.4.1', latVer: 'v2.4.3', status: 'Update Available', autoUp: true, updated: 'Yesterday', license: 'Enterprise' },
    { name: 'NeoDark Pro', type: 'Theme', instVer: 'v1.2.0', latVer: 'v1.2.0', status: 'Active', autoUp: false, updated: '3 days ago', license: 'Single Use' },
    { name: 'SaaS Lead Gen Landing Page', type: 'Template', instVer: 'v1.0.0', latVer: 'v1.0.0', status: 'Active', autoUp: true, updated: '1 week ago', license: 'Open Source' },
    { name: 'Meta Ads Copywriter', type: 'AI Prompt', instVer: 'v1.1.0', latVer: 'v1.1.0', status: 'Active', autoUp: true, updated: '2 days ago', license: 'Free' }
  ]);

  const [purchasesData, setPurchasesData] = useState([
    { id: 'INV-4409', item: 'HubSpot Sync Plugin (Annual Subscription)', cost: '$499.00', date: '06/15/2026', renewal: '06/15/2027', key: 'KOS-HBS-99120-X89', status: 'Active' },
    { id: 'INV-3982', item: 'NeoDark Pro Premium Theme', cost: '$59.00', date: '04/10/2026', renewal: 'N/A (Lifetime)', key: 'KOS-NDP-20381-Y12', status: 'Completed' },
    { id: 'INV-3210', item: 'SaaS Lead Gen Landing Page Template', cost: '$0.00', date: '03/01/2026', renewal: 'N/A', key: 'N/A (Free)', status: 'Completed' }
  ]);

  // Modal Dialogs visibility state manager
  const [modalState, setModalState] = useState<Record<string, boolean>>({});
  const openModal = (name: string) => setModalState(prev => ({ ...prev, [name]: true }));
  const closeModal = (name: string) => setModalState(prev => ({ ...prev, [name]: false }));

  // Event handlers to listen to App.tsx CTA button clicks
  useEffect(() => {
    const handleSecEvent = (e: Event) => {
      const id = (e as CustomEvent).type.replace('mkt-sec-', '');
      openModal(`sec-${id}`);
    };
    const handlePriEvent = (e: Event) => {
      const id = (e as CustomEvent).type.replace('mkt-pri-', '');
      openModal(`pri-${id}`);
    };

    const eventNames = [
      'mktplace-dashboard', 'mktplace-plugins', 'mktplace-themes',
      'mktplace-templates', 'mktplace-prompts', 'mktplace-agencies',
      'mktplace-installed', 'mktplace-purchases', 'mktplace-favorites',
      'mktplace-freelancers', 'mktplace-services', 'mktplace-influencers'
    ];

    eventNames.forEach(name => {
      window.addEventListener(`mkt-sec-${name}`, handleSecEvent);
      window.addEventListener(`mkt-pri-${name}`, handlePriEvent);
    });

    return () => {
      eventNames.forEach(name => {
        window.removeEventListener(`mkt-sec-${name}`, handleSecEvent);
        window.removeEventListener(`mkt-pri-${name}`, handlePriEvent);
      });
    };
  }, []);

  // Filtered plugins based on search
  const filteredPlugins = plugins.filter(p => 
    p.name.toLowerCase().includes(pluginSearch.toLowerCase()) || 
    p.cat.toLowerCase().includes(pluginSearch.toLowerCase())
  );

  // Form submit models states
  const [extensionForm, setExtensionForm] = useState({ name: '', type: 'Plugin', desc: '', price: '', version: '1.0.0' });
  const [pluginForm, setPluginForm] = useState({ name: '', category: 'CRM Integration', version: '1.0.0', license: 'Free' });
  const [themeForm, setThemeForm] = useState({ name: '', industry: 'Tech & SaaS', resp: true, dark: true });
  const [templateForm, setTemplateForm] = useState({ name: '', cat: 'Landing Pages', author: 'Organization Creator' });
  const [promptForm, setPromptForm] = useState({ name: '', cat: 'Marketing', comp: 'GPT-4o', tokens: '450' });
  const [agencyForm, setAgencyForm] = useState({ name: '', spec: '', price: '$3,000/mo', loc: '' });
  const [rfpForm, setRfpForm] = useState({ projectTitle: '', desc: '', budget: '', timeline: '30 Days' });
  const [customPackForm, setCustomPackForm] = useState({ name: '', type: 'Plugin', version: '1.0.0' });
  const [freelancerForm, setFreelancerForm] = useState({ name: '', skills: '', rate: '' });
  const [hireRequestForm, setHireRequestForm] = useState({ freelancerName: '', brief: '', budget: '' });
  const [serviceForm, setServiceForm] = useState({ title: '', price: '', delivery: '7 Days' });
  const [requestServiceForm, setRequestServiceForm] = useState({ serviceTitle: '', details: '', budget: '' });
  const [influencerForm, setInfluencerForm] = useState({ name: '', platform: 'YouTube', niche: 'Marketing', followers: '', price: '' });
  const [connectInfluencerForm, setConnectInfluencerForm] = useState({ influencerName: '', pitch: '', budget: '' });

  // Form submit handles
  const handlePublishExt = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPrice = extensionForm.price ? `$${extensionForm.price}` : 'Free';
    
    // Add to appropriate section database
    if (extensionForm.type === 'Plugin') {
      setPlugins([{ name: extensionForm.name, dev: 'Self (Developer)', cat: 'Integration', ver: extensionForm.version, comp: 'Kiaan OS v3.0+', dl: '0', rate: '0.0', lic: cleanPrice === 'Free' ? 'Free' : 'Commercial', status: 'Available' }, ...plugins]);
    } else if (extensionForm.type === 'Theme') {
      setThemes([{ name: extensionForm.name, ind: 'General', resp: true, dark: true, dl: '0', rate: '0.0' }, ...themes]);
    } else if (extensionForm.type === 'Template') {
      setTemplates([{ name: extensionForm.name, cat: 'Landing Pages', author: 'Self (Developer)', dl: '0', rate: '0.0' }, ...templates]);
    } else if (extensionForm.type === 'AI Prompt') {
      setPrompts([{ name: extensionForm.name, cat: 'General', comp: 'GPT-4o', creator: 'Self (Creator)', dl: '0', tokens: '350', rate: '0.0' }, ...prompts]);
    }
    
    closeModal('sec-mktplace-dashboard');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Extension "${extensionForm.name}" published to Marketplace draft!` }));
    setExtensionForm({ name: '', type: 'Plugin', desc: '', price: '', version: '1.0.0' });
  };

  const handleUploadPluginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pl = {
      name: pluginForm.name,
      dev: 'Self (Org)',
      cat: pluginForm.category,
      ver: pluginForm.version,
      comp: 'Kiaan OS v3.0+',
      dl: '0',
      rate: '5.0',
      lic: pluginForm.license,
      status: 'Installed'
    };
    setPlugins([pl, ...plugins]);
    setInstalledItems([{ name: pl.name, type: 'Plugin', instVer: pl.ver, latVer: pl.ver, status: 'Active', autoUp: true, updated: 'Just now', license: pl.lic }, ...installedItems]);
    closeModal('pri-mktplace-plugins');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Plugin "${pl.name}" uploaded and installed successfully!` }));
    setPluginForm({ name: '', category: 'CRM Integration', version: '1.0.0', license: 'Free' });
  };

  const handleUploadThemeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const th = {
      name: themeForm.name,
      ind: themeForm.industry,
      resp: themeForm.resp,
      dark: themeForm.dark,
      dl: '0',
      rate: '5.0'
    };
    setThemes([th, ...themes]);
    setInstalledItems([{ name: th.name, type: 'Theme', instVer: 'v1.0.0', latVer: 'v1.0.0', status: 'Active', autoUp: false, updated: 'Just now', license: 'Single Use' }, ...installedItems]);
    closeModal('pri-mktplace-themes');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Theme "${th.name}" uploaded and registered!` }));
    setThemeForm({ name: '', industry: 'Tech & SaaS', resp: true, dark: true });
  };

  const handleUploadTemplateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tm = {
      name: templateForm.name,
      cat: templateForm.cat,
      author: templateForm.author,
      dl: '0',
      rate: '5.0'
    };
    setTemplates([tm, ...templates]);
    closeModal('sec-mktplace-templates');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Template "${tm.name}" submitted to moderation!` }));
    setTemplateForm({ name: '', cat: 'Landing Pages', author: 'Organization Creator' });
  };

  const handlePublishPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pr = {
      name: promptForm.name,
      cat: promptForm.cat,
      comp: promptForm.comp,
      creator: 'Self (Creator)',
      dl: '0',
      tokens: promptForm.tokens,
      rate: '5.0'
    };
    setPrompts([pr, ...prompts]);
    closeModal('pri-mktplace-prompts');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `AI Prompt Kit "${pr.name}" published to prompt library!` }));
    setPromptForm({ name: '', cat: 'Marketing', comp: 'GPT-4o', tokens: '450' });
  };

  const handleBecomePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ag = {
      name: agencyForm.name,
      spec: agencyForm.spec,
      price: agencyForm.price,
      loc: agencyForm.loc || 'Remote',
      projects: '0+',
      rate: '5.0'
    };
    setAgencies([ag, ...agencies]);
    closeModal('pri-mktplace-agencies');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Organization "${ag.name}" registered as Certified Agency Partner!` }));
    setAgencyForm({ name: '', spec: '', price: '$3,000/mo', loc: '' });
  };

  const handleRequestAgencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal('sec-mktplace-agencies');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `RFP for "${rfpForm.projectTitle}" sent to partner network!` }));
    setRfpForm({ projectTitle: '', desc: '', budget: '', timeline: '30 Days' });
  };

  const handleUploadCustomPackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pack = {
      name: customPackForm.name,
      type: customPackForm.type,
      instVer: customPackForm.version,
      latVer: customPackForm.version,
      status: 'Active',
      autoUp: false,
      updated: 'Just now',
      license: 'Custom Upload'
    };
    setInstalledItems([pack, ...installedItems]);
    closeModal('sec-mktplace-installed');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Custom package "${pack.name}" uploaded offline!` }));
    setCustomPackForm({ name: '', type: 'Plugin', version: '1.0.0' });
  };

  const [checkingUpdates, setCheckingUpdates] = useState(false);
  const triggerCheckUpdates = () => {
    setCheckingUpdates(true);
    setTimeout(() => {
      setCheckingUpdates(false);
      closeModal('pri-mktplace-installed');
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Check complete: 1 extension update found (HubSpot Sync).' }));
    }, 2000);
  };

  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', brand: 'Visa', last4: '4242', exp: '12/2028', isDefault: true },
    { id: '2', brand: 'Mastercard', last4: '8811', exp: '09/2027', isDefault: false }
  ]);

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    const newMethod = {
      id: String(Date.now()),
      brand: newPaymentMethod.brand,
      last4: newPaymentMethod.cardNumber.slice(-4) || '9988',
      exp: newPaymentMethod.exp,
      isDefault: false
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    closeModal('sec-mktplace-purchases');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'New payment method attached successfully!' }));
    setNewPaymentMethod({ brand: 'Visa', cardNumber: '', exp: '', cvc: '' });
  };

  const [newPaymentMethod, setNewPaymentMethod] = useState({ brand: 'Visa', cardNumber: '', exp: '', cvc: '' });

  const handleExportInvoices = () => {
    const text = 'Invoice ID,Purchased Item,Cost,Purchase Date,Key,Status\n' +
      purchasesData.map(i => `${i.id},"${i.item}",${i.cost},${i.date},${i.key},${i.status}`).join('\n');
    
    const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `marketplace_invoices_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    closeModal('pri-mktplace-purchases');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Purchases ledger exported successfully!' }));
  };

  const handleBecomeFreelancerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fl = {
      name: freelancerForm.name,
      skills: freelancerForm.skills,
      rate: freelancerForm.rate.startsWith('$') ? freelancerForm.rate : `$${freelancerForm.rate}/hr`,
      rating: '5.0',
      projects: '0',
      status: 'Available'
    };
    setFreelancers([fl, ...freelancers]);
    closeModal('sec-mktplace-freelancers');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Freelancer profile registered under "${fl.name}"!` }));
    setFreelancerForm({ name: '', skills: '', rate: '' });
  };

  const handleHireFreelancerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal('pri-mktplace-freelancers');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Job offer proposal sent to ${hireRequestForm.freelancerName}!` }));
    setHireRequestForm({ freelancerName: '', brief: '', budget: '' });
  };

  const handleOfferServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sv = {
      title: serviceForm.title,
      provider: 'Self (Org)',
      price: serviceForm.price.startsWith('$') ? serviceForm.price : `$${serviceForm.price}`,
      delivery: serviceForm.delivery,
      rating: '5.0'
    };
    setServices([sv, ...services]);
    closeModal('sec-mktplace-services');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Service bundle "${sv.title}" listed successfully!` }));
    setServiceForm({ title: '', price: '', delivery: '7 Days' });
  };

  const handleRequestServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal('pri-mktplace-services');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Service request for "${requestServiceForm.serviceTitle}" submitted!` }));
    setRequestServiceForm({ serviceTitle: '', details: '', budget: '' });
  };

  const handleBecomeInfluencerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inf = {
      name: influencerForm.name,
      platform: influencerForm.platform,
      niche: influencerForm.niche,
      followers: influencerForm.followers,
      price: influencerForm.price.startsWith('$') ? influencerForm.price : `$${influencerForm.price}/post`,
      rate: '5.0'
    };
    setInfluencers([inf, ...influencers]);
    closeModal('sec-mktplace-influencers');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Influencer channel "${inf.name}" registered!` }));
    setInfluencerForm({ name: '', platform: 'YouTube', niche: 'Marketing', followers: '', price: '' });
  };

  const handleConnectInfluencerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal('pri-mktplace-influencers');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Outreach proposal sent to ${connectInfluencerForm.influencerName}!` }));
    setConnectInfluencerForm({ influencerName: '', pitch: '', budget: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#dddddd' }} className="fade-in">
      
      {/* GLOBAL FILTERS PANEL */}
      <div style={{
        background: '#1a1a1a',
        border: '1px solid #333333',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#888888', marginRight: '8px' }}>
          <Filter size={16} />
          <span>Global Filters:</span>
        </div>
        
        {/* Filter Select Placeholders */}
        {[
          { label: 'Date Range', val: 'All Time' },
          { label: 'Category', val: 'All Categories' },
          { label: 'Industry', val: 'All Industries' },
          { label: 'Developer', val: 'All Developers' },
          { label: 'Price', val: 'All Prices' },
          { label: 'Free/Paid', val: 'All' },
          { label: 'Rating', val: '4.0+ Stars' },
          { label: 'Verified Publisher', val: 'Show All' },
          { label: 'Organization', val: 'Default Org' }
        ].map((f, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#222222',
            border: '1px solid #333333',
            borderRadius: '6px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '12px'
          }}>
            <span style={{ color: '#888888' }}>{f.label}:</span>
            <span style={{ color: '#dddddd', fontWeight: 500 }}>{f.val}</span>
            <ChevronDown size={14} style={{ color: '#666666' }} />
          </div>
        ))}
      </div>

      {/* RENDER ACTIVE VIEW */}
      {activeId === 'mktplace-dashboard' && (
        <>
          {/* 8-CARD OVERVIEW SECTION */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            {[
              { title: 'Installed Extensions', value: '18', trend: '+2 this month', icon: Zap },
              { title: 'Available Plugins', value: '420', trend: '+14 new today', icon: Code },
              { title: 'Themes Installed', value: '3', trend: 'Active: NeoDark', icon: Palette },
              { title: 'Templates Available', value: '310', trend: '+28 Q3 templates', icon: Layout },
              { title: 'AI Prompts', value: '540', trend: '+120 model prompt kits', icon: Bot },
              { title: 'Connected Agencies', value: '5', trend: '2 active campaigns', icon: Briefcase },
              { title: 'Downloads This Month', value: '1,890', trend: '+18.4% growth', icon: Download },
              { title: 'Marketplace Spending', value: '$558.00', trend: 'Budget status: Stable', icon: ShoppingCart }
            ].map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div key={idx} style={{
                  background: '#1a1a1a',
                  border: '1px solid #333333',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ color: '#888888', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {kpi.title}
                    </span>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      border: '1px solid #333333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#888888'
                    }}>
                      <Icon size={14} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.5px' }}>
                      {kpi.value}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px' }}>
                      <span style={{ color: '#aaaaaa' }}>{kpi.trend}</span>
                      <span style={{ color: '#555555' }}>[Mini Chart]</span>
                    </div>
                  </div>
                  {/* Grayscale Mini Sparkline Placeholder */}
                  <div style={{ width: '100%', height: '14px', borderBottom: '1px dotted #333333', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: '2px', left: '10%', right: '10%', height: '8px', borderTop: '2px solid #555555', borderRight: '2px solid transparent' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* MARKETPLACE ANALYTICS */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px'
          }}>
            {/* Left Chart: Marketplace Activity */}
            <div style={{
              background: '#1a1a1a',
              border: '1px solid #333333',
              borderRadius: '8px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Marketplace Activity</h3>
                  <p style={{ fontSize: '12px', color: '#666666' }}>Downloads over last 30 days</p>
                </div>
                <div style={{ border: '1px solid #333333', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', color: '#888888' }}>
                  [Downloads Graph]
                </div>
              </div>
              
              <div style={{ width: '100%', height: '240px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={grayColors.chartGrid} />
                    <XAxis dataKey="date" stroke={grayColors.textMuted} fontSize={11} />
                    <YAxis stroke={grayColors.textMuted} fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333333', color: '#ffffff' }} />
                    <Area 
                      type="monotone" 
                      dataKey="downloads" 
                      stroke={grayColors.chartStroke} 
                      fill={grayColors.chartFill} 
                      fillOpacity={0.15} 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Chart: Categories Distribution */}
            <div style={{
              background: '#1a1a1a',
              border: '1px solid #333333',
              borderRadius: '8px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Categories Distribution</h3>
                  <p style={{ fontSize: '12px', color: '#666666' }}>Proportion of available extensions</p>
                </div>
                <div style={{ border: '1px solid #333333', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', color: '#888888' }}>
                  [Grayscale Bar Chart]
                </div>
              </div>

              <div style={{ width: '100%', height: '240px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoriesData} layout="vertical" margin={{ top: 5, right: 10, left: 15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={grayColors.chartGrid} horizontal={true} vertical={false} />
                    <XAxis type="number" stroke={grayColors.textMuted} fontSize={10} />
                    <YAxis dataKey="name" type="category" stroke={grayColors.textMuted} fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333333', color: '#ffffff' }} />
                    <Bar dataKey="value" fill={grayColors.chartFill} radius={[0, 4, 4, 0]}>
                      {categoriesData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={grayColors.shades[index % grayColors.shades.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* THREE MEDIUM ANALYTICS CARDS */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}>
            {[
              { label: 'Top Downloaded Category', value: 'AI Prompts', sub: '540 active items', detail: '35% of downloads this month' },
              { label: 'Highest Rated Asset', value: 'Stripe Payments', sub: 'v1.8.0 (Free)', detail: '4.9 Stars (18,920 downloads)' },
              { label: 'Most Active Organization', value: 'Kiaan OS (Default)', sub: 'Default Tenant', detail: '18 active installations mapped' }
            ].map((c, idx) => (
              <div key={idx} style={{
                background: '#1a1a1a',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <span style={{ fontSize: '12px', color: '#666666', fontWeight: 600, textTransform: 'uppercase' }}>{c.label}</span>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>{c.value}</div>
                <div style={{ fontSize: '12px', color: '#aaaaaa' }}>{c.sub}</div>
                <div style={{ fontSize: '11px', color: '#555555', borderTop: '1px solid #262626', paddingTop: '6px', marginTop: '4px' }}>
                  {c.detail}
                </div>
              </div>
            ))}
          </div>

          {/* FEATURED MARKETPLACE SECTION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>Featured Marketplace Showcase</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { type: 'Featured Plugin', name: 'HubSpot Sync', cat: 'CRM Integration', dev: 'Kiaan Team', rate: '4.8', dl: '12,450', price: '$49/mo' },
                { type: 'Featured Theme', name: 'NeoDark Pro Theme', cat: 'User Interface', dev: 'Kiaan Team', rate: '4.8', dl: '4,120', price: '$59' },
                { type: 'Featured Template', name: 'SaaS Lead Gen Landing Page', cat: 'Templates', dev: 'Kiaan Design', rate: '4.8', dl: '8,450', price: 'Free' },
                { type: 'Featured AI Prompt', name: 'Meta Ads Copywriter', cat: 'AI Prompts', dev: 'PromptMaster', rate: '4.8', dl: '14,210', price: '$9' },
                { type: 'Featured Agency', name: 'Vanguard Digital', cat: 'Full Service Agency', dev: 'Agency Partner', rate: '4.9', dl: '240+ Projects', price: 'Contact for Quote' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: '#1a1a1a',
                  border: '1px solid #333333',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr 240px',
                  gap: '20px',
                  alignItems: 'center'
                }}>
                  {/* Thumbnail Placeholder */}
                  <div style={{
                    height: '80px',
                    backgroundColor: '#262626',
                    borderRadius: '6px',
                    border: '1px solid #333333',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#666666',
                    fontSize: '11px'
                  }}>
                    <span>[Thumbnail]</span>
                    <span style={{ fontSize: '9px', color: '#444444' }}>120x80px</span>
                  </div>

                  {/* Title & Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#888888', textTransform: 'uppercase', fontWeight: 600 }}>{item.type}</span>
                      <span style={{ fontSize: '10px', backgroundColor: '#222222', border: '1px solid #333333', padding: '1px 6px', borderRadius: '4px', color: '#aaaaaa' }}>
                        {item.cat}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{item.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#888888' }}>
                      <span>Developer: <strong>{item.dev}</strong></span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Star size={12} fill="#666666" style={{ color: '#666666' }} /> {item.rate}
                      </span>
                      <span>Downloads: {item.dl}</span>
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>{item.price}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        backgroundColor: '#222222',
                        border: '1px solid #333333',
                        color: '#ffffff',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}>
                        Preview
                      </button>
                      <button style={{
                        backgroundColor: '#dddddd',
                        border: '1px solid #ffffff',
                        color: '#111111',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}>
                        Install
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </>
      )}

      {/* RENDER CATEGORY VIEWS */}
      {activeId === 'mktplace-plugins' && (
              <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ position: 'relative', width: '280px' }}>
                    <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: '#555555' }} />
                    <input 
                      type="text"
                      placeholder="Search plugins..."
                      value={pluginSearch}
                      onChange={(e) => setPluginSearch(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#121212',
                        border: '1px solid #333333',
                        borderRadius: '4px',
                        padding: '6px 12px 6px 30px',
                        fontSize: '12px',
                        color: '#ffffff',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
                    {['Category', 'Pricing', 'Compatibility', 'Verified Publisher', 'Newest', 'Popular'].map((filter, i) => (
                      <div key={i} style={{ backgroundColor: '#222222', border: '1px solid #333333', padding: '6px 12px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <span style={{ color: '#888888' }}>{filter}</span>
                        <ChevronDown size={12} />
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #333333' }}>
                        {['Plugin', 'Developer', 'Category', 'Version', 'Compatibility', 'Downloads', 'Rating', 'License', 'Status', 'Action'].map((h, i) => (
                          <th key={i} style={{ padding: '12px 8px', color: '#888888', fontWeight: 500 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlugins.map((p, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #222222' }}>
                          <td style={{ padding: '12px 8px', fontWeight: 600, color: '#ffffff' }}>{p.name}</td>
                          <td style={{ padding: '12px 8px', color: '#aaaaaa' }}>{p.dev}</td>
                          <td style={{ padding: '12px 8px', color: '#888888' }}>{p.cat}</td>
                          <td style={{ padding: '12px 8px', color: '#888888' }}>{p.ver}</td>
                          <td style={{ padding: '12px 8px', color: '#888888' }}>{p.comp}</td>
                          <td style={{ padding: '12px 8px', color: '#aaaaaa' }}>{p.dl}</td>
                          <td style={{ padding: '12px 8px', color: '#aaaaaa' }}>★ {p.rate}</td>
                          <td style={{ padding: '12px 8px', color: '#888888' }}>{p.lic}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{
                              fontSize: '11px',
                              color: p.status === 'Installed' ? '#aaaaaa' : '#666666',
                              backgroundColor: '#222222',
                              border: '1px solid #333333',
                              padding: '2px 8px',
                              borderRadius: '12px'
                            }}>
                              {p.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <button style={{
                              backgroundColor: p.status === 'Installed' ? '#222222' : '#cccccc',
                              color: p.status === 'Installed' ? '#888888' : '#111111',
                              border: '1px solid #333333',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '11.5px',
                              cursor: 'pointer',
                              fontWeight: 500
                            }}>
                              {p.status === 'Installed' ? 'Uninstall' : 'Install'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeId === 'mktplace-themes' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {themes.map((theme, i) => (
                  <div key={i} style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    {/* Theme Preview Placeholder */}
                    <div style={{
                      height: '140px',
                      backgroundColor: '#262626',
                      borderBottom: '1px solid #333333',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666666',
                      fontSize: '11px'
                    }}>
                      <span>[Theme Preview]</span>
                      <span style={{ fontSize: '9px', color: '#444444' }}>Grid Image</span>
                    </div>

                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                      <h4 style={{ fontSize: '14.5px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{theme.name}</h4>
                      <div style={{ fontSize: '11.5px', color: '#888888' }}>Industry: {theme.ind}</div>
                      
                      <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                        {theme.resp && <span style={{ fontSize: '9px', backgroundColor: '#222222', border: '1px solid #333333', padding: '1px 5px', borderRadius: '3px', color: '#aaaaaa' }}>Responsive</span>}
                        {theme.dark && <span style={{ fontSize: '9px', backgroundColor: '#222222', border: '1px solid #333333', padding: '1px 5px', borderRadius: '3px', color: '#aaaaaa' }}>Dark Mode</span>}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: '#888888', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #262626' }}>
                        <span>★ {theme.rate}</span>
                        <span>{theme.dl} DLs</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '12px' }}>
                        <button style={{ backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '6px', borderRadius: '4px', fontSize: '11.5px', cursor: 'pointer' }}>Live Preview</button>
                        <button style={{ backgroundColor: '#dddddd', border: '1px solid #ffffff', color: '#111111', padding: '6px', borderRadius: '4px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}>Install</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeId === 'mktplace-templates' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Categories Row */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', fontSize: '11.5px' }}>
                  {['All', 'Landing Pages', 'Email Templates', 'Marketing Campaigns', 'Workflow Templates', 'Automation Templates', 'Dashboard Templates', 'Reports', 'Forms', 'Popup Templates'].map((cat, i) => (
                    <button 
                      key={i} 
                      onClick={() => setTemplateCategory(cat)}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: templateCategory === cat ? '#333333' : '#1e1e1e',
                        border: '1px solid #333333',
                        color: templateCategory === cat ? '#ffffff' : '#888888',
                        borderRadius: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                  {templates
                    .filter(t => templateCategory === 'All' || t.cat === templateCategory)
                    .map((tmpl, i) => (
                      <div key={i} style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        {/* Preview */}
                        <div style={{
                          height: '110px',
                          backgroundColor: '#262626',
                          borderBottom: '1px solid #333333',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#666666',
                          fontSize: '11px'
                        }}>
                          <span>[Template Preview]</span>
                        </div>

                        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                          <span style={{ fontSize: '9px', color: '#666666', textTransform: 'uppercase', fontWeight: 600 }}>{tmpl.cat}</span>
                          <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{tmpl.name}</h4>
                          <div style={{ fontSize: '11px', color: '#888888' }}>Author: {tmpl.author}</div>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', color: '#666666', marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #262626' }}>
                            <span>★ {tmpl.rate}</span>
                            <span>{tmpl.dl} DLs</span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginTop: '8px' }}>
                            <button style={{ backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '4px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Duplicate</button>
                            <button style={{ backgroundColor: '#dddddd', border: '1px solid #ffffff', color: '#111111', padding: '4px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>Install</button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeId === 'mktplace-prompts' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Categories */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', fontSize: '11.5px' }}>
                  {['All', 'Marketing', 'SEO', 'Sales', 'CRM', 'Support', 'Analytics', 'Content Writing', 'Automation', 'Business Intelligence'].map((cat, i) => (
                    <button 
                      key={i} 
                      onClick={() => setPromptCategory(cat)}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: promptCategory === cat ? '#333333' : '#1e1e1e',
                        border: '1px solid #333333',
                        color: promptCategory === cat ? '#ffffff' : '#888888',
                        borderRadius: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                  {prompts
                    .filter(p => promptCategory === 'All' || p.cat === promptCategory)
                    .map((p, i) => (
                      <div key={i} style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '9px', color: '#666666', textTransform: 'uppercase', fontWeight: 600 }}>{p.cat}</span>
                            <span style={{ fontSize: '9px', backgroundColor: '#222222', border: '1px solid #333333', padding: '1px 4px', borderRadius: '3px', color: '#aaaaaa' }}>{p.comp}</span>
                          </div>
                          <h4 style={{ fontSize: '13.5px', fontWeight: 600, color: '#ffffff', marginTop: '6px', margin: 0 }}>{p.name}</h4>
                          <span style={{ fontSize: '11px', color: '#666666' }}>By {p.creator}</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', borderTop: '1px solid #262626', borderBottom: '1px solid #262626', padding: '6px 0' }}>
                          <div>
                            <span style={{ color: '#555555' }}>Usage Count:</span>
                            <div style={{ color: '#aaaaaa', fontWeight: 500 }}>{p.dl}</div>
                          </div>
                          <div>
                            <span style={{ color: '#555555' }}>Est. Tokens:</span>
                            <div style={{ color: '#aaaaaa', fontWeight: 500 }}>{p.tokens}</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#888888' }}>
                          <span>★ {p.rate}</span>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button style={{ backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '3px 6px', borderRadius: '3px', fontSize: '10px', cursor: 'pointer' }}>Preview</button>
                            <button style={{ backgroundColor: '#dddddd', border: '1px solid #ffffff', color: '#111111', padding: '3px 6px', borderRadius: '3px', fontSize: '10px', fontWeight: 600, cursor: 'pointer' }}>Install</button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeId === 'mktplace-agencies' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {agencies.map((agency, i) => (
                  <div key={i} style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Agency Header */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      {/* Logo Placeholder */}
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '4px',
                        backgroundColor: '#262626',
                        border: '1px solid #333333',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666666',
                        fontSize: '10px'
                      }}>
                        [Logo]
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{agency.name}</h4>
                          <ShieldCheck size={14} style={{ color: '#888888' }} />
                        </div>
                        <span style={{ fontSize: '11px', color: '#888888' }}>{agency.loc}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
                      <span style={{ color: '#666666' }}>Specialization:</span>
                      <span style={{ color: '#dddddd', fontWeight: 500 }}>{agency.spec}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11.5px', borderTop: '1px solid #262626', borderBottom: '1px solid #262626', padding: '8px 0' }}>
                      <div>
                        <span style={{ color: '#555555' }}>Projects Completed:</span>
                        <div style={{ color: '#aaaaaa', fontWeight: 500 }}>{agency.projects}</div>
                      </div>
                      <div>
                        <span style={{ color: '#555555' }}>Starting Price:</span>
                        <div style={{ color: '#aaaaaa', fontWeight: 500 }}>{agency.price}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#888888' }}>
                      <span>★ {agency.rate}</span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button style={{ backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Profile</button>
                        <button style={{ backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Chat</button>
                        <button style={{ backgroundColor: '#dddddd', border: '1px solid #ffffff', color: '#111111', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>Hire Agency</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

      {activeId === 'mktplace-installed' && (
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Installed Items</h3>
            <p style={{ fontSize: '12px', color: '#666666' }}>Active extensions, prompts, and templates configured in your tenant</p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333333' }}>
                  {['Item Name', 'Type', 'Installed Version', 'Latest Version', 'Status', 'Auto Update', 'Last Updated', 'License', 'Actions'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 8px', color: '#888888', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {installedItems.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #222222' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 600, color: '#ffffff' }}>{item.name}</td>
                    <td style={{ padding: '12px 8px', color: '#aaaaaa' }}>{item.type}</td>
                    <td style={{ padding: '12px 8px', color: '#888888' }}>{item.instVer}</td>
                    <td style={{ padding: '12px 8px', color: '#888888' }}>{item.latVer}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <span style={{
                        fontSize: '11px',
                        color: item.status === 'Active' ? '#999999' : '#ffffff',
                        backgroundColor: item.status === 'Active' ? '#222222' : '#333333',
                        border: '1px solid #444444',
                        padding: '2px 8px',
                        borderRadius: '12px'
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <input 
                        type="checkbox" 
                        checked={item.autoUp} 
                        readOnly 
                        style={{ cursor: 'pointer', accentColor: '#555555' }} 
                      />
                    </td>
                    <td style={{ padding: '12px 8px', color: '#888888' }}>{item.updated}</td>
                    <td style={{ padding: '12px 8px', color: '#888888' }}>{item.license}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{ backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '11.5px', cursor: 'pointer' }}>Configure</button>
                        <button style={{ backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '11.5px', cursor: 'pointer' }}>Deactivate</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeId === 'mktplace-purchases' && (
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Purchases, Subscriptions & Renewals</h3>
            <p style={{ fontSize: '12px', color: '#666666' }}>Manage license keys, subscription periods, invoice histories, and refund requests</p>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333333' }}>
                  {['Invoice ID', 'Purchased Item', 'Cost', 'Purchase Date', 'Renewal Date', 'License Key', 'Status', 'Actions'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 8px', color: '#888888', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {purchasesData.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #222222' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 600, color: '#ffffff' }}>{item.id}</td>
                    <td style={{ padding: '12px 8px', color: '#aaaaaa' }}>{item.item}</td>
                    <td style={{ padding: '12px 8px', color: '#ffffff', fontWeight: 'bold' }}>{item.cost}</td>
                    <td style={{ padding: '12px 8px', color: '#888888' }}>{item.date}</td>
                    <td style={{ padding: '12px 8px', color: '#888888' }}>{item.renewal}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <span style={{ fontSize: '11px', fontFamily: 'monospace', backgroundColor: '#121212', border: '1px solid #262626', padding: '2px 6px', borderRadius: '4px', color: '#888888' }}>
                        {item.key}
                      </span>
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <span style={{
                        fontSize: '11px',
                        color: '#999999',
                        backgroundColor: '#222222',
                        border: '1px solid #333333',
                        padding: '2px 8px',
                        borderRadius: '12px'
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{ backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '11.5px', cursor: 'pointer' }}>Invoice</button>
                        <button style={{ backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '11.5px', cursor: 'pointer' }}>Manage Key</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeId === 'mktplace-favorites' && (
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Your Favorites & Wishlist</h3>
            <p style={{ fontSize: '12px', color: '#666666' }}>Bookmarked plugins, themes, templates, prompts, and agencies</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { type: 'Plugin', name: 'Stripe Payments', desc: 'Secure enterprise billing integrations.', dl: '18,920' },
              { type: 'Theme', name: 'Vibrant Commerce', desc: 'Sleek storefront design template.', dl: '6,450' },
              { type: 'AI Prompt', name: 'Cold Sales Outreach Draft', desc: 'Context-aware sales generator prompt.', dl: '11,400' }
            ].map((fav, i) => (
              <div key={i} style={{ background: '#222222', border: '1px solid #333333', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', color: '#888888', textTransform: 'uppercase', fontWeight: 600 }}>{fav.type}</span>
                  <Heart size={14} fill="#666666" style={{ color: '#666666', cursor: 'pointer' }} />
                </div>
                <h4 style={{ fontSize: '14.5px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{fav.name}</h4>
                <p style={{ fontSize: '11.5px', color: '#888888', margin: 0 }}>{fav.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: '#666666', borderTop: '1px solid #333333', paddingTop: '8px', marginTop: '8px' }}>
                  <span>Downloads: {fav.dl}</span>
                  <button style={{ backgroundColor: '#dddddd', color: '#111111', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                    Quick Install
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI RECOMMENDATIONS PANEL & TIMELINE / QUICK ACTIONS GRID */}
      {activeId === 'mktplace-dashboard' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }}>
        {/* Left: AI Recommendations Panel */}
        <div style={{
          background: '#1a1a1a',
          border: '1px solid #333333',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bot size={18} style={{ color: '#888888' }} />
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>AI Recommendations Panel</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            {[
              { type: 'Recommended Plugins', item: 'Stripe Payments', reason: 'Integrates perfectly with your connected CRM pipeline.' },
              { type: 'Recommended Themes', item: 'NeoDark Pro', reason: 'Match your organization preference for dark settings.' },
              { type: 'Recommended Templates', item: 'Q3 Newsletter Campaign', reason: 'High conversion rate template matching your marketing category.' },
              { type: 'Recommended AI Prompts', item: 'Cold Sales Outreach Draft', reason: 'Increase sales team efficiency by 40% based on analytics.' },
              { type: 'Recommended Agencies', item: 'Vanguard Digital', reason: 'High rating in NYC region for custom HubSpot configurations.' },
              { type: 'Cross Sell Suggestions', item: 'Zapier Webhooks', reason: 'Pair with Mailchimp automation for unified triggers.' }
            ].map((rec, i) => (
              <div key={i} style={{ padding: '8px 12px', backgroundColor: '#222222', border: '1px solid #333333', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '10px', color: '#666666', fontWeight: 600, textTransform: 'uppercase' }}>{rec.type}: <strong style={{ color: '#aaaaaa' }}>{rec.item}</strong></span>
                <span style={{ fontSize: '11px', color: '#888888' }}>{rec.reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Actions & Activity Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Quick Actions */}
          <div style={{
            background: '#1a1a1a',
            border: '1px solid #333333',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} style={{ color: '#888888' }} />
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Quick Actions</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { label: 'Create Plugin', icon: Code },
                { label: 'Upload Theme', icon: Palette },
                { label: 'Publish Template', icon: Layout },
                { label: 'Upload AI Prompt', icon: Bot },
                { label: 'Become Agency Partner', icon: Briefcase },
                { label: 'Manage Licenses', icon: ShieldCheck },
                { label: 'Export Marketplace Report', icon: Download }
              ].map((act, i) => {
                const Icon = act.icon;
                return (
                  <button key={i} style={{
                    backgroundColor: '#222222',
                    border: '1px solid #333333',
                    borderRadius: '6px',
                    padding: '10px',
                    color: '#dddddd',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textAlign: 'left'
                  }}>
                    <Icon size={14} style={{ color: '#666666' }} />
                    <span>{act.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Marketplace Activity Timeline */}
          <div style={{
            background: '#1a1a1a',
            border: '1px solid #333333',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} style={{ color: '#888888' }} />
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Marketplace Activity Timeline</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { event: 'Plugin Installed', name: 'GA4 Analytics Sync', time: '10 mins ago', user: 'Alex Mercer' },
                { event: 'Theme Updated', name: 'NeoDark Pro', time: '1 hour ago', user: 'System Update' },
                { event: 'Prompt Imported', name: 'Cold Sales Outreach Draft', time: '3 hours ago', user: 'Jessica Patel' },
                { event: 'Template Purchased', name: 'Q3 Newsletter Campaign', time: 'Yesterday', user: 'Alex Mercer' },
                { event: 'Agency Connected', name: 'Vanguard Digital', time: '2 days ago', user: 'Tenant Owner' },
                { event: 'License Renewed', name: 'HubSpot Sync Plugin', time: '1 week ago', user: 'Billing System' }
              ].map((timeline, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #222222',
                  fontSize: '12px'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontWeight: 600, color: '#ffffff' }}>{timeline.event}</span>
                    <span style={{ fontSize: '11px', color: '#888888' }}>{timeline.name}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '11px', color: '#666666' }}>
                    <span>By: {timeline.user}</span>
                    <span>{timeline.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}

      {/* RENDER FREELANCER MARKETPLACE */}
      {activeId === 'mktplace-freelancers' && (
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Verified Independent Contractor Specialists</h3>
              <p style={{ fontSize: '12px', color: '#666666' }}>Hire top platform developers, copywriters, designers, and marketing engineers</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {freelancers.map((free, idx) => (
              <div key={idx} style={{ background: '#222222', border: '1px solid #333333', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{free.name}</h4>
                  <span style={{ fontSize: '10px', backgroundColor: '#262626', border: '1px solid #333333', padding: '2px 8px', borderRadius: '12px', color: free.status === 'Available' ? '#10b981' : '#f59e0b' }}>
                    {free.status}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#aaaaaa' }}>{free.skills}</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11.5px', borderTop: '1px solid #333333', borderBottom: '1px solid #333333', padding: '8px 0', marginTop: '4px' }}>
                  <div>
                    <span style={{ color: '#555555' }}>Hourly Rate:</span>
                    <div style={{ color: '#ffffff', fontWeight: 600 }}>{free.rate}</div>
                  </div>
                  <div>
                    <span style={{ color: '#555555' }}>Completed:</span>
                    <div style={{ color: '#aaaaaa' }}>{free.projects} Projects</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#888888', marginTop: '4px' }}>
                  <span>★ {free.rating} Rating</span>
                  <button onClick={() => {
                    setHireRequestForm({ ...hireRequestForm, freelancerName: free.name });
                    openModal('pri-mktplace-freelancers');
                  }} style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                    Send Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RENDER SERVICE MARKETPLACE */}
      {activeId === 'mktplace-services' && (
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Fixed Price Service Packages</h3>
              <p style={{ fontSize: '12px', color: '#666666' }}>Purchase custom consulting sessions, setup programs, and audit audits</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {services.map((serv, idx) => (
              <div key={idx} style={{ background: '#222222', border: '1px solid #333333', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '10px', color: '#666666', textTransform: 'uppercase', fontWeight: 600 }}>Service Bundle</span>
                <h4 style={{ fontSize: '14.5px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{serv.title}</h4>
                <div style={{ fontSize: '12px', color: '#aaaaaa' }}>Provider: <strong>{serv.provider}</strong></div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11.5px', borderTop: '1px solid #333333', borderBottom: '1px solid #333333', padding: '8px 0' }}>
                  <div>
                    <span style={{ color: '#555555' }}>Service Price:</span>
                    <div style={{ color: '#10b981', fontWeight: 700 }}>{serv.price}</div>
                  </div>
                  <div>
                    <span style={{ color: '#555555' }}>Timeline:</span>
                    <div style={{ color: '#ffffff' }}>{serv.delivery}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#888888' }}>
                  <span>★ {serv.rating}</span>
                  <button onClick={() => {
                    setRequestServiceForm({ ...requestServiceForm, serviceTitle: serv.title });
                    openModal('pri-mktplace-services');
                  }} style={{ backgroundColor: '#cccccc', color: '#111111', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                    Order Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RENDER INFLUENCER MARKETPLACE */}
      {activeId === 'mktplace-influencers' && (
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>Influencer & Content Creator Outreach Directory</h3>
              <p style={{ fontSize: '12px', color: '#666666' }}>Partner with top content creators to grow campaigns</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {influencers.map((infl, idx) => (
              <div key={idx} style={{ background: '#222222', border: '1px solid #333333', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '14.5px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{infl.name}</h4>
                  <span style={{ fontSize: '9px', backgroundColor: '#333333', border: '1px solid #444444', padding: '1px 6px', borderRadius: '4px', color: '#a855f7' }}>
                    {infl.platform}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#aaaaaa' }}>Niche: <strong>{infl.niche}</strong></div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11.5px', borderTop: '1px solid #333333', borderBottom: '1px solid #333333', padding: '8px 0' }}>
                  <div>
                    <span style={{ color: '#555555' }}>Audience:</span>
                    <div style={{ color: '#ffffff', fontWeight: 600 }}>{infl.followers}</div>
                  </div>
                  <div>
                    <span style={{ color: '#555555' }}>Rate Post:</span>
                    <div style={{ color: '#ffffff', fontWeight: 600 }}>{infl.price}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#888888' }}>
                  <span>★ {infl.rate}</span>
                  <button onClick={() => {
                    setConnectInfluencerForm({ ...connectInfluencerForm, influencerName: infl.name });
                    openModal('pri-mktplace-influencers');
                  }} style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================
          MODALS & FORMS
          ==================================================== */}

      {/* DASHBOARD: PUBLISH EXTENSION */}
      <Modal isOpen={!!modalState['sec-mktplace-dashboard']} onClose={() => closeModal('sec-mktplace-dashboard')} title="Publish Extension to Marketplace">
        <form onSubmit={handlePublishExt} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Extension Asset Name</label>
            <input type="text" required placeholder="e.g. PayPal Checkout" value={extensionForm.name} onChange={(e) => setExtensionForm({ ...extensionForm, name: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Asset Category Type</label>
            <select value={extensionForm.type} onChange={(e) => setExtensionForm({ ...extensionForm, type: e.target.value })} style={selectStyle}>
              <option value="Plugin">Plugin extension</option>
              <option value="Theme">UI Theme stylesheet</option>
              <option value="Template">Marketing Campaign Template</option>
              <option value="AI Prompt">AI Prompt Kit</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Short Sales Pitch / Description</label>
            <input type="text" required placeholder="Enter short asset overview..." value={extensionForm.desc} onChange={(e) => setExtensionForm({ ...extensionForm, desc: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Monthly Licensing Cost (USD) - Leave blank for Free</label>
            <input type="number" placeholder="e.g. 19 (Free if blank)" value={extensionForm.price} onChange={(e) => setExtensionForm({ ...extensionForm, price: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('sec-mktplace-dashboard')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Submit Extension</button>
          </div>
        </form>
      </Modal>

      {/* DASHBOARD: BROWSE MARKETPLACE */}
      <Modal isOpen={!!modalState['pri-mktplace-dashboard']} onClose={() => closeModal('pri-mktplace-dashboard')} title="Explore Extensions Directory">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Browse available integrations categorized across multiple channels.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Marketing & Campaigns', 'CRM Sync Connectors', 'Billing & Checkout Gateways', 'AI Assistant Model Prompt Kits', 'Sleek UI Themes'].map((cat, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#161b22', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }} onClick={() => closeModal('pri-mktplace-dashboard')}>
                <span>{cat}</span>
                <span style={{ color: '#6366f1' }}>Browse →</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button onClick={() => closeModal('pri-mktplace-dashboard')} style={btnPrimaryStyle}>Close Browse</button>
          </div>
        </div>
      </Modal>

      {/* PLUGINS: SDK UTILITIES */}
      <Modal isOpen={!!modalState['sec-mktplace-plugins']} onClose={() => closeModal('sec-mktplace-plugins')} title="Kiaan OS Plugin SDK Starter Tools">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px', color: '#9ca3af' }}>
          <p style={{ margin: 0 }}>Bootstrap custom plugin modules using our secure organization SDK interfaces.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#161b22', borderRadius: '6px' }}>
              <span>Plugin CLI Compiler (v3.2.1)</span>
              <button onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: 'CLI installer script copied!' }))} style={{ border: 'none', backgroundColor: '#333333', color: '#ffffff', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', cursor: 'pointer' }}>Copy script</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#161b22', borderRadius: '6px' }}>
              <span>Vite Integration Plugin Boilerplate</span>
              <button onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Boilerplate zip download started!' }))} style={{ border: 'none', backgroundColor: '#333333', color: '#ffffff', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', cursor: 'pointer' }}>Download Starter</button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button onClick={() => closeModal('sec-mktplace-plugins')} style={btnPrimaryStyle}>Close Window</button>
          </div>
        </div>
      </Modal>

      {/* PLUGINS: UPLOAD ZIP */}
      <Modal isOpen={!!modalState['pri-mktplace-plugins']} onClose={() => closeModal('pri-mktplace-plugins')} title="Upload Custom Integration Plugin">
        <form onSubmit={handleUploadPluginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Plugin Name</label>
            <input type="text" required placeholder="e.g. Razorpay Payment Gateway" value={pluginForm.name} onChange={(e) => setPluginForm({ ...pluginForm, name: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Plugin Category</label>
            <select value={pluginForm.category} onChange={(e) => setPluginForm({ ...pluginForm, category: e.target.value })} style={selectStyle}>
              <option value="CRM Integration">CRM Sync Integration</option>
              <option value="Billing Gateway">Billing Gateway API</option>
              <option value="Marketing Automation">Marketing Automations</option>
              <option value="Developer Utility">Developer Utilities</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Licensing Type</label>
            <select value={pluginForm.license} onChange={(e) => setPluginForm({ ...pluginForm, license: e.target.value })} style={selectStyle}>
              <option value="Free">Free (Open Source)</option>
              <option value="Commercial">Commercial (Licensing Needed)</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Upload Zip package (.zip)</label>
            <input type="file" required style={inputStyle} accept=".zip" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('pri-mktplace-plugins')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Upload & Deploy</button>
          </div>
        </form>
      </Modal>

      {/* THEMES: THEME GUIDELINES */}
      <Modal isOpen={!!modalState['sec-mktplace-themes']} onClose={() => closeModal('sec-mktplace-themes')} title="UI Theme styling Guidelines">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#9ca3af' }}>
          <p style={{ margin: 0 }}>Follow theme design patterns to keep UI layouts clean and responsive.</p>
          <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Colors must map dynamically using css variables (e.g. <code>var(--primary)</code>, <code>var(--bg-card)</code>).</li>
            <li>Fully custom themes must pass accessibility contrasts (W3C AA contrast ratings).</li>
            <li>Layout components must support viewport heights and responsive breakpoints down to 320px width.</li>
          </ul>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button onClick={() => closeModal('sec-mktplace-themes')} style={btnPrimaryStyle}>Understand Guidelines</button>
          </div>
        </div>
      </Modal>

      {/* THEMES: UPLOAD THEME */}
      <Modal isOpen={!!modalState['pri-mktplace-themes']} onClose={() => closeModal('pri-mktplace-themes')} title="Upload Premium Stylesheet Theme">
        <form onSubmit={handleUploadThemeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Theme Name</label>
            <input type="text" required placeholder="e.g. Aurora Glow" value={themeForm.name} onChange={(e) => setThemeForm({ ...themeForm, name: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Target Industry Niche</label>
            <select value={themeForm.industry} onChange={(e) => setThemeForm({ ...themeForm, industry: e.target.value })} style={selectStyle}>
              <option value="Tech & SaaS">Tech & SaaS startups</option>
              <option value="E-commerce">E-commerce stores</option>
              <option value="Finance & Legal">Corporate & Enterprise</option>
              <option value="Agency & Creative">Creative Agency</option>
            </select>
          </div>
          <div style={switchContainerStyle}>
            <span style={{ fontSize: '12px', color: '#f3f4f6' }}>Supports dark mode</span>
            <input type="checkbox" checked={themeForm.dark} onChange={(e) => setThemeForm({ ...themeForm, dark: e.target.checked })} style={{ width: '18px', height: '18px' }} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Upload CSS Theme Bundle (.css)</label>
            <input type="file" required style={inputStyle} accept=".css" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('pri-mktplace-themes')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Register Theme</button>
          </div>
        </form>
      </Modal>

      {/* TEMPLATES: SUBMIT TEMPLATE */}
      <Modal isOpen={!!modalState['sec-mktplace-templates']} onClose={() => closeModal('sec-mktplace-templates')} title="Submit Campaign Template Bundle">
        <form onSubmit={handleUploadTemplateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Template Name</label>
            <input type="text" required placeholder="e.g. Christmas Email Sequence" value={templateForm.name} onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Template Channel Category</label>
            <select value={templateForm.cat} onChange={(e) => setTemplateForm({ ...templateForm, cat: e.target.value })} style={selectStyle}>
              <option value="Landing Pages">Landing Pages layouts</option>
              <option value="Email Templates">Email sequence kits</option>
              <option value="Workflow Templates">Automation triggers workflows</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Upload Template JSON package (.json)</label>
            <input type="file" required style={inputStyle} accept=".json" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('sec-mktplace-templates')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Submit Template</button>
          </div>
        </form>
      </Modal>

      {/* TEMPLATES: DUPLICATE TEMPLATE */}
      <Modal isOpen={!!modalState['pri-mktplace-templates']} onClose={() => closeModal('pri-mktplace-templates')} title="Clone / Duplicate Campaign Layout">
        <form onSubmit={(e) => { e.preventDefault(); closeModal('pri-mktplace-templates'); window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Template cloned into default workspace!' })); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Select Source Template</label>
            <select style={selectStyle}>
              {templates.map((t, i) => <option key={i} value={t.name}>{t.name}</option>)}
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Cloned Template Copy Name</label>
            <input type="text" required placeholder="e.g. My SaaS Lead Gen Landing Page" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('pri-mktplace-templates')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Clone template</button>
          </div>
        </form>
      </Modal>

      {/* PROMPTS: PROMPT ENGINE */}
      <Modal isOpen={!!modalState['sec-mktplace-prompts']} onClose={() => closeModal('sec-mktplace-prompts')} title="Configure Prompt Engine Preset">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#9ca3af' }}>
          <p style={{ margin: 0 }}>Configure system context variables for custom automated AI prompt calls.</p>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Default System Instructions Profile</label>
            <textarea placeholder="e.g. You are a copywriter that writes concise, professional sentences..." style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Temperature slider</label>
              <select style={selectStyle}>
                <option value="0.2">Deterministic (0.2)</option>
                <option value="0.7">Creative Balance (0.7)</option>
                <option value="1.0">Unpredictable (1.0)</option>
              </select>
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Response Max Tokens</label>
              <input type="number" defaultValue="2000" style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', gap: '8px' }}>
            <button type="button" onClick={() => closeModal('sec-mktplace-prompts')} style={btnSecondaryStyle}>Close</button>
            <button onClick={() => { closeModal('sec-mktplace-prompts'); window.dispatchEvent(new CustomEvent('show-toast', { detail: 'AI Prompt configuration synced!' })); }} style={btnPrimaryStyle}>Apply configurations</button>
          </div>
        </div>
      </Modal>

      {/* PROMPTS: PUBLISH PROMPT */}
      <Modal isOpen={!!modalState['pri-mktplace-prompts']} onClose={() => closeModal('pri-mktplace-prompts')} title="Publish Custom AI Prompt Kit">
        <form onSubmit={handlePublishPromptSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Prompt Title</label>
            <input type="text" required placeholder="e.g. Google Ads Headline Optimizer" value={promptForm.name} onChange={(e) => setPromptForm({ ...promptForm, name: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>LLM Compatibility Profile</label>
            <select value={promptForm.comp} onChange={(e) => setPromptForm({ ...promptForm, comp: e.target.value })} style={selectStyle}>
              <option value="GPT-4o">GPT-4o (OpenAI)</option>
              <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet (Anthropic)</option>
              <option value="Gemini 1.5 Pro">Gemini 1.5 Pro (Google)</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Prompt Context Template Text</label>
            <textarea required placeholder="Paste your structured instructions here..." style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('pri-mktplace-prompts')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Publish Prompt Kit</button>
          </div>
        </form>
      </Modal>

      {/* AGENCIES: REQUEST RFP */}
      <Modal isOpen={!!modalState['sec-mktplace-agencies']} onClose={() => closeModal('sec-mktplace-agencies')} title="Submit Request for Proposal (RFP)">
        <form onSubmit={handleRequestAgencySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Project Campaign Title</label>
            <input type="text" required placeholder="e.g. Q4 SEO Strategy Overhaul" value={rfpForm.projectTitle} onChange={(e) => setRfpForm({ ...rfpForm, projectTitle: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Project requirements brief</label>
            <textarea required placeholder="Outline your deliverables, goals, and team expectations..." style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={rfpForm.desc} onChange={(e) => setRfpForm({ ...rfpForm, desc: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Target budget range (USD)</label>
              <input type="text" required placeholder="e.g. $5k - $10k" value={rfpForm.budget} onChange={(e) => setRfpForm({ ...rfpForm, budget: e.target.value })} style={inputStyle} />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Target timeline</label>
              <select value={rfpForm.timeline} onChange={(e) => setRfpForm({ ...rfpForm, timeline: e.target.value })} style={selectStyle}>
                <option value="15 Days">15 Days</option>
                <option value="30 Days">30 Days</option>
                <option value="60 Days">60 Days</option>
                <option value="Continuous">Continuous / Ongoing</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('sec-mktplace-agencies')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Submit Proposal</button>
          </div>
        </form>
      </Modal>

      {/* AGENCIES: BECOME PARTNER */}
      <Modal isOpen={!!modalState['pri-mktplace-agencies']} onClose={() => closeModal('pri-mktplace-agencies')} title="Become Certified Agency Partner">
        <form onSubmit={handleBecomePartnerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Agency / Company Name</label>
            <input type="text" required placeholder="e.g. Apex Marketing Group" value={agencyForm.name} onChange={(e) => setAgencyForm({ ...agencyForm, name: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Core Specialty Area</label>
            <input type="text" required placeholder="e.g. Shopify SEO & Conversions" value={agencyForm.spec} onChange={(e) => setAgencyForm({ ...agencyForm, spec: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Starting Price Model</label>
              <input type="text" required value={agencyForm.price} onChange={(e) => setAgencyForm({ ...agencyForm, price: e.target.value })} style={inputStyle} />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Office Location</label>
              <input type="text" placeholder="e.g. Toronto, Canada" value={agencyForm.loc} onChange={(e) => setAgencyForm({ ...agencyForm, loc: e.target.value })} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('pri-mktplace-agencies')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Register Agency</button>
          </div>
        </form>
      </Modal>

      {/* INSTALLED: UPLOAD PACK */}
      <Modal isOpen={!!modalState['sec-mktplace-installed']} onClose={() => closeModal('sec-mktplace-installed')} title="Upload Offline Custom Pack">
        <form onSubmit={handleUploadCustomPackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Package / Module Name</label>
            <input type="text" required placeholder="e.g. Local WhatsApp Proxy" value={customPackForm.name} onChange={(e) => setCustomPackForm({ ...customPackForm, name: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Extension Type</label>
              <select value={customPackForm.type} onChange={(e) => setCustomPackForm({ ...customPackForm, type: e.target.value })} style={selectStyle}>
                <option value="Plugin">Plugin extension</option>
                <option value="Theme">UI Theme</option>
                <option value="Template">Campaign template</option>
              </select>
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Build Version</label>
              <input type="text" required value={customPackForm.version} onChange={(e) => setCustomPackForm({ ...customPackForm, version: e.target.value })} style={inputStyle} />
            </div>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Upload package zip (.zip)</label>
            <input type="file" required style={inputStyle} accept=".zip" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('sec-mktplace-installed')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Install pack</button>
          </div>
        </form>
      </Modal>

      {/* INSTALLED: CHECK UPDATES */}
      <Modal isOpen={!!modalState['pri-mktplace-installed']} onClose={() => closeModal('pri-mktplace-installed')} title="Check for Extension updates">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}>
          {checkingUpdates ? (
            <>
              <div style={{ width: '32px', height: '32px', border: '3px solid #333333', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <p style={{ fontSize: '13px', color: '#9ca3af', margin: '8px 0 0 0' }}>Scanning installed assets database repository...</p>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#10b981' }}>
                <ShieldCheck size={28} />
                <h4 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Updates search ready</h4>
              </div>
              <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0, textAlign: 'center' }}>Check for security updates or compatibilities patches on the remote asset index.</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => closeModal('pri-mktplace-installed')} style={btnSecondaryStyle}>Cancel</button>
                <button onClick={triggerCheckUpdates} style={btnPrimaryStyle}>Start scan</button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* PURCHASES: ADD PAYMENT METHOD */}
      <Modal isOpen={!!modalState['sec-mktplace-purchases']} onClose={() => closeModal('sec-mktplace-purchases')} title="Attach Payment Credit Card">
        <form onSubmit={handleAddPaymentMethod} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Visa', 'Mastercard', 'Amex'].map(brand => (
              <div key={brand} onClick={() => setNewPaymentMethod({ ...newPaymentMethod, brand })} style={{ flex: 1, padding: '10px', backgroundColor: '#161b22', border: newPaymentMethod.brand === brand ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                {brand}
              </div>
            ))}
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Cardholder Name</label>
            <input type="text" required placeholder="John Doe" style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Credit Card Number</label>
            <input type="text" required maxLength={16} placeholder="4242 4242 4242 4242" value={newPaymentMethod.cardNumber} onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, cardNumber: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Expiration Date</label>
              <input type="text" required placeholder="MM/YY" value={newPaymentMethod.exp} onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, exp: e.target.value })} style={inputStyle} />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>CVC / Security Code</label>
              <input type="password" required maxLength={3} placeholder="•••" value={newPaymentMethod.cvc} onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, cvc: e.target.value })} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('sec-mktplace-purchases')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Attach Card</button>
          </div>
        </form>
      </Modal>

      {/* PURCHASES: EXPORT INVOICES */}
      <Modal isOpen={!!modalState['pri-mktplace-purchases']} onClose={() => closeModal('pri-mktplace-purchases')} title="Export Invoices ledger log">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#9ca3af' }}>
          <p style={{ margin: 0 }}>Review the purchases logs and keys database prior to ledger download.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
              <thead>
                <tr>
                  <th style={{ ...tableHead, padding: '4px' }}>Invoice</th>
                  <th style={{ ...tableHead, padding: '4px' }}>Item</th>
                  <th style={{ ...tableHead, padding: '4px' }}>Cost</th>
                </tr>
              </thead>
              <tbody>
                {purchasesData.map((p, idx) => (
                  <tr key={idx}>
                    <td style={{ ...tableCell, padding: '6px 4px', fontWeight: 600 }}>{p.id}</td>
                    <td style={{ ...tableCell, padding: '6px 4px' }}>{p.item.split(' ')[0]}...</td>
                    <td style={{ ...tableCell, padding: '6px 4px', color: '#10b981' }}>{p.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button onClick={() => closeModal('pri-mktplace-purchases')} style={btnSecondaryStyle}>Cancel</button>
            <button onClick={handleExportInvoices} style={btnPrimaryStyle}>Export Invoices CSV</button>
          </div>
        </div>
      </Modal>

      {/* FAVORITES: SHARE WISHLIST */}
      <Modal isOpen={!!modalState['sec-mktplace-favorites']} onClose={() => closeModal('sec-mktplace-favorites')} title="Share Pinned Extension Wishlist">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Copy the secure link below to share your bookmarked asset collection with teammates or managers.</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" readOnly value={`http://localhost:5174/marketplace/wishlist/share_${Date.now()}`} style={{ ...inputStyle, flex: 1 }} />
            <button onClick={() => { window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Wishlist URL copied to clipboard!' })); closeModal('sec-mktplace-favorites'); }} style={{ ...btnPrimaryStyle, padding: '10px 14px' }}>Copy Link</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button onClick={() => closeModal('sec-mktplace-favorites')} style={btnSecondaryStyle}>Cancel</button>
          </div>
        </div>
      </Modal>

      {/* FAVORITES: BROWSE DIRECTORY */}
      <Modal isOpen={!!modalState['pri-mktplace-favorites']} onClose={() => closeModal('pri-mktplace-favorites')} title="Browse Pinned Extensions">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#9ca3af' }}>
          <p style={{ margin: 0 }}>Explore additional premium elements to pin to your organizational dashboard.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['SEO Optimization Toolkits', 'WhatsApp Business APIs', 'SMS Custom Gateways'].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#161b22', borderRadius: '6px', cursor: 'pointer' }} onClick={() => closeModal('pri-mktplace-favorites')}>
                <span>{item}</span>
                <span style={{ color: '#6366f1' }}>Details →</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* FREELANCERS: REGISTER PROFILE */}
      <Modal isOpen={!!modalState['sec-mktplace-freelancers']} onClose={() => closeModal('sec-mktplace-freelancers')} title="Register as Independent Freelancer Specialist">
        <form onSubmit={handleBecomeFreelancerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Your Full Name</label>
            <input type="text" required placeholder="e.g. Liam Davies" value={freelancerForm.name} onChange={(e) => setFreelancerForm({ ...freelancerForm, name: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>List Skills (separated by commas)</label>
            <input type="text" required placeholder="e.g. React, Node.js, Custom APIs" value={freelancerForm.skills} onChange={(e) => setFreelancerForm({ ...freelancerForm, skills: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Hourly Compensation Rate (USD)</label>
            <input type="number" required placeholder="e.g. 50" value={freelancerForm.rate} onChange={(e) => setFreelancerForm({ ...freelancerForm, rate: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('sec-mktplace-freelancers')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Submit Application</button>
          </div>
        </form>
      </Modal>

      {/* FREELANCERS: HIRE CONTRACTOR */}
      <Modal isOpen={!!modalState['pri-mktplace-freelancers']} onClose={() => closeModal('pri-mktplace-freelancers')} title="Send Freelancer Job Proposal">
        <form onSubmit={handleHireFreelancerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Target Freelancer Name</label>
            <input type="text" required placeholder="Freelancer name..." value={hireRequestForm.freelancerName} onChange={(e) => setHireRequestForm({ ...hireRequestForm, freelancerName: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Project Requirements Brief</label>
            <textarea required placeholder="Outline task description, deliverables, and timelines..." style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={hireRequestForm.brief} onChange={(e) => setHireRequestForm({ ...hireRequestForm, brief: e.target.value })} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Maximum budget amount (USD)</label>
            <input type="number" required placeholder="e.g. 500" value={hireRequestForm.budget} onChange={(e) => setHireRequestForm({ ...hireRequestForm, budget: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('pri-mktplace-freelancers')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Send job offer</button>
          </div>
        </form>
      </Modal>

      {/* SERVICES: OFFER SERVICE */}
      <Modal isOpen={!!modalState['sec-mktplace-services']} onClose={() => closeModal('sec-mktplace-services')} title="Register Service package listing">
        <form onSubmit={handleOfferServiceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Service Package Title</label>
            <input type="text" required placeholder="e.g. Google Ads Setup Audit" value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Fixed service cost (USD)</label>
              <input type="number" required placeholder="e.g. 299" value={serviceForm.price} onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })} style={inputStyle} />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Delivery Duration</label>
              <select value={serviceForm.delivery} onChange={(e) => setServiceForm({ ...serviceForm, delivery: e.target.value })} style={selectStyle}>
                <option value="3 Days">3 Days</option>
                <option value="7 Days">7 Days</option>
                <option value="14 Days">14 Days</option>
                <option value="30 Days">30 Days</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('sec-mktplace-services')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Publish Service Bundle</button>
          </div>
        </form>
      </Modal>

      {/* SERVICES: REQUEST CUSTOM SERVICE */}
      <Modal isOpen={!!modalState['pri-mktplace-services']} onClose={() => closeModal('pri-mktplace-services')} title="Submit Service Request">
        <form onSubmit={handleRequestServiceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Service Title Required</label>
            <input type="text" required placeholder="e.g. HubSpot Pipeline Consulting" value={requestServiceForm.serviceTitle} onChange={(e) => setRequestServiceForm({ ...requestServiceForm, serviceTitle: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Requirements details</label>
            <textarea required placeholder="Please write what you need from the expert..." style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={requestServiceForm.details} onChange={(e) => setRequestServiceForm({ ...requestServiceForm, details: e.target.value })} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Maximum budget amount (USD)</label>
            <input type="number" required placeholder="e.g. 1000" value={requestServiceForm.budget} onChange={(e) => setRequestServiceForm({ ...requestServiceForm, budget: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('pri-mktplace-services')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Request Service</button>
          </div>
        </form>
      </Modal>

      {/* INFLUENCERS: BECOME PARTNER */}
      <Modal isOpen={!!modalState['sec-mktplace-influencers']} onClose={() => closeModal('sec-mktplace-influencers')} title="Become Creator / Influencer Partner">
        <form onSubmit={handleBecomeInfluencerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Creator Profile Name</label>
            <input type="text" required placeholder="e.g. TechVibe Reviews" value={influencerForm.name} onChange={(e) => setInfluencerForm({ ...influencerForm, name: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Platform Type</label>
              <select value={influencerForm.platform} onChange={(e) => setInfluencerForm({ ...influencerForm, platform: e.target.value })} style={selectStyle}>
                <option value="YouTube">YouTube channel</option>
                <option value="Twitter/X">Twitter/X Profile</option>
                <option value="LinkedIn/Blog">LinkedIn or Tech Blog</option>
              </select>
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Niche Category</label>
              <input type="text" required placeholder="e.g. SaaS / Startup marketing" value={influencerForm.niche} onChange={(e) => setInfluencerForm({ ...influencerForm, niche: e.target.value })} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Follower Reach Size</label>
              <input type="text" required placeholder="e.g. 150K" value={influencerForm.followers} onChange={(e) => setInfluencerForm({ ...influencerForm, followers: e.target.value })} style={inputStyle} />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Compensation per post (USD)</label>
              <input type="number" required placeholder="e.g. 400" value={influencerForm.price} onChange={(e) => setInfluencerForm({ ...influencerForm, price: e.target.value })} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('sec-mktplace-influencers')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Submit Partner profile</button>
          </div>
        </form>
      </Modal>

      {/* INFLUENCERS: CONNECT OUTREACH */}
      <Modal isOpen={!!modalState['pri-mktplace-influencers']} onClose={() => closeModal('pri-mktplace-influencers')} title="Send Influencer campaign proposal">
        <form onSubmit={handleConnectInfluencerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Target Influencer Name</label>
            <input type="text" required placeholder="Creator Name..." value={connectInfluencerForm.influencerName} onChange={(e) => setConnectInfluencerForm({ ...connectInfluencerForm, influencerName: e.target.value })} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Campaign sponsor Pitch brief</label>
            <textarea required placeholder="Describe your product sponsorship details, expectations, and dates..." style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={connectInfluencerForm.pitch} onChange={(e) => setConnectInfluencerForm({ ...connectInfluencerForm, pitch: e.target.value })} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Proposed offer budget (USD)</label>
            <input type="number" required placeholder="e.g. 600" value={connectInfluencerForm.budget} onChange={(e) => setConnectInfluencerForm({ ...connectInfluencerForm, budget: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => closeModal('pri-mktplace-influencers')} style={btnSecondaryStyle}>Cancel</button>
            <button type="submit" style={btnPrimaryStyle}>Send proposal outreach</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
