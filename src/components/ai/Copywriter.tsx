import React, { useState } from 'react';
import { PenTool, Check, FileText, Sparkles, Copy, Download } from 'lucide-react';

interface CopywriterProps {
  activeId?: string;
}

export const Copywriter: React.FC<CopywriterProps> = ({ activeId = 'aicontent-copywriter' }) => {
  const [content, setContent] = useState('');
  
  // Dynamic Title based on ID
  const getTitle = () => {
    switch(activeId) {
      case 'aicontent-blog': return 'AI Blog Writer';
      case 'aicontent-press': return 'AI Press Release Generator';
      case 'aicontent-social': return 'AI Social Media Content';
      case 'aicontent-script': return 'AI Script Generator';
      case 'aicontent-newsletter': return 'AI Newsletter Builder';
      case 'aicontent-podcast': return 'AI Podcast Content';
      case 'aicontent-translation': return 'AI Translation';
      case 'aicontent-grammar': return 'AI Grammar checker';
      case 'aicontent-personalization': return 'AI Content Personalization';
      case 'aicreative-cta': return 'AI CTA Generator';
      case 'aicreative-product-desc': return 'Product Description Generator';
      case 'aicreative-ad-variations': return 'AI Ad Variations';
      default: return 'AI Copywriter Engine';
    }
  };

  const getTypes = () => {
    switch(activeId) {
      case 'aicontent-blog': return ['Blog Outline', 'Full Post', 'Listicles', 'How-to Guide'];
      case 'aicontent-social': return ['Twitter Thread', 'LinkedIn Post', 'Instagram Caption'];
      case 'aicreative-cta': return ['SaaS CTA', 'E-commerce CTA', 'Newsletter Signup'];
      case 'aicontent-translation': return ['English to Spanish', 'English to French', 'English to German'];
      case 'aicontent-podcast': return ['Podcast Script', 'Show Notes', 'Guest Questions'];
      default: return ['Facebook Ad Copy', 'Google Ad Headline', 'Email Newsletter', 'Blog Post Outline', 'Product Description'];
    }
  };
  
  const mockGenerate = () => {
    setContent('Unlock the full potential of your marketing with Ad Network OS. Designed for modern growth teams, our platform unifies CRM, AI Content Generation, and deep analytics into a single, seamless workspace. Say goodbye to fragmented data and hello to hyper-personalized campaigns that convert. Start your 14-day free trial today and experience the future of digital marketing.');
  };

  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Settings Panel */}
      <div className="glass-card responsive-sidebar-wide" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <PenTool size={20} color="var(--accent)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>{getTitle()}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Content Type</label>
          <select style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }}>
            {getTypes().map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Target Audience</label>
          <input type="text" placeholder="e.g. B2B SaaS Founders, 25-45" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Tone of Voice</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Professional', 'Witty', 'Urgent', 'Friendly', 'Luxury'].map(tone => (
              <span key={tone} style={{ padding: '6px 12px', backgroundColor: tone === 'Professional' ? 'rgba(168,85,247,0.1)' : 'rgba(255,255,255,0.05)', color: tone === 'Professional' ? 'var(--accent)' : 'var(--text-secondary)', border: tone === 'Professional' ? '1px solid var(--accent)' : '1px solid var(--border-color)', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>
                {tone}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Key Value Proposition (Optional)</label>
          <textarea rows={3} placeholder="What makes your product unique?" style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px', resize: 'none' }} />
        </div>

        <button className="btn btn-primary" onClick={mockGenerate} style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px', background: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)' }}>
          <Sparkles size={16} /> Generate Copy
        </button>
      </div>

      {/* Right Output Editor */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--primary)" /> Editor
          </h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Copy size={14} /> Copy</button>
            <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Download size={14} /> Save</button>
          </div>
        </div>

        <textarea 
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Your AI generated copy will appear here. You can edit it freely..."
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '15px',
            lineHeight: 1.6,
            resize: 'none',
            outline: 'none',
            fontFamily: 'inherit'
          }}
        />
        
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
          <span>Words: {content.split(' ').filter(Boolean).length}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--success)' }}>
            <Check size={14} /> Plagiarism Check Passed
          </div>
        </div>
      </div>
    </div>
  );
};
