import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRole, loginPath, fallbackPath }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until authentication check completes
  if (loading) {
    return <div>Loading...</div>;
  }

  // Preserve the original URL, including QR session query
  if (!user) {
    return (
      <Navigate
        to={loginPath}
        state={{ from: location }}
        replace
      />
    );
  }

  // Prevent users from accessing another role's routes
  const userRole =
    typeof user.role === "object"
      ? user.role?.name
      : user.role;

  if (userRole !== allowedRole) {
    return <Navigate to={fallbackPath} replace />;
  }

    return <Outlet />;
  };

export default ProtectedRoute;
