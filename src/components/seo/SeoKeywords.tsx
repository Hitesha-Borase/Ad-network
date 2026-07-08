import React, { useState } from 'react';
import { Search, Flame, DollarSign, TrendingUp, Info } from 'lucide-react';

interface KeywordItem {
  id: string;
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  intent: 'Informational' | 'Transactional' | 'Commercial' | 'Navigational';
}

const initialKeywords: KeywordItem[] = [
  { id: '1', keyword: 'best cloud accounting software', volume: 8100, difficulty: 78, cpc: 12.50, intent: 'Commercial' },
  { id: '2', keyword: 'accounting software free trial', volume: 3200, difficulty: 45, cpc: 8.20, intent: 'Transactional' },
  { id: '3', keyword: 'how to do business bookkeeping', volume: 15000, difficulty: 32, cpc: 1.50, intent: 'Informational' },
  { id: '4', keyword: 'wayne enterprises portal', volume: 90500, difficulty: 12, cpc: 0.05, intent: 'Navigational' },
  { id: '5', keyword: 'small business expense tracker app', volume: 5400, difficulty: 64, cpc: 9.80, intent: 'Commercial' },
  { id: '6', keyword: 'automated invoicing benefits', volume: 1200, difficulty: 25, cpc: 4.10, intent: 'Informational' }
];

export const SeoKeywords: React.FC = () => {
  const [keywords] = useState<KeywordItem[]>(initialKeywords);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputVal, setInputVal] = useState('accounting software');

  const filteredKeywords = keywords.filter(k =>
    k.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Keyword Research
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Discover search queries, traffic potential, and search intents to optimize your content.
        </p>
      </div>

      {/* Explorer Search Input */}
      <div className="glass-card" style={{ display: 'flex', gap: '12px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Enter seed keyword (e.g. accounting software)..."
            style={{ paddingLeft: '38px' }}
          />
        </div>
        <button className="btn btn-primary">Analyze Query</button>
      </div>

      {/* Top metrics for analyzed seed */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <span>Monthly Volume</span>
            <TrendingUp size={16} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>49,500</h2>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <span>Keyword Difficulty</span>
            <Flame size={16} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--warning)' }}>62 / 100</h2>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <span>Average CPC</span>
            <DollarSign size={16} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--success)' }}>$7.85</h2>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <span>Primary Intent</span>
            <Info size={16} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--info)' }}>Commercial</h2>
        </div>
      </div>

      {/* Results Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Keyword Ideas & Variations</h3>
          <div style={{ position: 'relative', width: '250px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Filter results..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '32px', paddingTop: '6px', paddingBottom: '6px' }}
            />
          </div>
        </div>

        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Keyword</th>
                  <th>Monthly Volume</th>
                  <th>Difficulty (KD%)</th>
                  <th>CPC (USD)</th>
                  <th>Intent</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredKeywords.map(k => (
                  <tr key={k.id}>
                    <td style={{ fontWeight: 600 }}>{k.keyword}</td>
                    <td>{k.volume.toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '40px', height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{
                            width: `${k.difficulty}%`,
                            height: '100%',
                            backgroundColor: k.difficulty > 70 ? 'var(--danger)' : k.difficulty > 40 ? 'var(--warning)' : 'var(--success)'
                          }} />
                        </div>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: k.difficulty > 70 ? 'var(--danger)' : k.difficulty > 40 ? 'var(--warning)' : 'var(--success)'
                        }}>
                          {k.difficulty}%
                        </span>
                      </div>
                    </td>
                    <td>${k.cpc.toFixed(2)}</td>
                    <td>
                      <span className="badge" style={{
                        backgroundColor:
                          k.intent === 'Transactional' ? 'var(--success-light)' :
                          k.intent === 'Commercial' ? 'var(--warning-light)' :
                          k.intent === 'Informational' ? 'var(--info-light)' : 'rgba(255,255,255,0.05)',
                        color:
                          k.intent === 'Transactional' ? 'var(--success)' :
                          k.intent === 'Commercial' ? 'var(--warning)' :
                          k.intent === 'Informational' ? 'var(--info)' : 'var(--text-primary)'
                      }}>
                        {k.intent}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary btn-sm">Add to List</button>
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
