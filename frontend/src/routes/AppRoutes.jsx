import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routeConstants";

import Home from "../pages/home/Home";

// ================= AUTH =================
import Login from "../pages/auth/Login";
import Sign_up from "../pages/auth/Sign_up";
import RoleSelection from "../pages/auth/RoleSelection";

// ================= LAYOUTS =================
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import HRAdminLayout from "../layouts/HRAdminLayout";
import CollegeCoordinatorLayout from "../layouts/CollegeCoordinatorLayout";
import StudentLayout from "../layouts/StudentLayout";
import MentorLayout from "../layouts/MentorLayout";

// ================= DASHBOARDS =================
import SuperAdminDashboard from "../pages/superadmin/Dashboard";
import HRAdminDashboard from "../pages/hradmin/Dashboard";
import CollegeDashboard from "../pages/college/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";
import MentorDashboard from "../pages/mentor/Dashboard";

// ================= MENTOR PAGES =================
import MyStudents from "../pages/mentor/MyStudents";
import AssignTask from "../pages/mentor/AssignTask";
import ReviewDailyReports from "../pages/mentor/ReviewDailyReports";
import PerformanceEvaluation from "../pages/mentor/PerformanceEvaluation";
import LeaveApprovals from "../pages/mentor/LeaveApprovals";
import FeedbackForm from "../pages/mentor/FeedbackForm";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= HOME ================= */}
      <Route
        path={ROUTES.HOME}
        element={<Home />}
      />

      {/* ================= AUTH ================= */}

      <Route
        path={ROUTES.AUTH.LOGIN}
        element={<RoleSelection />}
      />

      <Route
        path={`${ROUTES.AUTH.LOGIN}/:role`}
        element={<Login />}
      />

      <Route
        path={`${ROUTES.AUTH.SIGN_UP}/:role`}
        element={<Sign_up />}
      />

      {/* ================= SUPER ADMIN ================= */}
      <Route element={<SuperAdminLayout />}>
        <Route
          path={ROUTES.SUPER_ADMIN.DASHBOARD}
          element={<SuperAdminDashboard />}
        />
      </Route>

      {/* ================= HR ADMIN ================= */}
      <Route element={<HRAdminLayout />}>
        <Route
          path={ROUTES.HR_ADMIN.DASHBOARD}
          element={<HRAdminDashboard />}
        />
      </Route>

      {/* ================= COLLEGE COORDINATOR ================= */}
      <Route element={<CollegeCoordinatorLayout />}>
        <Route
          path={ROUTES.COLLEGE.DASHBOARD}
          element={<CollegeDashboard />}
        />
      </Route>

      {/* ================= STUDENT / INTERN ================= */}
      <Route element={<StudentLayout />}>
        <Route
          path={ROUTES.STUDENT.DASHBOARD}
          element={<StudentDashboard />}
        />
      </Route>

      {/* ================= MENTOR ================= */}
      <Route element={<MentorLayout />}>
        <Route
          path={ROUTES.MENTOR.DASHBOARD}
          element={<MentorDashboard />}
        />
        <Route
          path={ROUTES.MENTOR.STUDENTS}
          element={<MyStudents />}
        />
        <Route
          path={ROUTES.MENTOR.ASSIGN_TASK}
          element={<AssignTask />}
        />
        <Route
          path={ROUTES.MENTOR.DAILY_REPORTS}
          element={<ReviewDailyReports />}
        />
        <Route
          path={ROUTES.MENTOR.PERFORMANCE}
          element={<PerformanceEvaluation />}
        />
        <Route
          path={ROUTES.MENTOR.LEAVE_APPROVALS}
          element={<LeaveApprovals />}
        />
        <Route
          path={ROUTES.MENTOR.FEEDBACK}
          element={<FeedbackForm />}
        />
      </Route>

    </Routes>
  );
};

export default AppRoutes;