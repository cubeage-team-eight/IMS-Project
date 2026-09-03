import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routeConstants";

import Home from "../pages/home/Home";

// ================= AUTH =================
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/Signup";
import RoleSelection from "../pages/auth/RoleSelection";

// ================= LAYOUTS =================
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import HRAdminLayout from "../layouts/HRAdminLayout";
import CollegeCoordinatorLayout from "../layouts/CollegeCoordinatorLayout";
import StudentLayout from "../layouts/StudentLayout";
import MentorLayout from "../layouts/MentorLayout";

// ================= DASHBOARDS =================
import SuperAdminDashboard from "../pages/superadmin/Dashboard";
import ManageHRAdmins from "../pages/superadmin/ManageHRAdmins";
import RolesPermissions from "../pages/superadmin/RolesPermissions";
import SystemAnalytics from "../pages/superadmin/SystemAnalytics";
import ActivityLog from "../pages/superadmin/activitylog";
import SystemSettings from "../pages/superadmin/systemsettings";


import HRAdminDashboard from "../pages/hradmin/Dashboard";
import CollegeDashboard from "../pages/college/Dashboard";
import NominatedStudents from "../pages/college/NominatedStudents";
import ProgressTracking from "../pages/college/ProgressTracking";
import CollegeReports from "../pages/college/Reports";
import StudentDashboard from "../pages/student/Dashboard";
import Profile from "../pages/student/Profile";
import DocumentUpload from "../pages/student/DocumentUpload";
import MarkAttendance from "../pages/student/MarkAttendance";
import MyTasks from "../pages/student/MyTasks";
import DailyReportSubmit from "../pages/student/DailyReportSubmit";
import ApplyLeave from "../pages/student/ApplyLeave";
import MyPerformance from "../pages/student/MyPerformance";
import Certificate from "../pages/student/Certificate";
import FeedbackForm from "../pages/student/FeedbackForm";
import MentorDashboard from "../pages/mentor/Dashboard";
import Attendance from "../pages/college/Attendance";
import CollegeCertificates from "../pages/college/Certificates";
import UploadStudentList from "../pages/college/UploadStudentList";
import Colleges from "../pages/hradmin/Colleges";
import Mentors from "../pages/hradmin/Mentors";
import Batches from "../pages/hradmin/Batches";
import Students from "../pages/hradmin/Students";
import DocumentVerification from "../pages/hradmin/DocumentVerification";
import AttendanceOverview from "../pages/hradmin/AttendanceOverview";
import HRCertificates from "../pages/hradmin/Certificates";
import HRReports from "../pages/hradmin/Reports";

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
        path={`${ROUTES.AUTH.SIGNUP}/:role`}
        element={<SignUp />}
      />

      {/* ================= SUPER ADMIN ================= */}
      <Route element={<SuperAdminLayout />}>
        <Route
          path={ROUTES.SUPER_ADMIN.DASHBOARD}
          element={<SuperAdminDashboard />}
        />
       <Route
         path="/superadmin/hr-admins"
         element={<ManageHRAdmins />}
       />

      <Route
        path="/superadmin/roles"
        element={<RolesPermissions />}
      />

      <Route
        path="/superadmin/analytics"
        element={<SystemAnalytics />}
      />

      <Route
        path="/superadmin/activity"
        element={<ActivityLog />}
      />

      <Route
        path="/superadmin/settings"
        element={<SystemSettings />}
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
        <Route
          path={ROUTES.HR_ADMIN.ATTENDANCE}
          element={<AttendanceOverview/>}
        />
        <Route
          path={ROUTES.HR_ADMIN.CERTIFICATES}
          element={<HRCertificates/>}
        />
        <Route
          path={ROUTES.HR_ADMIN.REPORTS}
          element={<HRReports/>}
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
    element={<CollegeReports />}
   />

    {/* Certificates - temporary */}
    <Route
    path={ROUTES.COLLEGE.CERTIFICATES}
    element={<CollegeCertificates />}
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
        <Route
          path={ROUTES.STUDENT.PROFILE}
          element={<Profile />}
        />
        <Route
          path={ROUTES.STUDENT.DOCUMENTS}
          element={<DocumentUpload />}
        />
        <Route
          path={ROUTES.STUDENT.ATTENDANCE}
          element={<MarkAttendance />}
        />
        <Route
          path={ROUTES.STUDENT.TASKS}
          element={<MyTasks />}
        />
        <Route
          path={ROUTES.STUDENT.DAILY_REPORT}
          element={<DailyReportSubmit />}
        />
        <Route
          path={ROUTES.STUDENT.LEAVE}
          element={<ApplyLeave />}
        />
        <Route
          path={ROUTES.STUDENT.PERFORMANCE}
          element={<MyPerformance />}
        />
        <Route
          path={ROUTES.STUDENT.CERTIFICATE}
          element={<Certificate />}
        />
        <Route
          path={ROUTES.STUDENT.FEEDBACK}
          element={<FeedbackForm />}
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
