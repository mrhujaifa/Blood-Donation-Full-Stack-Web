import { Navigate, useLocation } from "react-router";
import useAdmin from "../Hook/useAdmin";
import useAuth from "../Hook/useAuth";
import useVolunteer from "../Hook/useVolunteer";

const VolunteerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isVolunteer] = useVolunteer();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  if (user && (isVolunteer || isAdmin)) {
    return children;
  }

  return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default VolunteerRoute;
