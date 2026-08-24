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
import Colleges from "../pages/hradmin/Colleges";
import Mentors from "../pages/hradmin/Mentors";
import Batches from "../pages/hradmin/Batches";
import Students from "../pages/hradmin/Students";
import DocumentVerification from "../pages/hradmin/DocumentVerification";
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
        <Route
          path={ROUTES.HR_ADMIN.COLLEGES}
          element={<Colleges/>}
        />
        <Route
          path={ROUTES.HR_ADMIN.MENTORS}
          element={<Mentors/>}
        />
        <Route
          path={ROUTES.HR_ADMIN.BATCHES}
          element={<Batches/>}
        />
        <Route
          path={ROUTES.HR_ADMIN.STUDENTS}
          element={<Students/>}
        />
        <Route
          path={ROUTES.HR_ADMIN.DOCUMENT_VERIFICATION}
          element={<DocumentVerification/>}
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
      </Route>

    </Routes>
  );
};

export default AppRoutes;