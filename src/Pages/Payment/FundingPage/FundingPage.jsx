import React, { useEffect, useState } from "react";

import moment from "moment";
import Payment from "../Payment/Payment";
import "./fundpage.css";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { MdOutlinePayment } from "react-icons/md";

const itemsPerPage = 10;

const FundingPage = () => {
  const [fundings, setFundings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const fetchFundings = async (page) => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(
        `/fundings?page=${page}&limit=${itemsPerPage}`
      );
      const { data, total } = res.data;
      setFundings(data || []);
      setTotalItems(total || 0);
    } catch (error) {
      console.error("Error fetching fundings:", error);
      setFundings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundings(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="p-4 container mx-auto mb-20 mt-30">
      {/* Title and Button */}
      <div className="text-center mb-10 mt-7">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
          Support Lifesaving Missions ❤️
        </h2>
        <p className=" -600 max-w-xl mx-auto">
          Your contribution helps us organize more blood donation campaigns,
          support patients in emergencies, and spread hope where it's needed
          most. Every fund you donate saves a life.
        </p>
        <div className="mt-5">
          <button
            onClick={() => setModalOpen(true)}
            className="relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          >
            <MdOutlinePayment size={20} />
            Pay Now
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center py-8">⏳ Loading...</p>
      ) : (
        <>
          {/* Table for md+ */}
          <div className="hidden md:block overflow-x-auto    shadow-md rounded-lg">
            <table className="table w-full text-sm">
              <thead className="bg-red-500">
                <tr>
                  <th className="p-3 text-left">Donor Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {fundings.map((fund) => (
                  <tr key={fund._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{fund.name}</td>
                    <td className="p-3">{fund.email}</td>
                    <td className="p-3 font-medium text-green-600">
                      ${fund.amount}
                    </td>
                    <td className="p-3  -600">
                      {moment(fund.date).format("MMMM Do YYYY, h:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for mobile */}
          <div className="md:hidden space-y-4">
            {fundings.map((fund) => (
              <div
                key={fund._id}
                className="   border-l-4 border-red-500 shadow-md rounded-xl p-4 transition hover:shadow-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-red-600">
                    {fund.name}
                  </h3>
                  <span className="text-sm  -400">
                    {moment(fund.date).format("MMM Do")}
                  </span>
                </div>
                <p className="text-sm  -500 mb-1">
                  <span className="font-medium  -700">Email:</span>{" "}
                  {fund.email}
                </p>
                <p className="text-sm">
                  <span className="font-medium  -700">Amount:</span>{" "}
                  <span className="text-green-600 font-semibold">
                    ${fund.amount}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-base-content rounded disabled:opacity-50"
        >
          ◀ Previous
        </button>
        <span className=" -700 font-medium">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-base-content hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Next ▶
        </button>
      </div>

      {/* Modal for Payment */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl    p-8 shadow-2xl fade-in">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4  -400 hover: -600 transition duration-300 text-2xl"
              aria-label="Close Modal"
            >
              &times;
            </button>

            {/* Modal Header */}
            <div className="mb-6 text-center text-white">
              <h2 className="text-2xl font-bold">
                Secure Payment
              </h2>
              <p className="text-sm  -500">
                Please complete your payment below.
              </p>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <Payment />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundingPage;
