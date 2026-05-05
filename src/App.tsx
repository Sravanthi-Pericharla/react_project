import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Allocator
import AllocatorDashboard from './pages/allocator/AllocatorDashboard';
import UploadBatch from './pages/allocator/UploadBatch';
import UploadSchedule from './pages/allocator/UploadSchedule';
import ViewBatches from './pages/allocator/ViewBatches';
import DownloadDetails from './pages/allocator/DownloadDetails';
import AllocateEducator from './pages/allocator/AllocateEducator';
import AllocateCoEducator from './pages/allocator/AllocateCoEducator';
import EducatorAvailability from './pages/allocator/EducatorAvailability';
import AllocatorNotifications from './pages/allocator/AllocatorNotifications';

// Educator
import EducatorDashboard from './pages/educator/EducatorDashboard';
import MyProfile from './pages/educator/MyProfile';
import SkillLevels from './pages/educator/SkillLevels';
import MyCalendar from './pages/educator/MyCalendar';
import LeaveRequests from './pages/educator/LeaveRequests';
import AllocatedSessions from './pages/educator/AllocatedSessions';
import BatchDetails from './pages/educator/BatchDetails';
import MarkSessionDone from './pages/educator/MarkSessionDone';
import MonthlyReport from './pages/educator/MonthlyReport';
import EducatorNotifications from './pages/educator/EducatorNotifications';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AddNewUser from './pages/admin/AddNewUser';
import ManageUsers from './pages/admin/ManageUsers';
import AllBatches from './pages/admin/AllBatches';
import EducatorProfiles from './pages/admin/EducatorProfiles';
import AllAllocations from './pages/admin/AllAllocations';
import AdminLeaveRequests from './pages/admin/AdminLeaveRequests';
import AdminNotifications from './pages/admin/AdminNotifications';

const ProtectedRoute: React.FC<{ children: React.ReactNode; roles?: string[] }> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const RoleRedirect: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'allocator') return <Navigate to="/allocator/dashboard" replace />;
  if (user.role === 'educator') return <Navigate to="/educator/dashboard" replace />;
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><RoleRedirect /></ProtectedRoute>} />

            {/* Allocator */}
            <Route path="/allocator/dashboard" element={<ProtectedRoute roles={['allocator']}><AllocatorDashboard /></ProtectedRoute>} />
            <Route path="/allocator/upload-batch" element={<ProtectedRoute roles={['allocator']}><UploadBatch /></ProtectedRoute>} />
            <Route path="/allocator/upload-schedule" element={<ProtectedRoute roles={['allocator']}><UploadSchedule /></ProtectedRoute>} />
            <Route path="/allocator/batches" element={<ProtectedRoute roles={['allocator']}><ViewBatches /></ProtectedRoute>} />
            <Route path="/allocator/download" element={<ProtectedRoute roles={['allocator']}><DownloadDetails /></ProtectedRoute>} />
            <Route path="/allocator/allocate-educator" element={<ProtectedRoute roles={['allocator']}><AllocateEducator /></ProtectedRoute>} />
            <Route path="/allocator/allocate-co-educator" element={<ProtectedRoute roles={['allocator']}><AllocateCoEducator /></ProtectedRoute>} />
            <Route path="/allocator/availability" element={<ProtectedRoute roles={['allocator']}><EducatorAvailability /></ProtectedRoute>} />
            <Route path="/allocator/notifications" element={<ProtectedRoute roles={['allocator']}><AllocatorNotifications /></ProtectedRoute>} />

            {/* Educator */}
            <Route path="/educator/dashboard" element={<ProtectedRoute roles={['educator']}><EducatorDashboard /></ProtectedRoute>} />
            <Route path="/educator/profile" element={<ProtectedRoute roles={['educator']}><MyProfile /></ProtectedRoute>} />
            <Route path="/educator/skills" element={<ProtectedRoute roles={['educator']}><SkillLevels /></ProtectedRoute>} />
            <Route path="/educator/calendar" element={<ProtectedRoute roles={['educator']}><MyCalendar /></ProtectedRoute>} />
            <Route path="/educator/leave-requests" element={<ProtectedRoute roles={['educator']}><LeaveRequests /></ProtectedRoute>} />
            <Route path="/educator/sessions" element={<ProtectedRoute roles={['educator']}><AllocatedSessions /></ProtectedRoute>} />
            <Route path="/educator/batch-details" element={<ProtectedRoute roles={['educator']}><BatchDetails /></ProtectedRoute>} />
            <Route path="/educator/mark-done" element={<ProtectedRoute roles={['educator']}><MarkSessionDone /></ProtectedRoute>} />
            <Route path="/educator/monthly-report" element={<ProtectedRoute roles={['educator']}><MonthlyReport /></ProtectedRoute>} />
            <Route path="/educator/notifications" element={<ProtectedRoute roles={['educator']}><EducatorNotifications /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/add-user" element={<ProtectedRoute roles={['admin']}><AddNewUser /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><ManageUsers /></ProtectedRoute>} />
            <Route path="/admin/batches" element={<ProtectedRoute roles={['admin']}><AllBatches /></ProtectedRoute>} />
            <Route path="/admin/educators" element={<ProtectedRoute roles={['admin']}><EducatorProfiles /></ProtectedRoute>} />
            <Route path="/admin/allocations" element={<ProtectedRoute roles={['admin']}><AllAllocations /></ProtectedRoute>} />
            <Route path="/admin/leave-requests" element={<ProtectedRoute roles={['admin']}><AdminLeaveRequests /></ProtectedRoute>} />
            <Route path="/admin/notifications" element={<ProtectedRoute roles={['admin']}><AdminNotifications /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
