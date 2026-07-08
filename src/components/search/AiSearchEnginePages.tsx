import React, { useState, useEffect } from 'react';
import { 
  Search, Link, RefreshCw, AlertCircle, Play, 
  Settings, CheckCircle2, X, Plus, Activity, 
  TrendingUp, BarChart3, Database, FileText, Layout
} from 'lucide-react';

/* Standard styles */
const cardStyle: React.CSSProperties = {
  background: 'rgba(22, 28, 38, 0.6)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '12px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#121212',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '6px',
  padding: '10px 14px',
  fontSize: '13px',
  color: '#ffffff',
  outline: 'none',
  boxSizing: 'border-box'
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%239ca3af' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: '36px',
};

const btnStyle: React.CSSProperties = {
  backgroundColor: '#6366f1',
  border: 'none',
  color: '#ffffff',
  padding: '10px 18px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background-color 0.2s'
};

const btnSecStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  color: '#ffffff',
  padding: '10px 18px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: 500,
  cursor: 'pointer'
};

const tableHeaderStyle: React.CSSProperties = {
  padding: '12px 16px',
  color: '#888888',
  fontWeight: 600,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
};

const tableCellStyle: React.CSSProperties = {
  padding: '14px 16px',
  color: '#aaaaaa',
  fontSize: '13px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
};

/* Reusable Modal Component */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#0d1117',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '520px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ padding: '20px', maxHeight: '75vh', overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

/* Custom events listener hook for Search dispatches */
const useSearchEvents = (
  pageId: string, 
  onPrimary: () => void, 
  onSecondary: () => void
) => {
  useEffect(() => {
    const handlePri = () => onPrimary();
    const handleSec = () => onSecondary();

    window.addEventListener(`search-pri-search-${pageId}`, handlePri);
    window.addEventListener(`search-sec-search-${pageId}`, handleSec);

    return () => {
      window.removeEventListener(`search-pri-search-${pageId}`, handlePri);
      window.removeEventListener(`search-sec-search-${pageId}`, handleSec);
    };
  }, [onPrimary, onSecondary, pageId]);
};

const triggerToast = (msg: string) => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
};


/* ============================================================================
   1. SEMANTIC SEARCH
   ============================================================================ */
export const SearchSemantic: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ match: string; score: number }[]>([]);

  useSearchEvents(
    'semantic',
    () => {
      setResults([
        { match: 'How do I upgrade my license key subscription?', score: 0.94 },
        { match: 'Pricing and seat quotas limits.', score: 0.82 }
      ]);
      triggerToast('Semantic query evaluation resolved.');
    },
    () => setModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Semantic NLP Query Testing</h4>
        <p style={{ fontSize: '13px', color: '#aaaaaa', margin: 0 }}>
          Resolve search intent and extract query similarity scores.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} style={inputStyle} placeholder="Enter a natural language search query..." />
          <button style={btnStyle} onClick={() => { setResults([{ match: 'How do I upgrade my license key subscription?', score: 0.94 }, { match: 'Pricing and seat quotas limits.', score: 0.82 }]); triggerToast('Query evaluated.'); }}>Evaluate Query</button>
        </div>
        {results.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            <span style={{ fontSize: '11px', color: '#666666', fontWeight: 600 }}>TOP VECTOR SIMILARITY MATCHES</span>
            {results.map((r, idx) => (
              <div key={idx} style={{ backgroundColor: '#121212', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#ffffff' }}>{r.match}</span>
                <strong style={{ color: '#10b981', fontSize: '13px' }}>{(r.score * 100).toFixed(0)}% Match</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Semantic Search Settings">
        <form onSubmit={(e) => { e.preventDefault(); setModal(false); triggerToast('Semantic search settings saved.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Intent Classification Model</label>
            <select style={selectStyle}>
              <option value="bert">BERT-Base-Multilingual-Cased</option>
              <option value="roberta">RoBERTa-Large-Semantic-V2</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Settings</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   2. VECTOR SEARCH
   ============================================================================ */
export const SearchVector: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [stats, setStats] = useState({ dimensions: 1536, indexedDocs: 140590, status: 'Synced' });

  useSearchEvents(
    'vector',
    () => {
      setSyncing(true);
      setTimeout(() => {
        setSyncing(false);
        triggerToast('Vector embedding index rebuild completed.');
      }, 1500);
    },
    () => setModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Pinecone Indexing Status</h4>
          <button style={btnStyle} onClick={() => { setSyncing(true); setTimeout(() => { setSyncing(false); triggerToast('Rebuild complete.'); }, 1200); }} disabled={syncing}>
            {syncing ? 'Rebuilding indices...' : 'Rebuild Embedding Index'}
          </button>
        </div>
        <div style={{ fontSize: '13px', color: '#aaaaaa' }}>
          Coordinate vector dimensional datasets.
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '16px' }}>
            <div style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>VECTOR DIMENSIONS</span>
              <strong style={{ color: '#ffffff', display: 'block', marginTop: '4px' }}>{stats.dimensions} (text-embedding-3)</strong>
            </div>
            <div style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>INDEXED EMBEDDINGS</span>
              <strong style={{ color: '#ffffff', display: 'block', marginTop: '4px' }}>{stats.indexedDocs.toLocaleString()} vectors</strong>
            </div>
            <div style={{ backgroundColor: '#121212', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: '#666666', display: 'block' }}>STATUS</span>
              <strong style={{ color: '#10b981', display: 'block', marginTop: '4px' }}>{stats.status}</strong>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Vector Database Configurations">
        <form onSubmit={(e) => { e.preventDefault(); setModal(false); triggerToast('Vector database sync configuration saved.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Pinecone Endpoint Host</label>
            <input type="text" defaultValue="https://index-98124.pinecone.io" style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Cosine Distance Metric</label>
            <select style={selectStyle}>
              <option value="cosine">Cosine Similarity</option>
              <option value="euclidean">Euclidean Distance</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Settings</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   3. AI KNOWLEDGE BASE
   ============================================================================ */
export const SearchKb: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [sources, setSources] = useState([
    { name: 'Developer API Guides Wiki', size: '12.4 MB', count: 48, status: 'Synced' },
    { name: 'HR Policies PDF directory', size: '4.8 MB', count: 12, status: 'Synced' }
  ]);

  useSearchEvents(
    'kb',
    () => {
      setSyncing(true);
      setTimeout(() => {
        setSyncing(false);
        triggerToast('Knowledge base files directories synced.');
      }, 1500);
    },
    () => setModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Knowledge base directories</h4>
          <button style={btnStyle} onClick={() => { setSyncing(true); setTimeout(() => { setSyncing(false); triggerToast('Sync complete.'); }, 1200); }} disabled={syncing}>
            {syncing ? 'Syncing knowledge base...' : 'Sync Data Directory'}
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Source Ingest Location</th>
                <th style={tableHeaderStyle}>Ingested Size</th>
                <th style={tableHeaderStyle}>Files Count</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{s.name}</td>
                  <td style={tableCellStyle}>{s.size}</td>
                  <td style={tableCellStyle}><code>{s.count} docs</code></td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Knowledge Base Ingestion Settings">
        <form onSubmit={(e) => { e.preventDefault(); setModal(false); triggerToast('Ingestion guidelines saved.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Chunk Size limit (Characters)</label>
            <input type="number" defaultValue={500} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Chunk Overlap (Characters)</label>
            <input type="number" defaultValue={50} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save settings</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   4. ENTERPRISE SEARCH
   ============================================================================ */
export const SearchEnterprise: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [connectors, setConnectors] = useState([
    { name: 'Google Drive Connector', type: 'OAuth 2.0 Auth', status: 'Healthy' },
    { name: 'Slack channel Archive Ingest', type: 'Bot Webhook', status: 'Healthy' }
  ]);
  const [form, setForm] = useState({ name: '', type: 'OAuth 2.0 Auth' });

  useSearchEvents('enterprise', () => setModal(true), () => setSettingsModal(true));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Enterprise Search Connectors</h4>
          <button style={btnStyle} onClick={() => setModal(true)}>Add Search Connector</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Connector Ingestion</th>
                <th style={tableHeaderStyle}>Protocol Type</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {connectors.map((c, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{c.name}</td>
                  <td style={tableCellStyle}>{c.type}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Add Search Connector Integration">
        <form onSubmit={(e) => { e.preventDefault(); setConnectors([...connectors, { name: form.name, type: form.type, status: 'Healthy' }]); setModal(false); triggerToast('Enterprise connector credentials added.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Connector Ingest Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Protocol Type</label>
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} style={selectStyle}>
              <option value="OAuth 2.0 Auth">OAuth 2.0 Authentication</option>
              <option value="API Secret Key">API Secret Key Token</option>
              <option value="S3 Folder URI">AWS S3 Folder Access Role</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Connector</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={settingsModal} onClose={() => setSettingsModal(false)} title="Global Search Options">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
          <p style={{ color: '#aaaaaa' }}>Set standard enterprise indexing parameters.</p>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Default search result limits</label>
            <input type="number" defaultValue={20} style={inputStyle} />
          </div>
          <button style={btnStyle} onClick={() => { setSettingsModal(false); triggerToast('Search limits updated.'); }}>Save Options</button>
        </div>
      </Modal>
    </div>
  );
};


/* ============================================================================
   5. DOCUMENT INTELLIGENCE
   ============================================================================ */
export const SearchDocIntel: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [ocrModal, setOcrModal] = useState(false);
  const [documents, setDocuments] = useState([
    { name: 'SLA_Wayne_Enterprises.pdf', type: 'PDF Contract', parsedFields: 18, score: '99%' }
  ]);
  const [form, setForm] = useState({ name: '', type: 'PDF' });

  useSearchEvents('docintel', () => setModal(true), () => setOcrModal(true));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Document OCR Parser Results</h4>
          <button style={btnStyle} onClick={() => setModal(true)}>Upload Test Document</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Document Name</th>
                <th style={tableHeaderStyle}>Format Schema</th>
                <th style={tableHeaderStyle}>Extracted Metadata Keys</th>
                <th style={tableHeaderStyle}>OCR Confidence Score</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((d, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle} style={{ color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{d.name}</td>
                  <td style={tableCellStyle}>{d.type}</td>
                  <td style={tableCellStyle}><code>{d.parsedFields} keys</code></td>
                  <td style={tableCellStyle} style={{ color: '#10b981', fontWeight: 700 }}>{d.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Upload PDF/Image for OCR Parsing">
        <form onSubmit={(e) => { e.preventDefault(); setDocuments([...documents, { name: form.name, type: form.type, parsedFields: 12, score: '98%' }]); setModal(false); triggerToast('Document uploaded. Extracting structured metadata JSON keys.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>File Ingestion Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Format Schema</label>
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} style={selectStyle}>
              <option value="PDF Contract">PDF SLA Document</option>
              <option value="Receipt Image">Receipt Image (JPEG/PNG)</option>
              <option value="W2 Form XML">W2 Form XML</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Ingest & Parse</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={ocrModal} onClose={() => setOcrModal(false)} title="OCR Models Settings">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
          <p style={{ color: '#aaaaaa' }}>Configure OCR models threshold classifications.</p>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Confidence Score threshold %</label>
            <input type="number" defaultValue={85} style={inputStyle} />
          </div>
          <button style={btnStyle} onClick={() => { setOcrModal(false); triggerToast('OCR Confidence thresholds updated.'); }}>Save Settings</button>
        </div>
      </Modal>
    </div>
  );
};
