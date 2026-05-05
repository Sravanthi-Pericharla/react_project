import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

interface NavItem {
  icon: string;
  label: string;
  to: string;
}

interface NavSection {
  label?: string;
  items: NavItem[];
}

const ALLOCATOR_NAV: NavSection[] = [
  { items: [{ icon: 'bi-speedometer2', label: 'Dashboard', to: '/allocator/dashboard' }] },
  { label: 'Batch Management', items: [
    { icon: 'bi-upload', label: 'Upload Batch', to: '/allocator/upload-batch' },
    { icon: 'bi-calendar-plus', label: 'Upload Schedule', to: '/allocator/upload-schedule' },
    { icon: 'bi-grid', label: 'View Batches', to: '/allocator/batches' },
    { icon: 'bi-download', label: 'Download Details', to: '/allocator/download' },
  ]},
  { label: 'Allocation', items: [
    { icon: 'bi-person-check', label: 'Allocate Educator', to: '/allocator/allocate-educator' },
    { icon: 'bi-people', label: 'Allocate Co-Educator', to: '/allocator/allocate-co-educator' },
    { icon: 'bi-calendar3', label: 'Educator Availability', to: '/allocator/availability' },
  ]},
  { label: 'Other', items: [
    { icon: 'bi-bell', label: 'Notifications', to: '/allocator/notifications' },
  ]},
];

const EDUCATOR_NAV: NavSection[] = [
  { items: [{ icon: 'bi-speedometer2', label: 'Dashboard', to: '/educator/dashboard' }] },
  { label: 'Profile & Skills', items: [
    { icon: 'bi-person', label: 'My Profile', to: '/educator/profile' },
    { icon: 'bi-star', label: 'Skill Levels', to: '/educator/skills' },
  ]},
  { label: 'Availability', items: [
    { icon: 'bi-calendar3', label: 'My Calendar', to: '/educator/calendar' },
    { icon: 'bi-clipboard', label: 'Leave Requests', to: '/educator/leave-requests' },
  ]},
  { label: 'Sessions', items: [
    { icon: 'bi-list-check', label: 'Allocated Sessions', to: '/educator/sessions' },
    { icon: 'bi-folder', label: 'Batch Details', to: '/educator/batch-details' },
    { icon: 'bi-check-circle', label: 'Mark Session Done', to: '/educator/mark-done' },
    { icon: 'bi-bar-chart', label: 'Monthly Report', to: '/educator/monthly-report' },
  ]},
  { label: 'Other', items: [
    { icon: 'bi-bell', label: 'Notifications', to: '/educator/notifications' },
  ]},
];

const ADMIN_NAV: NavSection[] = [
  { items: [{ icon: 'bi-speedometer2', label: 'Dashboard', to: '/admin/dashboard' }] },
  { label: 'User Management', items: [
    { icon: 'bi-person-plus', label: 'Add New User', to: '/admin/add-user' },
    { icon: 'bi-people', label: 'Manage Users', to: '/admin/users' },
  ]},
  { label: 'Oversight', items: [
    { icon: 'bi-collection', label: 'All Batches', to: '/admin/batches' },
    { icon: 'bi-person-badge', label: 'Educator Profiles', to: '/admin/educators' },
    { icon: 'bi-diagram-3', label: 'All Allocations', to: '/admin/allocations' },
  ]},
  { label: 'Approvals', items: [
    { icon: 'bi-clipboard2-check', label: 'Leave Requests', to: '/admin/leave-requests' },
  ]},
  { label: 'Other', items: [
    { icon: 'bi-bell', label: 'Notifications', to: '/admin/notifications' },
  ]},
];

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav = user?.role === 'allocator' ? ALLOCATOR_NAV : user?.role === 'educator' ? EDUCATOR_NAV : ADMIN_NAV;

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style={{ zIndex: 999 }}
          onClick={() => setSidebarOpen(false)} />
      )}

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <i className="bi bi-mortarboard-fill text-primary fs-5"></i>
          <span className="brand-text"><span className="brand-highlight">Trainee</span>Pro</span>
        </div>

        <div className={`sidebar-role-badge role-${user?.role}`}>
          {user?.role}
        </div>

        <nav className="sidebar-nav flex-grow-1">
          {nav.map((section, si) => (
            <div key={si}>
              {section.label && <div className="sidebar-section-label">{section.label}</div>}
              {section.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`sidebar-nav-item ${location.pathname === item.to ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className={`bi ${item.icon}`}></i>
                  <span>{item.label}</span>
                  {item.label === 'Notifications' && unreadCount > 0 && (
                    <span className="badge bg-danger ms-auto" style={{ fontSize: '0.65rem' }}>{unreadCount}</span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-3 border-top border-secondary">
          <button className="sidebar-nav-item text-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left"></i>
            <span>← Back to Home</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="topbar">
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-sm btn-outline-secondary sidebar-toggle" onClick={() => setSidebarOpen(true)}>
              <i className="bi bi-list"></i>
            </button>
            <span className="fw-semibold text-muted d-none d-md-inline" style={{ fontSize: '0.875rem' }}>
              {location.pathname.split('/').slice(-1)[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Dashboard'}
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link to={`/${user?.role}/notifications`} className="position-relative text-muted">
              <i className="bi bi-bell fs-5"></i>
              {unreadCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                  {unreadCount}
                </span>
              )}
            </Link>
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                style={{ width: 32, height: 32, fontSize: '0.8rem' }}>
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <span className="fw-semibold d-none d-md-inline" style={{ fontSize: '0.875rem' }}>{user?.name}</span>
            </div>
            <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
