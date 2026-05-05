import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_LEAVE_REQUESTS } from '../../utils/mockData';
import toast from 'react-hot-toast';

const ACTIVITY = [
  { time: 'Feb 17, 11:30 AM', user: 'Allocator-1', role: 'allocator', action: 'Uploaded new batch: Batch 2026-B1 (35 trainees, Room 105)' },
  { time: 'Feb 17, 10:15 AM', user: 'Srinivasan R.', role: 'educator', action: 'Marked session as completed: Java Fundamentals (Batch 2026-A1)' },
  { time: 'Feb 17, 4:45 PM', user: 'Allocator-1', role: 'allocator', action: 'Allocated educator Pooja Mehta to Database Design (Batch 2026-A2)' },
  { time: 'Feb 16, 2:00 PM', user: 'Deepa S.', role: 'educator', action: 'Blocked calendar: Feb 16-18 (self-block, 3 days)' },
  { time: 'Feb 15, 9:00 AM', user: 'Admin', role: 'admin', action: 'Created new user: Arjun Nair (Educator)' },
];

const pending = MOCK_LEAVE_REQUESTS.filter(r => r.status === 'pending');

const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">System-wide overview and pending actions</p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { icon: 'bi-people', label: 'Total Users', value: '52', color: '#4f46e5', bg: '#e0e7ff' },
          { icon: 'bi-collection', label: 'Active Batches', value: '12', color: '#10b981', bg: '#d1fae5' },
          { icon: 'bi-person-badge', label: 'Educators', value: '38', color: '#3b82f6', bg: '#dbeafe' },
          { icon: 'bi-clipboard-check', label: 'Pending Leave', value: String(pending.length), color: '#f59e0b', bg: '#fef3c7' },
          { icon: 'bi-check2-square', label: 'Sessions Completed', value: '456', color: '#7c3aed', bg: '#ede9fe' },
        ].map(s => (
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

      {/* Pending Leave Requests */}
      <div className="content-card mb-4">
        <div className="content-card-header">
          <h6 className="fw-700 mb-0" style={{ fontWeight: 700 }}>
            <i className="bi bi-clipboard-check me-2 text-warning"></i>
            Pending Leave Requests
            {pending.length > 0 && <span className="badge bg-danger ms-2">{pending.length}</span>}
          </h6>
          <Link to="/admin/leave-requests" className="btn btn-sm btn-outline-primary">View All</Link>
        </div>
        {pending.slice(0, 2).map(r => (
          <div key={r.id} className="d-flex align-items-start justify-content-between p-3 border rounded mb-2">
            <div className="d-flex gap-3">
              <div className="rounded-circle bg-warning bg-opacity-20 d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36, flexShrink: 0 }}>
                <i className="bi bi-person text-warning"></i>
              </div>
              <div>
                <div className="fw-600">{r.educatorName}</div>
                <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                  {r.startDate} – {r.endDate} ({r.days} days) · Submitted: {r.submittedDate}
                </div>
                <div className="text-muted" style={{ fontSize: '0.78rem' }}>Reason: {r.reason.slice(0, 80)}...</div>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-success" onClick={() => toast.success(`${r.educatorName}'s leave approved!`)}>
                ✓ Approve
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => toast.error(`${r.educatorName}'s leave rejected.`)}>
                ✗ Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="row g-3 mb-4">
        {[
          { icon: 'bi-person-plus', label: 'Add New User', to: '/admin/add-user' },
          { icon: 'bi-collection', label: 'View Batches', to: '/admin/batches' },
          { icon: 'bi-person-badge', label: 'Educator Profiles', to: '/admin/educators' },
          { icon: 'bi-diagram-3', label: 'All Allocations', to: '/admin/allocations' },
        ].map(a => (
          <div key={a.label} className="col-6 col-md-3">
            <Link to={a.to} className="quick-action">
              <i className={`bi ${a.icon}`}></i>
              {a.label}
            </Link>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="content-card">
        <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>Recent System Activity</h6>
        {ACTIVITY.map((a, i) => (
          <div key={i} className="d-flex gap-3 pb-2 mb-2 border-bottom">
            <span className="text-muted" style={{ fontSize: '0.75rem', minWidth: 130, flexShrink: 0 }}>{a.time}</span>
            <span className={`status-badge badge-${a.role === 'allocator' ? 'scheduled' : a.role === 'educator' ? 'active' : 'upcoming'}`}
              style={{ flexShrink: 0, height: 'fit-content' }}>{a.user}</span>
            <span style={{ fontSize: '0.8rem', color: '#374151' }}>{a.action}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
