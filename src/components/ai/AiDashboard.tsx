import React from 'react';
import { Sparkles, PenTool, Image as ImageIcon, Video, Monitor, MessageSquare, Briefcase, ChevronRight } from 'lucide-react';

const aiTools = [
  { id: 'copy', name: 'AI Copywriter', icon: PenTool, desc: 'Generate high-converting ad copy and emails.', color: '#ec4899', route: 'aicontent-copywriter' },
  { id: 'image', name: 'Image Generator', icon: ImageIcon, desc: 'Create custom, royalty-free brand imagery.', color: '#8b5cf6', route: 'aicreative-image' },
  { id: 'video', name: 'Video Generator', icon: Video, desc: 'Turn prompts into professional marketing videos.', color: '#f59e0b', route: 'aicreative-video' },
  { id: 'landing', name: 'Landing Page Builder', icon: Monitor, desc: 'Instantly design and deploy campaign pages.', color: '#10b981', route: 'aicontent-landing' },
  { id: 'chat', name: 'AI Chat Assistant', icon: MessageSquare, desc: 'Brainstorm strategies with your AI copilot.', color: '#0ea5e9', route: 'ai-chat' },
  { id: 'brand', name: 'Brand Assets', icon: Briefcase, desc: 'Manage your logos, fonts, and brand voice.', color: '#6366f1', route: 'aicreative-brand' },
];

export const AiDashboard: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
        border: '1px solid rgba(236, 72, 153, 0.2)',
        padding: '30px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Sparkles size={24} color="var(--primary)" />
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
            AI Creative & Content Studio
          </h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '600px', margin: 0, lineHeight: 1.5 }}>
          Your central hub for generating ad creatives, writing copy, and building campaigns with the power of next-generation generative AI.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Available AI Engines</h2>
        <div className="grid-cols-3">
          {aiTools.map(tool => (
            <div key={tool.id} className="glass-card" style={{ 
              display: 'flex', flexDirection: 'column', gap: '16px', cursor: 'pointer', transition: 'all 0.2s' 
            }} onClick={() => console.log('Navigate to', tool.route)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: `${tool.color}15`, color: tool.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <tool.icon size={20} />
                </div>
                <ChevronRight size={16} color="var(--text-muted)" />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' }}>{tool.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Recent Generations</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { title: 'Q3 Enterprise Promo Banner', type: 'Image', time: '10 mins ago', status: 'Completed' },
            { title: 'SaaS Onboarding Email Sequence', type: 'Copy', time: '1 hour ago', status: 'Completed' },
            { title: 'Product Launch Explainer', type: 'Video', time: '2 hours ago', status: 'Processing' },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  {item.type}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>{item.title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px' }}>
                <span style={{ color: item.status === 'Processing' ? 'var(--accent)' : 'var(--success)' }}>{item.status}</span>
                <span style={{ color: 'var(--text-muted)' }}>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
