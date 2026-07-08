import React, { useState, useEffect } from 'react';
import {
  Cpu, Database, MessageSquare, BookOpen, Settings, Layers, Activity,
  DollarSign, FileCode2, Shield, Eye, TrendingUp, Zap, Search,
  CheckCircle2, AlertTriangle, Plus, Download, Clock,
  Server, Lock, History, Target, Network, Edit2, Save, X, Play, RefreshCw, BarChart
} from 'lucide-react';

// ─── SHARED UTILITIES ────────────────────────────────────────────
const StatCard = ({ label, value, change, color, icon }: { label: string; value: string; change?: string; color: string; icon: React.ReactNode }) => (
  <div className="glass-card" style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
    <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '22px', fontWeight: 800 }}>{value}</div>
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{label}</div>
      {change && <div style={{ fontSize: '11px', color: change.startsWith('+') ? '#10b981' : (change.startsWith('-') ? '#10b981' : '#ef4444'), marginTop: '2px', fontWeight: 600 }}>{change}</div>}
    </div>
  </div>
);

const SectionHeader = ({ icon, title, subtitle, accentColor, badge }: { icon: React.ReactNode; title: string; subtitle: string; accentColor: string; badge?: string }) => {
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
      <button onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: `${title} module is active and ready.` }))} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', backgroundColor: accentColor, color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
        Access Workspace
      </button>
    </div>
  );
};

const QuickActionBar = ({ actions }: { actions: { label: string; icon: React.ReactNode; onClick?: () => void }[] }) => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    {actions.map((a, i) => (
      <button key={i} onClick={a.onClick} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
        {a.icon} {a.label}
      </button>
    ))}
  </div>
);

// ─── 1. MODEL REGISTRY ───────────────────────────────────────────
export const AiMlModelRegistry: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [models, setModels] = useState([
    { id: 1, name: 'AdCopy-Generator-v2', type: 'LLM', status: 'Production', version: '2.4.1', latency: '240ms', accuracy: '94.2%' },
    { id: 2, name: 'CTR-Predictor-XGB', type: 'XGBoost', status: 'Production', version: '1.8.0', latency: '45ms', accuracy: '89.1%' },
    { id: 3, name: 'Audience-Segment-GNN', type: 'GNN', status: 'Staging', version: '3.0.0-rc2', latency: '120ms', accuracy: '91.8%' },
    { id: 4, name: 'Image-Variation-SD', type: 'Diffusion', status: 'Archived', version: '1.2.5', latency: '4.2s', accuracy: 'N/A' },
  ]);

  const deployModel = (id: number) => {
    setModels(models.map(m => m.id === id ? { ...m, status: 'Production' } : m));
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Model deployed to production successfully.' }));
  };

  const filteredModels = models.filter(m => activeTab === 'All' || m.status === activeTab);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Database size={26} />} title="Model Registry" subtitle="Centralized repository to manage, version, and deploy machine learning models across your ad network infrastructure." accentColor="#6366f1" badge="MLflow Integrated" />
      <QuickActionBar actions={[{ label: 'Register Model', icon: <Plus size={14} />, onClick: () => window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Opening model registration form...' })) }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Active Models" value={models.length.toString()} change="+2 this month" color="#6366f1" icon={<Database size={20} />} />
        <StatCard label="Total Deployments" value="142" change="+18" color="#10b981" icon={<Server size={20} />} />
        <StatCard label="Avg Inference Time" value="145ms" change="-12ms" color="#f59e0b" icon={<Activity size={20} />} />
        <StatCard label="Models in Staging" value={models.filter(m => m.status === 'Staging').length.toString()} color="#8b5cf6" icon={<Eye size={20} />} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '16px' }}>
          {['All', 'Production', 'Staging', 'Archived'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: 'none', border: 'none', color: activeTab === tab ? '#6366f1' : 'var(--text-secondary)', fontWeight: activeTab === tab ? 600 : 400, cursor: 'pointer', fontSize: '13px' }}>{tab}</button>
          ))}
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Model Name', 'Type', 'Status', 'Version', 'Latency', 'Accuracy', 'Actions'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
          <tbody>{filteredModels.map((m) => <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600 }}>{m.name}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{m.type}</td>
            <td style={{ padding: '13px 16px' }}><span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', backgroundColor: m.status === 'Production' ? 'rgba(16,185,129,0.15)' : m.status === 'Staging' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.1)', color: m.status === 'Production' ? '#10b981' : m.status === 'Staging' ? '#f59e0b' : '#aaa' }}>{m.status}</span></td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontFamily: 'monospace' }}>{m.version}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{m.latency}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600, color: '#10b981' }}>{m.accuracy}</td>
            <td style={{ padding: '13px 16px' }}>{m.status === 'Staging' && <button onClick={() => deployModel(m.id)} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #10b981', background: 'transparent', color: '#10b981', cursor: 'pointer', fontSize: '11px' }}><Zap size={10} style={{ display: 'inline', marginRight: '4px' }}/>Deploy</button>}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

// ─── 2. FEATURE STORE ────────────────────────────────────────────
export const AiMlFeatureStore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [syncing, setSyncing] = useState(false);
  const features = [
    { name: 'user_affinity_score', entity: 'User', type: 'Float32', freshness: '1h', hits: '2.4M/s' },
    { name: 'ad_ctr_7d', entity: 'Ad', type: 'Float32', freshness: '24h', hits: '890K/s' },
    { name: 'session_duration_avg', entity: 'Session', type: 'Int32', freshness: 'Real-time', hits: '4.2M/s' },
    { name: 'device_fraud_prob', entity: 'Device', type: 'Float16', freshness: 'Real-time', hits: '1.1M/s' },
  ];

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Offline to Online sync completed.' }));
    }, 2000);
  };

  const filtered = features.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Layers size={26} />} title="Feature Store" subtitle="Manage, share, and serve machine learning features for offline training and real-time online inference." accentColor="#f59e0b" badge="Feast Compatible" />
      <QuickActionBar actions={[{ label: 'Sync Offline/Online', icon: <RefreshCw size={14} className={syncing ? 'spin' : ''} />, onClick: handleSync }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Total Features" value="1,284" change="+124" color="#f59e0b" icon={<Layers size={20} />} />
        <StatCard label="Online Serving QPS" value="14.2M" change="+2.1M" color="#10b981" icon={<Activity size={20} />} />
        <StatCard label="Feature Groups" value="84" color="#6366f1" icon={<Database size={20} />} />
        <StatCard label="Cache Hit Rate" value="99.4%" change="+0.2%" color="#ec4899" icon={<Target size={20} />} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600, fontSize: '14px' }}>Feature Registry</span>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '4px 8px' }}>
            <Search size={14} style={{ color: 'var(--text-secondary)', marginRight: '6px' }} />
            <input type="text" placeholder="Search features..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '13px' }} />
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Feature Name', 'Entity', 'Type', 'Freshness', 'Serving QPS'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
          <tbody>{filtered.map((f, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600, fontFamily: 'monospace' }}>{f.name}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}><span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.05)' }}>{f.entity}</span></td>
            <td style={{ padding: '13px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{f.type}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px' }}>{f.freshness}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600, color: '#10b981' }}>{f.hits}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

// ─── 3. PROMPT MANAGEMENT ────────────────────────────────────────
export const AiMlPromptManagement: React.FC = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [prompts, setPrompts] = useState([
    { id: 1, name: 'system_ad_writer_v4', model: 'GPT-4o', template: 'You are an expert copywriter. Write a 3 sentence ad for {{product}}.', uses: '1.2M', status: 'Active' },
    { id: 2, name: 'seo_keyword_extractor', model: 'Claude-3.5-Sonnet', template: 'Extract top 5 keywords from the following text: {{content}}', uses: '840K', status: 'Active' },
  ]);

  const savePrompt = (id: number, newTemplate: string) => {
    setPrompts(prompts.map(p => p.id === id ? { ...p, template: newTemplate } : p));
    setEditingId(null);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Prompt saved and deployed.' }));
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<MessageSquare size={26} />} title="Prompt Management" subtitle="Version control, A/B test, and monitor system prompts and few-shot templates across all LLM integrations." accentColor="#ec4899" badge="LLMOps" />
      <QuickActionBar actions={[{ label: 'A/B Test Prompts', icon: <Layers size={14} />, onClick: () => window.dispatchEvent(new CustomEvent('show-toast', { detail: 'A/B Testing module launched.' })) }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Active Templates" value={prompts.length.toString()} change="+12" color="#ec4899" icon={<FileCode2 size={20} />} />
        <StatCard label="API Calls (MTD)" value="18.4M" change="+2.4M" color="#6366f1" icon={<Activity size={20} />} />
        <StatCard label="Total Tokens" value="42.8B" change="+8.1B" color="#f59e0b" icon={<Layers size={20} />} />
        <StatCard label="Est. LLM Cost" value="$14,240" change="-$840" color="#10b981" icon={<DollarSign size={20} />} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Prompt Library</div>
        <div style={{ padding: '0' }}>
          {prompts.map((p) => (
            <div key={p.id} style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ fontWeight: 600 }}>{p.name} <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '8px', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>{p.model}</span></div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', backgroundColor: p.status === 'Active' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: p.status === 'Active' ? '#10b981' : '#ef4444' }}>{p.status}</span>
                  {editingId !== p.id && <button onClick={() => setEditingId(p.id)} style={{ background: 'none', border: 'none', color: '#ec4899', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}><Edit2 size={12} /> Edit</button>}
                </div>
              </div>
              
              {editingId === p.id ? (
                <div>
                  <textarea defaultValue={p.template} id={`prompt-${p.id}`} style={{ width: '100%', height: '80px', background: 'rgba(0,0,0,0.2)', border: '1px solid #ec4899', color: '#fff', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px', resize: 'vertical' }}></textarea>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                    <button onClick={() => setEditingId(null)} style={{ padding: '6px 12px', background: 'transparent', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
                    <button onClick={() => {
                      const val = (document.getElementById(`prompt-${p.id}`) as HTMLTextAreaElement).value;
                      savePrompt(p.id, val);
                    }} style={{ padding: '6px 12px', background: '#ec4899', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}><Save size={12}/> Save</button>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'rgba(0,0,0,0.15)', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {p.template}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── 4. RAG KNOWLEDGE BASE ───────────────────────────────────────
export const AiMlRagBase: React.FC = () => {
  const [docs, setDocs] = useState([
    { id: 1, name: 'Ad_Network_Policies_2026.pdf', chunks: 1420, status: 'Indexed' },
    { id: 2, name: 'User_Persona_Research_Q2.md', chunks: 340, status: 'Indexed' },
    { id: 3, name: 'Competitor_Analysis_DB', chunks: 8900, status: 'Syncing' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleReindex = (id: number) => {
    setDocs(docs.map(d => d.id === id ? { ...d, status: 'Syncing' } : d));
    setTimeout(() => {
      setDocs(docs => docs.map(d => d.id === id ? { ...d, status: 'Indexed' } : d));
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Document re-indexed.' }));
    }, 3000);
  };

  const handleSearch = () => {
    if (!searchQuery) return;
    setResults([
      `...according to the ${docs[0].name}, ads must not contain misleading claims regarding CTR...`,
      `...found in ${docs[1].name}: user personas heavily favor visual content over text-heavy creatives...`
    ]);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<BookOpen size={26} />} title="RAG Knowledge Base" subtitle="Manage document embeddings and retrieval-augmented generation pipelines to ground LLMs in your proprietary data." accentColor="#10b981" badge="Vector Ready" />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Total Documents" value="4,821" change="+142" color="#6366f1" icon={<BookOpen size={20} />} />
        <StatCard label="Vector Chunks" value="1.2M" change="+45K" color="#10b981" icon={<Database size={20} />} />
        <StatCard label="Retrieval Latency" value="84ms" change="-12ms" color="#f59e0b" icon={<Zap size={20} />} />
        <StatCard label="Query Accuracy" value="94.2%" change="+1.4%" color="#ec4899" icon={<Target size={20} />} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '14px' }}>Document Pipeline</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Source Name', 'Chunks', 'Status', 'Actions'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
            <tbody>{docs.map((d) => <tr key={d.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600 }}>{d.name}</td>
              <td style={{ padding: '13px 16px', fontSize: '13px' }}>{d.chunks}</td>
              <td style={{ padding: '13px 16px' }}>
                <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', backgroundColor: d.status === 'Indexed' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: d.status === 'Indexed' ? '#10b981' : '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}>
                  {d.status === 'Syncing' && <RefreshCw size={10} className="spin" />} {d.status}
                </span>
              </td>
              <td style={{ padding: '13px 16px' }}><button onClick={() => handleReindex(d.id)} disabled={d.status === 'Syncing'} style={{ background: 'none', border: 'none', color: d.status === 'Syncing' ? '#aaa' : '#6366f1', cursor: d.status === 'Syncing' ? 'not-allowed' : 'pointer', fontSize: '12px', fontWeight: 600 }}>Re-index</button></td>
            </tr>)}</tbody>
          </table>
        </div>

        <div className="glass-card">
          <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '14px' }}>Test Retrieval (Vector Search)</div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="Ask a question..." style={{ flex: 1, padding: '10px 14px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff' }} />
            <button onClick={handleSearch} style={{ padding: '10px 16px', background: '#10b981', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Search</button>
          </div>
          {results.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Retrieved {results.length} chunks in 42ms</div>
              {results.map((res, i) => (
                <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '13px', lineHeight: 1.5, borderLeft: '3px solid #10b981' }}>{res}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── 5. FINE-TUNING SUPPORT ──────────────────────────────────────
export const AiMlFineTuning: React.FC = () => {
  const [jobs, setJobs] = useState([
    { id: 1, name: 'Ad-Copy-Llama3-8B-LoRA', progress: 78, loss: 0.241, epoch: '3/4', status: 'Running' },
    { id: 2, name: 'Support-Chat-Mistral-QLoRA', progress: 34, loss: 0.892, epoch: '1/3', status: 'Running' }
  ]);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setJobs(curr => curr.map(job => {
        if (job.progress >= 100) return { ...job, status: 'Completed' };
        return { ...job, progress: job.progress + 1, loss: Math.max(0.1, job.loss - 0.01) };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const addJob = () => {
    const newJob = { id: Date.now(), name: `New-Experiment-Job-${jobs.length + 1}`, progress: 0, loss: 1.45, epoch: '0/5', status: 'Running' };
    setJobs([...jobs, newJob]);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'New training job dispatched to GPU cluster.' }));
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Settings size={26} />} title="Fine-Tuning Support" subtitle="Manage datasets, configure hyper-parameters, and execute LoRA/QLoRA fine-tuning jobs for open-source LLMs." accentColor="#8b5cf6" badge="GPU Cluster" />
      <QuickActionBar actions={[{ label: 'New Training Job', icon: <Plus size={14} />, onClick: addJob }]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Active Jobs" value={jobs.filter(j => j.status === 'Running').length.toString()} color="#8b5cf6" icon={<Activity size={20} />} />
        <StatCard label="GPU Utilization" value="84%" change="+12%" color="#10b981" icon={<Cpu size={20} />} />
        <StatCard label="Completed Jobs" value="45" color="#6366f1" icon={<CheckCircle2 size={20} />} />
        <StatCard label="Compute Cost" value="$3,420" change="-$210" color="#ef4444" icon={<DollarSign size={20} />} />
      </div>

      <div className="glass-card">
        <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '16px' }}>Active Training Jobs</div>
        {jobs.map((job) => (
          <div key={job.id} style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
              <span style={{ fontWeight: 600 }}>{job.name}</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {job.status === 'Completed' ? <span style={{ color: '#10b981' }}>Completed</span> : (
                  <>Epoch {job.epoch} · Loss: <span style={{ color: '#10b981', fontWeight: 600 }}>{job.loss.toFixed(3)}</span></>
                )}
              </span>
            </div>
            <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${job.progress}%`, height: '100%', backgroundColor: job.status === 'Completed' ? '#10b981' : '#8b5cf6', transition: 'width 1s' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── 6. VECTOR DATABASE ──────────────────────────────────────────
export const AiMlVectorDb: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Indexes');

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Database size={26} />} title="Vector Database" subtitle="Manage embedding indexes, monitor vector search performance, and handle high-dimensional similarity search at scale." accentColor="#06b6d4" badge="Milvus / Pinecone" />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Total Vectors" value="14.2M" change="+1.2M" color="#06b6d4" icon={<Database size={20} />} />
        <StatCard label="Search QPS" value="3,240" change="+420" color="#10b981" icon={<Zap size={20} />} />
        <StatCard label="p99 Latency" value="42ms" change="-5ms" color="#f59e0b" icon={<Clock size={20} />} />
        <StatCard label="Memory Usage" value="42GB" color="#ef4444" icon={<Server size={20} />} />
      </div>

      <div className="glass-card">
        <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
          {['Indexes', 'Query Performance'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: 'none', border: 'none', color: activeTab === tab ? '#06b6d4' : 'var(--text-secondary)', fontWeight: activeTab === tab ? 600 : 400, cursor: 'pointer', fontSize: '14px' }}>{tab}</button>
          ))}
        </div>

        {activeTab === 'Indexes' ? (
          <div>
            {['user_embeddings_1024d', 'ad_creative_clip_512d', 'document_chunks_768d'].map((idx, i) => (
              <div key={i} style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'monospace' }}>{idx}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Cosine Similarity · HNSW</div>
                </div>
                <span style={{ fontSize: '12px', color: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: '20px' }}>Healthy</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            <BarChart size={32} style={{ opacity: 0.5, marginRight: '10px' }}/> [Latency Distribution Chart]
          </div>
        )}
      </div>
    </div>
  );
};

// ─── 7. AI OBSERVABILITY ─────────────────────────────────────────
export const AiMlObservability: React.FC = () => {
  const [drift, setDrift] = useState(1.2);
  const [alerts, setAlerts] = useState([
    { id: 1, time: '10 mins ago', msg: 'CTR-Predictor-XGB input feature "user_age" distribution shifted by >5%', severity: 'High' },
    { id: 2, time: '1 hour ago', msg: 'AdCopy-Generator-v2 response length spiked by 40%', severity: 'Medium' }
  ]);

  // Simulate live drift
  useEffect(() => {
    const interval = setInterval(() => {
      setDrift(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Activity size={26} />} title="AI Observability" subtitle="Monitor model drift, data quality, bias detection, and LLM hallucination rates in real-time." accentColor="#f43f5e" badge="Real-time Alerts" />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label="Prediction Drift" value={`${drift}%`} color={drift > 2 ? '#f43f5e' : '#10b981'} icon={<Activity size={20} />} />
        <StatCard label="Data Quality Score" value="98.4%" color="#6366f1" icon={<CheckCircle2 size={20} />} />
        <StatCard label="Hallucination Rate" value="0.8%" color="#f59e0b" icon={<Eye size={20} />} />
        <StatCard label="Active Alerts" value={alerts.length.toString()} color="#f43f5e" icon={<AlertTriangle size={20} />} />
      </div>

      <div className="glass-card">
        <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '14px', color: '#f43f5e' }}>Critical Anomalies Detected</div>
        {alerts.length === 0 ? <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>No active alerts. System healthy.</div> : alerts.map((alert) => (
          <div key={alert.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderLeft: `3px solid ${alert.severity === 'High' ? '#f43f5e' : '#f59e0b'}`, backgroundColor: 'rgba(255,255,255,0.02)', marginBottom: '8px', borderRadius: '0 8px 8px 0' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>{alert.msg}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{alert.time}</div>
            </div>
            <button onClick={() => dismissAlert(alert.id)} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>Acknowledge</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── 8. AI COST MANAGEMENT ───────────────────────────────────────
export const AiMlCostManagement: React.FC = () => {
  const [range, setRange] = useState('7d');
  
  const metrics = {
    '7d': { total: '$42,840', llm: '$18,400', gpu: '$16,200', db: '$8,240' },
    '30d': { total: '$185,200', llm: '$74,000', gpu: '$68,000', db: '$43,200' },
    'ytd': { total: '$1.4M', llm: '$640K', gpu: '$510K', db: '$250K' }
  };

  const cur = metrics[range as keyof typeof metrics];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<DollarSign size={26} />} title="AI Cost Management" subtitle="Track and optimize API token usage, GPU compute costs, and vector database infrastructure spend." accentColor="#10b981" badge="FinOps" />
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '4px' }}>
        {['7d', '30d', 'ytd'].map(r => (
          <button key={r} onClick={() => setRange(r)} style={{ padding: '6px 12px', background: range === r ? '#10b981' : 'transparent', border: `1px solid ${range === r ? '#10b981' : 'var(--border-color)'}`, borderRadius: '6px', color: '#fff', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase' }}>{r}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        <StatCard label={`Total Spend (${range})`} value={cur.total} color="#ef4444" icon={<DollarSign size={20} />} />
        <StatCard label="LLM API Costs" value={cur.llm} color="#6366f1" icon={<MessageSquare size={20} />} />
        <StatCard label="GPU Compute" value={cur.gpu} color="#f59e0b" icon={<Server size={20} />} />
        <StatCard label="Vector & Storage" value={cur.db} color="#06b6d4" icon={<Database size={20} />} />
      </div>

      <div className="glass-card" style={{ height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        <BarChart size={32} style={{ opacity: 0.5, marginBottom: '10px' }}/> 
        <div>Cost Allocation Chart ({range})</div>
        <div style={{ width: '80%', height: '30px', display: 'flex', marginTop: '20px', borderRadius: '15px', overflow: 'hidden' }}>
          <div style={{ width: '45%', background: '#6366f1' }} title="LLM"></div>
          <div style={{ width: '35%', background: '#f59e0b' }} title="GPU"></div>
          <div style={{ width: '20%', background: '#06b6d4' }} title="DB"></div>
        </div>
      </div>
    </div>
  );
};

// ─── 9. EXPERIMENT TRACKING ──────────────────────────────────────
export const AiMlExperimentTracking: React.FC = () => {
  const [sortBy, setSortBy] = useState<'loss'|'acc'>('loss');
  const runs = [
    { id: 'run-1a2b', model: 'ResNet50', loss: 0.24, acc: 91.2 },
    { id: 'run-9c8d', model: 'ResNet50-Dropout', loss: 0.18, acc: 94.5 },
    { id: 'run-4e5f', model: 'EffNet-B0', loss: 0.31, acc: 88.9 },
  ];

  const sorted = [...runs].sort((a,b) => sortBy === 'loss' ? a.loss - b.loss : b.acc - a.acc);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<TrendingUp size={26} />} title="Experiment Tracking" subtitle="Log parameters, metrics, and artifacts for ML training runs. Compare models and reproduce experiments instantly." accentColor="#8b5cf6" badge="MLflow UI" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
        <StatCard label="Total Runs" value="8,421" color="#8b5cf6" icon={<Activity size={20} />} />
        <StatCard label="Active Experiments" value="14" color="#10b981" icon={<Eye size={20} />} />
        <StatCard label="Storage Used" value="412 GB" color="#f59e0b" icon={<Database size={20} />} />
      </div>
      
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, fontSize: '14px' }}>Experiment Leaderboard</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} style={{ background: 'rgba(0,0,0,0.2)', color: '#fff', border: '1px solid var(--border-color)', padding: '6px 10px', borderRadius: '6px', outline: 'none' }}>
            <option value="loss">Sort by Lowest Loss</option>
            <option value="acc">Sort by Highest Acc</option>
          </select>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>{['Run ID', 'Model Architecture', 'Val Loss', 'Val Accuracy'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
          <tbody>{sorted.map((r) => <tr key={r.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontFamily: 'monospace' }}>{r.id}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600 }}>{r.model}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: sortBy === 'loss' ? 700 : 400, color: sortBy === 'loss' ? '#10b981' : 'inherit' }}>{r.loss}</td>
            <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: sortBy === 'acc' ? 700 : 400, color: sortBy === 'acc' ? '#10b981' : 'inherit' }}>{r.acc}%</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

// ─── 10. AI GOVERNANCE ───────────────────────────────────────────
export const AiMlGovernance: React.FC = () => {
  const [rules, setRules] = useState([
    { id: 1, name: 'PII & PHI Redaction', active: true },
    { id: 2, name: 'Toxicity & Hate Speech Filter', active: true },
    { id: 3, name: 'Prompt Injection Defense', active: true },
    { id: 4, name: 'Copyright & Plagiarism Check', active: false },
  ]);
  const [testText, setTestText] = useState('');
  const [redacted, setRedacted] = useState('');

  const toggleRule = (id: number) => {
    setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const handleTest = () => {
    if (!testText) return;
    if (rules.find(r => r.id === 1)?.active) {
      // Simple mock redaction of numbers/emails
      setRedacted(testText.replace(/\d{3}-\d{2}-\d{4}/g, '[REDACTED SSN]').replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED EMAIL]'));
    } else {
      setRedacted(testText);
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Shield size={26} />} title="AI Governance & Safety" subtitle="Enforce PII redaction, copyright checks, toxicity filters, and compliance guardrails across all AI interactions." accentColor="#f59e0b" badge="Enterprise Security" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
        <StatCard label="Requests Filtered" value="14.2K" color="#ef4444" icon={<Shield size={20} />} />
        <StatCard label="PII Redactions" value="89K" color="#f59e0b" icon={<Lock size={20} />} />
        <StatCard label="Compliance Score" value="100%" color="#10b981" icon={<CheckCircle2 size={20} />} />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div className="glass-card">
          <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '14px' }}>Active Guardrails</div>
          {rules.map((rule) => (
            <div key={rule.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '13px' }}>{rule.name}</span>
              <button onClick={() => toggleRule(rule.id)} style={{ padding: '4px 12px', borderRadius: '20px', border: 'none', background: rule.active ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.1)', color: rule.active ? '#10b981' : '#aaa', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>
                {rule.active ? 'Active' : 'Disabled'}
              </button>
            </div>
          ))}
        </div>

        <div className="glass-card">
          <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '14px' }}>Test PII Redaction</div>
          <textarea value={testText} onChange={e => setTestText(e.target.value)} placeholder="Type a message with an email like test@example.com..." style={{ width: '100%', height: '80px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '10px' }}></textarea>
          <button onClick={handleTest} style={{ padding: '8px 16px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, width: '100%', marginBottom: '10px' }}>Test Payload</button>
          
          {redacted && (
            <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', padding: '12px', borderRadius: '8px', fontSize: '13px', color: '#f59e0b' }}>
              <strong>Result:</strong><br/>{redacted}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── 11. LONG-TERM VISION ────────────────────────────────────────
export const AiMlLongTermVision: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SectionHeader icon={<Eye size={26} />} title="Long-Term Vision (AGI Ops)" subtitle="Strategic roadmap, autonomous agent orchestration capabilities, and future-proofing infrastructure for next-gen AI models." accentColor="#3b82f6" badge="Future Scope" />
      <div className="glass-card" style={{ padding: '40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)', cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
        <Eye size={48} style={{ color: '#3b82f6', marginBottom: '16px' }} />
        <h2 style={{ fontSize: '24px', margin: '0 0 12px 0' }}>The Road to Autonomous Marketing</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Transitioning from copilot to autopilot. Managing multi-agent swarms, self-optimizing ad creative loops, and continuous reinforcement learning from human feedback (RLHF) pipelines.
        </p>
        
        {expanded && (
          <div style={{ marginTop: '30px', textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(59,130,246,0.3)' }}>
            <h3 style={{ marginTop: 0, color: '#3b82f6' }}>2027 Roadmap</h3>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
              <li><strong>Agentic Workflows:</strong> Fully autonomous campaign managers that bid, pause, and generate creative without human intervention.</li>
              <li><strong>Multi-Modal RAG:</strong> Grounding generation not just in text, but in past successful video/image ad performance metrics.</li>
              <li><strong>Local Models:</strong> Deploying SLMs (Small Language Models) on device for zero-latency, privacy-preserving personalization.</li>
            </ul>
          </div>
        )}
        {!expanded && <div style={{ marginTop: '20px', color: '#3b82f6', fontSize: '13px', fontWeight: 600 }}>Click to reveal 2027 Roadmap</div>}
      </div>
    </div>
  );
};
