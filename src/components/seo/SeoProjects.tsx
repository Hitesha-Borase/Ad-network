import React, { useState } from 'react';
import { Search, Plus, ExternalLink, ShieldCheck, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface SiteProject {
  id: string;
  domain: string;
  healthScore: number;
  crawledPages: number;
  errors: number;
  warnings: number;
  clicksTrend: { value: number }[];
  organicTraffic: number;
}

const initialProjects: SiteProject[] = [
  { id: '1', domain: 'cyberdyne.com', healthScore: 92, crawledPages: 1450, errors: 4, warnings: 28, organicTraffic: 45200, clicksTrend: [{ value: 300 }, { value: 400 }, { value: 350 }, { value: 500 }, { value: 620 }, { value: 700 }] },
  { id: '2', domain: 'waynecorp.com', healthScore: 88, crawledPages: 3820, errors: 12, warnings: 85, organicTraffic: 125000, clicksTrend: [{ value: 900 }, { value: 850 }, { value: 950 }, { value: 1100 }, { value: 1200 }, { value: 1250 }] },
  { id: '3', domain: 'starkindustries.com', healthScore: 95, crawledPages: 2200, errors: 2, warnings: 14, organicTraffic: 98000, clicksTrend: [{ value: 500 }, { value: 600 }, { value: 580 }, { value: 750 }, { value: 890 }, { value: 980 }] },
  { id: '4', domain: 'dailyplanet.com', healthScore: 74, crawledPages: 8400, errors: 45, warnings: 210, organicTraffic: 320000, clicksTrend: [{ value: 2000 }, { value: 1900 }, { value: 2100 }, { value: 2300 }, { value: 2150 }, { value: 2200 }] }
];

export const SeoProjects: React.FC = () => {
  const [projects] = useState<SiteProject[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(p =>
    p.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
      }}>
        <div>
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
            SEO Projects
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Manage and monitor domain indexing, technical crawls, and organic search impressions.
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} /> New Domain
        </button>
      </div>

      {/* Overview stats */}
      <div className="grid-cols-3">
        <div className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Average Site Health</div>
            <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>87.2%</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--danger-light)', color: 'var(--danger)' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total Crawl Errors</div>
            <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>63 Errors</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <ArrowUpRight size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total Organic Traffic</div>
            <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>588,200 /mo</div>
          </div>
        </div>
      </div>

      {/* Filter and Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search domains..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '38px' }}
          />
        </div>

        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Domain Name</th>
                  <th>Health Score</th>
                  <th>Crawled Pages</th>
                  <th>Issues</th>
                  <th>Organic traffic</th>
                  <th>Clicks Trend (90d)</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map(project => (
                  <tr key={project.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                        {project.domain}
                        <ExternalLink size={12} style={{ color: 'var(--text-muted)' }} />
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ flex: 1, minWidth: '60px', height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${project.healthScore}%`, height: '100%', backgroundColor: project.healthScore > 90 ? 'var(--success)' : project.healthScore > 80 ? 'var(--warning)' : 'var(--danger)' }} />
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: project.healthScore > 90 ? 'var(--success)' : project.healthScore > 80 ? 'var(--warning)' : 'var(--danger)' }}>
                          {project.healthScore}%
                        </span>
                      </div>
                    </td>
                    <td>{project.crawledPages.toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
                        <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{project.errors} Errors</span>
                        <span style={{ color: 'var(--warning)', fontWeight: 600 }}>{project.warnings} Warnings</span>
                      </div>
                    </td>
                    <td>{project.organicTraffic.toLocaleString()} /mo</td>
                    <td style={{ width: '120px', height: '40px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={project.clicksTrend}>
                          <Area type="monotone" dataKey="value" stroke="var(--primary)" fill="var(--primary-light)" strokeWidth={1.5} dot={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary btn-sm">Audit Now</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
