import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

import Navbar from "../../../Components/Header/Header";
import NavbarSwitcher from "../../../Components/NavbarSwitcher/NavbarSwicher";
import Footer from "../../../Components/Footer/Footer";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DonorSearch = () => {
  const locationData = useLoaderData();
  const { register, handleSubmit, watch } = useForm();
  const selectedDistrict = watch("district");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (selectedDistrict) {
      const found = locationData.find(
        (loc) => loc.district === selectedDistrict
      );
      setFilteredUpazilas(found ? found.covered_area : []);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, locationData]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/donation-request");
      const filtered = res.data.filter(
        (req) =>
          req.bloodGroup === data.bloodGroup &&
          req.recipientDistrict === data.district &&
          req.recipientUpazila === data.upazila
      );
      setResults(filtered);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="max-w-4xl mx-auto px-4 py-12 mt-40 mb-100">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Search Blood Donation Requests
        </h2>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <select
            {...register("bloodGroup", { required: true })}
            className="border p-2 rounded"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <select
            {...register("district", { required: true })}
            className="border p-2 rounded"
          >
            <option value="">Select District</option>
            {locationData.map((loc) => (
              <option key={loc.district} value={loc.district}>
                {loc.district}
              </option>
            ))}
          </select>

          <select
            {...register("upazila", { required: true })}
            className="border p-2 rounded"
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="md:col-span-3 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Search
          </button>
        </form>

        {/* Search Results */}
        {loading ? (
          <p className="text-center">Searching requests...</p>
        ) : results.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((request) => (
              <div
                key={request._id}
                className="border border-red-200 bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold text-red-600 mb-2">
                  {request.recipientName}
                </h3>
                <p>
                  <strong>Blood Group:</strong>{" "}
                  <span className="text-lg text-red-500">
                    {request.bloodGroup}
                  </span>
                </p>
                <p>
                  <strong>Address:</strong> {request.fullAddress}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No donation requests found for this search.
          </p>
        )}
      </main>

      <footer className="mt-36">
        <Footer />
      </footer>
    </div>
  );
};

export default DonorSearch;
