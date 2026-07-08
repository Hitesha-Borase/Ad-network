import React from 'react';
import { Pause, SkipForward, SkipBack, MousePointer, AlertCircle, Maximize } from 'lucide-react';

export const SessionReplay: React.FC = () => {
  return (
    <div className="fade-in responsive-layout" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Session List Sidebar */}
      <div className="glass-card responsive-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 4px 0' }}>Recordings</h2>
        <input type="text" placeholder="Search by user ID or path..." style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
          {[
            { user: 'usr_8492', duration: '4m 12s', pages: 3, rageClick: true, active: true },
            { user: 'Anonymous', duration: '12m 45s', pages: 8, rageClick: false },
            { user: 'usr_1022', duration: '1m 02s', pages: 1, rageClick: false },
            { user: 'john.doe@...', duration: '8m 30s', pages: 4, rageClick: true },
          ].map((session, i) => (
            <div key={i} style={{ 
              padding: '12px', borderRadius: '8px', 
              backgroundColor: session.active ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)', 
              border: session.active ? '1px solid var(--primary)' : '1px solid var(--border-color)',
              cursor: 'pointer' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{session.user}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{session.duration}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{session.pages} pages visited</span>
                {session.rageClick && <AlertCircle size={14} color="var(--danger)" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>U</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>usr_8492</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>San Francisco, CA • Desktop Chrome</div>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Maximize size={14} /> Fullscreen</button>
        </div>

        <div style={{ flex: 1, backgroundColor: '#000', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Replay Area */}
          <div style={{ flex: 1, backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Mock website viewport inside replay */}
            <div style={{ width: '80%', height: '90%', backgroundColor: '#fff', border: '1px solid #cbd5e1', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', position: 'relative' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 800, color: '#0f172a' }}>ACME Pricing</div>
                <div style={{ display: 'flex', gap: '16px', color: '#64748b', fontSize: '12px' }}>
                  <span>Features</span><span>Pricing</span>
                </div>
              </div>
              <div style={{ padding: '40px' }}>
                <div style={{ width: '60%', height: '24px', backgroundColor: '#e2e8f0', marginBottom: '24px', borderRadius: '4px' }}></div>
                <div style={{ width: '40%', height: '16px', backgroundColor: '#e2e8f0', marginBottom: '8px', borderRadius: '4px' }}></div>
                <div style={{ width: '45%', height: '16px', backgroundColor: '#e2e8f0', marginBottom: '8px', borderRadius: '4px' }}></div>
                <div style={{ width: '30%', height: '16px', backgroundColor: '#e2e8f0', marginBottom: '40px', borderRadius: '4px' }}></div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 1, height: '200px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px' }}></div>
                  <div style={{ flex: 1, height: '200px', backgroundColor: '#f1f5f9', border: '2px solid #3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button style={{ padding: '12px 24px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600 }}>Buy Now</button>
                  </div>
                </div>
              </div>
              
              {/* Mock Mouse Cursor */}
              <MousePointer size={24} color="#000" style={{ position: 'absolute', top: '50%', left: '70%', transform: 'translate(-50%, -50%)', filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))', zIndex: 100 }} />
              {/* Mock Click Ripple */}
              <div style={{ position: 'absolute', top: '50%', left: '70%', transform: 'translate(-10px, -10px)', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(239,68,68,0.5)', animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
            </div>
          </div>

          {/* Timeline and Controls */}
          <div style={{ height: '90px', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', position: 'relative', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '45%', backgroundColor: 'var(--primary)' }}></div>
              <div style={{ position: 'absolute', top: '-4px', left: '45%', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 0 4px rgba(0,0,0,0.5)' }}></div>
              
              {/* Event Markers */}
              <div title="Form Filled" style={{ position: 'absolute', top: 0, left: '20%', height: '100%', width: '4px', backgroundColor: 'var(--success)' }}></div>
              <div title="Rage Click" style={{ position: 'absolute', top: 0, left: '45%', height: '100%', width: '4px', backgroundColor: 'var(--danger)' }}></div>
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><SkipBack size={20} /></button>
                <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Pause size={20} />
                </button>
                <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><SkipForward size={20} /></button>
                <span style={{ fontSize: '13px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>01:54 / 04:12</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <select style={{ backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', padding: '4px 8px', fontSize: '12px' }}>
                  <option>1x Speed</option>
                  <option>1.5x Speed</option>
                  <option>2x Speed</option>
                </select>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <input type="checkbox" defaultChecked /> Skip Inactivity
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
