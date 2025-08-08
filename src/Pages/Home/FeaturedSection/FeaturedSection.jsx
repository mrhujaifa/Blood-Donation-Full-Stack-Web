import React from "react";
import { FaHeartbeat, FaUsers, FaMapMarkerAlt, FaMedal } from "react-icons/fa";

const FeaturedSection = () => {
  return (
    <div className="w-full py-16 px-4 bg-white">
      {/* Title */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-[#ff1a56] mb-4">
          Our Key Features
        </h2>
        <p className="text-gray-600 text-lg">
          Find blood donors easily, donate blood, and be a part of saving lives
          through our platform.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {/* Card 1 */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 text-center"
        >
          <FaHeartbeat className="text-[#ff1a56] text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">
            Emergency Blood Support
          </h3>
          <p className="text-gray-600 text-sm">
            Apply for any blood group emergency 24/7 from anywhere.
          </p>
        </div>

        {/* Card 2 */}
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 text-center"
        >
          <FaUsers className="text-[#ff1a56] text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">
            Trusted Donor Directory
          </h3>
          <p className="text-gray-600 text-sm">
            A verified and secure database of reliable blood donors.
          </p>
        </div>

        {/* Card 3 */}
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 text-center"
        >
          <FaMapMarkerAlt className="text-[#ff1a56] text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Location-Based Search</h3>
          <p className="text-gray-600 text-sm">
            Find and connect with donors near your location with ease.
          </p>
        </div>

        {/* Card 4 (different animation for variation) */}
        <div
          data-aos="fade-up"
          data-aos-duration="3000"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 text-center"
        >
          <FaMedal className="text-[#ff1a56] text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Life Saver Award</h3>
          <p className="text-gray-600 text-sm">
            Special recognition for regular and dedicated blood donors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
