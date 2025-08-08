import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axiosSecure.get(`/donation-request/${id}`);
        setRequest(res.data);
      } catch (error) {
        console.error("Error fetching donation request details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRequest();
  }, [axiosSecure, id]);

  const handleDonateConfirm = async () => {
    setUpdating(true);
    try {
      await axiosSecure.patch(`/donation-request/${id}`, {
        status: "inprogress",
        donorName: user.displayName,
        donorEmail: user.email,
      });

      Swal.fire({
        icon: "success",
        title: "Donation Confirmed!",
        text: "Thank you for confirming.",
      });

      setRequest((prev) => ({
        ...prev,
        status: "inprogress",
        donorName: user.displayName,
        donorEmail: user.email,
      }));

      setShowModal(false);
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.message ||
        "Something went wrong. Please try again.";
      Swal.fire("Error", msg, "error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return <div className="text-center py-20 text-gray-600">Loading...</div>;

  if (!request)
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        Donation request not found
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8 text-center text-red-600">
        Donation Request Details
      </h2>

      {/* Table for large screens */}
      {/* Table for large screens */}
      <div className="hidden lg:block border rounded-md shadow-md overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-red-600 text-white uppercase tracking-wide font-semibold">
              <th className="border-b border-red-500 px-6 py-4 text-left">
                Field
              </th>
              <th className="border-b border-red-500 px-6 py-4 text-left">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Recipient", request.recipientName],
              ["District", request.recipientDistrict],
              ["Upazila", request.recipientUpazila],
              ["Hospital", request.hospitalName],
              ["Address", request.fullAddress],
              [
                "Blood Group",
                <span
                  key="bg"
                  className="inline-block px-3 py-1 bg-red-600 text-white rounded font-semibold"
                >
                  {request.bloodGroup}
                </span>,
              ],
              ["Date", request.donationDate],
              ["Time", request.donationTime],
              [
                "Status",
                <span
                  key="status"
                  className={`capitalize px-3 py-1 rounded font-semibold ${
                    request.status === "pending"
                      ? "bg-yellow-300 text-yellow-900"
                      : request.status === "inprogress"
                      ? "bg-blue-300 text-blue-900"
                      : "bg-green-300 text-green-900"
                  }`}
                >
                  {request.status}
                </span>,
              ],
              ["Message", request.requestMessage],
            ].map(([label, value], idx) => (
              <tr
                key={idx}
                className={`border-b last:border-b-0 hover:bg-red-50 transition-colors duration-200`}
              >
                <td className="border-r border-red-200 px-6 py-4 font-medium text-gray-700">
                  {label}
                </td>
                <td className="px-6 py-4 text-gray-800">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Donor info */}
        {request.donorName && (
          <div className="mt-8 border-t border-red-300 pt-6 px-6">
            <h3 className="text-xl font-semibold text-red-600 mb-4">
              Donor Information
            </h3>
            <p className="text-gray-700">
              <strong>Name:</strong> {request.donorName}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {request.donorEmail}
            </p>
          </div>
        )}

        {/* Donate button */}
        {request.status === "pending" && (
          <button
            onClick={() => setShowModal(true)}
            className="mt-8 w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition"
            disabled={updating}
          >
            Donate Now
          </button>
        )}
      </div>

      {/* Card view for mobile */}
      <div className="lg:hidden space-y-6">
        <div className="border rounded-md p-4 shadow-sm">
          <h3 className="text-xl font-semibold text-red-600 mb-4">
            Request Info
          </h3>

          {[
            ["Recipient", request.recipientName],
            ["District", request.recipientDistrict],
            ["Upazila", request.recipientUpazila],
            ["Hospital", request.hospitalName],
            ["Address", request.fullAddress],
            [
              "Blood Group",
              <span
                key="bg-mobile"
                className="inline-block px-3 py-1 bg-red-600 text-white rounded"
              >
                {request.bloodGroup}
              </span>,
            ],
            ["Date", request.donationDate],
            ["Time", request.donationTime],
            [
              "Status",
              <span
                key="status-mobile"
                className={`capitalize px-3 py-1 rounded font-semibold text-white ${
                  request.status === "pending"
                    ? "bg-yellow-400"
                    : request.status === "inprogress"
                    ? "bg-blue-400"
                    : "bg-green-500"
                }`}
              >
                {request.status}
              </span>,
            ],
            ["Message", request.requestMessage],
          ].map(([label, value], idx) => (
            <div key={idx} className="mb-4 last:mb-0">
              <p className="font-semibold text-red-600">{label}</p>
              <p>{value}</p>
            </div>
          ))}

          {/* Donor Info Card */}
          {request.donorName && (
            <div className="border rounded-md p-4 mt-6">
              <h4 className="text-lg font-semibold text-red-600 mb-3">
                Donor Information
              </h4>
              <p>
                <strong>Name:</strong> {request.donorName}
              </p>
              <p>
                <strong>Email:</strong> {request.donorEmail}
              </p>
            </div>
          )}

          {/* Donate Button */}
          {request.status === "pending" && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-8 w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition"
              disabled={updating}
            >
              Donate Now
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-md shadow p-6 max-w-md w-full space-y-4">
            <h3 className="text-xl font-bold text-red-600">Confirm Donation</h3>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Donor Name
              </label>
              <input
                type="text"
                value={user.displayName}
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Donor Email
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDonateConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={updating}
              >
                {updating ? "Confirming..." : "Confirm Donation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
