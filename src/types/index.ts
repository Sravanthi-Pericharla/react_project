export type UserRole = 'admin' | 'allocator' | 'educator';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  status: 'active' | 'inactive';
  firstLogin?: boolean;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface Batch {
  id: string;
  name: string;
  classroom: string;
  batchOwner: string;
  trainees: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'upcoming' | 'completed';
  allocatedEducators?: string;
}

export interface Educator {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  specialization: string;
  status: 'active' | 'inactive' | 'on-leave';
  skills: SkillLevel[];
  photo?: string;
}

export interface SkillLevel {
  course: string;
  level: 'High' | 'Medium' | 'Low' | '';
}

export interface Session {
  id: string;
  course: string;
  batch: string;
  classroom: string;
  date: string;
  time: string;
  role: 'Educator' | 'Co-Educator';
  status: 'today' | 'upcoming' | 'completed' | 'pending';
  batchOwner?: string;
  trainees?: number;
  educator?: string;
  coEducator?: string;
}

export interface Allocation {
  id: string;
  course: string;
  batch: string;
  educator: string;
  coEducator: string;
  date: string;
  status: 'today' | 'upcoming' | 'completed';
}

export interface LeaveRequest {
  id: string;
  educatorName: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  adminRemarks?: string;
  submittedDate: string;
}

export interface Notification {
  id: string;
  message: string;
  detail: string;
  time: string;
  read: boolean;
  type: 'allocation' | 'availability' | 'batch' | 'leave' | 'system';
}

export interface AvailabilityDay {
  date: string;
  status: 'free' | 'session' | 'blocked';
  reason?: string;
}
