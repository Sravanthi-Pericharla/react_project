import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_BATCHES } from '../../utils/mockData';
import { Batch } from '../../types';

const ViewBatches: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<Batch | null>(null);

  const filtered = MOCK_BATCHES.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.batchOwner.toLowerCase().includes(search.toLowerCase()) ||
      b.classroom.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const TRAINEE_DETAIL = [
    { name: 'Arun Sharma', email: 'arun.s@mail.com', phone: '9876543210' },
    { name: 'Priya Nair', email: 'priya.n@mail.com', phone: '9876543211' },
    { name: 'Vikram Joshi', email: 'vikram.j@mail.com', phone: '9876543212' },
    { name: 'Sneha Iyer', email: 'sneha.i@mail.com', phone: '9876543213' },
    { name: 'Ravi Kumar', email: 'ravi.k@mail.com', phone: '9876543214' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-grid me-2 text-primary"></i>All Batches</h1>
        <p className="page-subtitle">View and manage all trainee batches</p>
      </div>

      {selected ? (
        <div>
          <button className="btn btn-outline-secondary btn-sm mb-3" onClick={() => setSelected(null)}>
            ← Back to List
          </button>
          <div className="content-card">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h5 className="fw-700 mb-1" style={{ fontWeight: 700 }}>{selected.name}</h5>
                <div className="d-flex gap-3 text-muted" style={{ fontSize: '0.875rem' }}>
                  <span><i className="bi bi-building me-1"></i>{selected.classroom}</span>
                  <span><i className="bi bi-person me-1"></i>{selected.batchOwner}</span>
                  <span><i className="bi bi-people me-1"></i>{selected.trainees} trainees</span>
                </div>
              </div>
              <span className={`status-badge badge-${selected.status}`}>{selected.status}</span>
            </div>
            <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>Trainee List</h6>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th></tr></thead>
                <tbody>
                  {TRAINEE_DETAIL.map((t, i) => (
                    <tr key={i}><td>{i + 1}</td><td>{t.name}</td><td>{t.email}</td><td>{t.phone}</td></tr>
                  ))}
                  <tr><td colSpan={4} className="text-center text-muted">... {selected.trainees - 5} more trainees</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="content-card">
          <div className="d-flex gap-2 mb-3 flex-wrap">
            <input type="text" className="form-control" style={{ maxWidth: 260 }} placeholder="Search batches..."
              value={search} onChange={e => setSearch(e.target.value)} />
            <select className="form-select" style={{ maxWidth: 160 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr><th>Batch Name</th><th>Classroom</th><th>Batch Owner</th><th>Trainees</th><th>Start</th><th>End</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id}>
                    <td className="fw-600">{b.name}</td>
                    <td>{b.classroom}</td>
                    <td>{b.batchOwner}</td>
                    <td>{b.trainees}</td>
                    <td>{b.startDate}</td>
                    <td>{b.endDate}</td>
                    <td><span className={`status-badge badge-${b.status}`}>{b.status}</span></td>
                    <td><button className="btn btn-sm btn-outline-primary" onClick={() => setSelected(b)}>View</button></td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center text-muted py-4">No batches found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ViewBatches;
