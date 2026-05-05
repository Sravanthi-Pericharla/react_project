import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_EDUCATORS } from '../../utils/mockData';
import { Educator } from '../../types';

const EducatorProfiles: React.FC = () => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [selected, setSelected] = useState<Educator | null>(null);

  const DEPARTMENTS = ['all', 'Software Engineering', 'Computer Science', 'Information Technology', 'Data Science'];

  const filtered = MOCK_EDUCATORS.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'all' || e.department === deptFilter;
    return matchSearch && matchDept;
  });

  const levelBadge = (level: string) =>
    level === 'High' ? 'badge-active' : level === 'Medium' ? 'badge-upcoming' : 'badge-rejected';

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-person-badge me-2 text-primary"></i>Educator Profiles</h1>
        <p className="page-subtitle">View all educator profiles, skill levels, and allocation details</p>
      </div>

      {selected ? (
        <div>
          <button className="btn btn-outline-secondary btn-sm mb-3" onClick={() => setSelected(null)}>← Back to List</button>
          <div className="content-card">
            <div className="d-flex align-items-start gap-4 mb-4">
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                style={{ width: 64, height: 64, fontSize: '1.5rem', flexShrink: 0 }}>{selected.name[0]}</div>
              <div>
                <h5 className="fw-700 mb-1" style={{ fontWeight: 700 }}>{selected.name}</h5>
                <p className="text-muted mb-1" style={{ fontSize: '0.875rem' }}>{selected.designation} · {selected.department}</p>
                <p className="text-muted mb-1" style={{ fontSize: '0.875rem' }}>{selected.email} · {selected.phone}</p>
                <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Specialization: {selected.specialization}</p>
              </div>
            </div>
            <h6 className="fw-700 mb-3" style={{ fontWeight: 700 }}>Course Skill Levels</h6>
            <div className="d-flex flex-wrap gap-2">
              {selected.skills.map(s => s.level && (
                <span key={s.course} className={`status-badge ${levelBadge(s.level)}`}>
                  {s.course}: {s.level}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="content-card">
          <div className="d-flex gap-2 mb-3 flex-wrap">
            <input type="text" className="form-control" style={{ maxWidth: 240 }}
              placeholder="Search educator..." value={search} onChange={e => setSearch(e.target.value)} />
            <select className="form-select" style={{ maxWidth: 200 }} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d === 'all' ? 'All Departments' : d}</option>)}
            </select>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr><th>Name</th><th>Dept</th><th>Specialization</th><th>Sessions (Month)</th><th>Skills</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: 30, height: 30, fontSize: '0.75rem', flexShrink: 0 }}>{e.name[0]}</div>
                        <div>
                          <div className="fw-600">{e.name}</div>
                          <div className="text-muted" style={{ fontSize: '0.72rem' }}>{e.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-muted" style={{ fontSize: '0.875rem' }}>{e.department.split(' ')[0]}</td>
                    <td className="text-muted" style={{ fontSize: '0.875rem' }}>{e.specialization}</td>
                    <td className="text-center fw-600">{Math.floor(Math.random() * 15) + 8}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {e.skills.slice(0, 3).map(s => s.level && (
                          <span key={s.course} className={`status-badge ${levelBadge(s.level)}`} style={{ fontSize: '0.65rem' }}>
                            {s.course.split(' ')[0]}: {s.level.slice(0, 3)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge badge-${e.status === 'active' ? 'active' : e.status === 'inactive' ? 'inactive' : 'on-leave'}`}>
                        {e.status === 'on-leave' ? 'On Leave' : e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => setSelected(e)}>View Full</button>
                    </td>
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

export default EducatorProfiles;
