import React, { useState } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_LEAVE_REQUESTS } from '../../utils/mockData';
import { LeaveRequest } from '../../types';

const AdminLeaveRequests: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [statusFilter, setStatusFilter] = useState('pending');

  const pending = requests.filter(r => r.status === 'pending');
  const resolved = requests.filter(r => r.status !== 'pending');
  const displayed = statusFilter === 'pending' ? pending : resolved;

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    const remark = remarks[id] || (action === 'approved' ? 'Approved.' : 'Request rejected.');
    setRequests(prev => prev.map(r =>
      r.id === id ? { ...r, status: action, adminRemarks: remark } : r
    ));
    toast[action === 'approved' ? 'success' : 'error'](
      `Leave request ${action} successfully!`
    );
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-clipboard2-check me-2 text-primary"></i>Leave Requests</h1>
        <p className="page-subtitle">Review and act on extended unavailability requests from educators</p>
      </div>

      {/* Pending section */}
      <div className="content-card mb-4">
        <div className="content-card-header">
          <h6 className="fw-700 mb-0" style={{ fontWeight: 700 }}>
            <i className="bi bi-hourglass-split me-2 text-warning"></i>Extended Leave Requests
            {pending.length > 0 && <span className="badge bg-danger ms-2">{pending.length}</span>}
          </h6>
          <select className="form-select form-select-sm" style={{ width: 140 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {statusFilter === 'pending' && pending.length === 0 && (
          <div className="text-center py-4 text-muted">
            <i className="bi bi-check-circle text-success" style={{ fontSize: '2rem' }}></i>
            <p className="mt-2">No pending leave requests</p>
          </div>
        )}

        {statusFilter === 'pending' && pending.map(r => (
          <div key={r.id} className="border rounded p-3 mb-3">
            <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
              <div className="d-flex gap-3">
                <div className="rounded-circle bg-warning bg-opacity-20 d-flex align-items-center justify-content-center"
                  style={{ width: 40, height: 40, flexShrink: 0 }}>
                  <i className="bi bi-person text-warning"></i>
                </div>
                <div>
                  <div className="fw-700" style={{ fontWeight: 700 }}>{r.educatorName}</div>
                  <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                    <i className="bi bi-calendar3 me-1"></i>{r.startDate} – {r.endDate} ({r.days} days)
                    · Submitted: {r.submittedDate}
                  </div>
                  <div className="mt-1" style={{ fontSize: '0.875rem' }}>Reason: {r.reason}</div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-success"
                  onClick={() => handleAction(r.id, 'approved')}>
                  ✓ Approve
                </button>
                <button className="btn btn-sm btn-outline-danger"
                  onClick={() => handleAction(r.id, 'rejected')}>
                  ✗ Reject
                </button>
              </div>
            </div>
            <div className="mt-2">
              <input type="text" className="form-control form-control-sm" style={{ maxWidth: 400 }}
                placeholder="Optional admin remarks..."
                value={remarks[r.id] || ''}
                onChange={e => setRemarks(prev => ({ ...prev, [r.id]: e.target.value }))} />
            </div>
          </div>
        ))}

        {statusFilter === 'resolved' && (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr><th>Educator</th><th>Dates</th><th>Reason</th><th>Status</th><th>Admin Remarks</th></tr>
              </thead>
              <tbody>
                {resolved.map(r => (
                  <tr key={r.id}>
                    <td className="fw-600">{r.educatorName}</td>
                    <td>{r.startDate} – {r.endDate}</td>
                    <td style={{ maxWidth: 200, fontSize: '0.875rem' }}>{r.reason}</td>
                    <td><span className={`status-badge badge-${r.status}`}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span></td>
                    <td className="text-muted" style={{ fontSize: '0.875rem' }}>{r.adminRemarks || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminLeaveRequests;
