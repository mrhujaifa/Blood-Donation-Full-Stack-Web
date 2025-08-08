import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const itemsPerPage = 10;

const AllBloodDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const res = await axiosSecure.get("/donation-request");
        setRequests(res.data);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [axiosSecure]);

  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const paginatedRequests = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="bg-white/10 text-white border backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
        All Blood Donation Requests
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-md shadow-md">
        <table className="min-w-full divide-y divide-gray-600 text-sm text-left">
          <thead className="bg-gray-900 text-gray-200 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Blood Group</th>
              <th className="px-4 py-3">Hospital</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white/5 divide-y divide-gray-700 text-white">
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((req, idx) => (
                <tr key={req._id} className="hover:bg-gray-800 transition">
                  <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
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

      {/* Mobile Card View */}
      <div className="md:hidden grid gap-4">
        {paginatedRequests.length > 0 ? (
          paginatedRequests.map((req, idx) => (
            <div
              key={req._id}
              className="bg-white/5 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition"
            >
              <div className="text-sm mb-2">
                <strong>#{(currentPage - 1) * itemsPerPage + idx + 1}</strong>
              </div>
              <div className="text-sm mb-1">Name: {req.recipientName}</div>
              <div className="text-sm mb-1">Blood Group: {req.bloodGroup}</div>
              <div className="text-sm mb-1">Hospital: {req.hospitalName}</div>
              <div className="text-sm mb-1">Date: {req.donationDate}</div>
              <div className="text-sm">
                Status:{" "}
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
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-4">
            No donation requests found.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap text-sm">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-800 rounded disabled:opacity-40"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageClick(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-800 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBloodDonationRequests;
