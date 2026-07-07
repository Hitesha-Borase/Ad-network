import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { EmptyState } from './components/EmptyState';

// Import CRM subcomponents
import { CrmOverview } from './components/crm/CrmOverview';
import { CrmLeads } from './components/crm/CrmLeads';
import { CrmContacts } from './components/crm/CrmContacts';
import { CrmCompanies } from './components/crm/CrmCompanies';
import { CrmDeals } from './components/crm/CrmDeals';
import { CrmPipeline } from './components/crm/CrmPipeline';
import { CrmTasks } from './components/crm/CrmTasks';
import { CrmCalendar } from './components/crm/CrmCalendar';
import { CrmMeetings } from './components/crm/CrmMeetings';
import { CrmProposals } from './components/crm/CrmProposals';
import { CrmQuotes } from './components/crm/CrmQuotes';
import { CrmContracts } from './components/crm/CrmContracts';
import { CrmInvoices } from './components/crm/CrmInvoices';
import { CrmCommission } from './components/crm/CrmCommission';
import { CrmForecasting } from './components/crm/CrmForecasting';

// Lucide icons for Dashboard
import { LayoutGrid, Sparkles, Shield, ArrowRight } from 'lucide-react';

function App() {
  const [activeId, setActiveId] = useState<string>('crm-overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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

      // CRM & Sales submodules
      case 'crm-overview':
        return <CrmOverview />;
      case 'crm-leads':
        return <CrmLeads />;
      case 'crm-contacts':
        return <CrmContacts />;
      case 'crm-companies':
        return <CrmCompanies />;
      case 'crm-deals':
        return <CrmDeals />;
      case 'crm-pipeline':
        return <CrmPipeline />;
      case 'crm-tasks':
        return <CrmTasks />;
      case 'crm-calendar':
        return <CrmCalendar />;
      case 'crm-meetings':
        return <CrmMeetings />;
      case 'crm-proposals':
        return <CrmProposals />;
      case 'crm-quotes':
        return <CrmQuotes />;
      case 'crm-contracts':
        return <CrmContracts />;
      case 'crm-invoices':
        return <CrmInvoices />;
      case 'crm-commission':
        return <CrmCommission />;
      case 'crm-forecasting':
        return <CrmForecasting />;

      // Fallback empty states
      default:
        return <EmptyState activeId={activeId} setActiveId={setActiveId} />;
    }
  };

  return (
    <div className="app-container">
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
