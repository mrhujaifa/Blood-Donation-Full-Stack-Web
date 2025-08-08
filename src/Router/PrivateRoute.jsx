
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hook/useAuth";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation();

  if (loading) {
    return 
  }

  if (!user) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
