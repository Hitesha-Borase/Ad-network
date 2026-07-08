import React, { useState } from 'react';
import {
  Heart, TrendingUp, Home, BookOpen, Car, Plane, Hotel, ShoppingCart,
  Layers, Gamepad2, DollarSign, Truck, Factory, Landmark, HandHeart,
  Users, BarChart2, Globe, Shield, Zap, CheckCircle2, AlertTriangle,
  Clock, ArrowUp, ArrowDown, Target, Star, Package, Wifi, Activity,
  MapPin, Phone, Mail, Calendar, Plus, Download, ChevronRight, Bell
} from 'lucide-react';

// ─── SHARED UTILITIES ────────────────────────────────────────────
const StatCard = ({ label, value, change, color, icon }: { label: string; value: string; change?: string; color: string; icon: React.ReactNode }) => (
  <div className="glass-card" style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
    <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '22px', fontWeight: 800 }}>{value}</div>
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{label}</div>
      {change && <div style={{ fontSize: '11px', color: change.startsWith('+') ? '#10b981' : '#ef4444', marginTop: '2px', fontWeight: 600 }}>{change} vs last month</div>}
    </div>
  </div>
);

const SectionHeader = ({ icon, title, subtitle, accentColor, badge }: { icon: React.ReactNode; title: string; subtitle: string; accentColor: string; badge?: string }) => {
  const handleGetStarted = () => {
    // Show a success toast that onboarding has started
    window.dispatchEvent(new CustomEvent('show-toast', { detail: `Initializing ${title} workspace...` }));
    // Navigate to the dashboard
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }));
  };

  return (
    <div className="glass-card" style={{ padding: '24px', background: `linear-gradient(135deg, ${accentColor}18 0%, ${accentColor}08 100%)`, border: `1px solid ${accentColor}30`, display: 'flex', alignItems: 'center', gap: '18px' }}>
      <div style={{ width: 54, height: 54, borderRadius: '14px', background: `${accentColor}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, fontSize: '28px', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>{title}</h1>
          {badge && <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', backgroundColor: `${accentColor}20`, color: accentColor, fontWeight: 600 }}>{badge}</span>}
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>{subtitle}</p>
      </div>
      <button onClick={handleGetStarted} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', backgroundColor: accentColor, color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>Get Started</button>
    </div>
  );
};

const QuickActionBar = ({ actions }: { actions: { label: string; icon: React.ReactNode }[] }) => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    {actions.map((a, i) => (
      <button key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
        {a.icon} {a.label}
      </button>
    ))}
  </div>
);

// ─── 1. HEALTHCARE ───────────────────────────────────────────────
export const IndustryHealthcare: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = ['overview', 'campaigns', 'compliance', 'analytics'];

  const campaigns = [
    { name: 'Patient Acquisition – Cardiology', status: 'Active', leads: 1240, cpl: '$34', reach: '89K', channel: 'Search + Display' },
    { name: 'Telehealth Awareness Campaign', status: 'Active', leads: 876, cpl: '$22', reach: '142K', channel: 'Social + Video' },
    { name: 'Annual Wellness Checkup Drive', status: 'Paused', leads: 412, cpl: '$18', reach: '55K', channel: 'Email + SMS' },
    { name: 'Mental Health Services', status: 'Active', leads: 654, cpl: '$28', reach: '72K', channel: 'Display + Native' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Heart size={26} />} title="Healthcare Solutions" subtitle="HIPAA-compliant patient acquisition, provider marketing, and health system growth tools built for modern healthcare organizations." accentColor="#ef4444" badge="HIPAA Ready" />
      <QuickActionBar actions={[{ label: 'New Patient Campaign', icon: <Plus size={14} /> }, { label: 'HIPAA Audit', icon: <Shield size={14} /> }, { label: 'Export Report', icon: <Download size={14} /> }, { label: 'ROI Calculator', icon: <TrendingUp size={14} /> }]} />

      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '0' }}>
        {tabs.map(t => <button key={t} onClick={() => setActiveTab(t)} style={{ padding: '10px 18px', border: 'none', borderBottom: `2px solid ${activeTab === t ? '#ef4444' : 'transparent'}`, backgroundColor: 'transparent', color: activeTab === t ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px', fontWeight: activeTab === t ? 600 : 400, textTransform: 'capitalize', transition: 'all 0.15s' }}>{t}</button>)}
      </div>

      {activeTab === 'overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
            <StatCard label="New Patients (MTD)" value="3,241" change="+18%" color="#ef4444" icon={<Users size={20} />} />
            <StatCard label="Avg Cost per Lead" value="$26.40" change="-8%" color="#10b981" icon={<TrendingUp size={20} />} />
            <StatCard label="Appointment Bookings" value="1,892" change="+24%" color="#6366f1" icon={<Calendar size={20} />} />
            <StatCard label="ROAS" value="4.8x" change="+0.6x" color="#f59e0b" icon={<BarChart2 size={20} />} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
            <div className="glass-card">
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '16px' }}>Active Patient Acquisition Campaigns</div>
              {campaigns.map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < campaigns.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{c.channel}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '13px' }}>
                    <div style={{ textAlign: 'right' }}><div style={{ fontWeight: 700 }}>{c.leads}</div><div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Leads</div></div>
                    <div style={{ textAlign: 'right' }}><div style={{ fontWeight: 700 }}>{c.cpl}</div><div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>CPL</div></div>
                    <div style={{ textAlign: 'right' }}><div style={{ fontWeight: 700 }}>{c.reach}</div><div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Reach</div></div>
                    <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', backgroundColor: c.status === 'Active' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: c.status === 'Active' ? '#10b981' : '#f59e0b' }}>{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card">
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '14px' }}>HIPAA Compliance Status</div>
              {[
                { label: 'Data Encryption (AES-256)', ok: true },
                { label: 'BAA Agreements in Place', ok: true },
                { label: 'PHI Access Logging', ok: true },
                { label: 'Audit Trail Enabled', ok: true },
                { label: 'Cookie Consent Configured', ok: true },
                { label: 'Annual Risk Assessment', ok: false },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 5 ? '1px solid var(--border-color)' : 'none' }}>
                  {item.ok ? <CheckCircle2 size={16} style={{ color: '#10b981' }} /> : <AlertTriangle size={16} style={{ color: '#f59e0b' }} />}
                  <span style={{ fontSize: '13px', color: item.ok ? 'var(--text-primary)' : '#f59e0b' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'campaigns' && (
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600 }}>All Healthcare Campaigns</span>
            <button style={{ padding: '7px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#ef4444', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Plus size={14} /> New Campaign</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Campaign', 'Status', 'Leads', 'CPL', 'Reach', 'Channel'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
            <tbody>{campaigns.map((c, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 500 }}>{c.name}</td><td style={{ padding: '13px 16px' }}><span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', backgroundColor: c.status === 'Active' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: c.status === 'Active' ? '#10b981' : '#f59e0b' }}>{c.status}</span></td><td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600 }}>{c.leads}</td><td style={{ padding: '13px 16px', fontSize: '13px' }}>{c.cpl}</td><td style={{ padding: '13px 16px', fontSize: '13px' }}>{c.reach}</td><td style={{ padding: '13px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{c.channel}</td></tr>)}</tbody>
          </table>
        </div>
      )}

      {(activeTab === 'compliance' || activeTab === 'analytics') && (
        <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
          <Heart size={40} style={{ color: '#ef4444', marginBottom: '12px' }} />
          <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Healthcare {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Full {activeTab} dashboard for healthcare campaigns. Configure your health system's settings to unlock detailed insights.</div>
        </div>
      )}
    </div>
  );
};

// ─── 2. FINANCE ──────────────────────────────────────────────────
export const IndustryFinance: React.FC = () => {
  const products = [
    { name: 'Personal Loans Campaign', leads: 3420, cpl: '$42', approval: '68%', volume: '$2.4M' },
    { name: 'Credit Card Acquisition', leads: 2180, cpl: '$38', approval: '54%', volume: '$1.8M' },
    { name: 'Mortgage Refinance', leads: 890, cpl: '$95', approval: '72%', volume: '$44M' },
    { name: 'Investment Accounts', leads: 1240, cpl: '$61', approval: '81%', volume: '$8.2M' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<TrendingUp size={26} />} title="Finance & Banking Solutions" subtitle="Compliant financial services marketing with lead scoring, fraud prevention, and regulatory-ready ad campaigns for banks, fintechs, and insurance companies." accentColor="#10b981" badge="FINRA Compliant" />
      <QuickActionBar actions={[{ label: 'Create Financial Ad', icon: <Plus size={14} /> }, { label: 'Fraud Monitor', icon: <Shield size={14} /> }, { label: 'Lead Scoring', icon: <Target size={14} /> }, { label: 'Compliance Check', icon: <CheckCircle2 size={14} /> }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Total Leads (MTD)" value="7,730" change="+12%" color="#10b981" icon={<Users size={20} />} />
        <StatCard label="Avg CPL" value="$59.20" change="-6%" color="#6366f1" icon={<TrendingUp size={20} />} />
        <StatCard label="Loan Volume Generated" value="$56.4M" change="+31%" color="#f59e0b" icon={<DollarSign size={20} />} />
        <StatCard label="Approval Rate" value="68.8%" change="+4%" color="#ef4444" icon={<CheckCircle2 size={20} />} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '14px' }}>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Financial Product Performance</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Product', 'Leads', 'CPL', 'Approval Rate', 'Volume'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
            <tbody>{products.map((p, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 500 }}>{p.name}</td>
              <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 700 }}>{p.leads.toLocaleString()}</td>
              <td style={{ padding: '12px 16px', fontSize: '13px' }}>{p.cpl}</td>
              <td style={{ padding: '12px 16px' }}><span style={{ color: '#10b981', fontWeight: 700, fontSize: '13px' }}>{p.approval}</span></td>
              <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#10b981' }}>{p.volume}</td>
            </tr>)}</tbody>
          </table>
        </div>
        <div className="glass-card">
          <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '14px' }}>Compliance Alerts</div>
          {[
            { msg: 'Disclaimer text required on loan ads', level: 'warning' },
            { msg: 'APR disclosure missing on 3 creatives', level: 'error' },
            { msg: 'FINRA pre-approval for new broker ad', level: 'warning' },
            { msg: 'All investment ads reviewed ✓', level: 'ok' },
          ].map((a, i) => (
            <div key={i} style={{ padding: '10px 12px', marginBottom: '8px', borderRadius: '8px', backgroundColor: a.level === 'error' ? 'rgba(239,68,68,0.08)' : a.level === 'warning' ? 'rgba(245,158,11,0.08)' : 'rgba(16,185,129,0.08)', border: `1px solid ${a.level === 'error' ? 'rgba(239,68,68,0.2)' : a.level === 'warning' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)'}`, fontSize: '12px', color: a.level === 'error' ? '#ef4444' : a.level === 'warning' ? '#f59e0b' : '#10b981' }}>
              {a.msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── 3. REAL ESTATE ──────────────────────────────────────────────
export const IndustryRealEstate: React.FC = () => {
  const listings = [
    { name: 'Luxury Condos – Manhattan', type: 'Residential', leads: 234, cpl: '$78', views: '14K', price: '$2.4M avg' },
    { name: 'Commercial Office Space – Chicago', type: 'Commercial', leads: 89, cpl: '$142', views: '6.2K', price: '$4.8M avg' },
    { name: 'Suburban Family Homes – Dallas', type: 'Residential', leads: 412, cpl: '$45', views: '31K', price: '$485K avg' },
    { name: 'Vacation Rentals – Miami', type: 'Rental', leads: 178, cpl: '$32', views: '22K', price: '$3,200/mo' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Home size={26} />} title="Real Estate Solutions" subtitle="Hyper-local property marketing with dynamic listing ads, neighborhood targeting, virtual tour integrations, and MLS-connected lead pipelines." accentColor="#f59e0b" badge="MLS Connected" />
      <QuickActionBar actions={[{ label: 'New Listing Ad', icon: <Plus size={14} /> }, { label: 'Geo Targeting', icon: <MapPin size={14} /> }, { label: 'Virtual Tour', icon: <Globe size={14} /> }, { label: 'Lead Pipeline', icon: <ChevronRight size={14} /> }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Active Listings Promoted" value="1,284" change="+22%" color="#f59e0b" icon={<Home size={20} />} />
        <StatCard label="Property Leads (MTD)" value="913" change="+17%" color="#6366f1" icon={<Users size={20} />} />
        <StatCard label="Avg Cost Per Lead" value="$74.20" change="-11%" color="#10b981" icon={<TrendingUp size={20} />} />
        <StatCard label="Deals Influenced" value="$128M" change="+38%" color="#ef4444" icon={<DollarSign size={20} />} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Active Property Campaigns</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Property', 'Type', 'Leads', 'CPL', 'Views', 'Avg Price'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
          <tbody>{listings.map((l, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600 }}>{l.name}</td>
            <td style={{ padding: '13px 16px' }}><span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', backgroundColor: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>{l.type}</span></td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700 }}>{l.leads}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{l.cpl}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{l.views}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', color: '#10b981', fontWeight: 600 }}>{l.price}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

// ─── 4. EDUCATION ────────────────────────────────────────────────
export const IndustryEducation: React.FC = () => {
  const programs = [
    { name: 'MBA Program Enrollment', enrolled: 412, cpe: '$180', completion: '82%', channel: 'Search + LinkedIn' },
    { name: 'Online Coding Bootcamp', enrolled: 1240, cpe: '$65', completion: '74%', channel: 'Social + Video' },
    { name: 'Professional Certification', enrolled: 892, cpe: '$42', completion: '91%', channel: 'Email + Display' },
    { name: 'K-12 Parent Outreach', enrolled: 2110, cpe: '$18', completion: 'N/A', channel: 'Social + SMS' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<BookOpen size={26} />} title="Education Solutions" subtitle="Student acquisition, enrollment marketing, and alumni engagement campaigns for universities, edtech platforms, and K-12 institutions." accentColor="#6366f1" badge="FERPA Compliant" />
      <QuickActionBar actions={[{ label: 'Enrollment Campaign', icon: <Plus size={14} /> }, { label: 'Student Segments', icon: <Users size={14} /> }, { label: 'Course Analytics', icon: <BarChart2 size={14} /> }, { label: 'Parent Portal', icon: <Globe size={14} /> }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Total Enrollments" value="4,654" change="+28%" color="#6366f1" icon={<BookOpen size={20} />} />
        <StatCard label="Cost Per Enrollment" value="$76.40" change="-14%" color="#10b981" icon={<TrendingUp size={20} />} />
        <StatCard label="Avg Completion Rate" value="82.4%" change="+6%" color="#f59e0b" icon={<CheckCircle2 size={20} />} />
        <StatCard label="Revenue Influenced" value="$18.2M" change="+41%" color="#ef4444" icon={<DollarSign size={20} />} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Program Enrollment Performance</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Program', 'Enrollments', 'Cost/Enrollment', 'Completion', 'Channel'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
          <tbody>{programs.map((p, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600 }}>{p.name}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700 }}>{p.enrolled.toLocaleString()}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{p.cpe}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', color: '#10b981', fontWeight: 600 }}>{p.completion}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{p.channel}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

// ─── 5. AUTOMOTIVE ───────────────────────────────────────────────
export const IndustryAutomotive: React.FC = () => {
  const inventory = [
    { model: 'Tesla Model 3', type: 'EV', leads: 892, testDrives: 214, sold: 48, cpl: '$34' },
    { model: 'Toyota Camry 2025', type: 'Sedan', leads: 1240, testDrives: 388, sold: 92, cpl: '$22' },
    { model: 'Ford F-150 Raptor', type: 'Truck', leads: 672, testDrives: 198, sold: 61, cpl: '$41' },
    { model: 'BMW X5 2025', type: 'SUV', leads: 411, testDrives: 134, sold: 29, cpl: '$68' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Car size={26} />} title="Automotive Solutions" subtitle="Vehicle-specific ad campaigns, VIN-level dynamic ads, dealer inventory management, and test drive lead generation for auto dealerships and OEMs." accentColor="#6366f1" badge="VIN Targeting" />
      <QuickActionBar actions={[{ label: 'Inventory Ads', icon: <Car size={14} /> }, { label: 'Test Drive Leads', icon: <Calendar size={14} /> }, { label: 'VIN Campaigns', icon: <Target size={14} /> }, { label: 'Dealer Portal', icon: <Globe size={14} /> }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Vehicle Leads (MTD)" value="3,215" change="+19%" color="#6366f1" icon={<Car size={20} />} />
        <StatCard label="Test Drives Booked" value="934" change="+28%" color="#10b981" icon={<Calendar size={20} />} />
        <StatCard label="Units Sold" value="230" change="+15%" color="#f59e0b" icon={<CheckCircle2 size={20} />} />
        <StatCard label="Revenue Attributed" value="$8.4M" change="+33%" color="#ef4444" icon={<DollarSign size={20} />} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Vehicle Inventory Performance</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Model', 'Type', 'Leads', 'Test Drives', 'Units Sold', 'CPL'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
          <tbody>{inventory.map((v, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600 }}>{v.model}</td>
            <td style={{ padding: '13px 16px' }}><span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', backgroundColor: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>{v.type}</span></td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700 }}>{v.leads}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{v.testDrives}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#10b981' }}>{v.sold}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{v.cpl}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

// ─── 6. TRAVEL ───────────────────────────────────────────────────
export const IndustryTravel: React.FC = () => {
  const destinations = [
    { dest: 'Maldives — Luxury Resort', bookings: 412, revenue: '$824K', cpa: '$58', roas: '6.2x' },
    { dest: 'Paris — Honeymoon Package', bookings: 289, revenue: '$578K', cpa: '$72', roas: '5.8x' },
    { dest: 'Japan — Cultural Tour', bookings: 534, revenue: '$267K', cpa: '$31', roas: '4.4x' },
    { dest: 'New York — City Break', bookings: 891, revenue: '$445K', cpa: '$22', roas: '7.1x' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Plane size={26} />} title="Travel & Tourism Solutions" subtitle="Dynamic destination ads, seasonal campaign automation, OTA bidding strategies, and travel intent audience targeting for airlines, hotels, and tour operators." accentColor="#06b6d4" badge="GDS Connected" />
      <QuickActionBar actions={[{ label: 'Destination Campaign', icon: <Plane size={14} /> }, { label: 'Seasonal Automation', icon: <Zap size={14} /> }, { label: 'Booking Analytics', icon: <BarChart2 size={14} /> }, { label: 'Audience Builder', icon: <Users size={14} /> }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Bookings (MTD)" value="2,126" change="+34%" color="#06b6d4" icon={<Plane size={20} />} />
        <StatCard label="Revenue Attributed" value="$2.1M" change="+28%" color="#10b981" icon={<DollarSign size={20} />} />
        <StatCard label="Avg ROAS" value="5.9x" change="+0.8x" color="#f59e0b" icon={<TrendingUp size={20} />} />
        <StatCard label="Avg CPA" value="$45.80" change="-12%" color="#6366f1" icon={<Target size={20} />} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Destination Performance</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Destination', 'Bookings', 'Revenue', 'CPA', 'ROAS'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
          <tbody>{destinations.map((d, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600 }}>{d.dest}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700 }}>{d.bookings}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#10b981' }}>{d.revenue}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{d.cpa}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#06b6d4' }}>{d.roas}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

// ─── 7. HOSPITALITY ──────────────────────────────────────────────
export const IndustryHospitality: React.FC = () => {
  const properties = [
    { name: 'Grand Hyatt NYC', rooms: 892, occ: '87%', adr: '$428', revpar: '$372', directBookings: 412 },
    { name: 'Marriott Miami Beach', rooms: 1240, occ: '91%', adr: '$312', revpar: '$284', directBookings: 678 },
    { name: 'Hilton Chicago Downtown', rooms: 680, occ: '78%', adr: '$265', revpar: '$207', directBookings: 289 },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Hotel size={26} />} title="Hospitality Solutions" subtitle="Hotel direct booking campaigns, OTA competitive bidding, RevPAR optimization, and guest loyalty retargeting for hotels, resorts, and hospitality chains." accentColor="#8b5cf6" badge="OTA Integrated" />
      <QuickActionBar actions={[{ label: 'Direct Booking Campaign', icon: <Plus size={14} /> }, { label: 'OTA Bidding', icon: <TrendingUp size={14} /> }, { label: 'Guest Retargeting', icon: <Target size={14} /> }, { label: 'RevPAR Report', icon: <BarChart2 size={14} /> }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Direct Bookings" value="1,379" change="+22%" color="#8b5cf6" icon={<Hotel size={20} />} />
        <StatCard label="Avg Occupancy" value="85.3%" change="+8%" color="#10b981" icon={<Activity size={20} />} />
        <StatCard label="Avg RevPAR" value="$287" change="+15%" color="#f59e0b" icon={<DollarSign size={20} />} />
        <StatCard label="OTA Commission Saved" value="$124K" change="+44%" color="#06b6d4" icon={<TrendingUp size={20} />} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Property Performance</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Property', 'Rooms', 'Occupancy', 'ADR', 'RevPAR', 'Direct Bookings'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
          <tbody>{properties.map((p, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600 }}>{p.name}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{p.rooms}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#10b981' }}>{p.occ}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{p.adr}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#8b5cf6' }}>{p.revpar}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700 }}>{p.directBookings}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

// ─── 8. E-COMMERCE ───────────────────────────────────────────────
export const IndustryEcommerce: React.FC = () => {
  const categories = [
    { cat: 'Fashion & Apparel', revenue: '$1.2M', roas: '7.4x', cac: '$18', orders: 8921, aov: '$134' },
    { cat: 'Electronics', revenue: '$2.8M', roas: '5.1x', cac: '$34', orders: 4210, aov: '$665' },
    { cat: 'Health & Beauty', revenue: '$890K', roas: '8.2x', cac: '$12', orders: 6432, aov: '$138' },
    { cat: 'Home & Garden', revenue: '$640K', roas: '4.9x', cac: '$28', orders: 2890, aov: '$221' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<ShoppingCart size={26} />} title="E-Commerce Solutions" subtitle="Full-funnel ecommerce advertising with dynamic product ads, shopping feed optimization, cart abandonment recovery, and AI-powered product recommendations." accentColor="#f59e0b" badge="Shopify + WooCommerce" />
      <QuickActionBar actions={[{ label: 'Shopping Campaign', icon: <ShoppingCart size={14} /> }, { label: 'Cart Recovery', icon: <Bell size={14} /> }, { label: 'Product Feed', icon: <Package size={14} /> }, { label: 'ROAS Report', icon: <BarChart2 size={14} /> }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Total Revenue" value="$5.5M" change="+38%" color="#f59e0b" icon={<DollarSign size={20} />} />
        <StatCard label="Avg ROAS" value="6.4x" change="+1.2x" color="#10b981" icon={<TrendingUp size={20} />} />
        <StatCard label="Orders Attributed" value="22,453" change="+24%" color="#6366f1" icon={<ShoppingCart size={20} />} />
        <StatCard label="Avg Order Value" value="$245" change="+9%" color="#ef4444" icon={<Star size={20} />} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Category Performance</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Category', 'Revenue', 'ROAS', 'CAC', 'Orders', 'AOV'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
          <tbody>{categories.map((c, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600 }}>{c.cat}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#10b981' }}>{c.revenue}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#f59e0b' }}>{c.roas}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{c.cac}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{c.orders.toLocaleString()}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{c.aov}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

// ─── 9. SaaS ─────────────────────────────────────────────────────
export const IndustrySaaS: React.FC = () => {
  const funnels = [
    { stage: 'Free Trial Starts', count: 8921, pct: 100 },
    { stage: 'Feature Activated', count: 6234, pct: 69.9 },
    { stage: 'Paid Conversion', count: 1784, pct: 20.0 },
    { stage: 'Expansion (Upsell)', count: 712, pct: 7.9 },
    { stage: 'Annual Upgrade', count: 398, pct: 4.5 },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Layers size={26} />} title="SaaS Solutions" subtitle="Product-led growth campaigns, trial-to-paid conversion optimization, MRR expansion advertising, and B2B SaaS lead generation with intent-based targeting." accentColor="#6366f1" badge="PLG Ready" />
      <QuickActionBar actions={[{ label: 'Trial Campaign', icon: <Zap size={14} /> }, { label: 'Retarget Churned', icon: <Bell size={14} /> }, { label: 'MRR Analytics', icon: <BarChart2 size={14} /> }, { label: 'Expansion Ads', icon: <TrendingUp size={14} /> }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="MRR Influenced" value="$2.84M" change="+22%" color="#6366f1" icon={<DollarSign size={20} />} />
        <StatCard label="Trial Starts" value="8,921" change="+31%" color="#10b981" icon={<Users size={20} />} />
        <StatCard label="Trial → Paid Rate" value="20%" change="+4%" color="#f59e0b" icon={<TrendingUp size={20} />} />
        <StatCard label="LTV:CAC Ratio" value="4.8x" change="+0.7x" color="#ef4444" icon={<Star size={20} />} />
      </div>

      <div className="glass-card">
        <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '20px' }}>Product-Led Growth Funnel</div>
        {funnels.map((f, i) => (
          <div key={i} style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
              <span style={{ fontWeight: 600 }}>{f.stage}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{f.count.toLocaleString()} · <span style={{ fontWeight: 700, color: f.pct > 50 ? '#10b981' : f.pct > 15 ? '#f59e0b' : '#ef4444' }}>{f.pct}%</span></span>
            </div>
            <div style={{ height: '28px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${f.pct}%`, background: `linear-gradient(to right, #6366f1, ${f.pct < 15 ? '#ef4444' : f.pct < 40 ? '#f59e0b' : '#10b981'})`, display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
                <span style={{ fontSize: '11px', color: '#fff', fontWeight: 600 }}>{f.pct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── 10. GAMING ──────────────────────────────────────────────────
export const IndustryGaming: React.FC = () => {
  const games = [
    { name: 'Battle Royale X', installs: 124000, ipm: '$1.12', d1: '42%', d7: '22%', arpu: '$8.40' },
    { name: 'Puzzle Quest Saga', installs: 89000, ipm: '$0.68', d1: '55%', d7: '31%', arpu: '$4.20' },
    { name: 'MMORPG Legends', installs: 34000, ipm: '$2.40', d1: '38%', d7: '19%', arpu: '$24.60' },
    { name: 'Casual City Builder', installs: 210000, ipm: '$0.42', d1: '61%', d7: '38%', arpu: '$2.80' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Gamepad2 size={26} />} title="Gaming Solutions" subtitle="Mobile game UA campaigns, playable ad creatives, D1/D7/D30 retention optimization, in-app purchase maximization, and esports sponsorship management." accentColor="#a855f7" badge="MMP Integrated" />
      <QuickActionBar actions={[{ label: 'UA Campaign', icon: <Zap size={14} /> }, { label: 'Playable Ads', icon: <Gamepad2 size={14} /> }, { label: 'Retention Report', icon: <Activity size={14} /> }, { label: 'LTV Modeling', icon: <TrendingUp size={14} /> }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Total Installs (MTD)" value="457K" change="+44%" color="#a855f7" icon={<Download size={20} />} />
        <StatCard label="Avg IPM" value="$1.16" change="-8%" color="#10b981" icon={<DollarSign size={20} />} />
        <StatCard label="D1 Retention" value="49%" change="+6%" color="#f59e0b" icon={<Activity size={20} />} />
        <StatCard label="Avg ARPU" value="$9.98" change="+18%" color="#ef4444" icon={<TrendingUp size={20} />} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Game UA Performance</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Game', 'Installs', 'IPM', 'D1 Ret.', 'D7 Ret.', 'ARPU'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
          <tbody>{games.map((g, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600 }}>{g.name}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700 }}>{g.installs.toLocaleString()}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{g.ipm}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', color: '#10b981', fontWeight: 600 }}>{g.d1}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', color: '#f59e0b', fontWeight: 600 }}>{g.d7}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#a855f7' }}>{g.arpu}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

// ─── 11. iGAMING ─────────────────────────────────────────────────
export const IndustryIGaming: React.FC = () => (
  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <SectionHeader icon={<DollarSign size={26} />} title="iGaming Solutions" subtitle="Age-gated, geo-compliant online gambling and sports betting ad campaigns with responsible gambling tools, regulatory compliance layers, and high-value player acquisition." accentColor="#dc2626" badge="GEO Restricted" />
    <div style={{ padding: '16px', backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <AlertTriangle size={18} style={{ color: '#ef4444' }} />
        <span style={{ fontWeight: 700, fontSize: '14px', color: '#ef4444' }}>Regulatory Notice</span>
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>iGaming campaigns are only available in jurisdictions where online gambling is legally permitted. Your account must be verified and licensed before campaigns can be activated. All ads include mandatory responsible gambling disclosures.</div>
    </div>
    <QuickActionBar actions={[{ label: 'GEO Configuration', icon: <Globe size={14} /> }, { label: 'Age Gate Setup', icon: <Shield size={14} /> }, { label: 'Player Acquisition', icon: <Users size={14} /> }, { label: 'RG Tools', icon: <Heart size={14} /> }]} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
      <StatCard label="Active GEOs" value="14" color="#dc2626" icon={<Globe size={20} />} />
      <StatCard label="FTD Registrations" value="2,841" change="+28%" color="#10b981" icon={<Users size={20} />} />
      <StatCard label="Avg CPA (FTD)" value="$68" change="-12%" color="#f59e0b" icon={<Target size={20} />} />
      <StatCard label="Player LTV" value="$1,240" change="+18%" color="#6366f1" icon={<TrendingUp size={20} />} />
    </div>
    <div className="glass-card">
      <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '14px' }}>Licensed Jurisdictions</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['🇬🇧 United Kingdom', '🇲🇹 Malta (MGA)', '🇬🇮 Gibraltar', '🇮🇪 Ireland', '🇳🇱 Netherlands', '🇩🇰 Denmark', '🇸🇪 Sweden', '🇪🇸 Spain', '🇮🇹 Italy', '🇵🇹 Portugal', '🇫🇷 France', '🇧🇪 Belgium', '🇨🇿 Czechia', '🇳🇯 New Jersey (US)'].map((g, i) => (
          <span key={i} style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', backgroundColor: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', fontWeight: 500 }}>{g}</span>
        ))}
      </div>
    </div>
  </div>
);

// ─── 12. LOGISTICS ───────────────────────────────────────────────
export const IndustryLogistics: React.FC = () => {
  const routes = [
    { route: 'US East Coast → Europe', shipments: 1240, onTime: '94%', cost: '$2.8M', co2: '1,240t' },
    { route: 'Asia Pacific → North America', shipments: 892, onTime: '91%', cost: '$4.1M', co2: '2,140t' },
    { route: 'Domestic Last-Mile (US)', shipments: 14200, onTime: '97%', cost: '$890K', co2: '420t' },
    { route: 'Middle East → South Asia', shipments: 412, onTime: '88%', cost: '$1.2M', co2: '890t' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Truck size={26} />} title="Logistics Solutions" subtitle="Fleet tracking, route optimization advertising, B2B freight acquisition, supply chain visibility campaigns, and 3PL marketing for logistics and shipping companies." accentColor="#f97316" badge="Real-time Tracking" />
      <QuickActionBar actions={[{ label: 'Fleet Campaign', icon: <Truck size={14} /> }, { label: 'Route Analytics', icon: <MapPin size={14} /> }, { label: 'B2B Leads', icon: <Users size={14} /> }, { label: 'CO2 Report', icon: <Globe size={14} /> }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Active Shipments" value="16,744" change="+14%" color="#f97316" icon={<Package size={20} />} />
        <StatCard label="On-Time Delivery" value="94.2%" change="+3%" color="#10b981" icon={<CheckCircle2 size={20} />} />
        <StatCard label="B2B Leads (MTD)" value="892" change="+21%" color="#6366f1" icon={<Users size={20} />} />
        <StatCard label="Revenue Attributed" value="$9.0M" change="+18%" color="#f59e0b" icon={<DollarSign size={20} />} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Route Performance</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Route', 'Shipments', 'On-Time', 'Cost', 'CO₂'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
          <tbody>{routes.map((r, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600 }}>{r.route}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700 }}>{r.shipments.toLocaleString()}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#10b981' }}>{r.onTime}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{r.cost}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{r.co2}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

// ─── 13. MANUFACTURING ───────────────────────────────────────────
export const IndustryManufacturing: React.FC = () => {
  const products = [
    { name: 'Industrial Automation Systems', leads: 89, mqls: 34, pipeline: '$8.4M', channel: 'LinkedIn + Trade Shows' },
    { name: 'CNC Machining Equipment', leads: 142, mqls: 58, pipeline: '$3.2M', channel: 'Search + Display' },
    { name: 'EV Battery Components', leads: 62, mqls: 29, pipeline: '$12.1M', channel: 'LinkedIn + Industry Pubs' },
    { name: 'Smart Factory IoT Sensors', leads: 211, mqls: 84, pipeline: '$5.6M', channel: 'Content + Search' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Factory size={26} />} title="Manufacturing Solutions" subtitle="B2B industrial marketing, trade show digital campaigns, distributor recruitment advertising, and technical content marketing for manufacturers and industrial suppliers." accentColor="#64748b" badge="B2B Industrial" />
      <QuickActionBar actions={[{ label: 'B2B Campaign', icon: <Factory size={14} /> }, { label: 'Trade Show Ads', icon: <Globe size={14} /> }, { label: 'Distributor Leads', icon: <Users size={14} /> }, { label: 'Pipeline Report', icon: <BarChart2 size={14} /> }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="B2B Leads (MTD)" value="504" change="+18%" color="#64748b" icon={<Users size={20} />} />
        <StatCard label="Marketing Qualified" value="205" change="+24%" color="#10b981" icon={<CheckCircle2 size={20} />} />
        <StatCard label="Pipeline Created" value="$29.3M" change="+32%" color="#f59e0b" icon={<TrendingUp size={20} />} />
        <StatCard label="Avg Deal Size" value="$142K" change="+8%" color="#6366f1" icon={<DollarSign size={20} />} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Product Line Performance</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Product Line', 'Leads', 'MQLs', 'Pipeline', 'Channel'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
          <tbody>{products.map((p, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600 }}>{p.name}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700 }}>{p.leads}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#10b981' }}>{p.mqls}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#f59e0b' }}>{p.pipeline}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{p.channel}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

// ─── 14. GOVERNMENT ──────────────────────────────────────────────
export const IndustryGovernment: React.FC = () => (
  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <SectionHeader icon={<Landmark size={26} />} title="Government Solutions" subtitle="Public sector digital outreach, citizen engagement campaigns, grant-funded awareness programs, and accessible government communication platforms." accentColor="#1d4ed8" badge="Section 508 Compliant" />
    <QuickActionBar actions={[{ label: 'Public Outreach', icon: <Globe size={14} /> }, { label: 'Accessibility Check', icon: <CheckCircle2 size={14} /> }, { label: 'Grant Campaign', icon: <DollarSign size={14} /> }, { label: 'Compliance Audit', icon: <Shield size={14} /> }]} />

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
      <StatCard label="Citizens Reached" value="2.4M" change="+18%" color="#1d4ed8" icon={<Users size={20} />} />
      <StatCard label="Service Adoption" value="78,400" change="+31%" color="#10b981" icon={<CheckCircle2 size={20} />} />
      <StatCard label="Campaign Efficiency" value="$0.04 CPR" change="-22%" color="#f59e0b" icon={<TrendingUp size={20} />} />
      <StatCard label="ADA Compliance" value="100%" color="#6366f1" icon={<Shield size={20} />} />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
      <div className="glass-card">
        <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '14px' }}>Active Public Programs</div>
        {[
          { name: 'COVID Vaccination Awareness', reach: '1.2M', status: 'Ongoing' },
          { name: 'Tax Filing Deadline Reminder', reach: '890K', status: 'Scheduled' },
          { name: 'Public Library Digital Services', reach: '240K', status: 'Active' },
          { name: 'Emergency Alert System', reach: '4.1M', status: 'On-Call' },
        ].map((p, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--border-color)' : 'none', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{p.reach} citizens</div>
            </div>
            <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', backgroundColor: 'rgba(29,78,216,0.1)', color: '#1d4ed8' }}>{p.status}</span>
          </div>
        ))}
      </div>
      <div className="glass-card">
        <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '14px' }}>Compliance Status</div>
        {[
          { label: 'Section 508 Accessibility', ok: true },
          { label: 'FedRAMP Authorization', ok: true },
          { label: 'FISMA Compliance', ok: true },
          { label: 'NIST 800-53 Controls', ok: true },
          { label: 'ATO (Authority to Operate)', ok: false },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: i < 4 ? '1px solid var(--border-color)' : 'none' }}>
            {item.ok ? <CheckCircle2 size={15} style={{ color: '#10b981' }} /> : <Clock size={15} style={{ color: '#f59e0b' }} />}
            <span style={{ fontSize: '13px' }}>{item.label}</span>
            <span style={{ marginLeft: 'auto', fontSize: '11px', color: item.ok ? '#10b981' : '#f59e0b' }}>{item.ok ? 'Compliant' : 'In Progress'}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── 15. NON-PROFIT ──────────────────────────────────────────────
export const IndustryNonProfit: React.FC = () => {
  const campaigns = [
    { name: 'Annual Giving Drive', donations: 4821, raised: '$284K', cpa: '$4.20', channel: 'Google Grant + Email' },
    { name: 'Volunteer Recruitment', leads: 892, recruited: 214, cpl: '$6.80', channel: 'Social + Display' },
    { name: 'Awareness — Climate Action', reach: '2.1M', cpc: '$0.04', engagements: '142K', channel: 'Display + Video' },
    { name: 'Corporate Sponsorship Drive', leads: 89, closed: 12, value: '$480K', channel: 'LinkedIn + Events' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<HandHeart size={26} />} title="Non-Profit Solutions" subtitle="Google Ad Grants management, donor acquisition and retention campaigns, volunteer recruitment, and impact-driven storytelling for non-profit and charitable organizations." accentColor="#10b981" badge="Google Grant Ready" />
      <QuickActionBar actions={[{ label: 'Donation Campaign', icon: <HandHeart size={14} /> }, { label: 'Google Grant Setup', icon: <Globe size={14} /> }, { label: 'Volunteer Ads', icon: <Users size={14} /> }, { label: 'Impact Report', icon: <BarChart2 size={14} /> }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Total Raised (MTD)" value="$764K" change="+42%" color="#10b981" icon={<DollarSign size={20} />} />
        <StatCard label="Donations Received" value="5,713" change="+38%" color="#6366f1" icon={<HandHeart size={20} />} />
        <StatCard label="Avg Cost Per Donor" value="$4.60" change="-18%" color="#f59e0b" icon={<TrendingUp size={20} />} />
        <StatCard label="Volunteers Recruited" value="214" change="+55%" color="#ef4444" icon={<Users size={20} />} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Campaign Performance</div>
        <div style={{ padding: '0' }}>
          {campaigns.map((c, i) => (
            <div key={i} style={{ padding: '16px 18px', borderBottom: i < campaigns.length - 1 ? '1px solid var(--border-color)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{c.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.channel}</div>
              </div>
              <div style={{ display: 'flex', gap: '24px', fontSize: '13px' }}>
                {'donations' in c && <div style={{ textAlign: 'right' }}><div style={{ fontWeight: 700, color: '#10b981' }}>{c.raised}</div><div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{c.donations} donors</div></div>}
                {'reach' in c && <div style={{ textAlign: 'right' }}><div style={{ fontWeight: 700 }}>{c.reach}</div><div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>reach</div></div>}
                {'leads' in c && 'recruited' in c && <div style={{ textAlign: 'right' }}><div style={{ fontWeight: 700 }}>{c.recruited}</div><div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{c.leads} leads</div></div>}
                {'value' in c && <div style={{ textAlign: 'right' }}><div style={{ fontWeight: 700, color: '#10b981' }}>{c.value}</div><div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{c.closed} sponsors</div></div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px', backgroundColor: 'rgba(16,185,129,0.06)', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.15)' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#10b981', marginBottom: '6px' }}>🌱 Google Ad Grants — $10,000/month in free advertising</div>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Your organization qualifies for Google Ad Grants. We manage your $10K/month grant, ensuring 100% utilization with compliant campaigns that drive donations, volunteers, and awareness.</div>
      </div>
    </div>
  );
};
