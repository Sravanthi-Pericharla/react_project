import React, { useState } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_BATCHES, MOCK_EDUCATORS, COURSES } from '../../utils/mockData';

const AllocateCoEducator: React.FC = () => {
  const [batchId, setBatchId] = useState('');
  const [course, setCourse] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!batchId) e.batchId = 'Please select a batch';
    if (!course) e.course = 'Please select a course';
    if (!sessionDate) e.sessionDate = 'Please select a session date';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const getSkillForCourse = (educatorId: string) => {
    const ed = MOCK_EDUCATORS.find(e => e.id === educatorId);
    if (!ed) return '';
    return ed.skills.find(s => s.course === course)?.level || 'Low';
  };

  const AVAILABILITY: Record<string, 'Available' | 'Unavailable'> = {
    '1': 'Available', '2': 'Available', '3': 'Available', '4': 'Unavailable', '5': 'Available',
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-people me-2 text-warning"></i>Allocate Co-Educator</h1>
        <p className="page-subtitle">Assign co-educators to training sessions</p>
      </div>

      <div className="content-card">
        <div className="alert alert-success mb-3" style={{ fontSize: '0.875rem' }}>
          <i className="bi bi-info-circle me-2"></i>
          For co-educators, educators with <strong>High</strong>, <strong>Medium</strong>, or <strong>Low</strong> skill levels can be allocated.
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Select Batch *</label>
            <select className={`form-select ${errors.batchId ? 'is-invalid' : ''}`} value={batchId}
              onChange={e => { setBatchId(e.target.value); setErrors({}); }}>
              <option value="">— Select a batch —</option>
              {MOCK_BATCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            {errors.batchId && <div className="invalid-feedback">{errors.batchId}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Select Course *</label>
            <select className={`form-select ${errors.course ? 'is-invalid' : ''}`} value={course}
              onChange={e => { setCourse(e.target.value); setErrors({}); }}>
              <option value="">— Select a course —</option>
              {COURSES.map(c => <option key={c}>{c}</option>)}
            </select>
            {errors.course && <div className="invalid-feedback">{errors.course}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Month</label>
            <input type="month" className="form-control" defaultValue="2026-02" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Session Date *</label>
            <input type="date" className={`form-control ${errors.sessionDate ? 'is-invalid' : ''}`}
              value={sessionDate} onChange={e => { setSessionDate(e.target.value); setErrors({}); }} />
            {errors.sessionDate && <div className="invalid-feedback">{errors.sessionDate}</div>}
          </div>
        </div>

        <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>Available Educators for Co-Educator Role</h6>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead><tr><th>Educator</th><th>Department</th><th>Availability</th><th>Skill Level</th><th>Action</th></tr></thead>
            <tbody>
              {MOCK_EDUCATORS.map(ed => {
                const avail = AVAILABILITY[ed.id];
                const level = course ? getSkillForCourse(ed.id) : '—';
                return (
                  <tr key={ed.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: 32, height: 32, fontSize: '0.8rem' }}>{ed.name[0]}</div>
                        <span className="fw-600">{ed.name}</span>
                      </div>
                    </td>
                    <td className="text-muted" style={{ fontSize: '0.875rem' }}>Dept. {ed.department}</td>
                    <td>
                      <span className={`status-badge ${avail === 'Available' ? 'badge-active' : 'badge-on-leave'}`}>{avail}</span>
                    </td>
                    <td>
                      {level !== '—' && (
                        <span className={`status-badge ${level === 'High' ? 'badge-active' : level === 'Medium' ? 'badge-upcoming' : 'badge-rejected'}`}>{level}</span>
                      )}
                      {level === '—' && <span className="text-muted">—</span>}
                    </td>
                    <td>
                      {avail === 'Unavailable' ? (
                        <button className="btn btn-sm btn-secondary" disabled>Unavailable</button>
                      ) : (
                        <button className="btn btn-sm btn-success" onClick={() => { if (validate()) toast.success(`${ed.name} allocated as co-educator!`); }}>
                          Allocate
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllocateCoEducator;
