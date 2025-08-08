import { useEffect, useState } from "react";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const email = user?.email; // safe access
  console.log(email)
  const axiosSecure = useAxiosSecure()

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      setRole(null);
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get(`/users?email=${email}`);
        setRole(res.data?.role || null);
      } catch (error) {
        console.error("Failed to fetch role:", error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [email]);

  return { role, loading };
};

export default useRole;
