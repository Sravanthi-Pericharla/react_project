import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_BATCHES } from '../../utils/mockData';

const AllocatorDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's an overview of your batch operations.</p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { icon: 'bi-collection', label: 'Active Batches', value: '12', color: '#4f46e5', bg: '#e0e7ff' },
          { icon: 'bi-hourglass-split', label: 'Pending Allocations', value: '8', color: '#f59e0b', bg: '#fef3c7' },
          { icon: 'bi-person-check', label: 'Available Educators', value: '34', color: '#10b981', bg: '#d1fae5' },
          { icon: 'bi-check2-square', label: 'Sessions This Month', value: '156', color: '#3b82f6', bg: '#dbeafe' },
        ].map((s) => (
          <div key={s.label} className="col-6 col-md-3">
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

      {/* Recent Batches */}
      <div className="content-card mb-4">
        <div className="content-card-header">
          <h6 className="fw-700 mb-0" style={{ fontWeight: 700 }}>
            <i className="bi bi-collection me-2 text-primary"></i>Recent Batches
          </h6>
          <Link to="/allocator/batches" className="btn btn-sm btn-outline-primary">View All</Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Batch Name</th>
                <th>Classroom</th>
                <th>Batch Owner</th>
                <th>Trainees</th>
                <th>Start Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BATCHES.slice(0, 3).map((b) => (
                <tr key={b.id}>
                  <td className="fw-600">{b.name}</td>
                  <td>{b.classroom}</td>
                  <td>{b.batchOwner}</td>
                  <td>{b.trainees}</td>
                  <td>{b.startDate}</td>
                  <td><span className={`status-badge badge-${b.status}`}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="content-card">
        <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>Quick Actions</h6>
        <div className="row g-3">
          {[
            { icon: 'bi-upload', label: 'Upload New Batch', to: '/allocator/upload-batch' },
            { icon: 'bi-calendar-plus', label: 'Upload Schedule', to: '/allocator/upload-schedule' },
            { icon: 'bi-person-check', label: 'Allocate Educator', to: '/allocator/allocate-educator' },
            { icon: 'bi-calendar3', label: 'Check Availability', to: '/allocator/availability' },
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

export default AllocatorDashboard;
