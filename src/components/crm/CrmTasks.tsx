import React, { useState } from 'react';
import { Plus, CheckCircle, Circle, Trash2, Calendar } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Prepare proposal for Wayne Enterprises Tech Integration', dueDate: '2026-07-10', priority: 'high', completed: false },
  { id: '2', title: 'Call Diana Prince regarding shipping contract update', dueDate: '2026-07-08', priority: 'high', completed: false },
  { id: '3', title: 'Review feedback on Stark Arc Reactor quote estimates', dueDate: '2026-07-12', priority: 'medium', completed: true },
  { id: '4', title: 'Send welcome email sequence to Bruce Banner', dueDate: '2026-07-15', priority: 'low', completed: false }
];

export const CrmTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      dueDate: newTaskDueDate || new Date().toISOString().split('T')[0],
      priority: newTaskPriority,
      completed: false
    };

    setTasks([...tasks, task]);
    setNewTaskTitle('');
    setNewTaskPriority('medium');
    setNewTaskDueDate('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      <div className="responsive-layout">
        {/* Task List Panel */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>CRM Tasks</h2>
            
            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['all', 'pending', 'completed'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    textTransform: 'capitalize',
                    backgroundColor: filter === f ? 'var(--primary-light)' : undefined,
                    borderColor: filter === f ? 'var(--primary)' : undefined,
                    color: filter === f ? 'var(--text-primary)' : undefined
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredTasks.map(task => (
              <div key={task.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255,255,255,0.01)',
                border: '1px solid var(--border-color)',
                opacity: task.completed ? 0.6 : 1,
                transition: 'opacity 0.2s'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <button 
                    onClick={() => toggleTask(task.id)}
                    style={{ background: 'none', border: 'none', color: task.completed ? 'var(--success)' : 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
                  >
                    {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                  </button>
                  <span style={{
                    fontSize: '14px',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                    fontWeight: 500
                  }}>
                    {task.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="badge" style={{
                    backgroundColor: 
                      task.priority === 'high' ? 'var(--danger-light)' :
                      task.priority === 'medium' ? 'var(--warning-light)' : 'var(--info-light)',
                    color:
                      task.priority === 'high' ? 'var(--danger)' :
                      task.priority === 'medium' ? 'var(--warning)' : 'var(--info)',
                    fontSize: '11px',
                    padding: '2px 8px'
                  }}>
                    {task.priority}
                  </span>
                  
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <Calendar size={12} /> {task.dueDate}
                  </span>

                  <button 
                    onClick={() => deleteTask(task.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
                    className="hover-danger"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}

            {filteredTasks.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '14px' }}>
                No tasks in this list! All caught up.
              </div>
            )}
          </div>
        </div>

        {/* Add Task Panel */}
        <div className="glass-card" style={{ height: 'fit-content' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Create Task</h2>
          <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Task Title</label>
              <input
                type="text"
                placeholder="e.g. Follow up on demo call"
                className="form-control"
                required
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Priority</label>
              <select
                className="form-control"
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Due Date</label>
              <input
                type="date"
                className="form-control"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
              <Plus size={16} /> Add Task
            </button>
          </form>
        </div>
      </div>
      <style>{`
        .hover-danger:hover {
          color: var(--danger) !important;
        }
      `}</style>
    </div>
  );
};
