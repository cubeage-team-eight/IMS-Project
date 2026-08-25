// src/routes/routeConstants.js

export const ROUTES = {
  HOME: "/",

  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },

  SUPER_ADMIN: {
    DASHBOARD: "/superadmin/dashboard",
    HR_ADMINS: "/superadmin/hr-admins",
    ROLES_PERMISSIONS: "/superadmin/roles-permissions",
    ANALYTICS: "/superadmin/analytics",
  },

  HR_ADMIN: {
    DASHBOARD: "/hradmin/dashboard",
    COLLEGES: "/hradmin/colleges",
    MENTORS: "/hradmin/mentors",
    BATCHES: "/hradmin/batches",
    STUDENTS: "/hradmin/students",
    DOCUMENT_VERIFICATION: "/hradmin/document-verification",
    ATTENDANCE: "/hradmin/attendance",
    CERTIFICATES: "/hradmin/certificates",
    NOTICES: "/hradmin/notices",
    REPORTS: "/hradmin/reports",
  },

  MENTOR: {
    DASHBOARD: "/mentor/dashboard",
    STUDENTS: "/mentor/students",
    ASSIGN_TASK: "/mentor/assign-task",
    DAILY_REPORTS: "/mentor/daily-reports",
    LEAVE_APPROVALS: "/mentor/leave-approvals",
    PERFORMANCE: "/mentor/performance",
    FEEDBACK: "/mentor/feedback",
  },

  STUDENT: {
    DASHBOARD: "/student/dashboard",
    PROFILE: "/student/profile",
    DOCUMENTS: "/student/documents",
    ATTENDANCE: "/student/attendance",
    TASKS: "/student/tasks",
    DAILY_REPORT: "/student/reports",
    LEAVE: "/student/leave",
    PERFORMANCE: "/student/performance",
    CERTIFICATE: "/student/certificate",
    FEEDBACK: "/student/feedback",
  },

  COLLEGE: {
    DASHBOARD: "/college/dashboard",
    NOMINATED_STUDENTS: "/college/nominated-students",
    PROGRESS: "/college/progress",
    REPORTS: "/college/reports",
  },
};