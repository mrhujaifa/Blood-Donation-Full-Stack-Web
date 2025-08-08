import React, { useEffect, useState } from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const AllBloodDonationRequest = () => {
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
        const res = await axiosSecure.get(`/donation-request`);
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

  const handleStatusChange = async (id, newStatus) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: `Change status to "${
        newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
      }"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // red-500
      cancelButtonColor: "#6b7280", // gray-500
      confirmButtonText: "Yes, change it!",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      setIsLoading(true);
      const res = await axiosSecure.patch(`/donation-request/${id}`, {
        status: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: newStatus } : req
          )
        );

        Swal.fire({
          icon: "success",
          title: "Status updated!",
          toast: true,
          position: "top-end",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update status",
        text: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-white/10 text-white border backdrop-blur-sm p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">My Donation Requests</h2>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              filter === status
                ? "bg-red-600 text-white shadow-lg shadow-red-600/50"
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Desktop Table - visible md+ */}
      <div className="overflow-x-auto rounded-md shadow-md hidden md:block">
        <table className="min-w-full divide-y divide-gray-600 text-sm text-left">
          <thead className="bg-gray-900 text-gray-200 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Recipient</th>
              <th className="px-4 py-3">Blood Group</th>
              <th className="px-4 py-3">Hospital</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status / Action</th>
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

                    {/* Toggle Action Buttons */}
                    <div className="mt-2 flex gap-2 flex-wrap text-xs">
                      {req.status === "pending" && (
                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "inprogress")
                          }
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Start (In Progress)
                        </button>
                      )}

                      {req.status === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(req._id, "done")}
                            className="text-green-400 hover:text-green-300"
                          >
                            ✔ Mark as Done
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(req._id, "canceled")
                            }
                            className="text-red-400 hover:text-red-300"
                          >
                            ✖ Cancel
                          </button>
                        </>
                      )}
                    </div>
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

      {/* Mobile Table Rows - visible on small only */}
      <div className="md:hidden grid gap-4">
        {displayed.length > 0 ? (
          displayed.map((req, idx) => (
            <div
              key={req._id}
              className="bg-white/5 border border-gray-700 rounded-lg p-4 shadow-md"
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-white text-sm">
                <div>
                  <strong>#</strong>:{" "}
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </div>
                <div>
                  <strong>Recipient</strong>: {req.recipientName}
                </div>
                <div>
                  <strong>Blood Group</strong>: {req.bloodGroup}
                </div>
                <div>
                  <strong>Hospital</strong>: {req.hospitalName}
                </div>
                <div>
                  <strong>Date</strong>: {req.donationDate}
                </div>
                <div>
                  <strong>Status</strong>:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold tracking-wide ${
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
                </div>
              </div>

              {/* Actions */}
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-white">
                {req.status === "pending" && (
                  <button
                    onClick={() => handleStatusChange(req._id, "inprogress")}
                    className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-1 transition"
                  >
                    Start (In Progress)
                  </button>
                )}
                {req.status === "inprogress" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(req._id, "done")}
                      className="bg-green-600 hover:bg-green-700 rounded px-3 py-1 transition"
                    >
                      ✔ Mark as Done
                    </button>
                    <button
                      onClick={() => handleStatusChange(req._id, "canceled")}
                      className="bg-red-600 hover:bg-red-700 rounded px-3 py-1 transition"
                    >
                      ✖ Cancel
                    </button>
                  </>
                )}
              </div>
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
              className={`w-8 h-8 rounded-full font-semibold transition-colors ${
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

export default AllBloodDonationRequest;
