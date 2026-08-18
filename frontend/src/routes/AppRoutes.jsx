import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routeConstants";
import Home from "../pages/home/Home";

// import Login from "../pages/auth/Login";
// import ForgotPassword from "../pages/auth/ForgotPassword";
// import ResetPassword from "../pages/auth/ResetPassword";

// import SuperAdminDashboard from "../pages/superadmin/Dashboard";
// import ManageHRAdmins from "../pages/superadmin/ManageHRAdmins";
// import RolesPermissions from "../pages/superadmin/RolesPermissions";
// import SystemAnalytics from "../pages/superadmin/SystemAnalytics";

// import HRAdminDashboard from "../pages/hradmin/Dashboard";
// import Colleges from "../pages/hradmin/Colleges";
// import Mentors from "../pages/hradmin/Mentors";
// import Batches from "../pages/hradmin/Batches";
// import Students from "../pages/hradmin/Students";

// import MentorDashboard from "../pages/mentor/Dashboard";
// import MyStudents from "../pages/mentor/MyStudents";
// import AssignTask from "../pages/mentor/AssignTask";

// import StudentDashboard from "../pages/student/Dashboard";
// import Profile from "../pages/student/Profile";
// import MarkAttendance from "../pages/student/MarkAttendance";
// import MyTasks from "../pages/student/MyTasks";

// import CollegeDashboard from "../pages/college/Dashboard";
// import NominatedStudents from "../pages/college/NominatedStudents";

// import ProtectedRoute from "./ProtectedRoute";
// import RoleBasedRoute from "./RoleBasedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;