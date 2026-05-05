import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const dashboardLink = isAuthenticated ? `/${user?.role}/dashboard` : '/login';

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/">
            <i className="bi bi-mortarboard-fill text-primary fs-4"></i>
            <span style={{ color: '#f8fafc', fontWeight: 800 }}><span style={{ color: '#818cf8' }}>Trainee</span>Pro</span>
          </a>
          <div className="d-flex align-items-center gap-3">
            <a href="#roles" className="text-secondary text-decoration-none d-none d-md-block" style={{ fontSize: '0.875rem' }}>Roles</a>
            <a href="#features" className="text-secondary text-decoration-none d-none d-md-block" style={{ fontSize: '0.875rem' }}>Features</a>
            <Link to={dashboardLink} className="btn btn-primary btn-sm px-3">
              {isAuthenticated ? 'Dashboard' : 'Sign In'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="hero-title mb-4">
                <span className="hero-highlight">Smart Trainee Batch</span><br />
                Management & Allocation
              </h1>
              <p className="text-secondary mb-4" style={{ fontSize: '1.1rem' }}>
                Streamline batch uploads, training schedules, educator allocation, and session tracking — all in one powerful, intuitive platform.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="#roles" className="btn btn-outline-light px-4">
                  <i className="bi bi-person-workspace me-2"></i>Explore Roles
                </a>
                <Link to={dashboardLink} className="btn btn-primary px-4">
                  <i className="bi bi-arrow-right-circle me-2"></i>Sign In to Dashboard
                </Link>
              </div>
            </div>
          </div>
          {/* Stats */}
          <div className="row g-4 mt-4 justify-content-center">
            {[
              { value: '48', label: 'Active Batches' },
              { value: '156', label: 'Registered Educators' },
              { value: '2,340', label: 'Sessions Completed' },
              { value: '890', label: 'Allocations Made' },
            ].map((s) => (
              <div key={s.label} className="col-6 col-md-3">
                <div className="stat-hero">
                  <div className="stat-hero-value">{s.value}</div>
                  <div className="stat-hero-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-800" style={{ fontWeight: 800 }}>How It Works</h2>
            <p className="text-muted">A streamlined workflow from batch creation to session completion.</p>
          </div>
          <div className="row g-3 justify-content-center">
            {[
              { step: 1, title: 'Admin Onboards Users', desc: 'Admin creates allocator and educator accounts, sends login credentials via email.' },
              { step: 2, title: 'Educators Set Profiles', desc: 'Educators update profiles, set course skill levels, and manage their availability calendars.' },
              { step: 3, title: 'Allocator Uploads Batch', desc: 'Allocator uploads trainee name list, classroom details, and training schedule for new batches.' },
              { step: 4, title: 'Sessions Allocated', desc: 'Allocator assigns educators and co-educators to sessions based on availability and skill.' },
              { step: 5, title: 'Training & Tracking', desc: 'Educators conduct sessions, mark them complete, and generate monthly reports.' },
            ].map((s) => (
              <div key={s.step} className="col-md-4 col-lg-2">
                <div className="text-center p-3">
                  <div className="rounded-circle bg-primary text-white mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: 40, height: 40 }}>{s.step}</div>
                  <h6 className="fw-700" style={{ fontWeight: 700, fontSize: '0.875rem' }}>{s.title}</h6>
                  <p className="text-muted" style={{ fontSize: '0.78rem' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="py-5" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2 style={{ fontWeight: 800 }}>Three Powerful Roles</h2>
            <p className="text-muted">Each role is designed with purpose-built features.</p>
          </div>
          <div className="row g-4">
            {[
              {
                icon: 'bi-diagram-3', color: '#4f46e5', badge: 'ALLOCATOR',
                desc: 'Manage trainee batches, upload schedules, and allocate educators to sessions based on availability and skill level.',
                features: ['Upload trainee batches (Excel)', 'Upload & manage training schedules', 'Download trainee details & schedule', 'Allocate educators by skill level', 'Allocate co-educators (all skill levels)', 'View day-wise educator availability'],
                link: '/login'
              },
              {
                icon: 'bi-person-video3', color: '#10b981', badge: 'EDUCATOR',
                desc: 'Manage your profile, control availability, view allocations, and track session completion.',
                features: ['Profile creation & updates', 'Course-wise skill level management', 'Monthly availability calendar', 'View allocated sessions & batch details', 'Mark sessions done'],
                link: '/login'
              },
              {
                icon: 'bi-shield-check', color: '#f59e0b', badge: 'ADMIN',
                desc: 'Oversee the entire system — manage users, view all data, and handle approval requests.',
                features: ['Add new allocators & educators', 'View all batches & educator profiles', 'View all allocation details', 'Approve/reject extended leave'],
                link: '/login'
              },
            ].map((role) => (
              <div key={role.badge} className="col-md-4">
                <div className="content-card h-100">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: 40, height: 40, background: `${role.color}20` }}>
                      <i className={`bi ${role.icon}`} style={{ color: role.color, fontSize: '1.2rem' }}></i>
                    </div>
                    <span className="fw-700" style={{ fontWeight: 700 }}>{role.badge}</span>
                  </div>
                  <p className="text-muted mb-3" style={{ fontSize: '0.875rem' }}>{role.desc}</p>
                  <ul className="list-unstyled mb-3">
                    {role.features.map(f => (
                      <li key={f} className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: '0.8rem' }}>
                        <i className="bi bi-check2 text-success"></i>{f}
                      </li>
                    ))}
                  </ul>
                  <Link to={role.link} className="btn btn-outline-primary btn-sm w-100">
                    Open {role.badge.charAt(0) + role.badge.slice(1).toLowerCase()} Dashboard →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-4">
            <h2 style={{ fontWeight: 800 }}>Platform Features</h2>
            <p className="text-muted">Built for efficiency, transparency, and ease of use.</p>
          </div>
          <div className="row g-4">
            {[
              { icon: 'bi-upload', title: 'Batch Upload', desc: 'Upload trainee name lists in Excel with classroom and batch owner details. Preview before confirming.' },
              { icon: 'bi-calendar3', title: 'Schedule Management', desc: 'Upload and link training schedules to batches. Validate for conflicts and view in calendar format.' },
              { icon: 'bi-diagram-3', title: 'Smart Allocation', desc: 'Allocate educators based on availability and skill level. Separate roles for educators and co-educators.' },
              { icon: 'bi-calendar-check', title: 'Availability Calendar', desc: 'Day-wise, month-level calendar showing who\'s free, in session, or unavailable — colour-coded for clarity.' },
              { icon: 'bi-check2-square', title: 'Session Tracking', desc: 'Educators mark sessions as done daily. Real-time progress tracking for all stakeholders.' },
              { icon: 'bi-shield-lock', title: 'Role-Based Access', desc: 'Secure login with role-specific dashboards. Admin creates accounts and sends credentials.' },
            ].map((f) => (
              <div key={f.title} className="col-md-4">
                <div className="d-flex gap-3">
                  <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: 44, height: 44 }}>
                    <i className={`bi ${f.icon} text-primary`}></i>
                  </div>
                  <div>
                    <h6 className="fw-700 mb-1" style={{ fontWeight: 700 }}>{f.title}</h6>
                    <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '2rem 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="bi bi-mortarboard-fill text-primary"></i>
                <span style={{ color: '#f8fafc', fontWeight: 800 }}><span style={{ color: '#818cf8' }}>Trainee</span>Pro</span>
              </div>
              <p style={{ fontSize: '0.8rem' }}>Trainee Batch Management & Allocation System — streamlining training operations for organizations.</p>
            </div>
            <div className="col-md-4 mb-3">
              <h6 className="text-white mb-2" style={{ fontSize: '0.85rem' }}>Quick Links</h6>
              <div className="d-flex flex-column gap-1">
                <Link to="/login" className="text-secondary text-decoration-none" style={{ fontSize: '0.8rem' }}>Allocator Dashboard</Link>
                <Link to="/login" className="text-secondary text-decoration-none" style={{ fontSize: '0.8rem' }}>Educator Dashboard</Link>
                <Link to="/login" className="text-secondary text-decoration-none" style={{ fontSize: '0.8rem' }}>Admin Dashboard</Link>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <h6 className="text-white mb-2" style={{ fontSize: '0.85rem' }}>Contact</h6>
              <p style={{ fontSize: '0.8rem' }}>support@traineepro.com<br />+91 98765 43210</p>
            </div>
          </div>
          <div className="border-top border-secondary mt-2 pt-2 text-center" style={{ fontSize: '0.75rem' }}>
            © 2026 TraineePro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
