import React from 'react';
import { Network, Database, Smartphone, Globe, Link2, Key, Fingerprint, Lock } from 'lucide-react';

export const IdentityGraph: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: 'calc(100vh - 100px)' }}>
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
      }}>
        <div>
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Network size={24} color="var(--primary)" /> Identity Resolution Graph
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Visually trace how anonymous touchpoints are merged into unified customer profiles.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input type="text" placeholder="Lookup Email or Device ID..." style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 16px', color: '#fff', fontSize: '13px', width: '250px' }} />
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>Resolve Identity</button>
        </div>
      </div>

      <div className="responsive-layout" style={{ flex: 1 }}>
        {/* Graph Canvas */}
        <div className="glass-card" style={{ flex: 1, position: 'relative', overflowX: 'auto', overflowY: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          {/* Mock Node Graph */}
          <div style={{ position: 'relative', width: '600px', height: '400px' }}>
            
            {/* Center Profile Node */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(99,102,241,0.5)', border: '4px solid var(--bg-primary)' }}>
                <Fingerprint size={40} />
              </div>
              <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: 700, textAlign: 'center', backgroundColor: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                Unified Profile ID<br/>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}>u_9841x5</span>
              </div>
            </div>

            {/* Connecting Lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
              <line x1="300" y1="200" x2="150" y2="100" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="300" y1="200" x2="450" y2="100" stroke="var(--primary)" strokeWidth="2" />
              <line x1="300" y1="200" x2="150" y2="300" stroke="var(--primary)" strokeWidth="2" />
              <line x1="300" y1="200" x2="450" y2="300" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            {/* Satellite Nodes */}
            <div style={{ position: 'absolute', top: '100px', left: '150px', transform: 'translate(-50%, -50%)', zIndex: 5, textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', margin: '0 auto', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}><Globe size={20} /></div>
              <div style={{ fontSize: '11px', marginTop: '8px', color: 'var(--text-secondary)' }}>Anonymous Cookie<br/>ck_123</div>
            </div>

            <div style={{ position: 'absolute', top: '100px', left: '450px', transform: 'translate(-50%, -50%)', zIndex: 5, textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', margin: '0 auto', borderRadius: '50%', backgroundColor: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent)' }}><Database size={20} /></div>
              <div style={{ fontSize: '11px', marginTop: '8px', color: 'var(--text-secondary)' }}>CRM Lead ID<br/>ld_882</div>
            </div>

            <div style={{ position: 'absolute', top: '300px', left: '150px', transform: 'translate(-50%, -50%)', zIndex: 5, textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', margin: '0 auto', borderRadius: '50%', backgroundColor: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--success)' }}><Smartphone size={20} /></div>
              <div style={{ fontSize: '11px', marginTop: '8px', color: 'var(--text-secondary)' }}>Mobile App ID<br/>dev_xyz</div>
            </div>

            <div style={{ position: 'absolute', top: '300px', left: '450px', transform: 'translate(-50%, -50%)', zIndex: 5, textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', margin: '0 auto', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}><Key size={20} /></div>
              <div style={{ fontSize: '11px', marginTop: '8px', color: 'var(--text-secondary)' }}>Loyalty Card<br/>Unlinked</div>
            </div>

          </div>
        </div>

        {/* Resolution Rules */}
        <div className="glass-card responsive-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={18} color="var(--text-secondary)" /> Deterministic Rules
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            These keys are used to explicitly merge profiles when a match is found.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><Link2 size={14} color="var(--primary)" /> Email Address</div>
              <div style={{ width: '36px', height: '20px', borderRadius: '10px', backgroundColor: 'var(--primary)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '2px', right: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#fff' }}></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><Link2 size={14} color="var(--primary)" /> Phone Number</div>
              <div style={{ width: '36px', height: '20px', borderRadius: '10px', backgroundColor: 'var(--primary)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '2px', right: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#fff' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}><Link2 size={14} color="var(--text-muted)" /> Browser Fingerprint</div>
              <div style={{ width: '36px', height: '20px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '2px', left: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--text-muted)' }}></div>
              </div>
            </div>
          </div>
          
          <button className="btn btn-secondary" style={{ marginTop: 'auto' }}>Add Custom Key</button>
        </div>
      </div>
    </div>
  );
};
