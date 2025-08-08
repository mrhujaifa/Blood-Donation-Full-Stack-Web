import React, { useEffect, useState } from "react";
import { FaUsers, FaHandHoldingUsd, FaTint } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const VolunteerDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [amount, setAmount] = useState(null);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRequests: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const res = await axiosSecure.get("/admin/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  useEffect(() => {
    const FetchTotalFund = async () => {
      try {
        const res = await axiosSecure.get("/fundings");
        const total = res.data.data.reduce((sum, item) => sum + item.amount, 0);
        const convertTofix = total.toFixed(2);
        setAmount(convertTofix);
      } catch (error) {
        console.error("Failed to fetch funding data:", error);
      }
    };

    FetchTotalFund();
  }, []);

  console.log(amount);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome, {user?.displayName || "Volunteer"} 👋
        </h2>
        <p className="text-base md:text-lg">
          Here’s what’s happening in the blood donation platform today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Donors */}
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 flex items-center space-x-4 hover:scale-[1.02] transition-transform duration-300">
          <div className="text-red-600 text-4xl">
            <FaUsers />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{stats.totalUsers}</h3>
            <p className="text-gray-600">Total Donors</p>
          </div>
        </div>

        {/* Total Funding */}
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 flex items-center space-x-4 hover:scale-[1.02] transition-transform duration-300">
          <div className="text-green-600 text-4xl">
            <FaHandHoldingUsd />
          </div>
          <div>
            <h3 className="text-xl font-semibold">${amount}</h3>
            <p className="text-gray-600">Total Funding</p>
          </div>
        </div>

        {/* Total Blood Requests */}
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 flex items-center space-x-4 hover:scale-[1.02] transition-transform duration-300">
          <div className="text-blue-600 text-4xl">
            <FaTint />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{stats.totalRequests}</h3>
            <p className="text-gray-600">Blood Donation Requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboardHome;
