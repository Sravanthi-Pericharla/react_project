import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_SESSIONS } from '../../utils/mockData';

const AllocatedSessions: React.FC = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = MOCK_SESSIONS.filter(s => {
    const matchSearch = s.course.toLowerCase().includes(search.toLowerCase()) ||
      s.batch.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || s.role === roleFilter;
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-list-check me-2 text-primary"></i>Allocated Sessions</h1>
        <p className="page-subtitle">All sessions assigned to you with details</p>
      </div>

      <div className="content-card">
        <div className="d-flex gap-2 mb-3 flex-wrap">
          <input type="text" className="form-control" style={{ maxWidth: 240 }}
            placeholder="Search course or batch..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="form-select" style={{ maxWidth: 160 }} value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="Educator">Educator</option>
            <option value="Co-Educator">Co-Educator</option>
          </select>
          <select className="form-select" style={{ maxWidth: 160 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="today">Today</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Course</th><th>Batch</th><th>Classroom</th>
                <th>Date</th><th>Time</th><th>Role</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td className="fw-600">{s.course}</td>
                  <td>{s.batch}</td>
                  <td>{s.classroom}</td>
                  <td>{s.date}</td>
                  <td>{s.time}</td>
                  <td>
                    <span className={`status-badge ${s.role === 'Educator' ? 'badge-scheduled' : 'badge-upcoming'}`}>
                      {s.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge badge-${s.status}`}>
                      {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center text-muted py-4">No sessions found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllocatedSessions;
