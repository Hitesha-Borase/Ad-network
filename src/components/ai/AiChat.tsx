import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, Image as ImageIcon, Briefcase } from 'lucide-react';

export const AiChat: React.FC = () => {
  const [msg, setMsg] = useState('');

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', gap: '16px' }}>
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
        border: '1px solid rgba(14, 165, 233, 0.2)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <Bot size={24} color="var(--info)" />
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Marketing Copilot</h2>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Powered by advanced LLM. Ask me to draft emails, analyze data, or build strategies.</p>
        </div>
      </div>

      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* AI Message */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Bot size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Marketing Copilot</div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '12px', borderTopLeftRadius: 0, padding: '16px', fontSize: '14px', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                Hi there! I'm your dedicated AI marketing assistant. I can help you:
                <ul style={{ paddingLeft: '20px', marginTop: '12px', marginBottom: 0 }}>
                  <li>Generate high-converting ad copy</li>
                  <li>Analyze your latest campaign performance</li>
                  <li>Draft email sequences for lead nurturing</li>
                  <li>Brainstorm new campaign strategies</li>
                </ul>
                <br/>
                What would you like to work on today?
              </div>
            </div>
          </div>

          {/* User Message */}
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'row-reverse' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <User size={18} />
            </div>
            <div className="responsive-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>You</div>
              <div style={{ backgroundColor: 'var(--primary)', color: '#fff', borderRadius: '12px', borderTopRightRadius: 0, padding: '12px 16px', fontSize: '14px', lineHeight: 1.5, maxWidth: '80%' }}>
                Can you give me 3 headline ideas for a B2B SaaS product focused on marketing automation?
              </div>
            </div>
          </div>

          {/* AI Message */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Bot size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Marketing Copilot</div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '12px', borderTopLeftRadius: 0, padding: '16px', fontSize: '14px', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                Absolutely! Here are three high-impact headline ideas for your B2B SaaS marketing automation product:
                <br/><br/>
                <strong>1. "Put Your Pipeline on Autopilot"</strong><br/>
                <em>Focuses on the core benefit of reducing manual work.</em><br/><br/>
                <strong>2. "Scale Your Campaigns, Not Your Headcount"</strong><br/>
                <em>Addresses the common pain point of scaling without increasing overhead costs.</em><br/><br/>
                <strong>3. "Turn Every Touchpoint into a Conversion Engine"</strong><br/>
                <em>Highlights the performance and optimization capabilities of your platform.</em>
                <br/><br/>
                Would you like me to draft some supporting sub-headlines for one of these?
              </div>
            </div>
          </div>
          
        </div>

        {/* Input Area */}
        <div style={{ borderTop: '1px solid var(--border-color)', padding: '20px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px' }}>
            <textarea 
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Ask Copilot anything..."
              rows={2}
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none', resize: 'none', fontSize: '14px', fontFamily: 'inherit', paddingRight: '48px' }}
            />
            <div style={{ display: 'flex', gap: '8px', paddingBottom: '4px' }}>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Sparkles size={18} /></button>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><ImageIcon size={18} /></button>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Briefcase size={18} /></button>
              <button className="btn btn-primary btn-sm" style={{ padding: '8px', borderRadius: '8px' }}>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
