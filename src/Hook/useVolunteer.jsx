import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useVolunteer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isVolunteer, isLoading: isVolunteerLoading } = useQuery({
    queryKey: ["isVolunteer", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/volunteer?email=${user.email}`);
      return res.data?.volunteer === true;
    },
  });

  return [isVolunteer ?? false, isVolunteerLoading];
};

export default useVolunteer;
