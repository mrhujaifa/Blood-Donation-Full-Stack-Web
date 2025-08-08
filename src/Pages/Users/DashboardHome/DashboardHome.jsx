import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Link } from "react-router";
import useAuth from "../../../Hook/useAuth";
import Loading from "../../../Components/Loading/Loading";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyRequests = async () => {
      if (!user?.email) return;
      try {
        const res = await axiosSecure.get(
          `/donation-request?email=${user.email}`
        );
        const sorted = res.data
          .sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate))
          .slice(0, 3);
        setRequests(sorted);
      } catch (error) {
        console.error("Error loading donation requests:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyRequests();
  }, [user, axiosSecure]);

  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure to delete this request?"
    );
    if (!confirmDelete) return;
    try {
      await axiosSecure.delete(`/donation-request/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="bg-white/10 text-white border backdrop-blur-sm p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Welcome, {user?.name} 👋
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table text-sm w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th>#</th>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood</th>
              <th>Status</th>
              <th>Donor Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((r, i) => (
                <tr
                  key={r._id}
                  className="hover:bg-gray-800 hover:text-white text-lg"
                >
                  <td>{i + 1}</td>
                  <td>{r.recipientName}</td>
                  <td>
                    {r.recipientDistrict}, {r.recipientUpazila}
                  </td>
                  <td>{r.donationDate}</td>
                  <td>{r.donationTime}</td>
                  <td>{r.bloodGroup}</td>
                  <td>
                    <span className="capitalize px-2 py-1 rounded text-xs font-semibold bg-red-600">
                      {r.status}
                    </span>
                  </td>
                  <td>
                    {r.status === "inprogress" && (
                      <>
                        <div>{user.name}</div>
                        <div>{user.email}</div>
                      </>
                    )}
                  </td>
                  <td className="space-x-2">
                    <Link
                      to={`/dashboard/edit-request/${r._id}`}
                      className="btn btn-xs bg-blue-500 text-white"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="btn btn-xs bg-red-500 text-white"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/dashboard/my-donation-requests`}
                      className="btn btn-xs bg-gray-600 text-white"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center text-gray-400 py-6">
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {requests.length > 0 ? (
          requests.map((req, idx) => (
            <div
              key={req._id}
              className="bg-white/5 border  border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 text-white"
            >
              {/* Table 1: Request # and Recipient */}
              <table className="w-full mb-3 text-white text-sm border-collapse">
                <thead>
                  <tr>
                    <th
                      className="border-b border-gray-600 pb-1 text-left"
                      style={{ width: "50%" }}
                    >
                      Request #
                    </th>
                    <th
                      className="border-b border-gray-600 pb-1 text-left"
                      style={{ width: "50%" }}
                    >
                      Recipient
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr>
                    <td className="py-1" style={{ width: "50%" }}>
                      {idx + 1}
                    </td>
                    <td className="py-1 font-semibold" style={{ width: "50%" }}>
                      {req.recipientName}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Table 2: Location and Time */}
              <table className="w-full mb-3 text-white text-sm border-collapse">
                <thead>
                  <tr>
                    <th
                      className="border-b border-gray-600 pb-1 text-left"
                      style={{ width: "50%" }}
                    >
                      Location
                    </th>
                    <th
                      className="border-b border-gray-600 pb-1 text-left"
                      style={{ width: "50%" }}
                    >
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1" style={{ width: "50%" }}>
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td className="py-1" style={{ width: "50%" }}>
                      {req.donationTime}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Table 3: Date and Status */}
              <table className="w-full text-white text-sm border-collapse">
                <thead>
                  <tr>
                    <th
                      className="border-b border-gray-600 pb-1 text-left"
                      style={{ width: "50%" }}
                    >
                      Date
                    </th>
                    <th
                      className="border-b border-gray-600 pb-1 text-left"
                      style={{ width: "50%" }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1" style={{ width: "50%" }}>
                      {req.donationDate}
                    </td>
                    <td className="py-1" style={{ width: "50%" }}>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                          req.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : req.status === "inprogress"
                            ? "bg-blue-500/20 text-blue-400"
                            : req.status === "done"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {req.status.charAt(0).toUpperCase() +
                          req.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Actions */}
              <div className="mt-3 space-x-2 flex flex-wrap gap-2">
                <Link
                  to={`/dashboard/edit-request/${req._id}`}
                  className="btn btn-xs bg-blue-500 text-white"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(req._id)}
                  className="btn btn-xs bg-red-500 text-white"
                >
                  Delete
                </button>
                <Link
                  to="/dashboard/my-donation-requests"
                  className="btn btn-xs bg-gray-600 text-white"
                >
                  View
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-4">
            No donation requests found.
          </div>
        )}
      </div>

      {/* View All Requests Button */}
      {requests.length > 0 && (
        <div className="text-right mt-4">
          <Link
            to="/dashboard/my-donation-requests"
            className="btn bg-red-600 text-white"
          >
            View My All Requests
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
