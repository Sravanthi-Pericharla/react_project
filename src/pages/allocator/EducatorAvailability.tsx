import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_EDUCATORS } from '../../utils/mockData';

type DayStatus = 'Free' | 'Session' | 'Blocked' | '-';

const WEEKLY_DATA: Record<string, DayStatus[]> = {
  'Srinivasan R.': ['Free', 'Session', 'Session', 'Free', 'Free', '-', '-'],
  'Pooja Mehta':   ['Session', 'Free', 'Free', 'Session', 'Free', '-', '-'],
  'Karthik V.':   ['Free', 'Free', 'Free', 'Free', 'Session', '-', '-'],
  'Deepa S.':     ['Blocked', 'Blocked', 'Blocked', 'Free', 'Free', '-', '-'],
  'Arjun Nair':   ['Free', 'Session', 'Free', 'Free', 'Session', '-', '-'],
};

const DAYS = ['MON 16', 'TUE 17', 'WED 18', 'THU 19', 'FRI 20', 'SAT 21', 'SUN 22'];

const statusClass: Record<DayStatus, string> = {
  'Free': 'avail-free', 'Session': 'avail-session', 'Blocked': 'avail-blocked', '-': ''
};

const EducatorAvailability: React.FC = () => {
  const [monthLabel, setMonthLabel] = useState('February 2026');
  const [search, setSearch] = useState('');

  const filtered = MOCK_EDUCATORS.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-calendar3 me-2 text-primary"></i>Educator Availability</h1>
        <p className="page-subtitle">Day-wise monthly availability chart for all educators</p>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h6 className="fw-700 mb-0" style={{ fontWeight: 700 }}>
            <i className="bi bi-calendar3 me-2 text-primary"></i>Educator Availability — {monthLabel}
          </h6>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-sm btn-outline-secondary">← Prev</button>
            <input type="month" className="form-control form-control-sm" defaultValue="2026-02"
              onChange={e => setMonthLabel(e.target.value)} style={{ width: 150 }} />
            <button className="btn btn-sm btn-outline-secondary">Next →</button>
          </div>
        </div>

        {/* Legend */}
        <div className="d-flex gap-3 mb-3 flex-wrap">
          {[{ cls: 'avail-free', label: 'Free' }, { cls: 'avail-session', label: 'In Session' }, { cls: 'avail-blocked', label: 'Unavailable / Blocked' }].map(l => (
            <div key={l.label} className="d-flex align-items-center gap-1">
              <span className={`status-badge ${l.cls}`} style={{ width: 12, height: 12, display: 'inline-block', padding: 0, borderRadius: 3 }}></span>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{l.label}</span>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-3">
          <input type="text" className="form-control" style={{ maxWidth: 260 }} placeholder="Search educator..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered mb-0" style={{ fontSize: '0.8rem' }}>
            <thead>
              <tr>
                <th style={{ minWidth: 140 }}>Educator</th>
                {DAYS.map(d => <th key={d} className="text-center">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.map(ed => {
                const days = WEEKLY_DATA[ed.name] || Array(7).fill('Free');
                return (
                  <tr key={ed.id}>
                    <td className="fw-600">{ed.name}</td>
                    {days.map((status, i) => (
                      <td key={i} className="text-center p-1">
                        {status !== '-' ? (
                          <span className={`status-badge ${statusClass[status]}`} style={{ fontSize: '0.7rem' }}>{status}</span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    ))}
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

export default EducatorAvailability;
