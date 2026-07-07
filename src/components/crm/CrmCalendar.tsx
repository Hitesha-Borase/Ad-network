import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  day: number;
  time: string;
  type: 'call' | 'demo' | 'deadline';
}

const initialEvents: CalendarEvent[] = [
  { id: '1', title: 'Stark demo', day: 8, time: '10:00 AM', type: 'demo' },
  { id: '2', title: 'Wayne contract due', day: 12, time: '5:00 PM', type: 'deadline' },
  { id: '3', title: 'Diana sync call', day: 18, time: '2:30 PM', type: 'call' },
  { id: '4', title: 'Cyberdyne sync', day: 22, time: '11:00 AM', type: 'call' }
];

// Days in July 2026 (starts on a Wednesday)
const DAYS_IN_MONTH = 31;
const START_OFFSET = 3; // Wednesday offset (Sun=0, Mon=1, Tue=2, Wed=3)

export const CrmCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('12:00 PM');
  const [newEventType, setNewEventType] = useState<CalendarEvent['type']>('call');
  const [newEventDay, setNewEventDay] = useState(1);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEventTitle,
      day: newEventDay,
      time: newEventTime,
      type: newEventType
    };

    setEvents([...events, event]);
    setShowAddEventModal(false);
    setNewEventTitle('');
    setNewEventTime('12:00 PM');
    setNewEventType('call');
  };

  // Generate calendar days
  const calendarCells = [];
  for (let i = 0; i < START_OFFSET; i++) {
    calendarCells.push({ empty: true, dayNumber: 0 });
  }
  for (let i = 1; i <= DAYS_IN_MONTH; i++) {
    calendarCells.push({ empty: false, dayNumber: i });
  }

  // Group events by day
  const getEventsForDay = (day: number) => {
    return events.filter(e => e.day === day);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      {/* Month Header Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>July 2026</h2>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="btn btn-secondary btn-sm" style={{ padding: '6px' }}><ChevronLeft size={16} /></button>
            <button className="btn btn-secondary btn-sm" style={{ padding: '6px' }}><ChevronRight size={16} /></button>
          </div>
        </div>

        <button 
          onClick={() => {
            setNewEventDay(new Date().getDate());
            setShowAddEventModal(true);
          }}
          className="btn btn-primary"
        >
          <Plus size={16} /> Schedule Event
        </button>
      </div>

      {/* Calendar Grid Container */}
      <div className="glass-card" style={{ padding: '16px', overflow: 'hidden' }}>
        {/* Days of Week Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '12px',
          color: 'var(--text-secondary)',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '10px',
          marginBottom: '8px'
        }}>
          <div>SUN</div>
          <div>MON</div>
          <div>TUE</div>
          <div>WED</div>
          <div>THU</div>
          <div>FRI</div>
          <div>SAT</div>
        </div>

        {/* Calendar Days Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridAutoRows: '100px',
          gap: '8px'
        }}>
          {calendarCells.map((cell, idx) => {
            if (cell.empty) {
              return <div key={`empty-${idx}`} style={{ backgroundColor: 'rgba(255,255,255,0.01)', borderRadius: '8px', border: '1px solid transparent' }} />;
            }

            const dayEvents = getEventsForDay(cell.dayNumber);

            return (
              <div 
                key={`day-${cell.dayNumber}`}
                onClick={() => {
                  setNewEventDay(cell.dayNumber);
                  setShowAddEventModal(true);
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden'
                }}
                className="calendar-day-cell"
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {cell.dayNumber}
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, overflowY: 'auto' }}>
                  {dayEvents.map(event => (
                    <div 
                      key={event.id}
                      onClick={(e) => e.stopPropagation()} // Prevent double trigger
                      style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '9.5px',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        backgroundColor: 
                          event.type === 'call' ? 'var(--info-light)' : 
                          event.type === 'demo' ? 'var(--primary-light)' : 'var(--danger-light)',
                        color: 
                          event.type === 'call' ? 'var(--info)' : 
                          event.type === 'demo' ? 'var(--primary)' : 'var(--danger)',
                        borderLeft: `2px solid ${
                          event.type === 'call' ? 'var(--info)' : 
                          event.type === 'demo' ? 'var(--primary)' : 'var(--danger)'
                        }`
                      }}
                    >
                      {event.time} - {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Schedule CRM Meeting/Event</h2>
            <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Event Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required
                  placeholder="e.g. Wayne follow-up sync"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Day in July 2026</label>
                  <input 
                    type="number" 
                    min={1} 
                    max={31} 
                    className="form-control"
                    required
                    value={newEventDay}
                    onChange={(e) => setNewEventDay(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Time Slot</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required
                    placeholder="e.g. 10:30 AM"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Event Category</label>
                <select 
                  className="form-control"
                  value={newEventType}
                  onChange={(e) => setNewEventType(e.target.value as CalendarEvent['type'])}
                >
                  <option value="call">Call / Catch Up</option>
                  <option value="demo">Demo / Walkthrough</option>
                  <option value="deadline">Contract Deadline</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddEventModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .calendar-day-cell:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
          border-color: var(--border-color-hover) !important;
        }
      `}</style>
    </div>
  );
};
