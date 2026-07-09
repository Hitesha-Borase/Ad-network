import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  day: number;
  month: number;
  year: number;
  time: string;
  type: 'call' | 'demo' | 'deadline';
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_ABBR = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const now = new Date();

const initialEvents: CalendarEvent[] = [
  { id: '1', title: 'Stark Demo', day: 8, month: now.getMonth(), year: now.getFullYear(), time: '10:00 AM', type: 'demo' },
  { id: '2', title: 'Wayne Contract Due', day: 12, month: now.getMonth(), year: now.getFullYear(), time: '5:00 PM', type: 'deadline' },
  { id: '3', title: 'Diana Sync Call', day: 18, month: now.getMonth(), year: now.getFullYear(), time: '2:30 PM', type: 'call' },
  { id: '4', title: 'Cyberdyne Sync', day: 22, month: now.getMonth(), year: now.getFullYear(), time: '11:00 AM', type: 'call' },
];

export const CrmCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', time: '10:00 AM', type: 'call' as CalendarEvent['type'], day: 1 });
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const goToday = () => { setMonth(now.getMonth()); setYear(now.getFullYear()); };

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setEvents(ev => [...ev, { id: Date.now().toString(), title: form.title, day: form.day, month, year, time: form.time, type: form.type }]);
    setShowModal(false);
    setForm({ title: '', time: '10:00 AM', type: 'call', day: 1 });
    showToast('✅ Event scheduled!');
  };

  const deleteEvent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEvents(ev => ev.filter(ev2 => ev2.id !== id));
    showToast('🗑 Event removed');
  };

  const dayEvents = (day: number) => events.filter(e => e.day === day && e.month === month && e.year === year);

  const openDay = (day: number) => {
    setForm(f => ({ ...f, day }));
    setSelectedDay(selectedDay === day ? null : day);
    setShowModal(true);
  };

  const typeStyle = (type: CalendarEvent['type']) => ({
    bg: type === 'call' ? 'var(--info-light)' : type === 'demo' ? 'var(--primary-light)' : 'var(--danger-light)',
    color: type === 'call' ? 'var(--info)' : type === 'demo' ? 'var(--primary)' : 'var(--danger)',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      {toast && <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--primary)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--primary)' }}>{toast}</div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>{MONTHS[month]} {year}</h2>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="btn btn-secondary btn-sm" style={{ padding: '6px' }} onClick={prevMonth}><ChevronLeft size={16}/></button>
            <button className="btn btn-secondary btn-sm" onClick={goToday} style={{ fontSize: '11px', fontWeight: 700 }}>TODAY</button>
            <button className="btn btn-secondary btn-sm" style={{ padding: '6px' }} onClick={nextMonth}><ChevronRight size={16}/></button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
            {(['call','demo','deadline'] as const).map(t => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: typeStyle(t).color }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: typeStyle(t).color }}/> {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            ))}
          </div>
          <button onClick={() => { setForm(f => ({ ...f, day: now.getDate() })); setShowModal(true); }} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={16}/> Schedule Event
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '16px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontWeight: 600, fontSize: '11px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '8px' }}>
          {DAYS_ABBR.map(d => <div key={d}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridAutoRows: '100px', gap: '6px' }}>
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`}/>)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
            const evs = dayEvents(day);
            return (
              <div key={day} onClick={() => openDay(day)} className="calendar-day-cell" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: isToday ? '1px solid rgba(99,102,241,0.4)' : '1px solid var(--border-color)', borderRadius: '8px', padding: '6px', display: 'flex', flexDirection: 'column', gap: '3px', cursor: 'pointer', transition: 'all 0.2s', overflow: 'hidden' }}>
                <span style={{ fontSize: '11px', fontWeight: isToday ? 800 : 500, color: isToday ? 'var(--primary)' : 'var(--text-secondary)' }}>{day}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, overflowY: 'auto' }}>
                  {evs.map(ev => {
                    const ts = typeStyle(ev.type);
                    return (
                      <div key={ev.id} onClick={e => e.stopPropagation()} style={{ padding: '2px 5px', borderRadius: '3px', fontSize: '9px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: ts.bg, color: ts.color, borderLeft: `2px solid ${ts.color}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2px' }}>
                        <span>{ev.time} {ev.title}</span>
                        <button onClick={e => deleteEvent(ev.id, e)} style={{ background: 'none', border: 'none', color: ts.color, cursor: 'pointer', padding: 0, lineHeight: 1, flexShrink: 0 }}><X size={8}/></button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Schedule CRM Event</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20}/></button>
            </div>
            <form onSubmit={addEvent} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Event Name *</label><input type="text" className="form-control" required placeholder="e.g. Wayne follow-up sync" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}/></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Day in {MONTHS[month]}</label><input type="number" min={1} max={daysInMonth} className="form-control" required value={form.day} onChange={e => setForm(f => ({ ...f, day: Number(e.target.value) }))}/></div>
                <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Time Slot</label><input type="text" className="form-control" required placeholder="10:30 AM" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}/></div>
              </div>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Event Type</label>
                <select className="form-control" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as CalendarEvent['type'] }))}>
                  <option value="call">Call / Catch Up</option><option value="demo">Demo / Walkthrough</option><option value="deadline">Contract Deadline</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={14}/> Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style>{`.calendar-day-cell:hover { background-color: rgba(255,255,255,0.05) !important; border-color: rgba(99,102,241,0.3) !important; }`}</style>
    </div>
  );
};
