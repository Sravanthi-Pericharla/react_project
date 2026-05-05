import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_BATCHES } from '../../utils/mockData';
import { Batch } from '../../types';

const AllBatches: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<Batch | null>(null);

  const TRAINEE_LIST = [
    { name: 'Arun Sharma', email: 'arun.s@mail.com', phone: '9876543210' },
    { name: 'Priya Nair', email: 'priya.n@mail.com', phone: '9876543211' },
    { name: 'Vikram Joshi', email: 'vikram.j@mail.com', phone: '9876543212' },
    { name: 'Sneha Iyer', email: 'sneha.i@mail.com', phone: '9876543213' },
    { name: 'Ravi Kumar', email: 'ravi.k@mail.com', phone: '9876543214' },
  ];

  const filtered = MOCK_BATCHES.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.batchOwner.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-collection me-2 text-primary"></i>All Batches</h1>
        <p className="page-subtitle">Complete overview of all training batches (read-only)</p>
      </div>

      {selected ? (
        <div>
          <button className="btn btn-outline-secondary btn-sm mb-3" onClick={() => setSelected(null)}>← Back to List</button>
          <div className="content-card">
            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>Batch</div>
                <div className="fw-700" style={{ fontWeight: 700 }}>{selected.name}</div>
              </div>
              <div className="col-md-3">
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>Classroom</div>
                <div className="fw-700" style={{ fontWeight: 700 }}>{selected.classroom}</div>
              </div>
              <div className="col-md-3">
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>Owner</div>
                <div className="fw-700" style={{ fontWeight: 700 }}>{selected.batchOwner}</div>
              </div>
              <div className="col-md-3">
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>Educators</div>
                <div className="fw-700" style={{ fontWeight: 700 }}>{selected.allocatedEducators || '—'}</div>
              </div>
            </div>
            <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>Trainee List</h6>
            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th></tr></thead>
                <tbody>
                  {TRAINEE_LIST.map((t, i) => (
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
            <input type="text" className="form-control" style={{ maxWidth: 260 }}
              placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
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
                <tr><th>Batch</th><th>Classroom</th><th>Owner</th><th>Trainees</th><th>Start</th><th>End</th><th>Status</th><th>Educators</th><th>Actions</th></tr>
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
                    <td className="text-muted" style={{ fontSize: '0.8rem' }}>{b.allocatedEducators || '—'}</td>
                    <td><button className="btn btn-sm btn-outline-primary" onClick={() => setSelected(b)}>Details</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AllBatches;
