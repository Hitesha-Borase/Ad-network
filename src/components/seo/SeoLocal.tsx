import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapPin, Star, MessageSquare, ShieldCheck } from 'lucide-react';

interface LocalReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

const starsDistribution = [
  { stars: '5 Stars', count: 120, fill: 'var(--success)' },
  { stars: '4 Stars', count: 32, fill: 'var(--primary)' },
  { stars: '3 Stars', count: 8, fill: 'var(--warning)' },
  { stars: '2 Stars', count: 2, fill: 'var(--accent)' },
  { stars: '1 Star', count: 1, fill: 'var(--danger)' }
];

const mockReviews: LocalReview[] = [
  { id: '1', author: 'Tony Stark', rating: 5, comment: 'Outstanding service. Their automated invoicing tool saved our bookkeeping hours.', date: '3 days ago' },
  { id: '2', author: 'Sarah Connor', rating: 4, comment: 'Great local support and quick tech response, very happy with the system so far.', date: '1 week ago' },
  { id: '3', author: 'Clark Kent', rating: 5, comment: 'Easy to manage domains and campaigns, highly recommend for local businesses.', date: '2 weeks ago' }
];

export const SeoLocal: React.FC = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px 24px',
      }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Local SEO
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Manage your Google Business Profile, review attributes, Map Pack positions, and local citations.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Map Pack Visibility</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>Top 3</h2>
          </div>
          <MapPin size={28} style={{ color: 'var(--success)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Average Rating</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--warning)' }}>4.8 / 5.0</h2>
          </div>
          <Star size={28} style={{ color: 'var(--warning)', fill: 'var(--warning)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Reviews</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>163</h2>
          </div>
          <MessageSquare size={28} style={{ color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Citation Score</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: 'var(--info)' }}>92%</h2>
          </div>
          <ShieldCheck size={28} style={{ color: 'var(--info)' }} />
        </div>
      </div>

      {/* Distribution Chart & Review Table */}
      <div className="responsive-layout">
        {/* Stars distribution */}
        <div className="glass-card" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Review Distribution</h3>
          <div style={{ flex: 1, width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={starsDistribution} layout="vertical" margin={{ left: -10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} vertical={true} />
                <XAxis type="number" stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                <YAxis dataKey="stars" type="category" stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="count" fill="var(--warning)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reviews List */}
        <div className="glass-card" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Recent Google Reviews</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockReviews.map(rev => (
              <div key={rev.id} style={{
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255,255,255,0.01)',
                border: '1px solid var(--border-color)',
                fontSize: '13px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>{rev.author}</span>
                  <div style={{ display: 'flex', gap: '2px', color: 'var(--warning)' }}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={12} fill="var(--warning)" />
                    ))}
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4, margin: '6px 0 0 0' }}>"{rev.comment}"</p>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', textAlign: 'right' }}>{rev.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
