import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const COLORS = ["#00ffe0", "#00c9ff", "#ff3d6d"];

const OverviewStats = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRequests: 0,
    totalFunds: 0,
  });
  const [amount, setAmount] = useState(0); // New state for separate amount

  // Fetch general stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get("/admin/stats");
        setStats((prev) => ({ ...prev, ...res.data }));
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  // Fetch total funds for stats
  useEffect(() => {
    const fetchTotalFund = async () => {
      try {
        const res = await axiosSecure.get("/fundings");
        const total = res.data.data.reduce((sum, item) => sum + item.amount, 0);
        setStats((prev) => ({ ...prev, totalFunds: Number(total.toFixed(2)) }));
      } catch (error) {
        console.error("Failed to fetch funding data:", error);
      }
    };
    fetchTotalFund();
  }, [axiosSecure]);

  // **New useEffect for separate `amount`**
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
  }, [axiosSecure]);

  // Example data for bar progress
  const progressData = [
    { label: "Users", value: stats.totalUsers },
    { label: "Requests", value: stats.totalRequests },
    { label: "Funds", value: stats.totalFunds },
  ];

  const lineData = [
    { day: "01", value: 30 },
    { day: "02", value: 50 },
    { day: "03", value: 70 },
    { day: "04", value: 60 },
    { day: "05", value: 80 },
    { day: "06", value: 55 },
  ];

  const Card = ({ title, children, className = "" }) => (
    <div
      className={`bg-gradient-to-r from-[#1f1f2e]/80 to-[#2b2b4a]/80 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-6 ${className}`}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Left Side Progress Bars */}
      <Card title="Statistics Overview" className="lg:col-span-1">
        {progressData.map((item, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between mb-1">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-cyan-400"
                style={{ width: `${Math.min((item.value / 100) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </Card>

      {/* Right Top Pie Widget */}
      <Card title="Funds Distribution" className="lg:col-span-1">
        <div className="flex justify-center items-center h-36 relative">
          <PieChart width={120} height={120}>
            <Pie
              data={[{ name: "Funds", value: stats.totalFunds }]}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={50}
              fill="#00c9ff"
            />
          </PieChart>
          <div className="absolute text-white text-xl font-bold">{Math.floor(stats.totalFunds)}%</div>
        </div>
        <p className="mt-2 text-center text-sm text-gray-300">Separate Amount: ${amount}</p>
      </Card>

      {/* Bottom Line Chart */}
      <Card title="Activity Trend" className="lg:col-span-3">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={lineData}>
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                borderRadius: "10px",
                border: "none",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Line type="monotone" dataKey="value" stroke="#00c9ff" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default OverviewStats;
