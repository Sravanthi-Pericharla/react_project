import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_SESSIONS } from '../../utils/mockData';

const EducatorDashboard: React.FC = () => {
  const todaySessions = MOCK_SESSIONS.filter(s => s.status === 'today');

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Your sessions, availability, and skill overview.</p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { icon: 'bi-calendar2-check', label: 'Allocated Sessions', value: '18', color: '#4f46e5', bg: '#e0e7ff' },
          { icon: 'bi-check-circle', label: 'Completed', value: '14', color: '#10b981', bg: '#d1fae5' },
          { icon: 'bi-calendar-event', label: 'Upcoming', value: '4', color: '#f59e0b', bg: '#fef3c7' },
          { icon: 'bi-star', label: 'Skills Updated', value: '8', color: '#3b82f6', bg: '#dbeafe' },
          { icon: 'bi-calendar-x', label: 'Days Blocked', value: '2', color: '#ef4444', bg: '#fee2e2' },
        ].map((s) => (
          <div key={s.label} className="col-6 col-md-2">
            <div className="stat-card">
              <div className="stat-card-icon" style={{ background: s.bg }}>
                <i className={`bi ${s.icon}`} style={{ color: s.color }}></i>
              </div>
              <div>
                <div className="stat-card-value" style={{ color: s.color }}>{s.value}</div>
                <div className="stat-card-label">{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Sessions */}
      <div className="content-card mb-4">
        <div className="content-card-header">
          <h6 className="fw-700 mb-0" style={{ fontWeight: 700 }}>Today's Sessions</h6>
          <span className="text-muted" style={{ fontSize: '0.8rem' }}>Feb 17, 2026</span>
        </div>
        {todaySessions.length === 0 ? (
          <p className="text-muted text-center py-3">No sessions today</p>
        ) : (
          todaySessions.map(s => (
            <div key={s.id} className="d-flex align-items-center justify-content-between p-3 border rounded mb-2">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle bg-success d-flex align-items-center justify-content-center"
                  style={{ width: 28, height: 28 }}>
                  <i className="bi bi-check2 text-white" style={{ fontSize: '0.8rem' }}></i>
                </div>
                <div>
                  <div className="fw-600" style={{ fontWeight: 600 }}>{s.course}</div>
                  <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                    {s.batch} · {s.classroom} · {s.time} · Role: {s.role}
                  </div>
                </div>
              </div>
              <span className="status-badge badge-today">Today</span>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="content-card">
        <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>Quick Actions</h6>
        <div className="row g-3">
          {[
            { icon: 'bi-check-circle', label: 'Mark Sessions', to: '/educator/mark-done' },
            { icon: 'bi-star', label: 'Update Skills', to: '/educator/skills' },
            { icon: 'bi-calendar3', label: 'My Calendar', to: '/educator/calendar' },
            { icon: 'bi-bar-chart', label: 'View Report', to: '/educator/monthly-report' },
          ].map((a) => (
            <div key={a.label} className="col-6 col-md-3">
              <Link to={a.to} className="quick-action">
                <i className={`bi ${a.icon}`}></i>
                {a.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EducatorDashboard;
