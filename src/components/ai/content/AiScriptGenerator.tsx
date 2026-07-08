import React from 'react';
import { Film, Sparkles, Clock, MonitorPlay, Clapperboard, Video } from 'lucide-react';

export const AiScriptGenerator: React.FC = () => {
  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Settings Panel */}
      <div className="glass-card responsive-sidebar-wide" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <Film size={20} color="var(--danger)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Video Script Studio</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Video Concept</label>
          <textarea rows={4} placeholder="What is this video about?" defaultValue="A 30-second ad for our new AI Marketing OS, focusing on how much time it saves media buyers." style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', color: 'var(--text-primary)', fontSize: '13px', resize: 'none' }} />
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}><MonitorPlay size={14} style={{ display: 'inline', marginRight: '4px' }}/> Format</label>
            <select style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }}>
              <option>YouTube Ad (16:9)</option>
              <option>TikTok / Reels (9:16)</option>
              <option>Explainer Video</option>
            </select>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}><Clock size={14} style={{ display: 'inline', marginRight: '4px' }}/> Length</label>
            <select style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }}>
              <option>30 Seconds</option>
              <option>15 Seconds</option>
              <option>60 Seconds</option>
            </select>
          </div>
        </div>

        <button style={{ width: '100%', marginTop: 'auto', padding: '12px', borderRadius: '8px', background: 'linear-gradient(45deg, var(--danger), var(--warning))', color: '#fff', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
          <Sparkles size={16} /> Generate Storyboard
        </button>
      </div>

      {/* Right Canvas: Scene-by-Scene */}
      <div className="glass-card responsive-content" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Clapperboard size={20} color="var(--text-secondary)" />
          <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Ad Network OS - 30s Promo</h3>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '12px', width: '80px', fontSize: '13px' }}>SCENE</th>
                <th style={{ padding: '12px', width: '40%', fontSize: '13px' }}>VISUAL (B-ROLL)</th>
                <th style={{ padding: '12px', fontSize: '13px' }}>AUDIO (VOICEOVER & SFX)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 12px', verticalAlign: 'top', fontWeight: 600, color: 'var(--danger)' }}>01<br/><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>0:00-0:05</span></td>
                <td style={{ padding: '16px 12px', verticalAlign: 'top', fontSize: '14px', lineHeight: 1.6 }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ width: '80px', height: '60px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Video size={20} color="var(--text-muted)" /></div>
                    <div style={{ flex: 1 }}>Close up of a stressed media buyer looking at multiple chaotic spreadsheets. The lighting is slightly dark and tense.</div>
                  </div>
                </td>
                <td style={{ padding: '16px 12px', verticalAlign: 'top', fontSize: '14px', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--warning)' }}>VO:</strong> "Still managing your ad campaigns across five different tabs?"<br/><br/>
                  <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>[SFX: Sound of rapid typing and a frustrated sigh]</span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 12px', verticalAlign: 'top', fontWeight: 600, color: 'var(--danger)' }}>02<br/><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>0:05-0:15</span></td>
                <td style={{ padding: '16px 12px', verticalAlign: 'top', fontSize: '14px', lineHeight: 1.6 }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ width: '80px', height: '60px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Video size={20} color="var(--text-muted)" /></div>
                    <div style={{ flex: 1 }}>Smooth screen recording of the Ad Network OS dashboard. Bright, clean interface showing ROAS climbing.</div>
                  </div>
                </td>
                <td style={{ padding: '16px 12px', verticalAlign: 'top', fontSize: '14px', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--warning)' }}>VO:</strong> "Meet Ad Network OS. The all-in-one AI platform that predicts performance before you spend a dime."<br/><br/>
                  <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>[SFX: Upbeat, modern electronic music starts. A rewarding 'ding' sound as ROAS goes up]</span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '16px 12px', verticalAlign: 'top', fontWeight: 600, color: 'var(--danger)' }}>03<br/><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>0:15-0:30</span></td>
                <td style={{ padding: '16px 12px', verticalAlign: 'top', fontSize: '14px', lineHeight: 1.6 }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ width: '80px', height: '60px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Video size={20} color="var(--text-muted)" /></div>
                    <div style={{ flex: 1 }}>The same media buyer is now smiling, holding a coffee cup. Text appears on screen: "14-Day Free Trial".</div>
                  </div>
                </td>
                <td style={{ padding: '16px 12px', verticalAlign: 'top', fontSize: '14px', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--warning)' }}>VO:</strong> "Scale faster. Work smarter. Start your free trial today."<br/><br/>
                  <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>[SFX: Music swells to a crescendo and ends with a logo sting]</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
