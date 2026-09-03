export const roleConfig = {
  'super-admin':         { label: 'Super Admin',         abbr: 'SA', color: '#22c55e' },
  'hr-admin':            { label: 'HR / Admin',          abbr: 'HR', color: '#3b82f6' },
  'college-coordinator': { label: 'College Coordinator', abbr: 'CC', color: '#f59e0b' },
  'mentor':              { label: 'Mentor',              abbr: 'ME', color: '#ef4444' },
  'student-intern':      { label: 'Student / Intern',    abbr: 'IN', color: '#8b5cf6' },
}

export const roleRouteMap = {
  'super-admin': 'super-admin',
  'hr-admin': 'hr-admin',
  'college-coordinator': 'college-coordinator',
  'mentor': 'mentor',
  'student-intern': 'student-intern',
};

export const BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },
  MENTOR: {
    STUDENTS: "/mentor/students",
    STUDENT_BY_ID: (id) => `/mentor/students/${id}`,
    TASKS: "/mentor/tasks",
    TASK_BY_ID: (id) => `/mentor/tasks/${id}`,
    TASK_REVIEW: (id) => `/mentor/tasks/${id}/review`,
    LEAVES: "/mentor/leaves",
    LEAVE_BY_ID: (id) => `/mentor/leaves/${id}`,
    LEAVE_REVIEW: (id) => `/mentor/leaves/${id}/review`,
    EVALUATIONS: "/mentor/evaluations",
    EVALUATION_BY_ID: (id) => `/mentor/evaluations/${id}`,
    CERTIFICATES: "/mentor/certificates",
  },
  HR: {
    MENTORS: "/hr/mentors",
    MENTOR_BY_ID: (id) => `/hr/mentors/${id}`,
    STUDENTS: "/hr/students",
    CERTIFICATES: "/hr/certificates",
    CERTIFICATE_UPLOAD: "/hr/certificates/upload",
    CERTIFICATE_DOWNLOAD: (id) => `/hr/certificates/${id}/download`,
  },
  STUDENT: {
    PROFILE: "/student/profile",
    TASKS: "/student/tasks",
    LEAVE: "/student/leave",
    CERTIFICATES: "/student/certificates",
  },
  
};