import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';

type DayState = 'available' | 'session' | 'blocked-me' | 'blocked-admin' | 'weekend';

interface CalDay {
  day: number;
  state: DayState;
}

const generateCalendar = (): CalDay[] => {
  const days: CalDay[] = [];
  // Feb 2026 starts on Sunday (offset 0), but let's start Mon
  // offset: first day of Feb 2026 is Sunday → pad 6 days for Mon-start
  const offset = 6; // Sun=0, so Mon start needs 6 padding
  for (let i = 0; i < offset; i++) days.push({ day: 0, state: 'available' });
  const preset: Record<number, DayState> = {
    2: 'session', 3: 'session', 4: 'blocked-me', 5: 'blocked-me',
    9: 'session', 10: 'session', 12: 'session', 13: 'session',
    16: 'blocked-admin', 17: 'blocked-admin', 18: 'blocked-admin',
  };
  for (let d = 1; d <= 28; d++) {
    const dow = (offset + d - 1) % 7; // 0=Mon ... 5=Sat, 6=Sun
    const state = preset[d] || (dow >= 5 ? 'weekend' : 'available');
    days.push({ day: d, state });
  }
  return days;
};

const DAY_HEADERS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const MyCalendar: React.FC = () => {
  const [calendar, setCalendar] = useState<CalDay[]>(generateCalendar());
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleDayClick = (day: number, state: DayState) => {
    if (day === 0 || state === 'session' || state === 'weekend' || state === 'blocked-admin') return;

    if (state === 'blocked-me') {
      // Unblock
      setCalendar(prev => prev.map(d => d.day === day ? { ...d, state: 'available' } : d));
      toast.success(`Day ${day} unblocked`);
      return;
    }

    const newSelected = selected.includes(day)
      ? selected.filter(d => d !== day)
      : [...selected, day];

    // Check max 3 consecutive
    const sorted = [...newSelected].sort((a, b) => a - b);
    let maxConsec = 1, curr = 1;
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === sorted[i - 1] + 1) { curr++; maxConsec = Math.max(maxConsec, curr); }
      else curr = 1;
    }

    if (maxConsec > 3) {
      toast.error('You can block up to 3 consecutive days. For more, submit a leave request.');
      // Redirect prompt
      if (window.confirm('You\'ve exceeded 3 consecutive days. Submit an extended leave request to Admin?')) {
        navigate('/educator/leave-requests');
      }
      return;
    }

    setSelected(newSelected);
  };

  const handleConfirm = () => {
    if (selected.length === 0) { toast.error('No dates selected to block'); return; }
    setCalendar(prev => prev.map(d => selected.includes(d.day) ? { ...d, state: 'blocked-me' } : d));
    setSelected([]);
    toast.success(`${selected.length} day(s) blocked successfully!`);
  };

  const stateStyle: Record<DayState, string> = {
    available: '', session: 'cal-day-session', 'blocked-me': 'cal-day-blocked',
    'blocked-admin': 'cal-day-blocked', weekend: 'cal-day-weekend',
  };

  const stateLabel: Record<DayState, string | null> = {
    available: null, session: 'Session', 'blocked-me': 'Blocked by Me',
    'blocked-admin': 'Admin Leave', weekend: null,
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-calendar3 me-2 text-primary"></i>My Calendar</h1>
        <p className="page-subtitle">Manage your monthly availability — block dates to indicate unavailability</p>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h6 className="fw-700 mb-0" style={{ fontWeight: 700 }}>
            <i className="bi bi-calendar3 me-2 text-primary"></i>My Availability — February 2026
          </h6>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-secondary">← Jan</button>
            <button className="btn btn-sm btn-outline-secondary">Mar →</button>
          </div>
        </div>

        {/* Legend */}
        <div className="d-flex gap-3 mb-3 flex-wrap" style={{ fontSize: '0.78rem' }}>
          {[
            { cls: 'cal-day-free bg-success bg-opacity-25', label: 'Available' },
            { cls: 'cal-day-session', label: 'In Session' },
            { cls: 'cal-day-blocked', label: 'Blocked by Me' },
            { cls: 'bg-info bg-opacity-25', label: 'Admin Leave' },
            { cls: 'bg-secondary bg-opacity-10', label: 'Weekend' },
          ].map(l => (
            <div key={l.label} className="d-flex align-items-center gap-1">
              <span className={`${l.cls} border rounded d-inline-block`} style={{ width: 14, height: 14 }}></span>
              <span className="text-muted">{l.label}</span>
            </div>
          ))}
        </div>

        <p className="text-muted mb-3" style={{ fontSize: '0.8rem' }}>
          Click on a free day to block it. You can block up to <strong>3 consecutive days</strong>. For more, submit a leave request.
        </p>

        {selected.length > 0 && (
          <div className="alert alert-warning py-2 mb-3 d-flex justify-content-between align-items-center">
            <span style={{ fontSize: '0.875rem' }}>{selected.length} day(s) selected to block</span>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-warning" onClick={handleConfirm}>Confirm Block</button>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setSelected([])}>Cancel</button>
            </div>
          </div>
        )}

        {/* Calendar Grid */}
        <div className="cal-grid mb-2">
          {DAY_HEADERS.map(h => <div key={h} className="cal-header">{h}</div>)}
        </div>
        <div className="cal-grid">
          {calendar.map((d, i) => {
            if (d.day === 0) return <div key={`pad-${i}`} className="cal-day" style={{ background: 'transparent', border: 'none' }}></div>;
            const isSelected = selected.includes(d.day);
            return (
              <div
                key={d.day}
                className={`cal-day ${stateStyle[d.state]} ${isSelected ? 'cal-day-selected' : ''}`}
                onClick={() => handleDayClick(d.day, d.state)}
                style={{ cursor: d.state === 'available' || d.state === 'blocked-me' ? 'pointer' : 'default' }}
              >
                <div className="cal-day-num">{d.day}</div>
                {stateLabel[d.state] && (
                  <span className={`cal-day-status ${d.state === 'session' ? 'cal-day-session' : d.state.includes('blocked') ? 'cal-day-blocked' : ''}`}>
                    {stateLabel[d.state]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyCalendar;
