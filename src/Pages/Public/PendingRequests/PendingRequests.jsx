import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../Hook/useAuth";

import Loading from "../../../Components/Loading/Loading";
import axios from "axios";

const PendingDonationRequests = () => {
  const { user, loading: authLoading } = useAuth();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/donation-request?status=pending`
        );
        setRequests(res.data || []);
      } catch (error) {
        console.error("Error fetching pending donation requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleView = (id) => {
    if (!user && !authLoading) {
      navigate("/signIn");
    } else {
      navigate(`/donation-request-details/${id}`);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container mx-auto px-4 py-10 my-30">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-10 ">
        All Pending Donation Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center">No pending requests found.</p>
      ) : (
        <>
          {/* Table for Large Devices */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm     -700">
                <thead className="bg-red-600">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">
                      Recipient
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      District
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Upazila
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Hospital
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Blood Group
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Time</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {requests.map((req) => (
                    <tr
                      key={req._id}
                      className="hover:bg-red-50 transition-all"
                    >
                      <td className="px-6 py-4">{req.recipientName}</td>
                      <td className="px-6 py-4">{req.recipientDistrict}</td>
                      <td className="px-6 py-4">{req.recipientUpazila}</td>
                      <td className="px-6 py-4">{req.hospitalName}</td>
                      <td className="px-6 py-4 font-semibold text-red-600">
                        {req.bloodGroup}
                      </td>
                      <td className="px-6 py-4">{req.donationDate}</td>
                      <td className="px-6 py-4">{req.donationTime}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleView(req._id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded shadow-sm transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card view for Mobile */}
          <div className="grid lg:hidden gap-6 mt-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="border border-gray-200 rounded-lg shadow-sm p-4"
              >
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  {req.recipientName}
                </h3>
                <p>
                  <strong>District:</strong> {req.recipientDistrict}
                </p>
                <p>
                  <strong>Upazila:</strong> {req.recipientUpazila}
                </p>
                <p>
                  <strong>Hospital:</strong> {req.hospitalName}
                </p>
                <p>
                  <strong>Blood Group:</strong> {req.bloodGroup}
                </p>
                <p>
                  <strong>Date:</strong> {req.donationDate}
                </p>
                <p>
                  <strong>Time:</strong> {req.donationTime}
                </p>
                <button
                  onClick={() => handleView(req._id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded shadow-md"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PendingDonationRequests;
