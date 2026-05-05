import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useNotifications } from '../../context/NotificationContext';

const typeIcon: Record<string, string> = {
  allocation: 'bi-person-check text-primary',
  availability: 'bi-calendar-x text-warning',
  batch: 'bi-collection text-success',
  leave: 'bi-clipboard-check text-danger',
  system: 'bi-gear text-secondary',
};

const AdminNotifications: React.FC = () => {
  const { notifications, markAsRead, markAllRead } = useNotifications();

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title"><i className="bi bi-bell me-2 text-primary"></i>Notifications</h1>
        <p className="page-subtitle">Stay informed about pending approvals and system events</p>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-700 mb-0" style={{ fontWeight: 700 }}>
            <i className="bi bi-bell me-2 text-warning"></i>Notifications
            <span className="badge bg-danger ms-2">{notifications.filter(n => !n.read).length}</span>
          </h6>
          <button className="btn btn-sm btn-outline-secondary" onClick={markAllRead}>Mark all as read</button>
        </div>

        {notifications.map(n => (
          <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}
            onClick={() => markAsRead(n.id)} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-start gap-3">
              <i className={`bi ${typeIcon[n.type] || 'bi-bell'} mt-1`}></i>
              <div className="flex-grow-1">
                <p className="notif-title">{n.message}</p>
                <p className="notif-detail">{n.detail}</p>
                <span className="notif-time">{n.time}</span>
              </div>
              {!n.read && <span className="badge bg-primary rounded-pill" style={{ fontSize: '0.6rem' }}>New</span>}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AdminNotifications;
