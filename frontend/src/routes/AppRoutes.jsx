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
import NominatedStudents from "../pages/college/NominatedStudents";
import ProgressTracking from "../pages/college/ProgressTracking";
import Reports from "../pages/college/Reports";
import StudentDashboard from "../pages/student/Dashboard";
import MentorDashboard from "../pages/mentor/Dashboard";
import Attendance from "../pages/college/Attendance";
import Certificates from "../pages/college/Certificates";
import UploadStudentList from "../pages/college/UploadStudentList";
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

       {/* Dashboard */}
        <Route
        path={ROUTES.COLLEGE.DASHBOARD}
       element={<CollegeDashboard />}
      />

     {/* Student List */}
      <Route
    path={ROUTES.COLLEGE.STUDENTS}
    element={<NominatedStudents />}
    />

    {/* Attendance - temporary */}
      <Route
    path={ROUTES.COLLEGE.ATTENDANCE}
    element={<Attendance />}
    />

    {/* Student Progress */}
     <Route
    path={ROUTES.COLLEGE.PROGRESS}
    element={<ProgressTracking />}
   />

   {/* Reports */}
    <Route
    path={ROUTES.COLLEGE.REPORTS}
    element={<Reports />}
   />

    {/* Certificates - temporary */}
    <Route
    path={ROUTES.COLLEGE.CERTIFICATES}
    element={<Certificates />}
   />

    {/* Upload Student List - temporary */}
    <Route
    path={ROUTES.COLLEGE.UPLOAD_STUDENT_LIST}
    element={<UploadStudentList />}
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
