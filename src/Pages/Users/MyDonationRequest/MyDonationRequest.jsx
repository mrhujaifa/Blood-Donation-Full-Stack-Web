import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import Loading from "../../../Components/Loading/Loading";
import { Link } from "react-router";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const res = await axiosSecure.get(
          `/donation-request?email=${user.email}`
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch donation requests:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, [user.email, axiosSecure]);

  useEffect(() => {
    if (filter === "all") {
      setFiltered(requests);
    } else {
      setFiltered(requests.filter((r) => r.status === filter));
    }
    setCurrentPage(1);
  }, [filter, requests]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
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
    <div className="bg-white/10 text-white border backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
        My Donation Requests
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 justify-center sm:justify-start">
        {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-semibold transition-colors text-sm sm:text-base ${
              filter === status
                ? "bg-red-600 text-white shadow-lg shadow-red-600/50"
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-md shadow-md">
        <table className="min-w-full divide-y divide-gray-600 text-sm text-left">
          <thead className="bg-gray-900 text-gray-200 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Recipient</th>
              <th className="px-4 py-3">Blood Group</th>
              <th className="px-4 py-3">Hospital</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white/5 divide-y divide-gray-700 text-white">
            {displayed.length > 0 ? (
              displayed.map((req, idx) => (
                <tr key={req._id} className="hover:bg-gray-800 transition">
                  <td className="px-4 py-3">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>
                  <td className="px-4 py-3 font-medium">{req.recipientName}</td>
                  <td className="px-4 py-3">{req.bloodGroup}</td>
                  <td className="px-4 py-3">{req.hospitalName}</td>
                  <td className="px-4 py-3">{req.donationDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                        req.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : req.status === "inprogress"
                          ? "bg-blue-500/20 text-blue-400"
                          : req.status === "done"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-3">
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="gap-4 md:hidden grid grid-cols-1">
        {displayed.length > 0 ? (
          displayed.map((req, idx) => (
            <div
              key={req._id}
              className="bg-white/5 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300"
            >
              {/* টেবিল ১: Request এবং Recipient */}
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
                <tbody>
                  <tr>
                    <td className="py-1" style={{ width: "50%" }}>
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    <td className="py-1 font-semibold" style={{ width: "50%" }}>
                      {req.recipientName}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* টেবিল ২: Blood Group এবং Hospital */}
              <table className="w-full mb-3 text-white text-sm border-collapse">
                <thead>
                  <tr>
                    <th
                      className="border-b border-gray-600 pb-1 text-left"
                      style={{ width: "50%" }}
                    >
                      Blood Group
                    </th>
                    <th
                      className="border-b border-gray-600 pb-1 text-left"
                      style={{ width: "50%" }}
                    >
                      Hospital
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1" style={{ width: "50%" }}>
                      {req.bloodGroup}
                    </td>
                    <td className="py-1" style={{ width: "50%" }}>
                      {req.hospitalName}
                    </td>
                    <td className="px-4 py-3 flex gap-3">
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
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* টেবিল ৩: Date এবং Status */}
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
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-4">
            No donation requests found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold transition-colors text-sm sm:text-base ${
                currentPage === i + 1
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/50"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }`}
              aria-label={`Page ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
