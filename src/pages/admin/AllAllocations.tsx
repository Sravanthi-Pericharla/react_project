import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_ALLOCATIONS } from '../../utils/mockData';

const AllAllocations: React.FC = () => {
  const [batchFilter, setBatchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const batches = ['all', ...Array.from(new Set(MOCK_ALLOCATIONS.map(a => a.batch)))];

  const filtered = MOCK_ALLOCATIONS.filter(a => {
    const matchSearch = a.course.toLowerCase().includes(search.toLowerCase()) ||
      a.educator.toLowerCase().includes(search.toLowerCase());
    const matchBatch = batchFilter === 'all' || a.batch === batchFilter;
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchBatch && matchStatus;
  });

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-diagram-3 me-2 text-primary"></i>All Allocations</h1>
        <p className="page-subtitle">System-wide view of all session allocations</p>
      </div>

      <div className="content-card">
        <div className="d-flex gap-2 mb-3 flex-wrap">
          <input type="text" className="form-control" style={{ maxWidth: 240 }}
            placeholder="Search course or educator..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="form-select" style={{ maxWidth: 180 }} value={batchFilter} onChange={e => setBatchFilter(e.target.value)}>
            {batches.map(b => <option key={b} value={b}>{b === 'all' ? 'All Batches' : b}</option>)}
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
              <tr><th>Course</th><th>Batch</th><th>Educator</th><th>Co-Educator</th><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td className="fw-600">{a.course}</td>
                  <td>{a.batch}</td>
                  <td>{a.educator}</td>
                  <td className="text-muted">{a.coEducator}</td>
                  <td>{a.date}</td>
                  <td><span className={`status-badge badge-${a.status}`}>{a.status.charAt(0).toUpperCase() + a.status.slice(1)}</span></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center text-muted py-4">No allocations found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllAllocations;
