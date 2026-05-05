import React, { useState } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_SESSIONS } from '../../utils/mockData';

const MarkSessionDone: React.FC = () => {
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const TODAY = 'Feb 17';

  const handleMark = (id: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, status: 'completed' } : s));
    toast.success('Session marked as completed!');
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-check-circle me-2 text-success"></i>Mark Session Done</h1>
        <p className="page-subtitle">Mark your sessions as completed after conducting them</p>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-700 mb-0" style={{ fontWeight: 700 }}>
            <i className="bi bi-check2-square me-2 text-success"></i>Mark Session as Done
          </h6>
          <span className="text-muted" style={{ fontSize: '0.8rem' }}>Today: {TODAY}, 2026</span>
        </div>

        <p className="text-muted mb-3" style={{ fontSize: '0.875rem' }}>
          Click the circle to mark a session as completed. You can only mark sessions on or after the session date.
        </p>

        {sessions.map(s => {
          const isToday = s.status === 'today';
          const isCompleted = s.status === 'completed';
          const isUpcoming = s.status === 'upcoming';
          return (
            <div
              key={s.id}
              className={`d-flex align-items-center justify-content-between p-3 border rounded mb-2 ${isCompleted ? 'border-success' : ''}`}
              style={{ background: isCompleted ? '#f0fdf4' : '#fff' }}
            >
              <div className="d-flex align-items-center gap-3">
                <button
                  className={`btn btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center border-2 ${
                    isCompleted ? 'btn-success' : isToday ? 'btn-outline-success' : 'btn-outline-secondary'
                  }`}
                  style={{ width: 32, height: 32 }}
                  disabled={isCompleted || isUpcoming}
                  onClick={() => handleMark(s.id)}
                >
                  {isCompleted
                    ? <i className="bi bi-check2" style={{ fontSize: '1rem' }}></i>
                    : <i className="bi bi-circle" style={{ fontSize: '0.7rem' }}></i>
                  }
                </button>
                <div>
                  <div className={`fw-600 ${isCompleted ? 'text-success' : ''}`} style={{ fontWeight: 600 }}>
                    {s.course}
                    {isCompleted && <i className="bi bi-check-circle-fill text-success ms-2" style={{ fontSize: '0.85rem' }}></i>}
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                    {s.batch} · {s.classroom} · {s.date} · {s.time} · Role: {s.role}
                  </div>
                </div>
              </div>
              <span className={`status-badge badge-${s.status}`}>
                {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
              </span>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default MarkSessionDone;
