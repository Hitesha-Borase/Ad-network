import React, { useState } from 'react';
import { Share2, Sparkles, Image as ImageIcon, Hash, MessageCircle, Heart, Repeat2 } from 'lucide-react';

export const AiSocialMedia: React.FC = () => {
  const [topic, setTopic] = useState('New feature launch: Predictive Analytics');

  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Settings Panel */}
      <div className="glass-card responsive-sidebar-wide" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <Share2 size={20} color="var(--info)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Social Campaign Studio</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Topic or URL</label>
          <textarea 
            rows={3}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', color: 'var(--text-primary)', fontSize: '13px', resize: 'none' }} 
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Include Media</label>
          <div style={{ border: '1px dashed var(--border-color)', borderRadius: '8px', padding: '24px', textAlign: 'center', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <ImageIcon size={24} color="var(--text-muted)" style={{ margin: '0 auto 8px auto' }} />
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Upload image or video</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Brand Voice</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ padding: '6px 12px', backgroundColor: 'var(--info)', color: '#fff', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>Engaging</span>
            <span style={{ padding: '6px 12px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>Professional</span>
            <span style={{ padding: '6px 12px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>Humorous</span>
          </div>
        </div>

        <button style={{ width: '100%', marginTop: 'auto', padding: '12px', borderRadius: '8px', background: 'linear-gradient(45deg, var(--info), var(--primary))', color: '#fff', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
          <Sparkles size={16} /> Generate Multi-Platform Posts
        </button>
      </div>

      {/* Right Canvas: Social Previews */}
      <div className="responsive-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
        
        {/* Twitter Mockup */}
        <div className="glass-card" style={{ padding: '24px', maxWidth: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>Acme Corp</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>@acmecorp</div>
              </div>
            </div>
            <div style={{ color: '#1DA1F2' }}><Hash size={20} /></div>
          </div>
          <div style={{ fontSize: '15px', lineHeight: 1.5, marginBottom: '16px' }}>
            Say goodbye to guesswork. 🛑<br/><br/>
            Today we're launching Predictive Analytics natively inside Ad Network OS. See which campaigns will convert BEFORE you spend a dime. 💸<br/><br/>
            Early access available now 👇<br/>
            #AdTech #PredictiveAI #Marketing
          </div>
          <div style={{ width: '100%', height: '200px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '16px' }}></div>
          <div style={{ display: 'flex', gap: '32px', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MessageCircle size={18} /> 24</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Repeat2 size={18} /> 12</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Heart size={18} /> 148</div>
          </div>
        </div>

        {/* LinkedIn Mockup */}
        <div className="glass-card" style={{ padding: '24px', maxWidth: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: 'var(--primary)' }}></div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>Acme Corp</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>50,214 followers</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>1h • 🌐</div>
              </div>
            </div>
            <div style={{ color: '#0A66C2', fontWeight: 600, fontSize: '20px' }}>in</div>
          </div>
          <div style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
            We are thrilled to announce the rollout of our highly anticipated Predictive Analytics engine.<br/><br/>
            For the past 6 months, our engineering team has been working closely with 50 enterprise partners to build an AI model that accurately predicts ROAS with 94% accuracy.<br/><br/>
            "This completely changes how we plan our Q4 budgets," said one beta user.<br/><br/>
            Read the full engineering breakdown on our blog and request early access today.
          </div>
          <div style={{ width: '100%', height: '300px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', marginBottom: '16px' }}></div>
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Heart size={18} /> Like</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MessageCircle size={18} /> Comment</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Repeat2 size={18} /> Repost</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Share2 size={18} /> Send</div>
          </div>
        </div>

      </div>
    </div>
  );
};
