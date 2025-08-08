import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserStatus = () => {
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email || authLoading) return;

    const fetchStatus = async () => {
      try {
        setStatusLoading(true);
        const res = await axiosSecure.get(`/users?email=${user.email}`);
        const userData = res.data;
        console.log(userData)

        if (userData?.status) {
          setStatus(userData.status); // active | blocked | pending etc.
          console.log(userData.status)
        } else {
          setStatus("unknown");
        }
      } catch (err) {
        console.error("Failed to fetch user status:", err);
        setError(err);
        setStatus("error");
      } finally {
        setStatusLoading(false);
      }
    };

    fetchStatus();
  }, [user?.email, authLoading]);

  return { status, statusLoading, error };
};

export default useUserStatus;
