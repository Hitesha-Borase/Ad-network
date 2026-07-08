import React, { useState } from 'react';
import { Calendar, Clock, Play, MoreHorizontal, Plus, X, Check, ChevronLeft, ChevronRight, CheckCircle, Loader } from 'lucide-react';

interface Job {
  id: number;
  name: string;
  cron: string;
  next: string;
  status: 'Active' | 'Pending' | 'Paused';
  running?: boolean;
  ran?: boolean;
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS_ABBR = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const jobEvents: Record<number, string[]> = {
  1: ['Weekly Sync', 'Data Export'],
  5: ['Promo Blast'],
  10: ['Weekly Sync'],
  15: ['Report Generation'],
  20: ['Promo Blast'],
  24: ['Weekly Sync', 'Promo Blast'],
  28: ['Birthday Emails'],
};

const initialJobs: Job[] = [
  { id: 1, name: 'Sync CRM to Data Warehouse', cron: '0 0 * * * (Daily at Midnight)', next: 'in 8 hours', status: 'Active' },
  { id: 2, name: 'Send "Happy Birthday" Emails', cron: '0 9 * * * (Daily at 9AM)', next: 'in 17 hours', status: 'Active' },
  { id: 3, name: 'Clear Stale Carts (30+ Days)', cron: '0 0 * * 0 (Every Sunday)', next: 'in 4 days', status: 'Active' },
  { id: 4, name: 'Black Friday Campaign Launch', cron: 'One-time (Nov 24, 00:00)', next: 'in 31 days', status: 'Pending' },
];

export const Scheduler: React.FC = () => {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(now.getDate());
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCron, setNewCron] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y+1); } else setMonth(m => m+1); };

  const runJob = (id: number) => {
    setJobs(js => js.map(j => j.id === id ? { ...j, running: true, ran: false } : j));
    setTimeout(() => {
      setJobs(js => js.map(j => j.id === id ? { ...j, running: false, ran: true, next: 'just now' } : j));
      showToast('✅ Job completed successfully!');
      setTimeout(() => setJobs(js => js.map(j => j.id === id ? { ...j, ran: false } : j)), 4000);
    }, 2000);
  };

  const toggleJob = (id: number) => {
    setJobs(js => js.map(j => j.id === id ? { ...j, status: j.status === 'Active' ? 'Paused' : 'Active' } : j));
    const job = jobs.find(j => j.id === id);
    showToast(job?.status === 'Active' ? '⏸ Job paused' : '▶ Job resumed');
  };

  const deleteJob = (id: number) => {
    setJobs(js => js.filter(j => j.id !== id));
    showToast('🗑 Job deleted');
  };

  const createJob = () => {
    if (!newName.trim()) return;
    const newId = Math.max(...jobs.map(j => j.id)) + 1;
    setJobs(js => [...js, { id: newId, name: newName, cron: newCron || '* * * * *', next: 'Calculating...', status: 'Pending' }]);
    setNewName(''); setNewCron('');
    setShowCreate(false);
    showToast('✅ Job scheduled!');
  };

  const dayEvents = selectedDay ? (jobEvents[selectedDay] ?? []) : [];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {toast && <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 9999, background: 'var(--bg-secondary)', border: '1px solid var(--primary)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', color: 'var(--primary)' }}>{toast}</div>}

      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(99,102,241,0.15) 100%)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 30px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={24} color="var(--warning)"/> Task Scheduler
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Manage recurring cron jobs, delayed actions, and scheduled marketing blasts.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setShowCreate(true)}>
          <Plus size={14}/> Schedule Task
        </button>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Calendar */}
        <div className="glass-card" style={{ width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>{MONTHS[month]} {year}</h2>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={prevMonth} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: '6px', padding: '4px 8px', display: 'flex', alignItems: 'center' }}><ChevronLeft size={14}/></button>
              <button onClick={nextMonth} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: '6px', padding: '4px 8px', display: 'flex', alignItems: 'center' }}><ChevronRight size={14}/></button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center', fontSize: '11px' }}>
            {DAYS_ABBR.map(d => <div key={d} style={{ color: 'var(--text-muted)', paddingBottom: '8px', fontWeight: 600 }}>{d}</div>)}
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`}/>)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const hasEvent = !!jobEvents[day];
              const isSelected = selectedDay === day;
              const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
              return (
                <div key={day} onClick={() => setSelectedDay(isSelected ? null : day)} style={{ aspectRatio: '1/1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', backgroundColor: isSelected ? 'var(--primary)' : isToday ? 'rgba(99,102,241,0.15)' : 'transparent', color: isSelected ? '#fff' : 'inherit', cursor: 'pointer', border: isToday && !isSelected ? '1px solid rgba(99,102,241,0.4)' : '1px solid transparent', fontSize: '12px', fontWeight: isToday ? 700 : 400, position: 'relative' }}>
                  {day}
                  {hasEvent && <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: isSelected ? '#fff' : 'var(--warning)', position: 'absolute', bottom: '2px' }}/>}
                </div>
              );
            })}
          </div>

          {selectedDay && (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 600, margin: '0 0 10px 0', color: 'var(--text-secondary)' }}>EVENTS ON {MONTHS[month].toUpperCase()} {selectedDay}</h3>
              {dayEvents.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {dayEvents.map((ev, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', padding: '6px 10px', backgroundColor: 'rgba(99,102,241,0.08)', borderRadius: '6px' }}>
                      <Clock size={11} color="var(--primary)"/> {ev}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No scheduled tasks for this day.</div>
              )}
            </div>
          )}
        </div>

        {/* Jobs Table */}
        <div className="glass-card" style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
          <div className="table-responsive-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Task Name</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Schedule</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Next Run</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="table-row-hover">
                    <td style={{ padding: '16px 24px', fontWeight: 500 }}>{job.name}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontSize: '12px' }}>{job.cron}</td>
                    <td style={{ padding: '16px 24px', fontWeight: 500 }}>{job.next}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, backgroundColor: job.status === 'Active' ? 'var(--success-light)' : job.status === 'Pending' ? 'var(--info-light)' : 'rgba(255,255,255,0.05)', color: job.status === 'Active' ? 'var(--success)' : job.status === 'Pending' ? 'var(--info)' : 'var(--text-muted)' }}>
                        {job.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button className="btn btn-secondary btn-sm" title="Run Now" style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '80px', justifyContent: 'center' }} onClick={() => runJob(job.id)} disabled={job.running}>
                          {job.running ? <><Loader size={12} style={{ animation: 'spin 1s linear infinite' }}/> Running</> : job.ran ? <><CheckCircle size={12} color="var(--success)"/> Done</> : <><Play size={12}/> Run Now</>}
                        </button>
                        <button onClick={() => toggleJob(job.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', fontSize: '12px' }} title={job.status === 'Active' ? 'Pause' : 'Resume'}>
                          {job.status === 'Active' ? '⏸' : '▶'}
                        </button>
                        <button onClick={() => deleteJob(job.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}><MoreHorizontal size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <style>{`.table-row-hover:hover{background:rgba(255,255,255,0.02)} @keyframes spin{from{transform:rotate(0deg)} to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Schedule New Task</h2>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20}/></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>TASK NAME *</label><input className="form-control" placeholder="e.g. Weekly Newsletter Blast" value={newName} onChange={e => setNewName(e.target.value)}/></div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>SCHEDULE TYPE</label>
                <select className="form-control" style={{ cursor: 'pointer' }} onChange={e => setNewCron(e.target.value)}>
                  <option value="0 9 * * 1">Weekly — Every Monday at 9AM</option>
                  <option value="0 0 * * *">Daily — Every day at midnight</option>
                  <option value="0 9 * * *">Daily — Every day at 9AM</option>
                  <option value="0 0 1 * *">Monthly — 1st of every month</option>
                  <option value="">One-time (custom)</option>
                </select>
              </div>
              <div><label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>ACTION</label>
                <select className="form-control" style={{ cursor: 'pointer' }}><option>Send Email Campaign</option><option>Sync Data Warehouse</option><option>Generate Report</option><option>Run Workflow</option><option>Trigger Webhook</option></select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={createJob}><Check size={14}/> Schedule Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
