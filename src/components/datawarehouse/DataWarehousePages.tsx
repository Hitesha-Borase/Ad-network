import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/* Shared Dark UI Styles */
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

/* Custom events listener hook for Data Warehouse dispatches */
const useDataEvents = (
  pageId: string, 
  onPrimary: () => void, 
  onSecondary: () => void
) => {
  useEffect(() => {
    const handlePri = () => onPrimary();
    const handleSec = () => onSecondary();

    window.addEventListener(`data-pri-data-${pageId}`, handlePri);
    window.addEventListener(`data-sec-data-${pageId}`, handleSec);

    return () => {
      window.removeEventListener(`data-pri-data-${pageId}`, handlePri);
      window.removeEventListener(`data-sec-data-${pageId}`, handleSec);
    };
  }, [onPrimary, onSecondary, pageId]);
};

const triggerToast = (msg: string) => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
};


/* ============================================================================
   1. BIGQUERY
   ============================================================================ */
export const DataWarehouseBigQuery: React.FC = () => {
  const [queryModal, setQueryModal] = useState(false);
  const [sqlQuery, setSqlQuery] = useState("SELECT campaign_id, SUM(spend) FROM `kiaan-bq.ads.daily_spend` GROUP BY 1 LIMIT 10;");
  const [schema] = useState([
    { field: 'campaign_id', type: 'STRING', mode: 'REQUIRED', desc: 'Unique advertiser identifier' },
    { field: 'spend', type: 'NUMERIC', mode: 'NULLABLE', desc: 'Daily currency spend calculated' },
    { field: 'clicks', type: 'INTEGER', mode: 'NULLABLE', desc: 'Accumulated click counts' },
    { field: 'sync_date', type: 'DATE', mode: 'REQUIRED', desc: 'Sync log timestamp date' }
  ]);

  useDataEvents(
    'bigquery',
    () => setQueryModal(true),
    () => {
      triggerToast('Google BigQuery schema sync triggered.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>BigQuery Dataset Table Schema (ads.daily_spend)</h4>
          <button style={btnStyle} onClick={() => setQueryModal(true)}>Run SQL Query</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Field Name</th>
                <th style={tableHeaderStyle}>Data Type</th>
                <th style={tableHeaderStyle}>Mode</th>
                <th style={tableHeaderStyle}>Description</th>
              </tr>
            </thead>
            <tbody>
              {schema.map((s, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, fontWeight: 600, color: '#ffffff', padding: '14px 16px' }}>{s.field}</td>
                  <td style={tableCellStyle}><code>{s.type}</code></td>
                  <td style={tableCellStyle}>{s.mode}</td>
                  <td style={tableCellStyle}>{s.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={queryModal} onClose={() => setQueryModal(false)} title="BigQuery SQL Query Console">
        <form onSubmit={(e) => { e.preventDefault(); setQueryModal(false); triggerToast('BigQuery query executed successfully. 4,510 rows returned.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>SQL Command Console</label>
            <textarea 
              value={sqlQuery} 
              onChange={e => setSqlQuery(e.target.value)} 
              rows={6} 
              style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '12px', resize: 'vertical' }} 
              required 
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setQueryModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Execute Query</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   2. SNOWFLAKE
   ============================================================================ */
export const DataWarehouseSnowflake: React.FC = () => {
  const [resumeModal, setResumeModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [warehouses, setWarehouses] = useState([
    { name: 'ANALYTICS_WH', size: 'X-Large', status: 'Suspended', runningJobs: 0, creditsPerHour: 16 },
    { name: 'INGEST_WH', size: 'Medium', status: 'Started', runningJobs: 3, creditsPerHour: 4 }
  ]);
  const [form, setForm] = useState({ name: '', size: 'Medium' });

  useDataEvents(
    'snowflake',
    () => setResumeModal(true),
    () => setSettingsModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Snowflake Virtual Warehouses Directory</h4>
          <button style={btnStyle} onClick={() => setResumeModal(true)}>Add virtual Warehouse</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Warehouse Name</th>
                <th style={tableHeaderStyle}>Cluster Size</th>
                <th style={tableHeaderStyle}>Current Status</th>
                <th style={tableHeaderStyle}>Active Queries</th>
                <th style={tableHeaderStyle}>Rate (Credits/hr)</th>
                <th style={tableHeaderStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((w, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{w.name}</td>
                  <td style={tableCellStyle}>{w.size}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: w.status === 'Started' ? '#10b981' : '#888888' }}>{w.status}</span>
                  </td>
                  <td style={tableCellStyle}>{w.runningJobs}</td>
                  <td style={tableCellStyle}>{w.creditsPerHour} Credits</td>
                  <td style={tableCellStyle}>
                    {w.status === 'Suspended' ? (
                      <button 
                        style={{ ...btnStyle, padding: '4px 10px', fontSize: '11px' }} 
                        onClick={() => {
                          setWarehouses(warehouses.map(x => x.name === w.name ? { ...x, status: 'Started' } : x));
                          triggerToast(`Warehouse ${w.name} resumed successfully.`);
                        }}
                      >
                        Resume
                      </button>
                    ) : (
                      <button 
                        style={{ ...btnSecStyle, padding: '4px 10px', fontSize: '11px' }} 
                        onClick={() => {
                          setWarehouses(warehouses.map(x => x.name === w.name ? { ...x, status: 'Suspended', runningJobs: 0 } : x));
                          triggerToast(`Warehouse ${w.name} suspended.`);
                        }}
                      >
                        Suspend
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resume modal */}
      <Modal isOpen={resumeModal} onClose={() => setResumeModal(false)} title="Provision Snowflake Virtual Warehouse">
        <form onSubmit={(e) => { e.preventDefault(); setWarehouses([...warehouses, { name: form.name.toUpperCase(), size: form.size, status: 'Started', runningJobs: 0, creditsPerHour: form.size === 'Medium' ? 4 : 8 }]); setResumeModal(false); triggerToast('Snowflake virtual warehouse provisioned.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Warehouse Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} placeholder="e.g. REPORTING_WH" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Cluster Size</label>
            <select value={form.size} onChange={e => setForm({...form, size: e.target.value})} style={selectStyle}>
              <option value="X-Small">X-Small (1 Credit/hr)</option>
              <option value="Small">Small (2 Credits/hr)</option>
              <option value="Medium">Medium (4 Credits/hr)</option>
              <option value="Large">Large (8 Credits/hr)</option>
              <option value="X-Large">X-Large (16 Credits/hr)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setResumeModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Provision Warehouse</button>
          </div>
        </form>
      </Modal>

      {/* Settings Modal */}
      <Modal isOpen={settingsModal} onClose={() => setSettingsModal(false)} title="Configure Snowflake Settings">
        <form onSubmit={(e) => { e.preventDefault(); setSettingsModal(false); triggerToast('Snowflake connection configuration synced.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Snowflake Account Identifier</label>
            <input type="text" defaultValue="xy89123.us-east-1" style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Default Role Mapping</label>
            <input type="text" defaultValue="ACCOUNTADMIN" style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setSettingsModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Settings</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   3. CLICKHOUSE
   ============================================================================ */
export const DataWarehouseClickHouse: React.FC = () => {
  const [replicaModal, setReplicaModal] = useState(false);
  const [replicas, setReplicas] = useState([
    { shard: 'Shard-1', replica: 'Replica-A', status: 'Synced', rowsInserted: '8,410,000/sec', lag: '0 ms' },
    { shard: 'Shard-1', replica: 'Replica-B', status: 'Synced', rowsInserted: '8,410,000/sec', lag: '4 ms' }
  ]);
  const [form, setForm] = useState({ shard: 'Shard-2', replica: 'Replica-A' });

  useDataEvents(
    'clickhouse',
    () => setReplicaModal(true),
    () => {
      triggerToast('Optimizing ClickHouse MergeTree tables... Complete.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>ClickHouse Real-Time Analytics Shard Cluster</h4>
          <button style={btnStyle} onClick={() => setReplicaModal(true)}>Add Replica Node</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Shard Cluster</th>
                <th style={tableHeaderStyle}>Replica Name</th>
                <th style={tableHeaderStyle}>Sync Status</th>
                <th style={tableHeaderStyle}>Insert Ingestion Rate</th>
                <th style={tableHeaderStyle}>Replication Lag</th>
              </tr>
            </thead>
            <tbody>
              {replicas.map((r, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{r.shard}</td>
                  <td style={tableCellStyle}>{r.replica}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>{r.status}</span>
                  </td>
                  <td style={tableCellStyle}><code>{r.rowsInserted}</code></td>
                  <td style={tableCellStyle}>{r.lag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={replicaModal} onClose={() => setReplicaModal(false)} title="Configure ClickHouse Cluster Replica Node">
        <form onSubmit={(e) => { e.preventDefault(); setReplicas([...replicas, { shard: form.shard, replica: form.replica, status: 'Synced', rowsInserted: '0/sec', lag: '0 ms' }]); setReplicaModal(false); triggerToast('ClickHouse Shard Replica Node registered.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Shard Target</label>
            <select value={form.shard} onChange={e => setForm({...form, shard: e.target.value})} style={selectStyle}>
              <option value="Shard-1">Shard-1 (Primary Ingest)</option>
              <option value="Shard-2">Shard-2 (Regional logs)</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Replica Name</label>
            <input type="text" onChange={e => setForm({...form, replica: e.target.value})} style={inputStyle} placeholder="e.g. Replica-C" required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setReplicaModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Register Replica Node</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   4. DATA LAKE
   ============================================================================ */
export const DataWarehouseDataLake: React.FC = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const [partitions, setPartitions] = useState([
    { bucket: 'kiaan-data-lake-s3', path: 'year=2026/month=07/day=08/', format: 'Parquet', objects: 450, totalSize: '14.8 GB' },
    { bucket: 'kiaan-data-lake-s3', path: 'year=2026/month=07/day=07/', format: 'Parquet', objects: 1200, totalSize: '40.2 GB' }
  ]);
  const [form, setForm] = useState({ bucket: 'kiaan-data-lake-s3', path: 'year=2026/custom_log/', format: 'JSON' });

  useDataEvents(
    'lake',
    () => setUploadModal(true),
    () => {
      triggerToast('Cloud Object Storage Bucket Scan initiated... Status: Normal.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Object Storage Data Lake Partition Index</h4>
          <button style={btnStyle} onClick={() => setUploadModal(true)}>Upload Object Pack</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Bucket Endpoint</th>
                <th style={tableHeaderStyle}>Partition Path Directory</th>
                <th style={tableHeaderStyle}>Data Format</th>
                <th style={tableHeaderStyle}>Object Count</th>
                <th style={tableHeaderStyle}>Total Partition Size</th>
              </tr>
            </thead>
            <tbody>
              {partitions.map((p, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle}>{p.bucket}</td>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontFamily: 'monospace', fontSize: '12px', padding: '14px 16px' }}>{p.path}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', backgroundColor: 'rgba(99,102,241,0.15)', color: '#818cf8', padding: '3px 8px', borderRadius: '4px' }}>{p.format}</span>
                  </td>
                  <td style={tableCellStyle}>{p.objects} files</td>
                  <td style={tableCellStyle}>{p.totalSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={uploadModal} onClose={() => setUploadModal(false)} title="Upload Offline Object Pack to Data Lake">
        <form onSubmit={(e) => { e.preventDefault(); setPartitions([...partitions, { bucket: form.bucket, path: form.path, format: form.format, objects: 120, totalSize: '4.2 MB' }]); setUploadModal(false); triggerToast('Object pack uploaded and indexed in Data Lake metadata.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Target Object Bucket</label>
            <input type="text" value={form.bucket} onChange={e => setForm({...form, bucket: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Partition Sub-directory Path</label>
            <input type="text" value={form.path} onChange={e => setForm({...form, path: e.target.value})} style={inputStyle} placeholder="year=2026/custom/" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Data Serialization Format</label>
            <select value={form.format} onChange={e => setForm({...form, format: e.target.value})} style={selectStyle}>
              <option value="Parquet">Apache Parquet (Columnar)</option>
              <option value="JSON">Raw Line delimited JSON</option>
              <option value="CSV">Comma Separated CSV</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setUploadModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Upload & Partition</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   5. ETL
   ============================================================================ */
export const DataWarehouseEtl: React.FC = () => {
  const [pipelineModal, setPipelineModal] = useState(false);
  const [logsModal, setLogsModal] = useState(false);
  const [pipelines, setPipelines] = useState([
    { id: 'ETL-449', name: 'CRM Contacts Sync', source: 'PostgreSQL Prod', dest: 'BigQuery Raw', status: 'Healthy', lastRun: '1 hour ago' },
    { id: 'ETL-450', name: 'Meta Marketing Pixels', source: 'Webhook Event Stream', dest: 'ClickHouse Ingestion', status: 'Syncing', lastRun: 'Active' }
  ]);
  const [form, setForm] = useState({ name: '', source: 'MySQL Invoices', dest: 'Snowflake Raw' });

  useDataEvents(
    'etl',
    () => setPipelineModal(true),
    () => setLogsModal(true)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>ETL Extraction & Pipeline Connectors</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={btnSecStyle} onClick={() => setLogsModal(true)}>Check Pipeline Logs</button>
            <button style={btnStyle} onClick={() => setPipelineModal(true)}>Create ETL Pipeline</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Pipeline ID</th>
                <th style={tableHeaderStyle}>Ingestion Pipeline Name</th>
                <th style={tableHeaderStyle}>Extraction Source</th>
                <th style={tableHeaderStyle}>Loading Destination</th>
                <th style={tableHeaderStyle}>Sync Status</th>
                <th style={tableHeaderStyle}>Last Execution</th>
              </tr>
            </thead>
            <tbody>
              {pipelines.map((p, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle}><code>{p.id}</code></td>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{p.name}</td>
                  <td style={tableCellStyle}>{p.source}</td>
                  <td style={tableCellStyle}>{p.dest}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: p.status === 'Healthy' ? '#10b981' : '#f59e0b' }}>{p.status}</span>
                  </td>
                  <td style={tableCellStyle}>{p.lastRun}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Pipeline modal */}
      <Modal isOpen={pipelineModal} onClose={() => setPipelineModal(false)} title="Create Ingestion ETL Pipeline">
        <form onSubmit={(e) => { e.preventDefault(); setPipelines([...pipelines, { id: 'ETL-451', name: form.name, source: form.source, dest: form.dest, status: 'Healthy', lastRun: 'Scheduled' }]); setPipelineModal(false); triggerToast('Ingestion ETL Pipeline created.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Pipeline Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} placeholder="e.g. Stripe Charges Ingest" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Source Database</label>
            <select value={form.source} onChange={e => setForm({...form, source: e.target.value})} style={selectStyle}>
              <option value="MySQL Invoices">MySQL Invoices Database Production</option>
              <option value="PostgreSQL Prod">PostgreSQL Core Profiles DB</option>
              <option value="Shopify Webhook Stream">Shopify Webhook Event Stream</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Destination Storage Target</label>
            <select value={form.dest} onChange={e => setForm({...form, dest: e.target.value})} style={selectStyle}>
              <option value="Snowflake Raw">Snowflake Raw Storage Schema</option>
              <option value="BigQuery Raw">Google BigQuery Dataset</option>
              <option value="ClickHouse Ingestion">ClickHouse Analytics Shard Cluster</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setPipelineModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Create Ingestion Job</button>
          </div>
        </form>
      </Modal>

      {/* Sync logs modal */}
      <Modal isOpen={logsModal} onClose={() => setLogsModal(false)} title="ETL Sync Execution Logs">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
          <p style={{ color: '#aaaaaa' }}>Complete summary logs of pipeline data ingestions over the past 24 hours.</p>
          <div style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '14px', fontFamily: 'monospace', fontSize: '11.5px', color: '#818cf8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>[2026-07-08 11:00:00] Ingesting 45,890 records from PostgreSQL...</div>
            <div>[2026-07-08 11:02:14] Normalizing schemas and formatting columns...</div>
            <div>[2026-07-08 11:04:02] Loading complete. BigQuery rows successfully inserted.</div>
            <div style={{ color: '#10b981', marginTop: '4px' }}>Status: Sync Job Ingest Complete. Zero Errors.</div>
          </div>
          <button style={btnSecStyle} onClick={() => setLogsModal(false)}>Close Log View</button>
        </div>
      </Modal>
    </div>
  );
};


/* ============================================================================
   6. ELT
   ============================================================================ */
export const DataWarehouseElt: React.FC = () => {
  const [transformModal, setTransformModal] = useState(false);
  const [dbtModels, setDbtModels] = useState([
    { model: 'models/marketing/mkt_clicks_daily.sql', language: 'SQL / dbt', status: 'Compiled', duration: '12 sec' },
    { model: 'models/billing/invoice_reconciled.sql', language: 'SQL / dbt', status: 'Compiled', duration: '45 sec' }
  ]);
  const [form, setForm] = useState({ model: '', language: 'SQL / dbt' });

  useDataEvents(
    'elt',
    () => setTransformModal(true),
    () => {
      triggerToast('Compiling DBT transformations models... Succeed.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>In-Warehouse DBT Transformation Compilation Models</h4>
          <button style={btnStyle} onClick={() => setTransformModal(true)}>Trigger transformation Run</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>DBT Target SQL Model</th>
                <th style={tableHeaderStyle}>Transformation Engine</th>
                <th style={tableHeaderStyle}>Compile Status</th>
                <th style={tableHeaderStyle}>Last Build Duration</th>
              </tr>
            </thead>
            <tbody>
              {dbtModels.map((m, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontFamily: 'monospace', fontSize: '12.5px', padding: '14px 16px' }}>{m.model}</td>
                  <td style={tableCellStyle}>{m.language}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', backgroundColor: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '3px 8px', borderRadius: '4px' }}>{m.status}</span>
                  </td>
                  <td style={tableCellStyle}>{m.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={transformModal} onClose={() => setTransformModal(false)} title="Trigger In-Warehouse transformation Run">
        <form onSubmit={(e) => { e.preventDefault(); setDbtModels([...dbtModels, { model: form.model, language: form.language, status: 'Compiled', duration: 'Running' }]); setTransformModal(false); triggerToast('ELT transformations job submitted to Snowflake runner.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>DBT Model Path</label>
            <input type="text" onChange={e => setForm({...form, model: e.target.value})} style={inputStyle} placeholder="models/analytics/user_retention.sql" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Execution Engine</label>
            <select value={form.language} onChange={e => setForm({...form, language: e.target.value})} style={selectStyle}>
              <option value="SQL / dbt">DBT SQL Compilation (Snowflake target)</option>
              <option value="Python / Pandas">Python Spark / Pandas cluster transformation</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setTransformModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Submit Job</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   7. AI ANALYTICS ENGINE
   ============================================================================ */
export const DataWarehouseAnalytics: React.FC = () => {
  const [insightModal, setInsightModal] = useState(false);
  const [predictions, setPredictions] = useState([
    { forecastTarget: 'Next Q3 Ad Conversion Rate', model: 'Google Vertex AI Auto-Predictor', expectedTrend: '+12.4% Increase', confidence: '94.2%', status: 'Ready' },
    { forecastTarget: 'Customer Churn Prediction', model: 'Custom XGBoost In-Warehouse Model', expectedTrend: 'Anomalies detected in active accounts', confidence: '89.1%', status: 'Calculation Required' }
  ]);
  const [form, setForm] = useState({ target: '', model: 'Google Vertex AI Auto-Predictor' });

  useDataEvents(
    'analytics',
    () => setInsightModal(true),
    () => {
      triggerToast('Re-training AI Analytics predictive models... Proceed.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>AI Analytics Machine Learning Projections</h4>
          <button style={btnStyle} onClick={() => setInsightModal(true)}>Generate Forecast Projections</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Forecast Target Metric</th>
                <th style={tableHeaderStyle}>Trained AI Model</th>
                <th style={tableHeaderStyle}>Expected Trend</th>
                <th style={tableHeaderStyle}>Confidence Level</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{p.forecastTarget}</td>
                  <td style={tableCellStyle}>{p.model}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '12px', color: p.expectedTrend.includes('Anomalies') ? '#ef4444' : '#10b981' }}>{p.expectedTrend}</span>
                  </td>
                  <td style={tableCellStyle}>{p.confidence}</td>
                  <td style={tableCellStyle}>
                    {p.status === 'Ready' ? (
                      <span style={{ fontSize: '11px', color: '#10b981' }}>{p.status}</span>
                    ) : (
                      <button 
                        style={{ ...btnStyle, padding: '4px 10px', fontSize: '11px' }} 
                        onClick={() => {
                          setPredictions(predictions.map(x => x.forecastTarget === p.forecastTarget ? { ...x, status: 'Ready', expectedTrend: '-1.8% Decelerated churn' } : x));
                          triggerToast('AI prediction complete.');
                        }}
                      >
                        Calculate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={insightModal} onClose={() => setInsightModal(false)} title="Generate AI Predictive Projections">
        <form onSubmit={(e) => { e.preventDefault(); setPredictions([...predictions, { forecastTarget: form.target, model: form.model, expectedTrend: 'Projections complete', confidence: '91.8%', status: 'Ready' }]); setInsightModal(false); triggerToast('Forecast parameters submitted. AI generated sales projection charts.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Forecast Target Metric Name</label>
            <input type="text" onChange={e => setForm({...form, target: e.target.value})} style={inputStyle} placeholder="e.g. Q4 Subscriber Inflow Rates" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Trained Predictive Model</label>
            <select value={form.model} onChange={e => setForm({...form, model: e.target.value})} style={selectStyle}>
              <option value="Google Vertex AI Auto-Predictor">Google Vertex AI Auto-Predictor (AutoML)</option>
              <option value="Custom XGBoost In-Warehouse Model">Custom XGBoost In-Warehouse Model (Snowflake runtime)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setInsightModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Run AI Analytics Engine</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
