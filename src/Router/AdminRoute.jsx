import { Navigate, useLocation } from "react-router";
import useAdmin from "../Hook/useAdmin";
import useAuth from "../Hook/useAuth";
import Loading from "../Components/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default AdminRoute;
