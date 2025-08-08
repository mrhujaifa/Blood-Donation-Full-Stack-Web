import React from "react";
import "./Banner.css";
import { useNavigate } from "react-router";
import useAuth from "../../../Hook/useAuth";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { BiDonateBlood } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";


const Banner = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleJoin = () => {
    navigate("/register");
  };

  const handleSearch = () => {
    navigate("/seach-donor");
  };
  const handleDonate = () => {
    navigate("/pending-requests");
  };
  const handleDonateFund = () => {
    navigate("/donate-funding");
  };

  return (
    <div className="banner-bg">
      <div className=" text-white max-w-xl">
        <div data-aos="fade-right" data-aos-duration="1000" className="">
          <h1 className="text-4xl md:text-6xl font-bold mb-5">
            Donating Blood
          </h1>
          <p className="mb-6 text-lg">
            Blood is made up of four main components: red blood cells,
            platelets, plasma, and white blood cells. Each whole blood donation
            has the potential to save up to three lives.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap">
          {user ? (
            <button
              onClick={handleDonate}
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white 
        px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              <BiDonateBlood
                size={18}
                className="text-white drop-shadow-sm animate-pulse sm:size-5"
              />
              Donate Blood
            </button>
          ) : (
            <button
              onClick={handleJoin}
              className="flex items-center gap-2 text-white font-medium sm:font-semibold rounded-lg transition duration-300 shadow-md hover:shadow-[0_0_15px_#ff1a56] 
        bg-[#ff1a56] hover:bg-[#e0134c] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
            >
              <BiDonateBlood size={18} className="sm:size-5" />
              Join as a Donor
            </button>
          )}

          <button
            onClick={handleDonateFund}
            className="relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white 
      px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            <FaHandHoldingDollar
              size={18}
              className="text-white drop-shadow-sm animate-pulse sm:size-5"
            />
            Donate Fund
          </button>

          <button
            onClick={handleSearch}
            className="relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white 
      px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            <IoSearchSharp
              size={18}
              className="text-white drop-shadow-sm animate-pulse sm:size-[23px]"
            />
            Search Donor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
