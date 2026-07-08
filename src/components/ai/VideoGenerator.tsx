import React from 'react';
import { Video, Play, Music, Mic, Download, Film } from 'lucide-react';

export const VideoGenerator: React.FC = () => {
  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Left Settings Panel */}
      <div className="glass-card responsive-sidebar-wide" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <Video size={20} color="var(--info)" />
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>AI Video Studio</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Script / Storyboard</label>
          <textarea rows={5} defaultValue="[Scene 1: Fast paced montage of marketing data] \nAre you tired of manually tracking campaigns? \n[Scene 2: Dashboard UI glowing] \nMeet Ad Network OS. The all-in-one AI platform." style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', color: 'var(--text-primary)', fontSize: '13px', resize: 'none' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Voiceover (TTS)</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }}>
              <option>Marcus - Deep, Professional</option>
              <option>Sarah - Energetic, Friendly</option>
              <option>No Voiceover</option>
            </select>
            <button className="btn btn-secondary" style={{ padding: '0 12px' }}><Mic size={16} /></button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Background Music</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }}>
              <option>Corporate Tech Upbeat</option>
              <option>Chill Lo-Fi</option>
              <option>Epic Cinematic</option>
            </select>
            <button className="btn btn-secondary" style={{ padding: '0 12px' }}><Music size={16} /></button>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Format</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary" style={{ flex: 1, padding: '8px', background: 'rgba(99,102,241,0.1)', color: 'var(--primary)', border: '1px solid var(--primary)' }}>16:9 Landscape</button>
            <button className="btn btn-secondary" style={{ flex: 1, padding: '8px' }}>9:16 Vertical</button>
          </div>
        </div>

        <button className="btn btn-primary" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px' }}>
          <Film size={16} /> Render Video
        </button>
      </div>

      {/* Right Canvas */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Video Preview</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Download size={14} /> Export MP4</button>
          </div>
        </div>

        <div style={{ flex: 1, backgroundColor: '#000', borderRadius: '12px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          {/* Mock Video Player */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5 }}></div>
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
            
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10,
              boxShadow: '0 8px 24px rgba(99,102,241,0.5)'
            }}>
              <Play size={36} style={{ marginLeft: '6px' }} />
            </div>

            {/* Subtitles mock */}
            <div style={{ position: 'absolute', bottom: '10%', left: 0, right: 0, textAlign: 'center', zIndex: 10 }}>
              <span style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff', padding: '4px 12px', fontSize: '24px', fontWeight: 700, borderRadius: '4px' }}>
                Are you tired of manually tracking campaigns?
              </span>
            </div>
          </div>

          {/* Timeline UI */}
          <div style={{ height: '80px', backgroundColor: 'rgba(255,255,255,0.05)', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '35%', backgroundColor: 'var(--primary)' }}></div>
              <div style={{ position: 'absolute', top: '-4px', left: '35%', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.5)', cursor: 'pointer' }}></div>
            </div>
            <div style={{ flex: 1, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Play size={16} color="#fff" cursor="pointer" />
              <span style={{ fontSize: '12px', color: '#aaa', fontFamily: 'monospace' }}>00:12 / 00:30</span>
              
              {/* Timeline blocks */}
              <div style={{ flex: 1, display: 'flex', gap: '4px', height: '40px' }}>
                <div style={{ flex: 2, backgroundColor: 'rgba(99,102,241,0.3)', borderRadius: '4px', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff' }}>Scene 1</div>
                <div style={{ flex: 3, backgroundColor: 'rgba(168,85,247,0.3)', borderRadius: '4px', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff' }}>Scene 2</div>
                <div style={{ flex: 1, backgroundColor: 'rgba(16,185,129,0.3)', borderRadius: '4px', border: '1px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff' }}>CTA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
