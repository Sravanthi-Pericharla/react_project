import React, { useState } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_BATCHES } from '../../utils/mockData';

const TRAINEES = [
  { name: 'Arun Sharma', email: 'arun.s@mail.com', phone: '9876543210' },
  { name: 'Priya Nair', email: 'priya.n@mail.com', phone: '9876543211' },
  { name: 'Vikram Joshi', email: 'vikram.j@mail.com', phone: '9876543212' },
  { name: 'Sneha Iyer', email: 'sneha.i@mail.com', phone: '9876543213' },
  { name: 'Ravi Kumar', email: 'ravi.k@mail.com', phone: '9876543214' },
];

const BatchDetails: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState(MOCK_BATCHES[0]);

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-folder me-2 text-primary"></i>Batch Details</h1>
        <p className="page-subtitle">Access and download batch details for your allocated sessions</p>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            <select className="form-select form-select-sm" style={{ width: 220 }}
              value={selectedBatch.id} onChange={e => setSelectedBatch(MOCK_BATCHES.find(b => b.id === e.target.value) || MOCK_BATCHES[0])}>
              {MOCK_BATCHES.slice(0, 3).map(b => <option key={b.id} value={b.id}>{b.name} ({b.classroom})</option>)}
            </select>
          </div>
          <button className="btn btn-sm btn-primary" onClick={() => toast.success('Download started!')}>
            <i className="bi bi-download me-2"></i>Download
          </button>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Batch Name</div>
            <div className="fw-700" style={{ fontWeight: 700 }}>{selectedBatch.name}</div>
          </div>
          <div className="col-md-3">
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Classroom</div>
            <div className="fw-700" style={{ fontWeight: 700 }}>{selectedBatch.classroom}</div>
          </div>
          <div className="col-md-3">
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Batch Owner</div>
            <div className="fw-700" style={{ fontWeight: 700 }}>{selectedBatch.batchOwner}</div>
          </div>
          <div className="col-md-3">
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Trainees</div>
            <div className="fw-700" style={{ fontWeight: 700 }}>{selectedBatch.trainees}</div>
          </div>
        </div>

        <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>Trainee List</h6>
        <div className="table-responsive">
          <table className="table table-bordered mb-0">
            <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th></tr></thead>
            <tbody>
              {TRAINEES.map((t, i) => (
                <tr key={i}><td>{i + 1}</td><td>{t.name}</td><td>{t.email}</td><td>{t.phone}</td></tr>
              ))}
              <tr>
                <td colSpan={4} className="text-center text-muted" style={{ fontSize: '0.875rem' }}>
                  ... and {selectedBatch.trainees - 5} more trainees
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-outline-primary btn-sm" onClick={() => toast.success('Excel download started!')}>
            <i className="bi bi-file-earmark-spreadsheet me-2"></i>Download Excel
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={() => toast.success('PDF download started!')}>
            <i className="bi bi-file-earmark-pdf me-2"></i>Download PDF
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BatchDetails;
