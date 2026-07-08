import React from 'react';
import { 
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';

const statsData = [
  { time: '00:00', load: 30 },
  { time: '04:00', load: 45 },
  { time: '08:00', load: 75 },
  { time: '12:00', load: 90 },
  { time: '16:00', load: 60 },
  { time: '20:00', load: 40 }
];

/* ----------------------------------------------------
   1. DASHBOARD
   ---------------------------------------------------- */
export const SuperAdminDashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Total Tenants', val: '142 Tenants', sub: 'Active: 138' },
          { label: 'Platform Users', val: '24,150 users', sub: 'Active today: 8,420' },
          { label: 'Monthly Platform Rev', val: '$142,450', sub: 'Recurring ARR: $1.7M' },
          { label: 'Active Clusters', val: '8 Nodes (US/EU)', sub: 'Health status: 100%' }
        ].map((stat, i) => (
          <div key={i} style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '16px' }}>
            <span style={{ fontSize: '11px', color: '#888888', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</span>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>{stat.val}</div>
            <div style={{ fontSize: '11px', color: '#555555', marginTop: '4px' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4 style={{ fontSize: '15px', color: '#ffffff', margin: 0 }}>Global Infrastructure Load</h4>
            <p style={{ fontSize: '12px', color: '#666666', margin: 0 }}>CPU load metrics across AWS clusters</p>
          </div>
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={statsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
                <XAxis dataKey="time" stroke="#666666" fontSize={11} />
                <YAxis stroke="#666666" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333333', color: '#ffffff' }} />
                <Area type="monotone" dataKey="load" stroke="#777777" fill="#444444" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ fontSize: '15px', color: '#ffffff', margin: 0 }}>Deployments & System Events</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#aaaaaa' }}>
            <div>• v3.2.0 release deployed successfully (2h ago)</div>
            <div>• Backup sync task verified (4h ago)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   2. TENANT MANAGEMENT
   ---------------------------------------------------- */
export const SuperAdminTenants: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>SaaS Tenants List</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333333', color: '#888888' }}>
            <th style={{ padding: '8px' }}>Tenant Name</th>
            <th style={{ padding: '8px' }}>Owner</th>
            <th style={{ padding: '8px' }}>Active Plan</th>
            <th style={{ padding: '8px' }}>Storage</th>
            <th style={{ padding: '8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #222222' }}>
            <td style={{ padding: '8px', color: '#ffffff', fontWeight: 600 }}>Apex Technologies</td>
            <td style={{ padding: '8px' }}>sarah.j@enterprise.com</td>
            <td style={{ padding: '8px' }}>Enterprise Custom</td>
            <td style={{ padding: '8px' }}>45 GB</td>
            <td style={{ padding: '8px', color: '#aaaaaa' }}>Active</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #222222' }}>
            <td style={{ padding: '8px', color: '#ffffff', fontWeight: 600 }}>CloudSystem Inc</td>
            <td style={{ padding: '8px' }}>m.vance@cloudsystem.io</td>
            <td style={{ padding: '8px' }}>Pro Growth Scale</td>
            <td style={{ padding: '8px' }}>12 GB</td>
            <td style={{ padding: '8px', color: '#aaaaaa' }}>Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/* ----------------------------------------------------
   3. ORGANIZATIONS
   ---------------------------------------------------- */
export const SuperAdminOrganizations: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>Platform Business Units Registry</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333333', color: '#888888' }}>
            <th style={{ padding: '8px' }}>Organization</th>
            <th style={{ padding: '8px' }}>Tenant Owner</th>
            <th style={{ padding: '8px' }}>Departements Count</th>
            <th style={{ padding: '8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #222222' }}>
            <td style={{ padding: '8px', color: '#ffffff', fontWeight: 600 }}>Apex Corporation North America</td>
            <td style={{ padding: '8px' }}>Sarah Jenkins</td>
            <td style={{ padding: '8px' }}>5 departments</td>
            <td style={{ padding: '8px', color: '#aaaaaa' }}>Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/* ----------------------------------------------------
   4. USERS
   ---------------------------------------------------- */
export const SuperAdminUsers: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>Global Users Directory</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333333', color: '#888888' }}>
            <th style={{ padding: '8px' }}>User Name</th>
            <th style={{ padding: '8px' }}>Tenant Assignment</th>
            <th style={{ padding: '8px' }}>Platform Scope</th>
            <th style={{ padding: '8px' }}>Last Access</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #222222' }}>
            <td style={{ padding: '8px', color: '#ffffff', fontWeight: 600 }}>Alex Mercer</td>
            <td style={{ padding: '8px' }}>Apex Technologies</td>
            <td style={{ padding: '8px' }}>Administrator</td>
            <td style={{ padding: '8px', color: '#888888' }}>2 mins ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/* ----------------------------------------------------
   5. SUBSCRIPTIONS
   ---------------------------------------------------- */
export const SuperAdminSubscriptions: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>Active Plan Ledger</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333333', color: '#888888' }}>
            <th style={{ padding: '8px' }}>Tenant Customer</th>
            <th style={{ padding: '8px' }}>Subscription Plan</th>
            <th style={{ padding: '8px' }}>Billing Interval</th>
            <th style={{ padding: '8px' }}>Renew Dates</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #222222' }}>
            <td style={{ padding: '8px', color: '#ffffff', fontWeight: 600 }}>Apex Technologies</td>
            <td style={{ padding: '8px' }}>Enterprise Custom ($499/mo)</td>
            <td style={{ padding: '8px' }}>Annual Renewal</td>
            <td style={{ padding: '8px', color: '#888888' }}>2027-06-15</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/* ----------------------------------------------------
   6. BILLING
   ---------------------------------------------------- */
export const SuperAdminBilling: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>Global Platform Billing Accounts</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333333', color: '#888888' }}>
            <th style={{ padding: '8px' }}>Invoice Reference</th>
            <th style={{ padding: '8px' }}>Bill Amount</th>
            <th style={{ padding: '8px' }}>Invoice Date</th>
            <th style={{ padding: '8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #222222' }}>
            <td style={{ padding: '8px', color: '#ffffff', fontWeight: 600 }}>PL-INV-4409</td>
            <td style={{ padding: '8px', fontWeight: 'bold' }}>$499.00</td>
            <td style={{ padding: '8px' }}>2026-07-01</td>
            <td style={{ padding: '8px', color: '#aaaaaa' }}>Settled</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/* ----------------------------------------------------
   7. MARKETPLACE
   ---------------------------------------------------- */
export const SuperAdminMarketplace: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>Pending Publishing Approvals</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333333', color: '#888888' }}>
            <th style={{ padding: '8px' }}>Asset Name</th>
            <th style={{ padding: '8px' }}>Type</th>
            <th style={{ padding: '8px' }}>Publisher Developer</th>
            <th style={{ padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #222222' }}>
            <td style={{ padding: '8px', color: '#ffffff', fontWeight: 600 }}>Zoho CRM Linker</td>
            <td style={{ padding: '8px' }}>Plugin</td>
            <td style={{ padding: '8px' }}>Zoho Corp Developer Team</td>
            <td style={{ padding: '8px' }}>
              <button style={{ backgroundColor: '#222222', border: '1px solid #333333', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Review & Approve</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/* ----------------------------------------------------
   8. AI MODELS
   ---------------------------------------------------- */
export const SuperAdminAiModels: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>AI Providers & LLM Router Setup</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333333', color: '#888888' }}>
            <th style={{ padding: '8px' }}>AI Model</th>
            <th style={{ padding: '8px' }}>API Latency</th>
            <th style={{ padding: '8px' }}>Monthly Costs</th>
            <th style={{ padding: '8px' }}>Uptime</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #222222' }}>
            <td style={{ padding: '8px', color: '#ffffff', fontWeight: 600 }}>Gemini Pro 1.5</td>
            <td style={{ padding: '8px' }}>42ms</td>
            <td style={{ padding: '8px' }}>$1,420 spent</td>
            <td style={{ padding: '8px', color: '#aaaaaa' }}>100% stable</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/* ----------------------------------------------------
   9. SYSTEM HEALTH
   ---------------------------------------------------- */
export const SuperAdminSystemHealth: React.FC = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {[
        { label: 'CPU Usage', val: '45%', sub: 'Limit: 8 cores per node' },
        { label: 'RAM Occupied', val: '12 GB / 32 GB', sub: 'Optimal buffer space' },
        { label: 'Disk space status', val: '1.2 TB / 4.0 TB', sub: 'NVMe SSD clusters' }
      ].map((stat, i) => (
        <div key={i} style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '16px' }}>
          <span style={{ fontSize: '11px', color: '#888888', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</span>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>{stat.val}</div>
          <div style={{ fontSize: '11px', color: '#555555', marginTop: '4px' }}>{stat.sub}</div>
        </div>
      ))}
    </div>
  );
};

/* ----------------------------------------------------
   10. INFRASTRUCTURE
   ---------------------------------------------------- */
export const SuperAdminInfrastructure: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>AWS & Google Cloud Clusters Monitoring</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333333', color: '#888888' }}>
            <th style={{ padding: '8px' }}>Node ID</th>
            <th style={{ padding: '8px' }}>Region Area</th>
            <th style={{ padding: '8px' }}>Running Containers</th>
            <th style={{ padding: '8px' }}>Health Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #222222' }}>
            <td style={{ padding: '8px', color: '#ffffff', fontWeight: 600 }}>aws-node-us-east-1</td>
            <td style={{ padding: '8px' }}>N. Virginia, USA</td>
            <td style={{ padding: '8px' }}>14 containers</td>
            <td style={{ padding: '8px', color: '#aaaaaa' }}>Optimal</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/* ----------------------------------------------------
   11. LOGS
   ---------------------------------------------------- */
export const SuperAdminLogs: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>SaaS Operations System Logs</h4>
      <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#888888', backgroundColor: '#121212', padding: '16px', borderRadius: '6px', border: '1px solid #222222' }}>
        [LOG 10:42:15.120] Tenant "Apex Tech" API request successfully routed to us-east-1 node. <br />
        [LOG 10:45:00.480] Automated backup daemon finished processing restore-point BKP-9021.
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   12. MONITORING
   ---------------------------------------------------- */
export const SuperAdminMonitoring: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>Real-time Platform Load Monitors</h4>
      <div style={{ fontSize: '13px', color: '#aaaaaa' }}>
        <p>Active traffic bandwidth: 142 MB/sec</p>
        <p>Average API roundtrip response delay: 48ms</p>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   13. QUEUES
   ---------------------------------------------------- */
export const SuperAdminQueues: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>Redis Queue Job Workers</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333333', color: '#888888' }}>
            <th style={{ padding: '8px' }}>Queue Name</th>
            <th style={{ padding: '8px' }}>Active Workers</th>
            <th style={{ padding: '8px' }}>Pending Jobs</th>
            <th style={{ padding: '8px' }}>Failed Jobs</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #222222' }}>
            <td style={{ padding: '8px', color: '#ffffff', fontWeight: 600 }}>email_marketing_broadcasts</td>
            <td style={{ padding: '8px' }}>5 workers</td>
            <td style={{ padding: '8px' }}>0 jobs</td>
            <td style={{ padding: '8px', color: '#aaaaaa' }}>0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/* ----------------------------------------------------
   14. CRON JOBS
   ---------------------------------------------------- */
export const SuperAdminCronJobs: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>Scheduler cron triggers</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333333', color: '#888888' }}>
            <th style={{ padding: '8px' }}>Task Name</th>
            <th style={{ padding: '8px' }}>Interval Schedule</th>
            <th style={{ padding: '8px' }}>Last Run Timestamp</th>
            <th style={{ padding: '8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #222222' }}>
            <td style={{ padding: '8px', color: '#ffffff', fontWeight: 600 }}>tenant_billing_invoices_generation</td>
            <td style={{ padding: '8px' }}>0 0 * * * (Daily)</td>
            <td style={{ padding: '8px' }}>Today 00:00 AM</td>
            <td style={{ padding: '8px', color: '#aaaaaa' }}>Succeeded</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/* ----------------------------------------------------
   15. DATABASE
   ---------------------------------------------------- */
export const SuperAdminDatabase: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14.5px', color: '#ffffff', margin: 0 }}>PostgreSQL DB Replication parameters</h4>
      <div style={{ fontSize: '13px', color: '#aaaaaa' }}>
        <p>Active Read replicas: 2 nodes (EMEA / US East)</p>
        <p>Replication lag: &lt; 5 ms</p>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   16. CACHE
   ---------------------------------------------------- */
export const SuperAdminCache: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14.5px', color: '#ffffff', margin: 0 }}>Redis Cache configuration</h4>
      <div style={{ fontSize: '13px', color: '#aaaaaa' }}>
        <p>Cache Hit Ratio: 98.4%</p>
        <p>Total memory keys: 45,800 active keys</p>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   17. STORAGE
   ---------------------------------------------------- */
export const SuperAdminStorage: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14.5px', color: '#ffffff', margin: 0 }}>Object Storage Buckets Audit</h4>
      <div style={{ fontSize: '13px', color: '#aaaaaa' }}>
        <p>Active Buckets: 8 s3 buckets</p>
        <p>Total items size: 450 GB (Encrypted)</p>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   18. FEATURE FLAGS
   ---------------------------------------------------- */
export const SuperAdminFeatureFlags: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>Global platform features configuration</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333333', color: '#888888' }}>
            <th style={{ padding: '8px' }}>Feature Rule Tag</th>
            <th style={{ padding: '8px' }}>Environment</th>
            <th style={{ padding: '8px' }}>Deployment Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #222222' }}>
            <td style={{ padding: '8px', color: '#ffffff', fontWeight: 600 }}>enable_enterprise_branding_v2</td>
            <td style={{ padding: '8px' }}>Global Production</td>
            <td style={{ padding: '8px', color: '#aaaaaa' }}>Enabled</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/* ----------------------------------------------------
   19. SYSTEM SETTINGS
   ---------------------------------------------------- */
export const SuperAdminSystemSettings: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h4 style={{ fontSize: '14.5px', color: '#ffffff', margin: 0 }}>Global configuration settings</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', color: '#888888', marginBottom: '6px' }}>SaaS Application Name</label>
          <input type="text" defaultValue="Kiaan Marketing OS Enterprise Platform" style={{ width: '100%', backgroundColor: '#121212', border: '1px solid #333333', borderRadius: '4px', padding: '8px 12px', fontSize: '13px', color: '#ffffff', outline: 'none' }} />
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   20. LICENSE MANAGER
   ---------------------------------------------------- */
export const SuperAdminLicenseManager: React.FC = () => {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ fontSize: '14px', color: '#ffffff', margin: 0 }}>Active Tenant Licenses Keys</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333333', color: '#888888' }}>
            <th style={{ padding: '8px' }}>License Reference ID</th>
            <th style={{ padding: '8px' }}>Customer tenant</th>
            <th style={{ padding: '8px' }}>Expiry limits</th>
            <th style={{ padding: '8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #222222' }}>
            <td style={{ padding: '8px', color: '#ffffff', fontWeight: 600 }}>KOS-LIC-99120</td>
            <td style={{ padding: '8px' }}>Apex Technologies</td>
            <td style={{ padding: '8px', color: '#888888' }}>2027-06-15 (Annual)</td>
            <td style={{ padding: '8px', color: '#aaaaaa' }}>Verified</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
