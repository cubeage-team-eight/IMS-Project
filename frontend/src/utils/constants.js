// export const roleConfig = {
//   'super-admin':         { label: 'Super Admin',         abbr: 'SA', color: '#22c55e' },
//   'hr-admin':            { label: 'HR / Admin',          abbr: 'HR', color: '#3b82f6' },
//   'college-coordinator': { label: 'College Coordinator', abbr: 'CC', color: '#f59e0b' },
//   'mentor':              { label: 'Mentor',              abbr: 'ME', color: '#ef4444' },
//   'student-intern':      { label: 'Student / Intern',    abbr: 'IN', color: '#8b5cf6' },
// }
// export const roleRouteMap = {
//   SUPER_ADMIN: 'superadmin',
//   HR_ADMIN: 'hradmin',
//   COLLEGE_COORDINATOR: 'college',
//   MENTOR: 'mentor',
//   STUDENT: 'student',
// };

// export const BASE_URL = import.meta.env.VITE_API_URL;

// export const API_ENDPOINTS = {
//   AUTH: {
//     LOGIN: "/auth/login",
//     REGISTER: "/auth/register",
//     ME: "/auth/me",
//   },
//   MENTOR: {
//     STUDENTS: "/mentor/students",
//     STUDENT_BY_ID: (id) => `/mentor/students/${id}`,
//     TASKS: "/mentor/tasks",
//     TASK_BY_ID: (id) => `/mentor/tasks/${id}`,
//     TASK_REVIEW: (id) => `/mentor/tasks/${id}/review`,
//     LEAVES: "/mentor/leaves",
//     LEAVE_BY_ID: (id) => `/mentor/leaves/${id}`,
//     LEAVE_REVIEW: (id) => `/mentor/leaves/${id}/review`,
//     EVALUATIONS: "/mentor/evaluations",
//     EVALUATION_BY_ID: (id) => `/mentor/evaluations/${id}`,
//     CERTIFICATES: "/mentor/certificates",
//   },
//   HR: {
//     MENTORS: "/hr/mentors",
//     MENTOR_BY_ID: (id) => `/hr/mentors/${id}`,
//     STUDENTS: "/hr/students",
//     CERTIFICATES: "/hr/certificates",
//     CERTIFICATE_UPLOAD: "/hr/certificates/upload",
//     CERTIFICATE_DOWNLOAD: (id) => `/hr/certificates/${id}/download`,
//   },
//   STUDENT: {
//     PROFILE: "/student/profile",
//     TASKS: "/student/tasks",
//     LEAVE: "/student/leave",
//     CERTIFICATES: "/student/certificates",
//   },
  
// };



// from student dashboard to mentor dashboard, the student can view their profile, tasks, leave requests, and certificates. The mentor can manage their students, review tasks and leave requests, and provide evaluations. The HR admin can manage mentors and students, as well as handle certificates. Each role has specific endpoints to interact with the backend services
export const roleConfig = {
  'super-admin':         { label: 'Super Admin',         abbr: 'SA', color: '#22c55e' },
  'hr-admin':            { label: 'HR / Admin',          abbr: 'HR', color: '#3b82f6' },
  'college-coordinator': { label: 'College Coordinator', abbr: 'CC', color: '#f59e0b' },
  'mentor':              { label: 'Mentor',              abbr: 'ME', color: '#ef4444' },
  'student-intern':      { label: 'Student / Intern',    abbr: 'IN', color: '#8b5cf6' },
}
export const roleRouteMap = {
  SUPER_ADMIN: 'superadmin',
  HR_ADMIN: 'hradmin',
  COLLEGE_COORDINATOR: 'college',
  MENTOR: 'mentor',
  STUDENT: 'student',
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
    TASK_BY_ID: (id) => `/student/tasks/${id}`,
    TASK_START: (id) => `/student/tasks/${id}/start`,
    TASK_SUBMIT: (id) => `/student/tasks/${id}/submit`,

    LEAVE: "/student/leave",
    LEAVE_BY_ID: (id) => `/student/leave/${id}`,
    LEAVE_CANCEL: (id) => `/student/leave/${id}/cancel`,

    ATTENDANCE_CHECKIN: "/student/attendance/check-in",
    ATTENDANCE_CHECKOUT: "/student/attendance/check-out",
    ATTENDANCE: "/student/attendance",

    EVALUATIONS: "/student/evaluations",
    EVALUATION_LATEST: "/student/evaluations/latest",

    CERTIFICATES: "/student/certificates",
    CERTIFICATE_DOWNLOAD: (id) => `/student/certificates/${id}/download`,
  },
};