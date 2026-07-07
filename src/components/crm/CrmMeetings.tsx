import React, { useState } from 'react';
import { Video, Calendar, User, Clock, CheckCircle2, Edit3 } from 'lucide-react';

interface Meeting {
  id: string;
  client: string;
  topic: string;
  dateTime: string;
  duration: string;
  attendees: string[];
  link: string;
  notes: string;
  status: 'upcoming' | 'completed';
}

const initialMeetings: Meeting[] = [
  { id: '1', client: 'Wayne Enterprises', topic: 'Tech Integration Kickoff', dateTime: 'July 10, 2026 - 02:00 PM', duration: '45 mins', attendees: ['Alex Mercer', 'Bruce Wayne', 'Lucius Fox'], link: 'https://meet.google.com/abc-defg-hij', notes: 'Discuss software system architecture requirements.', status: 'upcoming' },
  { id: '2', client: 'Cyberdyne Systems', topic: 'AI Licensing Term sheet', dateTime: 'July 11, 2026 - 10:00 AM', duration: '30 mins', attendees: ['Alex Mercer', 'Sarah Connor'], link: 'https://meet.google.com/xyz-uvwx-yz1', notes: 'Verify parameters for the neural net model scope.', status: 'upcoming' },
  { id: '3', client: 'Stark Industries', topic: 'Marketing Campaign Launch', dateTime: 'July 05, 2026 - 11:30 AM', duration: '1 hour', attendees: ['Jane Foster', 'Tony Stark', 'Pepper Potts'], link: 'https://meet.google.com/foo-bar-baz', notes: 'Ironed out timeline details. Initial quote approved.', status: 'completed' }
];

export const CrmMeetings: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(initialMeetings[0]);
  const [editingNotes, setEditingNotes] = useState(false);
  const [currentNotes, setCurrentNotes] = useState('');

  const handleSelectMeeting = (m: Meeting) => {
    setSelectedMeeting(m);
    setCurrentNotes(m.notes);
    setEditingNotes(false);
  };

  const handleSaveNotes = () => {
    if (!selectedMeeting) return;
    setMeetings(prev => prev.map(m => m.id === selectedMeeting.id ? { ...m, notes: currentNotes } : m));
    setSelectedMeeting(prev => prev ? { ...prev, notes: currentNotes } : null);
    setEditingNotes(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      <div className="grid-cols-3" style={{ gridTemplateColumns: '1.2fr 1.8fr' }}>
        {/* Meetings Checklist List */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            Scheduled Sessions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
            {meetings.map(m => (
              <div 
                key={m.id}
                onClick={() => handleSelectMeeting(m)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: selectedMeeting?.id === m.id ? 'var(--primary)' : 'var(--border-color)',
                  backgroundColor: selectedMeeting?.id === m.id ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', color: m.status === 'upcoming' ? 'var(--info)' : 'var(--success)', fontWeight: 600, textTransform: 'uppercase' }}>
                    {m.status}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{m.duration}</span>
                </div>
                <h4 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                  {m.topic}
                </h4>
                <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: 0 }}>{m.client}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Meeting Details Drawer */}
        {selectedMeeting ? (
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                  {selectedMeeting.topic}
                </h2>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Client: <strong style={{ color: 'var(--text-primary)' }}>{selectedMeeting.client}</strong>
                </span>
              </div>

              {selectedMeeting.status === 'upcoming' ? (
                <a 
                  href={selectedMeeting.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <Video size={14} /> Join Video Call
                </a>
              ) : (
                <span className="badge badge-success">
                  <CheckCircle2 size={12} /> Completed
                </span>
              )}
            </div>

            {/* Time / Info grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Calendar size={15} style={{ color: 'var(--text-muted)' }} />
                <span>{selectedMeeting.dateTime}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Clock size={15} style={{ color: 'var(--text-muted)' }} />
                <span>Duration: {selectedMeeting.duration}</span>
              </div>
            </div>

            {/* Attendees */}
            <div>
              <h3 style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>Attendees</h3>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {selectedMeeting.attendees.map(a => (
                  <span key={a} style={{
                    fontSize: '12px',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-color)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--text-secondary)'
                  }}>
                    <User size={10} /> {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Session Notes */}
            <div style={{ marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600, margin: 0 }}>Meeting Logs & Notes</h3>
                {!editingNotes ? (
                  <button 
                    onClick={() => {
                      setEditingNotes(true);
                      setCurrentNotes(selectedMeeting.notes);
                    }}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                  >
                    <Edit3 size={12} /> Edit Notes
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setEditingNotes(false)} className="btn btn-secondary btn-sm" style={{ padding: '2px 8px', fontSize: '11px' }}>Cancel</button>
                    <button onClick={handleSaveNotes} className="btn btn-primary btn-sm" style={{ padding: '2px 8px', fontSize: '11px' }}>Save</button>
                  </div>
                )}
              </div>

              {!editingNotes ? (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--border-color)',
                  fontSize: '13.5px',
                  lineHeight: 1.5,
                  minHeight: '80px',
                  color: selectedMeeting.notes ? 'var(--text-primary)' : 'var(--text-muted)'
                }}>
                  {selectedMeeting.notes || 'No notes taken during this session.'}
                </div>
              ) : (
                <textarea 
                  className="form-control"
                  rows={4}
                  value={currentNotes}
                  onChange={(e) => setCurrentNotes(e.target.value)}
                  style={{ width: '100%', fontSize: '13.5px' }}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: 'var(--text-muted)' }}>
            Select a meeting session from the sidebar to view details.
          </div>
        )}
      </div>
    </div>
  );
};
