import React, { useState } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_SESSIONS } from '../../utils/mockData';

const COURSE_COUNTS = [
  { course: 'Java Fundamentals', count: 10, color: '#4f46e5' },
  { course: 'Spring Boot', count: 6, color: '#10b981' },
  { course: 'Database Design', count: 6, color: '#f59e0b' },
  { course: 'React.js', count: 6, color: '#3b82f6' },
];
const MAX = 10;

const MonthlyReport: React.FC = () => {
  const [fromDate, setFromDate] = useState('2026-01');
  const [toDate, setToDate] = useState('2026-02');

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-bar-chart me-2 text-primary"></i>Monthly Report</h1>
        <p className="page-subtitle">View your monthly session counts and download reports</p>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <h6 className="fw-700 mb-0" style={{ fontWeight: 700 }}>
            <i className="bi bi-bar-chart me-2 text-primary"></i>Monthly Session Report
          </h6>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted" style={{ fontSize: '0.875rem' }}>From:</span>
            <input type="month" className="form-control form-control-sm" value={fromDate} onChange={e => setFromDate(e.target.value)} style={{ width: 150 }} />
            <span className="text-muted" style={{ fontSize: '0.875rem' }}>To:</span>
            <input type="month" className="form-control form-control-sm" value={toDate} onChange={e => setToDate(e.target.value)} style={{ width: 150 }} />
            <button className="btn btn-primary btn-sm">Generate</button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="row g-3 mb-4">
          {[
            { label: 'Total Sessions', value: 28, color: '#4f46e5', bg: '#e0e7ff' },
            { label: 'Completed', value: 24, color: '#10b981', bg: '#d1fae5' },
            { label: 'Upcoming', value: 4, color: '#f59e0b', bg: '#fef3c7' },
            { label: 'As Educator', value: 20, color: '#3b82f6', bg: '#dbeafe' },
            { label: 'As Co-Educator', value: 8, color: '#7c3aed', bg: '#ede9fe' },
          ].map(s => (
            <div key={s.label} className="col-6 col-md-2">
              <div className="text-center p-3 rounded border">
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>Session Distribution by Course</h6>
        <div className="mb-4">
          {COURSE_COUNTS.map(c => (
            <div key={c.course} className="d-flex align-items-center gap-3 mb-2">
              <span style={{ width: 200, fontSize: '0.8rem', color: '#374151', flexShrink: 0 }}>{c.course}</span>
              <div className="flex-grow-1 bg-light rounded" style={{ height: 20, position: 'relative' }}>
                <div className="rounded" style={{
                  height: '100%', width: `${(c.count / MAX) * 100}%`,
                  background: c.color, transition: 'width 0.5s ease'
                }}></div>
              </div>
              <span style={{ width: 24, fontSize: '0.8rem', fontWeight: 700, color: c.color }}>{c.count}</span>
            </div>
          ))}
        </div>

        {/* Sessions table */}
        <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>Session Details</h6>
        <div className="table-responsive mb-3">
          <table className="table table-hover mb-0">
            <thead><tr><th>Course</th><th>Batch</th><th>Date</th><th>Role</th><th>Status</th></tr></thead>
            <tbody>
              {MOCK_SESSIONS.map(s => (
                <tr key={s.id}>
                  <td className="fw-600">{s.course}</td>
                  <td>{s.batch}</td>
                  <td>{s.date}</td>
                  <td><span className={`status-badge ${s.role === 'Educator' ? 'badge-scheduled' : 'badge-upcoming'}`}>{s.role}</span></td>
                  <td><span className={`status-badge badge-${s.status}`}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary btn-sm" onClick={() => toast.success('Excel report downloaded!')}>
            <i className="bi bi-file-earmark-spreadsheet me-2"></i>Download Excel
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={() => toast.success('PDF report downloaded!')}>
            <i className="bi bi-file-earmark-pdf me-2"></i>Download PDF
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MonthlyReport;
