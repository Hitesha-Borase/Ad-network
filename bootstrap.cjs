const fs = require('fs');
const path = require('path');

const components = {
  ai: [
    { name: 'AiDashboard', title: 'AI Studio Dashboard', desc: 'Overview of all AI generation tools and agents.' },
    { name: 'AiChat', title: 'AI Chat Assistant', desc: 'Chat with our advanced LLM models to generate ideas and strategies.' },
    { name: 'BannerGenerator', title: 'AI Banner Generator', desc: 'Create high-converting ad banners instantly.' },
    { name: 'VideoGenerator', title: 'AI Video Generator', desc: 'Generate marketing videos from text prompts.' },
    { name: 'ImageGenerator', title: 'AI Image Generator', desc: 'Create unique, royalty-free images for your campaigns.' },
    { name: 'LandingPageGenerator', title: 'Landing Page Generator', desc: 'Instantly build optimized landing pages.' },
    { name: 'Copywriter', title: 'AI Copywriter', desc: 'Generate copy for ads, emails, and blogs.' },
    { name: 'BrandAssets', title: 'Brand Assets', desc: 'Manage your logos, fonts, and brand voice.' },
    { name: 'AiAgentsList', title: 'AI Agents Fleet', desc: 'Deploy autonomous agents to manage your workflows.' }
  ],
  automation: [
    { name: 'WorkflowBuilder', title: 'Workflow Builder', desc: 'Design complex automation sequences visually.' },
    { name: 'TriggersActions', title: 'Triggers & Actions', desc: 'Manage the events that start your workflows.' },
    { name: 'Webhooks', title: 'Webhooks Manager', desc: 'Connect internal tools with external services.' },
    { name: 'Scheduler', title: 'Job Scheduler', desc: 'Schedule reports, emails, and campaign launches.' }
  ],
  analytics: [
    { name: 'AnalyticsDashboard', title: 'Executive Analytics', desc: 'High-level overview of business performance.' },
    { name: 'RevenueReports', title: 'Revenue Reports', desc: 'Detailed breakdown of sales and revenue streams.' },
    { name: 'FunnelAnalysis', title: 'Funnel Analysis', desc: 'Track drop-offs across your conversion funnels.' },
    { name: 'Heatmaps', title: 'Website Heatmaps', desc: 'Visualize where users click, scroll, and move.' },
    { name: 'SessionReplay', title: 'Session Replays', desc: 'Watch recordings of user interactions.' },
    { name: 'Attribution', title: 'Multi-Touch Attribution', desc: 'Understand which channels drive conversions.' },
    { name: 'AiInsights', title: 'AI Insights', desc: 'Automated discoveries and anomalies in your data.' }
  ],
  cdp: [
    { name: 'Customer360', title: 'Customer 360', desc: 'Unified view of individual customer profiles.' },
    { name: 'IdentityGraph', title: 'Identity Graph', desc: 'Map cross-device behavior to unified users.' },
    { name: 'AudienceBuilder', title: 'Audience Builder', desc: 'Create dynamic audience segments.' },
    { name: 'Segments', title: 'Active Segments', desc: 'Manage and sync segments to ad platforms.' }
  ]
};

const baseDir = path.join(__dirname, 'src', 'components');

const template = (name, title, desc) => `import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const ` + name + `: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '30px'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
          ` + title + `
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '600px', margin: 0 }}>
          ` + desc + `
        </p>
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ 
          width: '64px', height: '64px', borderRadius: '16px', 
          backgroundColor: 'rgba(99,102,241,0.1)', color: 'var(--primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
        }}>
          <Sparkles size={32} />
        </div>
        <h2 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 12px 0' }}>Module Initialized</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '400px', margin: '0 0 24px 0' }}>
          The structure for the ` + title + ` module is ready. Future updates will bring full AI and integration capabilities to this view.
        </p>
        <button className="btn btn-primary" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', margin: '0 auto' }}>
          Configure Settings <ArrowRight size={14} style={{ marginLeft: '8px' }} />
        </button>
      </div>
    </div>
  );
};
`;

Object.entries(components).forEach(([folder, files]) => {
  const dirPath = path.join(baseDir, folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  files.forEach(file => {
    const filePath = path.join(dirPath, file.name + '.tsx');
    fs.writeFileSync(filePath, template(file.name, file.title, file.desc));
    console.log('Created ' + filePath);
  });
});
