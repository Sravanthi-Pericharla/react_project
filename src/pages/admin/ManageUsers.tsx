import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_EDUCATORS } from '../../utils/mockData';

const USERS = [
  { id: '1', name: 'Allocator-1', email: 'alloc1@traineepro.com', role: 'allocator', department: 'Training Ops', status: 'active' },
  { id: '2', name: 'Srinivasan R.', email: 'srinivasan.r@traineepro.com', role: 'educator', department: 'Software Eng.', status: 'active' },
  { id: '3', name: 'Pooja Mehta', email: 'pooja.m@traineepro.com', role: 'educator', department: 'Computer Sci.', status: 'active' },
  { id: '4', name: 'Karthik V.', email: 'karthik.v@traineepro.com', role: 'educator', department: 'Info. Tech.', status: 'active' },
  { id: '5', name: 'Deepa S.', email: 'deepa.s@traineepro.com', role: 'educator', department: 'Software Eng.', status: 'active' },
  { id: '6', name: 'Arjun Nair', email: 'arjun.n@traineepro.com', role: 'educator', department: 'Data Science', status: 'active' },
  { id: '7', name: 'Allocator-2', email: 'alloc2@traineepro.com', role: 'allocator', department: 'Training Ops', status: 'inactive' },
];

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState(USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== id) return u;
      const newStatus = u.status === 'active' ? 'inactive' : 'active';
      toast.success(`${u.name} ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
      return { ...u, status: newStatus };
    }));
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-people me-2 text-primary"></i>Manage Users</h1>
        <p className="page-subtitle">View, edit, and manage all user accounts</p>
      </div>

      <div className="content-card">
        <div className="d-flex gap-2 mb-3 flex-wrap align-items-center justify-content-between">
          <div className="d-flex gap-2 flex-wrap">
            <input type="text" className="form-control" style={{ maxWidth: 240 }}
              placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
            <select className="form-select" style={{ maxWidth: 140 }} value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="allocator">Allocator</option>
              <option value="educator">Educator</option>
            </select>
            <select className="form-select" style={{ maxWidth: 140 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <Link to="/admin/add-user" className="btn btn-primary btn-sm">
            <i className="bi bi-plus me-1"></i>Add User
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td className="fw-600">{u.name}</td>
                  <td className="text-muted" style={{ fontSize: '0.875rem' }}>{u.email}</td>
                  <td>
                    <span className={`status-badge ${u.role === 'allocator' ? 'badge-scheduled' : 'badge-active'}`}>
                      {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                    </span>
                  </td>
                  <td className="text-muted" style={{ fontSize: '0.875rem' }}>{u.department}</td>
                  <td>
                    <span className={`status-badge ${u.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
                      {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => toast.success('Edit user (UI only)')}>Edit</button>
                      <button
                        className={`btn btn-sm ${u.status === 'active' ? 'btn-outline-danger' : 'btn-outline-success'}`}
                        onClick={() => toggleStatus(u.id)}
                      >
                        {u.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center text-muted py-4">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
