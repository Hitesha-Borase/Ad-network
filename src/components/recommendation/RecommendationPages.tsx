import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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

/* Custom events listener hook for Recommendation dispatches */
const useRecoEvents = (
  pageId: string, 
  onPrimary: () => void, 
  onSecondary: () => void
) => {
  useEffect(() => {
    const handlePri = () => onPrimary();
    const handleSec = () => onSecondary();

    window.addEventListener(`reco-pri-reco-${pageId}`, handlePri);
    window.addEventListener(`reco-sec-reco-${pageId}`, handleSec);

    return () => {
      window.removeEventListener(`reco-pri-reco-${pageId}`, handlePri);
      window.removeEventListener(`reco-sec-reco-${pageId}`, handleSec);
    };
  }, [onPrimary, onSecondary, pageId]);
};

const triggerToast = (msg: string) => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
};


/* ============================================================================
   1. PRODUCT RECOMMENDATIONS
   ============================================================================ */
export const RecoProduct: React.FC = () => {
  const [assocModal, setAssocModal] = useState(false);
  const [associations, setAssociations] = useState([
    { primaryProduct: 'Enterprise Analytics Suite', recommendedCrossSell: 'Security Shield Add-on', support: '2.4%', confidence: '84.5%', lift: '3.2x' },
    { primaryProduct: 'Basic CRM Core License', recommendedCrossSell: 'Email Inbound Automator', support: '4.8%', confidence: '71.2%', lift: '2.1x' }
  ]);
  const [form, setForm] = useState({ primary: '', recommended: '', confidence: '80%' });

  useRecoEvents(
    'product',
    () => setAssocModal(true),
    () => {
      triggerToast('Product association rules exported to CSV.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Market Basket Product Cross-Sell Association Rules</h4>
          <button style={btnStyle} onClick={() => setAssocModal(true)}>Add Product Rule</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Primary Product Target</th>
                <th style={tableHeaderStyle}>Recommended Cross-Sell Product</th>
                <th style={tableHeaderStyle}>Basket Support</th>
                <th style={tableHeaderStyle}>Rule Confidence</th>
                <th style={tableHeaderStyle}>Affinities Lift</th>
              </tr>
            </thead>
            <tbody>
              {associations.map((a, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{a.primaryProduct}</td>
                  <td style={tableCellStyle}>{a.recommendedCrossSell}</td>
                  <td style={tableCellStyle}>{a.support}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', backgroundColor: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '3px 8px', borderRadius: '4px' }}>{a.confidence}</span>
                  </td>
                  <td style={tableCellStyle}>{a.lift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={assocModal} onClose={() => setAssocModal(false)} title="Generate Product Association Rule">
        <form onSubmit={(e) => { e.preventDefault(); setAssociations([...associations, { primaryProduct: form.primary, recommendedCrossSell: form.recommended, support: '1.2%', confidence: form.confidence, lift: '1.8x' }]); setAssocModal(false); triggerToast('AI product association rule added.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Primary Anchor Product</label>
            <input type="text" onChange={e => setForm({...form, primary: e.target.value})} style={inputStyle} placeholder="e.g. Starter Setup Bundle" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Recommended Cross-Sell Product</label>
            <input type="text" onChange={e => setForm({...form, recommended: e.target.value})} style={inputStyle} placeholder="e.g. Additional Seat Licenses" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Required Rule Confidence</label>
            <select value={form.confidence} onChange={e => setForm({...form, confidence: e.target.value})} style={selectStyle}>
              <option value="60%">60% Minimum confidence</option>
              <option value="75%">75% Medium confidence</option>
              <option value="90%">90% Strict confidence</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setAssocModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Association Rule</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   2. CAMPAIGN RECOMMENDATIONS
   ============================================================================ */
export const RecoCampaign: React.FC = () => {
  const [auditLoading, setAuditLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([
    { campaign: 'Acme Brand Awareness Q3', alert: 'High Cost-Per-Click detected', action: 'Lower Max CPC Bid Limit to $1.20', status: 'Pending Approval' },
    { campaign: 'Velocity Lead Ingestion', alert: 'Conversion rates underperforming', action: 'Redirect traffic to High-Converting Landing Page A', status: 'Applied' }
  ]);

  useRecoEvents(
    'campaign',
    () => {
      setAuditLoading(true);
      setTimeout(() => {
        setAuditLoading(false);
        triggerToast('AI Campaign performance audit complete. New suggestions generated.');
      }, 2000);
    },
    () => {
      triggerToast('Campaign Optimization rules ruleset exported.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>AI Campaign Optimization Suggestions</h4>
          <button style={btnStyle} onClick={() => { setAuditLoading(true); setTimeout(() => { setAuditLoading(false); triggerToast('Audit complete.'); }, 1500); }} disabled={auditLoading}>
            {auditLoading ? 'Running performance audit...' : 'Run Campaign Audit'}
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Campaign Target</th>
                <th style={tableHeaderStyle}>Detected Performance Alert</th>
                <th style={tableHeaderStyle}>Recommended Action</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((r, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{r.campaign}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '12px', color: '#ef4444' }}>{r.alert}</span>
                  </td>
                  <td style={tableCellStyle}>{r.action}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: r.status === 'Applied' ? '#10b981' : '#f59e0b' }}>{r.status}</span>
                  </td>
                  <td style={tableCellStyle}>
                    {r.status === 'Pending Approval' && (
                      <button 
                        style={{ ...btnStyle, padding: '4px 10px', fontSize: '11px' }} 
                        onClick={() => {
                          setRecommendations(recommendations.map(x => x.campaign === r.campaign ? { ...x, status: 'Applied' } : x));
                          triggerToast('Optimization action applied successfully.');
                        }}
                      >
                        Apply Rule
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


/* ============================================================================
   3. BUDGET RECOMMENDATIONS
   ============================================================================ */
export const RecoBudget: React.FC = () => {
  const [redistributeModal, setRedistributeModal] = useState(false);
  const [schedules] = useState([
    { sourceCampaign: 'Google Brand Search', targetCampaign: 'Meta Lookalike Core', suggestedAmount: '$2,500.00', reason: 'Better ROAS calculated (4.2x vs 1.8x)', date: 'Today' }
  ]);

  useRecoEvents(
    'budget',
    () => setRedistributeModal(true),
    () => {
      triggerToast('AI Budget strategy breakdown exported.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Daily AI Budget Redistribution Proposals</h4>
          <button style={btnStyle} onClick={() => setRedistributeModal(true)}>Apply Budget Redistribution</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Extract From Campaign</th>
                <th style={tableHeaderStyle}>Load To Campaign</th>
                <th style={tableHeaderStyle}>Redistribution Amount</th>
                <th style={tableHeaderStyle}>AI Forecast Rationale</th>
                <th style={tableHeaderStyle}>Proposed Date</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((s, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle}>{s.sourceCampaign}</td>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{s.targetCampaign}</td>
                  <td style={{ ...tableCellStyle, color: '#10b981', fontWeight: 700 }}>{s.suggestedAmount}</td>
                  <td style={tableCellStyle}>{s.reason}</td>
                  <td style={tableCellStyle}>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={redistributeModal} onClose={() => setRedistributeModal(false)} title="Confirm Budget Redistribution">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
          <p style={{ color: '#aaaaaa' }}>Apply the daily AI budget recommendations to redistribute capital from lower-performing Google Search bids to high-ROAS Meta Lookalike campaigns immediately.</p>
          <div style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.08)', padding: '12px', borderRadius: '6px' }}>
            <strong>Redistribution target:</strong> Move $2,500.00 to Meta campaigns
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setRedistributeModal(false)} style={btnSecStyle}>Cancel</button>
            <button style={btnStyle} onClick={() => { triggerToast('AI Budget allocations synchronized across channels.'); setRedistributeModal(false); }}>Confirm Redistribution</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};


/* ============================================================================
   4. AUDIENCE RECOMMENDATIONS
   ============================================================================ */
export const RecoAudience: React.FC = () => {
  const [syncModal, setSyncModal] = useState(false);
  const [audiences, setAudiences] = useState([
    { baseSegment: 'High Value Customers (July)', recommendedLookalike: 'Lookalike 1% (US Country)', size: '2.4M users', status: 'Ready to Sync' },
    { baseSegment: 'Active SaaS Trial accounts', recommendedLookalike: 'B2B Tech Engaged Interests', size: '890K users', status: 'Synced' }
  ]);
  const [form, setForm] = useState({ base: '', lookalike: '', size: '1M users' });

  useRecoEvents(
    'audience',
    () => setSyncModal(true),
    () => {
      triggerToast('Audience specifications exported.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>AI Segment Lookalike Suggestions</h4>
          <button style={btnStyle} onClick={() => setSyncModal(true)}>Sync Lookalike Audience</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Base Customer Segment</th>
                <th style={tableHeaderStyle}>Recommended Lookalike Target</th>
                <th style={tableHeaderStyle}>Estimated Size</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {audiences.map((a, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle}>{a.baseSegment}</td>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{a.recommendedLookalike}</td>
                  <td style={tableCellStyle}><code>{a.size}</code></td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: a.status === 'Synced' ? '#10b981' : '#f59e0b' }}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={syncModal} onClose={() => setSyncModal(false)} title="Sync Lookalike Segment Target">
        <form onSubmit={(e) => { e.preventDefault(); setAudiences([...audiences, { baseSegment: form.base, recommendedLookalike: form.lookalike, size: form.size, status: 'Ready to Sync' }]); setSyncModal(false); triggerToast('Lookalike segment generated.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Base Customer Segment</label>
            <input type="text" onChange={e => setForm({...form, base: e.target.value})} style={inputStyle} placeholder="e.g. Loyal Purchasers 30D" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Recommended Lookalike Group Name</label>
            <input type="text" onChange={e => setForm({...form, lookalike: e.target.value})} style={inputStyle} placeholder="e.g. Lookalike 2% Custom" required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setSyncModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save & Sync</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   5. KEYWORD RECOMMENDATIONS
   ============================================================================ */
export const RecoKeyword: React.FC = () => {
  const [keywordModal, setKeywordModal] = useState(false);
  const [keywords, setKeywords] = useState([
    { term: 'best marketing automation tool', monthlyVolume: '14,200', competition: 'High', avgCpc: '$4.50' },
    { term: 'low cost billing gateway integration', monthlyVolume: '1,890', competition: 'Low', avgCpc: '$1.80' }
  ]);
  const [form, setForm] = useState({ term: '', volume: '1,000', comp: 'Low', cpc: '$1.00' });

  useRecoEvents(
    'keyword',
    () => setKeywordModal(true),
    () => {
      triggerToast('Keyword suggestions spreadsheet downloaded.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>SEO Keyword Volume Suggester & Bid Forecasts</h4>
          <button style={btnStyle} onClick={() => setKeywordModal(true)}>Add Target Keywords</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Keyword Target</th>
                <th style={tableHeaderStyle}>Monthly Volume</th>
                <th style={tableHeaderStyle}>Bid Competition</th>
                <th style={tableHeaderStyle}>Avg Cost-Per-Click</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((k, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{k.term}</td>
                  <td style={tableCellStyle}><code>{k.monthlyVolume}</code></td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: k.competition === 'Low' ? '#10b981' : '#ef4444' }}>{k.competition}</span>
                  </td>
                  <td style={tableCellStyle}>{k.avgCpc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={keywordModal} onClose={() => setKeywordModal(false)} title="Register Target Keyword">
        <form onSubmit={(e) => { e.preventDefault(); setKeywords([...keywords, { term: form.term, monthlyVolume: form.volume, competition: form.comp, avgCpc: form.cpc }]); setKeywordModal(false); triggerToast('Keyword added to tracking campaign.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Search Term Keyword</label>
            <input type="text" onChange={e => setForm({...form, term: e.target.value})} style={inputStyle} placeholder="e.g. white label portal software" required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Est. Monthly Searches</label>
            <input type="number" onChange={e => setForm({...form, volume: e.target.value})} style={inputStyle} required />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Competition level</label>
            <select onChange={e => setForm({...form, comp: e.target.value})} style={selectStyle}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setKeywordModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Save Keyword</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


/* ============================================================================
   6. CREATIVE RECOMMENDATIONS
   ============================================================================ */
export const RecoCreative: React.FC = () => {
  const [abTestModal, setAbTestModal] = useState(false);
  const [creatives] = useState([
    { channel: 'Meta Newsfeed Feed', baselineCreative: 'Standard Product Headline', suggestedCreative: 'Ask a Question headline + vibrant overlay color', status: 'Pending Review' }
  ]);

  useRecoEvents(
    'creative',
    () => setAbTestModal(true),
    () => {
      triggerToast('Recommendation dismissed.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>AI Creative Enhancements Suggestions</h4>
          <button style={btnStyle} onClick={() => setAbTestModal(true)}>A/B Test Creative Recommendation</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Target Network Channel</th>
                <th style={tableHeaderStyle}>Baseline Current Ad Copy</th>
                <th style={tableHeaderStyle}>AI Suggested Enhancement</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {creatives.map((c, idx) => (
                <tr key={idx}>
                  <td style={tableCellStyle}>{c.channel}</td>
                  <td style={tableCellStyle}>{c.baselineCreative}</td>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 500, padding: '14px 16px' }}>{c.suggestedCreative}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: '#f59e0b' }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={abTestModal} onClose={() => setAbTestModal(false)} title="Configure A/B Test Creative Experiment">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
          <p style={{ color: '#aaaaaa' }}>Setup a split test to validate if the AI-suggested creative text conversion rate out-performs the current baseline ad headline.</p>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Traffic Split Ratio</label>
            <select style={selectStyle}>
              <option value="50">50% Baseline / 50% Suggestion</option>
              <option value="80">80% Baseline / 20% Suggestion (Conservative)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setAbTestModal(false)} style={btnSecStyle}>Cancel</button>
            <button style={btnStyle} onClick={() => { triggerToast('A/B Test Creative experiment initiated.'); setAbTestModal(false); }}>Deploy Experiment</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};


/* ============================================================================
   7. PRICING RECOMMENDATIONS
   ============================================================================ */
export const RecoPricing: React.FC = () => {
  const [pricingModal, setPricingModal] = useState(false);
  const [elasticity, setElasticity] = useState([
    { tier: 'Starter License plan', currentPrice: '$49/mo', suggestedPrice: '$59/mo', forecastVolume: '+10% revenue lift', status: 'Ready' }
  ]);
  const [form, setForm] = useState({ tier: 'Starter License plan', price: '$59/mo' });

  useRecoEvents(
    'pricing',
    () => setPricingModal(true),
    () => {
      triggerToast('Price elasticity curve spreadsheet exported.');
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>AI Dynamic Price Elasticity Suggestions</h4>
          <button style={btnStyle} onClick={() => setPricingModal(true)}>Apply Dynamic Pricing Rule</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Target Pricing Tier</th>
                <th style={tableHeaderStyle}>Current Price Tag</th>
                <th style={tableHeaderStyle}>AI Suggested Price Tag</th>
                <th style={tableHeaderStyle}>Forecast Revenue Impact</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {elasticity.map((e, idx) => (
                <tr key={idx}>
                  <td style={{ ...tableCellStyle, color: '#ffffff', fontWeight: 600, padding: '14px 16px' }}>{e.tier}</td>
                  <td style={tableCellStyle}>{e.currentPrice}</td>
                  <td style={{ ...tableCellStyle, color: '#10b981', fontWeight: 700 }}>{e.suggestedPrice}</td>
                  <td style={tableCellStyle}>{e.forecastVolume}</td>
                  <td style={tableCellStyle}>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>{e.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={pricingModal} onClose={() => setPricingModal(false)} title="Enforce Dynamic Pricing Rule">
        <form onSubmit={(e) => { e.preventDefault(); setElasticity([...elasticity, { tier: form.tier, currentPrice: '$49/mo', suggestedPrice: form.price, forecastVolume: 'Applied', status: 'Active' }]); setPricingModal(false); triggerToast('Dynamic pricing rule synchronization active.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>Pricing Tier</label>
            <select value={form.tier} onChange={e => setForm({...form, tier: e.target.value})} style={selectStyle}>
              <option value="Starter License plan">Starter License plan</option>
              <option value="Professional License plan">Professional License plan</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#888888', display: 'block', marginBottom: '6px' }}>New Target Price</label>
            <input type="text" value={form.price} onChange={e => setForm({...form, price: e.target.value})} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={() => setPricingModal(false)} style={btnSecStyle}>Cancel</button>
            <button type="submit" style={btnStyle}>Apply Dynamic Price</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
