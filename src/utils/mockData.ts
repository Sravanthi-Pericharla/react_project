import { Batch, Educator, Session, Allocation, LeaveRequest, Notification } from '../types';

export const MOCK_BATCHES: Batch[] = [
  { id: '1', name: 'Batch 2026-A1', classroom: 'Room 301', batchOwner: 'Dr. Rahul Kumar', trainees: 32, startDate: 'Feb 10', endDate: 'Mar 15', status: 'active', allocatedEducators: 'Srinivasan, Pooja' },
  { id: '2', name: 'Batch 2026-A2', classroom: 'Room 204', batchOwner: 'Prof. Meena Iyer', trainees: 28, startDate: 'Feb 17', endDate: 'Mar 20', status: 'scheduled', allocatedEducators: 'Pooja, Karthik' },
  { id: '3', name: 'Batch 2026-B1', classroom: 'Room 105', batchOwner: 'Dr. S. Patel', trainees: 35, startDate: 'Mar 01', endDate: 'Apr 10', status: 'upcoming', allocatedEducators: '—' },
  { id: '4', name: 'Batch 2025-D4', classroom: 'Room 202', batchOwner: 'Prof. K. Reddy', trainees: 30, startDate: 'Dec 01', endDate: 'Jan 15', status: 'completed', allocatedEducators: 'Srinivasan, Deepa' },
  { id: '5', name: 'Batch 2025-D3', classroom: 'Room 110', batchOwner: 'Dr. Anita Das', trainees: 26, startDate: 'Nov 15', endDate: 'Dec 30', status: 'completed', allocatedEducators: 'Pooja, Arjun' },
];

export const MOCK_EDUCATORS: Educator[] = [
  { id: '1', name: 'Srinivasan R.', email: 'srinivasan.r@traineepro.com', phone: '+91 9876543210', designation: 'Senior Educator', department: 'Software Engineering', specialization: 'Java, Spring Boot, Microservices', status: 'active', skills: [{ course: 'Java Fundamentals', level: 'High' }, { course: 'Spring Boot', level: 'High' }, { course: 'React.js', level: 'Medium' }, { course: 'Database Design', level: 'High' }] },
  { id: '2', name: 'Pooja Mehta', email: 'pooja.m@traineepro.com', phone: '+91 9876543211', designation: 'Lead Educator', department: 'Computer Science', specialization: 'React, Angular', status: 'active', skills: [{ course: 'Java Fundamentals', level: 'Medium' }, { course: 'React.js', level: 'High' }, { course: 'Angular', level: 'High' }, { course: 'Database Design', level: 'Medium' }] },
  { id: '3', name: 'Karthik V.', email: 'karthik.v@traineepro.com', phone: '+91 9876543212', designation: 'Educator', department: 'Information Technology', specialization: 'DevOps, Python', status: 'active', skills: [{ course: 'Java Fundamentals', level: 'Low' }, { course: 'DevOps & CI/CD', level: 'High' }, { course: 'Python for Data Science', level: 'Medium' }] },
  { id: '4', name: 'Deepa S.', email: 'deepa.s@traineepro.com', phone: '+91 9876543213', designation: 'Senior Educator', department: 'Software Engineering', specialization: 'Java, Microservices', status: 'on-leave', skills: [{ course: 'Java Fundamentals', level: 'High' }, { course: 'Microservices Architecture', level: 'High' }, { course: 'React.js', level: 'Low' }] },
  { id: '5', name: 'Arjun Nair', email: 'arjun.n@traineepro.com', phone: '+91 9876543214', designation: 'Educator', department: 'Data Science', specialization: 'Python, ML', status: 'active', skills: [{ course: 'Python for Data Science', level: 'High' }, { course: 'Database Design', level: 'Medium' }, { course: 'Java Fundamentals', level: 'Low' }] },
];

export const MOCK_SESSIONS: Session[] = [
  { id: '1', course: 'Java Fundamentals', batch: 'Batch 2026-A1', classroom: 'Room 301', date: 'Feb 17', time: '10:00 - 12:00', role: 'Educator', status: 'today', batchOwner: 'Dr. Rahul Kumar', trainees: 32 },
  { id: '2', course: 'Database Design', batch: 'Batch 2026-A2', classroom: 'Room 204', date: 'Feb 17', time: '2:00 - 4:00', role: 'Co-Educator', status: 'today', batchOwner: 'Prof. Meena Iyer', trainees: 28 },
  { id: '3', course: 'Spring Boot', batch: 'Batch 2026-A1', classroom: 'Room 301', date: 'Feb 19', time: '10:00 - 12:00', role: 'Educator', status: 'upcoming', batchOwner: 'Dr. Rahul Kumar', trainees: 32 },
  { id: '4', course: 'Java Fundamentals', batch: 'Batch 2026-A2', classroom: 'Room 204', date: 'Feb 20', time: '10:00 - 12:00', role: 'Educator', status: 'upcoming', batchOwner: 'Prof. Meena Iyer', trainees: 28 },
  { id: '5', course: 'Java Fundamentals', batch: 'Batch 2026-A1', classroom: 'Room 301', date: 'Feb 12', time: '10:00 - 12:00', role: 'Educator', status: 'completed', batchOwner: 'Dr. Rahul Kumar', trainees: 32 },
  { id: '6', course: 'Spring Boot', batch: 'Batch 2026-A2', classroom: 'Room 204', date: 'Feb 09', time: '2:00 - 4:00', role: 'Educator', status: 'completed', batchOwner: 'Prof. Meena Iyer', trainees: 28 },
];

export const MOCK_ALLOCATIONS: Allocation[] = [
  { id: '1', course: 'Java Fundamentals', batch: 'Batch 2026-A1', educator: 'Srinivasan R.', coEducator: 'Karthik V.', date: 'Feb 17', status: 'today' },
  { id: '2', course: 'Database Design', batch: 'Batch 2026-A2', educator: 'Pooja Mehta', coEducator: 'Srinivasan R.', date: 'Feb 17', status: 'today' },
  { id: '3', course: 'Spring Boot', batch: 'Batch 2026-A1', educator: 'Srinivasan R.', coEducator: '—', date: 'Feb 19', status: 'upcoming' },
  { id: '4', course: 'React.js', batch: 'Batch 2026-A2', educator: 'Pooja Mehta', coEducator: 'Arjun Nair', date: 'Feb 20', status: 'upcoming' },
  { id: '5', course: 'Java Fundamentals', batch: 'Batch 2026-A1', educator: 'Srinivasan R.', coEducator: '—', date: 'Feb 12', status: 'completed' },
  { id: '6', course: 'Spring Boot', batch: 'Batch 2026-A2', educator: 'Srinivasan R.', coEducator: 'Pooja Mehta', date: 'Feb 09', status: 'completed' },
  { id: '7', course: 'Database Design', batch: 'Batch 2026-A1', educator: 'Pooja Mehta', coEducator: '—', date: 'Feb 05', status: 'completed' },
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  { id: '1', educatorName: 'Pooja Mehta', startDate: 'Apr 05', endDate: 'Apr 10', days: 6, reason: 'Medical procedure — need to travel to hometown for a scheduled surgery and recovery.', status: 'pending', submittedDate: 'Feb 15' },
  { id: '2', educatorName: 'Karthik V.', startDate: 'Mar 20', endDate: 'Mar 26', days: 7, reason: 'Family event abroad — sister\'s wedding and pre-wedding ceremonies.', status: 'pending', submittedDate: 'Feb 16' },
  { id: '3', educatorName: 'Arjun Nair', startDate: 'Apr 15', endDate: 'Apr 20', days: 6, reason: 'Professional development — attending a conference and workshop on AI/ML.', status: 'pending', submittedDate: 'Feb 17' },
  { id: '4', educatorName: 'Deepa S.', startDate: 'Feb 16', endDate: 'Feb 18', days: 3, reason: 'Personal leave', status: 'approved', adminRemarks: 'Approved. Calendar updated.', submittedDate: 'Feb 10' },
  { id: '5', educatorName: 'Srinivasan R.', startDate: 'Mar 10', endDate: 'Mar 15', days: 6, reason: 'Family function', status: 'approved', adminRemarks: 'Approved. Enjoy!', submittedDate: 'Feb 12' },
  { id: '6', educatorName: 'Karthik V.', startDate: 'Jan 20', endDate: 'Jan 25', days: 6, reason: 'Personal travel', status: 'rejected', adminRemarks: 'Batch training in progress. Please reschedule.', submittedDate: 'Jan 15' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', message: 'Deepa S. blocked her calendar', detail: 'Feb 16-18, 2026 — Reason: Personal leave (Admin approved)', time: '2 hours ago', read: false, type: 'availability' },
  { id: '2', message: 'New batch uploaded: Batch 2026-B1', detail: '35 trainees, Room 105 — Batch Owner: Dr. S. Patel', time: 'Yesterday', read: false, type: 'batch' },
  { id: '3', message: 'Pooja Mehta updated skill levels', detail: 'Spring Boot changed from Medium to High', time: '2 days ago', read: true, type: 'system' },
  { id: '4', message: 'New session allocated: Spring Boot', detail: 'Batch 2026-A1 - Room 301 - Feb 19 - Role: Educator', time: '1 hour ago', read: false, type: 'allocation' },
  { id: '5', message: 'Leave request approved (Mar 10-15)', detail: 'Admin approved your extended leave request. Calendar updated.', time: 'Yesterday', read: true, type: 'leave' },
  { id: '6', message: 'Session reallocation: React.js', detail: 'You have been reassigned from React.js (Batch A2) due to schedule conflict.', time: '3 days ago', read: true, type: 'allocation' },
];

export const COURSES = [
  'Java Fundamentals', 'Spring Boot', 'React.js', 'Database Design',
  'Microservices Architecture', 'DevOps & CI/CD', 'Angular', 'Python for Data Science'
];

export const DEPARTMENTS = [
  'Software Engineering', 'Computer Science', 'Information Technology',
  'Data Science', 'Training Operations', 'Quality Assurance'
];
